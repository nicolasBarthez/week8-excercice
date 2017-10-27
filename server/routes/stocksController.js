const express = require("express");
const stocksController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");
const moment = require("moment");
// **********************************************************
// Send stock info  =========================================
// **********************************************************
stocksController.get("/:stockName", function(req, res, next) {
  const stock = req.params.stockName.toUpperCase();

  Stock.findOne({ longName: stock }, (err, stock) => {
    if (err) return next(err);
    if (!stock) return next(err);
    res.json(stock);
  });
});
// **********************************************************
// Send BULL & BEAR trending percentage according nb of days
// **********************************************************

stocksController.get("/:stockName/bull-bear-trend", function(req, res, next) {
  let attribute = req.query.history;
  const stock = req.params.stockName.toUpperCase();

  Stock.findOne({ longName: stock }, (err, stock) => {
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

      Stock.findOne({ longName: stock }, (err, stock) => {
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
          var nbBull = countPositions(activeWatchItems, "bull");
          var nbBear = countPositions(activeWatchItems, "bear");
          var percentage = [
            nbBull / (nbBull + nbBear),
            nbBear / (nbBull + nbBear)
          ];

          res.json(percentage);
        });
      });
    });
  });
});
// **********************************************************
// Send wachtlist info  =====================================
// **********************************************************

stocksController.get(
  "/:stockName/watchitem",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const stock = req.params.stockName.toUpperCase();
    const user = req.user;

    Stock.findOne({ longName: stock }, (err, stock) => {
      WatchItem.findOne({
        userId: user._id,
        stockId: stock._id,
        status: "active"
      }).then(watchitem => {
        if (!watchitem) {
          //const err = new Error("Not Found");
          //err.status = 404;
          res.json(null);
        } else {
          res.json(watchitem);
        }
      });
    });
  }
);
// ***************************************************
// Send babbles info linked to a stock ===============
// ***************************************************

stocksController.get(
  "/babbles",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const stock = req.params.name.toUpperCase();
    const user = req.user;
    const sort = req.query.sort;
    const page = req.query.page;
    const group = page * 50;

    if (!sort) {
      Stock.findOne({ longName: stock }, (err, stock) => {
        if (err) return next(err);
        if (!stock) return next(err);

        Babble.find({ stockLink: stock._id })
          .sort({ updated_at: -1 })
          .populate("user")
          .limit(group)
          .exec((err, timeline) => {
            res.json({
              timeline,
              moment
            });
          });
      });
    } else if (sort === "me") {
      Stock.findOne({ longName: stock }, (err, stock) => {
        if (err) return next(err);
        if (!stock) return next(err);

        Babble.find({ stockLink: stock._id, user: user._id })
          .sort({ updated_at: -1 })
          .populate("user")
          .limit(group)
          .exec((err, timeline) => {
            res.json({
              timeline,
              moment
            });
          });
      });
    } else if (sort === "insider-mates") {
      Stock.findOne({ longName: stock }, (err, stock) => {
        if (err) return next(err);
        if (!stock) return next(err);

        User.findById(user._id, { following }).then(insiderMates => {
          Babble.find({ $in: { user: insiderMates } })
            .sort({ updated_at: -1 })
            .populate("user")
            .limit(group)
            .exec((err, timeline) => {
              res.json({
                timeline,
                moment
              });
            });
        });
      });
    }
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

    Stock.findOne({ longName: stockName })
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

    Stock.findOne({ longName: stockName })
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
            req.user = user;
            res.locals.user = user;
            res.json(newItem);
          });
        });
      })
      .catch(err => res.status(404));
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
        console.log("************WATCHITEM*****", watchItem);
        var position = watchItem.position;
        if (position === "bull") {
          // Define new status
          var newStatus =
            watchItem.stockId.price < watchItem.initialPrice ? "lost" : "won";

          // Update score of the user
          var updateScore = Math.floor(
            (watchItem.stockId.price - watchItem.initialPrice) * 10
          );
          User.findByIdAndUpdate(user._id, {
            $inc: { score: updateScore }
          }).exec();
        } else {
          var newStatus =
            watchItem.stockId.price > watchItem.initialPrice ? "lost" : "won";

          // Update score of the user
          var updateScore = Math.floor(
            (watchItem.stockId.price - watchItem.initialPrice) * -10
          );
        }
        // Update status of watchList
        User.findByIdAndUpdate(user._id, {
          $inc: { score: updateScore }
        }).exec();

        WatchItem.findByIdAndUpdate(watchItemId, { status: newStatus })
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

    Stock.findOne({ longName: stockName })
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
            req.user = user;
            res.locals.user = user;
            res.json(newItem);
          });
        });
      })
      .catch(err => res.status(404));
  }
);

module.exports = stocksController;
