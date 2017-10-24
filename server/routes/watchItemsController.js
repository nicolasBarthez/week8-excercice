const express = require("express");
const wathchItemsController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const moment = require("moment");

// **********************************************************
// Send stock info  ======================================
// **********************************************************

wathchItemsController.get("/:stockName", function(req, res, next) {
  const stock = req.params.stockName.toUpperCase();

  Stock.findOne({ longName: stock }, (err, stock) => {
    if (err) return next(err);
    if (!stock) return next(err);
    res.json({
      stock
    });
  });
});

module.exports = wathchItemsController;
