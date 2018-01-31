const express = require("express");
const babblesController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const Babblereply = require("../models/babblereply");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const config = require("../config");

// Moment to format dates
const moment = require("moment");

// ***************************************************
// Send babbles info All =============================
// ***************************************************

babblesController.get(
  "/",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const user = req.user;
    // sort by people who wrote the babble
    const sort = req.query.sort;
    const page = req.query.page;
    const group = page * 50;

    if (sort === "all") {
      Babble.find()
        .sort({ updated_at: -1 })
        .populate("user")
        .limit(group)
        .exec((err, timeline) => {
          if (err) return res.json(null);
          res.json(timeline);
        });
    } else if (sort === "me") {
      Babble.find({ user: user._id })
        .sort({ updated_at: -1 })
        .populate("user")
        .limit(group)
        .exec((err, timeline) => {
          if (err) return res.json(null);
          res.json(timeline);
        });
    } else if (sort === "insidermates") {
      User.findById(user._id).then(us => {
        Babble.find({ user: { $in: us.following } })
          .sort({ updated_at: -1 })
          .populate("user")
          .limit(group)
          .exec((err, timeline) => {
            if (err) console.log("ERROR", err);

            if (err) return res.json(null);
            res.json(timeline);
          });
      });
    } else if (sort === "watchlist") {
      User.findById(user._id)
        .populate("watchList")
        .exec((err, us) => {
          let stockArray = us.watchList.map(el => {
            return el.stockId;
          });
          Babble.find({ stockLink: { $in: stockArray } })
            .sort({ updated_at: -1 })
            .populate("user")
            .limit(group)
            .exec((err, timeline) => {
              if (err) return res.json(null);
              res.json(timeline);
            });
        });
    }
  }
);

// ***************************************************
// Send babbles info linked to a stock ===============
// ***************************************************

babblesController.get(
  "/:name",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const stock = req.params.name.toUpperCase();
    const user = req.user;
    // sort by people who wrote the babble
    const sort = req.query.sort;
    const page = req.query.page;
    const group = page * 50;

    if (sort === "all") {
      Stock.findOne({ shortName: stock }, (err, stock) => {
        if (err) return next(err);
        if (!stock) {
          return res.json("stock doesn't exist");
        }
        Babble.find({ stockLink: stock._id })
          .sort({ updated_at: -1 })
          .populate("user")
          .limit(group)
          .exec((err, timeline) => {
            if (err) return res.json(null);
            res.json(timeline);
          });
      });
    } else if (sort === "me") {
      Stock.findOne({ shortName: stock }, (err, stock) => {
        if (err) return next(err);
        if (!stock) return res.json("stock doesn't exist");

        Babble.find({ stockLink: stock._id, user: user._id })
          .sort({ updated_at: -1 })
          .populate("user")
          .limit(group)
          .exec((err, timeline) => {
            if (err) return res.json(null);
            res.json(timeline);
          });
      });
    } else if (sort === "insidermates") {
      Stock.findOne({ shortName: stock }, (err, stock) => {
        if (err) return next(err);
        if (!stock) return res.json("stock doesn't exist");

        User.findById(user._id).then(us => {
          Babble.find({ stockLink: stock._id, user: { $in: us.following } })
            .sort({ updated_at: -1 })
            .populate("user")
            .limit(group)
            .exec((err, timeline) => {
              if (err) return res.json(null);
              res.json(timeline);
            });
        });
      });
    }
  }
);

// **********************************************************
// Post a babble   ==========================================
// **********************************************************

babblesController.post(
  "/",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const stock = req.query.stock ? req.query.stock : "";
    const babble = req.body.babble;
    const babbleImg = req.body.babbleImg ? req.body.babbleImg : "";
    const babbleVideo = req.body.babbleVideo ? req.body.babbleVideo : "";
    const user = req.user;

    const newBabble = new Babble({
      user: user._id,
      babble: babble,
      babbleImg: babbleImg,
      babbleVideo: babbleVideo,
      stockLink: stock
    });

    newBabble.save(err => {
      if (err) {
        res.json(err);
      } else {
        // GAMIFICATION => +20 points per babble  posted
        User.findByIdAndUpdate(user._id, { $inc: { score: 20 } }).exec();

        res.json(newBabble);
      }
    });
  }
);

// **********************************************************
// Response to a babble   ===================================
// **********************************************************

babblesController.post(
  "/resp",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res, next) {
    const stock = req.query.stockId ? req.query.stockId : "";
    const babbleResp = req.body.babble;
    const parentBabbleId = req.query.respto;
    const user = req.user;

    const newReply = new Babblereply({
      user: user._id,
      username: user.username,
      picProfile: user.picProfile,
      babble: babbleResp
    });

    // GAMIFICATION => +10 points per babble replied posted
    User.findByIdAndUpdate(user._id, { $inc: { score: 10 } }).exec();

    Babble.findByIdAndUpdate(parentBabbleId, {
      $push: { reply: newReply }
    }).then(resp => {
      return res.json(newReply);
    });
  }
);

// **********************************************************
// Like a babble  (only once) ===============================
// **********************************************************
babblesController.post(
  "/like",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const babble = req.body.babbleId;
    const user = req.user;

    Babble.findByIdAndUpdate(babble, {
      $addToSet: { like: user._id }
    }).exec();
    Babble.findByIdAndUpdate(babble)
      .populate("user")
      .exec((err, whoIsLiked) => {
        if (err) return next(err);
        // GAMIFICATION => receive 10 points because receive 1 like
        User.findByIdAndUpdate(whoIsLiked._id, {
          $inc: { score: 10 }
        }).exec((err, executed) => {
          if (err) return next(err);
        });
        res.json(babble);
      });
  }
);

// ***************************************************
// Send babbles for unconnected people  ==============
// ***************************************************

babblesController.get("/unconnected/stream/", function(req, res, next) {
  // sort by people who wrote the babble
  const sort = req.query.sort;
  const page = req.query.page;
  const group = page * 50;

  Babble.find()
    .sort({ updated_at: -1 })
    .populate("user")
    .limit(group)
    .exec((err, timeline) => {
      if (err) return res.json(null);
      res.json(timeline);
    });
});

// **********************************************************************
// Send babbles for unconnected people (filtered on stock) ==============
// **********************************************************************

babblesController.get("/unconnected/stock/:name", function(req, res, next) {
  const stock = req.params.name.toUpperCase();

  // sort by people who wrote the babble
  const sort = req.query.sort;
  const page = req.query.page;
  const group = page * 50;

  Stock.findOne({ shortName: stock }, (err, stock) => {
    if (err) return next(err);
    if (!stock) {
      return res.json("stock doesn't exist");
    }
    Babble.find({ stockLink: stock._id })
      .sort({ updated_at: -1 })
      .populate("user")
      .limit(group)
      .exec((err, timeline) => {
        if (err) return res.json(null);
        res.json(timeline);
      });
  });
});

module.exports = babblesController;
