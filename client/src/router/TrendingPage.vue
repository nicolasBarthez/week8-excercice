<template>
<section class="section main">
  <stock-index-filter v-if="stock" :stock="stock" :watchItem ="watchItem" @changeWatchlist="updateWatchList($event)"></stock-index-filter>
  <stock-trending :connectedUser="connectedUser" :stock="stock" :babbles="babbles" @sort="changeSort" @changeBabbles="updateTimelineBabble($event)"></stock-trending>
</section>
</template>

<script>
import { StockIndexFilter } from "../components/StockIndexFilter";
import { StockTrending } from "../components/StockTrending";
import { getStocks } from "@/api/apiTrending";
export default {
  data() {
    return {
      indexSelected: "all",
      stocks: null
    };
  },
  components: {
    StockIndexFilter,
    StockTrending
  },
  methods: {},
  created() {}
};
</script>

<style lang="css">
</style>
