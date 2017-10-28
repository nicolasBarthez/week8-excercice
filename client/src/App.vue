<template>
  <div id="app">
    <nav-bar v-if="$root.showNav" :connectedUser="connectedUser"></nav-bar>
    
        <router-view></router-view>
     
  </div>
</template>

<script>
import { getUser } from "@/api/api";
import { logout } from '@/api/auth'
import NavBar from './components/NavBar'

export default {
  name: 'app',
  data() {
    return {
      connectedUser:null,
  };
},

  components:{
    NavBar
  },

  methods: {
    logout () {
      logout(this.$root)
      this.$router.push('/')
    }
  },

   created() {
    getUser().then(connectedUser => {
        this.connectedUser =connectedUser;
    });
  }
}
</script>

