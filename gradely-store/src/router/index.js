import Vue from "vue";
import VueRouter from "vue-router";
import coreRoutes from "./core-routes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: 'coreRoute' */ "../pages/HomeView.vue"),
  },
  ...coreRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
