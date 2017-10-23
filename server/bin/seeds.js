const Stock = require("../models/stock");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/insidersDB-dev");

const StockData = require("../data/cac40");

Stock.create(StockData, (err, stock) => {
  if (err) {
    console.error(err);
  }
  stock.forEach(stock => console.log(stock.longName));
  mongoose.disconnect();
});
