import state from "./state";

export default {
  getFeeds: (state) => state.feeds,
  getUpcomingEvents: (state) => state.upcoming_events,
  getLibraryDocs: (state) => state.library_docs,
  getLibraryVideos: (state) => state.library_videos,
  getLearningStatus: (state) => state.learning_status,
  getDiagnosticContent: (state) => state.diagnostic_content,
  getRecomendationContent: (state) => state.recomendation_content,
  getTeacherLiveClass: (state) => state.teacher_live_class,
  getSummerCourses: (state) => state.summer_courses,
};
