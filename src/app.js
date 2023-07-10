const express = require("express");

const app = express();
const urlsRouter = require("./urls/urls.router");
const usesRouter = require("./uses/uses.router");
const notFound = require("./errors/notFound");

app.use(express.json());

// TODO: Add code to meet the requirements and make the tests pass.
app.use("/urls", urlsRouter);
app.use("/uses", usesRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  err.message = `Path not found: ${req.originalUrl}`;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
