<template>
  <nav class="nav has-shadow" id="top">
        <div id="top2">
            <div class="nav">
                <router-link to="/stream" class="nav-item">
                    <img id="logo2" src="/static/images/logoReduct.png" alt="Description">
                    <img id="logo" src="/static/images/logo.png" alt="Description">
                </router-link>
            </div>
            <div v-if="data && connectedUser" class="nav" id="formNav">
                <div class="nav-item field" id="formNav1">
                    <div class="control has-icons-left" id="formNav2">

                        <b-field>
                            <b-autocomplete
                                v-model="name"
                                :placeholder="connectedUser.lang==='EN' ?'Find a stock / crypto':'Retrouver une action / crypto'"
                                :data="filteredDataObj"
                                field="longName"
                                @select="onSelect($event)"
                            >
                            </b-autocomplete>
                        </b-field>

                        <span id="loupe" class="icon is-small is-left">
                          <i id="quicksearch" type="submit"  class="fa fa-search" ></i>
                        </span>
                    </div>
                </div>
            </div>
            <label class="nav-toggle" for="nav-toggle-state" @click="closetoggle()">
                <span></span>
                <span></span>
                <span></span>
            </label>



            <div :class="{'closedToggle':closedState ===false}" class="nav-right nav-menu" >

                <div v-if="connectedUser" id="menu">
                 <router-link  v-for="(link, index) in navbarLinks" :key="index" :to="link.location"
                    class='menu1':class="{'is-active': $route.path === link.location, 'nav-item': true, 'is-tab': true }"> {{ connectedUser.lang==="EN" ? link.text : link.textfr }}
                </router-link>
                </div>
                <div class="nav-profile" v-if="$root.user">
                    <router-link to="/mydashboard" >
                        <div class="image is-32x32 is-circle">
                        <img class ="imgProfile" v-if="connectedUser" :src="connectedUser.picProfile" alt="">
                        </div>
                    </router-link>
                    <div v-if="connectedUser" class="nav-user-profile">
                       <router-link to="/mydashboard" >
                        <div id="nav-username" class="nav-user-name">@{{$root.user.username}}</div>
                       </router-link>
                        <div class="nav-status">
                            <a class="navbar-item" @click.prevent="logout" v-if="$root.user">{{connectedUser.lang==="EN" ? "Logout" : "Déconnexion"}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { getAllStocks } from "@/api/api";
import { logout } from "@/api/auth";
export default {
  name: "NavBar",
  data() {
    return {
      navbarLinks: [
        { location: "/stream", text: "Stream", textfr: "Flux d'actualités" },
        { location: "/trending", text: "Trending", textfr: "Tendance" },
        { location: "/leaderboard", text: "Leaderboard", textfr: "Leaderboard" }
      ],

      data: null,
      name: "",
      selected: null,
      closedState: true
    };
  },
  props: {
    connectedUser: Object
  },
  methods: {
    logout() {
      logout(this.$root);
      this.$router.push("/");
    },
    onSelect(stock) {
      if (stock) {
        this.selected = stock;
        this.$router.push("/stocks/" + stock.shortName.toLowerCase());
      }
    },
    closetoggle() {
      this.closedState = !this.closedState;
    }
  },
  watch: {
    name(name) {
      // CRACRA, PLEASE FIX BUEFY AUTOCOMPLETE
      if (this.selected && name === this.selected.longName) {
        this.name = "";
        this.selected = null;
      }
    },
    $route() {
      this.closedState = true;
    }
  },
  computed: {
    filteredDataObj() {
      if (this.data) {
        return this.data
          .filter(stock => {
            return (
              stock.longName
                .toString()
                .toUpperCase()
                .indexOf(this.name.toUpperCase()) === 0
            );
          })
          .sort();
      }
      return [];
    }
  },
  mounted() {
    getAllStocks().then(data => {
      this.data = data;
    });
  }
};
</script>


<style scoped>
a{
    color:#192b41
}
.icon {
    color: #dbdbdb;
    height: 2em!important;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 2em!important;
}
#nav-toggle-state {
    display: none;
}
.menu1{
    font-size:1.2rem;
}
#nav-toggle-state:checked ~ .nav-menu {
  display: flex;
}
/*nav profile*****************************************/
#logo2{
    display:none
}
.control{
    width:100%!important
}
.is-clearfix{
    width:100%!important
}
.image.is-32x32 {
    height: 45px;
    width: 45px;
}

.nav-profile {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.nav-photo-profil{
    width:12%;
}

.nav-right {
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end!important;
    overflow: hidden!important;

}

.nav-user-name {
    font-size: 1.2rem;
}
.nav-item img {
    max-height: 2.75rem;
}
.nav-status{
    height:1.5rem
}
.navbar-item{
    padding:1%
}
.nav-user-profile{
    padding-left: 10%
}

/*****************************************************/

.nav {
    height: 4.5rem;
}

.section.main {
    background-color: #f9f9f9;
    padding-top: 100px;
}

.hamburger,
.nav-toggle {
    cursor: pointer;
    display: block;
    height: 50px;
    position: relative;
    width: 50px;
}

#top {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    justify-content: center;
}

#top2 {
    display: flex;
    justify-content: space-between;
    display: flex;
    width: 95%;
    -webkit-box-align: stretch;
    align-items: stretch;
    min-height: 3.25rem;
    position: relative;
}

.nav-item .button+.button {
    margin-left: 10px;
}
#logo {
    max-height: 3rem;
}
.nav-item a:not(.button).is-tab.is-active,
a.nav-item:not(.button).is-tab.is-active {
    border-bottom: 3px solid #192b41;
    color: #192b41;
}
.nav-item a:not(.button).is-tab:hover,
a.nav-item:not(.button).is-tab:hover {
    border-bottom-color: #192b41;
    border-top-color: transparent;
}
.button.is-hovered,
.button:hover {
    background-color: #21ce99;
    border-color: transparent;
    color: #fff;
}

.button:focus:not(:active) {
    -webkit-box-shadow: 0 0 0 0.125em #192b41;
    box-shadow: 0 0 0 0.125em #192b41;
}

.button.is-focused,
.button:focus {
    border-color: #192b41;
    color: #363636;
}
#menu {
    display: flex;
    padding-right: 5%;
}
#formNav {
    min-width: 30%!important;
    margin-left: 15%;
}
#formNav1 {
    width: 100%!important;
}
#formNav2 {
    width: 100%!important;
}
.button:focus:not(:active),
.button.is-active,
.button:active,
.button.is-focused,
.button:focus,
.input.is-active,
.input.is-focused,
.input:active,
.input:focus,
.textarea.is-active,
.textarea.is-focused,
.textarea:active,
.textarea:focus {
    box-shadow: 0 0 0 0.125em rgb(25, 43, 65);
    border-color: #192b41;
}

.field{
    margin-bottom: 0px!important;
}
@media screen and (min-width: 769px) {
    .nav-toggle {
        display: none;
    }
}

@media screen and (max-width: 768px) {
    #loupe {
        height: 3em!important;
        width: 3em!important;
    }
    .closedToggle{
        display:flex!important
    }
    #logo{
        display:none
    }
    #logo2{
        display:inherit;
        margin-right: 0.9REM;
    }
    .nav-toggle {
        padding-top: 75px;
    }
    #formNav {
    min-width: 25%!important;
    margin-left:-3%
    }
    #top {
        position: static;
    }
    #top2{
       width: 100%
    }
    .is-32x32 {
        width: 24px !important;
        height: 24px !important;
    }
    .menu1 {
        font-size:0.8rem !important;
        font-weight: 600;
    }
    a.nav-item:not(.button).is-tab {
        padding-left: 0.5rem;
        padding-right: 0.5rem;

    }
    #nav-username{
        font-size:0.8rem !important;
        font-weight: 600;
    }
    .navbar-item{
        font-size:0.8rem !important;
        font-weight: 600;
    }
    .nav-profile {
        margin-right: 2%
    }
    .nav-right {
        justify-content: space-around !important;
        z-index: 5;
    }
}
</style>
