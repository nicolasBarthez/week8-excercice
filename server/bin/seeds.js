require("dotenv").config();
const Stock = require("../models/stock");
const WatchItem = require("../models/watchitem");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect(
//   "mongodb://heroku_7mw65z8c:94jfeq25dddc8ktr3u7psc5dru@ds137435.mlab.com:37435/heroku_7mw65z8c"
// );

const euronextParis = require("../data/euronextParis");
const crypto = require("../data/crypto");
const nasdaq = require("../data/nasdaq");
const index = require("../data/index");
const autres = require("../data/autres");

// Remove all Stock data
Stock.collection.drop();

// Create stock data
Stock.create(nasdaq, (err, stock) => {
  if (err) {
    console.error(err);
  }
  stock.forEach(stock => console.log(stock.longName));
  mongoose.connection.close();
});

Stock.create(euronextParis, (err, stock) => {
  if (err) {
    console.error(err);
  }
  stock.forEach(stock => console.log(stock.longName));
  mongoose.connection.close();
});

Stock.create(crypto, (err, stock) => {
  if (err) {
    console.error(err);
  }
  stock.forEach(stock => console.log(stock.longName));
  mongoose.connection.close();
});

Stock.create(index, (err, stock) => {
  if (err) {
    console.error(err);
  }
  stock.forEach(stock => console.log(stock.longName));
  mongoose.connection.close();
});

Stock.create(autres, (err, stock) => {
  if (err) {
    console.error(err);
  }
  stock.forEach(stock => console.log(stock.longName));
  mongoose.connection.close();
});
