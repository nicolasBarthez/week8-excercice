// update all stocks with current price
require("dotenv").config();
const Stock = require("../models/stock");
const axios = require("axios");
const mongoose = require("mongoose");
const urlStart = "https://api.iextrading.com/1.0/stock/";
const urlEnd = "/quote";

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
//   });

function getstockUpdate(index) {
  Stock.find({ index: index }).exec((err, stockArray) => {
    console.log(stockArray);
    if (err) console.err(err);
    stockArray.forEach(stock => {
      return axios
        .get(urlStart + stock.symbolPrice + urlEnd)
        .then(response => {
          let stockProperties = response.data;
          let newStock = {
            price: stockProperties.latestPrice,
            variation: stockProperties.change,
            volume: stockProperties.latestVolume
          };
          console.log(newStock);
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

// Update nasdaq
getstockUpdate("nasdaq");

// function getPrice(ticker) {
//   axios.get(urlStart + ticker + urlEnd).then(response => {
//     console.log(response);
//     let stockProperties = response.data;
//     let newStock = {
//       price: stockProperties.latestPrice,
//       variation: stockProperties.change,
//       volume: stockProperties.latestVolume
//     };
//     console.log("NEW STOCK", newStock);
//   });
// }

// getPrice("GOOGL");

module.exports = getstockUpdate;
