const express = require("express");
const adminController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");
const moment = require("moment");

// **********************************************************
// Send users list
// **********************************************************

adminController.get(
  "/users",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;

    User.find()
      .sort({ created_at: -1 })
      .exec((err, resp) => {
        if (err) res.json(null);
        return res.json(resp);
      });
  }
);

// **********************************************************
// Send stocks list
// **********************************************************

adminController.get(
  "/stocks",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;

    Stock.find().exec((err, resp) => {
      if (err) res.json(err);
      return res.json(resp);
    });
  }
);

module.exports = adminController;
