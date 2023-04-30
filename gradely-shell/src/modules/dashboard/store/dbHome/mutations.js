export default {
  // UPDATE SCHOOL ACTIVITY STATUS
  UPDATE_SCHOOL_ACTIVITY: (state, data) => (state.school_activity = data),

  // UPDATE SCHOOL CLASSES
  UPDATE_SCHOOL_CLASSES: (state, data) => (state.school_classes = data),

  // UPDATE SCHOOL SUBJECTS
  UPDATE_SCHOOL_SUBJECTS: (state, data) => (state.school_subjects = data),

  // UPDATE SCHOOL ROLES
  UPDATE_SCHOOL_ROLES: (state, data) => (state.school_roles = data),

  // UPDATE SCHOOL CHECKLIST
  UPDATE_SCHOOL_CHECKLIST: (state, data) => (state.school_checklist = data),

  UPDATE_CLASS_SELECTIONS: (state, data) => {
    state.selected_classes = data;
  },
};
