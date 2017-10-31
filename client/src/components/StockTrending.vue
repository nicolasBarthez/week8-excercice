<template >
<table style="width:100%">
  <tr>
    <th @click="sortByName()">Stock</th>
    <th @click="sortByPrice()">Current price</th>
    <th @click="sortByVar()">Var</th>
    <th @click="sortByVol()">Volume</th>
    <th @click="sortByTrend()">Insiders trending</th>
    <th @click="sortByHi()">Hot insights</th>
    <th @click="sortByInsider()">Insiders on it</th>
    <th></th>
  </tr>
  <tr v-for="(stock, i) in stocks" :key="i">
    <td><router-link :to="'/stocks/'+stock.longName"class="stockName is-6" data-replace="Symbol">{{stock.longName}}</router-link></td>
    <td>{{stock.currentPrice.toFixed(2)}} €</td>
    <td :class="{'has-text-green' : stock.variation > 0, 'has-text-red' : stock.variation<0}">{{stock.variation.toFixed(2)}} %</td>
    <td>{{stock.volume.toLocaleString()}}</td>
    <td :class="{'has-text-green' : stock.trending.trend==='bull', 'has-text-red' : stock.trending.trend==='bear'}"><strong :class="{'has-text-green' : stock.trending.trend==='bull', 'has-text-red' : stock.trending.trend==='bear'}">{{stock.trending.trend}}</strong> <small>({{stock.trending.percentage}}%)</small></td>
    <td><strong>{{stock.hotInsights}} Babbles posted</strong><br><small>({{stock.nbOfLikes}} likes)</small></td>
    <td><strong v-if="stock.bestInsiders[0]">@{{stock.bestInsiders[0].username}}</strong><small v-if="stock.bestInsiders[0]"> ({{stock.bestInsiders[0].perf}} points)</small></td>
    <td><button class="button is-small is-outlined is-primary">Add to Watchlist</button></td>
  </tr>

</table>
</template>

<script>
export default {
  data() {
    return {
      sortBy: "trenddsc"
    };
  },
  props: {
    stocks: Array
  },
  methods: {
    sortByName() {
      this.sortBy === "namedsc"
        ? (this.sortBy = "nameasc")
        : (this.sortBy = "namedsc");
      this.$emit("sortname", this.sortBy);
    },
    sortByPrice() {
      this.sortBy === "pricedsc"
        ? (this.sortBy = "priceasc")
        : (this.sortBy = "pricedsc");
      this.$emit("sortprice", this.sortBy);
    },
    sortByVar() {
      this.sortBy === "vardsc"
        ? (this.sortBy = "varasc")
        : (this.sortBy = "vardsc");
      this.$emit("sortvar", this.sortBy);
    },
    sortByVol() {
      this.sortBy === "voldsc"
        ? (this.sortBy = "volasc")
        : (this.sortBy = "voldsc");
      this.$emit("sortvol", this.sortBy);
    },
    sortByTrend() {
      this.sortBy === "trenddsc"
        ? (this.sortBy = "trendasc")
        : (this.sortBy = "trenddsc");
      this.$emit("sorttrend", this.sortBy);
    },
    sortByHi() {
      this.sortBy === "hidsc"
        ? (this.sortBy = "hiasc")
        : (this.sortBy = "hidsc");
      this.$emit("sorthi", this.sortBy);
    },
    sortByInsider() {
      this.sortBy === "bidsc"
        ? (this.sortBy = "biasc")
        : (this.sortBy = "bidsc");
      this.$emit("sortinsider", this.sortBy);
    }
  }
};
</script>

<style lang="css">
</style>
