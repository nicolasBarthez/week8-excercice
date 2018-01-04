import Vue from "vue";
import Router from "vue-router";
import LandingPage from "./LandingPage";
import StockPage from "./StockPage";
import TrendingPage from "./TrendingPage";
import DashboardPage from "./DashboardPage";
import StreamPage from "./StreamPage";
import MyDashBoard from "./MyDashBoard";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./NotFound";
import AdminStock from "./AdminStock";
import AdminUser from "./AdminUser";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: LandingPage
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
      component: MyDashBoard
    },
    {
      path: "/dashboard/:id",
      component: DashboardPage
    },
    {
      path: "/stream",
      component: StreamPage
    },
    {
      path: "/leaderboard",
      component: LeaderBoard
    },
    {
      path: "/admin/users",
      component: AdminUser
    },
    {
      path: "/admin/stocks",
      component: AdminStock
    },
    {
      path: "*",
      component: NotFound
    }
  ],

  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

export default router;
