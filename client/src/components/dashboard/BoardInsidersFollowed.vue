<template>
   <div>
<nav class="navbar is-dark">
      <div v-if="connectedUser">
      <div v-if="connectedUser.lang==='EN'" class="babblesMenu">
            <a  @click="curInsights()" class="babMenu navbar-item is-tab">Current insights</a>
            <a  @click="WatchList()" class="babMenu navbar-item is-tab">Watch list</a>
            <a  @click="PastInsights()"class="babMenu navbar-item is-tab">Past insights</a>
            <a  @click="InsidersFollowed()" class="babMenu navbar-item is-tab is-active">Insiders followed</a>
      </div>
      <div v-else class="babblesMenu">
            <a  @click="curInsights()" class="babMenu navbar-item is-tab ">Positions ouvertes</a>
            <a  @click="WatchList()" class="babMenu navbar-item is-tab ">Liste de suivi</a>
            <a  @click="PastInsights()"class="babMenu navbar-item is-tab ">Positions passées</a>
            <a  @click="InsidersFollowed()" class="babMenu navbar-item is-tab is-active">Insiders suivis</a>
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
                      <router-link :to="'/dashboard/'+props.row.userId" class=""><img class="imgProfile" :src="props.row.picProfile">
                      </router-link>
                    </figure>
                    <router-link :to="'/dashboards/'+props.row.userId" class="stockName is-6" data-replace="Symbol">{{props.row.username}}</router-link>
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
                    <router-link :to="'/stocks/'+props.row.preferedStocks.map(el => el.shortName)[0]"class="stockName is-6" data-replace="Symbol">   {{ props.row.preferedStocks.map(el => el.longName)[0]}}</router-link>
                </b-table-column>

                <b-table-column field='performancePoints' :class="{'has-text-green': props.row.performancePoints>0, 'has-text-red' : props.row.performancePoints<0 }" numeric sortable centered label="Performance Points">
                    {{ props.row.performancePoints.toFixed(0) }} P$
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
            <p id="no">This Insider doesn't follow anybody yet !</p>
        </div>
 </div>

</template>

<script>
import { getInsiderInsidersFollowed } from "@/api/apiDashboard";
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
      perPage: 40,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc"
    };
  },

  created() {
    const insiderId = this.$route.params.id;
    getInsiderInsidersFollowed(insiderId).then(insidersFollowed => {
      this.insidersFollowed = insidersFollowed;
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
.image{
  margin-right: 20px !important;
}
@media (max-width: 768px) {
    .button .icon.is-small {
    height: 1.5em!important;
    width: 1.5em!important;
  }
}
</style>
