const reportRoutes = [
  {
    path: "/report/school/:id",
    component: () =>
      import(/* webpackChunkName: "report" */ "@/layouts/layout-app-sidebar"),

    children: [
      {
        path: "",
        name: "GradelySchoolReport",
        component: () =>
          import(
            /* webpackChunkName: "report" */ "@/modules/base/pages/reports/teacher-report"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Report",
          access: ["school"],
        },
      },

      {
        path: "/report/teacher/:id",
        name: "GradelyTeacherReport",
        component: () =>
          import(
            /* webpackChunkName: "report" */ "@/modules/base/pages/reports/teacher-report"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Report",
          access: ["teacher"],
        },
      },

      {
        path: "/report/:id",
        name: "GradelyUserReport",
        component: () =>
          import(
            /* webpackChunkName: "report" */ "@/modules/base/pages/reports/user-report"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Report",
          access: ["parent", "student"],
        },
      },
    ],
  },
];

export default reportRoutes;
