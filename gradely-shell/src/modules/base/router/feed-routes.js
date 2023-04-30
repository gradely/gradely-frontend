const feedRoutes = [
  {
    path: "/feed/:id",
    component: () =>
      import(/* webpackChunkName: "feeds" */ "@/layouts/layout-app-sidebar"),

    children: [
      {
        path: "",
        name: "GradelyFeeds",
        component: () =>
          import(
            /* webpackChunkName: "feeds" */
            "@/modules/base/pages/feeds/feed-timeline"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Feed",
          access: ["all"],
        },
      },
    ],
  },

  {
    path: "/library/video/:id",
    component: () =>
      import(/* webpackChunkName: "feeds" */ "@/layouts/layout-app-sub-base"),

    children: [
      {
        path: "",
        name: "GradelyLibraryVideo",
        component: () =>
          import(
            /* webpackChunkName: "feeds" */
            "@/modules/base/pages/feeds/library-video"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Class Videos",
          access: ["school", "teacher"],
          back_link: (route) => `/feed/${route.params.id}`,
        },
      },

      {
        path: "/library/document/:id",
        name: "GradelyLibraryDocument",
        component: () =>
          import(
            /* webpackChunkName: "feeds" */
            "@/modules/base/pages/feeds/library-document"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Shared Documents",
          access: ["school", "teacher"],
          back_link: (route) => `/feed/${route.params.id}`,
        },
      },

      {
        path: "/library/discussion/:id",
        name: "GradelyLibraryDiscussion",
        component: () =>
          import(
            /* webpackChunkName: "feeds" */
            "@/modules/base/pages/feeds/library-discussion"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Class Discussions",
          access: ["school", "teacher"],
          back_link: (route) => `/feed/${route.params.id}`,
        },
      },

      {
        path: "/library/assessment/:id",
        name: "GradelyLibraryAssessment",
        component: () =>
          import(
            /* webpackChunkName: "feeds" */
            "@/modules/base/pages/feeds/library-assessment"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Class Assessments",
          access: ["school", "teacher"],
          back_link: (route) => `/feed/${route.params.id}`,
        },
      },
    ],
  },

  {
    path: "/post/:token",
    name: "GradelyFeedThread",
    component: () =>
      import(
        /* webpackChunkName: "feeds" */
        "@/modules/base/pages/feeds/feed-thread"
      ),
    meta: {
      title: "Post View",
    },
  },

  {
    path: "/summer-courses/:id",
    name: "GradelySummerCourses",
    component: () =>
      import(
        /* webpackChunkName: "feeds" */
        "@/modules/base/pages/feeds/summer-courses"
      ),
    meta: {
      title: "Summer Courses",
    },
  },

  {
    path: "/course-info/:id/:slug",
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/layouts/layout-app-sub-base"),

    children: [
      {
        path: "",
        name: "GradelySummerCourseInfo",
        component: () =>
          import(
            /* webpackChunkName: "feeds" */
            "@/modules/base/pages/feeds/summer-course-info"
          ),
        meta: {
          title: "Course Description",
        },
        beforeEnter(to, from, next) {
          localStorage.setItem("profile_back_link", from.fullPath);
          next();
        },
      },
    ],
  },
];

export default feedRoutes;
