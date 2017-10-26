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
      score = Math.floor((initialPrice - currentPrice) / initialPrice * 1000);
    case "bear":
      score = Math.floor((initialPrice - currentPrice) / initialPrice * -1000);
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
})
  .populate("stockId")
  .exec((err, watchitems) => {
    console.log("watchitems =>", watchitems);
    watchitems.forEach(item => {
      // Update score and close position
      WatchItem.findById(item._id)
        .populate("stockId")
        .exec((err, watchItem) => {
          console.log("watchItem =>", watchItem);
          let updateScore = 0;
          let newStatus = watchItem.status;
          if (watchItem.position === "bull") {
            newStatus =
              watchItem.stockId.price < watchItem.initialPrice ? "lost" : "won";

            // Update score of the user
            updateScore = Math.floor(
              (watchItem.stockId.price - watchItem.initialPrice) * 10
            );
          } else if (watchItem.position === "bear") {
            newStatus =
              watchItem.stockId.price > watchItem.initialPrice ? "lost" : "won";

            // Update score of the user
            updateScore = Math.floor(
              (watchItem.stockId.price - watchItem.initialPrice) * -10
            );
          }

          User.findByIdAndUpdate(watchItem.userId, {
            $inc: { score: updateScore }
          }).exec();

          // close position
          WatchItem.findByIdAndUpdate(watchItem._id, { status: newStatus })
            .then(resp => {
              // Update watchList
              User.findByIdAndUpdate(item.userId._id, {
                $pull: { watchList: watchItemId }
              }).then(resp => {
                console.log("Update with:" + newStatus);
              });
            })
            .catch(err => {
              console.log(err);
            });
        });
    });
  });

// Update score
WatchItem.find({ status: "active", bull et bear uniquement})
  .populate("userId")
  .populate("stockId")
  .exec((err, watchList) => {
    console.log("watchIList************* =>", watchList);
    // calculate score
    watchList.forEach(watchItem => {
      let updateScore = calculateScore(
        watchItem.position,
        watchItem.initialPrice,
        watchItem.stockId.price
      );
      console.log("watchItem =>", watchItem);
      User.findByIdAndUpdate(userId._id, {
        $inc: { score: updateScore }
      }).exec();
    });
    mongoose.connection.close();
  });
