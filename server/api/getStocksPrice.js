// update all stocks with current price
const Stock = require("../models/stock");
const axios = require("axios");
const urlStart =
  "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D'http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D";
const urlEnd =
  "%26f%3Dsl1d1t1c1ohgv%26e%3D.csv'%20and%20columns%3D'symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

// Fetch all stocks
Stock.find().then(resp => {
  console.log("$$$1", resp);
  resp.forEach(stock => {
    console.log("$$$2", stock);
    axios.get(urlStart + stock.symbolPrice + urlEnd).then(stockUpdate => {
      console.log("$$$3", stockUpdate);
    });
  });
});

// function getstockUpdate() {
//   return axios.get(urlStart + "ACA.PA" + urlEnd).then(response => {
//     // console.log("yay", response.data.query.results.row);
//     return response.data.query.results.row;
//   });
// }
//
// const stockNew = getstockUpdate().then(resp => {
//   console.log("tdhfgdgd", resp);
//   return resp;
// });
//
// console.log(stockNew.price);
