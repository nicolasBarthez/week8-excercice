import axios from "axios";

const insiders = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api"
});

// User connected info
export function getUserProfileInfo() {
  let url = "dashboards/profile";
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}

export function getCurrentInsights() {
  let url = "dashboards/currentinsights";
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}

export function getMyWatchList() {
  let url = "dashboards/watchlist";
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}

export function getMyPastInsights() {
  let url = "dashboards/pastinsights/";
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}

export function getMyInsidersFollowed() {
  let url = "dashboards/insidersfollowed";
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}

// Insider profile info
export function getInsiderProfileInfo(insiderId) {
  let url = "dashboards/profile/?id=" + insiderId;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}

export function getInsiderCurrentInsights(insiderId) {
  let url = "dashboards/currentinsights/?id=" + insiderId;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}

export function getInsiderWatchList(insiderId) {
  let url = "dashboards/watchlist/?id=" + insiderId;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}

export function getInsiderPastInsights(insiderId) {
  let url = "dashboards/pastinsights/?id=" + insiderId;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}

export function getInsiderInsidersFollowed(insiderId) {
  let url = "dashboards/insidersfollowed/?id=" + insiderId;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}
