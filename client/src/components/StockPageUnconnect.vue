<template>
<div>
<nav-bar-unconnect v-if="!this.$root.user" :langSelected="langSelected" @changeLang="changeLang($event)"></nav-bar-unconnect>
<not-found v-if="stock==='no stock'"></not-found>
  <section v-else class="section main">

<stock-header-unconnect v-if="stock"  :langSelected="langSelected" :stock="stock" :trendBullBear="trendBullBear" @signup="fetchData()" @trendBullBearThirty="fetchData()" @trendBullBearOne="getTrend1($event)" @trendBullBearSeven="getTrend7($event)"></stock-header-unconnect>
     <div class="primordial">
      <div class="sct1">
        <side-recent-activity-unconnect class="is-3 sci" :langSelected="langSelected" :recentPositions ="recentPositions"></side-recent-activity-unconnect>
        <div class="babblesField column is-6">
          <publish-babble-unconnect @signup="fetchData()"  :langSelected="langSelected" :stock="stock? stock:{}"></publish-babble-unconnect>
          <timeline-babble-unconnect @signup="fetchData()"  :langSelected="langSelected" :stock="stock? stock:{}" :babbles="babbles"></timeline-babble-unconnect>
        </div>
        <side-current-insight-unconnect @signup="fetchData()" :langSelected="langSelected" class="sci"></side-current-insight-unconnect>

      </div>
    </div>
    </section>
</div>

</template>

<script>
import { getRecentPosition } from "@/api/api";
import { getStock } from "@/api/api";
import { getStockBabblesUnconnected } from "@/api/api";
import { getTrend } from "@/api/api";
import NotFound from "@/router/NotFound";
import StockHeaderUnconnect from "@/components/unconnect/StockHeaderUnconnect";
import SideRecentActivityUnconnect from "@/components/unconnect/SideRecentActivityUnconnect";
import PublishBabbleUnconnect from "@/components/unconnect/PublishBabbleUnconnect";
import TimelineBabbleUnconnect from "@/components/unconnect/TimelineBabbleUnconnect";
import SideCurrentInsightUnconnect from "@/components/unconnect/SideCurrentInsightUnconnect";
import NavBarUnconnect from "@/components/NavBarUnconnect";

export default {
  data() {
    return {
      filterBy: "all",
      stock: null,
      babbles: null,
      recentPositions: null,
      trendBullBear: [50, 50]
    };
  },
  components: {
    StockHeaderUnconnect,
    PublishBabbleUnconnect,
    TimelineBabbleUnconnect,
    SideRecentActivityUnconnect,
    SideCurrentInsightUnconnect,
    NavBarUnconnect,
    NotFound
  },
  props: {
    langSelected: ""
  },

  methods: {
    changeLang(lang) {
      this.$emit("changeLang", lang);
    },
    updateTimelineBabble() {
      this.fetchData();
    },

    fetchData() {
      const stockName = this.$route.params.stockName;
      getStock(stockName).then(stock => {
        this.stock = stock;
      });

      getStockBabblesUnconnected(stockName, "all").then(babbles => {
        this.babbles = babbles;
      });

      getRecentPosition().then(recentPositions => {
        this.recentPositions = recentPositions;
      });

      getTrend(stockName, 30).then(trendBullBear => {
        this.trendBullBear = trendBullBear;
      });
    },

    getTrend7() {
      this.fetchData();
      getTrend(this.stock.shortName, 7).then(trendBullBear => {
        this.trendBullBear = trendBullBear;
      });
    },

    getTrend1() {
      this.fetchData();
      getTrend(this.stock.shortName, 1).then(trendBullBear => {
        this.trendBullBear = trendBullBear;
      });
    }
  },

  created() {
    this.fetchData();
    setTimeout(() => {
      getStock(this.$route.params.stockName).then(stock => {
        this.stock = stock;
      });
    }, 5000);
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
@media screen and (min-width: 769px){
  .babblesField {
    -webkit-box-flex: 0;
    width: 45%;
  }
  .columns {
    margin-top: -0.75rem;
  }
}
@media (max-width: 768px) {
  .sct1{
    margin-left:0px;
    margin-right:0px;
    flex-direction: column!important
  }
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
  .sci{
    display: none
  }
}
</style>
