<template>

  <section v-else class="section main sideRecent">
    <div class="container primordial">
      <div class="columns">
        <side-recent-activity  class="is-sticky" :recentPositions ="recentPositions"></side-recent-activity>
        <div class="babblesField column is-6">
          <stream-publish-babble :connectedUser="connectedUser" @changeBabbles="updateTimelineBabble($event)"></stream-publish-babble>
         <stream-timeline-babble :connectedUser="connectedUser" :babbles="babbles" @sort="changeSort" @changeBabbles="updateTimelineBabble($event)"></stream-timeline-babble>
        </div>
        <side-current-insight  class="is-sticky" :watchInsight ="watchInsight" @changeWatchlist="updateWatchList($event)"></side-current-insight>
      </div>
    </div>
  </section>
</template>

<script>
import { getUser } from "@/api/api";
import { getRecentPosition } from "@/api/api";
import { getWatchInsight } from "@/api/api";
import { getAllBabbles } from "@/api/api";
import SideCurrentInsight from "../components/SideCurrentInsight";
import StreamTimelineBabble from "../components/StreamTimelineBabble";
import StreamPublishBabble from "../components/StreamPublishBabble";
import SideRecentActivity from "../components/SideRecentActivity";

export default {
  data() {
    return {
      filterBy: "all",
      watchItem: null,
      watchInsight: null,
      babbles: null,
      recentPositions: null,
      connectedUser: null
    };
  },
  components: {
    SideCurrentInsight,
    StreamTimelineBabble,
    StreamPublishBabble,
    SideRecentActivity
  },

  methods: {
    updateWatchList() {
      const userId = this.$root.user._id;
      getWatchInsight(userId).then(watchInsight => {
        this.watchInsight = watchInsight;
      });

      getRecentPosition().then(recentPositions => {
        this.recentPositions = recentPositions;
      });
    },
    updateTimelineBabble() {
      getAllBabbles(this.filterBy).then(babbles => {
        this.babbles = babbles;
      });
    },
    changeSort(filterBy) {
      this.filterBy = filterBy;
      getAllBabbles(this.filterBy).then(babbles => (this.babbles = babbles));
    },

    fetchData() {
      getAllBabbles(this.filterBy).then(babbles => {
        this.babbles = babbles;
      });
      getWatchInsight(this.$root.user._id).then(watchInsight => {
        this.watchInsight = watchInsight;
      });
      getRecentPosition().then(recentPositions => {
        this.recentPositions = recentPositions;
      });
      getUser().then(connectedUser => {
        this.connectedUser = connectedUser;
      });
    }
},
  created() {
    this.fetchData();
  },
  watch: {
    $route() {
      this.fetchData();
    }
  }
};
</script>

<style scoped>

.is-sticky{
   position:sticky
 }
.section.main {
    background-color: #f9f9f9;
    padding: 7rem 1.5rem;
}
.container{
  display: flex;
}
.primordial{
  width:100%
}

.babblesField{
  margin-right: 2.5%;
  margin-left: 2.5%;
}
@media (max-width: 768px) {
  .main {
    background-color: #f9f9f9;
    padding-top:0.5rem  !important;
    margin-left:0px !important;
    margin-right: 0px !important;
    padding-left: 0px !important;
    padding-right:0px !important
  }
  .columns{
    margin-left:0px !important;
    margin-right: 0px !important;
    padding-left: 0px !important;
    padding-right:0px !important
  }
  .column{
    margin-left:0px !important;
    margin-right: 0px !important;
    padding-left: 0px !important;
    padding-right:0px !important
  }
}
@media screen and (min-width: 769px){
  .babblesField {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    width: 45%;
  }
  .sci{
    display: none
  }
   .sct1{
    margin-left:0px;
    margin-right:0px;
  }

}
</style>
