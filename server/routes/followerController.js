const express = require("express");
const followerController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");

// Moment to format dates
const moment = require("moment");

// **********************************************************
// Follow an insider   ======================================
// **********************************************************

followerController.post(
  "/",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const insiderId = req.body.insiderId;

    // GAMIFICATION => Add 20 points per people that follow you
    User.findByIdAndUpdate(insiderId, { $inc: { score: 20 } }).exec();

    User.findByIdAndUpdate(
      user._id,
      { $addToSet: { following: insiderId } },
      err => {
        if (err) {
          return next(err);
        }
      }
    ).then(resp => {
      return res.json(user);
    });
  }
);

// **********************************************************
// Unfollow an insider   ======================================
// **********************************************************

followerController.delete(
  "/:id",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const insiderId = req.body.insiderId;

    // GAMIFICATION => Add 20 points per people that follow you
    User.findByIdAndUpdate(insiderId, { $inc: { score: -20 } }).exec();

    User.findByIdAndUpdate(
      user._id,
      { $pull: { following: insiderId } },
      err => {
        if (err) {
          return next(err);
        }
      }
    ).then(resp => {
      return res.json(user);
    });
  }
);

// **********************************************************
// See Followers of an insider   ============================
// **********************************************************

followerController.get(
  "/",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const insiderId = req.body.insiderId;

    User.findById(user._id).then(resp => {
      return res.json(user);
    });
  }
);

module.exports = followerController;
