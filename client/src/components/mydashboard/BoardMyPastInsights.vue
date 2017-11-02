<template >
  <table style="width:100%">
    <tr>
      <th>Stock</th>
      <th>Insight</th>
      <th>Initial price</th>
      <th>Sold price</th>
      <th>Variation</th>
      <th>Potential P$</th>
    </tr>
    <tr v-for="(pastInsight, i) in pastInsights" :key="i">
      <td>
        <router-link :to="'/stocks/'+pastInsight.stockId.longName" class="stockName is-6" data-replace="Symbol">{{pastInsight.stockId.longName}}</router-link>
      </td>
      <td>{{pastInsight.position}}</td>
      <td>{{pastInsight.initialPrice}}</td>
      <td>{{pastInsight.soldPrice}}</td>
      <td :class="{'has-text-green' : (pastInsight.soldPrice-pastInsight.initialPrice) > 0, 'has-text-red' : (pastInsight.soldPrice-pastInsight.initialPrice)<0}">{{((pastInsight.soldPrice-pastInsight.initialPrice)/pastInsight.initialPrice).toFixed(2)}} %</td>
      <td><strong>{{pastInsight.performancePoints}} P$</strong></td>
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
    pastInsights: Array
  }
};
</script>

<style lang="css">
</style>
