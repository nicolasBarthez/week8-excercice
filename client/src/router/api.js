import axios from 'axios'

const insiders = axios.create({
    baseURL: 'http://localhost:3000/api',

})

export function getStock(stockName) {
    let url = "/stocks/" + stockName;
    return insiders.get(url).then(response => {
        return response.data.stock;
    });
}

export function getWatchItem(stockName) {
    let url = "/stocks/" + stockName + "/watchitem/";
    return insiders.get(url).then(response => {
            console.log("********************************************", response.data.watchitem)
            return response.data.watchitem;
        })
        .catch(err => {
            return null;
        });
}




export function getUsers(id) {
    let url = "/users/" + id;
    return insiders.get(url).then(response => {
        return response.data.user;
    });
}