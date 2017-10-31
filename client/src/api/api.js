import axios from "axios";

const insiders = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api"
});

export function getUser() {
    let url = "users/userconnected";
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

//know user position on a stock
export function getWatchItem(stockName) {
    let url = "/stocks/" + stockName + "/watchitem";
    return insiders
        .get(url)
        .then(response => {
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
            console.error(err);
            throw err;
        });
}

export function removeWatchItem(stockName, watchitem_id) {
    let url = `/stocks/${stockName}/watchitem/${watchitem_id}`;
    return insiders
        .delete(url)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        });
}
export function removePosition(stockName, watchitem_id) {
    let url = `/stocks/${stockName}/watchitem/${watchitem_id}`;
    return insiders
        .patch(url)
        .then(response => {
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

export function getTrend(stockName, nbDays) {
    let url = "/stocks/" + stockName + "/bull-bear-trend?history=" + nbDays;
    return insiders
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}

export function getStockBabbles(stockName, sortBy) {
    let url = `/babbles/${stockName}?page=1&sort=${sortBy}`;
    return insiders
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return null;
        });
}

export function getWatchInsight() {
    let url = `/watchitems/positions/user`;
    return insiders
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return null;
        });
}

export function sendBabble(babble, stockId) {
    let url = `/babbles?stock=${stockId}`;
    return insiders
        .post(url, {
            babble: babble
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return null;
        });
}

export function postLike(babbleId) {
    let url = `/babbles/like`;
    return insiders
        .post(url, {
            babbleId: babbleId
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return null;
        });
}

export function getRecentPosition() {
    let url = `/watchitems/positions`;
    return insiders
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return null;
        });
}

export function sendBabbleReply(babble, babbleid) {
    console.log("***************************************modalBabbleAPI", babbleid);
    let url = `/babbles/resp?respto=${babbleid}`;
    return insiders
        .post(url, {
            babble: babble
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return null;
        });
}

export function getAUser(userid) {
    let url = `user/info/${userid}`;
    return insiders
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return null;
        });
}

export function getAllStocks() {
    let url = `/stocks?index=all`;
    return insiders
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return null;
        });
}

export function getAllBabbles(sortBy) {
    console.log("*************************", sortBy);
    let url = `/babbles/?page=1&sort=${sortBy}`;
    return insiders
        .get(url)
        .then(response => {
            return response.data;
            console.log("*************************", response.data);
        })
        .catch(err => {
            return null;
        });
}