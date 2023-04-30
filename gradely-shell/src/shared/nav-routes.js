// SCHOOL DASHBOARD
const schoolDashboard = [
  {
    text: "Home",
    icon: "icon-tachometer",
    route: "DashboardHome",
  },
  {
    text: "Teachers",
    icon: "icon-teacher",
    route: "DashboardTeacher",
  },
  {
    text: "Students",
    icon: "icon-parent-child",
    route: "DashboardStudent",
  },
  {
    text: "Apps",
    icon: "icon-app",
    route: "DashboardAppStore",
  },
];

// SCHOOL BASE
const schoolBase = [
  {
    text: "Feed",
    icon: "icon-feeds",
    route: "GradelyFeeds",
  },
  {
    text: "Members",
    icon: "icon-members",
    route: "GradelyStudents",
  },
  {
    text: "Assessments",
    icon: "icon-library",
    route: "GradelyAssessmentPublished",
  },
  {
    text: "Report",
    icon: "icon-pie-chart",
    route: "GradelySchoolReport",
  },
];

// TEACHER BASE
const teacherBase = [
  {
    text: "Feed",
    icon: "icon-feeds",
    route: "GradelyFeeds",
  },
  {
    text: "Students",
    icon: "icon-members",
    route: "GradelyClassStudents",
  },
  {
    text: "Assessments",
    icon: "icon-library",
    route: "GradelyAssessmentPublished",
  },
  {
    text: "Report",
    icon: "icon-pie-chart",
    route: "GradelyTeacherReport",
  },
];

// USER BASE (HANDLES BOTH PARENT AND STUDENT NAV ROUTES)
const userBase = [
  {
    text: "Feed",
    icon: "icon-feeds",
    route: "GradelyFeeds",
  },
  // {
  //   text: "Catchup!",
  //   icon: "icon-book-stack",
  //   route: "FalseCatchup",
  // },
  {
    text: "Learn",
    icon: "icon-book-stack",
    route: "FalseLearn",
  },
  {
    text: "SchoolWork",
    icon: "icon-library",
    route: "GradelyUserNewAssessment",
  },
  {
    text: "Report",
    icon: "icon-pie-chart",
    route: "GradelyUserReport",
  },
];

export { schoolDashboard, schoolBase, teacherBase, userBase };
