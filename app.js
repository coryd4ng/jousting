// Packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var busboyBodyParser = require('busboy-body-parser');
var User = require('./server/models/user.server.model.js');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jousting_db');

// Create Express instance
var app = express();

var port = process.env.port || 8000;

// Middlewares
app.use(express.static(__dirname + '/public/mobile/www'));
app.use(bodyParser.json());
app.use(busboyBodyParser());

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

// Routers
var authRouter = require('./server/routes/AuthRoutes')();
var teamRouter = require('./server/routes/teamRoutes')();
var rosterRouter = require('./server/routes/rosterRoutes')();
var challengeRouter = require('./server/routes/challengeRoutes')();
app.use('/', authRouter);
app.use('/', teamRouter, rosterRouter, challengeRouter);

app.listen(port, function (err) {
  console.log('running server on port over ' + port + "!!!!");
});