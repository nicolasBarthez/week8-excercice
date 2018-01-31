<template>
  <div id="app">

    <Stock-Page-Connect v-if="connectedUser" :connectedUser="connectedUser"></Stock-Page-Connect>

    <Stock-Page-Unconnect @changeLang="changeLang($event)" v-else :langSelected="langSelected"></Stock-Page-Unconnect>

  </div>
</template>

<script>
import StockPageConnect from "@/components/StockPageConnect";
import StockPageUnconnect from "@/components/StockPageUnconnect";
import { getStock } from "@/api/api";
export default {
  components: {
    StockPageConnect,
    StockPageUnconnect
  },
  data() {
    return { stock: null };
  },
  props: {
    connectedUser: Object,
    langSelected: ""
  },
  methods: {
    changeLang(lang) {
      this.$emit("changeLang", lang);
    }
  },
  created() {
    getStock(this.$route.params.stockName).then(stock => {
      this.stock = stock;
      document.title = `Retrouver les cours et les dernières infos sur ${this
        .stock.longName} du ${this.stock.index} - Insiders finance`;
    });
  }
};
</script>
