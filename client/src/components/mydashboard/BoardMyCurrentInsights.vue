<template >
<table style="width:100%">
  <tr>
    <th>Stock</th>
    <th>Insight</th>
    <th>Initial price</th>
    <th>Current price</th>
    <th>Variation</th>
    <th>Potential P$</th>
  </tr>
  <tr v-for="(currentInsight, i) in currentInsights" :key="i">
    <td>
      <router-link :to="'/stocks/'+currentInsight.stockId.longName" class="stockName is-6" data-replace="Symbol">{{currentInsight.stockId.longName}}</router-link>
    </td>
    <td>{{currentInsight.position}}</td>
    <td>{{currentInsight.initialPrice}}</td>
    <td>{{currentInsight.stockId.price}}</td>
    <td :class="{'has-text-green' : (currentInsight.stockId.price-currentInsight.initialPrice) > 0, 'has-text-red' : (currentInsight.stockId.price-currentInsight.initialPrice)<0}">{{((currentInsight.stockId.price-currentInsight.initialPrice)/currentInsight.initialPrice).toFixed(2)}} %</td>
    <td><strong>{{currentInsight.performancePoints}} P$</strong></td>
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
    currentInsights: Array
  }
};
</script>

<style lang="css">
</style>
