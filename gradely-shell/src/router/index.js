import Vue from "vue";
import VueRouter from "vue-router";
import middlewares from "@/middlewares";

// MODULES ROUTES
import onboardingRoutes from "@/modules/onboarding/onboarding-routes";
import dashboardRoutes from "@/modules/dashboard/dashboard-routes";
import profileRoutes from "@/modules/profile/profile-routes";
import { baseRoutes } from "@/modules/base/router";
import sharedRoutes from "@/shared/shared-routes";
import falseRoutes from "@/modules/false/false-routes";

Vue.use(VueRouter);

const routes = [
  ...onboardingRoutes,
  ...dashboardRoutes,
  ...profileRoutes,
  ...baseRoutes,
  ...sharedRoutes,
  ...falseRoutes,
  {
    path: "/*",
    name: "NotFoundError",
    component: () =>
      import(
        /* webpackChunkName: "errorRoute" */ "@/modules/error/pages/not-found"
      ),
    meta: {
      guest: true,
      access: ["all"],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  duplicateNavigationPolicy: "reload",
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

// NAVIGATION GUARD MIDDLEWARE
router.beforeEach(async (to, from, next) => middlewares(to, from, next));
export default router;
