<template>
<div class="container">
 <div class="columns">
  <div class="column is-3">
    <div class="is-sticky">
        <div class="card-image">
            <nav class="navbar is-dark">
               <p id="currentInsight" class="babMenu navbar-item is-tab is-active">Current Insights</p>
            </nav>
        </div>
        <div v-if="watchInsight" v-for="(watchItem, index) in watchInsight" :key="index"class="card profile-card">
              <div id="watchList" class="card-content">
                <div class="Symbol">
                   <h1 class="stockName" data-replace="Symbol">{{watchItem.stockId.longName}}</h1>
                   <b class="price is-6">{{watchItem.stockId.price}}</b> <br>
                   <b id="variation" :class="{'is-6':true, 'has-text-green':watchItem.stockId.variation>0, 'has-text-red':watchItem.stockId.variation<0}">
                       <span class= "indice">{{watchItem.stockId.variation}}</span>
                   </b>  
                </div>
                <div  id="bullAndBear">
                <img v-if="watchItem.position ==='bull'" src="/static/images/bulls.png" alt="bulls-and-bears">
                <img  v-else src="/static/images/bears.png" alt="bulls-and-bears">
                </div>
                <div id="position">
                   <span class="stockName">Performance</span>
                   <h1 id="WinOrLoss">{{(100*(watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice).toFixed(2)}}&nbsp;%</h1>
                   <div id="close" action="/" method="post">
                      <button id="Bclose" @click="closePosition(watchItem)" type="submit" class="button is-small is-outlined is-primary">Close</button>
                   </div>
                </div>
            </div>
        </div>
    </div>
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

<style>
.Symbol {
    color: #192b41 !important;
    width: 40%;
}

.navbar.is-dark {
    background-color: #192b41;
    color: #f9f9f9;
}

.navbar-item.is-tab.is-active {
    background-color: transparent;
    border-bottom-color: #f9f9f9;
    border-bottom-style: solid;
    border-bottom-width: 3px;
    color: #f9f9f9;
    padding-bottom: calc(0.5rem - 3px);
}
#currentInsight {
    padding-left: 20px;
}

.navbar-item.is-tab:hover {
    background-color: transparent;
    border-bottom-color: #f5f5f5;
    background-color: #f5f5f5;
    color: #0a0a0a;
}

#watchList {
    padding-right: 40px;
    display: flex;
}
.stockName {
    padding-bottom: 10px;
}

#bullAndBear {
    width: 40%;
}
#position {
    padding-left: 20px;
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
#Bclose {
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #ff6026;
    box-shadow: 0 0 0 0.125em #ff6026;
    border-color: #ff6026;
}

#Bclose.is-outlined:focus,
#Bclose.is-outlined:hover {
    background-color: #ff6026;
    border-color: #ff6026;
    color: #fff;
}
</style>
