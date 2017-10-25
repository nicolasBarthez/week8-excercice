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
                                <P class="">{{stock.isin}}</P>
                                <P class="">{{stock.shortName}}</P>
                              </p>
                              <p class="stock-see-desc is-6 has-text-grey-light">See description</p>
                            </div>
                            <div class="add-to-watchlist" >
                               <button v-if="!watchItem" id="adWL" @click="addWatchList()" class="button is-small is-outlined is-primary">Add to Watchlist</button>
                               <button v-else-if="watchItem.position==='none'" id="adWL" @click="RemoveWatchList()" class="button is-small is-outlined is-primary">Remove from Watchlist</button>   
                               <p  v-else>
                                <button id="adWL" class="button is-small is-outlined is-primary">Close Position</button>
                                 <span> You're {{watchItem.position}} from {{watchItem.initialPrice}}</span>                           
                              </p>
                            </div>
                            <div class="stock-price title is-5">
                               <strong class="">{{stock.price}} &nbsp;€</strong>
                               <small class="">&nbsp;{{stock.variation}} &nbsp;%</small>
                           </div>
                        </div>
                           <nav id="bandB" class="level media">
                               <div id="bullsAndBears">
                                    <form v-if="!watchItem || watchItem.position==='none'" id="BBull">
                                        <button id="Bbull"  class="button is-small is-outlined is-primary">Be Bull</button>
                                    </form>
                                    <span id="bandbdigit1">  %</span>
                                    <div id="bullsAndBearsPic">
                                        <img src="/static/images/bulls-and-bears.png" alt="bull and bear">
                                    </div>
                                    <span id="bandbdigit2">  %</span>
                                    <form v-if="!watchItem ||watchItem.position==='none'" id="BBear">
                                        <button id="Bbear"  class="button is-small is-outlined is-primary">Be Bear</button>
                                    </form>
                                </div>
                            </nav>
                            <div id='Last'>
                                <div class="level-item has-text-centered">
                                    <p class="is-6 has-text-grey-light"><small>Last 6 hours</small> &nbsp &nbsp <small>|</small> &nbsp &nbsp</p>
                                </div>
                                <div class="level-item has-text-centered">
                                    <p class="is-6 has-text-grey-light"><small>Last 24 hours</small> &nbsp &nbsp <small>|</small> &nbsp &nbsp</p>
                                </div>
                                <div class="level-item has-text-centered">
                                    <p class="is-6 has-text-grey-light"><small>Last Week</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
</template>

<script>
import { addWatchItem } from "@/router/api";
import { RemoveWatchItem } from "@/router/api";

export default {
    name: 'StockHeader',
    data(){
        return{
            isWatched:false,
        }
    },
    props: {
        stock: Object,
        watchItem: Object,
    },

    methods:{
        addWatchList() {
            addWatchItem(this.stock.longName).then(() =>
            this.isWatched = true,    
        )},

        RemoveWatchList() {
            RemoveWatchItem(this.stock.longName).then(() =>
            this.isWatched = false,    
        )}
    },
    created(){
        if (this.watchItem){
            this.isWatched=true
        }
    }
}
</script>

<style>
.stock-banner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.add-to-watchlist{
    padding-left:5%;
}

@media (max-width: 768px) {
    .stock-banner {
        flex-direction: column;
    }
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
    width: 45%;
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
    font-size: 2vw;
    color: #21ce99;
}

#bandbdigit2 {
    font-size: 2vw;
    color: #ff6026;
}

#priceStock {
    display: flex;
    font-size: 2REM;
    align-items: center;
}

#ActionCard {
    width: 100%;
    margin-bottom: 25px;
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

</style>
