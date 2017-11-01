import Vue from "vue";
import Router from "vue-router";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Signup from "./Signup";
import StockPage from "./StockPage";
import TrendingPage from "./TrendingPage";
import MyDashboard from "./MyDashboard";
import DashboardPage from "./DashboardPage";
import StreamPage from "./StreamPage";
import UpdateMyInfo from "./UpdateMyInfo";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: LandingPage
    },
    {
      path: "/login",
      component: Login,
      beforeEnter: (to, from, next) => {
        if (router.app.$root.user) next("/");
        else next();
      }
    },
    {
      path: "/signup",
      component: Signup
    },
    {
      path: "/stocks/:stockName",
      component: StockPage
    },
    {
      path: "/trending",
      component: TrendingPage
    },
    {
      path: "/mydashboard",
      component: MyDashboard
    },
    {
      path: "/dashboard/:username",
      component: DashboardPage
    },
    {
      path: "/stream",
      component: StreamPage
    },
    {
      path: "/mydashboard/edit",
      component: UpdateMyInfo
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

export default router;
