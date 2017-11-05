<template>
  <div id="app">

    <nav-bar v-if="this.$root.user"></nav-bar>

        <router-view></router-view>

  </div>
</template>

<script>
import { getUser } from "@/api/api";
import { logout } from "@/api/auth";
import NavBar from "./components/NavBar";

export default {
  name: "app",
  components: {
    NavBar
  },

  methods: {
    logout() {
      logout(this.$root);
      this.$router.push("/");
    }
  }
};
</script>
