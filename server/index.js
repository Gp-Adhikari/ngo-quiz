require("dotenv").config();

const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const csrf = require("csurf");

const next = require("next");

const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  //use helmet
  server.use(helmet());

  //use body parser
  server.use(express.json());

  //access cookie easy
  server.use(cookieParser());

  //compression
  server.use(compression());

  //csrf protection
  // server.use(csrf({ cookie: { httpOnly: true, secure: false } }));

  // get csrf token
  // server.get("/api/csrf", (req, res) => {
  //   return res.status(200).json({ status: true, csrfToken: req.csrfToken() });
  // });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  //import login route
  const adminLogin = require("./routes/loginRoute");

  server.use(adminLogin);

  //if any syntax error occurs
  server.use(function (err, req, res, next) {
    if (err.code === "EBADCSRFTOKEN") {
      // handle CSRF token errors here
      res.status(403);
      return res.json({ status: false, message: "Not a valid address." });
    }

    return res
      .status(err.status || 500)
      .json({ status: false, message: "Syntax Error!" });
  });

  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
