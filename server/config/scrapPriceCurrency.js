// update one stock with current price when reaching the Stock page
require("dotenv").config();
const Stock = require("../models/stock");
const port = process.env.PORT || 3000;
const cheerio = require("cheerio");
const superagent = require("superagent");
const axios = require("axios");
const mongoose = require("mongoose");
const urlStart = "https://min-api.cryptocompare.com/data/price?fsym=";
const urlEnd = "&tsyms=USD,EUR";
// Find date of today midnight

function scrapPriceCurrency(symbole) {
  let url = urlStart + symbole + urlEnd;
  return axios.get(url).then(resp => {
    let price2 = resp.data.EUR;
    let price = resp.data.USD;

    let newStock = {
      price: price,
      price2: price2
    };
    Stock.findOneAndUpdate(
      { shortName: symbole },
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
