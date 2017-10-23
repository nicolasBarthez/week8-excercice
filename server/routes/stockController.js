const express = require("express");
const stockController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const moment = require("moment");
const getStockPrice = require("../api/getStockPrice");

// STOCK SECTION ======================================
stockController.get("/:name", function(req, res, next) {
  const stock = req.params.name.toUpperCase();
  const stockId = req.params.name;

  Stock.findOne({ longName: stock }, (err, stock) => {
    if (err) return next(err);
    if (!stock) return next(err);

    // Calculate Bull / Bear percentage

    const bull = Number(stock.trend[0]);
    const bear = Number(stock.trend[1]);

    const bullPercent = (100 * bull / (bull + bear)).toFixed(2);
    const bearPercent = (100 * bear / (bull + bear)).toFixed(2);

    Babble.find({ stockLink: stock._id })
      .sort({ created_at: -1 })
      .populate("user_id")
      .exec((err, timeline) => {
        res.render("stock/stock", {
          stockId,
          stock,
          timeline,
          moment,
          user: req.user,
          price,
          percent,
          bullPercent,
          bearPercent
        });
      });
  });
});

// Follow an insiders
stockController.post("/follow/:id", (req, res, next) => {
  const user = req.user;
  const insiderId = req.params.name;
  // GAMIFICATION => Add 20 points per people that follow you
  User.findByIdAndUpdate(insiderId, { $inc: { score: 20 } }).exec();

  User.findByIdAndUpdate(
    { _id: user._id },
    { $push: { following: insiderId } },
    err => {
      if (err) {
        return next(err);
      }
      // GAMIFICATION => +10 points per babble replied posted
      User.findByIdAndUpdate(user._id, { $inc: { score: 10 } }).exec();
      return res.redirect(`/stock/${stockId}`);
    }
  );
});

// Post a babble
stockController.post("/:name", (req, res, next) => {
  const user = req.user;
  const stockId = req.params.name;

  findStock(req.body.babble).then(text => {
    const newBabble = new Babble({
      user_id: user._id,
      user_name: user.local.username,
      babble: req.body.babble,
      stockLink: text
    });

    newBabble.save(err => {
      if (err) {
        return;
      }

      newBabble.save(err => {
        if (err) {
          res.render("stock/stock", {
            username: user.username
          });
        } else {
          // GAMIFICATION => +20 points per babble posted
          User.findByIdAndUpdate(user._id, { $inc: { score: 20 } }).exec();
          res.redirect(`/stock/${stockId}`);
        }
      });
    });
  });
});

//reply
stockController.post("/:name/reply", (req, res, next) => {
  const user = req.user;
  const user_id = user._id;
  const user_name = user.local.username;
  const babble = req.body.parentModal;
  const stockId = req.params.name;

  Babble.findById(babble, (err, babble) => {
    if (err) {
      return next(err);
    }

    const newReply = new Babble({
      user_id,
      user_name,
      babble: req.body.babble
    });

    Babble.findByIdAndUpdate(
      { _id: babble._id },
      { $push: { reply: newReply } },
      err => {
        if (err) {
          return next(err);
        }
        // GAMIFICATION => +10 points per babble replied posted
        User.findByIdAndUpdate(user._id, { $inc: { score: 10 } }).exec();
        return res.redirect(`/stock/${stockId}`);
      }
    );
  });
});

// New like
stockController.post("/:name/like", (req, res, next) => {
  const babble = req.body.likeInput;
  const stockId = req.params.name;

  Babble.findByIdAndUpdate(babble, { $inc: { like: 1 } }).exec();
  Babble.findByIdAndUpdate(babble)
    .populate("user_id")
    .exec((err, user) => {
      // GAMIFICATION => receive 10 points because receive 1 like
      User.findByIdAndUpdate(user.user_id._id, { $inc: { score: 10 } }).exec();
      if (err) return next(err);
      res.redirect(`/stock/${stockId}`);
    });
});

// Add to watchList
stockController.post("/:name/watchlist", (req, res, next) => {
  const user = req.user;
  const stockId = req.params.name.toUpperCase();
  Stock.findOne({ longName: stockId })
    .then(stock => {
      if (!stock) {
        res.redirect("/stock/" + stockId);
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
          res.redirect(`/stock/${stockId}`);
        });
      });
    })
    .catch(err => console.error(err));
});

// Post a bull
stockController.post("/:name/bull", (req, res, next) => {
  const user = req.user;
  const stockId = req.params.name.toUpperCase();
  const price = req.body.priceToSend;

  Stock.findOne({ longName: stockId })
    .then(stock => {
      if (!stock) {
        res.redirect("/stock/" + stockId);
      }
      const updateBull = Number(stock.trend[0]) + 1;
      const updateBear = Number(stock.trend[1]);

      stock.trend = [updateBull, updateBear];
      stock.save();

      const newWatchItem = new WatchItem({
        userId: user._id,
        username: user.local.username,
        stockId: stock._id,
        position: "bull",
        initialPrice: price
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
          res.redirect(`/stock/${stockId}`);
        });
      });
    })
    .catch(err => console.error(err));
});

// Post a bear
stockController.post("/:name/bear", (req, res, next) => {
  const user = req.user;
  const stockId = req.params.name.toUpperCase();
  const price = req.body.priceToSend;

  Stock.findOne({ longName: stockId })
    .then(stock => {
      if (!stock) {
        res.redirect("/stock/" + stockId);
      }

      const updateBull = Number(stock.trend[0]);
      const updateBear = Number(stock.trend[1]) + 1;

      stock.trend = [updateBull, updateBear];
      stock.save();

      const newWatchItem = new WatchItem({
        userId: user._id,
        username: user.local.username,
        stockId: stock._id,
        position: "bear",
        initialPrice: price
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
          res.redirect(`/stock/${stockId}`);
        });
      });
    })
    .catch(err => console.error(err));
});

module.exports = stockController;
