import axios from "axios";

const insiders = axios.create({
  baseURL: "http://localhost:3000/api"
});

export function getStock(stockName) {
  let url = "/stocks/" + stockName;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}

export function getWatchItem(stockName) {
  let url = "/stocks/" + stockName + "/watchitem";
  return insiders
    .get(url)
    .then(response => {
      //console.log("DEBUG response.data", response);
      return response.data;
    })
    .catch(err => {
      throw err;
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
      return err;
    });
}

export function removeWatchItem(stockName, watchitem_id) {
  let url = `/stocks/${stockName}/watchitem/${watchitem_id}`;
  console.log("********************************************", watchitem_id);
  return insiders
    .delete(url)
    .then(response => {
      console.log(
        "********************************************",
        response.data
      );
      return response.data;
    })
    .catch(err => {
      return err;
    });
}
export function removePosition(stockName, watchitem_id) {
  let url = `/stocks/${stockName}/watchitem/${watchitem_id}`;
  console.log("********************************************", watchitem_id);
  return insiders
    .patch(url)
    .then(response => {
      console.log(
        "********************************************",
        response.data
      );
      return response.data;
    })
    .catch(err => {
      return err;
    });
}

export function beBull(stockName) {
  let url = `/stocks/${stockName}/watchitem/bull`;
  return insiders
    .post(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err;
    });
}

export function beBear(stockName) {
  let url = `/stocks/${stockName}/watchitem/bear`;
  return insiders
    .post(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err;
    });
}

export function getStockBabbles(stockName) {
  let url = `/stocks/${stockName}/babbles`;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return null;
    });
}
