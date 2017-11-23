// update all crypto with current price
// Here is your API key: SW9A0AYZ47EZUPCM. Please record this API key for lifetime access to Alpha Vantage.
require("dotenv").config();
const Stock = require("../models/stock");
const axios = require("axios");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const urlStart = "https://min-api.cryptocompare.com/data/generateAvg?fsym=";
const urlMid = "&tsym=";
const urlEnd = "&e=Coinbase,Kraken,Bitstamp,Bitfinex";

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

function getCryptoUpdateEUR(index) {
  Stock.find({ index: index }).exec((err, stockArray) => {
    if (err) console.err(err);
    stockArray.forEach(stock => {
      console.log("here");
      axios
        .get(urlStart + stock.symbolPrice + urlMid + "EUR" + urlEnd)
        .then(resp => {
          let price2 = resp.data.RAW.PRICE;
          let volume = resp.data.RAW.VOLUME24HOUR;
          let variation2 = resp.data.RAW.CHANGEPCT24HOUR;

          let newStock = {
            price2: price2,
            volume: volume,
            variation2: variation2
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
function getCryptoUpdateUSD(index) {
  Stock.find({ index: index }).exec((err, stockArray) => {
    if (err) console.err(err);
    stockArray.forEach(stock => {
      axios
        .get(urlStart + stock.symbolPrice + urlMid + "USD" + urlEnd)
        .then(resp => {
          let price = resp.data.RAW.PRICE;
          let volume = resp.data.RAW.VOLUME24HOUR;
          let variation = resp.data.RAW.CHANGEPCT24HOUR;
          // let price = resp.data.USD;

          let newStock = {
            price: price2,
            volume: volume,
            variation: variation2
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
getCryptoUpdateEUR("crypto");
// getCryptoUpdateUSD("crypto");

// module.exports = getCryptoUpdate;
