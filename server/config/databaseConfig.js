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

const createTables = `CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, cookie VARCHAR(255));`;

connection.query(createTables, (error, results, fields) => {
  if (error) return;
});

module.exports = {
  connection: mysql.createConnection(config),
};
