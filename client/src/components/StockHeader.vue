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
                               <button v-if="!isWatched" id="adWL" @click="addWatchList()" class="button is-small is-outlined is-primary">Add to Watchlist</button>
                               <button v-else-if="watchItem.position ==='none'" id="adWL" @click="removeWatchList()" class="button is-small is-outlined is-primary">Remove from Watchlist</button>   
                               <p class="position" v-else>
                                <button id="adWL" @click="closePosition()"class="button is-small is-outlined is-primary">Close Position</button>
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
                                    <div v-if="!isWatched || watchItem.position==='none'" id="BBull">
                                        <button id="Bbull" @click="imBull()" class="button is-small is-outlined is-primary">Be Bull</button>
                                    </div>
                                    <span id="bandbdigit1">  %</span>
                                    <div id="bullsAndBearsPic">
                                        <img src="/static/images/bulls-and-bears.png" alt="bull and bear">
                                    </div>
                                    <span id="bandbdigit2">  %</span>
                                    <div v-if="!isWatched ||watchItem.position==='none'" id="BBear">
                                        <button id="Bbear" @click="imBear()"  class="button is-small is-outlined is-primary">Be Bear</button>
                                    </div>
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
import { addWatchItem } from "@/api/api";
import { removeWatchItem } from "@/api/api";
import { beBear } from "@/api/api";
import { beBull } from "@/api/api";

// FIXME: emit un event attrapé par le parent pour changer le watchitem
// FIXME: Faire de isWatched une computed property

export default {
    name: 'StockHeader',
    data(){
        return{
            isWatched:Boolean,    
        }
    },
    props: {
        stock: null,
        watchItem: null
    },

    methods:{
        addWatchList() {
            addWatchItem(this.stock.longName).then((item) =>{
                console.log("added item")
                this.isWatched = true 
                this.$emit('changeWatchlist', item )
                console.log("isWatched is now ", this.isWatched)
            }).catch(err => {console.log("something is wrong")})
            },

        removeWatchList() {
            removeWatchItem(this.stock.longName,this.watchItem._id).then((item) => {
                this.isWatched = false  
                this.$emit('changeWatchlist', item )
            }
        )},

        imBull() {
            beBull(this.stock.longName).then((item) => {
                this.isWatched = true
                this.$emit('changeWatchlist', item )  
            }
        )},

        imBear() {
            beBear(this.stock.longName).then((item) => {
                this.isWatched = true 
                this.$emit('changeWatchlist', item )  
            }
        )},
        checkWatchItem() {
            if (this.watchItem===null){
            this.isWatched=false
        } else {
            this.isWatched=true
        }

        }
    },
    created(){
        this.checkWatchItem()
        console.log("µµµµµµµµµµµµµµ", this.watchItem);
        
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

.position{
    display:flex;
    flex-direction: column;
}
</style>
