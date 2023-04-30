const onboardingRoutes = [
  {
    path: "/onboarding/verify-account",
    name: "GradelyVerify",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/global-onboarding/verification-dialog"
      ),
    meta: {
      requiresAuth: true,
      access: ["all"],
    },
  },

  {
    path: "/onboarding/welcome",
    name: "GradelyWelcome",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/global-onboarding/welcome-dialog"
      ),
    meta: {
      requiresAuth: true,
      access: ["all"],
    },
  },

  /**
   * SCHOOL ONBOARDING ROUTES
   */
  {
    path: "/onboarding/school-setup",
    name: "SchoolSetup",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/school-onboarding/school-setup"
      ),
    meta: {
      requiresAuth: true,
      access: ["school"],
    },
  },

  /**
   * TEACHER ONBOARDING ROUTES
   */
  {
    path: "/onboarding/connect-school",
    name: "TeacherConnectSchool",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/teacher-onboarding/connect-school"
      ),
    meta: {
      requiresAuth: true,
      access: ["teacher", "student", "parent"],
    },
  },

  {
    path: "/onboarding/invite-school",
    name: "TeacherInviteSchool",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/teacher-onboarding/invite-school"
      ),
    meta: {
      requiresAuth: true,
      access: ["teacher"],
    },
  },

  {
    path: "/onboarding/create-class",
    name: "TeacherCreateClass",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/teacher-onboarding/create-class"
      ),
    meta: {
      requiresAuth: true,
      access: ["teacher"],
    },
  },

  {
    path: "/onboarding/select-subject/:global_class_id/:class_id",
    name: "TeacherSelectSubject",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/teacher-onboarding/select-subject"
      ),
    meta: {
      requiresAuth: true,
      access: ["teacher"],
    },
  },

  /**
   * PARENT ONBOARDING ROUTES
   */
  {
    path: "/onboarding/add-child",
    name: "ParentAddChild",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/parent-onboarding/add-child"
      ),
    meta: {
      requiresAuth: true,
      access: ["parent"],
    },
  },

  {
    path: "/onboarding/connect-child",
    name: "ParentConnectChild",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/parent-onboarding/connect-child"
      ),
    meta: {
      requiresAuth: true,
      access: ["parent"],
    },
  },

  /**
   * STUDENT ONBOARDING ROUTES
   */
  {
    path: "/onboarding/setup-class",
    name: "StudentSetupClass",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/student-onboarding/create-child-class"
      ),
    meta: {
      requiresAuth: true,
      access: ["student"],
    },
  }, // DEPRECEATED

  {
    path: "/onboarding/find-your-school",
    name: "StudentFindSchool",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/student-onboarding/find-child-school"
      ),
    meta: {
      requiresAuth: true,
      access: ["student", "parent"],
    },
  },

  {
    path: "/onboarding/invite-child-school",
    name: "StudentInviteSchool",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/student-onboarding/invite-child-school"
      ),
    meta: {
      requiresAuth: true,
      access: ["student", "parent"],
    },
  },

  {
    path: "/onboarding/confirm-child-subject",
    name: "StudentConfirmSubject",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/student-onboarding/confirm-child-subject"
      ),
    meta: {
      requiresAuth: true,
      access: ["student"],
    },
  },

  {
    path: "/onboarding/security-question",
    name: "StudentSecurityQuestion",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/student-onboarding/security-question"
      ),
    meta: {
      requiresAuth: true,
      access: ["student"],
    },
  },

  {
    path: "/onboarding/select-avatar",
    name: "StudentSelectAvatar",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/student-onboarding/avatar-selection"
      ),
    meta: {
      requiresAuth: true,
      access: ["student"],
    },
  },

  {
    path: "/onboarding/parent-invitation",
    name: "StudentParentInvitation",
    component: () =>
      import(
        /* webpackChunkName: "onboarding" */
        "@/modules/onboarding/pages/student-onboarding/parent-invitation"
      ),
    meta: {
      requiresAuth: true,
      access: ["student"],
    },
  },
];

export default onboardingRoutes;
