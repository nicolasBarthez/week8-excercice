<template>
  <div  v-if="watchInsight.length!=0" class="column is-3 sideRecent mainSCI">
    <div class="is-sticky">    
        <nav class="navbar is-dark">
               <p id="currentInsight" class="babMenu navbar-item is-tab is-active">Current Insights</p>
        </nav>
        <div v-for="(watchItem, index) in watchInsight" :key="index"class="card profile-card">
              <div id="watchList" class="card-content">
                <div class="Symbol">
                   <router-link :to="'/stocks/'+watchItem.stockId.longName"class="stockName is-6" data-replace="Symbol">#{{watchItem.stockId.longName.length<7 ? watchItem.stockId.longName : watchItem.stockId.shortName }}</router-link><br>
                   <b class="price is-6">{{watchItem.stockId.price}} €</b>
                   <b id="variation" class="is-6" :class="{'has-text-green' : watchItem.stockId.variation>0, 'has-text-red' : watchItem.stockId.variation<0}">
                       <span class= "indice">{{watchItem.stockId.variation}} %</span>
                   </b>  
                </div>
                <div  class="Symbol" id="bullAndBear">
                <img v-if="watchItem.position ==='bull'" src="/static/images/bulls.png" alt="bulls-and-bears">
                <img  v-else src="/static/images/bears.png" alt="bulls-and-bears">
                </div>
                <div class="Symbol2" id="position">
                   <a class="stockName is-6">Performance</a>
                   <b class="price is-6">{{(100*(watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice).toFixed(2)}}&nbsp;%</b><br>
                   <div id="close" action="/" method="post">
                      <button @click="closePosition(watchItem)" type="submit" class="button is-small is-outlined is-primary"
                      :class="{'btn-green' : (watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice>0, 'btn-red' : (watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice<0, 'btn' : (watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice===0}">Close</button>
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
        return {      
        }
    },

    props: {
        watchInsight:null, 
    },

    methods:{
        closePosition(watchItem) {
            removePosition(watchItem.stockId.longName, watchItem._id).then(() => {
            this.$emit("changeWatchlist");
            });
        },
    }

}
</script>

<style scoped>
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

.navbar.is-dark {
    background-color: #192b41;
    color: #f9f9f9;
}

.navbar-item.is-tab.is-active {
    background-color: transparent;
    color: #f9f9f9;
    padding-bottom: calc(0.5rem - 3px);
    border-bottom-style: none;
    border-bottom-width: 0px
}
#currentInsight {
    padding-left: 20px;
}

#watchList {
    display: flex;
}
.stockName {
    font-size: 100%;
    font-weight: 400;
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
    font-weight: bolder;
    color: #ff6026;
    box-shadow: 0 0 0 0.125em #ff6026;
    border-color: #ff6026;
}
.btn-red.is-outlined:focus,
.btn-red.is-outlined:hover {
    background-color: #ff6026;
    border-color: #ff6026;
    color: #fff;
}
.btn-green.button.is-small.is-outlined.is-primary {
    PADDING-LEFT: 20PX;
    PADDING-RIGHT: 20PX;
    font-weight: bolder;
    color: #21ce99;
    box-shadow: 0 0 0 0.125em #21ce99;
    border-color: #21ce99;
}

.btn-green.is-outlined:focus,
.btn-green.is-outlined:hover {
    background-color: #21ce99;
    border-color: #21ce99;
    color: #fff;
}
.btn.button.is-small.is-outlined.is-primary {
    PADDING-LEFT: 20PX;
    PADDING-RIGHT: 20PX;
    font-weight: bolder;
    color: #192b41;
    box-shadow: 0 0 0 0.125em #192b41;
    border-color: #192b41;
}

.btn.button.is-primary.is-outlined:hover, .button.is-primary.is-outlined:focus {
    background-color: #192b41;
    border-color: #192b41;
    color: #fff;
}
</style>
