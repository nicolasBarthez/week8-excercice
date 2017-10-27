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
  "/positions/:id",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const user = req.user;

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
// Send the last 5 positions of All users   =================
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
        console.log("watchitem*********", watchitem);
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
