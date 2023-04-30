export default {
  UPDATE_CLASS_STUDENTS: (state, { pagination, data, class_id }) => {
    state.class_students.current_page = pagination;
    state.class_students.current_state = data;
    state.class_students.current_class_id = class_id;
  },

  UPDATE_CLASS_TEACHERS: (state, { pagination, data, class_id }) => {
    state.class_teachers.current_page = pagination;
    state.class_teachers.current_state = data;
    state.class_teachers.current_class_id = class_id;
  },

  EMPTY_CLASS_TEACHERS: (state) => {
    state.class_teachers.current_state = [];
  },

  EMPTY_CLASS_STUDENTS: (state) => {
    state.class_students.current_state = [];
  },
};
