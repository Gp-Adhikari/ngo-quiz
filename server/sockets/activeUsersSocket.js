module.exports = (connectUsers) => {
  let connectedUsers = 0;

  connectUsers.on("connection", async (socket) => {
    connectedUsers++;
    connectUsers.emit("connections", connectedUsers);

    socket.on("disconnect", () => {
      connectedUsers--;
      connectUsers.emit("connections", connectedUsers);
    });
  });
};
