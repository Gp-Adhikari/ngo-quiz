const { escape } = require("mysql");

const config = require("../config/databaseConfig");
const connection = config.connection;

const addCandidate = (socket, io) => {
  //add candidates
  socket.on("add-candidate", async (message) => {
    try {
      /*
            {
                "candidateName": "asdfadsf",
                "score":123,
            }
        */

      const candidateName = escape(message.candidateName.toLowerCase());
      const score = escape(message.score);

      const queryToAddCandidate = `INSERT INTO candidates (name, averageScore, timesSearched) VALUES (${candidateName}, ${score}, "1");`;

      const searchForCandidateIfExists = `SELECT * FROM candidates WHERE name = ${candidateName};`;

      const getAllCandidates = `SELECT * FROM candidates;`;

      connection.query(searchForCandidateIfExists, (err, results) => {
        if (err !== null) {
          return socket.emit("error", "Something went wrong!");
        }

        const result = results[0];

        //if the candidate does not exist in the database
        if (result === undefined) {
          connection.query(queryToAddCandidate, (err, results) => {
            if (err !== null) {
              return socket.emit("error", "Something went wrong!");
            }
          });

          connection.query(getAllCandidates, (err, results) => {
            if (err !== null) {
              return socket.emit("error", "Something went wrong!");
            }

            io.emit("candidate", {
              candidateName: candidateName.replace(/[']/g, ""),
              averageScore: score.replace(/[']/g, ""),
              timesSearched: "1",
            });

            return io.emit("candidates", results);
          });
        } else {
          //averageScore
          const averageScore = escape(
            (parseInt(result.averageScore) + parseInt(score)) / 2
          );

          const incrementOfTimeSearched = escape(
            parseInt(result.timesSearched) + 1
          );

          //if the candidate exists in the database
          const updateCandidate = `UPDATE candidates SET averageScore = ${averageScore}, timesSearched = ${incrementOfTimeSearched} WHERE name = ${candidateName};`;

          connection.query(updateCandidate, (err, results) => {
            if (err !== null) {
              return socket.emit("error", "Something went wrong!");
            }

            connection.query(searchForCandidateIfExists, (err, results) => {
              if (err !== null) {
                return socket.emit("error", "Something went wrong!");
              }

              const result = results[0];

              io.emit("candidate", {
                candidateName: result.name,
                averageScore: result.averageScore,
                timesSearched: result.timesSearched,
              });

              connection.query(getAllCandidates, (err, results) => {
                if (err !== null) {
                  return socket.emit("error", "Something went wrong!");
                }

                return io.emit("candidates", results);
              });
            });
          });
        }
      });
    } catch (err) {
      return socket.emit("error", "Something went wrong!");
    }
  });
};

module.exports = addCandidate;
