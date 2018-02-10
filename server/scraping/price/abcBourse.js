// Nouvelle version 05/02/2018

// scrapKey: *******
// symbolePrice : ********
// priceSource : abcbourse
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

// *************************************************************************
// SCRAPING ABC BOURSE INDEX
// *************************************************************************

function scrapIndex() {
  const urlFull = "https://www.abcbourse.com/marches/aaz.aspx/GetMarket";

  axios
    .post(urlFull, { marketN: "indicesmkp", letter: "" })
    .then(res => {
      let updateData = res.data.d;
      // console.log("RESPONSE", res.data.d);
      updateData.forEach(dataUpdate => {
        let stockUpdate = {};
        stockUpdate.symbolPrice = dataUpdate.id;
        stockUpdate.high = parseFloat(dataUpdate.h.replace(",", "."));
        stockUpdate.low = parseFloat(dataUpdate.l.replace(",", "."));
        stockUpdate.variation = parseFloat(dataUpdate.Var);
        stockUpdate.volume = parseFloat(dataUpdate.v);
        stockUpdate.price = parseFloat(dataUpdate.c1.replace(",", "."));

        Stock.findOneAndUpdate(
          { symbolPrice: stockUpdate.symbolPrice },
          stockUpdate,
          { new: true },
          function(err, doc) {
            if (err) {
              console.log(
                "Something wrong when updating data!",
                stockUpdate.symbolPrice,
                err
              );
            }
            console.log(doc);
          }
        );
      });
    })
    .catch(err => console.log(err));
}

// *************************************************************************
// SCRAPING ABC BOURSE ROYAUME UNI
// *************************************************************************

function scrapUkByLetter(index) {
  const url = "https://www.abcbourse.com/marches/aaz.aspx/GetMarket";

  axios
    .post(url, { marketN: "uke", letter: index })
    .then(res => {
      let updateData = res.data.d;
      // console.log("RESPONSE", res.data.d);
      updateData.forEach(dataUpdate => {
        let stockUpdate = {};
        stockUpdate.symbolPrice = dataUpdate.id;
        stockUpdate.high = parseFloat(dataUpdate.h.replace(",", "."));
        stockUpdate.low = parseFloat(dataUpdate.l.replace(",", "."));
        stockUpdate.variation = parseFloat(dataUpdate.Var);
        stockUpdate.volume = parseFloat(dataUpdate.v);
        stockUpdate.price = parseFloat(dataUpdate.c1.replace(",", "."));

        Stock.findOneAndUpdate(
          { symbolPrice: stockUpdate.symbolPrice },
          stockUpdate,
          { new: true },
          function(err, doc) {
            if (err) {
              console.log(
                "Something wrong when updating data!",
                stockUpdate.symbolPrice,
                err
              );
            }
            console.log(doc);
          }
        );
      });
    })
    .catch(err => console.log(err));
}

function scrapUk() {
  const dico = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  var letter = 0;
  var loop = setInterval(function() {
    if (dico[letter] == dico[dico.length - 1]) clearInterval(loop);
    scrapUkByLetter(dico[letter]);
    letter++;
  }, 1000);
}

// *************************************************************************
// SCRAPING ABC BOURSE NASDAQ
// *************************************************************************

function scrapNasdaqByLetter(index) {
  const url = "https://www.abcbourse.com/marches/aaz.aspx/GetMarket";

  axios
    .post(url, { marketN: "nasu", letter: index })
    .then(res => {
      let updateData = res.data.d;
      // console.log("RESPONSE", res.data.d);
      updateData.forEach(dataUpdate => {
        let stockUpdate = {};
        stockUpdate.symbolPrice = dataUpdate.id;
        stockUpdate.high = parseFloat(dataUpdate.h.replace(",", "."));
        stockUpdate.low = parseFloat(dataUpdate.l.replace(",", "."));
        stockUpdate.variation = parseFloat(dataUpdate.Var);
        stockUpdate.volume = parseFloat(dataUpdate.v);
        stockUpdate.price = parseFloat(dataUpdate.c1.replace(",", "."));

        Stock.findOneAndUpdate(
          { symbolPrice: stockUpdate.symbolPrice },
          stockUpdate,
          { new: true },
          function(err, doc) {
            if (err) {
              console.log(
                "Something wrong when updating data!",
                stockUpdate.symbolPrice,
                err
              );
            }
            console.log(doc);
          }
        );
      });
    })
    .catch(err => console.log(err));
}

function scrapNasdaq() {
  const dico = ["A-J", "K-Z"];
  var letter = 0;
  var loop = setInterval(function() {
    if (dico[letter] == dico[dico.length - 1]) clearInterval(loop);
    scrapNasdaqByLetter(dico[letter]);
    letter++;
  }, 1000);
}
// *************************************************************************
// SCRAPING ABC BOURSE SP 500
// *************************************************************************

function scrapSpByLetter(index) {
  const url = "https://www.abcbourse.com/marches/aaz.aspx/GetMarket";

  axios
    .post(url, { marketN: "sp500u", letter: index })
    .then(res => {
      let updateData = res.data.d;
      // console.log("RESPONSE", res.data.d);
      updateData.forEach(dataUpdate => {
        let stockUpdate = {};
        stockUpdate.symbolPrice = dataUpdate.id;
        stockUpdate.high = parseFloat(dataUpdate.h.replace(",", "."));
        stockUpdate.low = parseFloat(dataUpdate.l.replace(",", "."));
        stockUpdate.variation = parseFloat(dataUpdate.Var);
        stockUpdate.volume = parseFloat(dataUpdate.v);
        stockUpdate.price = parseFloat(dataUpdate.c1.replace(",", "."));

        Stock.findOneAndUpdate(
          { symbolPrice: stockUpdate.symbolPrice },
          stockUpdate,
          { new: true },
          function(err, doc) {
            if (err) {
              console.log(
                "Something wrong when updating data!",
                stockUpdate.symbolPrice,
                err
              );
            }
            console.log(doc);
          }
        );
      });
    })
    .catch(err => console.log(err));
}

function scrapSp() {
  const dico = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  var letter = 0;
  var loop = setInterval(function() {
    if (dico[letter] == dico[dico.length - 1]) clearInterval(loop);
    scrapSpByLetter(dico[letter]);
    letter++;
  }, 1000);
}

// *************************************************************************
// SCRAPING ABC BOURSE DOW JONES (USA)
// *************************************************************************

function scrapDowJones() {
  const urlFull = "https://www.abcbourse.com/marches/aaz.aspx/GetMarket";

  axios
    .post(urlFull, { marketN: "dju", letter: "" })
    .then(res => {
      let updateData = res.data.d;
      // console.log("RESPONSE", res.data.d);
      updateData.forEach(dataUpdate => {
        let stockUpdate = {};
        stockUpdate.symbolPrice = dataUpdate.id;
        stockUpdate.high = parseFloat(dataUpdate.h.replace(",", "."));
        stockUpdate.low = parseFloat(dataUpdate.l.replace(",", "."));
        stockUpdate.variation = parseFloat(dataUpdate.Var);
        stockUpdate.volume = parseFloat(dataUpdate.v);
        stockUpdate.price = parseFloat(dataUpdate.c1.replace(",", "."));

        Stock.findOneAndUpdate(
          { symbolPrice: stockUpdate.symbolPrice },
          stockUpdate,
          { new: true },
          function(err, doc) {
            if (err) {
              console.log(
                "Something wrong when updating data!",
                stockUpdate.symbolPrice,
                err
              );
            }
            console.log(doc);
          }
        );
      });
    })
    .catch(err => console.log(err));
}

// *************************************************************************
// SCRAPING ABC BOURSE AEX 25 (Holland)
// *************************************************************************

function scrapAex() {
  const urlFull = "https://www.abcbourse.com/marches/aaz.aspx/GetMarket";

  axios
    .post(urlFull, { marketN: "xaex25n", letter: "" })
    .then(res => {
      let updateData = res.data.d;
      // console.log("RESPONSE", res.data.d);
      updateData.forEach(dataUpdate => {
        let stockUpdate = {};
        stockUpdate.symbolPrice = dataUpdate.id;
        stockUpdate.high = parseFloat(dataUpdate.h.replace(",", "."));
        stockUpdate.low = parseFloat(dataUpdate.l.replace(",", "."));
        stockUpdate.variation = parseFloat(dataUpdate.Var);
        stockUpdate.volume = parseFloat(dataUpdate.v);
        stockUpdate.price = parseFloat(dataUpdate.c1.replace(",", "."));

        Stock.findOneAndUpdate(
          { symbolPrice: stockUpdate.symbolPrice },
          stockUpdate,
          { new: true },
          function(err, doc) {
            if (err) {
              console.log(
                "Something wrong when updating data!",
                stockUpdate.symbolPrice,
                err
              );
            }
            console.log(doc);
          }
        );
      });
    })
    .catch(err => console.log(err));
}

// *************************************************************************
// SCRAPING ABC BOURSE BEL 20 (Belgium)
// *************************************************************************

function scrapBel() {
  const urlFull = "https://www.abcbourse.com/marches/aaz.aspx/GetMarket";

  axios
    .post(urlFull, { marketN: "xbel20g", letter: "" })
    .then(res => {
      let updateData = res.data.d;
      // console.log("RESPONSE", res.data.d);
      updateData.forEach(dataUpdate => {
        let stockUpdate = {};
        stockUpdate.symbolPrice = dataUpdate.id;
        stockUpdate.high = parseFloat(dataUpdate.h.replace(",", "."));
        stockUpdate.low = parseFloat(dataUpdate.l.replace(",", "."));
        stockUpdate.variation = parseFloat(dataUpdate.Var);
        stockUpdate.volume = parseFloat(dataUpdate.v);
        stockUpdate.price = parseFloat(dataUpdate.c1.replace(",", "."));

        Stock.findOneAndUpdate(
          { symbolPrice: stockUpdate.symbolPrice },
          stockUpdate,
          { new: true },
          function(err, doc) {
            if (err) {
              console.log(
                "Something wrong when updating data!",
                stockUpdate.symbolPrice,
                err
              );
            }
            console.log(doc);
          }
        );
      });
    })
    .catch(err => console.log(err));
}

// *************************************************************************
// SCRAPING ABC BOURSE PSI 20 (Portugal)
// *************************************************************************

function scrapBel() {
  const urlFull = "https://www.abcbourse.com/marches/aaz.aspx/GetMarket";

  axios
    .post(urlFull, { marketN: "xpsi20l", letter: "" })
    .then(res => {
      let updateData = res.data.d;
      // console.log("RESPONSE", res.data.d);
      updateData.forEach(dataUpdate => {
        let stockUpdate = {};
        stockUpdate.symbolPrice = dataUpdate.id;
        stockUpdate.high = parseFloat(dataUpdate.h.replace(",", "."));
        stockUpdate.low = parseFloat(dataUpdate.l.replace(",", "."));
        stockUpdate.variation = parseFloat(dataUpdate.Var);
        stockUpdate.volume = parseFloat(dataUpdate.v);
        stockUpdate.price = parseFloat(dataUpdate.c1.replace(",", "."));

        Stock.findOneAndUpdate(
          { symbolPrice: stockUpdate.symbolPrice },
          stockUpdate,
          { new: true },
          function(err, doc) {
            if (err) {
              console.log(
                "Something wrong when updating data!",
                stockUpdate.symbolPrice,
                err
              );
            }
            console.log(doc);
          }
        );
      });
    })
    .catch(err => console.log(err));
}

// *************************************************************************
// SCRAPING ABC BOURSE FRANKFURT (Germany)
// *************************************************************************

function scrapGermanByLetter(index) {
  const url = "https://www.abcbourse.com/marches/aaz.aspx/GetMarket";

  axios
    .post(url, { marketN: "germanyf", letter: index })
    .then(res => {
      let updateData = res.data.d;
      console.log("RESPONSE", res.data.d);
      updateData.forEach(dataUpdate => {
        let stockUpdate = {};
        stockUpdate.symbolPrice = dataUpdate.id;
        stockUpdate.high = parseFloat(dataUpdate.h.replace(",", "."));
        stockUpdate.low = parseFloat(dataUpdate.l.replace(",", "."));
        stockUpdate.variation = parseFloat(dataUpdate.Var);
        stockUpdate.volume = parseFloat(dataUpdate.v);
        stockUpdate.price = parseFloat(dataUpdate.c1.replace(",", "."));

        Stock.findOneAndUpdate(
          { symbolPrice: stockUpdate.symbolPrice },
          stockUpdate,
          { new: true },
          function(err, doc) {
            if (err) {
              console.log(
                "Something wrong when updating data!",
                stockUpdate.symbolPrice,
                err
              );
            }
            console.log(doc);
          }
        );
      });
    })
    .catch(err => console.log(err));
}

function scrapGerman() {
  const dico = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",

    "Z"
  ];
  var letter = 0;
  var loop = setInterval(function() {
    if (dico[letter] == dico[dico.length - 1]) clearInterval(loop);
    scrapGermanByLetter(dico[letter]);
    letter++;
  }, 1000);
}
// *************************************************************************
// SCRAPING ABC BOURSE SPAIN
// *************************************************************************

function scrapSpainByLetter(index) {
  const url = "https://www.abcbourse.com/marches/aaz.aspx/GetMarket";

  axios
    .post(url, { marketN: "spainm", letter: index })
    .then(res => {
      let updateData = res.data.d;
      // console.log("RESPONSE", res.data.d);
      updateData.forEach(dataUpdate => {
        let stockUpdate = {};
        stockUpdate.symbolPrice = dataUpdate.id;
        stockUpdate.high = parseFloat(dataUpdate.h.replace(",", "."));
        stockUpdate.low = parseFloat(dataUpdate.l.replace(",", "."));
        stockUpdate.variation = parseFloat(dataUpdate.Var);
        stockUpdate.volume = parseFloat(dataUpdate.v);
        stockUpdate.price = parseFloat(dataUpdate.c1.replace(",", "."));

        Stock.findOneAndUpdate(
          { symbolPrice: stockUpdate.symbolPrice },
          stockUpdate,
          { new: true },
          function(err, doc) {
            if (err) {
              console.log(
                "Something wrong when updating data!",
                stockUpdate.symbolPrice,
                err
              );
            }
            console.log(doc);
          }
        );
      });
    })
    .catch(err => console.log(err));
}

function scrapSpain() {
  const dico = ["A-C", "D-E", "H-L", "M-O", "P-S", "T-Z"];
  var letter = 0;
  var loop = setInterval(function() {
    if (dico[letter] == dico[dico.length - 1]) clearInterval(loop);
    scrapSpainByLetter(dico[letter]);
    letter++;
  }, 1000);
}
// *************************************************************************
// SCRAPING ABC BOURSE ITALY
// *************************************************************************

function scrapItalyByLetter(index) {
  const url = "https://www.abcbourse.com/marches/aaz.aspx/GetMarket";

  axios
    .post(url, { marketN: "italiai", letter: index })
    .then(res => {
      let updateData = res.data.d;
      // console.log("RESPONSE", res.data.d);
      updateData.forEach(dataUpdate => {
        let stockUpdate = {};
        stockUpdate.symbolPrice = dataUpdate.id;
        stockUpdate.high = parseFloat(dataUpdate.h.replace(",", "."));
        stockUpdate.low = parseFloat(dataUpdate.l.replace(",", "."));
        stockUpdate.variation = parseFloat(dataUpdate.Var);
        stockUpdate.volume = parseFloat(dataUpdate.v);
        stockUpdate.price = parseFloat(dataUpdate.c1.replace(",", "."));

        Stock.findOneAndUpdate(
          { symbolPrice: stockUpdate.symbolPrice },
          stockUpdate,
          { new: true },
          function(err, doc) {
            if (err) {
              console.log(
                "Something wrong when updating data!",
                stockUpdate.symbolPrice,
                err
              );
            }
            console.log(doc);
          }
        );
      });
    })
    .catch(err => console.log(err));
}

function scrapItaly() {
  const dico = [
    "A-B",
    "C-D",
    "E-F",
    "G-H",
    "I-J",
    "K-L",
    "M-N",
    "O-P",
    "Q-R",
    "S-T",
    "U-V",
    "W-X",
    "Y-Z"
  ];
  var letter = 0;
  var loop = setInterval(function() {
    if (dico[letter] == dico[dico.length - 1]) clearInterval(loop);
    scrapItalyByLetter(dico[letter]);
    letter++;
  }, 1000);
}

// *************************************************************************
// SCRAPING ABC BOURSE Switzerland
// *************************************************************************

function scrapSwzByLetter(index) {
  const url = "https://www.abcbourse.com/marches/aaz.aspx/GetMarket";

  axios
    .post(url, { marketN: "switzs", letter: index })
    .then(res => {
      let updateData = res.data.d;
      // console.log("RESPONSE", res.data.d);
      updateData.forEach(dataUpdate => {
        let stockUpdate = {};
        stockUpdate.symbolPrice = dataUpdate.id;
        stockUpdate.high = parseFloat(dataUpdate.h.replace(",", "."));
        stockUpdate.low = parseFloat(dataUpdate.l.replace(",", "."));
        stockUpdate.variation = parseFloat(dataUpdate.Var);
        stockUpdate.volume = parseFloat(dataUpdate.v);
        stockUpdate.price = parseFloat(dataUpdate.c1.replace(",", "."));

        Stock.findOneAndUpdate(
          { symbolPrice: stockUpdate.symbolPrice },
          stockUpdate,
          { new: true },
          function(err, doc) {
            if (err) {
              console.log(
                "Something wrong when updating data!",
                stockUpdate.symbolPrice,
                err
              );
            }
            console.log(doc);
          }
        );
      });
    })
    .catch(err => console.log(err));
}

function scrapSwz() {
  const dico = [
    "A-B",
    "C-D",
    "E-F",
    "G-H",
    "I-J",
    "K-L",
    "M-N",
    "O-P",
    "Q-R",
    "S-T",
    "U-V",
    "W-X",
    "Y-Z"
  ];
  var letter = 0;
  var loop = setInterval(function() {
    if (dico[letter] == dico[dico.length - 1]) clearInterval(loop);
    scrapSwzByLetter(dico[letter]);
    letter++;
  }, 1000);
}

exports.abcbourse = function(shortName) {
  switch (shortName.substring(shortName.indexOf("@") + 1)) {
    case "INDEX":
      scrapIndex();
      break;
    case "UK":
      scrapUk();
      break;
    case "US":
      scrapNasdaq();
      // scrapDowJones();
      // scrapSp();
      break;
    case "DE":
      scrapGerman();
      break;
    case "IT":
      scrapItaly();
      break;
  }
};
