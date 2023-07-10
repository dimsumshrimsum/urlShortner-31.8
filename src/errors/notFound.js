function notFound(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  err.message = `Path not found: ${req.originalUrl}`;
  next(err);
}

module.exports = notFound;
