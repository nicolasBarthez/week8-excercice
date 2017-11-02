<template>
    <section class="main">
  <my-profile-block v-if="!isEditing" @editprofile="changeToEdit()" :profileInfo="profileInfo"></my-profile-block>
  <update-my-info v-if="isEditing" @saveprofile="changeToEdit()" :profileInfo="profileInfo"></update-my-info>
  <nav class="navbar is-dark">
    <div class="babblesMenu">
      <div v-for="(link, index) in navbarLinks" :key="index"  :class="{'is-active': link.text[index], 'nav-item': true, 'is-tab': true }"> {{ link.text }}
      </div>
      <p id="vide"></p>
      <router-link to="/" id="reload1" class="babMenu"><i href="/stream" id="reload" class="navbar-item fa fa-refresh"></i></router-link>
    </div>
  </nav>
  <section class="main">
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

import MyProfileBlock from "../components/mydashboard/MyProfileBlock";
import UpdateMyInfo from "../components/mydashboard/UpdateMyInfo";
import {
  getUserProfileInfo,
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
       navbarLinks: [
        {
          location: "/myinsights",
          text: "My current insights"
        },
        {
          location: "/mywatchlist",
          text: "My watch list"
        },
        {
          location: "/mypastinsights",
          text: "My past insights"
        },
        {
          location: "/insiderfollowed",
          text: "Insiders I follow"
        }
      ]
    }
  },
  components: {
    MyProfileBlock,
    UpdateMyInfo,
  },
  created() {
    getUserProfileInfo().then(profileInfo => {
      this.profileInfo = profileInfo;
    });
    getInsiderPastInsights(this.$root.user._id).then(pastInsights => {
        this.pastInsights = pastInsights;
      });
  },

  methods:{
    changeToEdit() {
      this.isEditing = !this.isEditing;
    },
   onPageChange(page) {
    this.page = page
    this.onSort()
  },
            /*
             * Handle sort event
             */
  onSort(field, order) {
    this.loading = true
    getInsiderPastInsights(insiderId)({
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
a {
  color: #192b41 !important;
}

</style>
