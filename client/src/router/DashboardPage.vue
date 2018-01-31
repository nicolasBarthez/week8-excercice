<template >
<not-found v-if="profileInfo==='no user'"></not-found>
<section v-else class="section main">
<insider-profile-block @profileInfo="updateInsiderProfile()" @changeFollow="updateInsiderProfile()" :profileInfo="profileInfo" :connectedUser="connectedUser"></insider-profile-block>

  <board-insiders-current-insights v-if="activeItem==='curinsights'":currentInsights="currentInsights":connectedUser="connectedUser" @Watch=" myWatchList($event)" @InsFollo=" myInsidersFollowed($event)" @PastIns=" myPastInsights($event)" @curIns="updateInsiderProfile($event)" ></board-insiders-current-insights>
  <board-insiders-watch-list v-else-if="activeItem==='watchlist'"@Watch=" myWatchList($event)" :connectedUser="connectedUser" @InsFollo=" myInsidersFollowed($event)" @PastIns=" myPastInsights($event)" @curIns="updateInsiderProfile($event)"></board-insiders-watch-list>
  <board-insiders-past-insights v-else-if="activeItem==='pastinsights'"@Watch=" myWatchList($event)" :connectedUser="connectedUser" @InsFollo=" myInsidersFollowed($event)" @PastIns=" myPastInsights($event)" @curIns="updateInsiderProfile($event)"></board-insiders-past-insights>
  <board-insiders-followed  v-else @Watch=" myWatchList($event)" @InsFollo=" myInsidersFollowed($event)" :connectedUser="connectedUser" @PastIns=" myPastInsights($event)" @curIns="updateInsiderProfile($event)" ></board-insiders-followed>

</section>
</template>

<script>
import NotFound from "@/router/NotFound";
import { getInsiderCurrentInsights } from "@/api/apiDashboard";
import InsiderProfileBlock from "../components/dashboard/InsiderProfileBlock";
import BoardInsidersCurrentInsights from "../components/dashboard/BoardInsidersCurrentInsights";
import BoardInsidersWatchList from "../components/dashboard/BoardInsidersWatchList";
import BoardInsidersPastInsights from "../components/dashboard/BoardInsidersPastInsights";
import BoardInsidersFollowed from "../components/dashboard/BoardInsidersFollowed";
import { getInsiderProfileInfo } from "@/api/apiDashboard";

export default {
  data() {
    return {
      currentInsights: [],
      profileInfo: null,
      activeItem: "curinsights"
    };
  },
  components: {
    InsiderProfileBlock,
    BoardInsidersCurrentInsights,
    BoardInsidersWatchList,
    BoardInsidersPastInsights,
    BoardInsidersFollowed,
    NotFound
  },
  props: {
    connectedUser: Object
  },
  methods: {
    myWatchList() {
      this.activeItem = "watchlist";
    },
    myInsidersFollowed() {
      this.activeItem = "insfollowed";
    },
    myPastInsights() {
      this.activeItem = "pastinsights";
    },
    updateInsiderProfile() {
      getInsiderProfileInfo(this.$route.params.id).then(profileInfo => {
        this.profileInfo = profileInfo;
      });
      this.activeItem = "curinsights";
      const insiderId = this.$route.params.id;
      getInsiderCurrentInsights(insiderId).then(currentInsights => {
        this.currentInsights = currentInsights;
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
div{
   font-size:1.2rem !important
}
.has-text-centered{
  font-size:1.2rem !important
}
.navbar.is-dark {
  background-color: #192b41;
  color: #f9f9f9;
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

@media screen and (min-width: 1024px) {
  .navbar {
    min-height: 3.25rem;
  }
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
@media (max-width: 768px) {
  .main {
    background-color: #f9f9f9;
    padding-top:0.5rem  !important;
  }
}
</style>
