const express = require("express");

const app = express();
const ordersRouter = require("./routes/orders");
const notFound = require("./errors/notFound");

app.use(express.json());

// TODO: Add code to meet the requirements and make the tests pass.
app.use("/urls", ordersRouter);

app.use(notFound);

app.use((err, req, res, next) => {
  res.status(err.status);
  res.send(err.message);
});

module.exports = app;
