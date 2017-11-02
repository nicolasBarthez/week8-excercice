<template >
<section v-if = "profileInfo" class="section main">
  <div class="column is-6" id="ActionCard">
    <div id="cardAction" class="card profile-card">
      <div class="card-content"id="stockInfo">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64 is-circle">
              <img class ="imgProfile" :src="profileInfo.picProfile" alt="my picture">
            </figure>
          </div>
          <div class="media-content">
            <div class="stock-banner">
             <div class="sock-info">
              <p class="title is-5">
              @{{profileInfo.username}}
            </p>
          <p class="subtitle is-6"><strong>Skills</strong>
            <!-- <div v-if="profileInfo.skills" v-for="profileInfo.skill in profileInfo.skills"> -->

            <b-tag>{{profileInfo.skills[0]}}</b-tag>
          <!-- </div></p> -->
            <p class="subtitle is-6"> <strong>Following</strong> {{profileInfo.following}}
            </p>
            <p class="subtitle is-6"> <strong>Followers</strong> {{profileInfo.followers}}
            </p>
            <p class="subtitle is-6"> <strong>Babbles posted</strong> {{profileInfo.nbBabbles}}
            </p>
            <p class="subtitle is-6"> <strong>Nb of insights won</strong> {{profileInfo.nbOfInsightsWon}}
            </p>
            <p class="subtitle is-6"> <strong>Likes</strong> {{profileInfo.nbOfLikes}}
            </p>
            <button @click="editMyProfile" class="button is-small is-outlined is-primary" type="button" name="button">Update my profile</button>
            </div>
            </div>
          </div>
        </div>
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="is-6 has-text-grey-light"><strong>PERF</strong></p>
              <p class="is-4">
                {{profileInfo.performancePoints}} <strong>P$</strong>
              </p>
              </a>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="is-6 has-text-grey-light"><small>Location</small></p>
              <p class="is-4">
                {{profileInfo.location ? profileInfo.location : "Secret..." }}
              </p>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="is-6 has-text-grey-light">Prefered trades</p>
              <p class="is-4">
              1.   {{profileInfo.preferedStocks[0]? profileInfo.preferedStocks[0].longName  : "-" }} - {{profileInfo.preferedStocks[0]? profileInfo.preferedStocks[0].performancePoints : "-" }}  P$
              </p>
              <p class="is-4">
              2.   {{profileInfo.preferedStocks[1]? profileInfo.preferedStocks[1].longName  : "-" }} - {{profileInfo.preferedStocks[1]? profileInfo.preferedStocks[1].performancePoints : "-" }}  P$
              </p>
              <p class="is-4">
              3.   {{profileInfo.preferedStocks[2]? profileInfo.preferedStocks[2].longName  : "-" }} - {{profileInfo.preferedStocks[2]? profileInfo.preferedStocks[2].performancePoints : "-" }}  P$
              </p>
            </div>
          </div>

          <div class="level-item has-text-centered">

          </div>
        </nav>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  props: {
    profileInfo: Object
  },
  methods: {
    editMyProfile() {
      this.$emit("editprofile");
    }
  }
};
</script>

<style scoped>
.stock-banner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    #adWL{
        width:95%;
        font-size: 1.7vw !important;
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

.stock-banner .subtitle {
    margin-top: 0;
    margin-bottom: 0;
}

#descr {
    margin-top: -1.5rem;
    font-size: 0.7rem;
}

#bullsAndBearsPic {
    width: 40%;
}

#bullsAndBears {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

#bandB {
    justify-content: center;
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

#stockInfo {
    display: flex;
}

#Bbull {
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #21ce99;
    box-shadow: 0 0 0 0.125em #21ce99;
    border-color: #21ce99;
}

#Bbull.is-outlined:focus,
#Bbull.is-outlined:hover {
    background-color: #21ce99;
    border-color: #21ce99;
    color: #fff;
}

.trend-b-b{
  cursor:pointer;
}

#Bbear {
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #ff6026;
    box-shadow: 0 0 0 0.125em #ff6026;
    border-color: #ff6026;
}

#Bbear.is-outlined:focus,
#Bbear.is-outlined:hover {
    background-color: #ff6026;
    border-color: #ff6026;
    color: #fff;
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
