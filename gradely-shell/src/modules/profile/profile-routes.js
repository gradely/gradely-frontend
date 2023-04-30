const profileRoutes = [
  {
    path: "/profile/school",
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/layouts/layout-app-base"),

    children: [
      {
        path: "",
        name: "SchoolProfile",
        component: () =>
          import(
            /* webpackChunkName: "profile" */ "@/modules/profile/pages/school-profile"
          ),
        meta: {
          requiresAuth: true,
          type: "Dashboard",
          title: "Home",
          access: ["school"],
        },
      },
    ],
  },

  {
    path: "/profile/student/:id?/:student_id",
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/layouts/layout-app-sub-base"),

    children: [
      {
        path: "",
        name: "StudentProfile",
        component: () =>
          import(
            /* webpackChunkName: "profile" */ "@/modules/profile/pages/student-profile"
          ),
        meta: {
          requiresAuth: true,
          type: "Dashboard",
          title: "Student Profile",
          access: ["school", "teacher"],
        },
        beforeEnter(to, from, next) {
          localStorage.setItem("profile_back_link", from.fullPath);
          next();
        },
      },

      {
        path: "/profile/teacher/:teacher_id",
        name: "TeacherProfile",
        component: () =>
          import(
            /* webpackChunkName: "profile" */ "@/modules/profile/pages/teacher-profile"
          ),
        meta: {
          requiresAuth: true,
          type: "Dashboard",
          title: "Teacher Profile",
          access: ["school"],
        },
      },
    ],
  },
];

export default profileRoutes;
