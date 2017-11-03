import Vue from "vue";
import Router from "vue-router";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Signup from "./Signup";
import StockPage from "./StockPage";
import TrendingPage from "./TrendingPage";
import BoardMyCurrentInsights from "./BoardMyCurrentInsights";
import BoardInsidersCurrentInsights from "./BoardInsidersCurrentInsights";
import BoardInsidersFollowed from "./BoardInsidersFollowed";
import BoardInsidersPastInsights from "./BoardInsidersPastInsights";
import BoardInsidersWatchList from "./BoardInsidersWatchList";
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
            component: StockPage,
            saveScrollPosition: false
        },
        {
            path: "/trending",
            component: TrendingPage
        },
        {
            path: "/mydashboard",
            component: BoardMyCurrentInsights,
            saveScrollPosition: true
        },
        {
            path: "/mydashboard/boardmyinsidersfollowed",
            component: BoardMyInsidersFollowed,
            saveScrollPosition: true
        },
        {
            path: "/mydashboard/boardmywatchlist",
            component: BoardMyWatchList,
            saveScrollPosition: true
        },
        {
            path: "/mydashboard/boardmypastinsights",
            component: BoardMyPastInsights,
            saveScrollPosition: true
        },
        {
            path: "/dashboard/:id",
            component: BoardInsidersCurrentInsights,
        },
        {
            path: "/dashboard/:id/boardinsidersfollowed",
            component: BoardInsidersFollowed,
            saveScrollPosition: true
        },
        {
            path: "/dashboard/:id/boardinsiderswatchlist",
            component: BoardInsidersWatchList,
            saveScrollPosition: true
        },
        {
            path: "/dashboard/:id/boardinsiderspastinsights",
            component: BoardInsidersPastInsights,
            saveScrollPosition: true
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