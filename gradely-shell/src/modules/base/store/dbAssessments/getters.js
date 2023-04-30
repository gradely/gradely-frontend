export default {
  getPublishedAssessment: (state) => state.published,
  getDraftedAssessment: (state) => state.draft,
  getReviewAssessment: (state) => state.review,

  getNewAssessment: (state) => state.new,
  getCompletedAssessment: (state) => state.completed,
  getSchoolNotes: (state) => state.notes,
  getSchoolVideos: (state) => state.videos,

  getAssessmentStudents: (state) => state.student_assessment,
  getAssessmentReport: (state) => state.assessment_report,
};
