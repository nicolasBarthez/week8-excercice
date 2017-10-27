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
// Send 5 last positions of All users info  =================
// **********************************************************

watchItemsController.get(
  "/",
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
// Send 5 positions of the user info  =======================
// **********************************************************

watchItemsController.get(
  "/user",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const user = req.user;

    WatchItem.find({
      userId: user._id,
      status: "active",
      position: { $in: ["bull", "bear"] }
    })
      .sort({ created_at: -1 })
      .limit(5)
      .populate("stockId")
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

module.exports = watchItemsController;
