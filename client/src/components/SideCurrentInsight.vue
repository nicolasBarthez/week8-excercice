<template>
  <div  v-if="watchInsight" class="column is-3 sideRecent mainSCI">
    <div class="is-sticky">
        <nav class="navbar is-dark">
               <p id="currentInsight" class="babMenu navbar-item whiteci">Current Insights</p>
        </nav>
        <div v-if="watchInsight" v-for="(watchItem, index) in watchInsight" :key="index"class="card profile-card">
              <div id="watchList" class="card-content">
                <div class="Symbol">
                   <router-link :to="'/stocks/'+watchItem.stockId.shortName"class="stockName is-6" data-replace="Symbol">#{{watchItem.stockId.shortName.length<7 ? watchItem.stockId.shortName : watchItem.stockId.shortName }}</router-link><br>
                   <b class="price is-6">{{watchItem.stockId.price}}  {{watchItem.stockId.currency}}</b>
                   <b id="variation" class="is-6" :class="{'has-text-green' : watchItem.stockId.variation>0, 'has-text-red' : watchItem.stockId.variation<0}">
                       <span class= "indice">{{watchItem.stockId.variation}} %</span>
                   </b>
                </div>
                <div  class="SymbolImage" id="bullAndBear">
                <img v-if="watchItem.position ==='bull'" src="/static/images/roundBullArrow.png" alt="bulls-and-bears">
                <img  v-else src="/static/images/roundBearArrow.png" alt="bulls-and-bears">
                </div>
                <div class="Symbol2" id="position">
                   <a class="stockName is-6">Performance</a>
                   <b v-if="watchItem.position ==='bull'" class="price is-6" :class="{'has-text-green' : watchItem.performancePoints>0, 'has-text-red' : watchItem.performancePoints<0}">{{watchItem.performancePoints.toFixed(0)}}&nbsp;P$</b>
                   <b v-else class="price is-6" :class="{'has-text-green' : watchItem.performancePoints>0, 'has-text-red' : watchItem.performancePoints<0}">{{watchItem.performancePoints.toFixed(0)}}&nbsp;P$</b>
                   </br><div id="close" action="/" method="post">
                      <button v-if="watchItem.position ==='bull'" @click="closePosition(watchItem)" type="submit" class="button is-small is-outlined is-primary"
                      :class="{'btn-green' : watchItem.performancePoints>0, 'btn-red' : watchItem.performancePoints<0, 'btn' : watchItem.performancePoints===0}">Close</button>
                      <button v-else @click="closePosition(watchItem)" type="submit" class="button is-small is-outlined is-primary"
                      :class="{'btn-green' : watchItem.performancePoints>0, 'btn-red' : watchItem.performancePoints<0, 'btn' : watchItem.performancePoints===0}">Close</button>

                   </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  <div  v-else class="column is-3 sideRecent">
    <div class="is-sticky">
        <nav class="navbar is-dark">
               <p id="currentInsight" class="babMenu navbar-item is-tab is-active"> Current Insights</p>
        </nav>
        <div class="card profile-card">
            <p>Take position on a stock to share your insights !!!</p>
        </div>
    </div>
  </div>
</template>

<script>
import { removePosition } from "@/api/api";

export default {
  data() {
    return {};
  },

  props: {
    watchInsight: null
  },

  methods: {
    closePosition(watchItem) {
      removePosition(watchItem.stockId.shortName, watchItem._id).then(() => {
        this.$emit("changeWatchlist");
      });
    }
  }
};
</script>

<style scoped>
.is-6{
    font-size:1rem
}
.card-content {
    padding: 1rem;
}
.mainSCI{
    position:sticky
}

.Symbol {
    color: #192b41 !important;
    width: 40%;
    DISPLAY: FLEX;
    FLEX-DIRECTION: column;
    justify-content: center;
}
.Symbol2 {
    color: #192b41 !important;
    width: 40%;
    DISPLAY: FLEX;
    FLEX-DIRECTION: column;
    justify-content: center;
    align-items: flex-end;
    padding-top: 5%;
}
.SymbolImage{
    width:50%
}
.navbar.is-dark {
    background-color: #192b41;
    color: #f9f9f9;
}
.whiteci{
     color: #f9f9f9;
}
.babMenu {
    background-color: transparent;
    color: #f9f9f9 !important;
    padding-bottom: calc(0.5rem - 3px);
}
#currentInsight {
    padding-left: 20px;
}

#watchList {
    display: flex;
}
.stockName {
    font-size: 1rem;
    font-weight: bolder;
    color:#192b41
}

#WinOrLoss {
    color: #ff6026;
    font-weight: bolder;
    padding-bottom: 5px;
    padding-top: 10px;
    padding-left: 15px;
}
#close {
    padding-top: 10px;
}
.btn-red.button.is-small.is-outlined.is-primary {
    PADDING-LEFT: 20PX;
    PADDING-RIGHT: 20PX;
    color: #ff6026;
    box-shadow: 0 0 0 0.125em #ff6026;
    border-color: #ff6026;
    font-weight: bolder;
    FONT-SIZE: 1REM;
}
.btn-red.is-outlined:focus,
.btn-red.is-outlined:hover {
    background-color: #ff6026!important;
    border-color: #ff6026!important;
    color: #fff!important;
}
.btn-green.button.is-small.is-outlined.is-primary {
    PADDING-LEFT: 20PX;
    PADDING-RIGHT: 20PX;
    color: #21ce99;
    box-shadow: 0 0 0 0.125em #21ce99;
    border-color: #21ce99;
    font-weight: bolder;
    FONT-SIZE: 1REM;
}

.btn-green.is-outlined:focus,
.btn-green.is-outlined:hover {
    background-color: #21ce99!important;
    border-color: #21ce99!important;
    color: #fff!important;
}
.btn.button.is-small.is-outlined.is-primary {
    PADDING-LEFT: 20PX;
    PADDING-RIGHT: 20PX;
    color: #192b41;
    box-shadow: 0 0 0 0.125em #192b41;
    border-color: #192b41;
    font-weight: bolder;
    FONT-SIZE: 1REM;
}

.btn.button.is-primary.is-outlined:hover, .button.is-primary.is-outlined:focus {
    background-color: #192b41!important;
    border-color: #192b41!important;
    color: #fff!important;
}
@media screen and (max-width: 768px) {
    #currentInsight {
        padding-top: 15px;
    }
    .card-content {
        padding: 0.5rem;
    }
    .stockName {
        font-size: 0.8rem;
    }
    .is-6{
        font-size:0.8rem
    }
    .btn-red.button.is-small.is-outlined.is-primary {
        FONT-SIZE: 0.7rem;
    }
    .btn-green.button.is-small.is-outlined.is-primary {
        FONT-SIZE: 0.7rem;
    }
    .btn.button.is-small.is-outlined.is-primary {
        FONT-SIZE: 0.7rem;
    }
}
</style>
