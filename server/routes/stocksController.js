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
// Send BULL & BEAR trending percentage =====================
// **********************************************************

stocksController.get("/:stockName/bullbeartrend", function(req, res, next) {
  const stock = req.params.stockName.toUpperCase();

  Stock.findOne({ longName: stock }, (err, stock) => {
    if (err) return next(err);
    if (!stock) return next(err);

    WatchItem.find({
      stockId: stock._id,
      status: "active"
    }).then(activeWatchItems => {
      function countPositions(array, property, bullOrBear) {
        return array.filter(object => {
          property === position;
        }).length;
      }
      var nbBullFull = countPositions(activeWatchItems, position, "bull");
      var nbBearFull = countPositions(activeWatchItems, position, "bull");
      res.json([nbBullFull, nbBearFull]);
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
          const err = new Error("Not Found");
          err.status = 404;
          res.json(err.status);
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

stocksController.get("/babbles", function(req, res, next) {
  const stock = req.params.name.toUpperCase();

  Stock.findOne({ longName: stock }, (err, stock) => {
    if (err) return next(err);
    if (!stock) return next(err);

    Babble.find({ stockLink: stock._id })
      .sort({ updated_at: -1 })
      .populate("user")
      .exec((err, timeline) => {
        res.json({
          timeline,
          moment
        });
      });
  });
});

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
            res.locals.user = user;
            res.json({ success: true, watchItemId: newItem._id });
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
  "/:name/watchitem",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const watchItemId = req.body.watchItemId;
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
            res.json({ success: true, watchItemId: newItem._id });
          });
        });
      })
      .catch(err => res.status(404));
  }
);

// ***************************************************
// Close position Bull =======================
// ***************************************************

stocksController.delete(
  "/:name/watchitem/bull-rem",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const watchItemId = req.body.watchItemId;
    const stockName = req.params.name.toUpperCase();

    WatchItem.findById(watchItemId)
      .populate("stockId")
      .exec((err, watchItem) => {
        console.log("************WATCHITEM*****", watchItem);
        let newStatus =
          watchItem.stockId.price < watchItem.initialPrice ? "lost" : "won";

        // Update score of the user
        let updateScore = Mathfloor(
          (watchItem.stockId.price - watchItem.initialPrice) * 10
        );
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
            res.json({
              success: true,
              watchItemId: newItem._id
            });
          });
        });
      })
      .catch(err => res.status(404));
  }
);

// ***************************************************
// Close position Bear =======================
// ***************************************************

stocksController.delete(
  "/:name/watchitem/bear-rem",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const watchItemId = req.body.watchItemId;
    const stockName = req.params.name.toUpperCase();

    WatchItem.findById(watchItemId)
      .populate("stockId")
      .then(watchItem => {
        let newStatus =
          watchItem.stockId.price > watchItem.initialPrice ? "lost" : "won";

        // Update score of the user
        let updateScore = Mathfloor(
          (watchItem.stockId.price - watchItem.initialPrice) * -1000
        );
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

module.exports = stocksController;
