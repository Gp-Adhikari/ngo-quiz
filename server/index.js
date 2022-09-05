require("dotenv").config();

const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const csrf = require("csurf");

const next = require("next");

//for socket
const http = require("http");
const socketIO = require("socket.io");

const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  const server = http.createServer(app);
  const io = socketIO(server);

  //use helmet
  app.use(helmet());

  //use body parser
  app.use(express.json());

  //access cookie easy
  app.use(cookieParser());

  //compression
  app.use(compression());

  //csrf protection
  // app.use(csrf({ cookie: { httpOnly: true, secure: false } }));

  // get csrf token
  // app.get("/api/csrf", (req, res) => {
  //   return res.status(200).json({ status: true, csrfToken: req.csrfToken() });
  // });

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  const connectUsers = io.of("/connect");
  require("./sockets/adminSocket")(connectUsers);

  const activeUsers = io.of("/activeUsers");
  require("./sockets/activeUsersSocket")(activeUsers);

  //import login route
  const adminLogin = require("./routes/loginRoute");

  //rate limit for api
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 1000,
    message: "Too many requests from this IP, please try again later.",
  });

  app.use("/", limiter);
  app.use("/", adminLogin);

  //if any syntax error occurs
  app.use((err, req, res, next) => {
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
