/**
 * For specifying the connection to the database
 */

var mongoose = require("mongoose");
mongoose.connect(
  "mongodb://admin:admin123@ds151393.mlab.com:51393/calendar",
  { useNewUrlParser: true }
);
