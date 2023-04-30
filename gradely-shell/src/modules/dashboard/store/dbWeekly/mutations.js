export default {
  // UPDATE WEEKLY DATA
  UPDATE_WEEKLY_HOMEWORK: (state, { pagination, data, counter }) => {
    state.weekly_homework.current_page = pagination;
    state.weekly_homework.current_state = data;
    state.weekly_homework.current_count = counter;
  },

  UPDATE_WEEKLY_EXAM: (state, { pagination, data, counter }) => {
    state.weekly_exam.current_page = pagination;
    state.weekly_exam.current_state = data;
    state.weekly_exam.current_count = counter;
  },

  UPDATE_WEEKLY_LIVECLASS: (state, { pagination, data, counter }) => {
    state.weekly_liveclass.current_page = pagination;
    state.weekly_liveclass.current_state = data;
    state.weekly_liveclass.current_count = counter;
  },

  UPDATE_WEEKLY_EVENT: (state, { pagination, data, counter }) => {
    state.weekly_event.current_page = pagination;
    state.weekly_event.current_state = data;
    state.weekly_event.current_count = counter;
  },

  UPDATE_WEEKLY_NOTE: (state, { pagination, data, counter }) => {
    state.weekly_note.current_page = pagination;
    state.weekly_note.current_state = data;
    state.weekly_note.current_count = counter;
  },

  UPDATE_WEEKLY_DISCUSSION: (state, { pagination, data, counter }) => {
    state.weekly_discussion.current_page = pagination;
    state.weekly_discussion.current_state = data;
    state.weekly_discussion.current_count = counter;
  },

  UPDATE_SELECTED_PENDING_EXAM: (state, ids) => {
    state.pending_exam_selected = ids;
  },
};
