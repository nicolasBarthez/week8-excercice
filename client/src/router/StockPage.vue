<template>
  <section class="section main">
        

    <stock-header v-if="stock" :stock="stock" :watchItem ="watchItem" @changeWatchlist="updateWatchList($event)"></stock-header>
  <side-current-insight :watchInsight ="watchInsight" @changeWatchlist="updateWatchList($event)"></side-current-insight>
  <div class="column is-6">
<publish-babble :connectedUser="connectedUser" :stock="stock" @changeBabbles="updateTimelineBabble($event)"></publish-babble>
<timeline-babble :connectedUser="connectedUser" :stock="stock" :babbles="babbles" @sort="changeSort" @changeBabbles="updateTimelineBabble($event)"></timeline-babble>
<side-recent-activity :recentPositions ="recentPositions"></side-recent-activity>
  </div>
            
  </section>

</template>

<script>
import { getUser } from "@/api/api";
import { getRecentPosition } from "@/api/api";      
import { getWatchInsight } from "@/api/api";
import { getStock } from "@/api/api";
import { getWatchItem } from "@/api/api";
import { getStockBabbles } from "@/api/api";
import StockHeader from "../components/StockHeader";
import SideCurrentInsight from "../components/SideCurrentInsight";
import TimelineBabble from "../components/TimelineBabble";
import PublishBabble from "../components/PublishBabble";
import SideRecentActivity from "../components/SideRecentActivity";


export default {
  data() {
    return {
      filterBy:'all',
      stock: null,
      watchItem: null,
      watchInsight:null, 
      babbles:null,
      recentPositions:null,
      connectedUser:null,
    };
  },
  components: {
    StockHeader,
    SideCurrentInsight,
    TimelineBabble,
    PublishBabble,
    SideRecentActivity
  },

  methods: {
    updateWatchList() {
      getWatchItem(this.stock.longName)
        .then(watchItem => {
          this.watchItem = watchItem;
        })
        .catch(err => {
          throw err;
      });
    
      getWatchInsight(this.stock.longName)
      .then(watchInsight =>{
        this.watchInsight = watchInsight
        console.log('AAAAAAwatchInsight', watchInsight)
      });

      getRecentPosition()
      .then(recentPositions => {
        this.recentPositions =recentPositions;
      });
      
    },

    updateTimelineBabble(){
      getStockBabbles(this.stock.longName,this.filterBy)
      .then(babbles => (this.babbles = babbles));
    },

    changeSort(filterBy){
      this.filterBy=filterBy;
      getStockBabbles(this.stock.longName,this.filterBy)
      .then(babbles => (this.babbles = babbles));
    },
    fetchData() {
      const stockName = this.$route.params.stockName;
    
    getStock(stockName)
    .then(stock => {
      this.stock = stock;
    });

    getWatchItem(stockName)
      .then(watchItem => {
        this.watchItem = watchItem;
      })
      .catch(err => {
        throw err;
      });
    
    getWatchInsight(stockName)
      .then(watchInsight =>{
        console.log("debug***************watchInsight*****************",watchInsight)
        this.watchInsight = watchInsight
    });

    getStockBabbles(stockName, 'all')
      .then(babbles => {
        this.babbles = babbles;
    });

    getRecentPosition()
      .then(recentPositions => {
        this.recentPositions =recentPositions;
    });

     getUser().then(connectedUser => {
        this.connectedUser =connectedUser;
    });
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route'() {
      this.fetchData()
    }
  }
};
</script>

<style>
.section.main {
    background-color: #f9f9f9;
    padding-top: 100px;
}

.section {
    padding: 3rem 1.5rem;
}
</style>
