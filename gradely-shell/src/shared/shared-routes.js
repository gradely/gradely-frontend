const sharedRoutes = [
  {
    path: "/j",
    name: "joinClassOnInvite",
    component: () =>
      import(
        /* webpackChunkName: "shared" */
        "@/shared/pages/join-class-invite"
      ),
    meta: {
      guest: true,
      title: "Join Class",
      access: ["all"],
    },
  },

  {
    path: "/accept-class-invite/:token",
    name: "AcceptClassInvite",
    component: () =>
      import(
        /* webpackChunkName: "shared" */
        "@/shared/pages/accept-class-invite"
      ),
    meta: {
      guest: true,
      title: "Accept Invite",
      access: ["all"],
    },
  },

  {
    path: "/live/:token",
    name: "joinLiveClass",
    component: () =>
      import(
        /* webpackChunkName: "shared" */
        "@/shared/pages/join-live-class"
      ),
    meta: {
      guest: true,
      title: "Join Live Class",
      access: ["all"],
    },
  },

  {
    path: "/manage-child/:id/:name",
    component: () =>
      import(/* webpackChunkName: "shared" */ "@/layouts/layout-app-sub-base"),

    children: [
      {
        path: "",
        name: "ManageChild",
        component: () =>
          import(
            /* webpackChunkName: "shared" */
            "@/shared/pages/manage-child"
          ),
        meta: {
          requiresAuth: true,
          title: "Manage Child",
          access: ["parent"],
        },
      },

      {
        path: "/manage-class/:id/:name",
        name: "ManageClass",
        component: () =>
          import(
            /* webpackChunkName: "shared" */
            "@/shared/pages/manage-class"
          ),
        meta: {
          requiresAuth: true,
          title: "Manage Class",
          access: ["teacher"],
        },
      },
    ],
  },
];

export default sharedRoutes;
