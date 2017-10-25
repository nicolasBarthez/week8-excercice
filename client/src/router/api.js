import axios from "axios";

const insiders = axios.create({
  baseURL: "http://localhost:3000/api"
});

export function getStock(stockName) {
  let url = "/stocks/" + stockName;
  return insiders.get(url).then(response => {
    return response.data;
  });
}

export function getWatchItem(id) {
  let url = "/watchitem/" + id;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return null;
    });
}

export function postWatchItem(id) {
  let url = "/WatchItems/" + id;
  return insiders.post(url).then(response => {
    return response.data.WatchItem;
  });
}

export function getUsers(id) {
  let url = "/users/" + id;
  return insiders.get(url).then(response => {
    return response.data.user;
  });
}
