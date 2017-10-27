const express = require("express");
const babblesController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");

// Moment to format dates
const moment = require("moment");

// **********************************************************
// Post a babble   ==========================================
// **********************************************************

babblesController.post(
  "/",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const stock = req.query.stockId ? req.query.stockId : "";
    const babble = req.body.babble;
    const user = req.user;

    const newBabble = new Babble({
      user: user._id,
      babble: babble,
      stockLink: stock
    });

    newBabble.save(err => {
      if (err) {
        res.json(err);
      } else {
        // GAMIFICATION => +20 points per babble  posted
        User.findByIdAndUpdate(user._id, { $inc: { score: 20 } }).exec();

        res.json(newBabble);
      }
    });
  }
);

// **********************************************************
// Like a babble  (only once) ===============================
// **********************************************************
babblesController.post(
  "/like",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const babble = req.body.babbleId;
    const user = req.user;

    Babble.findByIdAndUpdate(babble, {
      $addToSet: { like: user._id }
    }).exec();
    Babble.findByIdAndUpdate(babble)
      .populate("user")
      .exec((err, whoIsLiked) => {
        if (err) return next(err);
        // GAMIFICATION => receive 10 points because receive 1 like
        User.findByIdAndUpdate(whoIsLiked._id, {
          $inc: { score: 10 }
        }).exec((err, executed) => {
          if (err) return next(err);
        });
        res.json(babble);
      });
  }
);
module.exports = babblesController;
