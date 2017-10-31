<template>

  <section v-else class="section main">
    <div class="container">
      <div class="columns">
        <side-current-insight :watchInsight ="watchInsight" @changeWatchlist="updateWatchList($event)"></side-current-insight>
        <div class="column is-6">
          <stream-publish-babble :connectedUser="connectedUser" @changeBabbles="updateTimelineBabble($event)"></stream-publish-babble>
         <stream-timeline-babble :connectedUser="connectedUser" :babbles="babbles" @sort="changeSort" @changeBabbles="updateTimelineBabble($event)"></stream-timeline-babble>
        </div>
        <side-recent-activity :recentPositions ="recentPositions"></side-recent-activity>
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
      connectedUser: null,
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
      getWatchInsight().then(watchInsight => {
        this.watchInsight = watchInsight;
        console.log("AAAAAAwatchInsight", watchInsight);   
      });    

      getRecentPosition().then(recentPositions => {
        this.recentPositions = recentPositions;
      });

    
  },
    updateTimelineBabble() {
      getAllBabbles(this.filterBy).then(babbles =>{ 
      this.babbles = babbles
      });
    },
    changeSort(filterBy) {
      this.filterBy = filterBy;
      getAllBabbles(this.filterBy).then(
        babbles => (this.babbles = babbles)
      );
    },
    
    fetchData() {
      getAllBabbles(this.filterBy).then(babbles =>{ 
        console.log(this.babbles);
        this.babbles = babbles
      });
      getWatchInsight().then(watchInsight => {
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
.section.main {
    background-color: #f9f9f9;
    padding: 7rem 1.5rem;
}
.container{
  display: flex;
}

</style>
