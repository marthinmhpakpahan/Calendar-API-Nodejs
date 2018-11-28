var mongoose = require("mongoose");
var LeaveSchema = new mongoose.Schema({
  user_id: String,
  type: String,
  date: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Leave", LeaveSchema);

module.exports = mongoose.model("Leave");
