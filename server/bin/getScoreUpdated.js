// update all score users according to there position
// To be run everyday at midnight
require("dotenv").config();
const Stock = require("../models/stock");
const axios = require("axios");
const mongoose = require("mongoose");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const moment = require("moment");

mongoose.connect(process.env.MONGODB_URI, {
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

// Set today & thirtyDaysAgo dates
const today = moment().startOf("day");
const thirtyDaysAgo = moment(today).subtract(30, "days");

// Close the watchItems created more than 30 days ago
WatchItem.find({
  status: "active",
  created_at: {
    $lte: thirtyDaysAgo.toDate()
  }
}).populate("stockId").exec((err,watchitems)=>{
  watchitems.forEach(item=>{
    // Update score and close position
    WatchItem.findById(item._id)
      .populate("stockId")
      .exec((err, watchItem) => {
        if(watchItem.position ==="bull"){
          let newStatus =
            watchItem.stockId.price < watchItem.initialPrice ? "lost" : "won";

          // Update score of the user
          let updateScore = Mathfloor(
            (watchItem.stockId.price - watchItem.initialPrice) * 10
          );
        } else if(watchItem.position ==="bear"){
          let newStatus =
            watchItem.stockId.price > watchItem.initialPrice ? "lost" : "won";

          // Update score of the user
          let updateScore = Mathfloor(
            (watchItem.stockId.price - watchItem.initialPrice) * -10
          );
        }

        User.findByIdAndUpdate(user._id, {
          $inc: { score: updateScore }
        }).exec();

        // close position
        WatchItem.findByIdAndUpdate(watchItemId, { status: newStatus })
          .then(resp => {
            // Update watchList
            User.findByIdAndUpdate(user._id, {
              $pull: { watchList: watchItemId }
            }).then(resp => {
              console.log("Update with:"+newStatus);
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
  })
}));


// Update score
WatchItem.find({ status: "active" })
  .populate("userId")
  .populate("stockId")
  .exec((err, watchList) => {
    // calculate score
    watchList.forEach(watchItem => {
      let updateScore = calculateScore(
        watchItem.position,
        watchItem.initialPrice,
        watchItem.stockId.price
      );
      User.findByIdAndUpdate(userId._id, {
        $inc: { score: updateScore }
      }).exec();
    });
  });
