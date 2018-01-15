<template>
<section v-if="connectedUser">
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
                              <p class="subtitleIsin is-6">
                                <a class="">{{stock.isin}}</a>
                                <a class="">{{stock.shortName}}</a>
                              </p>
                              <a v-if="stock.index[0]==='EURONEXT PARIS'|| 'CRYPTO'"@click="descriptionStock(), wikiDescription(stock.longName)" class="stock-see-desc is-6 has-text-grey-light">{{connectedUser.lang==="EN"?"More info...":"Plus d'info..."}}</a>
                            </div>
                            <div class="add-to-watchlist" >
                               <button v-if="!watchItem" id="adWL" @click="addWatchList()" class="button is-small is-outlined is-primary">{{connectedUser.lang==='EN'?'Add to watchlist':'Je veux suivre'}}</button>
                               <button v-else-if="watchItem.position ==='none'" id="adWL" @click="removeWatchList()" class="button is-small is-outlined is-primary">{{connectedUser.lang==='EN'?'Remove':'Ne plus suivre'}}</button>
                               <p class="position" v-else>
                                   <button v-if="watchItem.position ==='bull'" @click="closePosition(watchItem)" type="submit" class="button is-small is-outlined is-primary btn"
                      :class="{'btn-green' : Math.floor(1000* (stock.price-watchItem.initialPrice)/watchItem.initialPrice)>0, 'btn-red' : Math.floor(1000* (stock.price-watchItem.initialPrice)/watchItem.initialPrice)<0}">{{connectedUser.lang==='EN'?'Close Position':'Clôturer position'}}</button>
                      <button v-else @click="closePosition(watchItem)" type="submit" class="button is-small is-outlined is-primary btn"
                      :class="{'btn-green' : Math.floor(-1000* (stock.price-watchItem.initialPrice)/watchItem.initialPrice)>0, 'btn-red' : Math.floor(-1000* (stock.price-watchItem.initialPrice)/watchItem.initialPrice)<0}">{{connectedUser.lang==='EN'?'Close Position':'Clôturer position'}}</button>

                                 <strong v-if="watchItem.position ==='bull'" class="pos" :class="{'has-text-green' : Math.floor(1000* (stock.price-watchItem.initialPrice)/watchItem.initialPrice)>0, 'has-text-red' :Math.floor(1000* (stock.price-watchItem.initialPrice)/watchItem.initialPrice)<0}">
                                     {{Math.floor(1000* (stock.price-watchItem.initialPrice)/watchItem.initialPrice)}} P$ ({{watchItem.position}} @ {{watchItem.initialPrice}} {{stock.currency}})</strong>
                                <strong v-else class="pos" :class="{'has-text-green' : Math.floor(-1000* (stock.price-watchItem.initialPrice)/watchItem.initialPrice)>0, 'has-text-red' :Math.floor(-1000* (stock.price-watchItem.initialPrice)/watchItem.initialPrice)<0}">
                                     {{Math.floor(-1000* (stock.price-watchItem.initialPrice)/watchItem.initialPrice)}} P$ ({{watchItem.position}} @ {{watchItem.initialPrice}} {{stock.currency}})</strong>
                              </p>
                            </div>
                            <div class="stock-price title is-5">
                                <div class="stock-priceVar title is-5">
                               <strong class="stVar">{{stock.price}} {{stock.currency}}</strong>
                               <small class="stVar":class="{'has-text-green' : stock.variation > 0, 'has-text-red' : stock.variation<0}">&nbsp &nbsp {{stock.variation.toFixed(2)}} %</small>
                                </div>
                                <div v-if="stock.isin==='Cryptocurrency'"  class="stock-priceVar title is-5">
                                <strong class="stVar">{{stock.price2}} {{stock.currency2}}</strong>
                                 <small class="stVar":class="{'has-text-green' : stock.variation2 > 0, 'has-text-red' : stock.variation2<0}">&nbsp &nbsp {{stock.variation2.toFixed(2)}} %</small>
                                </div>
                                 <div class="stock-priceVar title is-5">
                               <small class="is-6 has-text-grey-light">Volume: {{stock.volume}}</small>
                                </div>
                                    <span v-if="stock.index[0]==='NASDAQ'||'EURONEXT PARIS'||'CRYPTO'" class="chartIcon">
                                         <i @click="ChartStock" class="fa fa-line-chart">&nbsp see chart</i>
                                    </span>
                             </div>
                        </div>

                           <nav id="bandB" class="level media">
                               <div class="trenDingDigitMobile" v-if="trendBullBear[0]>=trendBullBear[1]">
                                        <small class="trendingDigitMobileSmall"> Insiders are&nbsp;<strong class ="has-text-green strongGRED">Bullish: </strong><strong><span id="bandbdigit1"> {{trendBullBear[0]}} %</span></strong></small>
                                    </div>
                                    <div class="trenDingDigitMobile" v-else>
                                        <small class="trendingDigitMobileSmall"> Insiders are&nbsp; <strong class ="has-text-red strongGRED">Bearish: </strong><strong><span id="bandbdigit2"> {{trendBullBear[1]}} % </span></strong></small>
                                    </div>
                               <div id="bullsAndBears">
                                   <div class="mobileBandB1">
                                        <div v-if="!watchItem || watchItem.position==='none'" id="BBull">
                                            <button id="Bbull" @click="imBull()" class="button is-small is-outlined is-primary">Be Bull</button>
                                        </div>
                                    </div>
                                    <div id="bullsAndBearsPic">
                                        <img src="/static/images/roundBullArrow.png" alt="bull and bear">
                                    </div>
                                    <div class="trenDingDigit" v-if="trendBullBear[0]>=trendBullBear[1]">
                                        <small> Insiders are <strong class ="has-text-green">Bullish: </strong></small><strong><span id="bandbdigit1"> {{trendBullBear[0]}} %</span></strong>
                                    </div>
                                    <div class="trenDingDigit" v-else>
                                        <small> Insiders are <strong class ="has-text-red">Bearish: </strong></small><strong><span id="bandbdigit2"> {{trendBullBear[1]}} % </span></strong>
                                    </div>
                                    <div id="bullsAndBearsPic">
                                        <img src="/static/images/roundBearArrow.png" alt="bull and bear">
                                    </div>

                                    <div class="mobileBandB">
                                        <div v-if="!watchItem ||watchItem.position==='none'" id="BBear">
                                            <button id="Bbear" @click="imBear()"  class="button is-small is-outlined is-primary">Be Bear</button>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                            <div id='Last'>
                                <div class="level-item has-text-centered">
                                    <a @click="trend1()" :class="{'has-text-blue':activeItem ==='one',' has-text-grey-light':activeItem!='one' }" class="is-6 trend-b-b"><small >{{connectedUser.lang==='EN'?'Last 24 hours':'24 heures'}}</small></a>
                                &nbsp &nbsp <small class="is-6 has-text-grey-light trend-b-b">|</small> &nbsp &nbsp

                                    <a @click="trend7()"class="is-6 trend-b-b" :class="{'has-text-blue':activeItem ==='seven',' has-text-grey-light':activeItem!='seven'}"><small >{{connectedUser.lang==='EN'?'Last week':'7 jours'}}</small></a>
                                 &nbsp &nbsp <small class="is-6 has-text-grey-light trend-b-b">|</small> &nbsp &nbsp

                                    <a @click="trend30()"class="is-6 trend-b-b" :class="{'has-text-blue':activeItem ==='thirty',' has-text-grey-light':activeItem!='thirty'}"><small >{{connectedUser.lang==='EN'?'Last month':'30 jours'}}</small></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <b-modal :active.sync="isChartStockActive" :width="640">
                <chart-stock-iex v-if="stock.index[0] ==='NASDAQ'" :stock="stock"></chart-stock-iex>
                <chart-stock-euro-next v-if="stock.index[0] ==='EURONEXT PARIS'" :stock="stock"></chart-stock-euro-next>
                <chart-stock-crypto v-if="stock.index[0] ==='CRYPTO'" :stock="stock"></chart-stock-crypto>
            </b-modal>
            <b-modal :active.sync="isStockDescriptionModalActive">
                <div class="mediaModal">
                    <nav id="bandB" class="level media">
                        <h1 class="modalTitle">
                            {{connectedUser.lang==="EN"?"More info about ":"Plus d'info sur "}}{{stock.longName}} !
                        </h1>
                    </nav>
                    <div id="bullsAndBears2">
                        <div id="stock-desc" class="div is-outlined" v-html="this.description"></div>
                </div>
                </div>
            </b-modal>
            <b-modal :active.sync='imBullModal' :width="640">
                <div class="mediaModal bullbearPos">
                    <div class="bullsAndBearsPic2">
                        <img src="/static/images/roundBullArrow.png" alt="bull and bear">
                    </div>
                    <div>
                        Vous venez de prendre une position <strong class="has-text-green">Bull @ {{stock.price}} {{stock.currency}}</strong> sur <strong class="has-text-green">{{stock.longName}}</strong>.<br>
                        Cette position a une durée de <strong class="has-text-blue">30 jours</strong>.<br>
                        Vous pouvez la clôturer à tout moment.<br>
                        Retouvez vos positions en cours en cliquant <strong class="has-text-blue"><router-link to="/mydashboard">ici</router-link></strong>.
                    </div>
                </div>
            </b-modal>
            <b-modal :active.sync='imBearModal' :width="640">
                <div class="mediaModal bullbearPos">
                    <div class="bullsAndBearsPic2">
                        <img src="/static/images/roundBearArrow.png" alt="bull and bear">
                    </div>
                    <div>
                        Vous venez de prendre une position <strong class="has-text-red">Bear @ {{stock.price}} {{stock.currency}}</strong> sur <strong class="has-text-red">{{stock.longName}}</strong>.<br>
                        Cette position a une durée de <strong class="has-text-blue">30 jours</strong>.<br>
                        Vous pouvez la clôturer à tout moment.<br>
                        Retouvez vos positions en cours en cliquant <strong class="has-text-blue"><router-link to="/mydashboard">ici</router-link></strong>.
                    </div>
                </div>
            </b-modal>
            <div v-if="modalClosePosition">
                <b-modal :active.sync='closePositionModal' :width="640">
                    <div v-if="modalClosePosition.position ==='bull'"class="mediaModal bullbearPos">
                        <div class="bullsAndBearsPic2">
                            <img src="/static/images/roundBullArrow.png" alt="bull and bear">
                        </div>
                        <div>
                            Vous venez de clôturer votre position <strong class='has-text-green'>Bull</strong> sur <strong class="has-text-blue">{{stock.longName}}</strong> prise <strong class="has-text-blue">@ {{modalClosePosition.initialPrice}} {{stock.currency}}</strong>.<br>
                            <strong class="has-text-green" v-if="Math.floor(1000* (stock.price-modalClosePosition.initialPrice)/modalClosePosition.initialPrice)>0">
                            Cette position vous a rapporté {{Math.floor(1000* (stock.price-modalClosePosition.initialPrice)/modalClosePosition.initialPrice)}} P$.<br></strong>
                            <strong v-else class="has-text-red">
                            Cette position vous a couté {{Math.floor(-1000* (stock.price-modalClosePosition.initialPrice)/modalClosePosition.initialPrice)}} P$.<br></strong>
                            Retouvez vos positions en cours et passée(s) en cliquant <strong class="has-text-blue"><router-link to="/mydashboard">ici</router-link></strong>.
                        </div>
                    </div>
                    <div v-else class="mediaModal bullbearPos">
                        <div class="bullsAndBearsPic2">
                            <img src="/static/images/roundBearArrow.png" alt="bull and bear">
                        </div>
                        <div>
                            Vous venez de clôturer votre position <strong class='has-text-red'>Bear</strong> sur <strong class="has-text-blue">{{stock.longName}}</strong> prise <strong class="has-text-blue">@ {{modalClosePosition.initialPrice}} {{stock.currency}}</strong>.<br>
                            <strong class="has-text-green" v-if="Math.floor(-1000* (stock.price-modalClosePosition.initialPrice)/modalClosePosition.initialPrice)>0">
                            Cette position vous a rapporté {{Math.floor(-1000* (stock.price-modalClosePosition.initialPrice)/modalClosePosition.initialPrice)}} P$.<br></strong>
                            <strong v-else class="has-text-red">
                            Cette position vous a couté {{Math.floor(1000* (stock.price-modalClosePosition.initialPrice)/modalClosePosition.initialPrice)}} P$.<br></strong>
                            Retouvez vos positions en cours et passée(s) en cliquant <strong class="has-text-blue"><router-link to="/mydashboard">ici</router-link></strong>.
                        </div>
                    </div>
                </b-modal>
            </div>
        </div>
       </div>
</section>
</template>


<script>
import ChartStockIex from "@/components/ChartStockIex";
import ChartStockEuroNext from "@/components/ChartStockEuroNext";
import ChartStockCrypto from "@/components/ChartStockCrypto";
import { addWatchItem } from "@/api/api";
import { removeWatchItem } from "@/api/api";
import { beBear } from "@/api/api";
import { beBull } from "@/api/api";
import { removePosition } from "@/api/api";
import { getTrend } from "@/api/api";
import { getDescription } from "@/api/api";
import { getUser } from "@/api/api";

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
      modalClosePosition: "",
      isChartStockActive: false,
      isStockDescriptionModalActive: false,
      imBullModal: false,
      imBearModal: false,
      closePositionModal: false,
      description: "Description",
      connectedUser: null
    };
  },
  components: {
    ChartStockIex,
    ChartStockEuroNext,
    ChartStockCrypto
  },
  created() {
    getUser().then(connectedUser => {
      this.connectedUser = connectedUser;
    });
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

    closePosition(watchItem) {
      removePosition(this.stock.shortName, this.watchItem._id).then(() => {
        this.$emit("changeWatchlist", null);
      });
      (this.modalClosePosition = watchItem), (this.closePositionModal = true);
    },

    imBull() {
      const inWatchList = this.watchItem ? this.watchItem._id : undefined;
      beBull(this.stock.shortName, inWatchList).then(item => {
        this.$emit("changeWatchlist", item);
      });
      this.imBullModal = true;
    },

    imBear() {
      const inWatchList = this.watchItem ? this.watchItem._id : undefined;
      beBear(this.stock.shortName, inWatchList).then(item => {
        this.$emit("changeWatchlist", item);
      });
      this.imBearModal = true;
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
    },
    wikiDescription(stockLongName) {
      const stockName = this.$route.params.stockName;
      return getDescription(stockName, stockLongName).then(description => {
        console.log("Description", description);
        this.description = description;
      });
    }
  }
};
</script>

<style scoped>
.has-text-green{
    font-weight: bold
}
.has-text-red{
    font-weight: bold
}
.bullsAndBearsPic2{
    width:40%;
    padding: 1REM
}
.subtitleIsin{
    font-size: 1REM!important
}
.bullbearPos {
    display: flex;
    align-items: center;
    border-radius: 3%;
    justify-content: space-evenly
}
.trenDingDigitMobile{
    display:none;
}
.trenDingDigit{
    display: flex;
    align-items: center;
    flex-direction: column;
}
.title, .subtitle {
    word-break: initial;
}
.mobileBandB1{
        width:25%;
        display:flex;
        justify-content:space-around;
        align-items:center
}
.mobileBandB{
        width:25%;
        display:flex;
        justify-content:space-around;
        align-items:center
    }
.level-item {
    display: flex;
    justify-content: space-evenly;
    align-items: baseline;
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
    margin-top: 1%!important;
    display: flex;
 }
 .stock-see-desc{
     cursor: pointer;
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
    margin-bottom:0% !important
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
    width: 12%;
}
#bullsAndBears {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:100%!important;
}
#bandB {
    justify-content: center;
}
#Last {
    display: flex;
    justify-content: center;
    align-items: center
}
.has-text-blue{
    font-weight:bold
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
.stVar {
    font-size: 1.3REM!important;
}
#stockInfo {
    display: flex;
}
.trend-b-b{
  cursor:pointer;
}
small{
    font-size:1.1rem !important
}
#adWL {
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #fff;
    background-color: #192b41;
    box-shadow: 0 0 0 0.125em #192b41;
    border-color: #192b41;
    font-size:1.2rem !important
}
#adWL.is-outlined:focus,
#adWL.is-outlined:hover {
    background-color: #fff!important;
    border-color: #192b41!important;
    color: #192b41!important;
}
.btn {
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #fff!important;
    background-color: #192b41!important;
    box-shadow: 0 0 0 0.125em #192b41 !important;
    border-color: #192b41 !important;
    font-size:1.2rem !important
}

.btn:hover, .btn:focus {
    background-color: #fff!important;
    border-color: #192b41!important;
    color: #192b41!important;
}
.btn-red {
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    color: #fff!important;
    background-color: #ff6026!important;
    box-shadow: 0 0 0 0.125em #ff6026!important;;
    border-color: #ff6026!important;;
    font-weight: bolder;
    FONT-SIZE: 1.2REM;
}
.btn-red:focus,
.btn-red:hover {
    background-color: #fff!important;
    border-color: #ff6026!important;
    color: #ff6026!important;
}
.btn-green {
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    background-color:#21ce99!important;;
    color: #fff!important;
    box-shadow: 0 0 0 0.125em #21ce99!important;
    border-color: #21ce99!important;
    font-weight: bolder;
    FONT-SIZE: 1.2REM;
}

.btn-green:focus,
.btn-green:hover {
    background-color: #fff!important;
    border-color: #21ce99!important;
    color: #21ce99!important;
}
#Bbull {
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    background-color: #21ce99;
    border-color: #21ce99;
    color: #fff;
    box-shadow: 0 0 0 0.125em #21ce99;
    border-color: #21ce99;
    font-size:1.2rem
}
#Bbull.is-outlined:focus,
#Bbull.is-outlined:hover {
    background-color: #fff!important;
    border-color: #21ce99!important;
    color: #21ce99!important;
}
#Bbear {
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #fff;
    background-color:#ff6026;
    box-shadow: 0 0 0 0.125em #ff6026;
    border-color: #ff6026;
    font-size:1.2rem
}
#Bbear.is-outlined:focus,
#Bbear.is-outlined:hover {
    background-color: #fff!important;
    border-color: #ff6026!important;
    color: #ff6026!important;
}
.position{
    display:flex;
    flex-direction: column;
}
.mediaModal{
    background-color: #f9f9f9;
    padding: 1rem;
}
@media (max-width: 768px) {
.has-text-green{
    font-weight: bold;
    font-size: 0.7rem !important;
}
.has-text-red{
    font-weight: bold;
    font-size: 0.7rem !important;
}
    .bullsAndBearsPic2{
        width: 100%;
        padding-left:0;
    }
    .trenDingDigitMobile{
        display: flex!important;
        align-items: baseline;
        justify-content: center;
        align-items: center
    }
    #bandB{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .trenDingDigit{
    display: none
    }
    .mobileBandB1{
        width:25%;
        display:flex;
        flex-direction:column-reverse;
        align-items:center
    }
    .mobileBandB{
        width:25%;
        display:flex;
        flex-direction:column;
        align-items:center
    }
    #bullsAndBearsPic{
        width: 40%;
    }
    #bullsAndBears {
    justify-content: space-between!important;
    }
    .fa-line-chart{
        font-size:0.65rem
    }
    small{
        font-size:0.7rem!important;
    }
    .card-content {
        padding: 0.7REM;
        padding-top: 1REM;
    }
    .pos{
        font-size:0.7rem!important;
        padding:5%;
    }
    .stVar{
        text-align:end;
        font-size:0.8rem!important
    }
    .longNameTitle{
        font-size: 0.8REM !important;
    }

    .stock-banner{
        display: flex;
    }
    .level-item {
        margin-bottom: 0px!important;
        font-size:0.6rem;
    }
    #bandbdigit1{
        width:90%;
        font-size:1rem!important;
        text-align:center
    }
     #bandbdigit2{
         width:90%;
        font-size:1rem!important;
        text-align:center;
    }
    .strongGRED{
        font-size:1rem!important;
    }
    .stock-priceVar{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        TEXT-ALIGN: end;
    }
    .media-left {
        display:none;
    }
    .stock-see-desc{
        font-size:0.75rem!important;
    }
    .subtitleIsin {
        font-size:0.7rem!important;
    }
    #BBull{
        width:80%;
        padding-top: 0.7rem;
    }
    #BBear{
        width:80%;
        padding-top: 0.7rem;
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
    .btn-red.button.is-small.is-outlined.is-primary {
        PADDING-TOP:2PX;
        PADDING-BOTTOM:2PX;
        PADDING-LEFT: 10PX;
        PADDING-RIGHT: 10PX;
        width:80%;
        font-size:0.7rem !important;
}

.btn-green.button.is-small.is-outlined.is-primary {
        PADDING-TOP:2PX;
        PADDING-BOTTOM:2PX;
        PADDING-LEFT: 10PX;
        PADDING-RIGHT: 10PX;
        width:80%;
        font-size:0.7rem !important;
}

.btn.button.is-small.is-outlined.is-primary {
        PADDING-TOP:2PX;
        PADDING-BOTTOM:2PX;
        PADDING-LEFT: 10PX;
        PADDING-RIGHT: 10PX;
        width:80%;
        font-size:0.7rem !important;
}


}
</style>
