require("dotenv").config();
const Stock = require("../models/stock");
const WatchItem = require("../models/watchitem");
const mongoose = require("mongoose");
// const getstockUpdate = require("./getstocksPrice");
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(
  "mongodb://heroku_7mw65z8c:94jfeq25dddc8ktr3u7psc5dru@ds137435.mlab.com:37435/heroku_7mw65z8c"
);

const euronextParis = require("../data/euronextParis");
const crypto = require("../data/crypto");
const nasdaq = require("../data/nasdaq");

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

// Update CAC40
// getstockUpdate("CAC40");
