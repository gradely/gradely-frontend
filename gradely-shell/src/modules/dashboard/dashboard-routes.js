const dashboardRoutes = [
  {
    path: "/home",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/layouts/layout-app-base"),

    children: [
      {
        path: "",
        name: "DashboardHome",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/modules/dashboard/pages/pages-dashboard/dashboard-home"
          ),
        meta: {
          requiresAuth: true,
          type: "Dashboard",
          title: "Home",
          access: ["school"],
        },
      },

      {
        path: "/teacher",
        name: "DashboardTeacher",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/modules/dashboard/pages/pages-dashboard/dashboard-teachers"
          ),
        meta: {
          requiresAuth: true,
          type: "Dashboard",
          title: "Teachers",
          access: ["school"],
        },
      },

      {
        path: "/student",
        name: "DashboardStudent",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/modules/dashboard/pages/pages-dashboard/dashboard-students"
          ),
        meta: {
          requiresAuth: true,
          type: "Dashboard",
          title: "Students",
          access: ["school"],
        },
      },

      {
        path: "/student/activate",
        name: "DashboardActivateStudent",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/modules/dashboard/pages/pages-dashboard/activate-students"
          ),
        meta: {
          requiresAuth: true,
          type: "Dashboard",
          title: "Students",
          access: ["school"],
        },
      },

      {
        path: "/store-apps",
        name: "DashboardAppStore",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/modules/dashboard/pages/pages-dashboard/dashboard-app"
          ),
        meta: {
          requiresAuth: true,
          type: "Dashboard",
          title: "Apps",
          access: ["school"],
        },
      },

      {
        path: "/home/weekly-homework",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/modules/dashboard/pages/pages-weekly/weekly-base"
          ),
        children: [
          {
            path: "",
            name: "WeeklyHomework",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "@/modules/dashboard/components/weekly-comps/weekly-homework"
              ),
            meta: {
              requiresAuth: true,
              type: "Dashboard",
              title: "Home",
              access: ["school"],
            },
          },

          {
            path: "/home/weekly-discussions",
            name: "WeeklyDiscussions",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "@/modules/dashboard/components/weekly-comps/weekly-discussions"
              ),
            meta: {
              requiresAuth: true,
              type: "Dashboard",
              title: "Home",
              access: ["school"],
            },
          },

          {
            path: "/home/weekly-exams",
            name: "WeeklyExams",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "@/modules/dashboard/components/weekly-comps/weekly-exams"
              ),
            meta: {
              requiresAuth: true,
              type: "Dashboard",
              title: "Home",
              access: ["school"],
            },
          },

          {
            path: "/home/weekly-pending-exams",
            name: "WeeklyPendingExams",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "@/modules/dashboard/components/weekly-comps/weekly-pending-exams"
              ),
            meta: {
              requiresAuth: true,
              type: "Dashboard",
              title: "Home",
              access: ["school"],
            },
          },

          {
            path: "/home/weekly-lessons",
            name: "WeeklyLessons",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "@/modules/dashboard/components/weekly-comps/weekly-lesson-notes"
              ),
            meta: {
              requiresAuth: true,
              type: "Dashboard",
              title: "Home",
              access: ["school"],
            },
          },

          {
            path: "/home/weekly-liveclass",
            name: "WeeklyLiveClass",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "@/modules/dashboard/components/weekly-comps/weekly-live-class"
              ),
            meta: {
              requiresAuth: true,
              type: "Dashboard",
              title: "Home",
              access: ["school"],
            },
          },

          {
            path: "/home/weekly-events",
            name: "WeeklyEvents",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "@/modules/dashboard/components/weekly-comps/weekly-events"
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
    ],
  },

  {
    path: "/store-app-description/:id",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "@/modules/dashboard/pages/pages-dashboard/dashboard-app-info"
      ),
    children: [
      {
        path: "",
        name: "DashboardAppDescription",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/modules/dashboard/components/app-info-comps/app-description"
          ),
        meta: {
          requiresAuth: true,
          type: "Dashboard",
          title: "Apps",
          access: ["school"],
        },
      },

      {
        path: "/store-app-support/:id",
        name: "DashboardAppSupport",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/modules/dashboard/components/app-info-comps/app-support"
          ),
        meta: {
          requiresAuth: true,
          type: "Dashboard",
          title: "Apps",
          access: ["school"],
        },
      },

      {
        path: "/store-app-permissions/:id",
        name: "DashboardAppPermissions",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/modules/dashboard/components/app-info-comps/app-permissions"
          ),
        meta: {
          requiresAuth: true,
          type: "Dashboard",
          title: "Apps",
          access: ["school"],
        },
      },
    ],
  },
];

export default dashboardRoutes;
