<template>
  <section class="section main sideRecent">
    <div class="primordial">
      <div class="sct1">

        <side-recent-activity-unconnect class="is-3 is-sticky sci" :langSelected="langSelected" :recentPositions ="recentPositions"></side-recent-activity-unconnect>
        <div class="babblesField column is-6">
          <publish-babble-unconnect @signup="fetchData()"  :langSelected="langSelected"></publish-babble-unconnect>
          <stream-timeline-babble-unconnect @signup="fetchData()"  :langSelected="langSelected" :babbles="babbles"></stream-timeline-babble-unconnect>
        </div>
        <side-current-insight-unconnect @signup="fetchData()" :langSelected="langSelected" class="sci"></side-current-insight-unconnect>
     
      </div>
    </div>
  </section>
</template>

<script>
import { getRecentPosition } from "@/api/api";
import { getAllBabbles } from "@/api/api";
import SideRecentActivityUnconnect from "@/components/unconnect/SideRecentActivityUnconnect";
import PublishBabbleUnconnect from "@/components/unconnect/PublishBabbleUnconnect";
import StreamTimelineBabbleUnconnect from "@/components/unconnect/StreamTimelineBabbleUnconnect";
import SideCurrentInsightUnconnect from "@/components/unconnect/SideCurrentInsightUnconnect";

export default {
  data() {
    return {
      filterBy: "all",
      babbles: null,
      recentPositions: null
    };
  },
  props: {
    langSelected:""
  },
  components: {
    PublishBabbleUnconnect,
    StreamTimelineBabbleUnconnect,
    SideRecentActivityUnconnect,
    SideCurrentInsightUnconnect,
  },

  methods: {
    fetchData() {
      getAllBabbles(this.filterBy).then(babbles => {
        this.babbles = babbles;
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

