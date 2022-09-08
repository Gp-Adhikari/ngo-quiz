require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (socket) => {
  //verify the token
  const authHeader = socket.handshake.auth.token;
  // const authHeader = socket.handshake.headers.token;
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err !== null) {
      return next(new Error("Unauthorized"));
    }
  });
};

module.exports = verifyToken;
