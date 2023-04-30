const assessmentRoutes = [
  {
    path: "/assessment/published/:id",
    component: () =>
      import(/* webpackChunkName: "members" */ "@/layouts/layout-app-sidebar"),

    children: [
      {
        path: "",
        name: "GradelyAssessmentPublished",
        component: () =>
          import(
            /* webpackChunkName: "members" */ "@/modules/base/pages/assessments/assessment"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Assessments",
          access: ["school", "teacher"],
        },
      },

      {
        path: "/assessment/in-review/:id",
        name: "GradelyAssessmentInReview",
        component: () =>
          import(
            /* webpackChunkName: "members" */ "@/modules/base/pages/assessments/assessment"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Assessments",
          access: ["teacher"],
        },
      },

      {
        path: "/assessment/draft/:id",
        name: "GradelyAssessmentDraft",
        component: () =>
          import(
            /* webpackChunkName: "members" */ "@/modules/base/pages/assessments/assessment"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Assessments",
          access: ["teacher"],
        },
      },

      {
        path: "/assessment/notes/:id",
        component: () =>
          import(
            /* webpackChunkName: "assessments" */ "@/modules/base/layouts/user-assessment-layout"
          ),
        children: [
          {
            path: "",
            name: "GradelyUserNotes",
            component: () =>
              import(
                /* webpackChunkName: "assessments" */ "@/modules/base/pages/assessments/user-notes"
              ),
            meta: {
              requiresAuth: true,
              type: "School Base",
              title: "SchoolWork",
              access: ["parent", "student"],
            },
          },

          {
            path: "/assessment/videos/:id",
            name: "GradelyUserVideos",
            component: () =>
              import(
                /* webpackChunkName: "assessments" */ "@/modules/base/pages/assessments/user-videos"
              ),
            meta: {
              requiresAuth: true,
              type: "School Base",
              title: "SchoolWork",
              access: ["parent", "student"],
            },
          },

          {
            path: "/assessment/new/:id",
            component: () =>
              import(
                /* webpackChunkName: "assessments" */ "@/modules/base/layouts/assessment-status-layout"
              ),
            children: [
              {
                path: "",
                name: "GradelyUserNewAssessment",
                component: () =>
                  import(
                    /* webpackChunkName: "assessments" */ "@/modules/base/pages/assessments/user-new-assessment"
                  ),
                meta: {
                  requiresAuth: true,
                  type: "School Base",
                  title: "SchoolWork",
                  access: ["parent", "student"],
                },
              },

              {
                path: "/assessment/completed/:id",
                name: "GradelyUserCompletedAssessment",
                component: () =>
                  import(
                    /* webpackChunkName: "assessments" */ "@/modules/base/pages/assessments/user-completed-assessment"
                  ),
                meta: {
                  requiresAuth: true,
                  type: "School Base",
                  title: "SchoolWork",
                  access: ["parent", "student"],
                },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/assessment-review/summary/:id/:assessment_id",
    component: () =>
      import(
        /* webpackChunkName: "assessment-review" */ "@/modules/base/layouts/assessment-review-layout"
      ),

    children: [
      {
        path: "",
        name: "AssessmentSummaryReview",
        component: () =>
          import(
            /* webpackChunkName: "assessment-review" */ "@/modules/base/pages/assessments/summary-block"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Assessments",
          access: ["school", "teacher"],
        },
        beforeEnter(to, from, next) {
          ![
            "AssessmentParticipantReview",
            "AssessmentReport",
            "AssessmentGradeReview",
          ].includes(from.name)
            ? localStorage.setItem("assessment_back_link", from.fullPath)
            : null;
          next();
        },
      },

      {
        path: "/assessment-review/participant/:id/:assessment_id",
        name: "AssessmentParticipantReview",
        component: () =>
          import(
            /* webpackChunkName: "assessment-review" */ "@/modules/base/pages/assessments/participant-block"
          ),
        meta: {
          requiresAuth: true,
          type: "School Base",
          title: "Assessments",
          access: ["school", "teacher"],
        },
        beforeEnter(to, from, next) {
          ![
            "AssessmentSummaryReview",
            "AssessmentReport",
            "AssessmentGradeReview",
          ].includes(from.name)
            ? localStorage.setItem("assessment_back_link", from.fullPath)
            : null;
          next();
        },
      },
    ],
  },

  // EXAM ASSESSMENT PENDING REVIEW PAGE
  {
    path: "/assessment/in-review/:id/:assessment_id",
    component: () =>
      import(
        /* webpackChunkName: "assessment-review" */ "@/layouts/layout-app-sub-base"
      ),

    children: [
      {
        path: "",
        name: "AssessmentPendingReview",
        component: () =>
          import(
            /* webpackChunkName: "assessment-review" */ "@/modules/base/pages/assessments/assessment-pending-review"
          ),
        meta: {
          requiresAuth: true,
          type: "Dashboard",
          title: "Review Questions",
          access: ["school", "teacher"],
        },
      },
    ],
  },

  // STUDENTS AND PARENTS
  {
    path: "/assessment-review/:id/:assessment_id",
    name: "AssessmentStudentReview",
    component: () =>
      import(
        /* webpackChunkName: "assessment-review" */ "@/modules/base/pages/assessments/student-assessment-review"
      ),
    meta: {
      requiresAuth: true,
      type: "School Base",
      title: "SchoolWork",
      access: ["parent", "student"],
    },
  },

  {
    path: "/assessment/report/:id/:assessment_id/:student_id",
    name: "AssessmentReport",
    component: () =>
      import(
        /* webpackChunkName: "assessment-review" */ "@/modules/base/pages/assessments/assessment-student-report"
      ),
    meta: {
      requiresAuth: true,
      type: "School Base",
      title: "Assessments",
      access: ["school", "teacher"],
    },
  },

  {
    path: "/assessment/grade-review/:id/:assessment_id/:student_id",
    name: "AssessmentGradeReview",
    component: () =>
      import(
        /* webpackChunkName: "assessment-review" */ "@/modules/base/pages/assessments/assessment-grade-review"
      ),
    meta: {
      requiresAuth: true,
      type: "School Base",
      title: "Assessments",
      access: ["school", "teacher"],
    },
  },
];

export default assessmentRoutes;
