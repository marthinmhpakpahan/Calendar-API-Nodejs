var express = require("express");
var router = express.Router();
var VerifyToken = require("../auth/VerifyToken");

var Leave = require("./Leave");

router.get("/", VerifyToken, function(req, res) {
  Leave.find({ user_id: req.userId }, function(err, leaves) {
    if (err) {
      return res.status(500).send("There was a problem finding the leaves.");
    }
    if (!leaves) {
      return res.status(404).send("Leaves not found");
    }
    return res.status(200).send(leaves);
  });
});

router.post("/", VerifyToken, function(req, res) {
  Leave.create(
    {
      user_id: req.userId,
      type: req.body.type,
      date: req.body.date
    },
    function(err, leave) {
      if (err) {
        return res
          .status(500)
          .send("There was a problem adding the leave." + err);
      }
      res.status(200).send(leave);
    }
  );
});

router.delete("/:id/", VerifyToken, function(req, res) {
  Leave.findOneAndRemove(req.params.id, function(err, leave) {
    if (err) {
      return res.status(500).send("There was a problem getting the leave.");
    }
    if (leave.user_id != req.userId) {
      return res.status(403).send("You are not allowed to delete this leave.");
    }
    return res.status(200).send("This leave was deleted");
  });
});

module.exports = router;
