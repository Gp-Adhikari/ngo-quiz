const addCandidate = require("../utils/addCandidate");

const config = require("../config/databaseConfig");
const connection = config.connection;

module.exports = (connectUsers) => {
  let connectedUsers = 0;

  connectUsers.on("connection", async (socket) => {
    connectedUsers++;
    connectUsers.emit("connections", connectedUsers);

    //search for visits in title table
    const searchForVisits = "SELECT * FROM titles WHERE name = 'totalVisits';";

    connection.query(searchForVisits, (err, results) => {
      if (err !== null) {
        socket.emit("error", "Something went wrong!");
      }

      const result = results[0];

      //if the field doesn't exist
      if (result === undefined) {
        connection.query(
          "INSERT INTO titles(name, visits) VALUES('totalVisits', '1');"
        );
        return;
      }

      // update visits
      connection.query(
        `UPDATE titles SET visits = '${
          parseInt(result.visits) + 1
        }' WHERE name = 'totalVisits';`
      );

      const totalVisits = {
        id: result.id,
        name: result.name,
        totalVisits: parseInt(result.visits) + 1,
      };

      connectUsers.emit("visits", totalVisits);
    });

    //send titles
    connection.query(
      `SELECT * FROM titles WHERE name = 'title'`,
      (err, results) => {
        if (err !== null) {
          socket.emit("error", "Something went wrong!");
        }

        const result = results[0];

        //if the field doesn't exist
        if (result === undefined) {
          return socket.emit("title", {
            titleInEnglish: "Title Does Not Exist",
            titleInNepali: "शीर्षक अवस्थित छैन",
          });
        }

        const title = {
          titleInEnglish: result.titleInEnglish,
          titleInNepali: result.titleInNepali,
        };

        connectUsers.emit("title", title);
      }
    );

    //send presentation text
    connection.query(
      `SELECT * FROM titles WHERE name = 'presentationText'`,
      (err, results) => {
        if (err !== null) {
          socket.emit("error", "Something went wrong!");
        }

        const result = results[0];

        //if the field doesn't exist
        if (result === undefined) {
          socket.emit("presentationText", {
            presentationTextInEnglish: "Empty Field",
            presentationTextInNepali: "खाली क्षेत्र",
          });
        }

        const title = {
          presentationTextInEnglish: result.titleInEnglish,
          presentationTextInNepali: result.titleInNepali,
        };

        connectUsers.emit("presentationText", title);
      }
    );

    //send all questions
    const getAllQuestions = `SELECT * FROM questions`;

    connection.query(getAllQuestions, (err, results) => {
      if (err !== null) {
        return socket.emit("error", "Something went wrong");
      }

      socket.emit("questions", results);
    });

    //send all candidates
    const getAllCandidates = `SELECT * FROM candidates`;

    connection.query(getAllCandidates, (err, results) => {
      if (err !== null) {
        return socket.emit("error", "Something went wrong");
      }

      socket.emit("candidates", results);
    });

    //add candidates
    addCandidate(socket, connectUsers);

    socket.on("disconnect", () => {
      connectedUsers--;
      connectUsers.emit("connections", connectedUsers);
    });
  });
};
