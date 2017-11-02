<template >
<section v-else class="section main">
  <insider-profile-block :profileInfo="profileInfo"></insider-profile-block>
  <nav class="navbar is-dark">
    <div class="babblesMenu">
      <div v-for="(link, index) in navbarLinks" :key="index" @click="sortBabbles(link.query)" :class="{'is-active': link.text[index], 'nav-item': true, 'is-tab': true }"> {{ link.text }}
      </div>
      <p id="vide"></p>
      <router-link to="/" id="reload1" class="babMenu"><i href="/stream" id="reload" class="navbar-item fa fa-refresh"></i></router-link>
    </div>
  </nav>
  <board-current-insights :currentInsights="currentInsights"></board-current-insights>
  <board-watch-list :watchList="watchList"></board-watch-list>
  <board-past-insights :pastInsights="pastInsights"></board-past-insights>
  <board-insiders-followed :insidersFollowed="insidersFollowed"></board-insiders-followed>

</section>
</template>

<script>
import InsiderProfileBlock from "../components/dashboard/InsiderProfileBlock";
import BoardCurrentInsights from "../components/dashboard/BoardCurrentInsights";
import BoardWatchList from "../components/dashboard/BoardWatchList";
import BoardPastInsights from "../components/dashboard/BoardPastInsights";
import BoardInsidersFollowed from "../components/dashboard/BoardInsidersFollowed";
import {
  getInsiderProfileInfo,
  getInsiderCurrentInsights,
  getInsiderWatchList,
  getInsiderPastInsights,
  getInsiderInsidersFollowed
} from "@/api/apiDashboard";

export default {
  data() {
    return {
      profileInfo: null,
      currentInsights: null,
      watchList: null,
      pastInsights: null,
      insidersFollowed: null,
      navbarLinks: [
        {
          location: "/myinsights",
          text: "My current insights"
        },
        {
          location: "/mywatchlist",
          text: "My watch list"
        },
        {
          location: "/mypastinsights",
          text: "My past insights"
        },
        {
          location: "/insiderfollowed",
          text: "Insiders I follow"
        }
      ]
    };
  },
  components: {
    InsiderProfileBlock,
    BoardCurrentInsights,
    BoardWatchList,
    BoardPastInsights,
    BoardInsidersFollowed
  },
  methods: {
    displayInsiderWatchList() {
      const insiderId = this.$route.params.id;
      getInsiderWatchList(insiderId).then(watchList => {
        this.watchList = watchList;
      });
    },
    displayInsiderPastInsights() {
      const insiderId = this.$route.params.id;
      getInsiderPastInsights(insiderId).then(pastInsights => {
        this.pastInsights = pastInsights;
      });
    },
    displayInsiderInsidersFollowed() {
      const insiderId = this.$route.params.id;
      getInsiderInsidersFollowed(insiderId).then(insidersFollowed => {
        this.insidersFollowed = insidersFollowed;
      });
    }
  },
  created() {
    const insiderId = this.$route.params.id;
    getInsiderProfileInfo(insiderId).then(profileInfo => {
      this.profileInfo = profileInfo;
    });
    getInsiderCurrentInsights(insiderId).then(currentInsights => {
      this.currentInsights = currentInsights;
    });
  }
};
</script>

<style scoped>
.section.main {
  background-color: #f9f9f9;
  padding: 7rem 1.5rem;
}

.container {
  display: flex;
}

.navbar.is-dark {
  background-color: #192b41;
  color: #f9f9f9;
}

@media screen and (min-width: 1024px) {
  .navbar {
    min-height: 3.25rem;
  }
}

@media screen and (min-width: 1024px) {
  .navbar,
  .navbar-end,
  .navbar-menu,
  .navbar-start {
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
}

.navbar {
  background-color: #fff;
  min-height: 3.25rem;
  position: relative;
}

.babblesMenu {
  display: flex;
  padding-left: 20px;
}
</style>
