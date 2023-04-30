export default () => ({
    // TEACHER
    teacher_classlist: [],
    teacher_subjectlist: [],

    // SCHOOL
    class_teachers: {
        current_class_id: 1,
        data: [],
    },

    class_details: {
        current_class_id: 1,
        data: {},
    },

    class_list: [],

    class_subjects: [],

    school_teachers_list: [],

    school_class_list: [],

    // PARENT
    parent_children: [],
    child_token: localStorage.getItem("gradelyAuthSubToken") || "",
    catchup_reminders: [],

    // STUDENT
    child_class_details: {
        child_id: 1,
        class_detail: {},
    },

    exam_list: "",
    exam_subject_list: "",

    selected_class: "",

    school_tour_flow: [
        "DashboardHome",
        "DashboardHome",
        "DashboardHome",
        "GradelyFeeds",
        "lms",
        "GradelyFeeds",
    ],

    teacher_tour_flow: ["GradelyFeeds", "GradelyFeeds"],

    tour: {
        step: 1,
        step_progress: "completed", // ongoing, pending
        completed: true, // false
    },
});

// TOUR LOGGER KEYS
// - tour_step (gets tour last stop)
// - tour_completed (confirms if user has seen tour before)
// - tour_step_progress (confirms if tour was cancelled or completed)