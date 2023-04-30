import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import middlewares from '@/middlewares';

// MODULES ROUTES
import falseRoutes from '@/router/false-routes';
import mainRoutes from '@/router/main-routes';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  ...mainRoutes,
  ...falseRoutes,
  {
    path: '/*',
    name: 'NotFoundError',
    component: () =>
      import(/* webpackChunkName: "errorRoute" */ '@/pages/not-found.vue'),
    meta: {
      guest: true,
      access: ['all'],
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { selector: to.hash };
    else if (savedPosition) return savedPosition;
    else
      return {
        x: 0,
        y: 0,
      };
  },
});

router.beforeEach(async (to, from, next) => middlewares(to, from, next));

export default router;
