/**
 * For configuring the application
 */

var express = require("express");
var app = express();
var db = require("./db");

// USER ROUTES
var UserController = require("./user/UserController");
app.use("/users", UserController);

var AuthController = require("./auth/AuthController");
app.use("/auth", AuthController);

module.exports = app;
