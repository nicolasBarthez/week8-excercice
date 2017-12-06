<template>
  <div  v-if="connectedUser && watchInsight" class="column is-3 sideRecent mainSCI">
    <div v-if="watchInsight.length>0" class="is-sticky">
        <nav v-if="connectedUser" class="navbar is-dark">
               <p v-if="connectedUser.lang==='EN'" id="currentInsight" class="babMenu navbar-item whiteci">Open Positions</p>
               <p v-else id="currentInsight" class="babMenu navbar-item whiteci">Positions ouvertes</p>
        </nav>
        <div v-for="(watchItem, index) in watchInsight" :key="index"class="card profile-card">
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
                <div v-if="connectedUser" class="Symbol2" id="position">
                   <a class="stockName is-6">{{connectedUser.lang==='EN'?'Potential':'Potentiel'}} P$</a>
                   <b v-if="watchItem.position ==='bull'" class="price is-6" :class="{'has-text-green' : Math.floor(1000*(watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice)>0, 'has-text-red' : Math.floor(1000* (watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice)<0}">{{Math.floor(1000* (watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice)}}&nbsp;P$</b>
                   <b v-else class="price is-6" :class="{'has-text-green' : Math.floor(-1000* (watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice)>0, 'has-text-red' : Math.floor(-1000* (watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice)<0}">{{Math.floor(-1000* (watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice)}}&nbsp;P$</b>
                   <br><div id="close">
                      <button v-if="watchItem.position ==='bull'" @click="closePosition(watchItem)" type="submit" class="button is-small is-outlined is-primary btn"
                      :class="{'btn-green' : Math.floor(1000* (watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice)>0, 'btn-red' : Math.floor(1000* (watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice)<0}">{{connectedUser.lang==='EN'?'Close':'Clôturer'}}</button>
                      <button v-else @click="closePosition(watchItem)" type="submit" class="button is-small is-outlined is-primary btn"
                      :class="{'btn-green' : Math.floor(-1000* (watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice)>0, 'btn-red' : Math.floor(-1000* (watchItem.stockId.price-watchItem.initialPrice)/watchItem.initialPrice)<0}">{{connectedUser.lang==='EN'?'Close':'Clôturer'}}</button>
                   </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="is-sticky">
        <nav v-if="connectedUser" class="navbar is-dark">
               <p v-if="connectedUser.lang==='EN'" id="currentInsight" class="babMenu navbar-item whiteci">Open Positions</p>
               <p v-else id="currentInsight" class="babMenu navbar-item whiteci">Positions ouvertes</p>
        </nav>
        <div v-if="connectedUser" class="card profile-card">
            <p v-if="connectedUser.lang==='EN'">Take position on a stock to share your insights !!!</p>
            <p v-else >Prenez position et partager vos intuitions sur le marché !!!</p>
        </div>
    </div>
    <div v-if="modalClosePosition">
                <b-modal :active.sync='closePositionModal' :width="640">
                    <div v-if="modalClosePosition.position ==='bull'"class="mediaModal bullbearPos">     
                        <div class="bullsAndBearsPic2">
                            <img src="/static/images/roundBullArrow.png" alt="bull and bear">
                        </div>
                        <div>
                            Vous venez de clôturer votre position <strong class='has-text-green'>Bull</strong> sur <strong class="has-text-blue">{{modalClosePosition.stockId.longName}}</strong> prise <strong class="has-text-blue">@ {{modalClosePosition.stockId.price}} {{modalClosePosition.stockId.currency}}</strong>.<br>
                            <strong class="pos has-text-green" v-if="Math.floor(1000* (modalClosePosition.stockId.price-modalClosePosition.initialPrice)/modalClosePosition.initialPrice)>0">
                            Cette position vous a rapporté {{Math.floor(1000* (modalClosePosition.stockId.price-modalClosePosition.initialPrice)/modalClosePosition.initialPrice)}} P$.<br></strong>
                            <strong v-else class="pos has-text-red">
                            Cette position vous a couté {{Math.floor(-1000* (modalClosePosition.stockId.price-modalClosePosition.initialPrice)/modalClosePosition.initialPrice)}} P$.<br></strong>
                            Retouvez vos positions en cours et passée(s) en cliquant <strong class="has-text-blue"><router-link to="/mydashboard">ici</router-link></strong>.
                        </div>
                    </div>
                    <div v-else class="mediaModal bullbearPos">     
                        <div class="bullsAndBearsPic2">
                            <img src="/static/images/roundBearArrow.png" alt="bull and bear">
                        </div>
                        <div>
                            Vous venez de clôturer votre position <strong class='has-text-red'>Bear</strong> sur <strong class="has-text-blue">{{modalClosePosition.stockId.longName}}</strong> prise <strong class="has-text-blue">@ {{modalClosePosition.stockId.price}} {{modalClosePosition.stockId.currency}}</strong>.<br>
                            <strong class="pos has-text-green" v-if="Math.floor(-1000* (modalClosePosition.stockId.price-modalClosePosition.initialPrice)/modalClosePosition.initialPrice)>0">
                            Cette position vous a rapporté {{Math.floor(-1000* (modalClosePosition.stockId.price-modalClosePosition.initialPrice)/modalClosePosition.initialPrice)}} P$.<br></strong>
                            <strong v-else class="pos has-text-red">
                            Cette position vous a couté {{Math.floor(1000* (modalClosePosition.stockId.price-modalClosePosition.initialPrice)/modalClosePosition.initialPrice)}} P$.<br></strong>
                            Retouvez vos positions en cours et passée(s) en cliquant <strong class="has-text-blue"><router-link to="/mydashboard">ici</router-link></strong>.
                        </div>
                    </div>
                </b-modal>
            </div>
  </div>

</template>

<script>
import { removePosition } from "@/api/api";

export default {
  data() {
    return {
        closePositionModal:false,
        modalClosePosition:""
    };
  },

  props: {
    watchInsight: null,
    connectedUser: Object
  },

  methods: {
    closePosition(watchItem) {
      removePosition(watchItem.stockId.shortName, watchItem._id).then(() => {
        this.$emit("changeWatchlist");
      });
      this.modalClosePosition= watchItem,
      this.closePositionModal = true
    }
  }
};
</script>

<style scoped>
.bullsAndBearsPic2{
    width:40%;
    padding: 1REM
}
.bullbearPos {
    display: flex;
    align-items: center;
    border-radius: 3%;
    justify-content: space-evenly
}
.mediaModal{
    background-color: #f9f9f9;
    padding: 1rem;
}
.has-text-blue{
    font-weight:bold
}
a{
    color: #192b41 !important; 
}
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
    width: 35%;
    DISPLAY: FLEX;
    FLEX-DIRECTION: column;
    justify-content: center;
}
.Symbol2 {
    color: #192b41 !important;
    width: 30%;
    DISPLAY: FLEX;
    FLEX-DIRECTION: column;
    justify-content: center;
    align-items: flex-end;
    padding-top: 5%;
}
.SymbolImage{
    width:40%;
    DISPLAY: flex;
    align-items: center;
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
    font-size: 0.9rem;
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
.btn {
    PADDING-LEFT: 20PX;
    PADDING-RIGHT: 20PX;
    background-color:#192b41!important;
    color: #fff!important;
    box-shadow: 0 0 0 0.125em #192b41!important;
    border-color: #192b41!important;
    font-weight: bolder;
    FONT-SIZE: 0.8REM;
}

.btn:hover, .btn:focus {
    background-color: #fff!important;
    border-color: #192b41!important;
    color: #192b41!important;
}
.btn-red {
    PADDING-LEFT: 20PX;
    PADDING-RIGHT: 20PX;
    color: #fff!important;
    background-color: #ff6026!important;
    box-shadow: 0 0 0 0.125em #ff6026!important;;
    border-color: #ff6026!important;;
    font-weight: bolder;
    FONT-SIZE: 0.8REM;
}
.btn-red:focus,
.btn-red:hover {
    background-color: #fff!important;
    border-color: #ff6026!important;
    color: #ff6026!important;
}
.btn-green {
    PADDING-LEFT: 20PX;
    PADDING-RIGHT: 20PX;
    background-color:#21ce99!important;;
    color: #fff!important;
    box-shadow: 0 0 0 0.125em #21ce99!important;
    border-color: #21ce99!important;
    font-weight: bolder;
    FONT-SIZE: 0.8REM;
}

.btn-green:focus,
.btn-green:hover {
    background-color: #fff!important;
    border-color: #21ce99!important;
    color: #21ce99!important;
}

@media screen and (max-width: 768px) {
    .bullsAndBearsPic2{
        width: 100%;
        padding-left:0;
    }
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
