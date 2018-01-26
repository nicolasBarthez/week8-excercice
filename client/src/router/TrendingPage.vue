<template>
    <section class="main">
<nav v-if="connectedUser" class="navbar is-dark">
      <div v-if="connectedUser.lang==='EN'" class="babblesMenu">
            <a  @click="selected()" :class="{'is-active':indexSelected ==='SELECTED' }" class="navbar-item is-tab babMenu">Selected</a>
            <a  @click="cryptocurrencies()" :class="{'is-active':indexSelected ==='CRYPTO' }" class="navbar-item is-tab babMenu">Crypto Currencies</a>
            <a  @click="nasdaq()" :class="{'is-active':indexSelected ==='NASDAQ' }" class="navbar-item is-tab babMenu">Nasdaq</a>
            <a  @click="euronext()" :class="{'is-active':indexSelected ==='EURONEXT PARIS' }"class="navbar-item is-tab babMenu">EuroNext Paris</a>
            <a  @click="cac()" :class="{'is-active':indexSelected ==='CAC40' }" class="navbar-item is-tab babMenu">CAC 40</a>
            <a  @click="sbf()" :class="{'is-active':indexSelected ==='SBF120' }" class="navbar-item is-tab babMenu">SBF 120</a>
      </div>
      <div v-else class="babblesMenu">
            <a  @click="selected()" :class="{'is-active':indexSelected ==='SELECTED' }" class="navbar-item is-tab babMenu">Sélection</a>
            <a  @click="cryptocurrencies()" :class="{'is-active':indexSelected ==='CRYPTO' }" class="navbar-item is-tab babMenu">Crypto Currencies</a>
            <a  @click="nasdaq()" :class="{'is-active':indexSelected ==='NASDAQ' }" class="navbar-item is-tab babMenu">Nasdaq</a>
            <a  @click="euronext()" :class="{'is-active':indexSelected ==='EURONEXT PARIS' }"class="navbar-item is-tab babMenu">EuroNext Paris</a>
            <a  @click="cac()" :class="{'is-active':indexSelected ==='CAC40' }" class="navbar-item is-tab babMenu">CAC 40</a>
            <a  @click="sbf()" :class="{'is-active':indexSelected ==='SBF120' }" class="navbar-item is-tab babMenu">SBF 120</a>
      </div>
    </nav>
    <nav v-else class="navbar is-dark">
      <div v-if="langSelected==='EN'" class="babblesMenu">
            <a  @click="selected()" :class="{'is-active':indexSelected ==='SELECTED' }" class="navbar-item is-tab babMenu">Selected</a>
            <a  @click="cryptocurrencies()" :class="{'is-active':indexSelected ==='CRYPTO' }" class="navbar-item is-tab babMenu">Crypto Currencies</a>
            <a  @click="nasdaq()" :class="{'is-active':indexSelected ==='NASDAQ' }" class="navbar-item is-tab babMenu">Nasdaq</a>
            <a  @click="euronext()" :class="{'is-active':indexSelected ==='EURONEXT PARIS' }"class="navbar-item is-tab babMenu">EuroNext Paris</a>
            <a  @click="cac()" :class="{'is-active':indexSelected ==='CAC40' }" class="navbar-item is-tab babMenu">CAC 40</a>
            <a  @click="sbf()" :class="{'is-active':indexSelected ==='SBF120' }" class="navbar-item is-tab babMenu">SBF 120</a>
      </div>
      <div v-else class="babblesMenu">
            <a  @click="selected()" :class="{'is-active':indexSelected ==='SELECTED' }" class="navbar-item is-tab babMenu">Sélection</a>
            <a  @click="cryptocurrencies()" :class="{'is-active':indexSelected ==='CRYPTO' }" class="navbar-item is-tab babMenu">Crypto Currencies</a>
            <a  @click="nasdaq()" :class="{'is-active':indexSelected ==='NASDAQ' }" class="navbar-item is-tab babMenu">Nasdaq</a>
            <a  @click="euronext()" :class="{'is-active':indexSelected ==='EURONEXT PARIS' }"class="navbar-item is-tab babMenu">EuroNext Paris</a>
            <a  @click="cac()" :class="{'is-active':indexSelected ==='CAC40' }" class="navbar-item is-tab babMenu">CAC 40</a>
            <a  @click="sbf()" :class="{'is-active':indexSelected ==='SBF120' }" class="navbar-item is-tab babMenu">SBF 120</a>
      </div>
    </nav>
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
                <b-table-column v-if="props.row.currentPrice>0" label="Stock" field='longName' sortable centered><router-link :to="'/stocks/'+props.row.shortName"class="stockName has-text-centered is-6" data-replace="Symbol">
                    {{ props.row.longName }}</router-link>
                </b-table-column>

                <b-table-column v-if="props.row.currentPrice>0"  field='currentPrice' sortable numeric centered label="Current price">
                    {{ props.row.currentPrice }}  &nbsp {{props.row.currency}}
                </b-table-column>

                <b-table-column v-if="props.row.currentPrice>0" field='variation' numeric sortable centered :class="{'has-text-green' : props.row.variation > 0, 'has-text-red': props.row.variation<0}" label="Variation">
                    {{ props.row.variation }} %
                </b-table-column>

                <b-table-column v-if="props.row.currentPrice>0" field='volume' numeric sortable centered label="Volume">
                    {{ props.row.volume.toLocaleString() }}
                </b-table-column>

                <b-table-column v-if="props.row.currentPrice>0" field='trending.percentage' numeric sortable centered :class="{'has-text-green' : props.row.trending.trend==='bull', 'has-text-red' : props.row.trending.trend==='bear'}" label="Sentiment">
                    <strong :class="{'has-text-green' :props.row.trending.trend==='bull', 'has-text-red' : props.row.trending.trend==='bear'}">{{props.row.trending.percentage}}%</strong> <small>({{props.row.trending.trend}})</small>
                </b-table-column>

                <b-table-column v-if="props.row.currentPrice>0" field='hotInsights' numeric sortable centered label="Social trending">
                    {{ props.row.hotInsights }}
                </b-table-column>

                <b-table-column v-if="props.row.currentPrice>0" field='bestInsiders[0].perf' sortable centered label="Best insider on it">
                    <router-link v-if="props.row.bestInsiders[0]" :to="'/dashboard/'+props.row.bestInsiders[0].id"><strong >@{{props.row.bestInsiders[0].username}}</strong></router-link><small v-if="props.row.bestInsiders[0]"> ({{props.row.bestInsiders[0].perf.toFixed(0)}} P$)</small>
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
import { getStocksTrending } from "@/api/apiTrending";

const sortParams = {
  longName: "name",
  currentPrice: "price",
  variation: "var",
  volume: "vol",
  "trending.percentage": "trend",
  hotInsights: "hi",
  "bestInsiders[0].perf": "bi"
};

function makeSortParam(field, order) {
  return sortParams[field] + (order === "desc" ? "dsc" : "asc");
}

export default {
  data() {
    return {
      stocks: [],
      indexSelected: "SELECTED",
      total: 0,
      loading: false,
      defaultSortField: "trending.percentage",
      defaultSortOrder: "desc",
      page: 1,
      perPage: 40,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "desc",
    };
  },
  props: {
    langSelected:"",
    connectedUser: Object
  },
  methods: {
    selected() {
      this.indexSelected = "SELECTED";
      getStocksTrending({
        index: this.indexSelected,
        sort: makeSortParam(this.defaultSortField, this.defaultSortOrder)
      }).then(stocks => {
        this.stocks = stocks;
      });
    },
    nasdaq() {
      this.indexSelected = "NASDAQ";
      getStocksTrending({
        index: this.indexSelected,
        sort: makeSortParam(this.defaultSortField, this.defaultSortOrder)
      }).then(stocks => {
        this.stocks = stocks;
      });
    },
    cryptocurrencies() {
      this.indexSelected = "CRYPTO";
      getStocksTrending({
        index: this.indexSelected,
        sort: makeSortParam(this.defaultSortField, this.defaultSortOrder)
      }).then(stocks => {
        this.stocks = stocks;
      });
    },
    euronext() {
      this.indexSelected = "EURONEXT PARIS";
      getStocksTrending({
        index: this.indexSelected,
        sort: makeSortParam(this.defaultSortField, this.defaultSortOrder)
      }).then(stocks => {
        this.stocks = stocks;
      });
    },
    cac() {
      this.indexSelected = "CAC40";
      getStocksTrending({
        index: this.indexSelected,
        sort: makeSortParam(this.defaultSortField, this.defaultSortOrder)
      }).then(stocks => {
        this.stocks = stocks;
      });
    },
    sbf() {
      this.indexSelected = "SBF120";
      getStocksTrending({
        index: this.indexSelected,
        sort: makeSortParam(this.defaultSortField, this.defaultSortOrder)
      }).then(stocks => {
        this.stocks = stocks;
      });
    },
    /*
             * Handle page-change event
             */
    onPageChange(page) {
      this.page = page;
      this.onSort();
    },
    /*
             * Handle sort event
             */
    onSort(field, order) {
      this.loading = true;
      getStocksTrending({
        index: this.indexSelected,
        sort: makeSortParam(field, order)
      }).then(stocks => {
        this.stocks = stocks;
        this.loading = false;
      });
    },
    /*
             * Type style in relation to the value
             */
    type(value) {
      const number = parseFloat(value);
      if (number < 6) {
        return "is-danger";
      } else if (number >= 6 && number < 8) {
        return "is-warning";
      } else if (number >= 8) {
        return "is-success";
      }
    }
  },
  filters: {
    /**
             * Filter to truncate string, accepts a length parameter
             */
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + "..." : value;
    }
  },
  mounted() {
    getStocksTrending({
      index: this.indexSelected,
      sort: makeSortParam(this.defaultSortField, this.defaultSortOrder)
    }).then(stocks => {
      this.stocks = stocks;
    });
  }
};
</script>


<style scoped>
div{
   font-size:1.2rem !important
}
.has-text-centered{
  font-size:1.2rem !important
}
.main {
    background-color: #f9f9f9;
    padding: 7rem 1.5rem;
}
.container{
  display: flex;
}
.crypto{
color:#f7931a!important
}


@media (max-width: 768px) {
  .main {
    background-color: #f9f9f9;
    padding-top:0.5rem  !important;
  }
  div{
   font-size:0.8rem !important
}
.has-text-centered{
  font-size:0.8rem !important
  }
.button .icon.is-small {
    height: 1.5em!important;
    width: 1.5em!important;
  }
  .control{
        height: 30px!important;
        width: 30px!important;
    }
    .navbar.is-dark{
        margin-bottom:3%!important
    }
}
</style>
