const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const commentsRouter = require('./routes/comments');
const likesRouter = require('./routes/likes');
const videosRouter = require('./routes/videos');
const authRouter = require('./routes/auth');

const { environment } = require('./config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(commentsRouter);
app.use(likesRouter);
app.use(videosRouter);
app.use(authRouter);


app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
