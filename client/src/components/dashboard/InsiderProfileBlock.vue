<template >
  <div v-if = "profileInfo" class="column is-3" id="ActionCard">
    <div class="card profile-card">
      <div class="card-content">
        <div class="media" id="stockInfo">
          <div class="media-left">
            <figure class="image is-64x64 is-circle">
              <img class="imgProfile" :src="profileInfo.picProfile" alt="my picture">
            </figure>
          </div>
          <div class="media-content">
            <div class="stock-banner" id="profile-banner">
              <div class="sock-info">
                <p class="title is-5">
              @{{profileInfo.username}}
            </p>
             <p class="subtitle is-6 location">
                  <small>{{profileInfo.location ? profileInfo.location : "Secret..." }}</small>
                </p>
              </div>
             <div id="perf">
                <div>
                  <p class="is-6 has-text-grey-light"><strong class="follOwStrong">Performance</strong></p>
                  <p class="title is-5 follOwStrong">
                    <strong class="follOwStrong" :class="{'has-text-green' :profileInfo.performancePoints.toFixed(0)>0, 'has-text-red' : profileInfo.performancePoints.toFixed(0)<0}"> {{profileInfo.performancePoints.toFixed(0) }} &nbsp P$</strong>
                  </p>
                </div>
              <div class="wonTrade"id="follOw">
                  <p class="is-6 has-text-grey-light follOw"><strong class="follOwStrong">{{connectedUser.lang ==="EN"? "Won Trades":"Trades gagnants"}}</strong></p>
                  <p class="title is-5 follOwStrong">
                    <strong class="follOwStrong">{{profileInfo.nbOfInsightsWon}}</strong>
                  </p>
                </div>
              </div>
            <div class="add-to-watchlist" v-if="!($route.params.id===$root.user._id)">
                <button v-if="!followed" @click="follow" id="adWLT" class="button is-small is-outlined is-primary" type="button" name="button">{{connectedUser.lang ==="EN"? "Follow":"Suivre"}}</button>
            <button v-else @click="unfollow" id="adWLT" class="button is-small is-outlined is-primary" type="button" name="button">{{connectedUser.lang ==="EN"? "Unfollow":"Ne plus suivre"}}</button>
          </div>
          <div v-else class="add-to-watchlist">
             <button @click="editMyProfile" id="adWLT" class="button is-small is-outlined is-primary" type="button" name="button">{{connectedUser.lang ==="EN"? "My DashBoard":"Mon profil"}}</button>
          </div>
            </div>
             <div id="refAndSkills">
              <div class="preferedTrades level-item has-text-centered column is-3">
                <p class="title is-6">{{connectedUser.lang ==="EN"? "Prefered trades":"Positions préférées"}}</p>
                <p class="is-4"><router-link v-if="profileInfo.preferedStocks[0]" :to="'/stocks/'+profileInfo.preferedStocks[0].shortName"class="stockName is-6" data-replace="Symbol">
                  1. {{profileInfo.preferedStocks[0]? profileInfo.preferedStocks[0].longName : "-" }} - {{profileInfo.preferedStocks[0]? profileInfo.preferedStocks[0].performancePoints.toFixed(0) : "-" }} P$
                </router-link></p>
                <p class="is-4"><router-link v-if="profileInfo.preferedStocks[1]" :to="'/stocks/'+profileInfo.preferedStocks[1].shortName"class="stockName is-6" data-replace="Symbol">
                  2. {{profileInfo.preferedStocks[1]? profileInfo.preferedStocks[1].longName : "-" }} - {{profileInfo.preferedStocks[1]? profileInfo.preferedStocks[1].performancePoints.toFixed(0) : "-" }} P$
                </router-link></p>
                <p class="is-4"><router-link v-if="profileInfo.preferedStocks[2]" :to="'/stocks/'+profileInfo.preferedStocks[2].shortName"class="stockName is-6" data-replace="Symbol">
                  3. {{profileInfo.preferedStocks[2]? profileInfo.preferedStocks[2].longName : "-" }} - {{profileInfo.preferedStocks[2]? profileInfo.preferedStocks[2].performancePoints.toFixed(0) : "-" }} P$
                </router-link></p>
              </div>
               <nav v-if="leaderboard" id="LB" class="level media">
                <figure v-if="leaderboard.rankingByPoints[leaderboard.index-1]"class="image is-96x96 is-circle" >
                  <router-link :to="leaderboard.index===-1 ? '/dashboard/'+profileInfo.userId:'/dashboard/'+leaderboard.rankingByPoints[leaderboard.index-1].userId">
                    <img class="imgProfile" :src="leaderboard.index===-1 ? profileInfo.picProfile:leaderboard.rankingByPoints[leaderboard.index-1].picProfile" alt="my picture"></router-link>
                   <span class="rank subtitle is-6">
                                        {{leaderboard.index===-1 ? 0 :leaderboard.rankingByPoints[leaderboard.index-1].performancePoints.toFixed(0) }} <small>P$</small>
                                        </span>
                </figure>
                <figure v-if="leaderboard.rankingByPoints[0]"class="image is-96x96 is-circle centralPic">
                   <router-link :to="leaderboard.index===-1 ? '/dashboard/'+leaderboard.rankingByPoints[0].userId:'/dashboard/'+leaderboard.rankingByPoints[leaderboard.index].userId">
                  <img class="imgProfile":src="leaderboard.index===-1 ? leaderboard.rankingByPoints[0].picProfile:leaderboard.rankingByPoints[leaderboard.index].picProfile" alt="my picture"></router-link>
                  <span class="rank subtitle is-6">
                                        {{leaderboard.index===-1 ? leaderboard.rankingByPoints[0].performancePoints.toFixed(0)  :leaderboard.rankingByPoints[leaderboard.index].performancePoints.toFixed(0) }} <small>P$</small>
                                        </span>
                </figure>
                <figure v-if="leaderboard.rankingByPoints[leaderboard.index+1]" class="image is-96x96 is-circle">
                  <router-link  :to="leaderboard.index===-1 ? '/dashboard/'+leaderboard.rankingByPoints[1].userId:'/dashboard/'+leaderboard.rankingByPoints[leaderboard.index+1].userId">
                  <img class="imgProfile"  :src="leaderboard.index===-1 ? leaderboard.rankingByPoints[1].picProfile:leaderboard.rankingByPoints[leaderboard.index+1].picProfile" alt="my picture"></router-link>
                  <span  class="rank subtitle is-6">
                                        {{leaderboard.index===-1 ? leaderboard.rankingByPoints[1].performancePoints.toFixed(0)  :leaderboard.rankingByPoints[leaderboard.index+1].performancePoints.toFixed(0) }} <small>P$</small>
                                    </span>
                </figure>
              </nav>

              <div  class="preferedTrades level-item has-text-centered column is-3">
                <p class="title is-6"><strong>Skills</strong></p>
                <div   class="preferedTrades level-item has-text-centered column is-3" v-if="profileInfo.skills.length>0">
                <b-tag class="is-4">{{profileInfo.skills[0]}}</b-tag>
                <b-tag class="is-4" v-if="profileInfo.skills[1]">{{profileInfo.skills[1]}}</b-tag>
                <b-tag class="is-4" v-if="profileInfo.skills[2]">{{profileInfo.skills[2]}}</b-tag>
                </div>
                <div v-else >{{connectedUser.lang ==="EN"? "No special skills for this Insiders!":"Pas d'expertise renseignée pour cet Insider !"}}</div>
                <!-- <div v-if="profileInfo.skills" v-for="profileInfo.skill in profileInfo.skills"> -->
              </div>
               <!--  <div  v-if="profileInfo.skills[0]" class="preferedTrades level-item has-text-centered column is-3">
                <p class="title is-6"><strong>Skills</strong></p>
                <b-tag>{{profileInfo.skills[0]}}</b-tag>
                <b-tag v-if="profileInfo.skills[1]">{{profileInfo.skills[1]}}</b-tag>
                <b-tag v-if="profileInfo.skills[2]">{{profileInfo.skills[2]}}</b-tag>
                <!-- <div v-if="profileInfo.skills" v-for="profileInfo.skill in profileInfo.skills"> -->

            </div>
          </div>
        </div>
      </div>
 <nav class="level media follOwNav">
        <p class="subtitle is-6 follOw"> <small>Followers</small><strong class="follOwStrong title is-5"> {{profileInfo.followers}}</strong>
        </p>
        <p class="subtitle is-6 follOw"> <small>Following</small><strong class="follOwStrong title is-5"> {{profileInfo.following}}</strong>
        </p>
        <p class="subtitle is-6 follOw"> <small>Babbles</small><strong class="follOwStrong title is-5"> {{profileInfo.nbBabbles}}</strong>
        </p>
        <p class="subtitle is-6 follOw"> <small>Likes</small><strong class="follOwStrong title is-5"> {{profileInfo.nbOfLikes}}</strong>
        </p>
      </nav>
    </div>
  </div>
</template>
<script>
import { getLeaderboard } from "@/api/apiDashboard";
import { followInsider, unfollowInsider, isFollowed } from "@/api/apiDashboard";
export default {
  data() {
    return {
      followed: "",
      leaderboard: {}
    };
  },
  props: {
    profileInfo: Object,
    connectedUser: Object
  },
  created() {
    const id = this.$route.params.id;
    isFollowed(id).then(followed => {
      this.followed = followed;
    }),
      getLeaderboard(id).then(leaderboard => {
        this.leaderboard = leaderboard;
      });
  },
  methods: {
    editMyProfile() {
      this.$router.push("/mydashboard");
    },
    follow() {
      followInsider(this.profileInfo.userId).then(resp => {
        this.followed = true;
        this.$emit("changeFollow");
      });
    },
    unfollow() {
      unfollowInsider(this.profileInfo.userId).then(resp => {
        this.followed = false;
        this.$emit("changeFollow");
      });
    }
  },
  watch: {
    $route() {
      this.$emit("profileInfo");
      const id = this.$route.params.id;
      getLeaderboard(id).then(leaderboard => {
        this.leaderboard = leaderboard;
      });
    }
  }
};
</script>
<style scoped>
body {
  color: #192b41!important;
}
div {
    font-size: 1REM!important;
}
.rank{
  margin-left:35%!important
}
.is-96x96{
    width: 96px!important;
    height: 96px!important;
    }
.preferedTrades{
      font-size:1rem;
      margin-top:-40px;
    }
.title.is-6{
  margin-bottom:10px;
}
.sock-info {
  width: 15%;
}
.add-to-watchlist{
      display: flex;
    justify-content: flex-end;
    width:25%
}
#perf{
    display: flex;
    justify-content: center;
    margin-left:0px;
    width:40%;
}
#refAndSkills {
  display: flex!important;
  justify-content: space-between!important;
  margin-left:-7%
}
.wonTrade {
  margin-left: 10%;
}
.preferedTrades {
  margin-top: -3%;
  display: flex;
  flex-direction: column;
}
.stock-banner {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0;
  margin-bottom: 5%!important;;
}
.follOwNav {
  justify-content: space-evenly!important;
  border-top: 1px solid #192b41;
}
.follOw {
  display: flex;
  flex-direction: column;
}
.follOwStrong {
  text-align: center;
}
span>a {
  color: #192b41!important;
  cursor: pointer;
  text-decoration: none;
}
.media .media {
    border-top: 3px solid #192b41;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-top: 0.75rem;
}
.pos {
  text-align: center
}
a {
  color: #192b41;
  cursor: inherit;
  text-decoration: none;
}
#cardAction {
  margin-bottom: 2.5% !important;
}
.subtitle {
  margin-top: 0;
  margin-bottom: 0%;
}
#ActionCard {
  width: 100%;
}
.title.is-5 {
  font-size: 1.5REM;
}
#adWLT {
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #fff;
    background-color: #192b41;
    box-shadow: 0 0 0 0.125em #192b41;
    border-color: #192b41;
    font-size:1rem !important
}
#adWLT.is-outlined:focus,
#adWLT.is-outlined:hover {
    background-color: #fff!important;
    border-color: #192b41!important;
    color: #192b41!important;
}
.position {
  display: flex;
  flex-direction: column;
}
@media (max-width: 768px) {
  .rank{
    font-size:0.8rem !important;
    margin-left: 20%!important;
  }
  .sock-info {
  width: 25%;
  }
  .subtitle {
    margin-bottom: 1rem!important
  }
  .add-to-watchlist{
        display: flex;
        justify-content: flex-end
  }
  .stVar{
        text-align:end;
  }
  .card-content {
    padding: 1rem!important;
}
    .title.is-5{
        font-size: 0.8REM !important;
    }
    .location {
        display:none;
    }
    #profile-banner{
        display: flex;
        margin-bottom:10%!important;
    }
    .level-item {
        margin-bottom: 0px!important;
    }
    .stock-price{
        display: flex;
        flex-direction: column
    }
    .media-left {
        display:none;
    }
    .preferedTrades{
      display:none!important;
    }
    .follOwStrong .is-5{
      font-size:12px !important;
    }
    .is-96x96 {
      width: 64px!important;
      height: 64px!important;
    }
    #LB{
      width: 90%;
      margin-left: 9%;
    }
    #adWLT {
      background-color: #192b41;
      border-color: #192b41;
      color: #fff;
      font-weight: bolder;
      font-size: 0.6rem!important;
      PADDING-LEFT: 10PX;
      PADDING-RIGHT: 10PX;
      width: 100%;
    }
}
</style>
