const express = require("express");
const iexController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const axios = require("axios");

// Moment to format dates
const moment = require("moment");

// **********************************************************
// Check if the user follow the insider   ===================
// **********************************************************

iexController.get("/:id", (req, res, next) => {
  const user = req.user;
  const stockName = req.params.id;
  let url = `https://api.iextrading.com/1.0/stock/${stockName}/chart/1y`;
  axios
    .get(url)
    .then(response => {
      let chartInfo = response.data;
      res.json(chartInfo);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = iexController;
