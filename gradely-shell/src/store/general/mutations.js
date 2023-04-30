export default {
    // UPDATE TEACHER CLASS LIST
    UPDATE_TEACHER_CLASS_LIST: (state, data) => (state.teacher_classlist = data),

    ADD_CLASS_TO_TEACHER_CLASS_LIST: (state, data) =>
        state.teacher_classlist.classes.push(data),

    // UPDATE TEACHER subject LIST
    UPDATE_TEACHER_SUBJECT_LIST: (state, data) =>
        (state.teacher_subjectlist = data),

    // *********** SCHOOL RELATED ***************
    UPDATE_TEACHERS_IN_CLASS: (state, { class_id, data }) => {
        state.class_teachers.current_class_id = class_id;
        state.class_teachers.data = data;
    },

    EMPTY_TEACHERS_IN_CLASS: (state) => {
        state.class_teachers = {
            current_class_id: 1,
            data: [],
        };
    },

    UPDATE_SCHOOL_TEACHERS_LIST: (state, data) =>
        (state.school_teachers_list = data),

    UPDATE_CLASS_DETAILS: (state, { class_id, data }) => {
        state.class_details.current_class_id = class_id;
        state.class_details.data = data;
    },

    UPDATE_CLASS_SUBJECTS: (state, subjects) => {
        state.class_subjects = subjects.map((subject) => {
            subject.subject_id = subject.id;
            return subject;
        });
    },

    UPDATE_CLASS_LIST: (state, classes) => {
        state.class_list = classes;
    },

    UPDATE_SCHOOL_CLASS_LIST: (state, classes) => {
        state.school_class_list = classes;
    },

    UPDATE_SELECTED_CLASS: (state, level) => {
        state.selected_class = level;
    },
    // *********** SCHOOL RELATED ***************

    // *********** PARENT/STUDENT RELATED ***************
    UPDATE_PARENT_CHILD_LIST: (state, data) => (state.parent_children = data),
    CLEAR_PARENT_CHILD_LIST: (state) => (state.parent_children = []),

    UPDATE_CHILD_CLASS_DETAIL: (state, { child_id, data }) => {
        state.child_class_details.child_id = Number(child_id);
        state.child_class_details.class_detail = data;
    },

    UPDATE_CATCHUP_REMINDERS: (state, data) => (state.catchup_reminders = data),

    AUTH_CHILD_TOKEN: (state, data) => {
        state.child_token = data.access_token;
        localStorage.setItem("gradelyAuthSubToken", data.access_token);
    },

    RESET_CHILD_LIST: (state) => (state.parent_children = []),

    /********* EXAM RELATED **********/
    UPDATE_EXAM_LIST: (state, data) => {
        state.exam_list = data;
    },

    UPDATE_SUBJECT_EXAM_LIST: (state, data) => {
        state.exam_subject_list = data;
    },

    /********* TOUR RELATED **********/
    UPDATE_TOUR: (
        state, { step, step_progress, completed: completed = false }
    ) => {
        state.tour.step = step;
        state.tour.step_progress = step_progress;
        state.tour.completed = completed;
    },
};