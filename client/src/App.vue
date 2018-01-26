<template>
  <div id="app">

    <nav-bar :connectedUser="connectedUser" v-if="this.$root.user"></nav-bar>
    <nav-bar-unconnect :langSelected="langSelected" @changeLang="changeLang($event)" v-else></nav-bar-unconnect>
    
    <router-view @changeLang="changeLang($event)" :langSelected="langSelected" :connectedUser="connectedUser" class="wrapper"></router-view>

  </div>
</template>

<script>
import { getUser } from "@/api/api";
import { logout } from "@/api/auth";
import NavBar from "@/components/NavBar";
import LandingPage from "@/router/LandingPage";
import NavBarUnconnect from "@/components/NavBarUnconnect";

export default {
  name: "app",
  components: {
    NavBarUnconnect,
    NavBar,
    LandingPage
  },
  data() {
    return {
      connectedUser: null,
      langSelected: "FR"
    };
  },
  methods: {
    logout() {
      logout(this.$root);
      this.$router.push("/");
    },
    changeLang(event){
      this.langSelected=event
    }
  },
  created() {
    getUser().then(user => {
      this.connectedUser = user;
    });
  },
  watch: {
    $route() {
      getUser().then(data => {
        this.connectedUser = data;
      });
    }
  }
};
</script>

<style>
.container {
    max-width: 95%;
}
.has-text-centered{
  font-size:1rem !important
}
@media screen and (min-width: 1408px){
  .container {
    max-width: 95%;
  }
}
@media (max-width: 768px) {
  div{
    font-size:0.8rem !important
  }
  .has-text-centered{
    font-size:0.8rem !important
  }
}
</style>
