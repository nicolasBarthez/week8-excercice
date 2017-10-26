<template>
  <section class="section main">

    <stock-header :stock="stock" :watchItem ="watchItem"></stock-header>

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
    created() {
        const stockName = this.$route.params.stockName
        getStock(stockName).then(stock => this.stock = stock);

        getWatchItem(stockName).then(watchItem => {
          this.watchItem = watchItem 
          console.log(watchItem)
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
