import axios from 'axios'

const insiders = axios.create({
    baseURL: 'http://localhost:3000/api',

})

export function getStock(stockName) {
    console.log("********************************************")
    let url = "/stocks/" + stockName;
    return insiders.get(url).then(response => {
        console.log("********************************************", response.data.stock)
        return response.data.stock;
    });
}

export function getWatchItem(id) {
    let url = "/WatchItems/" + id;
    return insiders.get(url).then(response => {
        return response.data.WatchItem;
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