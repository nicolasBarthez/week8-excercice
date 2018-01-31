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

// mongoose.connect(
//   "mongodb://heroku_7mw65z8c:94jfeq25dddc8ktr3u7psc5dru@ds137435.mlab.com:37435/heroku_7mw65z8c"
// );

mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
});

function calculateScore(position, initialPrice, currentPrice) {
  let score;
  initialPrice = parseFloat(initialPrice);
  currentPrice = parseFloat(currentPrice);
  console.log("Donnee d'entree", position, initialPrice, currentPrice);

  switch (position) {
    case "bull":
      score = (currentPrice - initialPrice) / initialPrice * 1000;
      break;
    case "bear":
      score = (currentPrice - initialPrice) / initialPrice * -1000;
      break;
    default:
      score = 0;
  }

  return parseFloat(score);
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
          let updateScore = 0;
          let newStatus = watchItem.status;
          if (watchItem.position === "bull") {
            newStatus =
              watchItem.stockId.price < watchItem.initialPrice ? "lost" : "won";

            // Update score of the user
            updateScore = Math.floor(
              (watchItem.stockId.price - watchItem.initialPrice) /
                watchItem.initialPrice *
                1000
            );
          } else if (watchItem.position === "bear") {
            newStatus =
              watchItem.stockId.price > watchItem.initialPrice ? "lost" : "won";

            // Update score of the user
            updateScore = Math.floor(
              (watchItem.stockId.price - watchItem.initialPrice) /
                watchItem.initialPrice *
                -1000
            );
          }

          // close position
          WatchItem.findByIdAndUpdate(watchItem._id, {
            status: newStatus,
            soldPrice: watchItem.stockId.price,
            $inc: { performancePoints: updateScore }
          })
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
// WatchItem.find({ status: "active", position: { $in: ["bull", "bear"] } })
//   .populate("stockId")
//   .exec((err, watchList) => {
//     // calculate score
//     watchList.forEach(watchItem => {
//       console.log("watchItem", watchItem);
//       let updateScore = calculateScore(
//         watchItem.position,
//         watchItem.initialPrice,
//         watchItem.stockId.price
//       );
//
//       console.log("additional points", updateScore);
//       WatchItem.findByIdAndUpdate(watchItem._id, {
//         $inc: { performancePoints: updateScore }
//       }).exec();
//     });
//     mongoose.connection.close();
//   });
