const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const gameRoute = require('./src/routes/api/gameRoute');
const postRoute = require('./src/routes/api/postRoute');
const teamRoute = require('./src/routes/api/teamRoute');
const userRoute = require('./src/routes/api/userRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin",
      process.env.PORT
      ? "https://late-registration-client.herokuapp.com"
      : "http://localhost:3000");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const connect = function () {
  return mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/late_registration', { useNewUrlParser: true });
};

connect()
.then(() => {
  app.use('/game', gameRoute);
  app.use('/team', teamRoute);
  app.use('/post', postRoute);
  app.use('/user', userRoute);

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = connect;