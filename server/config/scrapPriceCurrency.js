// update one stock with current price when reaching the Stock page
require("dotenv").config();
const Stock = require("../models/stock");
const port = process.env.PORT || 3000;
const cheerio = require("cheerio");
const superagent = require("superagent");
const axios = require("axios");
const mongoose = require("mongoose");
const urlStart =
  "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=";
const urlEnd = "&market=EUR&apikey=SW9A0AYZ47EZUPCM";
// Find date of today midnight
function todayMidnight() {
  let date = new Date();
  let yyyy = date.getFullYear().toString();
  let mm = (date.getMonth() + 1).toString();
  let dd = date.getDate().toString();
  let mmChars = mm.split("");
  let ddChars = dd.split("");

  return (
    yyyy +
    "-" +
    (mmChars[1] ? mm : "0" + mmChars[0]) +
    "-" +
    (ddChars[1] ? dd : "0" + ddChars[0]) +
    " 00:00:00"
  );
}

function scrapPriceCurrency(symbole) {
  let url = urlStart + symbole + urlEnd;
  return new Promise((resolve, reject) => {
    const xhr = axios.get(url).then(function(err, res) {
      if (err) {
        console.log("ERROR", err);
        return;
      }

      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
    });
  });
}

module.exports = scrapPriceCurrency;
