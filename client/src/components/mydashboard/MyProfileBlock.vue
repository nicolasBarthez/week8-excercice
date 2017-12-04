<template >
  <div v-if="profileInfo && connectedUser "  class="column is-3" id="ActionCard">
    <div id="cardAction" class="card profile-card">
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
                  <p class="is-6 has-text-grey-light"><strong class="follOwStrong">{{connectedUser.lang ==="EN"? "Performance":"Performance"}}</strong></p>
                  <p class="title is-5 follOwStrong">
                    <strong class="follOwStrong"> {{profileInfo.performancePoints.toFixed(0) }}  &nbsp P$</strong></p>
                </div>
                <div class="wonTrade"id="follOw">
                  <p class="is-6 has-text-grey-light follOw"><strong class="follOwStrong">{{connectedUser.lang ==="EN"? "Won Trades":"Trades gagnants"}}</strong></p>
                  <p class="title is-5 follOwStrong">
                    <strong class="follOwStrong" :class="{'has-text-green' :profileInfo.performancePoints.toFixed(0)>0, 'has-text-red' : profileInfo.performancePoints.toFixed(0)<0}">{{profileInfo.nbOfInsightsWon}}</strong>
                  </p>
                </div>
              </div>
              <div class="add-to-watchlist">
                <button @click="editMyProfile" id="adWLT" class="button is-small is-outlined is-primary" type="button" name="button">{{connectedUser.lang ==="EN"? "Update my profile":"Mettre à jour mon profil"}}</button>
              </div>
            </div>
            <div id="refAndSkills">
              <div class="preferedTrades level-item has-text-centered column is-3">
                <p class="title is-6">{{connectedUser.lang ==="EN"? "Prefered trades":"Positions préférées"}}</p>
                <p class="is-4"><router-link v-if="profileInfo.preferedStocks[0]" :to="'/stocks/'+profileInfo.preferedStocks[0].shortName"class="stockName is-6" data-replace="Symbol">
                  1. {{profileInfo.preferedStocks[0]? profileInfo.preferedStocks[0].longName : "-" }}</router-link> - {{profileInfo.preferedStocks[0]? profileInfo.preferedStocks[0].performancePoints.toFixed(0) : "-" }} P$</p>
                <p class="is-4"><router-link v-if="profileInfo.preferedStocks[1]" :to="'/stocks/'+profileInfo.preferedStocks[1].shortName"class="stockName is-6" data-replace="Symbol">
                  2. {{profileInfo.preferedStocks[1]? profileInfo.preferedStocks[1].longName : "-" }}</router-link> - {{profileInfo.preferedStocks[1]? profileInfo.preferedStocks[1].performancePoints.toFixed(0) : "-" }} P$</p>
                <p class="is-4"><router-link v-if="profileInfo.preferedStocks[2]" :to="'/stocks/'+profileInfo.preferedStocks[2].shortName"class="stockName is-6" data-replace="Symbol">
                  3. {{profileInfo.preferedStocks[2]? profileInfo.preferedStocks[2].longName : "-" }}</router-link> - {{profileInfo.preferedStocks[2]? profileInfo.preferedStocks[2].performancePoints.toFixed(0) : "-" }} P$</p>
              </div>

              <nav id="LB" class="level media">
                <figure v-if="leaderboard.rankingByPoints[leaderboard.index-1]"class="image is-96x96 is-circle" >
                  <router-link :to="leaderboard.index===-1 ? '/dashboard/'+profileInfo.userId:'/dashboard/'+leaderboard.rankingByPoints[leaderboard.index-1].userId"><img class="imgProfile" :src="leaderboard.index===-1 ? profileInfo.picProfile:leaderboard.rankingByPoints[leaderboard.index-1].picProfile" alt="my picture"></router-link>
                  <span class="rank subtitle is-6">
                                        {{leaderboard.index===-1 ? 0 :leaderboard.rankingByPoints[leaderboard.index-1].performancePoints.toFixed(0) }} P$
                                        </span>
                </figure>
                <figure v-if="leaderboard.rankingByPoints[0]" class="image is-96x96 is-circle centralPic">
                  <router-link :to="leaderboard.index===-1 ? '/dashboard/'+leaderboard.rankingByPoints[0].userId:'/dashboard/'+leaderboard.rankingByPoints[leaderboard.index].userId"><img class="imgProfile":src="leaderboard.index===-1 ? leaderboard.rankingByPoints[0].picProfile:leaderboard.rankingByPoints[leaderboard.index].picProfile" alt="my picture"></router-link>
                  <span class="rank subtitle is-6">
                                        {{leaderboard.index===-1 ? leaderboard.rankingByPoints[0].performancePoints.toFixed(0)  :leaderboard.rankingByPoints[leaderboard.index].performancePoints.toFixed(0) }} P$
                                        </span>
                </figure>
                <figure v-if="leaderboard.rankingByPoints[leaderboard.index+1]" class="image is-96x96 is-circle">
                  <router-link  :to="leaderboard.index===-1 ? '/dashboard/'+leaderboard.rankingByPoints[1].userId:'/dashboard/'+leaderboard.rankingByPoints[leaderboard.index+1].userId"><img class="imgProfile" :src="leaderboard.index===-1 ? leaderboard.rankingByPoints[1].picProfile:leaderboard.rankingByPoints[leaderboard.index+1].picProfile" alt="my picture"></router-link>
                  <span class="rank subtitle is-6">
                                        {{leaderboard.index===-1 ? leaderboard.rankingByPoints[1].performancePoints.toFixed(0)  :leaderboard.rankingByPoints[leaderboard.index+1].performancePoints.toFixed(0) }} P$
                                    </span>
                </figure>
              </nav>
              <div  class="preferedTrades level-item has-text-centered column is-3">
                <p class="title is-6"><strong>{{connectedUser.lang ==="EN"? "Skills":"Expertise"}}</strong></p>
                <div   class="preferedTrades level-item has-text-centered column is-3" v-if="profileInfo.skills[0]">
                <b-tag class="is-4">{{profileInfo.skills[0]}}</b-tag>
                <b-tag class="is-4" v-if="profileInfo.skills[1]">{{profileInfo.skills[1]}}</b-tag>
                <b-tag class="is-4" v-if="profileInfo.skills[2]">{{profileInfo.skills[2]}}</b-tag>
                </div>
                <div v-else >{{connectedUser.lang ==="EN"? "Update your profile to display your skills!":"Mettez à jour votre profil et affichez vos domaines d'expertise !"}}</div>
                <!-- <div v-if="profileInfo.skills" v-for="profileInfo.skill in profileInfo.skills"> -->
              </div>
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
export default {
  data() {
    return {
      leaderboard: {}
    };
  },
  props: {
    profileInfo: Object,
    connectedUser: Object
  },
  methods: {
    editMyProfile() {
      this.$emit("editprofile");
    }
  },
  created() {
    getLeaderboard(this.$root.user._id).then(leaderboard => {
      this.leaderboard = leaderboard;
    });
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
    font-size:0.8rem !important;
    margin-left: 20%!important;
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
.sock-info{
    width:15%
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
  margin-bottom: 5%!important;
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
  display: flex;
  justify-content: center;
  align-items: center;
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
   .sock-info {
  width: 25%;
}
   #follOw{
     display:none
   }
    .icon{
        height: 1rem;
        width: 1rem;
    }
    .add-to-watchlist{
        display: flex;
        justify-content: flex-end
    }
    .stVar{
        text-align:end;
    }
    .title.is-5{
        font-size: 0.8REM !important;
    }
    .location {
    display:none
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
      font-size: 0.4rem;
      PADDING-LEFT: 0PX;
      PADDING-RIGHT: 0PX;
    }
    .subtitle {
    margin-bottom: 0.5rem!important
    }
    .card-content {
    padding: 1rem!important;
  }
}
</style>
