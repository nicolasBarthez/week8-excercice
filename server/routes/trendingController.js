const express = require("express");
const trendingController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");
const moment = require("moment");

// **********************************************************
// Send info about Stocks (trending)  =======================
// **********************************************************
trendingController.get("/", function(req, res, next) {
  let indexSelected = req.query.index;
  const stockTrendBoard = [];

  if (indexSelected === "all") {
    // retrieve all stocks
    Stock.find().exec((err, stocks) => {
      if (err) return res.json(null);

      stocks.forEach(stock => {
        const stockCurrentTrend = {
          longName: stock.longName,
          currentPrice: stock.price,
          variation: stock.variation,
          volume: stock.volume
        };
        // looking for insider trending
        const today = moment().startOf("day");
        const thirtyDaysAgo = moment(today).subtract(30, "days");

        WatchItem.find({
          stockId: stock._id,
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

          if (nbBull < nbBear) {
            var currentPercentage = (nbBear / (nbBull + nbBear) * 100).toFixed(
              2
            );
            var currentTrend = {
              trend: "bear",
              percentage: currentPercentage
            };
          } else {
            var currentPercentage = (nbBull / (nbBull + nbBear) * 100).toFixed(
              2
            );
            var currentTrend = {
              trend: "bull",
              percentage: currentPercentage
            };
          }
          stockCurrentTrend.trending = currentTrend;

          // Add Hot insights
          Babble.find({
            stockLink: stock._id,
            created_at: {
              $gte: thirtyDaysAgo.toDate()
            }
          }).then(babbles => {
            stockCurrentTrend.hotInsights = 0 + babbles.length;
            // stockCurrentTrend.nbOfLikes =
            //   0 +
            //   babbles.map(item => item.like).reduce((prev, next) => {
            //     Number(prev.length) + Number(next.length);
            //   }, 0);

            stockTrendBoard.push(stockCurrentTrend);
            if (stockTrendBoard.length === stocks.length) {
              res.json(stockTrendBoard);
            }
          });

          // stockTrendBoard.push(stockCurrentTrend);
          // if (stockTrendBoard.length === stocks.length) {
          //   res.json(stockTrendBoard);
          // }
        });
      });
    });
  } else {
    Stock.find({ index: { $in: { indexSelected } } }).exec((err, stocks) => {
      if (err) return res.json(null);
      console.log("index filled");
    });
  }
});

// **********************************************************
// Send tendancy of an action      ==========================
// **********************************************************

trendingController.get(
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

module.exports = trendingController;
