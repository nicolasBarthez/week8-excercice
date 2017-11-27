// update all crypto with current price
// Here is your API key: SW9A0AYZ47EZUPCM. Please record this API key for lifetime access to Alpha Vantage.
require("dotenv").config();
const Stock = require("../models/stock");
const axios = require("axios");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const urlStart = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=";
const urlEnd = "&tsyms=USD,EUR";

mongoose
  .connect(
    "mongodb://heroku_7mw65z8c:94jfeq25dddc8ktr3u7psc5dru@ds137435.mlab.com:37435/heroku_7mw65z8c",
    {
      useMongoClient: true
    }
  )
  .then(() => {
    console.info("The magic happens on port " + port);
  });

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useMongoClient: true
//   })
//   .then(() => {
//     console.info("The magic happens on port " + port);
//   })
//   .catch(err => {
//     console.log(err);
//   });

function getCryptoUpdate(index) {
  Stock.find({ index: index }).exec((err, stockArray) => {
    if (err) console.err(err);
    stockArray.forEach(stock => {
      axios
        .get(urlStart + stock.symbolPrice + urlEnd)
        .then(resp => {
          let price = resp.data.RAW[stock.symbolPrice].USD.PRICE;
          let volume = resp.data.RAW[stock.symbolPrice].USD.TOTALVOLUME24H;
          let variation = resp.data.RAW[stock.symbolPrice].USD.CHANGEPCT24HOUR;
          let price2 = resp.data.RAW[stock.symbolPrice].EUR.PRICE;
          let variation2 = resp.data.RAW[stock.symbolPrice].EUR.CHANGEPCT24HOUR;

          let newStock = {
            price: price.toFixed(2),
            volume: volume.toFixed(2),
            variation: variation.toFixed(2),
            price2: price2.toFixed(2),
            variation2: variation2.toFixed(2)
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

// timestampsfunction getCryptoUpdate(index) {
// Stock.find({ index: "crypto" }).exec((err, stockArray) => {
//   if (err) console.err(err);
//   stockArray.forEach(stock => {
//     let imageUpdate = {
//       stockImg: "/static/images/crypto.png"
//     };
//
//     Stock.findByIdAndUpdate(stock._id, imageUpdate).exec((err, resp) => {
//       console.log(resp);
//       mongoose.connection.close();
//     });
//   });
// });

// module.exports = getCryptoUpdate;
