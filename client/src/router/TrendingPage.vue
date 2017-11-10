<template>
    <section class="main">
        <b-table
            :data="stocks"
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

            <template slot-scope="props">
                <b-table-column label="Stock" field='longName' sortable centered><router-link :to="'/stocks/'+props.row.longName"class="stockName is-6" data-replace="Symbol">
                    {{ props.row.longName }}</router-link>
                </b-table-column>

                <b-table-column  field='currentPrice' sortable numeric centered label="Current price">
                    {{ props.row.currentPrice }}
                </b-table-column>

                <b-table-column field='variation' numeric sortable centered :class="{'has-text-green' : props.row.variation > 0, 'has-text-red': props.row.variation<0}" label="Variation">
                    {{ props.row.variation }}
                </b-table-column>

                <b-table-column field='volume' numeric sortable centered label="Volume">
                    {{ props.row.volume.toLocaleString() }}
                </b-table-column>

                <b-table-column field='trending.percentage' numeric sortable centered :class="{'has-text-green' : props.row.trending.trend==='bull', 'has-text-red' : props.row.trending.trend==='bear'}" label="Insiders trending">
                    <strong :class="{'has-text-green' :props.row.trending.trend==='bull', 'has-text-red' : props.row.trending.trend==='bear'}">{{props.row.trending.trend}}</strong> <small>({{props.row.trending.percentage}}%)</small>
                </b-table-column>

                <b-table-column field='hotInsights' numeric sortable centered label="Hot insights">
                    {{ props.row.hotInsights }}
                </b-table-column>

                <b-table-column field='bestInsiders[0].perf' sortable centered label="Insiders on it">
                    <strong v-if="props.row.bestInsiders[0]">@{{props.row.bestInsiders[0].username}}</strong><small v-if="props.row.bestInsiders[0]"> ({{props.row.bestInsiders[0].perf}} points)</small>
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

</template>

<script>
import { getStocksTrending, getStocksTrendingByIndex } from "@/api/apiTrending";

const sortParams = {
    'longName': 'name',
    'currentPrice': 'price',
    'variation':'var',
    'volume':'vol',
    'trending.percentage': 'trend',
    'hotInsights':'hi',
    'bestInsiders[0].perf':'bi'
}

function makeSortParam(field, order) {
    return sortParams[field] + (order === 'desc' ? 'dsc' : 'asc')
}

export default {
  data() {
    return {
      stocks: [],
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
  methods: { 
            /*
             * Handle page-change event
             */
   onPageChange(page) {
    this.page = page
    this.onSort()
  },
            /*
             * Handle sort event
             */
  onSort(field, order) {
    this.loading = true
    getStocksTrending({
        sort: makeSortParam(field, order)
    }).then(stocks => {
       this.stocks = stocks
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
 mounted() {
   getStocksTrending({
       sort: makeSortParam(this.defaultSortField, this.defaultSortOrder)
   }).then(stocks => {
        this.stocks = stocks;
      });
 }
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
a {
  color: #192b41 !important;
}
@media (max-width: 768px) {
  .main {
    background-color: #f9f9f9;
    padding-top:4.2rem  !important;
  }
}
</style>
