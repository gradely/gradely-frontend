export default {
  getWeeklyHomework: (state) => state.weekly_homework,
  getWeeklyExam: (state) => state.weekly_exam,
  getWeeklyLiveClass: (state) => state.weekly_liveclass,
  getWeeklyEvent: (state) => state.weekly_event,
  getWeeklyNote: (state) => state.weekly_note,
  getWeeklyDiscussion: (state) => state.weekly_discussion,

  getPendingExamSelected: (state) => state.pending_exam_selected,
};
