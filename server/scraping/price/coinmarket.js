// *****************************************************************************
// CRYPTOCURRENCY
// *****************************************************************************
// Nouvelle version 05/02/2018

// scrapKey: ******
// symbolePrice : ******
// priceSource : coinmarket
require("dotenv").config();
const Stock = require("../../models/stock");
const cheerio = require("cheerio");
const superagent = require("superagent");
const axios = require("axios");
const mongoose = require("mongoose");
const stockUpdateInfo = [];
let fs = require("fs");
let jsonframe = require("jsonframe-cheerio"); // et jsonframe-cheerio
const got = require("got");

exports.scrapCoinmarketCap = function() {
  const url = "https://coinmarketcap.com/coins/views/all/";
  Stock.find({ priceSource: "coinmarket" }).exec((err, stocksSymbolePrice) => {
    if (err) console.log(err);

    const stockArraySymbolePrice = stocksSymbolePrice.map(el => {
      return el.symbolPrice;
    });

    superagent.get(url).end(function(err, res) {
      if (err) {
        console.log("ERROR", err);
        return;
      }
      $ = cheerio.load(res.text);

      $("tbody tr").each(function() {
        if (
          stockArraySymbolePrice.indexOf(
            $(this)
              .find("td.text-left.col-symbol")
              .text()
          ) > -1
        ) {
          let stUpdate = {};
          stUpdate.symbolPrice = $(this)
            .find("td.text-left.col-symbol")
            .text();

          if (
            $(this)
              .find("td:nth-child(5) > a")
              .text()
          ) {
            stUpdate.price = $(this)
              .find("td:nth-child(5) > a")
              .text();
          }

          stUpdate.variation = $(this)
            .find("td.no-wrap.percent-24h")
            .text();

          stUpdate.volume = $(this)
            .find("td.no-wrap.text-right > a.volume")
            .text();

          // parse to transform string into Number
          stUpdate.price = parseFloat(stUpdate.price.slice(1));
          stUpdate.variation = parseFloat(stUpdate.variation);

          // console.log(stUpdate);
          Stock.findOneAndUpdate(
            { symbolPrice: stUpdate.symbolPrice },
            stUpdate,
            { new: true },
            function(err, doc) {
              if (err) {
                console.log(
                  "Something wrong when updating data!",
                  stUpdate.symbolPrice,
                  err
                );
              }
              console.log(doc);
            }
          );
        }
      });
    });
  });
};
