<template>
<table style="width:100%">
  <tr>
    <th>Stock</th>
    <th>Current price</th>
    <th>Variation</th>
    <th>Volume</th>
    <th>Insiders trending</th>
    <th>Hot insights</th>
    <th>Insiders I follow</th>
  </tr>
  <tr v-for="(watchitem, i) in watchList" :key="i">
    <td>
      <router-link :to="'/stocks/'+watchitem.longName" class="stockName is-6" data-replace="Symbol">{{watchitem.longName.longName}}</router-link>
    </td>
    <td>{{watchitem.currentPrice}} €</td>
    <td>{{watchitem.variation}}</td>
    <td :class="{'has-text-green' : watchitem.trending.trend==='bull', 'has-text-red' : watchitem.trending.trend==='bear'}"><strong :class="{'has-text-green' : watchitem.trending.trend==='bull', 'has-text-red' : watchitem.trending.trend==='bear'}">{{watchitem.trending.trend}}</strong> <small>({{watchitem.trending.percentage}}%)</small></td>
    <td><strong>{{watchitem.hotInsights}} Babbles posted</strong><br><small>({{watchitem.nbOfLikes}} likes)</small></td>
    <td><strong v-if="watchitem.bestInsiders[0]">@{{watchitem.bestInsiders[0].username}}</strong><small v-if="watchitem.bestInsiders[0]"> ({{watchitem.bestInsiders[0].perf}} points)</small></td>

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
    watchList: Array
  }
};
</script>

<style lang="css">
</style>
