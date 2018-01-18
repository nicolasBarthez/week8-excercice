<template>

  <section v-if="connectedUser" class="section main sideRecent">
    <div class="primordial">
      <div class="sct1">
        <side-recent-activity  :connectedUser="connectedUser" class="is-sticky" :recentPositions ="recentPositions"></side-recent-activity>
        <div class="babblesField column is-6">
          <stream-publish-babble :connectedUser="connectedUser" @changeBabbles="updateTimelineBabble($event)"></stream-publish-babble>
         <stream-timeline-babble :connectedUser="connectedUser" :babbles="babbles" @sort="changeSort" @changeBabbles="updateTimelineBabble($event)"></stream-timeline-babble>
        </div>
        <side-current-insight  :connectedUser="connectedUser" class="is-sticky" :watchInsight ="watchInsight" @changeWatchlist="updateWatchList($event)"></side-current-insight>
      </div>
    </div>
  </section>
</template>

<script>
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
      recentPositions: null
    };
  },
  props: {
    connectedUser: Object
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

div{
   font-size:1.2rem !important
}
.is-sticky{
   position:sticky
 }
.section.main {
    background-color: #f9f9f9;
    padding: 7rem 1.5rem;
}
.primordial{
  width:100%;
  justify-content: center;
  display: flex;
}
.babblesField{
  margin-right: 2.5%;
  margin-left: 2.5%;
}
.sct1{
  width:100%;
  justify-content: center;
  display: flex;
  max-width: 95%;
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
  .sct1{
    flex-direction: column
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
    width: 45%;
  }
  .columns {
    margin-top: -0.75rem;
  }
}
</style>
