const express = require("express");
const chartController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const passport = require("passport");
const axios = require("axios");

// Moment to format dates
const moment = require("moment");

// **********************************************************
// Get chart data   ===================
// **********************************************************

chartController.get("/:id", (req, res, next) => {
  const user = req.user;
  // const index = req.query.index;
  var stockName = req.params.id;

  if (stockName.indexOf("NASDAQ") > -1) {
    var shortName = stockName.replace("@NASDAQ", "");
    let url = `https://api.iextrading.com/1.0/stock/${shortName}/chart/1y`;
    axios
      .get(url)
      .then(response => {
        let chartInfo = response.data;
        res.json(chartInfo);
      })
      .catch(err => {
        res.json(err);
      });
  } else if (stockName.indexOf("EURO") > -1) {
    var shortName = stockName.replace("@EURO", "");
    let url = `https://www.quandl.com/api/v3/datasets/EURONEXT/${shortName}.json?api_key=Czjt1Yy1zoFwSApYYGPF`;
    axios
      .get(url)
      .then(response => {
        let chartInfo = response.data;
        res.json(chartInfo);
      })
      .catch(err => {
        res.json(err);
      });
  } else if (stockName.indexOf("CRYPTO") > -1) {
    var shortName = stockName.replace("@CRYPTO", "");
    let url = `https://min-api.cryptocompare.com/data/histoday?fsym=${shortName}&tsym=USD&limit=60&aggregate=3&e=CCCAGG`;
    axios
      .get(url)
      .then(response => {
        let chartInfo = response.data;
        res.json(chartInfo);
      })
      .catch(err => {
        res.json(err);
      });
  }
});

module.exports = chartController;
