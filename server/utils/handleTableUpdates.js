const { escape } = require("mysql");

const config = require("../config/databaseConfig");
const verifyToken = require("../middleware/verifyToken");
const connection = config.connection;

const handleTableUpdates = (socket) => {
  //on add survey
  socket.on("update-question-order", async (message) => {
    try {
      /*
        sourceId: 12,
        destinationId: 14
    */

      verifyToken(socket);

      const sourceId = parseInt(escape(message.sourceId));
      const destinationId = parseInt(escape(message.destinationId));

      const getAllQuestionsQuery = `SELECT * FROM questions`;

      connection.query(getAllQuestionsQuery, (err, results) => {
        if (err !== null) {
          return socket.emit("error", "Something went wrong");
        }

        if (results.length === 0 || results.length === 1) {
          return;
        }

        const sourceQuestion = results[sourceId];
        const destinationQuestion = results[destinationId];

        const setSourceToDestinationQuery = `UPDATE questions SET questionInEnglish = '${destinationQuestion.questionInEnglish}', questionInNepali = '${destinationQuestion.questionInNepali}', answers = '${destinationQuestion.answers}' WHERE id = '${sourceQuestion.id}';`;
        const setDestinationToSourceQuery = `UPDATE questions SET questionInEnglish = '${sourceQuestion.questionInEnglish}', questionInNepali = '${sourceQuestion.questionInNepali}', answers = '${sourceQuestion.answers}' WHERE id = '${destinationQuestion.id}';`;

        connection.query(setSourceToDestinationQuery, (err, results) => {
          if (err !== null) {
            return socket.emit("error", "Something went wrong");
          }
        });
        connection.query(setDestinationToSourceQuery, (err, results) => {
          if (err !== null) {
            return socket.emit("error", "Something went wrong");
          }
        });

        connection.query(getAllQuestionsQuery, (err, results) => {
          if (err !== null) {
            return socket.emit("error", "Something went wrong");
          }

          return socket.emit("questions", results);
        });
      });
    } catch (error) {
      return socket.emit("error", "Something went wrong");
    }
  });
};

module.exports = handleTableUpdates;
