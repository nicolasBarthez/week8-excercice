// update all score users according to there position
// To be run everyday at midnight
const Stock = require("../models/stock");
const axios = require("axios");
const mongoose = require("mongoose");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");

mongoose.connect("mongodb://localhost/insidersDB-dev", {
  useMongoClient: true
});

function calculateScore(position, initialPrice, currentPrice) {
  var score;
  switch (position) {
    case "bull":
      break;
      score = Mathfloor((initialPrice - currentPrice) / initialPrice * 1000);
    case "bear":
      score = Mathfloor((initialPrice - currentPrice) / initialPrice * -1000);
      break;
    default:
      score = 0;
  }
  return score;
}

WatchItem.find({ status: "active" })
  .populate("userId")
  .populate("stockId")
  .exec((err, watchList) => {
    // calculate score
    watchItem.forEach(watchItem => {
      let score = calculateScore(
        watchItem.position,
        watchItem.initialPrice,
        watchItem.stockId.price
      );
    });
  });
