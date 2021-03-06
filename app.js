/**
 * For configuring the application
 */

var express = require("express");
var app = express();
var db = require("./db");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

// USER ROUTES
var UserController = require("./user/UserController");
app.use("/users", UserController);

var AuthController = require("./auth/AuthController");
app.use("/auth", AuthController);

var LeaveController = require("./leave/LeaveController");
app.use("/leave", LeaveController);

module.exports = app;
