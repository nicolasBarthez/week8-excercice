const express = require("express");
const stocksController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");
const moment = require("moment");
const scrapPrice = require("../config/scrapPrice");
const scrapPriceCurrency = require("../config/scrapPriceCurrency");

// **********************************************************
// Send info about a stock  =================================
// **********************************************************
stocksController.get("/:stockName", function(req, res, next) {
  const stock = req.params.stockName.toUpperCase();
  const ONE_MIN = 60 * 1000;

  Stock.findOne({ shortName: stock }, (err, stock) => {
    if (err) return next(err);

    if (!stock || stock == null) {
      stock = "no stock";
    } else if (
      stock.index.indexOf("EURONEXT PARIS") > -1 &&
      new Date() - stock.updated_at.getTime() > ONE_MIN
    ) {
      scrapPrice(stock.scrapKey);
    } else if (
      stock.index.indexOf("crypto") > -1 &&
      new Date() - stock.updated_at.getTime() > ONE_MIN
    ) {
      scrapPriceCurrency(stock.shortName);
    }
    res.json(stock);
  });
});

// **********************************************************
// Send info about Stocks (trending)  =======================
// **********************************************************
stocksController.get("/", function(req, res, next) {
  let indexSelected = req.query.index;
  if (indexSelected === "all") {
    Stock.find().exec((err, stocks) => {
      if (err) return res.json(null);
      res.json(stocks);
    });
  } else {
    Stock.find({ index: { $in: { indexSelected } } }).exec((err, stocks) => {
      if (err) return res.json(null);
      res.json(stocks);
    });
  }
});

// **********************************************************
// Send BULL & BEAR trending percentage according nb of days
// **********************************************************

stocksController.get("/:stockName/bull-bear-trend", function(req, res, next) {
  let attribute = req.query.history;
  const stock = req.params.stockName.toUpperCase();

  Stock.findOne({ shortName: stock }, (err, stock) => {
    if (err) return next(err);
    if (!stock) return next(err);

    const today = moment().startOf("day");
    const thirtyDaysAgo = moment(today).subtract(attribute, "days");

    WatchItem.find({
      stockId: stock._id,
      status: "active",
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
      var nbBull = 50 + countPositions(activeWatchItems, "bull");
      var nbBear = 50 + countPositions(activeWatchItems, "bear");
      var percentage = [
        (nbBull / (nbBull + nbBear) * 100).toFixed(2),
        (nbBear / (nbBull + nbBear) * 100).toFixed(2)
      ];

      res.json(percentage);
    });
  });
});

// **********************************************************
// Send wachtitem info for a user on a stock  ===============
// **********************************************************

stocksController.get(
  "/:stockName/watchitem",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const stock = req.params.stockName.toUpperCase();
    const user = req.user;

    Stock.findOne({ shortName: stock }, (err, stock) => {
      if (err) {
        res.json(null);
      }

      if (stock === null) {
        res.json(null);
      } else {
        WatchItem.findOne({
          userId: user._id,
          stockId: stock._id,
          status: "active"
        })
          .then(watchitem => {
            if (!watchitem) {
              //const err = new Error("Not Found");
              //err.status = 404;
              res.json(null);
            } else {
              res.json(watchitem);
            }
          })
          .catch(err => res.json(null));
      }
    });
  }
);

// ***************************************************
// Add stock to  watchlist ===========================
// ***************************************************
stocksController.post(
  "/:name/watchitem/add",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const stockName = req.params.name.toUpperCase();

    Stock.findOne({ shortName: stockName })
      .then(stock => {
        if (!stock) {
          res.json({
            error: req.app.get("env") === "development" ? err : {}
          });
        }
        const newWatchItem = new WatchItem({
          userId: user._id,
          username: user.username,
          stockId: stock._id,
          position: "none"
        });

        newWatchItem.save().then(newItem => {
          User.findByIdAndUpdate(
            user._id,
            {
              $addToSet: { watchList: newItem._id }
            },
            { new: true }
          ).then(user => {
            req.user = user;
            res.json(newItem);
          });
        });
      })
      .catch(err => console.error(err));
  }
);
// ***************************************************
// Remove stock from watchlist =======================
// ***************************************************

stocksController.delete(
  "/:name/watchitem/:watchitemId",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const watchItemId = req.params.watchitemId;
    const stockName = req.params.name.toUpperCase();

    WatchItem.findByIdAndUpdate(watchItemId, { status: "removed" })
      .then(resp => {
        User.findByIdAndUpdate(user._id, {
          $pull: { watchList: watchItemId }
        }).then(resp => {
          res.json({ success: true });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
);
// ***************************************************
// Take position BULL ===========================
// ***************************************************
stocksController.post(
  "/:name/watchitem/bull",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const stockName = req.params.name.toUpperCase();
    const watchitemId = req.query.wi;

    if (!watchitemId) {
      Stock.findOne({ shortName: stockName })
        .then(stock => {
          if (!stock) {
            res.json({
              error: req.app.get("env") === "development" ? err : {}
            });
          }
          const newWatchItem = new WatchItem({
            userId: user._id,
            username: user.username,
            stockId: stock._id,
            initialPrice: stock.price,
            currency: stock.currency,
            position: "bull"
          });

          newWatchItem.save().then(newItem => {
            User.findByIdAndUpdate(
              user._id,
              {
                $addToSet: { watchList: newItem._id }
              },
              { new: true }
            ).then(user => {
              res.json(newItem);
            });
          });
        })
        .catch(err => res.status(404));
    } else {
      WatchItem.findByIdAndUpdate(
        watchitemId,
        {
          status: "removed"
        },
        { new: true }
      ).exec((err, resp) => {
        User.findByIdAndUpdate(user._id, {
          $pull: { watchList: watchitemId }
        }).then(resp => {
          Stock.findOne({ shortName: stockName }).then(stock => {
            if (!stock) {
              res.json({
                error: req.app.get("env") === "development" ? err : {}
              });
            }
            const newWatchItem = new WatchItem({
              userId: user._id,
              username: user.username,
              stockId: stock._id,
              initialPrice: stock.price,
              currency: stock.currency,
              position: "bear"
            });

            newWatchItem.save().then(newItem => {
              User.findByIdAndUpdate(
                user._id,
                {
                  $addToSet: { watchList: newItem._id }
                },
                { new: true }
              ).then(user => {
                res.json(newItem);
              });
            });
          });
        });
      });
    }
  }
);

// ***************************************************
// Close position Bull & Bear =======================
// ***************************************************

stocksController.patch(
  "/:name/watchitem/:watchitemId",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const watchItemId = req.params.watchitemId;
    const stockName = req.params.name.toUpperCase();

    WatchItem.findById(watchItemId)
      .populate("stockId")
      .exec((err, watchItem) => {
        var position = watchItem.position;
        if (position === "bull") {
          // Define new status
          var newStatus =
            watchItem.stockId.price < watchItem.initialPrice ? "lost" : "won";

          // Update score of the user
          var updateScore = Math.floor(
            (watchItem.stockId.price - watchItem.initialPrice) /
              watchItem.initialPrice *
              1000
          );
          User.findByIdAndUpdate(user._id, {
            $inc: { score: updateScore }
          }).exec();
        } else {
          var newStatus =
            watchItem.stockId.price > watchItem.initialPrice ? "lost" : "won";

          // Update score of the user
          var updateScore = Math.floor(
            (watchItem.stockId.price - watchItem.initialPrice) /
              watchItem.initialPrice *
              -1000
          );
        }
        // Update status of watchList
        WatchItem.findByIdAndUpdate(watchItemId, {
          status: newStatus,
          soldPrice: watchItem.stockId.price,
          $inc: { performancePoints: updateScore }
        })
          .then(resp => {
            User.findByIdAndUpdate(user._id, {
              $pull: { watchList: watchItemId }
            }).then(resp => {
              res.json({ success: true });
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
  }
);
// ***************************************************
// Take position BEAR ================================
// ***************************************************
stocksController.post(
  "/:name/watchitem/bear",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const stockName = req.params.name.toUpperCase();
    const watchitemId = req.query.wi;

    if (!watchitemId) {
      Stock.findOne({ shortName: stockName })
        .then(stock => {
          if (!stock) {
            res.json({
              error: req.app.get("env") === "development" ? err : {}
            });
          }

          const newWatchItem = new WatchItem({
            userId: user._id,
            username: user.username,
            stockId: stock._id,
            initialPrice: stock.price,
            currency: stock.currency,
            position: "bear"
          });

          newWatchItem.save().then(newItem => {
            User.findByIdAndUpdate(
              user._id,
              {
                $addToSet: { watchList: newItem._id }
              },
              { new: true }
            ).then(user => {
              res.json(newItem);
            });
          });
        })
        .catch(err => res.status(404));
    } else {
      WatchItem.findByIdAndUpdate(watchitemId, {
        status: "removed"
      }).then(resp => {
        User.findByIdAndUpdate(user._id, {
          $pull: { watchList: watchitemId }
        }).then(resp => {
          Stock.findOne({ shortName: stockName }).then(stock => {
            if (!stock) {
              res.json({
                error: req.app.get("env") === "development" ? err : {}
              });
            }
            const newWatchItem = new WatchItem({
              userId: user._id,
              username: user.username,
              stockId: stock._id,
              initialPrice: stock.price,
              currency: stock.currency,
              position: "bear"
            });

            newWatchItem.save().then(newItem => {
              User.findByIdAndUpdate(
                user._id,
                {
                  $addToSet: { watchList: newItem._id }
                },
                { new: true }
              ).then(user => {
                res.json(newItem);
              });
            });
          });
        });
      });
    }
  }
);

// **********************************************************
// Prefered stock of a user (won watchitems)  ===============
// **********************************************************

stocksController.get(
  "/:stockName/prefered",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const stock = req.params.stockName.toUpperCase();
    const user = req.user;
    const insiderId = req.query.id;

    User.findById(insiderId).then(insider => {
      WatchItem.find({ status: "won" })
        .populate("stockId")
        .exec((err, wis) => {
          if (err) res.json(null);
          res.json(wis);
        });
    });
  }
);

module.exports = stocksController;
