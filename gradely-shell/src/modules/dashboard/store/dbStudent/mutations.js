export default {
  // UPDATE SCHOOL ACTIVITY STATUS
  UPDATE_SCHOOL_STUDENTS_LIST: (state, { pagination, data }) => {
    state.students.current_page = pagination;
    state.students.current_state = data.students;
    state.students.current_license = data.license;
  },

  UPDATE_STUDENT_SUBSCRIPTION: (state, newStatus) => {
    state.students.current_state = state.students.current_state.map(
      (student) => {
        let not_selected_student_status = student.subscription_status;

        return {
          ...student,
          subscription_status: newStatus.student_id.includes(Number(student.id))
            ? newStatus.status
            : not_selected_student_status,
        };
      }
    );
  },

  REMOVE_STUDENT: (state, student_id) => {
    state.students.current_state = state.students.current_state.filter(
      (student) => Number(student.id) !== student_id
    );
  },

  UPDATE_SELECTED_STUDENT: (state, ids) => {
    state.student_selected = ids;
  },
};
