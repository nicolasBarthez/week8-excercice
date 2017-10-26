<template>
  <nav class="nav has-shadow " id="top">
        <div class="container" id="top2">
            <div class="nav">
                <a class="nav-item" href="/">
                    <img id="logo" src="/static/images/logo.png" alt="Description">
                </a>
            </div>
            <div class="nav" id="formNav">
                <div class="nav-item field" id="formNav1">
                    <div class="control has-icons-left" id="formNav2">
                        <input id="search-query" name="search" class="input is-hovered" type="text" placeholder="Stock or Username">
                        <span id="loupe" class="icon is-small is-left">
                            <i id="quicksearch" type="submit"  class="fa fa-search" ></i>
                        </span>
                    </div>
                </div>
            </div>
            <label class="nav-toggle" for="nav-toggle-state">
                <span></span>           
                <span></span>
                <span></span>
            </label>

             <!-- This checkbox is hidden -->
             <input type="checkbox" id="nav-toggle-state" />
            
            <div class="nav-right nav-menu">
                <div id="menu">
                 <router-link v-for="(link, index) in navbarLinks" :key="index" :to="link.location"
                    :class="{'is-active': $route.path === link.location, 'nav-item': true, 'is-tab': true }"> {{ link.text }}
                </router-link>
                </div>
                <span class="nav-item">
                 <router-link v-if="!$root.user" to="/login" class="button ">Login</router-link>
                 <router-link v-if="!$root.user" to="/signup" class="button">Signup</router-link>
                </span>
                <div class="nav-profile" v-if="$root.user">
                    <router-link to="/" id="profile-pic">
                        <div class="nav-photo-profil">
                        <img :src="$root.user.picProfile" alt="">
                        </div>
                    </router-link>
                    <div class="nav-user-profile">
                        <div id="nav-username" class="nav-user-name">@{{$root.user.username}}</div>
                        <div class="nav-status">
                            <div class="nav-status-light"></div>
                           <a class="navbar-item" @click.prevent="logout" v-if="$root.user" href="#">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { logout } from '@/api/auth'

export default {
  name: 'NavBar',
    data () {
    return {
      navbarLinks: [
        { location: '/stream', text: 'Stream' },
        { location: '/trending', text: 'Trending' },
        { location: '/dashboard', text: 'My Dashboard' },
      ],
    }
  },

  methods: {
    logout () {
      logout(this.$root)
      this.$router.push('/')
    },
     }
}

</script>

<style>

#nav-toggle-state {
  display: none;
}

#nav-toggle-state:checked ~ .nav-menu {
  display: flex;
}
/*nav profile*****************************************/

.nav-profile {
    display: flex;
    align-items: center;
    display: flex;
    justify-content: flex-end;
}

.nav-photo-profil>img {
    width: auto;
    border: 1px solid black;
    border-radius: 50%;
}

.nav-user-name {
    font-size: 1rem;
}
.nav-item img {
    max-height: 2.75rem;
}


/*****************************************************/

.nav {
    height: 4.5rem;
    padding-right: 30px;
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
}

#top2 {
    display: flex;
    justify-content: space-between;
}


@media screen and (max-width: 768px) {
    #top {
        position: static;
    }
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
    box-shadow: 0 0 0 0.125em rgba#192b41;
}

.button.is-focused,
.button:focus {
    border-color: #192b41;
    color: #363636;
}
#menu {
    display: flex;
}
#formNav {
    width: 350PX;
    margin-left: 45PX;
}
#formNav1 {
    width: 100%;
}
#formNav2 {
    width: 100%;
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
@media screen and (min-width: 769px) {
    .nav-toggle {
        display: none;
    }
}

@media screen and (max-width: 768px) {
    .nav-toggle {
        padding-top: 75px;
    }
}

</style>
