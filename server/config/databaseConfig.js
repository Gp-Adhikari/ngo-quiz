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
  if (err) {
    return res.json({ status: false, message: "Server Down!" });
  }
  console.log("connected successfully to DB.");
});

module.exports = {
  connection: mysql.createConnection(config),
};
