<template >
  <div v-if="profileInfo "  class="column is-3" id="ActionCard">
    <div id="cardAction" class="card profile-card">
      <div class="card-content">
        <div class="media" id="stockInfo">
          <div class="media-left">
            <figure class="image is-64x64 is-circle">
              <img class="imgProfile" :src="profileInfo.picProfile" alt="my picture">
            </figure>
          </div>
          <div class="media-content">
            <div class="stock-banner">
              <div class="sock-info">
                <p class="title is-5">
                  @{{profileInfo.username}}
                </p>
                <p class="subtitle is-6">
                  <small>{{profileInfo.location ? profileInfo.location : "Secret..." }}</small>
                </p>
              </div>
              <div id="perf">
                <div>
                  <p class="is-6 has-text-grey-light follOw"><strong class="follOwStrong">Performance</strong></p>
                  <p class="title is-5 follOwStrong">
                    <strong class="follOwStrong"> {{profileInfo.performancePoints}} P$</strong>
                  </p>
                </div>
                <div class="wonTrade">
                  <p class="is-6 has-text-grey-light follOw"><strong class="follOwStrong">Won Trades</strong></p>
                  <p class="title is-5 follOwStrong">
                    <strong class="follOwStrong">{{profileInfo.nbOfInsightsWon}}</strong>
                  </p>
                </div>
              </div>
              <div class="add-to-watchlist">
                <button @click="editMyProfile" id="adWLT" class="button is-small is-outlined is-primary" type="button" name="button">Update my profile</button>
              </div>
            </div>
            <div id="refAndSkills">
              <div class="preferedTrades level-item has-text-centered column is-3">
                <p class="title is-6">Prefered trades</p>
                <p class="is-4">
                  1. {{profileInfo.preferedStocks[0]? profileInfo.preferedStocks[0].longName : "-" }} - {{profileInfo.preferedStocks[0]? profileInfo.preferedStocks[0].performancePoints : "-" }} P$
                </p>
                <p class="is-4">
                  2. {{profileInfo.preferedStocks[1]? profileInfo.preferedStocks[1].longName : "-" }} - {{profileInfo.preferedStocks[1]? profileInfo.preferedStocks[1].performancePoints : "-" }} P$
                </p>
                <p class="is-4">
                  3. {{profileInfo.preferedStocks[2]? profileInfo.preferedStocks[2].longName : "-" }} - {{profileInfo.preferedStocks[2]? profileInfo.preferedStocks[2].performancePoints : "-" }} P$
                </p>
              </div>

              <nav id="bandB" class="level media">
                <figure class="image is-64x64 is-circle">
                  <img class="imgProfile" :src="leaderboard.index===-1 ? profileInfo.picProfile:leaderboard.rankingByPoints[leaderboard.index-1].picProfile" alt="my picture">
                  <span class="subtitle is-6">
                                        {{leaderboard.index===-1 ? 0 :leaderboard.rankingByPoints[leaderboard.index-1].performancePoints}} <small>P$</small>
                                        </span>
                </figure>
                <figure class="centralPic image is-64x64 is-circle">
                  <img class="imgProfile" :src="leaderboard.index===-1 ? leaderboard.rankingByPoints[0].picProfile:leaderboard.rankingByPoints[leaderboard.index].picProfile" alt="my picture">
                  <span class="subtitle is-6">
                                        {{leaderboard.index===-1 ? leaderboard.rankingByPoints[0].performancePoints :leaderboard.rankingByPoints[leaderboard.index].performancePoints}} <small>P$</small>
                                        </span>
                </figure>
                <figure class="image is-64x64 is-circle">
                  <img v-if="leaderboard.rankingByPoints[leaderboard.index+1]" class="imgProfile" :src="leaderboard.index===-1 ? leaderboard.rankingByPoints[1].picProfile:leaderboard.rankingByPoints[leaderboard.index+1].picProfile" alt="my picture">
                  <span v-if="leaderboard.rankingByPoints[leaderboard.index+1]" class="subtitle is-6">
                                        {{leaderboard.index===-1 ? leaderboard.rankingByPoints[1].performancePoints :leaderboard.rankingByPoints[leaderboard.index+1].performancePoints}} <small>P$</small>
                                    </span>
                </figure>
              </nav>
              <div  v-if="profileInfo.skills[0]" class="preferedTrades level-item has-text-centered column is-3">
                <p class="title is-6"><strong>Skills</strong></p>
                <b-tag>{{profileInfo.skills[0]}}</b-tag>
                <b-tag v-if="profileInfo.skills[1]">{{profileInfo.skills[1]}}</b-tag>
                <b-tag v-if="profileInfo.skills[2]">{{profileInfo.skills[2]}}</b-tag>
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
    profileInfo: Object
  },
  methods: {
    editMyProfile() {
      this.$emit("editprofile");
    }
  },
  created() {
    console.log("UESRID OF =>", this.$root.user._id);
    getLeaderboard(this.$root.user._id).then(leaderboard => {
      this.leaderboard = leaderboard;
    });
  }
};
</script>

<style scoped>
@media (max-width: 768px) {
    .stVar{
        text-align:end;
    }
    .longNameTitle{
        font-size: 0.8REM !important;
    }

    .stock-banner{
        display: flex;
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
    .subtitle {
        display:none;
    }
    .preferedTrades{
      font-size:10px;
      margin-top:-40px;
    }
    .follOwStrong .is-5{
      font-size:12px !important;
    }
    #bandB{
      display: initial !important
    }

}
body {
  color: #192b41;
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
  border-top: 1px solid rgba(219, 219, 219, 0.5)
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
    border-top: 3px solid #21ce99;
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
</style>
