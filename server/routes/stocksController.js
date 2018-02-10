const express = require("express");
const stocksController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");
const moment = require("moment");
// const scrapPrice = require("../config/scrapPrice");
// const updateBourso = require("../bin/getStocksPriceBourso");
// const getCryptoUpdate = require("../bin/getStocksPriceCurr");
// const scrapPriceCurrency = require("../config/scrapPriceCurrency");
// const updateIex = require("../bin/getStocksPriceIex");
// const wikipedia = require("wikipedia-js");
const coinmarket = require("../scraping/price/coinmarket");
const { scrapEuronext } = require("../scraping/price/tradingsat");
const { scrapCoinmarketCap } = require("../scraping/price/coinmarket");
const { abcbourse } = require("../scraping/price/abcbourse");

// **********************************************************
// Send info about a stock  =================================
// **********************************************************
stocksController.get("/:stockName", function(req, res, next) {
  const stock = req.params.stockName.toUpperCase();
  const FIVE_MIN = 300 * 1000;
  const ONE_MIN = 60 * 1000;

  Stock.findOne({ shortName: stock }, (err, stock) => {
    if (err) return next(err);

    if (!stock || stock == null) {
      stock = "no stock";
    } else if (
      stock.priceSource === "tradingsatEuronext" > -1 &&
      new Date() - stock.updated_at.getTime() > ONE_MIN
    ) {
      scrapEuronext();
      // scrapPrice(stock.scrapKey);
      // updateBourso();
    } else if (
      stock.priceSource === "coinmarket" &&
      new Date() - stock.updated_at.getTime() > ONE_MIN
    ) {
      scrapCoinmarketCap();
      // scrapPriceCurrency(stock.symbolPrice);
      // getCryptoUpdate("CRYPTO");
    } else if (
      stock.priceSource === "abcbourse" &&
      new Date() - stock.updated_at.getTime() > FIVE_MIN
    ) {
      abcbourse(stock.shortName);
      // updateIex("NASDAQ");
    }
    res.json(stock);
  });
});

// **********************************************************
// Send info about Stocks (trending)  =======================
// **********************************************************
stocksController.get("/", function(req, res, next) {
  let indexSelected = req.query.index;
  if (indexSelected === "all") {
    Stock.find().exec((err, stocks) => {
      if (err) return res.json(null);
      res.json(stocks);
    });
  } else {
    Stock.find({ index: { $in: { indexSelected } } }).exec((err, stocks) => {
      if (err) return res.json(null);
      res.json(stocks);
    });
  }
});

// **********************************************************
// Send BULL & BEAR trending percentage according nb of days
// **********************************************************

stocksController.get("/:stockName/bull-bear-trend", function(req, res, next) {
  let attribute = req.query.history;
  const stock = req.params.stockName.toUpperCase();

  Stock.findOne({ shortName: stock }, (err, stock) => {
    if (err) return next(err);
    if (!stock) return next(err);

    const today = moment().startOf("day");
    const thirtyDaysAgo = moment(today).subtract(attribute, "days");

    WatchItem.find({
      stockId: stock._id,
      status: "active",
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
      var nbBull = 50 + countPositions(activeWatchItems, "bull");
      var nbBear = 50 + countPositions(activeWatchItems, "bear");
      var percentage = [
        (nbBull / (nbBull + nbBear) * 100).toFixed(2),
        (nbBear / (nbBull + nbBear) * 100).toFixed(2)
      ];

      res.json(percentage);
    });
  });
});

// **********************************************************
// Send wachtitem info for a user on a stock  ===============
// **********************************************************

stocksController.get(
  "/:stockName/watchitem",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const stock = req.params.stockName.toUpperCase();
    const user = req.user;

    Stock.findOne({ shortName: stock }, (err, stock) => {
      if (err) {
        res.json(null);
      }

      if (stock === null) {
        res.json(null);
      } else {
        WatchItem.findOne({
          userId: user._id,
          stockId: stock._id,
          status: "active"
        })
          .then(watchitem => {
            if (!watchitem) {
              //const err = new Error("Not Found");
              //err.status = 404;
              res.json(null);
            } else {
              res.json(watchitem);
            }
          })
          .catch(err => res.json(null));
      }
    });
  }
);

// ***************************************************
// Add stock to  watchlist ===========================
// ***************************************************
stocksController.post(
  "/:name/watchitem/add",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const stockName = req.params.name.toUpperCase();

    Stock.findOne({ shortName: stockName })
      .then(stock => {
        if (!stock) {
          res.json({
            error: req.app.get("env") === "development" ? err : {}
          });
        }
        const newWatchItem = new WatchItem({
          userId: user._id,
          username: user.username,
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
            res.json(newItem);
          });
        });
      })
      .catch(err => console.error(err));
  }
);
// ***************************************************
// Remove stock from watchlist =======================
// ***************************************************

stocksController.delete(
  "/:name/watchitem/:watchitemId",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const watchItemId = req.params.watchitemId;
    const stockName = req.params.name.toUpperCase();

    WatchItem.findByIdAndUpdate(watchItemId, { status: "removed" })
      .then(resp => {
        User.findByIdAndUpdate(user._id, {
          $pull: { watchList: watchItemId }
        }).then(resp => {
          res.json({ success: true });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
);
// ***************************************************
// Take position BULL ===========================
// ***************************************************
stocksController.post(
  "/:name/watchitem/bull",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const stockName = req.params.name.toUpperCase();
    const watchitemId = req.query.wi;

    if (!watchitemId) {
      Stock.findOne({ shortName: stockName })
        .then(stock => {
          if (!stock) {
            res.json({
              error: req.app.get("env") === "development" ? err : {}
            });
          }
          const newWatchItem = new WatchItem({
            userId: user._id,
            username: user.username,
            stockId: stock._id,
            initialPrice: stock.price,
            currency: stock.currency,
            position: "bull"
          });

          newWatchItem.save().then(newItem => {
            User.findByIdAndUpdate(
              user._id,
              {
                $addToSet: { watchList: newItem._id }
              },
              { new: true }
            ).then(user => {
              res.json(newItem);
            });
          });
        })
        .catch(err => res.status(404));
    } else {
      WatchItem.findByIdAndUpdate(
        watchitemId,
        {
          status: "removed"
        },
        { new: true }
      ).exec((err, resp) => {
        User.findByIdAndUpdate(user._id, {
          $pull: { watchList: watchitemId }
        }).then(resp => {
          Stock.findOne({ shortName: stockName }).then(stock => {
            if (!stock) {
              res.json({
                error: req.app.get("env") === "development" ? err : {}
              });
            }
            const newWatchItem = new WatchItem({
              userId: user._id,
              username: user.username,
              stockId: stock._id,
              initialPrice: stock.price,
              currency: stock.currency,
              position: "bull"
            });

            newWatchItem.save().then(newItem => {
              User.findByIdAndUpdate(
                user._id,
                {
                  $addToSet: { watchList: newItem._id }
                },
                { new: true }
              ).then(user => {
                res.json(newItem);
              });
            });
          });
        });
      });
    }
  }
);

// ***************************************************
// Close position Bull & Bear =======================
// ***************************************************

stocksController.patch(
  "/:name/watchitem/:watchitemId",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const watchItemId = req.params.watchitemId;
    const stockName = req.params.name.toUpperCase();

    WatchItem.findById(watchItemId)
      .populate("stockId")
      .exec((err, watchItem) => {
        var position = watchItem.position;
        if (position === "bull") {
          // Define new status
          var newStatus =
            watchItem.stockId.price < watchItem.initialPrice ? "lost" : "won";

          // Update score of the user
          var updateScore = Math.floor(
            (watchItem.stockId.price - watchItem.initialPrice) /
              watchItem.initialPrice *
              1000
          );
          User.findByIdAndUpdate(user._id, {
            $inc: { score: updateScore }
          }).exec();
        } else {
          var newStatus =
            watchItem.stockId.price > watchItem.initialPrice ? "lost" : "won";

          // Update score of the user
          var updateScore = Math.floor(
            (watchItem.stockId.price - watchItem.initialPrice) /
              watchItem.initialPrice *
              -1000
          );
        }
        // Update status of watchList
        WatchItem.findByIdAndUpdate(watchItemId, {
          status: newStatus,
          soldPrice: watchItem.stockId.price,
          $inc: { performancePoints: updateScore }
        })
          .then(resp => {
            User.findByIdAndUpdate(user._id, {
              $pull: { watchList: watchItemId }
            }).then(resp => {
              res.json({ success: true });
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
  }
);
// ***************************************************
// Take position BEAR ================================
// ***************************************************
stocksController.post(
  "/:name/watchitem/bear",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const user = req.user;
    const stockName = req.params.name.toUpperCase();
    const watchitemId = req.query.wi;

    if (!watchitemId) {
      Stock.findOne({ shortName: stockName })
        .then(stock => {
          if (!stock) {
            res.json({
              error: req.app.get("env") === "development" ? err : {}
            });
          }

          const newWatchItem = new WatchItem({
            userId: user._id,
            username: user.username,
            stockId: stock._id,
            initialPrice: stock.price,
            currency: stock.currency,
            position: "bear"
          });

          newWatchItem.save().then(newItem => {
            User.findByIdAndUpdate(
              user._id,
              {
                $addToSet: { watchList: newItem._id }
              },
              { new: true }
            ).then(user => {
              res.json(newItem);
            });
          });
        })
        .catch(err => res.status(404));
    } else {
      WatchItem.findByIdAndUpdate(watchitemId, {
        status: "removed"
      }).then(resp => {
        User.findByIdAndUpdate(user._id, {
          $pull: { watchList: watchitemId }
        }).then(resp => {
          Stock.findOne({ shortName: stockName }).then(stock => {
            if (!stock) {
              res.json({
                error: req.app.get("env") === "development" ? err : {}
              });
            }
            const newWatchItem = new WatchItem({
              userId: user._id,
              username: user.username,
              stockId: stock._id,
              initialPrice: stock.price,
              currency: stock.currency,
              position: "bear"
            });

            newWatchItem.save().then(newItem => {
              User.findByIdAndUpdate(
                user._id,
                {
                  $addToSet: { watchList: newItem._id }
                },
                { new: true }
              ).then(user => {
                res.json(newItem);
              });
            });
          });
        });
      });
    }
  }
);

// **********************************************************
// Prefered stock of a user (won watchitems)  ===============
// **********************************************************

stocksController.get(
  "/:stockName/prefered",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const stock = req.params.stockName.toUpperCase();
    const user = req.user;
    const insiderId = req.query.id;

    User.findById(insiderId).then(insider => {
      WatchItem.find({ status: "won" })
        .populate("stockId")
        .exec((err, wis) => {
          if (err) res.json(null);
          res.json(wis);
        });
    });
  }
);

// **********************************************************
// Send description about stock according to the lang of User
// **********************************************************

stocksController.get(
  "/:stockName/description",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const stock = req.params.stockName.toUpperCase();
    const userLang = stock.indexOf("CRYPTO") > 0 ? "EN" : req.user.lang;
    const query = req.query.longName;

    var options = {
      query: query,
      format: "html",
      summaryOnly: true,
      lang: userLang
    };
    wikipedia.searchArticle(options, function(err, htmlWikiText) {
      if (err) {
        console.log("An error occurred[query=%s, error=%s]", query, err);
        return;
      }
      res.json(htmlWikiText);
      /*You should see something along the lines of:
         <p><strong>Napoleon Bonaparte</strong> (French: Napoléon Bonaparte [napoleɔ̃ bɔnɑpaʁt], Italian: Napoleone Buonaparte; 15 August 1769&nbsp;– 5 May 1821) was a French military and political leader who rose to prominence during the latter stages of the <a href=http://en.wikipedia.org/French_Revolution">French Revolution</a> and its associated <a href=http://en.wikipedia.org/French_Revolutionary_Wars">wars</a> in Europe.</p>
         <p>As <strong>Napoleon I</strong>, he was <a href=http://en.wikipedia.org/Emperor_of_the_French">Emperor of the French</a> from 1804 to 1815. His legal reform, the <a href=http://en.wikipedia.org/Napoleonic_Code">Napoleonic Code</a>, has been a major influence on many <a href=http://en.wikipedia.org/Civil_law_(legal_system)">civil law</a> jurisdictions worldwide, but he is best remembered for his role in the wars led against France by a series of coalitions, the so-called <a href=http://en.wikipedia.org/Napoleonic_Wars">Napoleonic Wars</a>. He established hegemony over most of continental Europe and sought to spread the ideals of the French Revolution, while consolidating an <a href=http://en.wikipedia.org/First_French_Empire">imperial monarchy</a> which restored aspects of the deposed <em><a href=http://en.wikipedia.org/Ancien_Régime">Ancien Régime</a>.</em> Due to his success in these wars, often against numerically superior enemies, he is generally regarded as one of the greatest military commanders of all time, and his campaigns are studied at military academies worldwide.(ref: Schom 1998)</p>
         <p>Napoleon was born at <a href=http://en.wikipedia.org/Ajaccio">Ajaccio</a> in <a href=http://en.wikipedia.org/Corsica">Corsica</a> in a family of <a href=http://en.wikipedia.org/Nobility_of_Italy">noble Italian</a> ancestry which had settled Corsica in the 16th century. He trained as an artillery officer in mainland France. He rose to prominence under the <a href=http://en.wikipedia.org/French_First_Republic">French First Republic</a> and led successful campaigns against the <a href=http://en.wikipedia.org/First_Coalition">First</a> and <a href=http://en.wikipedia.org/War_of_the_Second_Coalition">Second</a> Coalitions arrayed against France. He led a successful invasion of the Italian peninsula.</p>
         <p>In 1799, he staged a <em><a href=http://en.wikipedia.org/18_Brumaire">coup d</em>état</a> and installed himself as <a href=http://en.wikipedia.org/First_Consul">First Consul</a>; five years later the French Senate proclaimed him emperor, following a <a href=http://en.wikipedia.org/plebiscite">plebiscite</a> in his favour. In the first decade of the 19th century, the <a href=http://en.wikipedia.org/First_French_Empire">French Empire</a> under Napoleon engaged in a series of conflicts—the Napoleonic Wars—that involved every major European power.(ref: Schom 1998) After a streak of victories, France secured a dominant position in continental Europe, and Napoleon maintained the French <a href=http://en.wikipedia.org/sphere_of_influence">sphere of influence</a> through the formation of extensive alliances and the appointment of friends and family members to rule other European countries as French <a href=http://en.wikipedia.org/client_state">client state</a>s.</p>
         <p>The <a href=http://en.wikipedia.org/Peninsular_War">Peninsular War</a> and 1812 <a href=http://en.wikipedia.org/French_invasion_of_Russia">French invasion of Russia</a> marked turning points in Napoleons fortunes. His <a href=http://en.wikipedia.org/Grande_Armée">Grande Armée</a> was badly damaged in the campaign and never fully recovered. In 1813, the <a href=http://en.wikipedia.org/Sixth_Coalition">Sixth Coalition</a> defeated his forces <a href=http://en.wikipedia.org/Battle_of_Leipzig">at Leipzig</a>; the following year the Coalition invaded France, forced Napoleon to abdicate and exiled him to the island of <a href=http://en.wikipedia.org/Elba">Elba</a>. Less than a year later, he escaped Elba and returned to power, but was defeated at the <a href=http://en.wikipedia.org/Battle_of_Waterloo">Battle of Waterloo</a> in June 1815. Napoleon spent the last six years of his life in confinement by the British on the island of <a href=http://en.wikipedia.org/Saint_Helena">Saint Helena</a>. An autopsy concluded he died of <a href=http://en.wikipedia.org/stomach_cancer">stomach cancer</a>, but there has been some debate about the cause of his death, as some scholars have speculated that he was a victim of <a href=http://en.wikipedia.org/arsenic_poisoning">arsenic poisoning</a>.</p>
       */
    });
  }
);

module.exports = stocksController;
