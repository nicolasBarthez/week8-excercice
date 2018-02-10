require("dotenv").config();
const Stock = require("../models/stock");
const WatchItem = require("../models/watchitem");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect(
//   "mongodb://heroku_7mw65z8c:94jfeq25dddc8ktr3u7psc5dru@ds137435.mlab.com:37435/heroku_7mw65z8c"
// );

const france = require("../data/france");
const other = require("../data/other");
const crypto = require("../data/crypto");

// Remove all Stock data
Stock.collection.drop();

// Create stock data
Stock.create(france, (err, stock) => {
  if (err) {
    console.error(err);
  }
  stock.forEach(stock => console.log(stock.longName));
  mongoose.connection.close();
});

Stock.create(other, (err, stock) => {
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
