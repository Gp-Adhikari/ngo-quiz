require("dotenv").config();
const mysql = require("mysql");

config = {
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_DATABASE}`,
};

const connection = mysql.createConnection(config); //added the line

connection.connect((err) => {
  if (err !== null) {
    console.log("Error on DB connection.");
    return;
  }

  console.log("connected successfully to DB.");
});

const createAdminTable = `CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, cookie VARCHAR(255));`;
const createTitlesTable = `CREATE TABLE IF NOT EXISTS titles (id INTEGER PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, titleInEnglish VARCHAR(255), titleInNepali VARCHAR(255), visits VARCHAR(255));`;
const createQuestionsTable = `CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL, questionInEnglish VARCHAR(1000), questionInNepali VARCHAR(1000), answersInEnglish VARCHAR(6000), answersInNepali VARCHAR(6000), points INTEGER );`;

//createAdminTable
connection.query(createAdminTable, (error, results, fields) => {
  if (error) return;
});

//createTitlesTable
connection.query(createTitlesTable, (error, results, fields) => {
  if (error) console.log(error);
});

//createQuestionsTable
connection.query(createQuestionsTable, (error, results, fields) => {
  if (error) console.log(error);
});

module.exports = {
  connection: mysql.createConnection(config),
};
