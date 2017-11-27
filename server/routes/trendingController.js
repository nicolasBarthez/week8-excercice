const express = require("express");
const trendingController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");
const moment = require("moment");
const {
  sortTrendingByNameDes,
  sortTrendingByNameAsc,
  sortTrendingByPriceDes,
  sortTrendingByPriceAsc,
  sortTrendingByvariationDes,
  sortTrendingByvariationAsc,
  sortTrendingByVolumeDes,
  sortTrendingByVolumeAsc,
  sortTrendingByTrendingDes,
  sortTrendingByTrendingAsc,
  sortTrendingByHotInsightsDes,
  sortTrendingByHotInsightsAsc,
  sortTrendingByBestInsiderDes,
  sortTrendingByBestInsiderAsc
} = require("../config/sortingFunction.js");

// const sortFunctions = {
//   namedsc: sortTrendingByNameDes,
//   nameasc: sortTrendingByNameAsc,
//   priceasc: sortTrendingByPriceAsc,
//   pricedsc: sortTrendingByPriceDes,
//   varasc: sortTrendingByvariationAsc,
//   vardsc: sortTrendingByvariationDes,
//   volasc: sortTrendingByVolumeAsc,
//   voldsc: sortTrendingByVolumeDes,
//   trendasc: sortTrendingByTrendingAsc,
//   trenddsc: sortTrendingByTrendingDes,
//   hiasc: sortTrendingByHotInsightsAsc,
//   hidsc: sortTrendingByHotInsightsDes,
//   biasc: sortTrendingByBestInsiderAsc,
//   bidsc: sortTrendingByBestInsiderDes
// };

//sortFunctions[req.query.sort]

// **********************************************************
// Send info about Stocks (with specified index)  ===========
// **********************************************************
trendingController.get("/", function(req, res, next) {
  console.log(req.query);
  let indexSelected = req.query.index || "all";
  let sortBy = req.query.sort;
  const stockTrendBoard = [];

  const queryObject = {};
  if (indexSelected !== "all") {
    queryObject.index = indexSelected;
  }

  // retrieve all stocks
  Stock.find(queryObject).exec((err, stocks) => {
    if (err) return res.json(null);

    stocks.forEach(stock => {
      const stockCurrentTrend = {
        longName: stock.longName,
        shortName: stock.shortName,
        currentPrice: stock.price,
        currency: stock.currency,
        variation: stock.variation,
        volume: stock.volume
      };
      // looking for insider trending
      const today = moment().startOf("day");
      const thirtyDaysAgo = moment(today).subtract(30, "days");

      WatchItem.find({
        stockId: stock._id,
        status: "active",
        position: {
          $in: ["bull", "bear"]
        },
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
        let nbBull = 50 + countPositions(activeWatchItems, "bull");
        let nbBear = 50 + countPositions(activeWatchItems, "bear");

        if (nbBull < nbBear) {
          var currentPercentage = (nbBear / (nbBull + nbBear) * 100).toFixed(2);
          var currentTrend = {
            trend: "bear",
            percentage: currentPercentage
          };
        } else {
          var currentPercentage = (nbBull / (nbBull + nbBear) * 100).toFixed(2);
          var currentTrend = {
            trend: "bull",
            percentage: currentPercentage
          };
        }
        stockCurrentTrend.trending = currentTrend;

        // Add Hot insights
        Babble.find({
          stockLink: stock._id,
          created_at: {
            $gte: thirtyDaysAgo.toDate()
          }
        }).then(babbles => {
          stockCurrentTrend.hotInsights = 0 + babbles.length;

          stockCurrentTrend.nbOfLikes =
            0 +
            babbles.map(item => item.like).reduce((sum, next) => {
              return sum + next.length;
            }, 0);

          // Add the current 3 best insiders on it
          const oneHundredDaysAgo = moment(today).subtract(100, "days");
          WatchItem.find({
            stockId: stock._id,
            created_at: {
              $gte: oneHundredDaysAgo.toDate()
            },
            status: "won"
          })
            .sort({
              performancePoints: -1
            })
            .limit(3)
            .populate("userId")
            .exec((err, wisWon) => {
              const bestInsiders = [];
              wisWon.forEach(ww => {
                let insider = {
                  id: ww.userId._id,
                  username: ww.userId.username,
                  perf: ww.performancePoints
                };
                if (insider.perf > 0) {
                  bestInsiders.push(insider);
                }
              });
              stockCurrentTrend.bestInsiders = bestInsiders;

              stockTrendBoard.push(stockCurrentTrend);

              if (stockTrendBoard.length === stocks.length) {
                switch (sortBy) {
                  case "namedsc":
                    stockTrendBoard.sort(sortTrendingByNameDes);
                    break;
                  case "nameasc":
                    stockTrendBoard.sort(sortTrendingByNameAsc);
                    break;
                  case "priceasc":
                    stockTrendBoard.sort(sortTrendingByPriceAsc);
                    break;
                  case "pricedsc":
                    stockTrendBoard.sort(sortTrendingByPriceDes);
                    break;
                  case "varasc":
                    stockTrendBoard.sort(sortTrendingByvariationAsc);
                    break;
                  case "vardsc":
                    stockTrendBoard.sort(sortTrendingByvariationDes);
                    break;
                  case "volasc":
                    stockTrendBoard.sort(sortTrendingByVolumeAsc);
                    break;
                  case "voldsc":
                    stockTrendBoard.sort(sortTrendingByVolumeDes);
                    break;
                  case "trendasc":
                    stockTrendBoard.sort(sortTrendingByTrendingAsc);
                    break;
                  case "trenddsc":
                    stockTrendBoard.sort(sortTrendingByTrendingDes);
                    break;
                  case "hiasc":
                    stockTrendBoard.sort(sortTrendingByHotInsightsAsc);
                    break;
                  case "hidsc":
                    stockTrendBoard.sort(sortTrendingByHotInsightsDes);
                    break;
                  case "biasc":
                    stockTrendBoard.sort(sortTrendingByBestInsiderAsc);
                    break;
                  case "bidsc":
                    stockTrendBoard.sort(sortTrendingByBestInsiderDes);
                    break;
                  default:
                    stockTrendBoard.sort(sortTrendingByTrendingDes);
                }

                res.json(stockTrendBoard);
              }
            });
        });
      });
    });
  });
});

// **********************************************************
// Send info about Stocks (all index)  =======================
// **********************************************************
// trendingController.get("/", function(req, res, next) {
//   let sortBy = req.query.sort;
//   const stockTrendBoard = [];
//
//   // retrieve all stocks
//   Stock.find().exec((err, stocks) => {
//     if (err) return res.json(null);
//
//     stocks.forEach(stock => {
//       const stockCurrentTrend = {
//         longName: stock.longName,
//         currentPrice: stock.price,
//         variation: stock.variation,
//         volume: stock.volume
//       };
//       // looking for insider trending
//       const today = moment().startOf("day");
//       const thirtyDaysAgo = moment(today).subtract(30, "days");
//
//       WatchItem.find({
//         stockId: stock._id,
//         status: "active",
//         position: { $in: ["bull", "bear"] },
//         created_at: {
//           $gte: thirtyDaysAgo.toDate()
//         }
//       }).then(activeWatchItems => {
//         function countPositions(array, position) {
//           return array
//             .map(item => {
//               return item.position == position;
//             })
//             .filter(val => {
//               return val === true;
//             }).length;
//         }
//         let nbBull = 50 + countPositions(activeWatchItems, "bull");
//         let nbBear = 50 + countPositions(activeWatchItems, "bear");
//
//         if (nbBull < nbBear) {
//           var currentPercentage = (nbBear / (nbBull + nbBear) * 100).toFixed(2);
//           var currentTrend = {
//             trend: "bear",
//             percentage: currentPercentage
//           };
//         } else {
//           var currentPercentage = (nbBull / (nbBull + nbBear) * 100).toFixed(2);
//           var currentTrend = {
//             trend: "bull",
//             percentage: currentPercentage
//           };
//         }
//         stockCurrentTrend.trending = currentTrend;
//
//         // Add Hot insights
//         Babble.find({
//           stockLink: stock._id,
//           created_at: {
//             $gte: thirtyDaysAgo.toDate()
//           }
//         }).then(babbles => {
//           stockCurrentTrend.hotInsights = 0 + babbles.length;
//           console.log(babbles.map(item => item.like));
//           stockCurrentTrend.nbOfLikes =
//             0 +
//             babbles.map(item => item.like).reduce((sum, next) => {
//               return sum + next.length;
//             }, 0);
//
//           // Add the current 3 best insiders on it
//           const oneHundredDaysAgo = moment(today).subtract(100, "days");
//           WatchItem.find({
//             stockId: stock._id,
//             created_at: {
//               $gte: oneHundredDaysAgo.toDate()
//             },
//             status: "won"
//           })
//             .sort({ performancePoints: -1 })
//             .limit(3)
//             .populate("userId")
//             .exec((err, wisWon) => {
//               const bestInsiders = [];
//               wisWon.forEach(ww => {
//                 console.log("XWWWW*********", ww);
//                 let insider = {
//                   id: ww.userId._id,
//                   username: ww.userId.username,
//                   perf: ww.performancePoints
//                 };
//                 if (insider.perf > 0) {
//                   bestInsiders.push(insider);
//                 }
//               });
//               stockCurrentTrend.bestInsiders = bestInsiders;
//               stockTrendBoard.push(stockCurrentTrend);
//
//               if (stockTrendBoard.length === stocks.length) {
//                 switch (sortBy) {
//                   case "namedsc":
//                     stockTrendBoard.sort(sortTrendingByNameDes);
//                     break;
//                   case "nameasc":
//                     stockTrendBoard.sort(sortTrendingByNameAsc);
//                     break;
//                   case "priceasc":
//                     stockTrendBoard.sort(sortTrendingByPriceAsc);
//                     break;
//                   case "pricedsc":
//                     stockTrendBoard.sort(sortTrendingByPriceDes);
//                     break;
//                   case "varasc":
//                     stockTrendBoard.sort(sortTrendingByvariationAsc);
//                     break;
//                   case "vardsc":
//                     stockTrendBoard.sort(sortTrendingByvariationDes);
//                     break;
//                   case "volasc":
//                     stockTrendBoard.sort(sortTrendingByVolumeAsc);
//                     break;
//                   case "voldsc":
//                     stockTrendBoard.sort(sortTrendingByVolumeDes);
//                     break;
//                   case "trendasc":
//                     stockTrendBoard.sort(sortTrendingByTrendingAsc);
//                     break;
//                   case "trenddsc":
//                     stockTrendBoard.sort(sortTrendingByTrendingDes);
//                     break;
//                   case "hiasc":
//                     stockTrendBoard.sort(sortTrendingByHotInsightsAsc);
//                     break;
//                   case "hidsc":
//                     stockTrendBoard.sort(sortTrendingByHotInsightsDes);
//                     break;
//                   case "biasc":
//                     stockTrendBoard.sort(sortTrendingByBestInsiderAsc);
//                     break;
//                   case "bidsc":
//                     stockTrendBoard.sort(sortTrendingByBestInsiderDes);
//                     break;
//                   default:
//                     stockTrendBoard.sort(sortTrendingByTrendingDes);
//                 }
//
//                 res.json(stockTrendBoard);
//               }
//             });
//         });
//       });
//     });
//   });
// });

module.exports = trendingController;
