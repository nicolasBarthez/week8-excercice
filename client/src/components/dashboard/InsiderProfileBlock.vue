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
              {{profileInfo.username}}
            </p>
             <p class="subtitle is-6 location">
                  <small>{{profileInfo.location ? profileInfo.location : "Secret..." }}</small>
                </p>
              </div>
             <div id="perf">
                <div>
                  <p class="is-6 has-text-grey-light"><strong class="follOwStrong">Performance</strong></p>
                  <p class="title is-5 follOwStrong">
                    <strong class="follOwStrong"> {{profileInfo.performancePoints}} P$</strong>
                  </p>
                </div>
              <div class="wonTrade"id="follOw">
                  <p class="is-6 has-text-grey-light follOw"><strong class="follOwStrong">Won Trades</strong></p>
                  <p class="title is-5 follOwStrong">
                    <strong class="follOwStrong">{{profileInfo.nbOfInsightsWon}}</strong>
                  </p>
                </div>
              </div>
            <div class="add-to-watchlist" v-if="!($route.params.id===$root.user._id)">
                <button v-if="!followed" @click="follow" id="adWLT" class="button is-small is-outlined is-primary" type="button" name="button">Follow</button>
            <button v-else @click="unfollow" id="adWLT" class="button is-small is-outlined is-primary" type="button" name="button">Unfollow</button>
          </div>
            </div>
             <div id="refAndSkills">
              <div class="preferedTrades level-item has-text-centered column is-3">
                <p class="title is-6">Prefered trades</p>
                <p class="is-4"><router-link v-if="profileInfo.preferedStocks[0]" :to="'/stocks/'+profileInfo.preferedStocks[1].longName"class="stockName is-6" data-replace="Symbol">
                  1. {{profileInfo.preferedStocks[0]? profileInfo.preferedStocks[0].stockId.longName : "-" }} - {{profileInfo.preferedStocks[0]? profileInfo.preferedStocks[0].performancePoints : "-" }} P$
                </router-link></p>
                <p class="is-4"><router-link v-if="profileInfo.preferedStocks[1]" :to="'/stocks/'+profileInfo.preferedStocks[1].longName"class="stockName is-6" data-replace="Symbol">
                  2. {{profileInfo.preferedStocks[1]? profileInfo.preferedStocks[1].stockId.longName : "-" }} - {{profileInfo.preferedStocks[1]? profileInfo.preferedStocks[1].performancePoints : "-" }} P$
                </router-link></p>
                <p class="is-4"><router-link v-if="profileInfo.preferedStocks[2]" :to="'/stocks/'+profileInfo.preferedStocks[1].longName"class="stockName is-6" data-replace="Symbol">
                  3. {{profileInfo.preferedStocks[2]? profileInfo.preferedStocks[2].stockId.longName : "-" }} - {{profileInfo.preferedStocks[2]? profileInfo.preferedStocks[2].performancePoints : "-" }} P$
                </router-link></p>
              </div>
               <nav v-if="!leaderboard" id="LB" class="level media">
                <figure class="image is-96x96 is-circle" >
                  <img class="imgProfile" :src="leaderboard.index===-1 ? profileInfo.picProfile:leaderboard.rankingByPoints[leaderboard.index-1].picProfile" alt="my picture">
                  <span class="subtitle is-6">
                                        {{leaderboard.index===-1 ? 0 :leaderboard.rankingByPoints[leaderboard.index-1].performancePoints}} <small>P$</small>
                                        </span>
                </figure>
                <figure class="image is-96x96 is-circle centralPic">
                  <img class="imgProfile":src="leaderboard.index===-1 ? leaderboard.rankingByPoints[0].picProfile:leaderboard.rankingByPoints[leaderboard.index].picProfile" alt="my picture">
                  <span class="subtitle is-6">
                                        {{leaderboard.index===-1 ? leaderboard.rankingByPoints[0].performancePoints :leaderboard.rankingByPoints[leaderboard.index].performancePoints}} <small>P$</small>
                                        </span>
                </figure>
                <figure class="image is-96x96 is-circle">
                  <img class="imgProfile" v-if="leaderboard.rankingByPoints[leaderboard.index+1]" :src="leaderboard.index===-1 ? leaderboard.rankingByPoints[1].picProfile:leaderboard.rankingByPoints[leaderboard.index+1].picProfile" alt="my picture">
                  <span v-if="leaderboard.rankingByPoints[leaderboard.index+1]" class="subtitle is-6">
                                        {{leaderboard.index===-1 ? leaderboard.rankingByPoints[1].performancePoints :leaderboard.rankingByPoints[leaderboard.index+1].performancePoints}} <small>P$</small>
                                    </span>
                </figure>
              </nav>

              <div  class="preferedTrades level-item has-text-centered column is-3">
                <p class="title is-6"><strong>Skills</strong></p>
                <div   class="preferedTrades level-item has-text-centered column is-3" v-if="profileInfo.skills">
                <b-tag class="is-4">{{profileInfo.skills[0]}}</b-tag>
                <b-tag class="is-4" v-if="profileInfo.skills[1]">{{profileInfo.skills[1]}}</b-tag>
                <b-tag class="is-4" v-if="profileInfo.skills[2]">{{profileInfo.skills[2]}}</b-tag>
                </div>
                <div v-else >No special skills for this Insiders !</div>
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
        <p class="subtitle is-6 follOw"> <small>Following</small><strong class="follOwStrong title is-5"> {{profileInfo.following}}</strong>
        </p>
        <p class="subtitle is-6 follOw"> <small>Followers</small><strong class="follOwStrong title is-5"> {{profileInfo.followers}}</strong>
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
    profileInfo: Object
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
  }
};
</script>
<style scoped>
body {
  color: #192b41!important;
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
  width: 20%;
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
#perf {
  display: flex;
  width: 30%;
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
.stock-banner {
  margin-top: 0;
  margin-bottom: 5%!important;
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
#adWLT.is-outlined:focus,
#adWLT.is-outlined:hover {
  PADDING-LEFT: 30PX;
  PADDING-RIGHT: 30PX;
  font-weight: bolder;
  color: #fff;
  box-shadow: 0 0 0 0.125em #192b41;
  border-color: #192b41;
}
#adWLT {
  background-color: #192b41;
  border-color: #192b41;
  color: #fff;
  PADDING-LEFT: 30PX;
  PADDING-RIGHT: 30PX;
  font-weight: bolder;
  font-size: 1vw;
}
.position {
  display: flex;
  flex-direction: column;
}
@media (max-width: 768px) {
    .stVar{
        text-align:end;
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
        display:none;}

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
    #follOw{
      display:none
    }
    #adWLT {
  background-color: #192b41;
  border-color: #192b41;
  color: #fff;
  font-weight: bolder;
  font-size: 0.4rem;
  PADDING-LEFT: 0PX;
  PADDING-RIGHT: 0PX;
}
}
</style>