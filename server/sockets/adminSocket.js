require("dotenv").config();

const jwt = require("jsonwebtoken");
const { escape } = require("mysql");

const config = require("../config/databaseConfig");
const adminPermission = require("../utils/adminPermission");
const connection = config.connection;

module.exports = (connectUsers) => {
  connectUsers.use((socket, next) => {
    //verify the token
    const authHeader = socket.handshake.auth.token;
    // const authHeader = socket.handshake.headers.token;
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null) return;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err !== null) {
        socket.user = null;
        next();
        // return next(new Error("Unauthorized"));
      } else {
        socket.user = user;
        next();
      }
    });
  });

  connectUsers.on("connection", async (socket) => {
    //if user === admin
    if (socket.user !== null) {
      //check if admin exists
      const adminId = escape(socket.user.id);

      if (adminId !== "" && adminId !== undefined && adminId !== null) {
        //check if admin exists
        const searchForAdmin = `SELECT * FROM admins WHERE id = ${adminId}`;
        connection.query(searchForAdmin, (err, results) => {
          if (err !== null) {
            return socket.emit("error", "Something went wrong!");
          }

          const user = results[0];

          if (user === undefined) {
            return socket.emit("error", "Admin not found!");
          }

          adminPermission(socket, user);

          return socket.emit("data", user);
        });
      }
    }

    socket.on("disconnect", () => {});
  });
};
