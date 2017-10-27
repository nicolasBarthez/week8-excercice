const express = require("express");
const usersController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");
const moment = require("moment");

// **********************************************************
// Send users sort by score   ===============================
// **********************************************************

usersController.get(
  "/",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;

    User.find()
      .sort({ score: -1 })
      .exec((err, resp) => {
        if (err) res.json(null);
        return res.json(resp);
      });
  }
);

module.exports = usersController;
