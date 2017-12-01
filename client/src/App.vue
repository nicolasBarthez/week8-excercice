<template>
  <div id="app">

    <nav-bar v-if="this.$root.user"></nav-bar>
    <landing-page v-if="!this.$root.user"></landing-page>
    <router-view v-else class="wrapper"></router-view>

  </div>
</template>

<script>
import { getUser } from "@/api/api";
import { logout } from "@/api/auth";
import NavBar from "./components/NavBar";
import LandingPage from "./router/LandingPage";
export default {
  name: "app",
  components: {
    NavBar,
    LandingPage
  },
  methods: {
    logout() {
      logout(this.$root);
      this.$router.push("/");
    }
  }
};
</script>

<style>
.container {
    max-width: 95%;
}
div{
   font-size:1rem !important
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
