// update one stock with current price when reaching the Stock page
require("dotenv").config();
const Stock = require("../models/stock");
const port = process.env.PORT || 3000;
const cheerio = require("cheerio");
const superagent = require("superagent");
const axios = require("axios");
const mongoose = require("mongoose");
const urlStart = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=";
const urlEnd = "&tsyms=USD,EUR";
// Find date of today midnight

function scrapPriceCurrency(symbole) {
  let url = urlStart + symbole + urlEnd;
  console.log("url", url);
  return axios.get(url).then(resp => {
    let price = resp.data.RAW[symbole].USD.PRICE;
    let volume = resp.data.RAW[symbole].USD.TOTALVOLUME24H;
    let variation = resp.data.RAW[symbole].USD.CHANGEPCT24HOUR;
    let price2 = resp.data.RAW[symbole].EUR.PRICE;
    let variation2 = resp.data.RAW[symbole].EUR.CHANGEPCT24HOUR;

    let newStock = {
      price: price.toFixed(4),
      volume: volume.toFixed(2),
      variation: variation.toFixed(2),
      price2: price2.toFixed(4),
      variation2: variation2.toFixed(2)
    };

    console.log("newStock", newStock);
    Stock.findOneAndUpdate(
      { shortName: symbole + "-CRYPTO" },
      newStock,
      { new: true },
      function(err, doc) {
        if (err) {
          console.log("Something wrong when updating data!");
        }

        console.log(doc);
      }
    );
  });
}

module.exports = scrapPriceCurrency;
