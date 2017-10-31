<template >
<section v-else class="section main">
  <my-profile-block :profileInfo="profileInfo"></my-profile-block>
  <nav class="navbar is-dark">
    <div class="babblesMenu">
      <div v-for="(link, index) in navbarLinks" :key="index" @click="sortBabbles(link.query)" :class="{'is-active': link.text[index], 'nav-item': true, 'is-tab': true }"> {{ link.text }}
      </div>
      <p id="vide"></p>
      <router-link to="/" id="reload1" class="babMenu"><i href="/stream" id="reload" class="navbar-item fa fa-refresh"></i></router-link>
    </div>
  </nav>

</section>
</template>

<script>
import MyProfileBlock from "../components/MyProfileBlock";
import { getUserProfileInfo } from "@/api/apiDashboard";
export default {
  data() {
    return {
      profileInfo: null,
      preferedStocks: null,
      navbarLinks: [
        {
          location: "/myinsights",
          text: "My current insights"
        },
        {
          location: "/mywatchlist",
          text: "My watch list"
        },
        {
          location: "/mypastinsights",
          text: "My past insights"
        },
        {
          location: "/insiderfollowed",
          text: "Insiders I follow"
        }
      ]
    };
  },
  components: {
    MyProfileBlock
  },
  methods: {},
  created() {
    getUserProfileInfo().then(profileInfo => {
      this.profileInfo = profileInfo;
    });
  }
};
</script>

<style scoped>
.section.main {
  background-color: #f9f9f9;
  padding: 7rem 1.5rem;
}

.container {
  display: flex;
}

.navbar.is-dark {
    background-color: #192b41 ;
    color: #f9f9f9 ;
}

@media screen and (min-width: 1024px){
.navbar {
    min-height: 3.25rem;
    }
}
@media screen and (min-width: 1024px){
.navbar, .navbar-end, .navbar-menu, .navbar-start {
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    }
}
.navbar {
    background-color: #fff;
    min-height: 3.25rem;
    position: relative;
}
.babblesMenu{
    display:flex;
    padding-left:20px;
}
</style>
