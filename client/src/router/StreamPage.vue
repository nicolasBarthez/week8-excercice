<template>
  <div id="app">

    <Stream-Page-Connect v-if="connectedUser" :connectedUser="connectedUser"></Stream-Page-Connect>

    <Stream-Page-Unconnect @changeLang="changeLang($event)" v-else :langSelected="langSelected"></Stream-Page-Unconnect>

  </div>
</template>

<script>
import StreamPageConnect from "@/components/StreamPageConnect";
import StreamPageUnconnect from "@/components/StreamPageUnconnect";
export default {
  components: {
    StreamPageConnect,
    StreamPageUnconnect
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
    document.title =
      "Insiders - Dernières infos sur les actions, crypto,... qui rapportent de l'argent";
  }
};
</script>
