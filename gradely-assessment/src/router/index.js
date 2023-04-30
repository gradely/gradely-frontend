import Vue from "vue";
import VueRouter from "vue-router";
import middlewares from "@/middleware";

Vue.use(VueRouter);

const routes = [
  {
    path: "/start-exam/:id",
    name: "AssessmentInstruction",
    component: () =>
      import(
        /* webpackChunkName: "AssessmentInstruction" */ "@/pages/assesment/instruction"
      ),
    // meta: {
    //   requiresAuth: true,
    // },
  },

  {
    path: "/assessment/:id",
    name: "AssessmentQuestions",
    component: () =>
      import(
        /* webpackChunkName: "AssessmentQuestions" */ "@/pages/assesment/assessment"
      ),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/assessment-questions/:id",
    name: "AssessmentQuestionsv2",
    component: () =>
      import(
        /* webpackChunkName: "AssessmentQuestions" */ "@/pages/assesment/assessment-questions"
      ),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/assessment-proctor",
    name: "AssessmentProctor",
    component: () =>
      import(/* webpackChunkName: "TestProctor" */ "@/pages/test-proctor"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/dev-login",
    name: "DevLogin",
    component: () =>
      import(
        /* webpackChunkName: "DevelopmentLogin" */ "@/pages/false/DevLogin"
      ),
    meta: {
      guest: true,
    },
  },

  {
    path: "/*",
    name: "NotFoundError",
    component: () =>
      import(/* webpackChunkName: "errorRoute" */ "@/pages/not-found"),
    meta: {
      guest: true,
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
