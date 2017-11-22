// update all crypto with current price
// Here is your API key: SW9A0AYZ47EZUPCM. Please record this API key for lifetime access to Alpha Vantage.
require("dotenv").config();
const Stock = require("../models/stock");
const axios = require("axios");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const urlStart =
  "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=";
const urlEnd = "&market=EUR&apikey=SW9A0AYZ47EZUPCM";

// mongoose
//   .connect(
//     "mongodb://heroku_7mw65z8c:94jfeq25dddc8ktr3u7psc5dru@ds137435.mlab.com:37435/heroku_7mw65z8c",
//     {
//       useMongoClient: true
//     }
//   )
//   .then(() => {
//     console.info("The magic happens on port " + port);
//   });

mongoose
  .connect(process.env.MONGODB_URI, {
    useMongoClient: true
  })
  .then(() => {
    console.info("The magic happens on port " + port);
  })
  .catch(err => {
    console.log(err);
  });

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

function getCryptoUpdate(index) {
  Stock.find({ index: index }).exec((err, stockArray) => {
    console.log(stockArray);
    if (err) console.err(err);
    stockArray.forEach(stock => {
      return axios
        .get(urlStart + stock.symbolPrice + urlEnd)
        .then(response => {
          let priceList = resp.data["Time Series (Digital Currency Intraday)"];
          let lastPrice = priceList[Object.keys(priceList)[0]];
          let openDate = todayMidnight();
          let openPrice = priceList[`${openDate}`];
          let price2 = lastPrice["1a. price (EUR)"];
          let price = lastPrice["1b. price (USD)"];
          let variation2 =
            (price2 - openPrice["1a. price (EUR)"]) /
            openPrice["1a. price (EUR)"];
          let variation =
            (price - openPrice["1b. price (USD)"]) /
            openPrice["1b. price (USD)"];
          let volume = lastPrice["2. volume"];

          let newStock = {
            price: price,
            price2: price2,
            variation: variation,
            variation2: variation2,
            volume: volume
          };
          Stock.findByIdAndUpdate(stock._id, newStock).exec((err, resp) => {
            console.log(resp);
            mongoose.connection.close();
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
}

// Update crypto
getCryptoUpdate("crypto");

// test
// axios
//   .get(
//     "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=EUR&apikey=SW9A0AYZ47EZUPCM"
//   )
//   .then(resp => {
//     let priceList = resp.data["Time Series (Digital Currency Intraday)"];
//     let lastPrice = priceList[Object.keys(priceList)[0]];
//     let openDate = todayMidnight();
//     let openPrice = priceList[`${openDate}`];
//     let price2 = lastPrice["1a. price (EUR)"];
//     let price = lastPrice["1b. price (USD)"];
//     let variation2 =
//       (price2 - openPrice["1a. price (EUR)"]) / openPrice["1a. price (EUR)"];
//     let variation =
//       (price - openPrice["1b. price (USD)"]) / openPrice["1b. price (USD)"];
//     let volume = lastPrice["2. volume"];
//
//     let newStock = {
//       price: price,
//       price2: price2,
//       variation: variation,
//       variation2: variation2,
//       volume: volume
//     };
//     console.log(newStock);
//   })
//   .catch(err => console.log("ERROR", err));

module.exports = getCryptoUpdate;
