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
                              <p @click="descriptionStock" class="stock-see-desc is-6 has-text-grey-light">More info...</p>
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
                                <div class="stock-priceVar title is-5">
                               <strong class="stVar">{{stock.price}} {{stock.currency}}</strong>
                               <small class="stVar":class="{'has-text-green' : stock.variation > 0, 'has-text-red' : stock.variation<0}">&nbsp &nbsp {{stock.variation}} %</small>
                                </div>
                                <div v-if="stock.isin==='Cryptocurrency'"  class="stock-priceVar title is-5">
                                <strong class="stVar">{{stock.price2}} {{stock.currency2}}</strong>
                                </div>
                                    <span class="icon chartIcon">
                                         <i @click="ChartStock" class="fa fa-line-chart">&nbsp see chart</i>
                                    </span>

                           </div>
                        </div>
                           <nav id="bandB" class="level media">
                               <div id="bullsAndBears">
                                    <div v-if="!watchItem || watchItem.position==='none'" id="BBull">
                                        <button id="Bbull" @click="imBull()" class="button is-small is-outlined is-primary">Be Bull</button>
                                    </div>
                                    <span id="bandbdigit1">{{trendBullBear[0]}}  %</span>
                                    <div id="bullsAndBearsPic">
                                        <img src="/static/images/bull-bear-arrow.png" alt="bull and bear">
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
                                &nbsp &nbsp <small class="is-6 has-text-grey-light trend-b-b">|</small> &nbsp &nbsp</div>

                                <div class="level-item has-text-centered">
                                    <a @click="trend7()"class="is-6 trend-b-b" :class="{'has-text-green':activeItem ==='seven',' has-text-grey-light':activeItem!='seven'}"><small >Last week</small></a>
                                 &nbsp &nbsp <small class="is-6 has-text-grey-light trend-b-b">|</small> &nbsp &nbsp</div>

                                <div class="level-item has-text-centered">
                                    <a @click="trend30()"class="is-6 trend-b-b" :class="{'has-text-green':activeItem ==='thirty',' has-text-grey-light':activeItem!='thirty'}"><small >Last month</small></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <b-modal :active.sync="isChartStockActive" :width="640">
          <chart-stock :stock="stock"></chart-stock>
        </b-modal>
        <b-modal :active.sync="isStockDescriptionModalActive">
            <div class="mediaModal">
                <nav id="bandB" class="level media">
                  <div id="bullsAndBearsPic">
                      <img src="/static/images/logoeuronext.png" alt="stock image">
                  </div>
                    <h1 class="modalTitle">
                        More info about {{stock.longName}} !
                    </h1>

                </nav>
                <div id="bullsAndBears2">
                    <div id="stock-desc" class="div is-outlined  ">{{stock.description}}</div>

                    <button id="close-desc" @click="isStockDescriptionModalActive = false"  class="button is-small is-outlined is-primary">Close</button>
                </div>
            </div>
        </b-modal>
            </div>
       </div>
</section>
</template>


<script>
import ChartStock from "@/components/ChartStock";
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
      activeItem: "thirty",
      isChartStockActive: false,
      isStockDescriptionModalActive: false
    };
  },
  components: {
    ChartStock
  },
  methods: {
    ChartStock() {
      this.isChartStockActive = true;
    },

    descriptionStock() {
      this.isStockDescriptionModalActive = true;
    },

    addWatchList() {
      addWatchItem(this.stock.shortName)
        .then(item => {
          this.$emit("changeWatchlist", item);
        })
        .catch(err => {
          console.log("something is wrong");
        });
    },

    removeWatchList() {
      removeWatchItem(this.stock.shortName, this.watchItem._id).then(() => {
        this.$emit("changeWatchlist", null);
      });
    },

    closePosition() {
      removePosition(this.stock.shortName, this.watchItem._id).then(() => {
        this.$emit("changeWatchlist", null);
      });
    },

    imBull() {
      const inWatchList = this.watchItem ? this.watchItem._id : undefined;
      beBull(this.stock.shortName, inWatchList).then(item => {
        this.$emit("changeWatchlist", item);
      });
    },

    imBear() {
      const inWatchList = this.watchItem ? this.watchItem._id : undefined;
      beBear(this.stock.shortName, inWatchList).then(item => {
        this.$emit("changeWatchlist", item);
      });
    },

    trend30() {
      this.$emit("changeWatchlist");
      this.activeItem = "thirty";
    },

    trend7() {
      this.$emit("trendBullBearSeven");
      this.activeItem = "seven";
    },

    trend1() {
      this.$emit("trendBullBearOne");
      this.activeItem = "one";
    }
  }
};
</script>

<style scoped>
.title, .subtitle {
    word-break: initial;
}
.stock-banner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.stock-price{
    font-size:1.3rem;
    display: flex;
    flex-direction:column;
    width: 25%
}
 .chartIcon{
     width:100%;
     justify-content:flex-end;
     margin-top: 5%!important;
 }
 .fa-line-chart{
     font-size:0.85REM;
     font-weight:bold;
     cursor:pointer
 }
 .sock-info{
    width:25%
}
.stock-priceVar{
     font-size:1.3rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 2% !important;
}
.add-to-watchlist{
    display: flex;
    justify-content: center;
    margin-left:0px;
    width:40%;
}
.position{
    width:100%;
    display: flex;
    align-items: center;
}

.longNameTitle{
    margin-bottom:12% !important
}
.pos{
    text-align: center;
    width:100%;
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
    width: 20%;
}

#bullsAndBears {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width:100%!important
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
    font-size:1vw
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
    font-size:1vw
}

#Bbear.is-outlined:focus,
#Bbear.is-outlined:hover {
    background-color: #ff6026;
    border-color: #ff6026;
    color: #fff;
}

#adWL.is-outlined:focus,
#adWL.is-outlined:hover {
    background-color: #192b41;
    border-color: #192b41;
    color: #fff;

}

#adWL {
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #192b41;
    box-shadow: 0 0 0 0.125em #192b41;
    border-color: #192b41;
    font-size:1vw !important
}

.position{
    display:flex;
    flex-direction: column;
}
@media (max-width: 768px) {
    .fa-line-chart{
        font-size:0.65rem
    }
    .card-content {
        padding: 0.7REM;
        padding-top: 1REM;
    }
    .pos{
        font-size:0.6rem;
        padding:5%;
    }
    .stVar{
        text-align:end;
        font-size:1rem;
    }
    .longNameTitle{
        font-size: 0.8REM !important;
    }

    .stock-banner{
        display: flex;
        margin-bottom:4%;
    }
    .level-item {
        margin-bottom: 0px!important;
        font-size:0.6rem;
    }
    #bandbdigit1{
        width:50%;
        font-size:1rem!important;
        text-align:center
    }
     #bandbdigit2{
         width:50%;
        font-size:1rem!important;
        text-align:center;
    }
    .title.is-5{
        font-size:0.8rem!important;
    }
    .stock-priceVar{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
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
        display:none;
    }
    #BBull{
        width:20%
    }
    #BBear{
        width:20%
    }
    #Bbull{
        PADDING-TOP:2PX;
        PADDING-BOTTOM:2PX;
        PADDING-LEFT: 10PX;
        PADDING-RIGHT: 10PX;
        width:100%;
        font-size:0.7rem;
    }
    #Bbear{
        PADDING-TOP:2PX;
        PADDING-BOTTOM:2PX;
        PADDING-LEFT: 10PX;
        PADDING-RIGHT: 10PX;
        width:100%;
        font-size:0.7rem;
    }

    #adWL{
        PADDING-TOP:2PX;
        PADDING-BOTTOM:2PX;
        PADDING-LEFT: 10PX;
        PADDING-RIGHT: 10PX;
        width:80%;
        font-size:0.7rem !important;
    }

}
</style>
