<template>
  <div>
    <nav class="navbar is-dark">
      <div v-if="connectedUser">
        <div v-if="connectedUser.lang==='EN'" class="babblesMenu"> <a @click="curInsights()" class="babMenu navbar-item is-tab">Current insights</a> <a @click="WatchList()" class="babMenu navbar-item is-tab is-active">Watch list</a> <a @click="PastInsights()" class="babMenu navbar-item is-tab">Past insights</a> <a @click="InsidersFollowed()" class="babMenu navbar-item is-tab">Insiders followed</a> </div>
        <div v-else class="babblesMenu"> <a @click="curInsights()" class="babMenu navbar-item is-tab">Positions ouvertes</a> <a @click="WatchList()" class="babMenu navbar-item is-tab is-active">Liste de suivi</a> <a @click="PastInsights()" class="babMenu navbar-item is-tab">Positions passées</a> <a @click="InsidersFollowed()" class="babMenu navbar-item is-tab">Insiders suivis</a> </div>
      </div>
    </nav>
    <b-table v-if="watchList.length>0" :data="watchList" :loading="loading" :paginated="isPaginated" :per-page="perPage" :pagination-simple="isPaginationSimple" :total="total" @page-change="onPageChange" :striped="true" :default-sort-direction="defaultSortOrder" :default-sort="defaultSortField">
      <template slot-scope="props">
        <b-table-column label="Stock" field='longName' sortable centered>
          <router-link :to="'/stocks/'+props.row.shortName" class="stockName is-6" data-replace="Symbol"> {{ props.row.longName }}</router-link>
        </b-table-column>
        <b-table-column field='currentPrice' sortable numeric centered label="Current price"> {{ props.row.currentPrice }} &nbsp{{ props.row.currency}} </b-table-column>
        <b-table-column field='variation' numeric sortable centered :class="{'has-text-green' : props.row.variation > 0, 'has-text-red': props.row.variation<0}" label="Variation"> {{ props.row.variation }} %</b-table-column>
        <b-table-column field='volume' numeric sortable centered label="Volume"> {{ props.row.volume.toLocaleString() }} </b-table-column>
        <b-table-column field='trending.percentage' numeric sortable centered :class="{'has-text-green' : props.row.trending.trend==='bull', 'has-text-red' : props.row.trending.trend==='bear'}" label="Insiders trending"> <strong :class="{'has-text-green' :props.row.trending.trend==='bull', 'has-text-red' : props.row.trending.trend==='bear'}">{{props.row.trending.trend}}</strong> <small>({{props.row.trending.percentage}}%)</small> </b-table-column>
        <b-table-column field='hotInsights' numeric sortable centered label="Hot insights"> {{ props.row.hotInsights }} </b-table-column>
        <b-table-column field='bestInsiders[0].perf' sortable centered label="Insiders on it"> <strong v-if="props.row.bestInsiders[0]">@{{props.row.bestInsiders[0].username}}</strong><small v-if="props.row.bestInsiders[0]"> ({{props.row.bestInsiders[0].perf}} points)</small> </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="sentiment_very_satisfied" size="is-large"> </b-icon>
            </p>
            <p>...loading</p>
          </div>
        </section>
      </template>
    </b-table>
    <div v-else>
      <p id="no">There is no WatchList for this Insider</p>
    </div>
  </div>
</template>
<script>
import { getInsiderWatchList } from "@/api/apiDashboard";
export default {
  data() {
    return {
      watchList: [],
      indexSelected: "all",
      total: 0,
      loading: false,
      defaultSortField: "longName",
      defaultSortOrder: "desc",
      page: 1,
      perPage: 40,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc"
    };
  },
  created() {
    const insiderId = this.$route.params.id;
    getInsiderWatchList(insiderId).then(watchList => {
      this.watchList = watchList;
    });
  },
  props: {
    connectedUser: Object
  },
  methods: {
    curInsights() {
      this.$emit("curIns");
    },
    WatchList() {
      this.$emit("Watch");
    },
    InsidersFollowed() {
      this.$emit("InsFollo");
    },
    PastInsights() {
      this.$emit("PastIns");
    },
    onPageChange(page) {
      this.page = page;
    }
  }
};
</script>
<style scoped>
#no {
  TEXT-ALIGN: CENTER;
  MARGIN-TOP: 5%;
  font-weight: bold;
  color: #192b41
}

.main {
  background-color: #f9f9f9;
  padding: 7rem 1.5rem;
}

.container {
  display: flex;
}

.navbar.is-dark {
  background-color: #192b41;
  color: #f9f9f9;
}

.navbar-item.is-tab.is-active {
  background-color: transparent;
  border-bottom-color: #f9f9f9;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  color: #f9f9f9;
  padding-bottom: calc(0.5rem - 3px);
}

.babblesMenu {
  display: flex;
  overflow: auto;
}
@media (max-width: 768px) {
    .button .icon.is-small {
    height: 1.5em!important;
    width: 1.5em!important;
  }
  .control{
        height: 30px!important;
    }
    .navbar.is-dark{
        margin-bottom:3%!important
    }
}
</style>
