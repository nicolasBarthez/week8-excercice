import axios from 'axios'

const insiders = axios.create({
    baseURL: 'https://api.com',

})

export function getStock(string) {
    let url = "/database/search?q=" + string + "&type=artist";
    return insiders.get(url).then(response => {
        return response.data.results;
    });
}

export function getUsers(id) {
    let url = "/users/" + id;
    return insiders.get(url).then(response => {
        return response.data;
    });
}

export function getWatchList(id) {
    let url = "/WatchItems/" + id;
    return insiders.get(url).then(response => {
        return response.data.releases;
    });
}