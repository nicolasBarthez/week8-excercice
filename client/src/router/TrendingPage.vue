<template>
<section class="section main">
  <stock-index-filter ></stock-index-filter>
  <stock-trending :stocks="stocks" :stockTrend="stockTrend"></stock-trending>
</section>
</template>

<script>
import StockIndexFilter from "../components/StockIndexFilter";
import StockTrending from "../components/StockTrending";
import { getStocks } from "@/api/apiTrending";
export default {
  data() {
    return {
      indexSelected: "all",
      stocks: null,
      stockTrend: null
    };
  },
  components: {
    StockIndexFilter,
    StockTrending
  },
  methods: {
    getStockByIndex(indexSelected) {
      this.indexSelected = indexSelected;
      getStocks(indexSelected)
        .then(stocks => {
          this.stocks = stocks;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  created() {
    getStocks("all")
      .then(stocks => {
        this.stocks = stocks;
      })
      .catch(err => {
        throw err;
      });
  }
};
</script>

<style scoped>
</style>
