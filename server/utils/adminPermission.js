const { escape } = require("mysql");

const config = require("../config/databaseConfig");
const connection = config.connection;

const adminPermission = (socket, user) => {
  //on change title
  socket.on("change-title", async (message) => {
    try {
      /*
        title: "new title"
      */

      const title = escape(message.title);
    } catch (error) {
      return socket.emit("error", "Something went wrong");
    }
  });
};

module.exports = adminPermission;
