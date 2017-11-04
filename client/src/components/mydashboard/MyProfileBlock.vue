<template >
<section >
  <div class="column is-6" id="ActionCard">
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
                                    <button @click="editMyProfile" id="adWLT"class="button is-small is-outlined is-primary" type="button" name="button">Update my profile</button>
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

                                <nav v-if="leaderboard.rankingByPoints" id="bandB" class="level media">
                                    <figure class="image is-64x64 is-circle">
                                        <img class="imgProfile" :src="leaderboard.index === -1 ? profileInfo.picProfile:rankingByPoints[leaderboard.index-1].picProfile" alt="my picture">
                                        <span class="subtitle is-6">
                                        {{leaderboard.index === -1 ? profileInfo.performancePoints:leaderboard.rankingByPoints[leaderboard.index-1].performancePoints}} <small>P$</small>
                                        </span>
                                    </figure>
                                    <figure class="centralPic image is-64x64 is-circle">
                                        <img class="imgProfile" :src="leaderboard.rankingByPoints.index === -1 ? leaderboard.rankingByPoints[O].picProfile:leaderboard.rankingByPoints[leaderboard.index].picProfile" alt="my picture">
                                        <span class="subtitle is-6">
                                        {{leaderboard.index === -1 ? leaderboard.rankingByPoints[O].performancePoints:leaderboard.rankingByPoints[leaderboard.index].performancePoints}} <small>P$</small>
                                        </span>
                                    </figure>
                                    <figure class="image is-64x64 is-circle">
                                        <img class="imgProfile" :src="leaderboard.rankingByPoints.index === -1 ? leaderboard.rankingByPoints[O].picProfile:leaderboard.rankingByPoints[leaderboard.index+1].picProfile" alt="my picture">
                                    <span class="subtitle is-6">
                                        {{leaderboard.rankingByPoints.performancePoints === -1 ? leaderboard.rankingByPoints[1].performancePoints:leaderboard.rankingByPoints[leaderboard.index+1].performancePoints}} <small>P$</small>
                                    </span>
                                    </figure>
                                </nav>
                                <div class="preferedTrades level-item has-text-centered column is-3">
                                    <p class="title is-6"><strong>Skills</strong></p>
                                    <b-tag>{{profileInfo.skills[0]}}</b-tag>
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
                <p class="subtitle is-6 follOw"> <small>Babbles posted</small><strong class="follOwStrong title is-5"> {{profileInfo.nbBabbles}}</strong>
                </p>

                <p class="subtitle is-6 follOw"> <small>Likes</small><strong class="follOwStrong title is-5"> {{profileInfo.nbOfLikes}}</strong>
                </p>
            </nav>
            </div>
        </div>
    </section>
</template>

<script>
import { getLeaderboard } from "@/api/apiDashboard";
export default {
  data() {
    return { leaderboard: Object };
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
    getLeaderboard(this.$route._id).then(leaderboard => {
      this.leaderboard = leaderboard;
    });
  }
};
</script>

<style scoped>
body{
    color:#192b41;
}

.sock-info {
    width:20%;
}

#refAndSkills{
    display: flex!important;
    justify-content: space-evenly!important;
}
.wonTrade{
    margin-left: 10%;
}

.preferedTrades{
 margin-top:-3%;
 display:flex;
  flex-direction:column;
}

.stock-banner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.follOwNav{
  justify-content: space-evenly!important;
  border-top:1px solid rgba(219, 219, 219, 0.5)
}
.follOw{
  display:flex;
  flex-direction: column;
}
.follOwStrong{
text-align: center;
}
#perf{
  display:flex;
  width:30%;
}
span>a {
    color: #192b41!important;
    cursor: pointer;
    text-decoration: none;
}

@media (max-width: 768px) {
    .stVar{
        text-align:end;
    }
    .longNameTitle{
        font-size: 1REM !important;
    }
    #bullsAndBears{
        justify-content: space-evenly !important;
        width:100%
    }
    .stock-banner{
        display: flex;
    }
    .level-item {
        margin-bottom: 0px!important;
    }
    #bandbdigit1{
        width:40%;
        font-size:3.5vw!important
    }
     #bandbdigit2{
         width:40%;
        font-size:3.5vw!important;
        text-align:right;
        padding-right:2%;
    }
    .stock-price{
        display: flex;
        flex-direction: column
    }
    .media-left {
        display:none;
    }
    .stock-see-desc{
        display:none;
    }
    .subtitle {
        display:none;
    }
    #bullsAndBearsPic{
        width:20%;
    }
    #BBull{
        width:20%
    }
    #BBear{
        width:20%
    }
    #Bbull{
        width:80%
    }
    #Bbear{
        width:80%
    }
    .add-to-watchlist{
        width:20%
    }
    #adWLT{
        width:95%;
        font-size: 1vw !important;
    }

}
.pos{
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
.subtitle{
  margin-top: 0;
    margin-bottom: 0%;
}

#descr {
    margin-top: -1.5rem;
    font-size: 0.7rem;
}

#bullsAndBearsPic {
    width: 40%;
}
.centralPic{
    margin-left: 5%;
    margin-right: 5%;
}
#bullsAndBears {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

#bandB {
    justify-content: center;
        WIDTH: 50%;
}

#Last {
    display: flex;
    justify-content: center;
}

#bandbdigit1 {
    font-size: 2.5vw;
    color: #21ce99;
}

#bandbdigit2 {
    font-size: 2.5vw;
    color: #ff6026;
}

#priceStock {
    display: flex;
    font-size: 2REM;
    align-items: center;
}

#ActionCard {
    width: 100%;
   }

.title.is-5 {
    font-size: 1.5REM;
}
#adWL.is-outlined:focus,
#adWL.is-outlined:hover {
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #fff;
    box-shadow: 0 0 0 0.125em #192b41;
    border-color: #192b41;
}

#adWL {
    background-color: #192b41;
    border-color: #192b41;
    color: #fff;
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    font-size: 1.2vw;
}

.position{
    display:flex;
    flex-direction: column;
}
</style>
