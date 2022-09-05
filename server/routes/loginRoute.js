require("dotenv").config();

const express = require("express");
const { escape } = require("mysql");

const jwt = require("jsonwebtoken");
const generateAccessToken = require("../middleware/generateAccessToken");

const config = require("../config/databaseConfig");
const connection = config.connection;

const router = express.Router();

router.post("/login", (req, res) => {
  try {
    const username = escape(req.body.username);
    const password = escape(req.body.password);

    const searchForAdmin = `SELECT * FROM admins WHERE username = ${username} AND password = ${password};`;

    connection.query(searchForAdmin, (err, results) => {
      if (err !== null) {
        return res.json({ status: false, message: "Something went wrong!" });
      }
      const user = results[0];

      if (user === undefined) {
        return res.json({ status: false, message: "Admin does not exist!" });
      }

      //generate access token
      const accessToken = generateAccessToken({ id: user.id });

      //check if cookie exists
      if (user.cookie !== null) {
        res.cookie("rt", user.cookie, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        return res.json({
          status: true,
          token: accessToken,
          message: "Login successful",
        });
      }

      //if cookie does not exist
      //generate refresh token
      const rt = jwt.sign(
        {
          userId: user.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );

      //set cookie to db
      connection.query(
        `UPDATE admins SET cookie = ${escape(rt)} WHERE id = '${escape(
          user.id
        )}';`
      );

      res.cookie("rt", rt, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.json({
        status: true,
        token: accessToken,
        message: "Login successful",
      });
    });
  } catch (error) {
    return res.json({ status: false, message: "Something went wrong!" });
  }
});

router.post("/token", (req, res) => {
  const cookieToken = escape(req.cookies.rt);

  if (cookieToken === null || cookieToken === undefined || cookieToken === "") {
    return res.json({ status: false, message: "Not Authorized!" });
  }

  const searchForRefreshToken = `SELECT * FROM admins WHERE cookie = ${cookieToken}`;

  //search for refresh token
  connection.query(searchForRefreshToken, (error, results) => {
    if (error !== null) {
      return res.json({ status: false, message: "Something went wrong!" });
    }

    const user = results[0];

    if (user === undefined) {
      return res.json({ status: false, message: "Not Authorized!" });
    }

    const userId = user.id;

    //verify the refresh token
    const verified = jwt.verify(user.cookie, process.env.REFRESH_TOKEN_SECRET);

    if (!verified) {
      return res.json({ status: false, message: "Not Authorized!" });
    }

    const accessToken = generateAccessToken({ id: userId });

    return res.json({
      status: true,
      message: "Token Regenerated!",
      token: accessToken,
    });
  });
});

router.delete("/logout", (req, res) => {
  try {
    const rt = escape(req.cookies.rt);

    const removeCookie = `UPDATE admins SET cookie = NULL WHERE cookie = ${rt};`;

    connection.query(removeCookie);

    res.clearCookie("rt");

    return res.json({
      status: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.json({ status: false, message: "Something went wrong!" });
  }
});

module.exports = router;
