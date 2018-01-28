import axios from "axios";

const insiders = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api"
});

export function getUsersList() {
  let url = "admin/users/";
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}

export function getStock(stockName) {
  let url = "admin/stocks/" + stockName;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}

export function getAllStocks() {
  let url = `admin/stocks/`;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return null;
    });
}

export function stockDelete(stockId) {
  let url = `admin/stocks/delete/` + stockId;
  return insiders
    .delete(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return null;
    });
}

export function stockCreate(newstock) {
  let url = `admin/stocks/create/`;
  return insiders
    .post(url, newstock)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return null;
    });
}

export function stockUpdate(
  _id,
  longName,
  shortName,
  index,
  isin,
  currency,
  currency2,
  symbolPrice,
  price,
  price2,
  volume,
  description,
  descriptionEng,
  stockImg,
  scrapKey
) {
  let url = `admin/stocks/edit`;
  return insiders
    .patch(url, {
      _id,
      longName,
      shortName,
      index,
      isin,
      currency,
      currency2,
      symbolPrice,
      price,
      price2,
      volume,
      description,
      descriptionEng,
      stockImg,
      scrapKey
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return null;
    });
}

export function userUpdate(_id, username, location, lang, role, picProfile) {
  let url = "admin/users/edit";
  return insiders
    .patch(url, {
      _id,
      username,
      location,
      lang,
      role,
      picProfile
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err;
    });
}

export function scoreUpdate() {
  let url = "admin/stocks/watchitem/autoclose";
  return insiders
    .patch(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err;
    });
}

export function userDelete(userId) {
  let url = `admin/users/delete/` + userId;
  return insiders
    .delete(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return null;
    });
}
