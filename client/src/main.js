import Vue from "vue";
import App from "./App";
import router from "./router";
import { checkUser } from "@/api/auth";
import Buefy from "buefy";
import "buefy/lib/buefy.css";
import VeeValidate from "vee-validate";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
import VueYouTubeEmbed from "vue-youtube-embed";
import VueAnalytics from "vue-analytics";

Vue.use(Buefy);
Vue.use(VeeValidate);
Vue.use(Croppa);
Vue.config.productionTip = false;
Vue.use(VueYouTubeEmbed);
Vue.use(VueAnalytics, {
  id: "UA-113240293-1"
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App),
  data: {
    user: null,
    showNav: true
  },
  methods: {
    hideNav() {
      this.showNav = false;
    }
  },

  created() {
    checkUser(this.$root);
  }
});
