require("dotenv").config();
const Stock = require("../models/stock");
const WatchItem = require("../models/watchitem");
const mongoose = require("mongoose");
// const getstockUpdate = require("./getstocksPrice");
mongoose.connect(process.env.MONGODB_URI);

const cac40 = require("../data/cac40");
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

Stock.create(cac40, (err, stock) => {
  if (err) {
    console.error(err);
  }
  stock.forEach(stock => console.log(stock.longName));
  mongoose.connection.close();
});

// Update CAC40
// getstockUpdate("CAC40");
