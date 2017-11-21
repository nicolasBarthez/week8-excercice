require("dotenv").config();
const express = require("express");
const dashboardsController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");
const moment = require("moment");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
const storage = cloudinaryStorage({
  cloudinary,
  folder: "user-images",
  allowedFormats: ["jpg", "jpeg", "png", "gif", "tiff"]
});
const parser = multer({ storage });

// **********************************************************
// Upload image of users connected
// **********************************************************
dashboardsController.post(
  "/upload",
  parser.single("image"),
  (req, res, next) => {
    res.json(req.file);
  }
);

// **********************************************************
// Update user profile
// **********************************************************
dashboardsController.patch(
  "/edit",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const id = req.user._id;
    const bio = req.body.bio;
    const skills = req.body.skills;
    const location = req.body.location;
    const picProfile = req.body.picture;

    User.findByIdAndUpdate(
      id,
      {
        location,
        skills,
        bio,
        picProfile
      },
      { new: true }
    ).exec((err, response) => {
      console.log(err);
      res.json(response);
    });
  }
);

// **********************************************************
// Send users connected info for Dashboard header
// **********************************************************

dashboardsController.get(
  "/profile",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;

    User.findById(user._id).exec((err, us) => {
      if (err) res.json(null);
      let userInfo = {
        username: us.username,
        following: us.following,
        picProfile: us.picProfile,
        location: us.location,
        skills: us.skills,
        following: us.following.length
      };

      Babble.find({
        user: user._id
      }).then(babbles => {
        userInfo.nbBabbles = 0 + babbles.length;

        userInfo.nbOfLikes =
          0 +
          babbles.map(item => item.like).reduce((sum, next) => {
            return sum + next.length;
          }, 0);

        // Calculate prefered stocks
        WatchItem.find({
          userId: user._id,
          status: "won"
        })
          .populate("stockId")
          .exec((err, wis) => {
            if (err) res.json(null);

            if (wis) {
              // first, convert data into a Map with reduce
              function reduceArrayByStockPoints(array) {
                const map = array.reduce((map, wi) => {
                  const stock = wi.stockId;
                  if (!map.get(stock._id)) {
                    map.set(stock._id, {
                      longName: stock.longName,
                      shortName: stock.shortName,
                      performancePoints: 0
                    });
                  }
                  map.get(stock._id).performancePoints += wi.performancePoints;
                  return map;
                }, new Map());

                // then, map your counts object back to an array
                return Array.from(map).map(([stockId, data]) => {
                  return Object.assign({ stockId }, data);
                });
              }
              let rankingByPoints = reduceArrayByStockPoints(wis);

              sortStockDes = function(a, b) {
                if (a.performancePoints < b.performancePoints) return 1;
                if (a.performancePoints > b.performancePoints) return -1;
                return 0;
              };

              rankingByPoints = rankingByPoints.sort(sortStockDes);
              userInfo.preferedStocks = rankingByPoints;
            }

            WatchItem.find({
              userId: user._id,
              status: {
                $in: ["won", "lost"]
              }
            }).exec((err, wiClosed) => {
              if (wiClosed.length > 0) {
                // Calculate performance points
                userInfo.performancePoints = wiClosed
                  .map(item => item.performancePoints)
                  .reduce((prev, next) => prev + next);

                userInfo.nbOfInsightsWon = wiClosed.filter(item => {
                  return item.status == "won";
                }, 0).length;
              } else {
                userInfo.performancePoints = 0;
                userInfo.nbOfInsightsWon = 0;
              }

              User.find({
                following: user._id
              }).exec((err, us) => {
                userInfo.followers = us.length ? us.length : 0;

                return res.json(userInfo);
              });
            });
          });
      });
    });
  }
);

// **********************************************************
// CALCULATE LEADERBOARD POSITION
// **********************************************************

dashboardsController.get(
  "/leaderboard/:id",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const userId = req.params.id;

    WatchItem.find({
      status: {
        $in: ["won", "lost"]
      }
    })
      .populate("userId")
      .exec((err, wis) => {
        // first, convert data into a Map with reduce
        function reduceArrayByInsiderPoints(array) {
          const map = array.reduce((map, wi) => {
            const us = wi.userId;
            if (!map.get(us._id)) {
              map.set(us._id, {
                picProfile: us.picProfile,
                username: us.username,
                performancePoints: 0
              });
            }
            map.get(us._id).performancePoints += wi.performancePoints;
            return map;
          }, new Map());

          // then, map your counts object back to an array
          return Array.from(map).map(([userId, data]) => {
            return Object.assign({ userId }, data);
          });
        }

        let rankingByPoints = reduceArrayByInsiderPoints(wis);

        sortInsidersAsc = function(a, b) {
          if (a.performancePoints < b.performancePoints) return -1;
          if (a.performancePoints > b.performancePoints) return 1;
          return 0;
        };

        rankingByPoints = rankingByPoints.sort(sortInsidersAsc);

        const arrayOfId = rankingByPoints.map(us => {
          return us.userId.toString();
        });

        let index = arrayOfId.indexOf(userId);
        // console.log("****************ARRAY", arrayOfId);
        // console.log("*****************INDEX", index);
        // console.log("*****************USERID", userId);

        res.json({ rankingByPoints, index });
      });
  }
);

// **********************************************************
// Send user connected Current insights
// **********************************************************

dashboardsController.get(
  "/currentinsights",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    // const user = req.params.id;
    if (req.query.id) {
      user = req.query.id;
    } else {
      user = req.user.id;
    }

    WatchItem.find({
      userId: user,
      status: "active",
      position: {
        $in: ["bull", "bear"]
      }
    })
      .populate("stockId")
      .exec((err, wi) => {
        if (err) res.json(null);

        return res.json(wi);
      });
  }
);

// **********************************************************
// Send user connected Watch list
// **********************************************************

dashboardsController.get(
  "/watchlist",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const stockTrendBoard = [];

    WatchItem.find({
      userId: user._id,
      status: "active",
      position: "none"
    })
      .populate("stockId")
      .exec((err, activeWi) => {
        if (err) res.json(null);

        activeWi.forEach(activeWatchItem => {
          const stockCurrentTrend = {
            longName: activeWatchItem.stockId.longName,
            currentPrice: activeWatchItem.stockId.price,
            variation: activeWatchItem.stockId.variation,
            volume: activeWatchItem.stockId.volume
          };
          // looking for insider trending
          const today = moment().startOf("day");
          const thirtyDaysAgo = moment(today).subtract(30, "days");

          WatchItem.find({
            stockId: activeWatchItem.stockId._id,
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
              var currentPercentage = (nbBear /
                (nbBull + nbBear) *
                100).toFixed(2);
              var currentTrend = {
                trend: "bear",
                percentage: currentPercentage
              };
            } else {
              var currentPercentage = (nbBull /
                (nbBull + nbBear) *
                100).toFixed(2);
              var currentTrend = {
                trend: "bull",
                percentage: currentPercentage
              };
            }
            stockCurrentTrend.trending = currentTrend;

            // Add Hot insights
            Babble.find({
              stockLink: activeWatchItem.stockId._id,
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
                stockId: activeWatchItem.stockId._id,
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
                  if (stockTrendBoard.length === activeWi.length) {
                    return res.json(stockTrendBoard);
                  }
                });
            });
          });
        });
      });
  }
);

// **********************************************************
// Send user connected Past insights
// **********************************************************

dashboardsController.get(
  "/pastinsights",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;

    WatchItem.find({
      userId: user._id,
      status: {
        $in: ["won", "lost"]
      }
    })
      .populate("stockId")
      .exec((err, wi) => {
        if (err) res.json(null);

        return res.json(wi);
      });
  }
);

// **********************************************************
// Send users connected info of the insiders followed
// **********************************************************
//
// dashboardsController.get(
//   "/insidersfollowed",
//   passport.authenticate("jwt", config.jwtSession),
//   (req, res, next) => {
//     const user = req.user;
//     const insidersFollowed = [];
//
//     console.log("ARE YOU THERE ***********************?");
//
//     User.findById(user._id)
//       .populate("following")
//       .exec((err, followed) => {
//         if (err) res.json(null);
//
//         followed.following.forEach(usFollowed => {
//           let userInfo = {
//             username: usFollowed.username,
//             picProfile: usFollowed.picProfile,
//             location: usFollowed.location,
//             following: usFollowed.following.length
//           };
//
//           Babble.find({
//             user: usFollowed._id
//           }).then(babbles => {
//             userInfo.nbBabbles = 0 + babbles.length;
//
//             userInfo.nbOfLikes =
//               0 +
//               babbles.map(item => item.like).reduce((sum, next) => {
//                 return sum + next.length;
//               }, 0);
//
//             // Calculate prefered stocks
//             WatchItem.find({
//               userId: usFollowed._id,
//               status: "won"
//             })
//               .populate("stockId")
//               .exec((err, wi) => {
//                 if (err) res.json(null);
//
//                 if (wi) {
//                   // first, convert data into a Map with reduce
//                   function reduceArrayByStockPoints(array) {
//                     let counts = array.reduce((prev, curr) => {
//                       const stockId = curr.stockId.toString();
//                       let count = prev.get(stockId) || 0;
//                       prev.set(stockId, curr.performancePoints + count);
//                       return prev;
//                     }, new Map());
//
//                     // then, map your counts object back to an array
//                     return Array.from(
//                       counts
//                     ).map(([stockId, performancePoints]) => {
//                       return {
//                         stockId,
//                         performancePoints
//                       };
//                     });
//                   }
//
//                   userInfo.preferedStocks = reduceArrayByStockPoints(wi);
//                 }
//
//                 WatchItem.find({
//                   userId: usFollowed._id,
//                   status: {
//                     $in: ["won", "lost"]
//                   }
//                 }).exec((err, wiClosed) => {
//                   if (wiClosed.length > 0) {
//                     // Calculate performance points
//                     userInfo.performancePoints = wiClosed
//                       .map(item => item.performancePoints)
//                       .reduce((prev, next) => prev + next);
//
//                     userInfo.nbOfInsightsWon = wiClosed.filter(item => {
//                       return item.status == "won";
//                     }, 0).length;
//                   }
//
//                   User.find({
//                     following: usFollowed._id
//                   }).exec((err, us) => {
//                     userInfo.followers = us.length ? us.length : 0;
//
//                     insidersFollowed.push(userInfo);
//
//                     if (insidersFollowed.length === followed.length) {
//                       if (followed.length === 0) {
//                         return res.json(null);
//                       }
//                       return res.json(insidersFollowed);
//                     }
//                   });
//                 });
//               });
//           });
//         });
//       });
//   }
// );

// ***********************************************************
// ***********************************************************

// **********************************************************
// Send insider info for Dashboard header
// **********************************************************

dashboardsController.get(
  "/insider/:id",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const userId = req.params.id;

    User.findById(userId).exec((err, us) => {
      if (err) res.json(null);
      let userInfo = {
        userId: us._id,
        username: us.username,
        following: us.following,
        picProfile: us.picProfile,
        location: us.location,
        skills: us.skills,
        following: us.following.length
      };

      Babble.find({
        user: userId
      }).then(babbles => {
        userInfo.nbBabbles = 0 + babbles.length;

        userInfo.nbOfLikes =
          0 +
          babbles.map(item => item.like).reduce((sum, next) => {
            return sum + next.length;
          }, 0);

        // Calculate prefered stocks
        WatchItem.find({
          userId: userId,
          status: "won"
        })
          .populate("stockId")
          .exec((err, wis) => {
            if (err) res.json(null);

            if (wis) {
              // first, convert data into a Map with reduce
              function reduceArrayByStockPoints(array) {
                const map = array.reduce((map, wi) => {
                  const stock = wi.stockId;
                  if (!map.get(stock._id)) {
                    map.set(stock._id, {
                      longName: stock.longName,
                      shortName: stock.shortName,
                      performancePoints: 0
                    });
                  }
                  map.get(stock._id).performancePoints += wi.performancePoints;
                  return map;
                }, new Map());

                // then, map your counts object back to an array
                return Array.from(map).map(([stockId, data]) => {
                  return Object.assign({ stockId }, data);
                });
              }
              let rankingByPoints = reduceArrayByStockPoints(wis);

              sortStockDes = function(a, b) {
                if (a.performancePoints < b.performancePoints) return 1;
                if (a.performancePoints > b.performancePoints) return -1;
                return 0;
              };

              rankingByPoints = rankingByPoints.sort(sortStockDes);
              userInfo.preferedStocks = rankingByPoints;
            }

            WatchItem.find({
              userId: userId,
              status: {
                $in: ["won", "lost"]
              }
            }).exec((err, wiClosed) => {
              console.log("wiClosed", wiClosed);
              // Calculate performance points
              if (wiClosed.length > 0) {
                userInfo.performancePoints = wiClosed
                  .map(item => item.performancePoints)
                  .reduce((prev, next) => prev + next);

                userInfo.nbOfInsightsWon = wiClosed.filter(item => {
                  console.log("item.status", item.status);
                  return item.status == "won";
                }, 0).length;
              } else {
                userInfo.performancePoints = 0;
                userInfo.nbOfInsightsWon = 0;
              }

              User.find({
                following: userId
              }).exec((err, us) => {
                userInfo.followers = us.length ? us.length : 0;

                return res.json(userInfo);
              });
            });
          });
      });
    });
  }
);

// **********************************************************
// Send Insider Current insights
// **********************************************************
//
// dashboardsController.get(
//   "/currentinsights",
//   passport.authenticate("jwt", config.jwtSession),
//   (req, res, next) => {
//     const user = req.params.id;
//     // if(!user) {user= req.user.id}
//     console.log("HERE WE ARE ****************************");
//
//     WatchItem.find({
//       userId: user,
//       status: "active",
//       position: {
//         $in: ["bull", "bear"]
//       }
//     })
//       .populate("stockId")
//       .exec((err, wi) => {
//         if (err) res.json(null);
//
//         return res.json(wi);
//       });
//   }
// );

// **********************************************************
// Send insider Watch list
// **********************************************************

dashboardsController.get(
  "/watchlist",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.params.id;
    const stockTrendBoard = [];

    WatchItem.find({
      userId: user._id,
      status: "active",
      position: "none"
    })
      .populate("stockId")
      .exec((err, activeWi) => {
        if (err) res.json(null);

        activeWi.forEach(activeWatchItem => {
          const stockCurrentTrend = {
            longName: activeWatchItem.stockId.longName,
            currentPrice: activeWatchItem.stockId.price,
            variation: activeWatchItem.stockId.variation,
            volume: activeWatchItem.stockId.volume
          };
          // looking for insider trending
          const today = moment().startOf("day");
          const thirtyDaysAgo = moment(today).subtract(30, "days");

          WatchItem.find({
            stockId: activeWatchItem.stockId._id,
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
              var currentPercentage = (nbBear /
                (nbBull + nbBear) *
                100).toFixed(2);
              var currentTrend = {
                trend: "bear",
                percentage: currentPercentage
              };
            } else {
              var currentPercentage = (nbBull /
                (nbBull + nbBear) *
                100).toFixed(2);
              var currentTrend = {
                trend: "bull",
                percentage: currentPercentage
              };
            }
            stockCurrentTrend.trending = currentTrend;

            // Add Hot insights
            Babble.find({
              stockLink: activeWatchItem.stockId._id,
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
                stockId: activeWatchItem.stockId._id,
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
                  if (stockTrendBoard.length === activeWi.length) {
                    return res.json(stockTrendBoard);
                  }
                });
            });
          });
        });
      });
  }
);

// **********************************************************
// Send insider Past insights
// **********************************************************

dashboardsController.get(
  "/pastinsights/:id",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const userId = req.params.id;

    WatchItem.find({
      userId: userId,
      status: {
        $in: ["won", "lost"]
      }
    })
      .populate("stockId")
      .exec((err, wi) => {
        if (err) res.json(null);

        return res.json(wi);
      });
  }
);

// **********************************************************
// Send insider info of the insiders followed
// **********************************************************

dashboardsController.get(
  "/insidersfollowed/:id",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const id = req.params.id;
    const insidersFollowed = [];

    console.log("BOUCLE INSIDER FOLLOWED");

    User.findById(id)
      .populate("following")
      .exec((err, followed) => {
        if (err) return res.json(null);

        if (!followed) {
          res.json(null);
        }
        followed.following.forEach(usFollowed => {
          let userInfo = {
            username: usFollowed.username,
            picProfile: usFollowed.picProfile,
            location: usFollowed.location,
            following: usFollowed.following.length
          };

          Babble.find({
            user: usFollowed._id
          }).then(babbles => {
            userInfo.nbBabbles = 0 + babbles.length;

            userInfo.nbOfLikes =
              0 +
              babbles.map(item => item.like).reduce((sum, next) => {
                return sum + next.length;
              }, 0);

            // Calculate prefered stocks
            WatchItem.find({
              userId: usFollowed._id,
              status: "won"
            })
              .populate("stockId")
              .exec((err, wis) => {
                if (err) res.json(null);

                if (wis) {
                  // first, convert data into a Map with reduce
                  function reduceArrayByStockPoints(array) {
                    const map = array.reduce((map, wi) => {
                      const stock = wi.stockId;
                      if (!map.get(stock._id)) {
                        map.set(stock._id, {
                          longName: stock.longName,
                          performancePoints: 0
                        });
                      }
                      map.get(stock._id).performancePoints +=
                        wi.performancePoints;
                      return map;
                    }, new Map());

                    // then, map your counts object back to an array
                    return Array.from(map).map(([stockId, data]) => {
                      return Object.assign({ stockId }, data);
                    });
                  }

                  userInfo.preferedStocks = reduceArrayByStockPoints(wis);
                }

                WatchItem.find({
                  userId: usFollowed._id,
                  status: {
                    $in: ["won", "lost"]
                  }
                }).exec((err, wiClosed) => {
                  // Calculate performance points
                  userInfo.performancePoints = wiClosed
                    .map(item => item.performancePoints)
                    .reduce((prev, next) => prev + next, 0);

                  userInfo.nbOfInsightsWon = wiClosed.filter(item => {
                    return item.status == "won";
                  }, 0).length;

                  User.find({
                    following: usFollowed._id
                  }).exec((err, us) => {
                    userInfo.followers = us.length ? us.length : 0;

                    insidersFollowed.push(userInfo);
                    console.log(
                      "insidersFollowed.length",
                      insidersFollowed.length
                    );
                    console.log(
                      "followed.following.length",
                      followed.following.length
                    );
                    if (insidersFollowed.length === followed.following.length) {
                      if (followed.length === 0) {
                        return res.json(null);
                      }
                      return res.json(insidersFollowed);
                    }
                  });
                });
              });
          });
        });
      });
  }
);

module.exports = dashboardsController;
