let weekly = {
  current_page: {
    currentPage: 1,
  },
  current_state: [],
  current_count: null,
};

export default () => ({
  weekly_homework: { ...weekly },
  weekly_exam: { ...weekly },
  weekly_liveclass: { ...weekly },
  weekly_event: { ...weekly },
  weekly_note: { ...weekly },
  weekly_discussion: { ...weekly },

  pending_exam_selected: [],
});
