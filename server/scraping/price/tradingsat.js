// *****************************************************************************
// EURONEXT - MATIERES PREMIERES
// *****************************************************************************
// Nouvelle version 05/02/2018

// scrapKey: ***
// symbolePrice : ****
// priceSource : tradingsatRM ou tradingsatEuronext
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

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useMongoClient: true
//   })
//   .then(() => {
//     console.info("The magic happens on port " + port);
//   });

// *************************************************************************
// EURONEXT
// *************************************************************************

exports.scrapEuronext = function() {
  const urlStart = "https://www.tradingsat.com/actions-de-a-z/archives-";
  const urlEnd = ".html?o=a&f=n&m=";

  console.log("scrapEuronext en force");

  Stock.find({
    priceSource: "tradingsatEuronext"
  }).exec((err, stocksSymbolePrice) => {
    if (err) console.log(err);

    const stockArraySymbolePrice = stocksSymbolePrice.map(el => {
      return el.symbolPrice;
    });

    // console.log("stockArraySymbolePrice", stockArraySymbolePrice);

    for (let page = 1; page < 7; page++) {
      let urlFull = urlStart + page + urlEnd;
      // Scrap data from boursorama
      superagent.get(urlFull).end(function(err, res) {
        if (err) {
          console.log("ERROR", err);
          return;
        }
        $ = cheerio.load(res.text);

        $("tbody tr").each(function() {
          if (
            stockArraySymbolePrice.indexOf(
              $(this)
                .find("td:nth-child(2) >a")
                .text()
            ) > -1
          ) {
            let stUpdate = {};
            stUpdate.symbolPrice = $(this)
              .find("td:nth-child(2) >a")
              .text();

            if (
              parseFloat(
                $(this)
                  .find("td:nth-child(3)")
                  .text()
              )
            ) {
              stUpdate.price = parseFloat(
                $(this)
                  .find("td:nth-child(3)")
                  .text()
              );
            }

            stUpdate.variation = parseFloat(
              $(this)
                .find("td:nth-child(4)")
                .text()
            );

            if (
              parseFloat(
                $(this)
                  .find("td:nth-child(6)")
                  .text()
              )
            ) {
              stUpdate.high = parseFloat(
                $(this)
                  .find("td:nth-child(6)")
                  .text()
              );
            }

            if (
              parseFloat(
                $(this)
                  .find("td:nth-child(7)")
                  .text()
              )
            ) {
              stUpdate.low = parseFloat(
                $(this)
                  .find("td:nth-child(7)")
                  .text()
              );
            }

            stUpdate.volume = $(this)
              .find("td:nth-child(9)")
              .text();
            // .replace(/ /g, "");

            // console.log("StockUpdate", stUpdate);
            if (stUpdate.high) {
              Stock.findOneAndUpdate(
                { symbolPrice: stUpdate.symbolPrice },
                stUpdate,
                { new: true },
                function(err, doc) {
                  if (err) {
                    console.log(
                      "Something wrong when updating data!",
                      stUpdate.symbolPrice
                    );
                  }
                  console.log(doc);
                }
              );
            }
          }
        });
      });
    }
  });
};

// *************************************************************************
// MATIERES PREMIERES / RAW MATERIALS
// *************************************************************************

exports.scrapMp = function() {
  const url = "https://www.tradingsat.com/matieres-premieres/";

  Stock.find({
    priceSource: "tradingsatRM"
  }).exec((err, stocksSymbolePrice) => {
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
              .find("td:nth-child(2) >a")
              .text()
          ) > -1
        ) {
          let stUpdate = {};
          stUpdate.symbolPrice = $(this)
            .find("td:nth-child(2) >a")
            .text();

          if (
            parseFloat(
              $(this)
                .find("td:nth-child(3)")
                .text()
            )
          ) {
            stUpdate.price = parseFloat(
              $(this)
                .find("td:nth-child(3)")
                .text()
            );
          }

          stUpdate.variation = parseFloat(
            $(this)
              .find("td:nth-child(6)")
              .text()
          );

          if (
            parseFloat(
              $(this)
                .find("td:nth-child(4)")
                .text()
            )
          ) {
            stUpdate.high = parseFloat(
              $(this)
                .find("td:nth-child(4)")
                .text()
            );
          }

          if (
            parseFloat(
              $(this)
                .find("td:nth-child(5)")
                .text()
            )
          ) {
            stUpdate.low = parseFloat(
              $(this)
                .find("td:nth-child(5)")
                .text()
            );
          }

          // console.log("StockUpdate", stUpdate);
          if (stUpdate.high) {
            Stock.findOneAndUpdate(
              { symbolPrice: stUpdate.symbolPrice },
              stUpdate,
              { new: true },
              function(err, doc) {
                if (err) {
                  console.log(
                    "Something wrong when updating data!",
                    stUpdate.symbolPrice
                  );
                }
                console.log(doc);
              }
            );
          }
        }
      });
    });
  });
};
