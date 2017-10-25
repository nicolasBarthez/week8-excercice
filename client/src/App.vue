<template>
  <div id="app">
    <nav-bar v-if="$root.showNav"></nav-bar>
    
        <router-view></router-view>
     
  </div>
</template>

<script>
import { logout } from '@/api/auth'
import NavBar from './components/NavBar'

export default {
  name: 'app',
  
  components:{
    NavBar
  },

  methods: {
    logout () {
      logout(this.$root)
      this.$router.push('/')
    }
  }
}
</script>

