<template>
  <section class="section main">

    <stock-header v-if="stock" :stock="stock" :watchItem ="watchItem" @changeWatchlist="updateWatchList($event)"></stock-header>


  </section>

</template>

<script>
import { getStock } from "@/api/api";
import { getWatchItem } from "@/api/api";
import { getStockBabbles } from "@/api/api";
import StockHeader from "../components/StockHeader";
import SideCurrentInsight from "../components/SideCurrentInsight";

export default {
  data() {
    return {
      stock: null,
      watchItem: null
    };
  },
  components: {
    StockHeader,
    SideCurrentInsight
  },
  methods: {
    updateWatchList(item) {
      this.watchItem = item;
      console.log(item);
    }
  },
  created() {
    const stockName = this.$route.params.stockName;
    getStock(stockName).then(stock => (this.stock = stock));

    getWatchItem(stockName)
      .then(watchItem => {
        this.watchItem = watchItem;
      })
      .catch(err => {
        throw err;
      });

    //getStockBabbles(stockName).then(babbles => this.babbles = babbles);
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
