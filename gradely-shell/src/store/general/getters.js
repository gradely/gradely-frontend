export default {
    getTeacherClassList: (state) => state.teacher_classlist,
    getTeacherSubjectList: (state) => state.teacher_subjectlist,
    getClassSubjects: (state) => state.class_subjects,

    // *********** SCHOOL RELATED ***************
    getClassTeachers: (state) => state.class_teachers,
    getClassDetails: (state) => state.class_details,
    getSelectedClass: (state) => state.selected_class,
    getClassList: (state) => state.class_list,
    getSchoolClassList: (state) => state.school_class_list,
    getSchoolTeachers: (state) => state.school_teachers_list,
    // *********** SCHOOL RELATED ***************

    // *********** PARENT/STUDENT RELATED ***************
    getParentChildren: (state) => state.parent_children,
    getChildClassDetails: (state) => state.child_class_details,
    getCurrentChildToken: (state) => state.child_token,
    getCatchupReminders: (state) => state.catchup_reminders,

    /*********** EXAM RELATED **************/
    getExamList: (state) => state.exam_list,
    getExamSubjectList: (state) => state.exam_subject_list,

    /*********** TOUR **************/
    getTour: (state) => state.tour,
    getSchoolTourFlow: (state) => state.school_tour_flow,
};