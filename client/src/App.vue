<template>
  <div id="app">

    <nav-bar v-if="this.$root.user"></nav-bar>

        <router-view class="wrapper"></router-view>

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

<style>
@media (max-width: 768px) {   
  .wrapper {
    transform: translateX(0) translateZ(0);
    transition: transform .2s;
    will-change: transform;
  }  
   div:target .wrapper {
    transform: translateY(19rem); /* based on navigation's height */
  }
  .nav-button-close,
  div:target .nav-button-open {
    display: none;
  }
  .nav-button-open,
  div:target .nav-button-close {
    display: block;
  }
}
</style>
