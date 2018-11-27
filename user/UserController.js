var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require("./User");

// CREATES A NEW USER
router.post("/", function(req, res) {
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    },
    function(err, user) {
      if (err) {
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      }
      res.status(200).send(user);
    }
  );
});

// RETURNS ALL THE USERS
router.get("/", function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).send("There was a problem finding the users.");
    }
    res.status(200).send(users);
  });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get("/:id", function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return res.status(500).send("There was a problem finding the user.");
    }
    if (!user) {
      return res.status(404).send("No user found.");
    }
    res.status(200).send(user);
  });
});

// DELETES A USER FROM THE DATABASE
router.delete("/:id", function(req, res) {
  User.findOneAndRemove(req.params.id, function(err, user) {
    if (err) {
      return res.status(500).send("There was a problem deleting the user.");
    }
    res.status(200).send("User " + user.name + " was deleted.");
  });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put("/:id", function(req, res) {
  /**
   * {new:true} stands for the option of which version of the value, in your case the user, you want to return.
   * The one before the update, or the one after. Returning this value will show you the user you updated.
   */
  User.findOneAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    user
  ) {
    if (err) {
      return res.status(500).send("There was a problem updating the user.");
    }
    res.status(200).send(user);
  });
});

module.exports = router;
