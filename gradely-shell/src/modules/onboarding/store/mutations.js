export default {
  UPDATE_SECURITY_QUESTIONS: (state, questions) => {
    state.security_questions = questions;
  },

  UPDATE_CHILD_AVATARS: (state, avatars) => {
    state.child_avatars = avatars;
  },
};
