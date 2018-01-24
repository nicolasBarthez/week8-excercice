const express = require("express");
const adminController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");
const moment = require("moment");

// **********************************************************
// Send users list
// **********************************************************

adminController.get(
  "/users",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    if (user.role !== "admin") {
      res.json("unauthorized");
    } else {
      User.find()
        .sort({ created_at: -1 })
        .exec((err, resp) => {
          if (err) res.json(null);
          return res.json(resp);
        });
    }
  }
);

// **********************************************************
// Send stocks list
// **********************************************************

adminController.get(
  "/stocks",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    if (user.role !== "admin") {
      res.json("unauthorized");
    } else {
      Stock.find().exec((err, stocks) => {
        if (err) return res.json(null);
        res.json(stocks);
      });
    }
  }
);

adminController.get(
  "/stocks/:id",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const stock = req.params.id.toUpperCase();
    if (user.role !== "admin") {
      res.json("unauthorized");
    } else {
      Stock.findById(stock).exec((err, resp) => {
        if (err) res.json(err);
        return res.json(resp);
      });
    }
  }
);

adminController.patch(
  "/stocks/edit",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;

    const newStock = {
      location: req.body.location,
      longName: req.body.longName,
      shortName: req.body.shortName,
      index: req.body.index,
      isin: req.body.isin,
      currency: req.body.currency,
      currency2: req.body.currency2,
      symbolPrice: req.body.symbolPrice,
      price: req.body.price,
      price2: req.body.price2,
      volume: req.body.volume,
      description: req.body.description,
      descriptionEng: req.body.descriptionEng,
      stockImg: req.body.stockImg,
      scrapKey: req.body.scrapKey
    };

    const stockId = req.body._id;

    Stock.findByIdAndUpdate(stockId, newStock, {
      new: true
    }).exec((err, resp) => {
      if (err) res.json(err);
      return res.json(resp);
    });
  }
);

adminController.delete(
  "/stocks/delete/:id",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const stockId = req.params.id;
    console.log("stockId", stockId);
    Stock.findByIdAndRemove(stockId).exec((err, resp) => {
      if (err) res.json(err);
      console.log("RESP", resp);
      return res.json(resp);
    });
  }
);

adminController.post(
  "/stocks/create",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const stock = req.body;

    const newStock = new Stock(stock);

    newStock.save(err => {
      if (err) {
        res.json(err);
      } else {
        res.json(newStock);
      }
    });
  }
);

module.exports = adminController;
