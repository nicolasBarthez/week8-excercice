import Vue from "vue";
import Router from "vue-router";
import LandingPage from "./LandingPage";
import StockPage from "./StockPage";
import TrendingPage from "./TrendingPage";
import DashboardPage from "./DashboardPage";
import StreamPage from "./StreamPage";
import MyDashBoard from "./MyDashBoard";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./NotFound"

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [{
            path: "/",
            component: LandingPage,
            beforeEnter: (to, from, next) => {
                if (router.app.$root.user) next("/trending");
                else next();
            }
        },
        {
            path: "/stocks/:stockName",
            component: StockPage,
            
        },
        {
            path: "/trending",
            component: TrendingPage,
            beforeEnter: (to, from, next) => {
                if (!router.app.$root.user) next("/");
                else next();
            }
        },
        {
            path: "/mydashboard",
            component: MyDashBoard,
            beforeEnter: (to, from, next) => {
                if (!router.app.$root.user) next("/");
                else next();
            }
        },
        {
            path: "/dashboard/:id",
            component: DashboardPage,
            beforeEnter: (to, from, next) => {
                if (!router.app.$root.user) next("/");
                else next();
            }
        },
        {
            path: "/stream",
            component: StreamPage,
            beforeEnter: (to, from, next) => {
                if (!router.app.$root.user) next("/");
                else next();
            }
        },
        {
            path: "/leaderboard",
            component: LeaderBoard,
            beforeEnter: (to, from, next) => {
                if (!router.app.$root.user) next("/");
                else next();
            }
        },
        {
            path: "*",
            component: NotFound,
            beforeEnter: (to, from, next) => {
                if (!router.app.$root.user) next("/");
                else next();
            }
        }
    ],


    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

export default router;