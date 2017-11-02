import Vue from "vue";
import Router from "vue-router";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Signup from "./Signup";
import StockPage from "./StockPage";
import TrendingPage from "./TrendingPage";
import BoardMyCurrentInsights from "./BoardMyCurrentInsights";
import DashboardPage from "./DashboardPage";
import StreamPage from "./StreamPage";
import BoardMyInsidersFollowed from "./BoardMyInsidersFollowed";
import BoardMyWatchList from "./BoardMyWatchList";
import BoardMyPastInsights from "./BoardMyPastInsights";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [{
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
            component: BoardMyCurrentInsights
        },
        {
            path: "/mydashboard/boardmyinsidersfollowed",
            component: BoardMyInsidersFollowed
        },
        {
            path: "/mydashboard/boardmywatchlist",
            component: BoardMyWatchList
        },
        {
            path: "/mydashboard/boardmypastinsights",
            component: BoardMyPastInsights
        },
        {
            path: "/dashboard/:username",
            component: DashboardPage
        },
        {
            path: "/stream",
            component: StreamPage
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

export default router;