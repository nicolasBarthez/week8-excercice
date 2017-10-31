const express = require("express");
const dashboardsController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");
const moment = require("moment");

// **********************************************************
// Send users connected info for Dashboard header
// **********************************************************

dashboardsController.get(
  "/profile",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;

    User.findById(user._id).exec((err, us) => {
      if (err) res.json(null);
      let userInfo = {
        username: us.username,
        following: us.following,
        picProfile: us.picProfile,
        location: us.location,
        following: us.following.length
      };

      Babble.find({
        user: user._id
      }).then(babbles => {
        userInfo.nbBabbles = 0 + babbles.length;

        userInfo.nbOfLikes =
          0 +
          babbles.map(item => item.like).reduce((sum, next) => {
            return sum + next.length;
          }, 0);

        return res.json(userInfo);
      });
    });
  }
);

// **********************************************************
// Send user prefered stocks info
// **********************************************************

dashboardsController.get(
  "/prefered",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;

    WatchItem.find({
      userId: user._id,
      status: "won"
    })
      .populate("stockId")
      .exec((err, wi) => {
        if (err) res.json(null);

        console.log(wi);
        // first, convert data into a Map with reduce
        function reduceArrayByStockPoints(array) {
          let counts = array.reduce((prev, curr) => {
            const stockId = curr.stockId.toString();
            let count = prev.get(stockId) || 0;
            prev.set(stockId, curr.performancePoints + count);
            return prev;
          }, new Map());

          // then, map your counts object back to an array
          return Array.from(counts).map(([stockId, performancePoints]) => {
            return { stockId, performancePoints };
          });
        }

        let preferedStocks = reduceArrayByStockPoints(wi);

        return res.json(preferedStocks);
      });
  }
);

module.exports = dashboardsController;
