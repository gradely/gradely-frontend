const baseRoutes = [
  {
    path: "/select-question/:id",
    name: "LMSSelect",
    component: () =>
      import(
        /* webpackChunkName: "LMSAPP" */ "@/pages/QuestionSelect/QuestionSelect"
      ),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/create-question/:id",
    name: "LMSCreate",
    component: () =>
      import(
        /* webpackChunkName: "LMSAPP" */ "@/pages/QuestionCreate/QuestionCreate"
      ),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/manage-questions/:id",
    name: "LMSQuestion",
    component: () =>
      import(
        /* webpackChunkName: "LMSAPP" */ "@/pages/AssesmentQuestions/AssesmentQuestions"
      ),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/preview-question/:id",
    name: "LMSPreview",
    component: () =>
      import(
        /* webpackChunkName: "LMSAPP" */ "@/pages/QuestionPreview/QuestionPreview"
      ),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/bulk-upload/:id",
    name: "LMSBulkUpload",
    component: () =>
      import(
        /* webpackChunkName: "LMSAPP" */ "@/pages/QuestionCreate/QuestionCreate"
      ),
    meta: {
      requiresAuth: true
    }
  }
];

export default baseRoutes;
