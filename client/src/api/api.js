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

export function getWatchItem(stockName) {
  let url = "/stocks/" + stockName + "/watchitem/";
  return insiders
    .get(url)
    .then(response => {
      console.log("DEBUG response.data", watchitem.position);
      return response.data;
    })
    .catch(err => {
      console.log("***********************************", err);
      return null;
    });
}

export function addWatchItem(stockName) {
  let url = `/stocks/${stockName}/watchitem/add`;
  return insiders
    .post(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return null;
    });
}

export function RemoveWatchItem(stockName, watchitem_id) {
  let url = `/stocks/${stockName}/watchitem`;
  console.log("********************************************", watchitem_id);
  return insiders
    .delete(url, watchitem_id)
    .then(response => {
      console.log(
        "********************************************",
        response.data
      );
      return response.data;
    })
    .catch(err => {
      return null;
    });
}

export function BeBull(stockName) {
  let url = `/stock/${stockName}/watchitem/bull`;
  return insiders
    .post(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return null;
    });
}

export function BeBear(stockName) {
  let url = `/stock/${stockName}/watchitem/bear`;
  return insiders
    .post(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return null;
    });
}
