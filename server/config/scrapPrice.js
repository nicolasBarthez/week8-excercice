// update one stock with current price when reaching the Stock page
require("dotenv").config();
const Stock = require("../models/stock");
const port = process.env.PORT || 3000;
const cheerio = require("cheerio");
const superagent = require("superagent");
const axios = require("axios");
const mongoose = require("mongoose");

// Scrap Euronext
function scrapPrice(url) {
  return new Promise((resolve, reject) => {
    const xhr = superagent.get(url).end(function(err, res) {
      if (err) {
        console.log("ERROR", err);
        return;
      }
      $ = cheerio.load(res.text);

      let stUpdate = {};

      stUpdate.price = parseFloat(
        $("#fiche_cours_details tr")
          .find("td:nth-child(2) .cotation")
          .text()
      );

      stUpdate.variation = parseFloat(
        $("#fiche_cours_details")
          .find("tr:nth-child(2) td:nth-child(2)")
          .text()
      );

      stUpdate.volume = parseFloat(
        $("#fiche_cours_details")
          .find("tr:nth-child(4) td:nth-child(2)")
          .text()
          .replace(/ /g, "")
      );

      console.log("RESULT", stUpdate);

      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      mongoose
        .connect(process.env.MONGODB_URI, {
          useMongoClient: true
        })
        .then(() => {
          console.info("The magic happens on port " + port);
        })
        .catch(err => {
          console.log(err);
        });
      Stock.findOneAndUpdate(
        { scrapKey: url },
        stUpdate,
        { new: true },
        function(err, doc) {
          if (err) {
            console.log("Something wrong when updating data!");
          }

          return doc;
          mongoose.connection.close();
        }
      );
    });
  });
}

module.exports = scrapPrice;
