const errorRoutes = [
  {
    path: "/*",
    name: "NotFoundError",
    component: () =>
      import(/* webpackChunkName: "errorRoute" */ "@/pages/NotFound")
  }
];

export default errorRoutes;
