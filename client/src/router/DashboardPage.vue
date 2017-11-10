<template >
<section v-else class="section main">
<insider-profile-block @changeFollow="updateInsiderProfile()" :profileInfo="profileInfo"></insider-profile-block>
 
  <board-insiders-current-insights v-if="activeItem==='curinsights'" @Watch=" myWatchList($event)" @InsFollo=" myInsidersFollowed($event)" @PastIns=" myPastInsights($event)" @curIns="currentInsights($event)" ></board-insiders-current-insights>
  <board-insiders-watch-list v-else-if="activeItem==='watchlist'"@Watch=" myWatchList($event)" @InsFollo=" myInsidersFollowed($event)" @PastIns=" myPastInsights($event)" @curIns="currentInsights($event)"></board-insiders-watch-list>
  <board-insiders-past-insights v-else-if="activeItem==='pastinsights'"@Watch=" myWatchList($event)" @InsFollo=" myInsidersFollowed($event)" @PastIns=" myPastInsights($event)" @curIns="currentInsights($event)"></board-insiders-past-insights>
  <board-insiders-followed  v-else @Watch=" myWatchList($event)" @InsFollo=" myInsidersFollowed($event)" @PastIns=" myPastInsights($event)" @curIns="currentInsights($event)" ></board-insiders-followed>

</section>
</template>

<script>
import InsiderProfileBlock from "../components/dashboard/InsiderProfileBlock";
import BoardInsidersCurrentInsights from "../components/dashboard/BoardInsidersCurrentInsights";
import BoardInsidersWatchList from "../components/dashboard/BoardInsidersWatchList";
import BoardInsidersPastInsights from "../components/dashboard/BoardInsidersPastInsights";
import BoardInsidersFollowed from "../components/dashboard/BoardInsidersFollowed";
import { getInsiderProfileInfo } from "@/api/apiDashboard";

export default {
  data() {
    return {
    profileInfo: null,
    activeItem: 'curinsights'
    };
  },
  components: {
    InsiderProfileBlock,
    BoardInsidersCurrentInsights,
    BoardInsidersWatchList,
    BoardInsidersPastInsights,
    BoardInsidersFollowed
  },
  methods: {
    currentInsights(){ 
            this.activeItem= "curinsights"
        },
    myWatchList(){
            this.activeItem= "watchlist"
        },
    myInsidersFollowed(){
            this.activeItem= "insfollowed"
    },
    myPastInsights(){
            this.activeItem= "pastinsights"
    },
    updateInsiderProfile() {
      getInsiderProfileInfo(this.$route.params.id).then(profileInfo => {
        this.profileInfo = profileInfo;
      });
    }
  },
  created() {
    const insiderId = this.$route.params.id;
    getInsiderProfileInfo(insiderId).then(profileInfo => {
      this.profileInfo = profileInfo;
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
    padding-top:4.2rem  !important;
  }
}
</style>
