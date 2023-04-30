const updateState = (state, type, pagination, data, id) => {
  state[type].current_page = pagination;
  state[type].current_state = data;
  state[type].current_id = id;
};

export default {
  /**
   *SCHOOL AND TEACHER ASSESSMENT MUTATION
   */
  UPDATE_PUBLISHED_ASSESSMENT: (state, { pagination, data, id }) =>
    updateState(state, "published", pagination, data, id),

  UPDATE_DRAFTED_ASSESSMENT: (state, { pagination, data, id }) =>
    updateState(state, "draft", pagination, data, id),

  UPDATE_REVIEW_ASSESSMENT: (state, { pagination, data, id }) =>
    updateState(state, "review", pagination, data, id),

  UPDATE_STUDENT_ASSESSMENT: (state, { data, id }) => {
    state.student_assessment.assessment_id = id;
    state.student_assessment.students = data;
  },

  UPDATE_ASSESSMENT_REPORT: (state, report) => {
    state.assessment_report = report;
  },

  /**
   *PARENT AND STUDENT ASSESSMENT MUTATION
   */
  UPDATE_NEW_ASSESSMENT: (state, { pagination, data, id }) =>
    updateState(state, "new", pagination, data, id),

  UPDATE_COMPLETED_ASSESSMENT: (state, { pagination, data, id }) =>
    updateState(state, "completed", pagination, data, id),

  UPDATE_SCHOOL_NOTES: (state, { pagination, data, id }) =>
    updateState(state, "notes", pagination, data, id),

  UPDATE_SCHOOL_VIDEOS: (state, { pagination, data, id }) =>
    updateState(state, "videos", pagination, data, id),
};
