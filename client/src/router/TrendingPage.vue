<template>
<section class="section main">
  <stock-index-filter ></stock-index-filter>
  <stock-trending :stocks="stocks"  @sortname="sortByCol" @sortprice="sortByCol" @sortvar="sortByCol($event)" @sortvol="sortByCol($event)" @sorttrend="sortByCol($event)" @sorthi="sortByCol($event)" @sortinsider="sortByCol($event)"></stock-trending>
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
.section.main {
    background-color: #f9f9f9;
    padding: 7rem 1.5rem;
}
.container{
  display: flex;
}
</style>
