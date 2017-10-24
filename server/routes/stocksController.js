const express = require("express");
const stocksController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const moment = require("moment");

// **********************************************************
// Send stock info  ======================================
// **********************************************************

stocksController.get("/:stockName", function(req, res, next) {
  const stock = req.params.stockName.toUpperCase();

  Stock.findOne({ longName: stock }, (err, stock) => {
    if (err) return next(err);
    if (!stock) return next(err);
    res.json({
      stock
    });
  });
});

// ***************************************************
// Send babbles info linked to a stock =================
// ***************************************************

stocksController.get("/babbles", function(req, res, next) {
  const stock = req.params.name.toUpperCase();

  Stock.findOne({ longName: stock }, (err, stock) => {
    if (err) return next(err);
    if (!stock) return next(err);

    Babble.find({ stockLink: stock._id })
      .sort({ updated_at: -1 })
      .populate("user_id")
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
stocksController.post("/:name/watchlist/add", (req, res, next) => {
  const user = req.user;
  const stockId = req.params.name.toUpperCase();
  Stock.findOne({ longName: stockId })
    .then(stock => {
      if (!stock) {
        res.json({
          error: req.app.get("env") === "development" ? err : {}
        });
      }
      const newWatchItem = new WatchItem({
        userId: user._id,
        username: user.local.username,
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
          res.json({ success: true });
        });
      });
    })
    .catch(err => console.error(err));
});

module.exports = stocksController;
