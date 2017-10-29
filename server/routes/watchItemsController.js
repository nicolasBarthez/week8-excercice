const express = require("express");
const watchItemsController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");
const moment = require("moment");

// **********************************************************
// Send all positions of a user   ==========================
// **********************************************************

watchItemsController.get(
  "/positions/user/:id",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const user = req.params.id;

    WatchItem.find({
      _id: user._id,
      status: "active",
      position: { $in: ["bull", "bear"] }
    })
      .sort({ created_at: -1 })
      .populate("stockId")
      .populate("userId")
      .exec((err, watchitem) => {
        if (!watchitem) {
          res.json(null);
        } else {
          res.json(watchitem);
        }
      });
  }
);

// **********************************************************
// Send the last 5 positions of the user (left side)   ======
// **********************************************************

watchItemsController.get(
  "/positions/user",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const user = req.user;

    WatchItem.find({
      status: "active",
      position: { $in: ["bull", "bear"] }
    })
      .sort({ created_at: -1 })
      .limit(5)
      .populate("stockId")
      .populate("userId")
      .exec((err, watchitem) => {
        if (!watchitem) {
          res.json(null);
        } else {
          res.json(watchitem);
        }
      });
  }
);

// **********************************************************
// Send the last 5 positions of All users
// **********************************************************

watchItemsController.get(
  "/positions",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const user = req.user;

    WatchItem.find({
      status: "active",
      position: { $in: ["bull", "bear"] }
    })
      .sort({ created_at: -1 })
      .limit(5)
      .populate("stockId")
      .populate("userId")
      .exec((err, watchitem) => {
        if (!watchitem) {
          res.json(null);
        } else {
          res.json(watchitem);
        }
      });
  }
);

// **********************************************************
// Send all watchitems of a user   ==========================
// **********************************************************

watchItemsController.get(
  "/:id",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const user = req.user;
    const insiderId = req.params.id;

    WatchItem.find({
      _id: insiderId,
      status: "active",
      position: "none"
    })
      .sort({ created_at: -1 })
      .populate("stockId")
      .populate("userId")
      .exec((err, watchitem) => {
        if (!watchitem) {
          res.json(null);
        } else {
          res.json(watchitem);
        }
      });
  }
);

// **********************************************************
// Send tendancy of an action      ==========================
// **********************************************************

watchItemsController.get(
  "/stocks/:id",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const user = req.user;
    const stockId = req.params.id;

    const today = moment().startOf("day");
    const thirtyDaysAgo = moment(today).subtract(30, "days");

    WatchItem.find({
      stockId: stockId,
      status: "active",
      position: { $in: ["bull", "bear"] },
      created_at: {
        $gte: thirtyDaysAgo.toDate()
      }
    }).then(activeWatchItems => {
      function countPositions(array, position) {
        return array
          .map(item => {
            return item.position == position;
          })
          .filter(val => {
            return val === true;
          }).length;
      }
      let nbBull = 50 + countPositions(activeWatchItems, "bull");
      let nbBear = 50 + countPositions(activeWatchItems, "bear");

      console.log("bull", nbBull);
      console.log("bear", nbBear);

      if (nbBull < nbBear) {
        var currentPercentage = (nbBear / (nbBull + nbBear) * 100).toFixed(2);
        var currentTrend = { trend: "bear", percentage: currentPercentage };
      } else {
        var currentPercentage = (nbBull / (nbBull + nbBear) * 100).toFixed(2);
        var currentTrend = { trend: "bull", percentage: currentPercentage };
      }

      res.json(currentTrend);
    });
  }
);

module.exports = watchItemsController;
