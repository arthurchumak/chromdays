/* eslint-disable no-undef */
import Vue from "vue";
import Router from "vue-router";
import dayjs from "dayjs";

import Day from "./views/Day";
import Goal from "./views/Goal";
import Goals from "./views/Goals";
import Layout from "./views/Layout";
import Login from "./views/Login";
import Month from "./views/Month";
import NewGoal from "./views/NewGoal";
import Profile from "./views/Profile";
import ErrorPage from "./views/Error";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "layout",
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/",
          name: "home",
          component: Goals
        },
        {
          path: "/goal/new",
          name: "newgoal",
          component: NewGoal
        },
        {
          path: "/goal/:id",
          name: "goal",
          component: Goal,
          children: [
            {
              path: ":year/:month",
              name: "goalMonth",
              component: Month
            },
            {
              path: ":year/:month/:date",
              name: "rate",
              component: Day
            },
            {
              path: "/",
              redirect: to => {
                const today = dayjs();
                return {
                  name: "goalMonth",
                  params: {
                    id: to.params.id,
                    year: today.year(),
                    month: today.month()
                  }
                };
              }
            },
          ]
        },
        {
          path: "/profile",
          name: "profile",
          component: Profile
        }
      ]
    },
    {
      path: "/index.html",
      redirect: '/'
    },
    {
      path: "*",
      component: ErrorPage,
    }
  ]
});


export default router;
