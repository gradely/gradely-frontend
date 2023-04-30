export default {
  UPDATE_SCHOOL_PROFILE: (state, data) => (state.school_profile = data),

  UPDATE_TEACHER_PROFILE: (state, { id, data }) => {
    state.teacher_profile.id = id;
    state.teacher_profile.data = data;
  },

  UPDATE_STUDENT_PROFILE: (state, data) => {
    state.student_profile = data;
  },
};
