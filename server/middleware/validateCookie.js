const validateCookie = (req, res, next) => {
  const cookie = req.cookies.rq;

  if (!cookie || cookie === undefined || cookie === null || cookie === "") {
    return;
  }

  next();
};
