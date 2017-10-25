// update all stocks with current price
require("dotenv").config();
const Stock = require("../models/stock");
const axios = require("axios");
const mongoose = require("mongoose");
const urlStart =
  "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D'http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D";
const urlEnd =
  "%26f%3Dsl1d1t1c1ohgv%26e%3D.csv'%20and%20columns%3D'symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
});

function getstockUpdate(index) {
  Stock.find({ index: index }).exec((err, stockArray) => {
    stockArray.forEach(stock => {
      return axios.get(urlStart + stock.symbolPrice + urlEnd).then(response => {
        let stockProperties = response.data.query.results.row;
        let newStock = {
          price: stockProperties.price,
          variation: stockProperties.change,
          volume: stockProperties.col2
        };
        Stock.findByIdAndUpdate(stock._id, newStock).exec();
      });
    });
  });
}

// Update CAC40
getstockUpdate("CAC40");

model.exports = getstockUpdate;
