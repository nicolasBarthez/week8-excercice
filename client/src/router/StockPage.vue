<template>
  <stock-header :stock="stock" :watchItem ="watchItem"></stock-header>
</template>

<script>
import { getStock } from "@/router/api";
import { getWatchItem } from "@/router/api";
import StockHeader from '../components/StockHeader'

export default {
    data() {
    return {
      stock:{},
      watchItem:{},
      }
    },
     components:{
    StockHeader,
  },
    created() {
        const stockName = this.$route.params.stockName
        getStock(stockName).then(stock => this.stock = stock);

        getWatchItem(stockName).then(watchItem => this.watchItem = watchItem)
    }
}
</script>

<style>

</style>
