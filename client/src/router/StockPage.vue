<template>
  <section class="section main">

    <stock-header v-if="stock" :stock="stock" :watchItem ="watchItem" @changeWatchlist="updateWatchList($event)"></stock-header>
  <side-current-insight :watchInsight ="watchInsight" @changeWatchlist="updateWatchList($event)"></side-current-insight>
  <div class="column is-6">
<publish-babble :stock="stock"></publish-babble>
<timeline-babble :stock="stock" :babbles="babbles" @changeBabbles="updateTimelineBabble($event)"></timeline-babble>
  </div>
  </section>

</template>

<script>
import { getWatchInsight } from "@/api/api";
import { getStock } from "@/api/api";
import { getWatchItem } from "@/api/api";
import { getStockBabbles } from "@/api/api";
import StockHeader from "../components/StockHeader";
import SideCurrentInsight from "../components/SideCurrentInsight";
import TimelineBabble from "../components/TimelineBabble";
import PublishBabble from "../components/PublishBabble";


export default {
  data() {
    return {
      stock: null,
      watchItem: null,
      watchInsight:null, 
      babbles:null,
    };
  },
  components: {
    StockHeader,
    SideCurrentInsight,
    TimelineBabble,
    PublishBabble
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
    
      getWatchInsight().then(watchInsight =>{
        this.watchInsight = watchInsight
        console.log(watchInsight,'AAAAAA')
      });
    },

    updateTimelineBabble(){
      getStockBabbles(this.stock.longName)
      .then(babbles => (this.babbles = babbles));
    }
  },
  created() {
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
    
    getWatchInsight()
      .then(watchInsight =>{
        this.watchInsight = watchInsight
    });

    getStockBabbles(stockName)
      .then(babbles => {
        console.log("debug********************************",babbles)
        this.babbles = babbles;
    });
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
