<template >
  <table style="width:100%">
  <tr>
    <th>Stock</th>
    <th>Current price</th>
    <th>Var</th>
    <th>Volume</th>
    <th>Insiders trending</th>
    <th>Hot insights</th>
    <th>Insiders on it</th>
    <th></th>
  </tr>
  <tr v-for="(stock, i) in stocks" :key="i">
    <td>{{stock.longName}}</td>
    <td>{{stock.variation}}</td>
    <td>{{stock.volume}}</td>
    <td  >50</td>
    <td>50</td>
    <td>50</td>
    <td>50</td>
    <td><button class="button is-small is-outlined is-primary">Add to Watchlist</button></td>
  </tr>

</table>

</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    stocks: Array
  }
};
</script>

<style lang="css">
</style>
