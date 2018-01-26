<template>
  <section v-if="connectedUser" class="main">
    <h1 class= "title">
      {{connectedUser.lang==="EN"?"Best insiders: Follow their advice and earn money":"Les meilleurs Insiders : Suivez leurs conseils et devenez un meilleur trader !"}}
    </h1>
        <b-table v-if="leaderBoard"
            :data="leaderBoard"
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
                <b-table-column label="Insider" centered field='userId'>
                  <div class="insider">
                    <figure class="image is-32x32 is-circle">
                      <router-link :to="'/dashboard/'+props.row.userId" class=""><img class="imgProfile" :src="props.row.picProfile">
                      </router-link>
                    </figure>
                    <router-link :to="'/dashboard/'+props.row.userId" class="stockName is-6" data-replace="Symbol">{{props.row.username}}</router-link>
                  </div>
                </b-table-column>

                <b-table-column field='followers' numeric sortable centered label="Followers">
                    {{ props.row.followers }}
                </b-table-column>
                 <b-table-column field='nbBabbles' numeric sortable centered label="Babbles posted">
                    {{ props.row.nbBabbles }}
                </b-table-column>

                <b-table-column  field='nbOfLikes' sortable numeric centered label="Likes">
                    {{ props.row.nbOfLikes }}
                </b-table-column>

                <b-table-column field='preferedStocks'centered label="Prefered stocks">
                  <router-link :to="'/stocks/'+props.row.preferedStocks.map(el => el.shortName)[0]"class="stockName is-6" data-replace="Symbol">   {{ props.row.preferedStocks.map(el => el.longName)[0]}}</router-link>
                </b-table-column>

                <b-table-column field='performancePoints' numeric sortable centered label="Performance Points">
                    {{ props.row.performancePoints.toFixed(0)  }} P$
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
 <section v-else class="main">
    <nav-bar-unconnect v-if="!this.$root.user" :langSelected="langSelected" @changeLang="changeLang($event)"></nav-bar-unconnect>

    <h1 class= "title">
      {{langSelected==="EN"?"Best insiders: Follow their advice and earn money":"Les meilleurs Insiders : Suivez leurs conseils et devenez un meilleur trader !"}}
    </h1>
        <b-table v-if="leaderBoard"
            :data="leaderBoard"
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
                <b-table-column label="Insider" centered field='userId'>
                  <div  @click="SignupModal" class="insider">
                    <figure class="image is-32x32 is-circle">
                    </figure>
                    {{props.row.username}}
                  </div>
                </b-table-column>

                <b-table-column field='followers' numeric sortable centered label="Followers">
                    {{ props.row.followers }}
                </b-table-column>
                 <b-table-column field='nbBabbles' numeric sortable centered label="Babbles posted">
                    {{ props.row.nbBabbles }}
                </b-table-column>

                <b-table-column  field='nbOfLikes' sortable numeric centered label="Likes">
                    {{ props.row.nbOfLikes }}
                </b-table-column>

                <b-table-column field='preferedStocks'centered label="Prefered stocks">
                  <router-link :to="'/stocks/'+props.row.preferedStocks.map(el => el.shortName)[0]"class="stockName is-6" data-replace="Symbol">   {{ props.row.preferedStocks.map(el => el.longName)[0]}}</router-link>
                </b-table-column>

                <b-table-column field='performancePoints' numeric sortable centered label="Performance Points">
                    {{ props.row.performancePoints.toFixed(0)  }} P$
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
        <!-- SIGN UP MODAL -->
        <b-modal :active.sync="isSignupModalActive" :width="640">
          <signup-modal @loginModal.capture="LoginModal($event)"></signup-modal>
        </b-modal>

        <!-- LOG IN MODAL -->
        <b-modal :active.sync="isLoginModalActive" :width="640">
          <login-modal :autenticate="autenticate" @closeLoginModal="closeLoginModal()"></login-modal>
        </b-modal>
</section>

</template>

<script>
import SignupModal from "@/components/SignupModal";
import LoginModal from "@/components/LoginModal";
import { getLeaderBoard } from "@/api/api";
import NavBarUnconnect from "@/components/NavBarUnconnect";

export default {
  components: {
    SignupModal,
    LoginModal,
    NavBarUnconnect,
  },
  data() {
    return {
      isSignupModalActive: false,
      isLoginModalActive: false,
      autenticate: "",
      leaderBoard: [],
      indexSelected: "all",
      total: 0,
      loading: false,
      defaultSortField: "performancePoints",
      defaultSortOrder: "desc",
      page: 1,
      perPage: 20,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
    };
  },
  props: {
    langSelected:"",
    connectedUser: Object
  },
  created() {
    getLeaderBoard().then(leaderBoard => {
      this.leaderBoard = leaderBoard;
    });
  },

  methods: {
    changeLang(lang) {
       this.$emit("changeLang",lang);
    },
    onPageChange(page) {
      this.page = page;
    },
    SignupModal() {
      this.isLoginModalActive = false;
      this.isSignupModalActive = true;
      this.$emit("signup");
    },
    LoginModal(autenticate) {
      this.isSignupModalActive = false;
      this.autenticate = autenticate;
      this.isLoginModalActive = true;
    },
    closeLoginModal() {
      this.isLoginModalActive = false;
    }
  }
};
</script>

<style scoped>
.title{
  font-size: 100%;
  font-weight: bold;
  FONT-STYLE: ITALIC
}
.insider{
  display:flex;
  align-items:center;
  justify-content:start;
  cursor: pointer;
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

@media (max-width: 768px) {
  .main {
    padding-top:0.5rem  !important;
  }
    .icon {
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
