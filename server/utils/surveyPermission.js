const { escape } = require("mysql");

const config = require("../config/databaseConfig");
const connection = config.connection;

const surveyPermission = (socket, user) => {
  //on add survey
  socket.on("add-survey", async (message) => {
    try {
      /*
        questionInEnglish: "sdfsdfsdf",
        questionInNepali: "sdfsdfsdf",
        answers: "[{}, {}]",
    */

      const questionInEnglish = escape(message.questionInEnglish);
      const questionInNepali = escape(message.questionInNepali);
      const answers = escape(JSON.stringify(message.answers));

      const addSurveyQuery = `INSERT INTO questions(questionInEnglish, questionInNepali, answers) VALUES (${questionInEnglish}, ${questionInNepali}, ${answers});`;
      const getAllQuestions = `SELECT * FROM questions`;

      connection.query(addSurveyQuery, (err, results) => {
        if (err !== null) {
          return socket.emit("error", "Something went wrong");
        }

        connection.query(getAllQuestions, (err, results) => {
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
  //on remove survey
  socket.on("remove-survey", async (message) => {
    try {
      /*
        id: 2
        */

      const id = parseInt(escape(message.id));

      const removeSurveyQuery = `DELETE FROM questions WHERE id = ${id}`;
      const getAllQuestions = `SELECT * FROM questions`;

      connection.query(removeSurveyQuery, (err, results) => {
        if (err !== null) {
          return socket.emit("error", "Something went wrong");
        }

        connection.query(getAllQuestions, (err, results) => {
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

  //on update survey
  socket.on("update-survey", async (message) => {
    try {
      /*{
        id: 2
        questionInEnglish: "sdfsdfsdf",
        questionInNepali: "sdfsdfsdf",
        answers: "[{}, {}]",
      }
    */

      const id = escape(message.id);
      const questionInEnglish = escape(message.questionInEnglish);
      const questionInNepali = escape(message.questionInNepali);
      const answers = escape(JSON.stringify(message.answers));

      const updateSurveyQuery = `UPDATE questions SET questionInEnglish = ${questionInEnglish}, questionInNepali = ${questionInNepali}, answers = ${answers} WHERE id = ${id};`;
      const getAllQuestions = `SELECT * FROM questions`;

      connection.query(updateSurveyQuery, (err, results) => {
        if (err !== null) {
          return socket.emit("error", "Something went wrong");
        }

        connection.query(getAllQuestions, (err, results) => {
          if (err !== null) {
            return socket.emit("error", "Something went wrong");
          }

          return socket.emit("questions", results);
        });
      });
    } catch (e) {
      return socket.emit("error", "Something went wrong");
    }
  });
};

module.exports = surveyPermission;
