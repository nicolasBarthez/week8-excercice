<template>
    <section class="main">
 <insider-profile-block :profileInfo="profileInfo"></insider-profile-block>
  <nav class="navbar is-dark">
      <div>
      <div class="babblesMenu">
            <router-link to="/dashboard/:username"class="babMenu navbar-item ">Insider current insights</router-link>
            <router-link to="/dashboard/:username/boardinsiderswatchlist" class="babMenu navbar-item">Insider watch list</router-link>
            <router-link to="/dashboard/:username/boardmyinsiderspastinsights"class="babMenu navbar-item is-tab is-active">Insider insights</router-link>
            <router-link to="/dashboard/:username/boardinsidersfollowed"class="babMenu navbar-item">Insiders followed</router-link>
      </div>
      </div>
  </nav>
        <b-table
            
            :data="pastInsight"
            :loading="loading"

            :paginated="isPaginated"
            :per-page="perPage"
            :pagination-simple="isPaginationSimple"
          
            :total="total"
            @page-change="onPageChange"

            :striped="true"

            :default-sort-direction="defaultSortOrder"
            :default-sort="defaultSortField"
            backend-sorting
            @sort="onSort">

            <template scope="props">
                <b-table-column label="Stock" field='longName' sortable centered><router-link :to="'/stocks/'+props.row.stockId.longName"class="stockName is-6" data-replace="Symbol">
                    {{ props.row.stockId.longName }}</router-link>
                </b-table-column>

                <b-table-column field='position' sortable centered label="Insight">
                    {{ props.row.position }}
                </b-table-column>
                 <b-table-column field='initialPrice' numeric sortable centered label="Initial price">
                    {{ props.row.initialPrice }}
                </b-table-column>

                <b-table-column  field='soldPrice' sortable numeric centered label="Sold price">
                    {{ props.row.sold.price }}
                </b-table-column>

                <b-table-column field='variation' numeric sortable centered :class="{'has-text-green' : (props.row.soldPrice-props.row.initialPrice) > 0, 'has-text-red' : (props.row.soldPrice-props.row.initialPrice)<0}" label="Variation">
                    {{((props.row.soldPrice-props.row.initialPrice)/props.row.initialPrice).toFixed(2)}} %
                </b-table-column><b-table-column field='performancePoints' numeric sortable centered label="Performnce">
                    {{ props.row.performancePoints }}
                </b-table-column>

            </template>
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="sentiment_very_satisfied"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>...loading</p>
                    </div>
                </section>
            </template>
        </b-table>
    </section>
    </section>

</template>

<script>

import InsiderProfileBlock from "../components/dashboard/InsiderProfileBlock";
import {
  getInsiderProfileInfo,
  getInsiderPastInsights,
} from "@/api/apiDashboard";
export default {
  data() {
    return {
      pastInsight: [],
      isEditing: false,
      profileInfo: null,
      indexSelected: "all",
      total: 0,
      loading: false,
      defaultSortField: 'longName',
      defaultSortOrder: 'desc',
      page: 1,
      perPage: 20,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
    }
  },
  components: {
        InsiderProfileBlock,
  },
  created() {
     const insiderId = this.$route.params.id;
    getInsiderProfileInfo(insiderId).then(profileInfo => {
      this.profileInfo = profileInfo;
    });
    getInsiderPastInsights(insiderId).then(pastInsights => {
        this.pastInsights = pastInsights;
      });
  },

  methods:{
  
   onPageChange(page) {
    this.page = page
    this.onSort()
  },
            /*
             * Handle sort event
             */
  onSort(field, order) {
    this.loading = true
     getInsiderPastInsights(this.$route.params.id)({
        sort: makeSortParam(field, order)
    }).then(pastInsights => {
       this.pastInsights = pastInsights
       this.loading = false
    })
    },
           /*
             * Type style in relation to the value
             */
   type(value) {
    const number = parseFloat(value)
      if (number < 6) {
      return 'is-danger'
      } else if (number >= 6 && number < 8) {
      return 'is-warning'
      } else if (number >= 8) {
      return 'is-success'
      }
   }
 },              
 filters: {
            /**
             * Filter to truncate string, accepts a length parameter
             */
  truncate(value, length) {
    return value.length > length
    ? value.substr(0, length) + '...'
    : value
  }
 },
}

</script>

<style scoped>
.main {
    background-color: #f9f9f9;
    padding: 7rem 1.5rem;
}
.container{
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
}

</style>
