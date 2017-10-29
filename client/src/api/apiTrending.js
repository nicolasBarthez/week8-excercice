import axios from "axios";

const insiders = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api"
});

export function getStocks(indexSelected) {
  let url = "stocks/index=" + indexSelected;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}
