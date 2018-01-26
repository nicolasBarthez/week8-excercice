<template>
<not-found v-if="stock==='no stock'"></not-found>
  <section v-else class="section main">
   <div v-if="connectedUser">
    <stock-header v-if="stock" :stock="stock" :watchItem ="watchItem" :connectedUser="connectedUser" :trendBullBear="trendBullBear" @trendBullBearOne="getTrend1($event)" @trendBullBearSeven="getTrend7($event)" @changeWatchlist="updateWatchList($event)"></stock-header>
    <div class="primordial">
      <div class="sct1">
        <side-recent-activity  :connectedUser="connectedUser" class="is-3 is-sticky sci" :recentPositions ="recentPositions"></side-recent-activity>
        <div class="babblesField column is-6">
          <publish-babble :watchItem ="watchItem" :connectedUser="connectedUser" :stock="stock? stock:{}"  @changeWatchlist="updateWatchList($event)" @changeBabbles="updateTimelineBabble($event)"></publish-babble>
          <timeline-babble :connectedUser="connectedUser" :stock="stock? stock:{}" :babbles="babbles" @sort="changeSort" @changeBabbles="updateTimelineBabble($event)"></timeline-babble>
        </div>
        <side-current-insight  :connectedUser="connectedUser" class="sci" :watchInsight ="watchInsight" @changeWatchlist="updateWatchList($event)"></side-current-insight>
      </div>
    </div>
   </div>

  
     
  </section>

</template>

<script>
import { getRecentPosition } from "@/api/api";
import { getWatchInsight } from "@/api/api";
import { getStock } from "@/api/api";
import { getWatchItem } from "@/api/api";
import { getStockBabbles } from "@/api/api";
import { getTrend } from "@/api/api";
import StockHeader from "@/components/StockHeader";
import SideCurrentInsight from "@/components/SideCurrentInsight";
import TimelineBabble from "@/components/TimelineBabble";
import PublishBabble from "@/components/PublishBabble";
import SideRecentActivity from "@/components/SideRecentActivity";
import NotFound from "@/router/NotFound";

export default {
  data() {
    return {
      filterBy: "all",
      stock: null,
      watchItem: null,
      watchInsight: null,
      babbles: null,
      recentPositions: null,
      trendBullBear: [50, 50]
    };
  },
  components: {
    StockHeader,
    SideCurrentInsight,
    TimelineBabble,
    PublishBabble,
    SideRecentActivity,
    NotFound
  },
  props: {
    connectedUser: Object
  },

  methods: {
    updateWatchList() {
      this.fetchData();
    },
    updateTimelineBabble() {
      this.fetchData();
    },

    changeSort(filterBy) {
      this.filterBy = filterBy;
      getStockBabbles(this.stock.shortName, this.filterBy).then(
        babbles => (this.babbles = babbles)
      );
      this.fetchData();
    },

    fetchData() {
      const stockName = this.$route.params.stockName;
      getStock(stockName).then(stock => {
        this.stock = stock;
      });

      getWatchItem(stockName)
        .then(watchItem => {
          this.watchItem = watchItem;
        })
        .catch(err => {
          throw err;
        });

      getWatchInsight(this.$root.user._id).then(watchInsight => {
        this.watchInsight = watchInsight;
      });

      getStockBabbles(stockName, "all").then(babbles => {
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
.is-sticky{
   position:sticky
 }
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
