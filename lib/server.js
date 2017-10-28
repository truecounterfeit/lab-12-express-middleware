// create the express app and export it

const express = require('express');
const app = express();

module.exports = app;

app.get('/success', (req, res, next) => {
  res.send('successful get');
  next();
});

app.get('/error', (req, res, next) => {
  return next('server error!');
  res.send('should not see this');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('error caught');
});
