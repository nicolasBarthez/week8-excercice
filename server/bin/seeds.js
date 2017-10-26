const Stock = require("../models/stock");
const WatchItem = require("../models/watchitem");
const mongoose = require("mongoose");
const getstockUpdate = require("./getstocksPrice");
mongoose.connect("mongodb://localhost/insidersDB-dev", { useMongoClient: true });

const StockData = require("../data/cac40");

// Remove all Stock data
Stock.collection.drop();

// Create stock data
Stock.create(StockData, (err, stock) => {
    if (err) {
        console.error(err);
    }
    stock.forEach(stock => console.log(stock.longName));
    mongoose.connection.close();
});

// Update CAC40
getstockUpdate("CAC40");