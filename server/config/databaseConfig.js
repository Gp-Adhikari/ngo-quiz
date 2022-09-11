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
    // console.log("Error on DB connection.");
    return;
  }

  // console.log("connected successfully to DB.");
});

// const createAdminTable = `CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, cookie VARCHAR(255));`;
// const createTitlesTable = `CREATE TABLE IF NOT EXISTS titles (id INTEGER PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, titleInEnglish VARCHAR(255), titleInNepali VARCHAR(255), visits VARCHAR(255));`;
// const createQuestionsTable = `CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL, questionInEnglish VARCHAR(1000), questionInNepali VARCHAR(1000), answers VARCHAR(7000));`;
// const createcandidatesTable = `CREATE TABLE IF NOT EXISTS candidates (id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, timesSearched VARCHAR(5000), averageScore VARCHAR(1000));`;

const createAdminTable = `CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, cookie VARCHAR(255));`;
const createTitlesTable = `CREATE TABLE IF NOT EXISTS titles (id INTEGER PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) CHARACTER SET utf8mb4, titleInEnglish VARCHAR(255) CHARACTER SET utf8mb4, titleInNepali VARCHAR(255) CHARACTER SET utf8mb4, visits VARCHAR(255));`;
const createQuestionsTable = `CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL, questionInEnglish VARCHAR(1000) CHARACTER SET utf8mb4, questionInNepali VARCHAR(1000) CHARACTER SET utf8mb4, answers VARCHAR(7000) CHARACTER SET utf8mb4);`;
const createcandidatesTable = `CREATE TABLE IF NOT EXISTS candidates (id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4, timesSearched VARCHAR(5000), averageScore VARCHAR(1000));`;

//createAdminTable
connection.query(createAdminTable, (error, results, fields) => {
  if (error) return;
});

//createTitlesTable
connection.query(createTitlesTable, (error, results, fields) => {
  if (error) return;
});

//createQuestionsTable
connection.query(createQuestionsTable, (error, results, fields) => {
  if (error) return;
});

//createQuestionsTable
connection.query(createcandidatesTable, (error, results, fields) => {
  if (error) return;
});

module.exports = {
  connection: mysql.createConnection(config),
};
