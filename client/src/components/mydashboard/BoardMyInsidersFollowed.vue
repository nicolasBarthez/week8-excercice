<template >
  <table style="width:100%">
    <tr>
      <th>Insider</th>
      <th>Followers</th>
      <th>Babbles posted</th>
      <th>Likes</th>
      <th>Prefered stocks</th>
      <th>P$</th>
    </tr>
    <tr v-for="(insider, i) in insidersFollowed" :key="i">
      <td>
        <figure class="image is-32x32 is-circle">
            <router-link :to="'/dashboard/'+insider._id" class=""><img class="imgProfile" :src="insider.picProfile">
            </router-link>
        </figure>
        <router-link :to="'/dashboards/'+insider._id" class="stockName is-6" data-replace="Symbol">{{insider.username}}</router-link>
      </td>
      <td>{{insider.followers}}</td>
      <td>{{insider.nbBabbles}}</td>
      <td>{{insider.nbOfLikes}}</td>
      <td>{{insider.preferedStocks}}</td>
      <td><strong>{{insider.performancePoints}} P$</strong></td>
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
    insidersFollowed: Array
  }
};
</script>

<style lang="css">
</style>
