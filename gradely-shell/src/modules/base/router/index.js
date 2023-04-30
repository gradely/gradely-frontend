import feedRoutes from "@/modules/base/router/feed-routes";
import memberRoutes from "@/modules/base/router/member-routes";
import assessmentRoutes from "@/modules/base/router/assessment-routes";
import reportRoutes from "@/modules/base/router/report-routes";

export const baseRoutes = [
  ...feedRoutes,
  ...memberRoutes,
  ...assessmentRoutes,
  ...reportRoutes,
  {
    path: "/calendar",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "@/layouts/layout-app-sub-base"
      ),

    children: [
      {
        path: "",
        name: "GradelyCalendar",
        component: () =>
          import(
            /* webpackChunkName: "calendar" */ "@/modules/base/pages/calendar/calendar"
          ),
        meta: {
          requiresAuth: true,
          type: "Dashboard",
          title: "My Calendar",
        },
      },
    ],
  },
];
