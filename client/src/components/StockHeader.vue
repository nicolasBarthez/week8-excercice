<template>
<section>
    <div class="column is-6" id="ActionCard">
        <div id="cardAction" class="card profile-card">
            <div class="card-content">
                <div class="media" id="stockInfo">
                   <div class="media-left">
                       <figure class="image is-64x64 is-circle">
                         <img class ="imgProfile" :src="stock.stockImg" alt="stockImg">
                       </figure>
                   </div>
                   <div class="media-content">
                        <div class="stock-banner">
                           <div class="sock-info">
                              <p class="longNameTitle title is-5">{{stock.longName}}</p>
                              <p class="subtitle is-6">
                                <a class="">{{stock.isin}}</a>
                                <a class="">{{stock.shortName}}</a>
                              </p>
                              <p class="stock-see-desc is-6 has-text-grey-light">See description</p>
                            </div>
                            <div class="add-to-watchlist" >
                               <button v-if="!watchItem" id="adWL" @click="addWatchList()" class="button is-small is-outlined is-primary">Add to watchlist</button>
                               <button v-else-if="watchItem.position ==='none'" id="adWL" @click="removeWatchList()" class="button is-small is-outlined is-primary">Remove</button>
                               <p class="position" v-else>
                                <button id="adWL" @click="closePosition()"class="button is-small is-outlined is-primary">Close Position</button>
                                 <strong class="pos" :class="{'has-text-green' : watchItem.position==='bull', 'has-text-red' : watchItem.position==='bear'}">
                                      {{watchItem.position}} @ {{watchItem.initialPrice}}</strong>
                              </p>
                            </div>
                            <div class="stock-price title is-5">
                               <strong class="">{{stock.price}} €</strong>
                               <small class="stVar":class="{'has-text-green' : stock.variation > 0, 'has-text-red' : stock.variation<0}">&nbsp;{{stock.variation}} %</small>
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
                                    <a @click="trend1()" :class="{'has-text-green':activeItem ==='one',' has-text-grey-light':activeItem!='one' }" class="is-6 trend-b-b"><small >Last 24 hours</small></a>
                                </div>
                                 &nbsp &nbsp <small class="is-6 has-text-grey-light trend-b-b">|</small> &nbsp &nbsp
                                <div class="level-item has-text-centered">
                                    <a @click="trend7()"class="is-6 trend-b-b" :class="{'has-text-green':activeItem ==='seven',' has-text-grey-light':activeItem!='seven'}"><small >Last week</small></a>
                                </div>
                                 &nbsp &nbsp <small class="is-6 has-text-grey-light trend-b-b">|</small> &nbsp &nbsp
                                <div class="level-item has-text-centered">
                                    <a @click="trend30()"class="is-6 trend-b-b" :class="{'has-text-green':activeItem ==='thirty',' has-text-grey-light':activeItem!='thirty'}"><small >Last month</small></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
</section>
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
    watchItem: Object,
    trendBullBear: Array
  },
  data() {
    return {
         activeItem: 'thirty'
    };
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
      const inWatchList = this.watchItem ? this.watchItem._id : undefined;
      beBull(this.stock.longName, inWatchList).then(item => {
        this.$emit("changeWatchlist", item);
      });
    },

    imBear() {
      const inWatchList = this.watchItem ? this.watchItem._id : undefined;
      beBear(this.stock.longName, inWatchList).then(item => {
        this.$emit("changeWatchlist", item);
      });
    },

    trend30() {
      this.$emit("changeWatchlist");
      this.activeItem = "thirty"
    },

    trend7() {
      this.$emit("trendBullBearSeven");
      this.activeItem = "seven"
    },

    trend1() {
      this.$emit("trendBullBearOne");
      this.activeItem = "one"
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
.longNameTitle{
    margin-bottom:0px !important
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
