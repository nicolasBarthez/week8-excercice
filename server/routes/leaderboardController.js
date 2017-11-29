require("dotenv").config();
const express = require("express");
const leaderboardController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");
const moment = require("moment");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
const storage = cloudinaryStorage({
  cloudinary,
  folder: "user-images",
  allowedFormats: ["jpg", "jpeg", "png", "gif", "tiff"]
});
const parser = multer({ storage });

// **********************************************************
// CALCULATE LEADERBOARD
// **********************************************************

leaderboardController.get(
  "/",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    User.find().exec((err, insiders) => {
      if (err) res.json(null);
      let leaderboardTable = [];
      insiders.forEach(insider => {
        let userInfo = {
          userId: insider._id,
          username: insider.username,
          picProfile: insider.picProfile,
          location: insider.location,
          skills: insider.skills,
          following: insider.following.length
        };

        Babble.find({
          user: insider._id
        }).then(babbles => {
          userInfo.nbBabbles = 0 + babbles.length;

          userInfo.nbOfLikes =
            0 +
            babbles.map(item => item.like).reduce((sum, next) => {
              return sum + next.length;
            }, 0);

          // Calculate prefered stocks
          WatchItem.find({
            userId: insider._id,
            status: "won"
          })
            .populate("stockId")
            .exec((err, wis) => {
              if (err) res.json(null);

              if (wis) {
                // first, convert data into a Map with reduce
                function reduceArrayByStockPoints(array) {
                  const map = array.reduce((map, wi) => {
                    const stock = wi.stockId;
                    if (!map.get(stock._id)) {
                      map.set(stock._id, {
                        longName: stock.longName,
                        shortName: stock.shortName,
                        performancePoints: 0
                      });
                    }
                    map.get(stock._id).performancePoints +=
                      wi.performancePoints;
                    return map;
                  }, new Map());

                  // then, map your counts object back to an array
                  return Array.from(map).map(([stockId, data]) => {
                    return Object.assign({ stockId }, data);
                  });
                }
                let rankingStockByPoints = reduceArrayByStockPoints(wis);

                sortStockDes = function(a, b) {
                  if (a.performancePoints < b.performancePoints) return 1;
                  if (a.performancePoints > b.performancePoints) return -1;
                  return 0;
                };

                rankingStockByPoints = rankingStockByPoints.sort(sortStockDes);
                userInfo.preferedStocks = rankingStockByPoints;
              }

              WatchItem.find({
                userId: insider._id
                // status: {
                //   $in: ["won", "lost"]
                // }
              }).exec((err, wiClosed) => {
                console.log("wiClosed", wiClosed);
                // Calculate performance points
                if (wiClosed.length > 0) {
                  userInfo.performancePoints = wiClosed
                    .map(item => item.performancePoints)
                    .reduce((prev, next) => prev + next);

                  userInfo.nbOfInsightsWon = wiClosed.filter(item => {
                    console.log("item.status", item.status);
                    return item.status == "won";
                  }, 0).length;
                } else {
                  userInfo.performancePoints = 0;
                  userInfo.nbOfInsightsWon = 0;
                }

                User.find({
                  following: insider._id
                }).exec((err, us) => {
                  userInfo.followers = us.length ? us.length : 0;

                  leaderboardTable.push(userInfo);

                  if (leaderboardTable.length === insiders.length) {
                    sortStockDes = function(a, b) {
                      if (a.performancePoints < b.performancePoints) return 1;
                      if (a.performancePoints > b.performancePoints) return -1;
                      return 0;
                    };

                    // Sort by perf points
                    leaderboardTable = leaderboardTable.sort(sortStockDes);

                    res.json(leaderboardTable);
                  }
                });
              });
            });
        });
      });
    });
  }
);

module.exports = leaderboardController;
