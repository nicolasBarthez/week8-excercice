<template>
  <div id="app">

    <Stock-Page-Connect v-if="connectedUser" :connectedUser="connectedUser"></Stock-Page-Connect>
    
    <Stock-Page-Unconnect @changeLang="changeLang($event)" v-else :langSelected="langSelected"></Stock-Page-Unconnect>

  </div>
</template>

<script>

import StockPageConnect from "@/components/StockPageConnect";
import StockPageUnconnect from "@/components/StockPageUnconnect";
export default {

  components: {
    StockPageConnect,
    StockPageUnconnect
  },
  props: {
    connectedUser: Object,
    langSelected:""
  },
methods: {
    changeLang(lang) {
       this.$emit("changeLang",lang);
    },
   }
};
</script>