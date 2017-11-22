// update all crypto with current price
// Here is your API key: SW9A0AYZ47EZUPCM. Please record this API key for lifetime access to Alpha Vantage.
require("dotenv").config();
const Stock = require("../models/stock");
const axios = require("axios");
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
//
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useMongoClient: true
//   })
//   .then(() => {
//     console.info("The magic happens on port " + port);
//   });
//
// function getCryptoUpdate(index) {
//   Stock.find({ index: index }).exec((err, stockArray) => {
//     console.log(stockArray);
//     if (err) console.err(err);
//     stockArray.forEach(stock => {
//       return axios
//         .get(urlStart + stock.symbolPrice + urlEnd)
//         .then(response => {
//           let stockProperties = response.data;
//           let newStock = {
//             price: stockProperties.latestPrice,
//             variation: stockProperties.change,
//             volume: stockProperties.latestVolume
//           };
//           Stock.findByIdAndUpdate(stock._id, newStock).exec((err, resp) => {
//             console.log(resp);
//             mongoose.connection.close();
//           });
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     });
//   });
// }
//
// // Update nasdaq
// getCryptoUpdate("crypto");

axios
  .get(
    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=EUR&apikey=SW9A0AYZ47EZUPCM"
  )
  .then(resp => {
    console.log(resp.data);
  });

// module.exports = getCryptoUpdate;
