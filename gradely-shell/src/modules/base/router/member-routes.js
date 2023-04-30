const memberRoutes = [
  {
    path: "/members/students/:id",
    component: () =>
      import(/* webpackChunkName: "members" */ "@/layouts/layout-app-sidebar"),

    children: [
      {
        path: "",
        name: "GradelyStudents",
        component: () =>
          import(
            /* webpackChunkName: "members" */ "@/modules/base/pages/members/members-listing"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Members",
          access: ["school"],
        },
      },

      {
        path: "/students/:id",
        name: "GradelyClassStudents",
        component: () =>
          import(
            /* webpackChunkName: "members" */ "@/modules/base/pages/members/members-listing"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Students",
          access: ["teacher"],
        },
      },

      {
        path: "/members/teachers/:id",
        name: "GradelyTeachers",
        component: () =>
          import(
            /* webpackChunkName: "members" */ "@/modules/base/pages/members/members-listing"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Members",
          access: ["school"],
        },
      },
    ],
  },
];

export default memberRoutes;
