const { escape } = require("mysql");

const config = require("../config/databaseConfig");
const verifyToken = require("../middleware/verifyToken");
const connection = config.connection;

const titlePermission = (socket) => {
  //on change title
  socket.on("change-title", async (message) => {
    try {
      /*
        titleInEnglish: "new title",
        titleInNepali: "new title",
      */

      verifyToken(socket);

      const titleInEnglish = escape(message.titleInEnglish);
      const titleInNepali = escape(message.titleInNepali);

      //search for visits in title table
      const searchForVisits = "SELECT * FROM titles WHERE name = 'title';";

      connection.query(searchForVisits, (err, results) => {
        if (err !== null) {
          return socket.emit("error", "Something went wrong!");
        }

        const result = results[0];

        //if the field doesn't exist
        if (result === undefined) {
          //if both fields exist
          if (titleInEnglish.length > 2 && titleInNepali.length > 2) {
            connection.query(
              `INSERT INTO titles(name, titleInEnglish, titleInNepali) VALUES ('title', ${titleInEnglish}, ${titleInNepali});`
            );
          }
          //if titleInEnglish field exist
          else if (titleInEnglish.length > 2 && titleInNepali.length > !2) {
            connection.query(
              `INSERT INTO titles(name, titleInEnglish) VALUES ('title', ${titleInEnglish});`
            );
          }
          //if titleInEnglish field exist
          else if (titleInEnglish.length > !2 && titleInNepali.length > 2) {
            connection.query(
              `INSERT INTO titles(name, titleInEnglish) VALUES ('title', ${titleInEnglish});`
            );
          }

          //send to admin
          return socket.emit("title", {
            titleInEnglish: titleInEnglish.replace(/[']/g, ""),
            titleInNepali: titleInNepali.replace(/[']/g, ""),
          });
        }

        // update visits if all fields exist
        if (titleInEnglish.length > 2 && titleInNepali.length > 2) {
          connection.query(
            `UPDATE titles SET titleInEnglish = ${titleInEnglish}, titleInNepali = ${titleInNepali} WHERE name = 'title';`
          );

          return socket.emit("title", {
            titleInEnglish: titleInEnglish.replace(/[']/g, ""),
            titleInNepali: titleInNepali.replace(/[']/g, ""),
          });
        }
        // update if title in English field exist
        else if (titleInEnglish.length > 2 && titleInNepali.length > !2) {
          connection.query(
            `UPDATE titles SET titleInEnglish = ${titleInEnglish} WHERE name = 'title';`
          );

          return socket.emit("title", {
            titleInEnglish: titleInEnglish.replace(/[']/g, ""),
            titleInNepali: result.titleInNepali,
          });
        }
        // update if title in Nepali field exist
        else if (titleInEnglish.length > !2 && titleInNepali.length > 2) {
          connection.query(
            `UPDATE titles SET titleInNepali = ${titleInNepali} WHERE name = 'title';`
          );
          return socket.emit("title", {
            titleInEnglish: result.titleInEnglish,
            titleInNepali: titleInNepali.replace(/[']/g, ""),
          });
        }
      });
    } catch (error) {
      return socket.emit("error", "Something went wrong");
    }
  });

  //on presentation text change
  socket.on("presentation-text", async (message) => {
    try {
      /*
        presentationTextInEnglish: "new title",
        presentationTextInNepali: "new title",
      */

      verifyToken(socket);

      const titleInEnglish = escape(message.presentationTextInEnglish);
      const titleInNepali = escape(message.presentationTextInNepali);

      //search for visits in title table
      const searchForVisits =
        "SELECT * FROM titles WHERE name = 'presentationText';";

      connection.query(searchForVisits, (err, results) => {
        if (err !== null) {
          return socket.emit("error", "Something went wrong!");
        }

        const result = results[0];

        //if the field doesn't exist
        if (result === undefined) {
          //if both fields exist
          if (titleInEnglish.length > 2 && titleInNepali.length > 2) {
            connection.query(
              `INSERT INTO titles(name, titleInEnglish, titleInNepali) VALUES ('presentationText', ${titleInEnglish}, ${titleInNepali});`
            );
          }
          //if titleInEnglish field exist
          else if (titleInEnglish.length > 2 && titleInNepali.length > !2) {
            connection.query(
              `INSERT INTO titles(name, titleInEnglish) VALUES ('presentationText', ${titleInEnglish});`
            );
          }
          //if titleInEnglish field exist
          else if (titleInEnglish.length > !2 && titleInNepali.length > 2) {
            connection.query(
              `INSERT INTO titles(name, titleInEnglish) VALUES ('presentationText', ${titleInEnglish});`
            );
          }

          //send to admin
          return socket.emit("presentationText", {
            presentationTextInEnglish: titleInEnglish.replace(/[']/g, ""),
            presentationTextInNepali: titleInNepali.replace(/[']/g, ""),
          });
        }

        // update visits if all fields exist
        if (titleInEnglish.length > 2 && titleInNepali.length > 2) {
          connection.query(
            `UPDATE titles SET titleInEnglish = ${titleInEnglish}, titleInNepali = ${titleInNepali} WHERE name = 'presentationText';`
          );

          return socket.emit("presentationText", {
            presentationTextInEnglish: titleInEnglish.replace(/[']/g, ""),
            presentationTextInNepali: titleInNepali.replace(/[']/g, ""),
          });
        }
        // update if title in English field exist
        else if (titleInEnglish.length > 2 && titleInNepali.length > !2) {
          connection.query(
            `UPDATE titles SET titleInEnglish = ${titleInEnglish} WHERE name = 'presentationText';`
          );

          return socket.emit("presentationText", {
            presentationTextInEnglish: titleInEnglish.replace(/[']/g, ""),
            presentationTextInNepali: result.titleInNepali,
          });
        }
        // update if title in Nepali field exist
        else if (titleInEnglish.length > !2 && titleInNepali.length > 2) {
          connection.query(
            `UPDATE titles SET titleInNepali = ${titleInNepali} WHERE name = 'presentationText';`
          );

          return socket.emit("presentationText", {
            presentationTextInEnglish: result.titleInEnglish,
            presentationTextInNepali: titleInNepali.replace(/[']/g, ""),
          });
        }
      });
    } catch (error) {
      return socket.emit("error", "Something went wrong");
    }
  });
};

module.exports = titlePermission;
