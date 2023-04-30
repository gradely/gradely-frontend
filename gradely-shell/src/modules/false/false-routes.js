const falseRoutes = [
  {
    path: "/",
    name: "FalseBase",
    component: () =>
      import(
        /* webpackChunkName: "falseRoute" */
        "@/modules/false/false-pages/false-base"
      ),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/login",
    name: "FalseLogin",
    component: () =>
      import(
        /* webpackChunkName: "falseRoute" */
        "@/modules/false/pages/false-login"
      ),
    meta: {
      guest: true,
    },
  },

  {
    path: "/dev-login",
    name: "DevLogin",
    component: () =>
      import(
        /* webpackChunkName: "falseRoute" */
        "@/modules/false/pages/dev-login"
      ),
    meta: {
      guest: true,
    },
  },

  {
    path: "/sms/login/:token",
    name: "LoginByToken",
    component: () =>
      import(
        /* webpackChunkName: "falseRoute" */
        "@/modules/false/pages/sms-login"
      ),
    meta: {
      guest: true,
    },
  },

  {
    path: "/false-entry",
    name: "DevEntry",
    component: () =>
      import(
        /* webpackChunkName: "falseRoute" */
        "@/modules/false/pages/false-landing"
      ),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/account",
    name: "FalseAccount",
    component: () =>
      import(
        /* webpackChunkName: "falseRoute" */
        "@/modules/false/false-pages/account"
      ),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/catchup/:id",
    name: "FalseCatchup",
    component: () =>
      import(
        /* webpackChunkName: "falseRoute" */
        "@/modules/false/false-pages/false-catchup"
      ),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/learn/:id",
    name: "FalseLearn",
    component: () =>
      import(
        /* webpackChunkName: "falseRoute" */
        "@/modules/false/false-pages/false-learn"
      ),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/study/live-class/class-entry/:id",
    name: "ClassEntry",
    component: () =>
      import(
        /* webpackChunkName: "EndLiveClass" */
        "@/modules/false/false-pages/false-start-meeting"
      ),
    meta: {
      requiresAuth: true,
      access: ["all"],
    },
  },

  {
    path: "/study/live-class/end-class",
    name: "EndClass",
    component: () =>
      import(
        /* webpackChunkName: "EndLiveClass" */
        "@/modules/false/false-pages/false-end-meeting"
      ),
    meta: {
      requiresAuth: true,
      access: ["all"],
    },
  },

  {
    path: "/live-redirect",
    name: "LiveRedirect",
    component: () =>
      import(
        /* webpackChunkName: "RedirectLiveClass" */
        "@/modules/false/false-pages/live-redirect"
      ),
    meta: {
      requiresAuth: true,
      access: ["all"],
    },
  },
];

export default falseRoutes;
