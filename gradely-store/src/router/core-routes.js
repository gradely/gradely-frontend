const coreRoutes = [
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: 'coreRoute' */ "../pages/AboutView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () =>
      import(/* webpackChunkName: 'coreRoute' */ "../pages/ContactView.vue"),
  },
];

export default coreRoutes;
