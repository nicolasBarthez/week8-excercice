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
      userId: user,
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
  "/positions",
  // passport.authenticate("jwt", config.jwtSession),
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
          const lastPositionsList = [];
          watchitem.forEach(el => {
            const wi = { ...el };
            WatchItem.find({
              userId: el.userId,
              status: {
                $in: ["won", "lost"]
              }
            }).exec((err, wiClosed) => {
              // console.log("wiClosed", wiClosed);
              // Calculate performance points
              if (wiClosed.length > 0) {
                wi.perfPoints = wiClosed
                  .map(item => item.performancePoints)
                  .reduce((prev, next) => prev + next);

                wi.nbOfInsightsWon = wiClosed.filter(item => {
                  // console.log("item.status", item.status);
                  return item.status == "won";
                }, 0).length;
                lastPositionsList.push(wi);
              } else {
                wi.perfPoints = 0;
                wi.nbOfInsightsWon = 0;

                lastPositionsList.push(wi);
              }
              if (lastPositionsList.length === watchitem.length) {
                res.json(lastPositionsList);
              }
            });
          });

          // res.json(watchitem);
        }
      });
  }
);

// **********************************************************
// Send the last 5 positions of All users
// **********************************************************

watchItemsController.get(
  "/positions/",
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

module.exports = watchItemsController;
