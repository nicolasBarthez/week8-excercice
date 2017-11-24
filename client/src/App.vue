<template>
  <div id="app">
    <landing-page v-if="!this.$root.user"></landing-page>
    <nav-bar v-if="this.$root.user"></nav-bar>

        <router-view class="wrapper"></router-view>

  </div>
</template>

<script>
import { getUser } from "@/api/api";
import { logout } from "@/api/auth";
import NavBar from "./components/NavBar";
import LandingPage from "./router/LandingPage"
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
</style>