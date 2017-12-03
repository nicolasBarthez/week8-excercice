// update all description from Boursoraman
require("dotenv").config();
const Stock = require("../models/stock");
const cheerio = require("cheerio");
const superagent = require("superagent");
const axios = require("axios");
const mongoose = require("mongoose");
let url = "http://www.boursorama.com/bourse/profil/profil.phtml?symbole=1r";

mongoose.connect(
  "mongodb://heroku_7mw65z8c:94jfeq25dddc8ktr3u7psc5dru@ds137435.mlab.com:37435/heroku_7mw65z8c"
);

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useMongoClient: true
//   })
//   .then(() => {
//     console.info("The magic happens on port " + port);
//   });
function updateBourso() {
  Stock.find({ index: "EURONEXT PARIS" }).exec((err, stocksSymbolePrice) => {
    if (err) console.log(err);

    const stockArraySymbolePrice = stocksSymbolePrice.map(el => {
      return el.shortName;
    });

    console.log("stockArraySymbolePrice", stockArraySymbolePrice);

    stockArraySymbolePrice.forEach(symbol => {
      superagent.get(url + "P" + symbol).end(function(err, res) {
        if (err) {
          console.log("ERROR", err);
          return;
        }
        $ = cheerio.load(res.text);

        $("#profil_content").each(function() {
          let stUpdate = {};
          stUpdate.description = $(this)
            .find(".txt02")
            .text();
          // console.log("DESCRIPTION", stUpdate);
          Stock.findOneAndUpdate(
            { shortName: symbol },
            stUpdate,
            { new: true },
            function(err, doc) {
              if (err) {
                console.log("Something wrong when updating data!");
              }

              console.log(doc);
            }
          );
        });
      });
    });
  });
}

module.exports = updateBourso;
