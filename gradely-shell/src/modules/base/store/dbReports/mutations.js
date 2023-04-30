export default {
    UPDATE_STUDENT_REPORT: (state, data) => {
        state.student_report = data;
    },

    UPDATE_NEW_STUDENT_REPORT: (state, data) => {
        state.new_student_report = data;
    },

    UPDATE_STUDENT_REPORT_SUBJECTS: (state, data) => {
        state.student_report_subjects = data;
    },
};