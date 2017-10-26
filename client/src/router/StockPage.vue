<template>
  <section class="section main">

    <stock-header :stock="stock" :watchItem ="watchItem" @changeWatchlist="updateWatchList($event)" v-if="watchItem"></stock-header>
    <div v-else>Loading...</div>

  </section>

</template>

<script>
import { getStock } from "@/api/api";
import { getWatchItem } from "@/api/api";
import { getStockBabbles } from "@/api/api";
import StockHeader from '../components/StockHeader';
import SideCurrentInsight from '../components/SideCurrentInsight';

export default {
    data() {
    return {
      stock:Object,
      watchItem: null,
      user:Object,
      babbles:Object,
      }
    },
    components:{
      StockHeader,
      SideCurrentInsight,
    },
    methods : {
      updateWatchList(item) {
        this.watchItem=item
        console.log(item)
      }
    },
    created() {
        const stockName = this.$route.params.stockName
        getStock(stockName).then(stock => this.stock = stock);

        getWatchItem(stockName).then(watchItem => {
          this.watchItem = watchItem 
          console.log('******************watchItem',watchItem)
          }).catch(err => {throw err})

        //getStockBabbles(stockName).then(babbles => this.babbles = babbles);

        
    }
}
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
