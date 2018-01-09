<template>
  <section class="main">
    <h1 class= "title">
      Page admin : Suivi des utilisateurs enregistrés
    </h1>
    <p>Il y a actuellement {{userList.length}} utilisateurs enregistrés</p>


</section>

</template>

<script>
import { getLeaderBoard } from "@/api/api";
import { getUsersList } from "@/api/apiAdmin";
export default {
  data() {
    return {
      userList: [],
      indexSelected: "all",
      total: 0,
      loading: false,
      defaultSortField: "performancePoints",
      defaultSortOrder: "desc",
      page: 1,
      perPage: 20,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc"
    };
  },
  created() {
    getUsersList().then(userList => {
      this.userList = userList;
    });
  },

  methods: {
    onPageChange(page) {
      this.page = page;
    }
  }
};
</script>

<style scoped>
.title{
  font-size: 100%;
  font-weight: bold;
  FONT-STYLE: ITALIC
}
.insider{
  display:flex;
  align-items:center;
  justify-content:start;
}
a{
  color:#192b41
}
#no{
    TEXT-ALIGN: CENTER;
    MARGIN-TOP: 5%;
    font-weight: bold;
    color:#192b41
}
.main {
    background-color: #f9f9f9!important;
    padding: 7rem 1.5rem;
}
.container{
  display: flex;
}

.navbar.is-dark {
    background-color: #192b41!important;
    color: #f9f9f9!important;
}

.navbar-item.is-tab.is-active {
    background-color: transparent;
    border-bottom-color: #f9f9f9!important;
    border-bottom-style: solid!important;
    border-bottom-width: 3px!important;
    color: #f9f9f9!important;
    padding-bottom: calc(0.5rem - 3px)!important;
}
.babblesMenu {
    display: flex;
    overflow:auto;
}

.image{
  margin-right: 20px !important;
}

@media (max-width: 768px) {
  .main {
    padding-top:0.5rem  !important;
  }
    .icon {
    height: 1.5em!important;
    width: 1.5em!important;
  }
  .control{
        height: 30px!important;
    }
    .navbar.is-dark{
        margin-bottom:3%!important
    }
}
</style>
