<template>

  <section class="main">
    <my-profile-block v-if="!isEditing" :connectedUser="connectedUser" @editprofile="changeToEdit()" :profileInfo="profileInfo"></my-profile-block>
    <update-my-info v-if="isEditing" :connectedUser="connectedUser" @saveprofile="changeToEdit()" :profileInfo="profileInfo"></update-my-info>

    <my-current-insights v-if="activeItem==='curinsights' && !isEditing " :connectedUser="connectedUser" @Watch=" myWatchList($event)" @InsFollo=" myInsidersFollowed($event)" @PastIns=" myPastInsights($event)" @curIns="currentInsights($event)" ></my-current-insights>
    <my-watch-list v-else-if="activeItem==='watchlist'&& !isEditing" :connectedUser="connectedUser" @Watch=" myWatchList($event)" @InsFollo=" myInsidersFollowed($event)" @PastIns=" myPastInsights($event)" @curIns="currentInsights($event)"></my-watch-list>
    <my-insiders-followed v-else-if="activeItem==='insfollowed'&& !isEditing" :connectedUser="connectedUser" @Watch=" myWatchList($event)" @InsFollo=" myInsidersFollowed($event)" @PastIns=" myPastInsights($event)" @curIns="currentInsights($event)"></my-insiders-followed>
    <my-past-insights v-else-if="activeItem==='pastinsights'&& !isEditing" @Watch=" myWatchList($event)" :connectedUser="connectedUser" @InsFollo=" myInsidersFollowed($event)" @PastIns=" myPastInsights($event)" @curIns="currentInsights($event)" ></my-past-insights>

</section>

</template>

<script>
import MyPastInsights from "../components/mydashboard/MyPastInsights";
import MyCurrentInsights from "../components/mydashboard/MyCurrentInsights";
import MyWatchList from "../components/mydashboard/MyWatchList";
import MyInsidersFollowed from "../components/mydashboard/MyInsidersFollowed";
import MyProfileBlock from "../components/mydashboard/MyProfileBlock";
import UpdateMyInfo from "../components/mydashboard/UpdateMyInfo";
import { getUserProfileInfo } from "@/api/apiDashboard";

export default {
  data() {
    return {
      isEditing: false,
      profileInfo: null,
      activeItem: "curinsights"
    };
  },
  props: {
    connectedUser: Object
  },
  components: {
    MyProfileBlock,
    UpdateMyInfo,
    MyPastInsights,
    MyWatchList,
    MyCurrentInsights,
    MyInsidersFollowed
  },
  methods: {
    changeToEdit() {
      this.isEditing = !this.isEditing;
      getUserProfileInfo().then(profileInfo => {
        this.profileInfo = profileInfo;
      });
    },
    currentInsights() {
      this.activeItem = "curinsights";
    },
    myWatchList() {
      this.activeItem = "watchlist";
    },
    myInsidersFollowed() {
      this.activeItem = "insfollowed";
    },
    myPastInsights() {
      this.activeItem = "pastinsights";
    }
  },
  created() {
    getUserProfileInfo().then(profileInfo => {
      this.profileInfo = profileInfo;
    });
  }
};
</script>

<style scoped>
.main {
    background-color: #f9f9f9;
    padding: 7rem 1.5rem;
}
.container{
  display: flex;
}

.navbar.is-dark {
    background-color: #192b41;
    color: #f9f9f9;
}
div{
   font-size:1.2rem !important
}
.has-text-centered{
  font-size:1.2rem !important
}
.navbar-item.is-tab.is-active {
    background-color: transparent;
    border-bottom-color: #f9f9f9;
    border-bottom-style: solid;
    border-bottom-width: 3px;
    color: #f9f9f9;
    padding-bottom: calc(0.5rem - 3px);
}
.babblesMenu {
    display: flex;
}
@media (max-width: 768px) {
.main {
    background-color: #f9f9f9;
    padding-top:0.5rem  !important;
  }
}

</style>
