<template>
<div>
<nav class="navbar is-dark">
      <div>
      <div class="babblesMenu">
            <a  @click="curInsights()" class="babMenu navbar-item is-tab">Current insights</a>
            <a  @click="WatchList()" class="babMenu navbar-item is-tab">Watch list</a>
            <a  @click="PastInsights()"class="babMenu navbar-item is-tab is-active">Past insights</a>
            <a  @click="InsidersFollowed()" class="babMenu navbar-item is-tab">Insiders followed</a>
      </div>
      </div>
    </nav>
        <b-table v-if="pastInsights.length>0"

            :data="pastInsights"
            :loading="loading"

            :paginated="isPaginated"
            :per-page="perPage"
            :pagination-simple="isPaginationSimple"

            :total="total"
            @page-change="onPageChange"

            :striped="true"

            :default-sort-direction="defaultSortOrder"
            :default-sort="defaultSortField"
           >

            <template slot-scope="props">
              <b-table-column field='created' numeric sortable centered label="Initiated">
                    {{ moment(props.row.created_at).format('DD-MM-YYYY') }}
                </b-table-column>
                <b-table-column label="Stock" field='longName' sortable centered><router-link :to="'/stocks/'+props.row.stockId.shortName"class="stockName is-6" data-replace="Symbol">
                    {{ props.row.stockId.longName }}</router-link>
                </b-table-column>

                <b-table-column field='position' :class="{'has-text-green' : props.row.position==='bull', 'has-text-red' : props.row.position==='bear'}" sortable centered label="Insight">
                    {{ props.row.position }}
                </b-table-column>
                 <b-table-column field='initialPrice' numeric sortable centered label="Initial price">
                    {{ props.row.initialPrice }} &nbsp{{ props.row.stockId.currency}}
                </b-table-column>

                <b-table-column  field='soldPrice' sortable numeric centered label="Sold price">
                    {{ props.row.soldPrice }} &nbsp{{ props.row.stockId.currency}}
                </b-table-column>

                <b-table-column v-if=" props.row.position==='bull'" field='variation' numeric sortable centered :class="{'has-text-green' : (props.row.stockId.price-props.row.initialPrice) > 0, 'has-text-red' : (props.row.stockId.price-props.row.initialPrice)<0}" label="Variation">
                    {{100*((props.row.stockId.price-props.row.initialPrice)/props.row.initialPrice).toFixed(4)}} %
                </b-table-column>
                <b-table-column v-else field='variation' numeric sortable centered :class="{'has-text-green' : (props.row.stockId.price-props.row.initialPrice) < 0, 'has-text-red' : (props.row.stockId.price-props.row.initialPrice)>0}" label="Variation">
                    {{100*(-(props.row.stockId.price-props.row.initialPrice)/props.row.initialPrice).toFixed(4)}} %
                </b-table-column>
                <b-table-column field='performancePoints':class="{'has-text-green': props.row.performancePoints>0}" numeric sortable centered label="Performance Points">
                    {{ props.row.performancePoints }} P$
                </b-table-column>
                <b-table-column field='closed' numeric sortable centered label="Closed">
                    {{ moment(props.row.updated_at).format('DD-MM-YYYY') }}
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
        <div v-else>
            <p id="no">There is no Past Position for this Insider</p>
        </div>
  </div>

</template>

<script>
import moment from "moment";
import { getInsiderPastInsights } from "@/api/apiDashboard";
export default {
  data() {
    return {
      pastInsights: [],
      indexSelected: "all",
      total: 0,
      loading: false,
      defaultSortField: "closed",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 20,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc"
    };
  },

  created() {
    const insiderId = this.$route.params.id;
    getInsiderPastInsights(insiderId).then(pastInsights => {
      this.pastInsights = pastInsights;
    });
  },

  methods: {
    moment: function(time) {
      return moment(time);
    },

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
#no{
  TEXT-ALIGN: CENTER;
    MARGIN-TOP: 5%;
    font-weight: bold;
    color:#192b41
}
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
    overflow:auto;
}

</style>
