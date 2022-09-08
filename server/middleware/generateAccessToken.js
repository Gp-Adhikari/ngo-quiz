const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    // expiresIn: "1005m",
    expiresIn: 60 * 10,
  });
};

module.exports = generateAccessToken;
