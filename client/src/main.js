import Vue from "vue";
import App from "./App";
import router from "./router";
import { checkUser } from "@/api/auth";
import Buefy from "buefy";
import "buefy/lib/buefy.css";
import VeeValidate from "vee-validate";
import lodash from 'lodash'
import VueLodash from 'vue-lodash'

Vue.use(VueLodash, lodash)
Vue.use(Buefy);
Vue.use(VeeValidate);

Vue.config.productionTip = false;

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