<template>
  <div>
<nav class="navbar is-dark">
      <div>
      <div class="babblesMenu">
            <a  @click="curInsights()" class="babMenu navbar-item is-tab ">My current insights</a>
            <a  @click="WatchList()" class="babMenu navbar-item is-tab">My watch list</a>
            <a  @click="PastInsights()"class="babMenu navbar-item is-tab ">My past insights</a>
            <a  @click="InsidersFollowed()" class="babMenu navbar-item is-tab is-active">Insiders I follow</a>
      </div>
      </div>
  </nav>
        <b-table v-if="insidersFollowed.length>0"
            :data="insidersFollowed"
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
                <b-table-column label="Insider" field='_id' sortable centered>
                  <div class="insider">
                    <figure class="image is-32x32 is-circle">
                      <router-link :to="'/dashboard/'+props.row._id" class=""><img class="imgProfile" :src="props.row.picProfile">
                      </router-link>
                    </figure>
                    <router-link :to="'/dashboard/'+props.row._id" class="stockName is-6" data-replace="Symbol">{{props.row.username}}</router-link>
                  </div>
                </b-table-column>

                <b-table-column field='followers' sortable centered label="Followers">
                    {{ props.row.followers }}
                </b-table-column>
                 <b-table-column field='nbBabbles' numeric sortable centered label="Babbles posted">
                    {{ props.row.nbBabbles }}
                </b-table-column>

                <b-table-column  field='nbOfLikes' sortable numeric centered label="Likes">
                    {{ props.row.nbOfLikes }}
                </b-table-column>

                <b-table-column field='preferedStocks' sortable centered label="Prefered stocks">
                  <router-link :to="'/stocks/'+props.row.preferedStocks.map(el => el.longName)[0]"class="stockName is-6" data-replace="Symbol">   {{ props.row.preferedStocks.map(el => el.longName)[0]}}</router-link>                                
                </b-table-column>

                <b-table-column field='performancePoints' numeric sortable centered label="Performance Points">
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
         <div v-else>
            <p id="no">You follow no Insider, find the good ones </p>
        </div>
</div>

</template>

<script>
import { getMyInsidersFollowed } from "@/api/apiDashboard";
export default {
  data() {
    return {
      insidersFollowed: [],
      indexSelected: "all",
      total: 0,
      loading: false,
      defaultSortField: "longName",
      defaultSortOrder: "desc",
      page: 1,
      perPage: 20,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc"
    };
  },
  created() {
    getMyInsidersFollowed(this.$root.user._id).then(insidersFollowed => {
      this.insidersFollowed = insidersFollowed;
    });
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

.insider{
  display:flex;
  align-items:center;
  justify-content:start
}
a{
  color:#192b41
}
#no{
    TEXT-ALIGN: CENTER;
    MARGIN-TOP: 5%;
    font-weight: bold;
    color:#192b41
}
.main {
    background-color: #f9f9f9!important;
    padding: 7rem 1.5rem;
}
.container{
  display: flex;
}

.navbar.is-dark {
    background-color: #192b41!important;
    color: #f9f9f9!important;
}

.navbar-item.is-tab.is-active {
    background-color: transparent;
    border-bottom-color: #f9f9f9!important;
    border-bottom-style: solid!important;
    border-bottom-width: 3px!important;
    color: #f9f9f9!important;
    padding-bottom: calc(0.5rem - 3px)!important;
}
.babblesMenu {
    display: flex;
    overflow:auto;
}

.image{
  margin-right: 20px !important;
}
</style>
