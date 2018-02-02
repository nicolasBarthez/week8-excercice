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
// Check if the user follow the insider   ===================
// **********************************************************

followerController.get(
  "/:id",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const insiderId = req.params.id;

    User.findById(user._id).exec((err, us) => {
      let isFollowed = !(us.following.indexOf(insiderId) === -1);

      res.json(isFollowed);
    });
  }
);

// **********************************************************
// Follow an insider   ======================================
// **********************************************************

followerController.post(
  "/:id",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const insiderId = req.params.id;

    // GAMIFICATION => Add 20 points per people that follow you
    User.findByIdAndUpdate(insiderId, {
      $inc: { score: 20, nbFollower: 1 }
    }).exec();

    User.findByIdAndUpdate(user._id, {
      $addToSet: { following: insiderId }
    }).then(resp => {
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
    const insiderId = req.params.id;

    // GAMIFICATION => Add 20 points per people that follow you
    User.findByIdAndUpdate(insiderId, {
      $inc: { score: -20, nbFollower: -1 }
    }).exec();

    User.findByIdAndUpdate(user._id, {
      $pull: { following: insiderId }
    }).then(resp => {
      return res.json(user);
    });
  }
);

// **********************************************************
// See Followers of an insider or me   ======================
// **********************************************************

// followerController.get(
//   "/",
//   passport.authenticate("jwt", config.jwtSession),
//   (req, res, next) => {
//     const user = req.user;
//     const insiderId = req.body.insider ? req.body.insider : user._id;
//
//     User.findById(insiderId)
//       .populate("following")
//       .exec((err, resp) => {
//         if (err) res.json(null);
//         return res.json(resp);
//       });
//   }
// );

module.exports = followerController;
