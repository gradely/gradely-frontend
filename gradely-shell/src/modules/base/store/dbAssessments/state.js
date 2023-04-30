let data_set = {
  current_page: {
    currentPage: 1,
  },
  current_state: [],
  current_id: 1,
};

export default () => ({
  published: { ...data_set },
  draft: { ...data_set },
  review: { ...data_set },
  new: { ...data_set },
  completed: { ...data_set },
  notes: { ...data_set },
  videos: { ...data_set },

  student_assessment: {
    assessment_id: 1,
    students: [],
  },

  assessment_report: null,
});
