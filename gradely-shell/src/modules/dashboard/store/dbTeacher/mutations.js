export default {
    // UPDATE TEACHER LIST
    UPDATE_TEACHER_LIST_STATE: (state, { pagination, data }) => {
        state.teacher.current_page = pagination;
        state.teacher.current_state = data;
    },

    REMOVE_TEACHER_FROM_STATE: (state, data) => {
        state.teacher.current_state = data;
    },

    UPDATE_TEACHER_CLASS_AND_SUBJECTS: (state, { teacher_id, updatedClasses, updatedSubjects }) => {
        state.teacher.current_state = state.teacher.current_state.map(teacher => {
            let is_updated_teacher = teacher.id === teacher_id;
            return {
                ...teacher,
                teacherClasses: is_updated_teacher ? updatedClasses : teacher.teacherClasses,
                teacherSubjects: is_updated_teacher ? updatedSubjects : teacher.teacherSubjects
            }
        })
    }
};