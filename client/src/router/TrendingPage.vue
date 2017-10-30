<template>
<section class="section main">
  <stock-index-filter ></stock-index-filter>
  <stock-trending :stocks="stocks"  @sortname="sortByCol($event)" @sortprice="sortByCol($event)" @sortvar="sortByCol($event)" @sortvol="sortByCol($event)" @sorttrend="sortByCol($event)" @sorthi="sortByCol($event)" @sortinsider="sortByCol($event)"></stock-trending>
</section>
</template>

<script>
import StockIndexFilter from "../components/StockIndexFilter";
import StockTrending from "../components/StockTrending";
import { getStocksTrending, getStocksTrendingByIndex } from "@/api/apiTrending";
export default {
  data() {
    return {
      indexSelected: "all",
      stocks: []
    };
  },
  components: {
    StockIndexFilter,
    StockTrending
  },
  methods: {
    sortByCol(col) {
      getStocksTrending({ sort: col, index: this.indexSelected })
        .then(stocks => {
          this.stocks = stocks;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  created() {
    getStocksTrending()
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
