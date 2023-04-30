export default {
  UPDATE_FEEDS_DATA: (state, { id, data, pagination }) => {
    state.feeds.id = id;
    state.feeds.current_data = data;
    state.feeds.current_page = pagination;
  },

  RESET_FEEDS_DATA: (state) => {
    state.feeds.id = 1;
    state.feeds.current_data = [];
    state.feeds.current_page = {
      currentPage: 1,
    };

    // UPCOMING
    state.upcoming_events.id = 1;
    state.upcoming_events.data = [];
  },

  UPDATE_UPCOMING_EVENTS: (state, { id, data }) => {
    state.upcoming_events.id = id;
    state.upcoming_events.data = data;
  },

  UPDATE_LIBRARY_DOCS: (state, { id, data }) => {
    state.library_docs.id = id;
    state.library_docs.data = data;
  },

  UPDATE_LIBRARY_VIDEOS: (state, { id, data }) => {
    state.library_videos.id = id;
    state.library_videos.data = data;
  },

  UPDATE_LEARNING_STATUS: (state, status) => {
    state.learning_status = status;
  },

  END_LEARNING_STATUS: (state) => {
    state.learning_status = "completed";
  },

  UPDATE_RECOMMENDATION_CONTENT: (state, data) =>
    (state.recomendation_content = data),

  UPDATE_DIAGNOSTIC_CONTENT: (state, data) => (state.diagnostic_content = data),

  UPDATE_TEACHER_LIVE_CLASS: (state, data) => (state.teacher_live_class = data),

  UPDATE_SUMMER_COURSES: (state, data) => (state.summer_courses = data),
};
