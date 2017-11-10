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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    });
}

export function getMyInsidersFollowed(insiderId) {
  let url = "dashboards/insidersfollowed/" + insiderId;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
}

export function userUpdate(location, bio, skills, picture) {
  let url = "dashboards/edit";
  return insiders
    .patch(url, { location, bio, skills, picture })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
}

export function uploadPicture(image) {
  const formData = new FormData();
  formData.append("image", image);
  let url = "dashboards/upload";
  return insiders
    .post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
}

// Insider profile info
export function getInsiderProfileInfo(insiderId) {
  let url = "dashboards/insider/" + insiderId;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    });
}

export function getInsiderInsidersFollowed(insiderId) {
  let url = "dashboards/insidersfollowed/" + insiderId;
  console.log("URL", url);
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
}

// Follow the user
export function followInsider(insiderId) {
  let url = "/follow/" + insiderId;
  return insiders
    .post(url)
    .then(response => {
      console.log("RETOUR API", response);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
}

// Unollow the user
export function unfollowInsider(insiderId) {
  let url = "/follow/" + insiderId;
  return insiders
    .delete(url)
    .then(response => {
      console.log("RETOUR DU UNFOLLOW", response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
}

// Check if user is followed
export function isFollowed(insiderId) {
  let url = "/follow/" + insiderId;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
}

// Get leaderboar and index of the user
export function getLeaderboard(insiderId) {
  let url = "/dashboards/leaderboard/" + insiderId;
  return insiders
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
}
