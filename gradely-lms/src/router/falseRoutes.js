const falseRoutes = [
  {
    path: "/",
    name: "FalseQuestionSelect",
    component: () =>
      import(
        /* webpackChunkName: "FalseQuestionSelect" */ "@/pages/false/FalseQuestionSelect"
      ),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/dev-login",
    name: "DevLogin",
    component: () =>
      import(
        /* webpackChunkName: "DevelopmentLogin" */ "@/pages/false/DevLogin"
      ),
    meta: {
      guest: true
    }
  },
  {
    path: "/create-homework/",
    name: "CreateHomeWork",
    component: () =>
      import(/* webpackChunkName: "LMSAPP" */ "@/pages/TemporaryPages/index"),
    meta: {
      requiresAuth: true
    }
  }

  // false route for question select -- added by jeff
];

export default falseRoutes;
