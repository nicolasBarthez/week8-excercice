<template>
  <div id="app">

    <Stream-Page-Connect v-if="connectedUser" :connectedUser="connectedUser"></Stream-Page-Connect>
    
    <Stream-Page-Unconnect v-else :langSelected="langSelected"></Stream-Page-Unconnect>

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
    langSelected:""
  },

};
</script>