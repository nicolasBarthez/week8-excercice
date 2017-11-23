// update all stocks with current price
require("dotenv").config();
const Stock = require("../models/stock");
const cheerio = require("cheerio");
const superagent = require("superagent");
const axios = require("axios");
const mongoose = require("mongoose");
let url =
  "http://www.boursorama.com/bourse/actions/cours_az.phtml?MARCHE=1rPPX5&page=";
const stockUpdateInfo = [];

mongoose
  .connect(process.env.MONGODB_URI, {
    useMongoClient: true
  })
  .then(() => {
    console.info("The magic happens on port " + port);
  });

Stock.find({ index: "EURONEXT PARIS" }).exec((err, stocksSymbolePrice) => {
  if (err) console.log(err);

  const stockArraySymbolePrice = stocksSymbolePrice.map(el => {
    return el.symbolPrice;
  });

  console.log("stockArraySymbolePrice", stockArraySymbolePrice);

  for (nbPage = 1; nbPage < 9; nbPage++) {
    let urlFull = url + nbPage;
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
              .find("td:nth-child(2)")
              .text()
          ) > -1
        ) {
          let stUpdate = {};
          stUpdate.symbolPrice = $(this)
            .find("td:nth-child(2)")
            .text();

          // stUpdate.symbolPrice = $(this)
          //   .find("td:nth-child(2) a")
          //   .attr("href")
          //   .substring(
          //     $(this)
          //       .find("td:nth-child(2) a")
          //       .attr("href")
          //       .indexOf("=") + 3
          //   );
          stUpdate.price = parseFloat(
            $(this)
              .find("td:nth-child(4)")
              .text()
          );

          stUpdate.variation = parseFloat(
            $(this)
              .find("td:nth-child(5)")
              .text()
          );

          stUpdate.volume = parseFloat(
            $(this)
              .find("td:nth-child(10)")
              .text()
          );

          Stock.findOneAndUpdate(
            { symbolPrice: stUpdate.symbolPrice },
            stUpdate,
            { new: true },
            function(err, doc) {
              if (err) {
                console.log("Something wrong when updating data!");
              }

              console.log(doc);
            }
          );
        }
      });
    });
  }
});

// function getstockUpdate(index) {
//   Stock.find({ index: index }).exec((err, stockArray) => {
//     if (err) console.err(err);
//     stockArray.forEach(stock => {
//       return axios.get(urlStart + stock.symbolPrice + urlEnd).then(response => {
//         let stockProperties = response.data.query.results.row;
//         let newStock = {
//           price: stockProperties.price,
//           variation: stockProperties.change,
//           volume: stockProperties.col2
//         };
//         Stock.findByIdAndUpdate(stock._id, newStock).exec();
//       });
//     });
//   });
// }
//
// // Update CAC40
// getstockUpdate("CAC40");
//
// module.exports = getstockUpdate;
