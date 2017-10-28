<template>
    <div class="column is-6" id="ActionCard">

        <div id="cardAction" class="card profile-card">
            <div class="card-content">
                <div class="media" id="stockInfo">
                   <div class="media-left">
                       <figure class="image is-64x64 is-circle">
                         <img :src="stock.stockImg" alt="">
                       </figure>
                   </div>
                   <div class="media-content">
                        <div class="stock-banner">
                           <div class="sock-info">
                              <p class="title is-5">{{stock.longName}}</p>
                              <p class="subtitle is-6">
                                <a class="">{{stock.isin}}</a>
                                <a class="">{{stock.shortName}}</a>
                              </p>
                              <p class="stock-see-desc is-6 has-text-grey-light">See description</p>
                            </div>
                            <div class="add-to-watchlist" >
                               <button v-if="!watchItem" id="adWL" @click="addWatchList()" class="button is-small is-outlined is-primary">Add to Watchlist</button>
                               <button v-else-if="watchItem.position ==='none'" id="adWL" @click="removeWatchList()" class="button is-small is-outlined is-primary">Remove from Watchlist</button>
                               <p class="position" v-else>
                                <button id="adWL" @click="closePosition()"class="button is-small is-outlined is-primary">Close Position</button>
                                 <span> You're {{watchItem.position}} from {{watchItem.initialPrice}}</span>
                              </p>
                            </div>
                            <div class="stock-price title is-5">
                               <strong class="">{{stock.price}} €</strong>
                               <small class="">&nbsp;{{stock.variation}} %</small>
                           </div>
                        </div>
                           <nav id="bandB" class="level media">
                               <div id="bullsAndBears">
                                    <div v-if="!watchItem || watchItem.position==='none'" id="BBull">
                                        <button id="Bbull" @click="imBull()" class="button is-small is-outlined is-primary">Be Bull</button>
                                    </div>
                                    <span id="bandbdigit1">{{trendBullBear[0]}}  %</span>
                                    <div id="bullsAndBearsPic">
                                        <img src="/static/images/bulls-and-bears.png" alt="bull and bear">
                                    </div>
                                    <span id="bandbdigit2">{{trendBullBear[1]}}  %</span>
                                    <div v-if="!watchItem ||watchItem.position==='none'" id="BBear">
                                        <button id="Bbear" @click="imBear()"  class="button is-small is-outlined is-primary">Be Bear</button>
                                    </div>
                                </div>
                            </nav>
                            <div id='Last'>
                                <div class="level-item has-text-centered">
                                    <a @click="trend1()" class="is-6 has-text-grey-light trend-b-b"><small >Last 24 hours</small> &nbsp &nbsp <small>|</small> &nbsp &nbsp</a>
                                </div>
                                <div class="level-item has-text-centered">
                                    <a @click="trend7()" class="is-6 has-text-grey-light trend-b-b"><small >Last week</small> &nbsp &nbsp <small>|</small> &nbsp &nbsp</a>
                                </div>
                                <div class="level-item has-text-centered">
                                    <a @click="trend30()" class="is-6 has-text-grey-light trend-b-b"><small >Last month</small></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
</template>

<script>
import { addWatchItem } from "@/api/api";
import { removeWatchItem } from "@/api/api";
import { beBear } from "@/api/api";
import { beBull } from "@/api/api";
import { removePosition } from "@/api/api";
import { getTrend } from "@/api/api";

export default {
  name: "StockHeader",
  props: {
    stock: Object,
    watchItem: Object
  },
  data() {
    return { trendBullBear: [50, 50] };
  },
  methods: {
    addWatchList() {
      addWatchItem(this.stock.longName)
        .then(item => {
          this.$emit("changeWatchlist", item);
        })
        .catch(err => {
          console.log("something is wrong");
        });
    },

    removeWatchList() {
      removeWatchItem(this.stock.longName, this.watchItem._id).then(() => {
        this.$emit("changeWatchlist", null);
      });
    },

    closePosition() {
      removePosition(this.stock.longName, this.watchItem._id).then(() => {
        this.$emit("changeWatchlist", null);
      });
    },

    imBull() {
      beBull(this.stock.longName).then(item => {
        this.$emit("changeWatchlist", item);
      });
    },

    imBear() {
      beBear(this.stock.longName).then(item => {
        this.$emit("changeWatchlist", item);
      });
    },
    trend30() {
      getTrend(this.stock.longName, 30).then(trendBullBear => {
        this.item = trendBullBear;
      });
    },
    trend7() {
      getTrend(this.stock.longName, 7).then(trendBullBear => {
        this.item = trendBullBear;
      });
    },
    trend1() {
      getTrend(this.stock.longName, 1).then(trendBullBear => {
        this.item = trendBullBear;
      });
    }
  },
  created() {
    getTrend(this.stock.longName, 30).then(trendBullBear => {
      this.trendBullBear = trendBullBear;
    });
  }
};
</script>

<style>
.stock-banner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

@media (max-width: 768px) {
    .stock-banner {
        flex-direction: column;
    }
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
