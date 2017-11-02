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
            backend-sorting
            @sort="onSort">

            <template scope="props">
                <b-table-column label="Insider" field='_id' sortable centered><figure class="image is-32x32 is-circle">
            <router-link :to="'/dashboard/'+props.row._id" class=""><img class="imgProfile" :src="props.row.picProfile">
            </router-link>
        </figure>
        <router-link :to="'/dashboards/'+props.row._id" class="stockName is-6" data-replace="Symbol">{{props.row.username}}</router-link>
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
                    {{props.row.preferedStocks}} 
                </b-table-column>

                <b-table-column field='performancePoints' numeric sortable centered label="Potential P$">
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
  getMyInsidersFollowed,
} from "@/api/apiDashboard";
export default {
  data() {
    return {
      insidersFollowed: [],
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
    };
  },
  components: {
    MyProfileBlock,
    UpdateMyInfo,
  },
  created() {
    getUserProfileInfo().then(profileInfo => {
      this.profileInfo = profileInfo;
    });
    getMyInsidersFollowed().then(insidersFollowed => {
        this.insidersFollowed = insidersFollowed;
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
    getMyInsidersFollowed({
        sort: makeSortParam(field, order)
    }).then(insidersFollowed => {
       this.insidersFollowed = insidersFollowed
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