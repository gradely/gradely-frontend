import { $serviceApi as api } from "@/services/service-api";

const routes = {
  teacher_class_list: "/teacher/classes-subjects",

  class_subjects: "/school/classes/class-subjects?classes=",
  classs_teachers: "/teacher/class/class-teachers/",
  teacher_class_subjects: "/teacher/homework/subject/",
  teacher_selectable_class_subject: "/general/class-subject/",
  teacher_update_subject_list: "/teacher/class/update-subjects",
  school_update_teacher_subjects: "/school/teacher/assign-subject",
  teacher_leave_class: "/teacher/class/remove-class/",
  teacher_leave_school: "/teacher/class/remove-school/",
  teacher_create_class: "/teacher/class/create-class",
  teacher_create_subject: "/subject/create",

  teachers_in_class: "/school/teacher/",
  teachers_in_school: "/school/teacher/",
  subjects_in_class: "/school/classes/single-class-subjects/",
  class_detail: "/school/classes/",
  school_classes:"/school/classes",

  class_assigned_subjects: "/teacher/class/teacher-subject-classes/",

  parent_children: "/parent/children",
  switch_child_token: "/parent/student/switch-child/",
  verify_class_code: "/student/verify-class/",
  child_class_detail: "/student/general/class-detail",
  child_password_update: "/parent/student/reset-password",
  child_unlink: "/parent/child",
  update_child_login: "/parent/student/update-contact/",
  update_child_class: "/parent/student/update-class",
  update_child_school: "/parent/student/update-school",
  remove_child_school: "/parent/student/remove/",

  exam_list: "/exam/exams",
  subject_list: "/exam/subjects",
  class_list: "/general/global-class",

  subscription_url: "/payment/status?status=0",
  rate_url: "/general/rating/class",

  logger_url: "/logger/feature-user-logger",
  reminder_url: "/catchup/reminder",
};

export default {
  // GET ALL CLASSESS A TEACHER IS ASSGINED TO
  async getTeacherClassList({ commit, getters }, reset = false) {
    let teacher_classes = reset ? [] : getters.getTeacherClassList;

    if (!Array.isArray(teacher_classes)) {
      if (teacher_classes?.classes.length)
        return api.deliverFromStore(teacher_classes);
    } else {
      let response = await api.service("old").fetch(routes.teacher_class_list);

      response.code === 200
        ? commit("UPDATE_TEACHER_CLASS_LIST", response.data)
        : commit("UPDATE_TEACHER_CLASS_LIST", []);

      return response;
    }
  },

  // *********** SCHOOL RELATED ***************
  // GET ALL TEACHERS IN A CLASS
  async getTeachersInClass({ commit, getters }, class_id) {
    let { current_class_id, data } = getters.getClassTeachers;

    if (data.length && current_class_id === class_id)
      return api.deliverFromStore(data);
    else {
      let response = await api
        .service("old")
        .fetch(`${routes.teachers_in_class}${class_id}`);

      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? commit("UPDATE_TEACHERS_IN_CLASS", { ...response, class_id })
        : null;

      return response;
    }
  },

  async getTeachersInSchool({ commit }) {
    let response = await api.service("old").fetch(routes.teachers_in_school);
    let { code, data } = response;
    if (code === 200) commit("UPDATE_SCHOOL_TEACHERS_LIST", data);
    return response;
  },

  async getSubjectsInClass(_, class_id) {
    return await api
      .service("old")
      .fetch(`${routes.subjects_in_class}${class_id}`);
  },

  async getTeacherSubjectsInClass(_, class_id) {
    return await api
      .service("old")
      .fetch(`${routes.teacher_class_subjects}${class_id}`);
  },

  async getAllSubjectsInTeacherClass(_, global_class_id) {
    return await api
      .newService("old")
      .fetch(`${routes.teacher_selectable_class_subject}${global_class_id}`);
  },

  async updateTeacherSubjects(_, payload) {
    return await api
      .newService("old")
      .update(routes.teacher_update_subject_list, payload);
  },

  async schoolUpdateTeacherSubjects(_, payload) {
    return await api
      .service("old")
      .push(routes.school_update_teacher_subjects, payload);
  },

  async teacherLeaveClass(_, class_id) {
    return await api
      .newService("old")
      .remove(`${routes.teacher_leave_class}${class_id}`);
  },

  async teacherLeaveSchool(_, class_id) {
    return await api
      .newService("old")
      .remove(`${routes.teacher_leave_school}${class_id}`);
  },

  // TEACHER CREATE CLASS
  async teacherCreateClass(_, payload) {
    return await api
      .newService("old")
      .push(routes.teacher_create_class, payload);
  },

  // TEACHER CREATE SUBJECT
  async teacherCreateSubject(_, payload) {
    return await api
      .newService("old")
      .push(routes.teacher_create_subject, payload);
  },

  // GET CLASS DETAIL
  async getClassDetail({ commit, getters }, class_id) {
    let { current_class_id, data } = getters.getClassDetails;

    if (data.length && current_class_id === class_id)
      return api.deliverFromStore(data);
    else {
      let response = await api
        .service("old")
        .fetch(`${routes.class_detail}${class_id}`);

      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? commit("UPDATE_CLASS_DETAILS", { ...response, class_id })
        : null;

      return response;
    }
  },

  async verifyClassCode(_, code) {
    return await api.service("old").fetch(routes.verify_class_code + code);
  },

  async getGlobalClassList({ commit }) {
    let response = await api.newService("old").fetch(routes.class_list);
    let { code, data } = response;
    if (code === 200) commit("UPDATE_CLASS_LIST", data);
    return response;
  },

  async getSchoolGlobalClassList({ commit }) {
    let response = await api.service("old").fetch(routes.school_classes);
    let { code, data } = response;
    if (code === 200) commit("UPDATE_SCHOOL_CLASS_LIST", data);
    return response;
  },

  // GET SUBJECTS IN A CLASS
  async getClassSubject({ commit }, class_id) {
    let response = await api
      .service("old")
      .fetch(`${routes.class_subjects}[${class_id}]`);

    if (response.code === 200) commit("UPDATE_CLASS_SUBJECTS", response.data);
    return response;
  },

  // GET TEACHERS IN A CLASS
  async getClassTeachers(_, class_id) {
    let response = await api
      .newService("old")
      .fetch(routes.classs_teachers + class_id);
    return response;
  },

  // GET ALL CLASSES ASSOCIATED WITH A SUBJECT
  async getClassesAssignedSubject(_, subject_id) {
    return await api
      .newService("old")
      .fetch(`${routes.class_assigned_subjects}${subject_id}`);
  },

  // *********** PARENT AND STUDENT RELATED ***************
  async getParentChildren({ commit, getters }) {
    let child_list = getters.getParentChildren;

    if (child_list.length) return api.deliverFromStore(child_list);
    else {
      let response = await api.service("old").fetch(routes.parent_children);

      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? commit("UPDATE_PARENT_CHILD_LIST", response.data)
        : null;

      return response;
    }
  },

  // GET CURRENT SELECTED CHILD CLASS DETAILS BY ID
  async getChildClassDetails({ commit, getters }, child_id) {
    let child = getters.getChildClassDetails;

    if (child?.child_id === Number(child_id))
      return api.deliverFromStore(child?.class_detail);
    else {
      let response = await api
        .service("old")
        .fetch(`${routes.child_class_detail}?child=${child_id}`);

      response.code === 200
        ? commit("UPDATE_CHILD_CLASS_DETAIL", { child_id, data: response.data })
        : null;

      return response;
    }
  },

  // UPDATE CHILD PASSWORD
  async updateChildPassword(_, payload) {
    return await api
      .newService("old")
      .update(routes.child_password_update, payload);
  },

  async updateChildClass(_, payload) {
    return await api
      .newService("old")
      .update(routes.update_child_class, payload);
  },

  async updateChildSchool(_, payload) {
    return await api
      .newService("old")
      .update(routes.update_child_school, payload);
  },

  async updateChildLogin(_, { payload, child_id }) {
    return await api
      .newService("old")
      .update(routes.update_child_login + child_id, payload);
  },

  async removeChildSchool(_, { school_id, child_id }) {
    return await api
      .newService("old")
      .update(
        `${routes.remove_child_school}${child_id}/from-school/${school_id}`
      );
  },

  // REMOVE A CHILD ACCOUNT
  async unlinkChildAccount(_, child_id) {
    return await api
      .service("old")
      .remove(`${routes.child_unlink}/${child_id}`);
  },

  // SWITCH CHILD TO GET TOKEN
  async getChildToken({ commit }, child_id) {
    let response = await api
      .newService("old")
      .fetch(`${routes.switch_child_token}${child_id}`);

    commit("AUTH_CHILD_TOKEN", response.data);
    return response;
  },

  async getExamList({ commit }) {
    let response = await api.service("old").fetch(routes.exam_list);
    if (response.code === 200) commit("UPDATE_EXAM_LIST", response.data);
  },

  async getExamSubjectList({ commit }) {
    let response = await api.service("old").fetch(routes.subject_list);
    if (response.code === 200)
      commit("UPDATE_SUBJECT_EXAM_LIST", response.data);
  },

  // GET SUBSCRIPTION STATUS
  async getSubscriptionStatus(_, url_query) {
    return await api
      .service("old")
      .fetch(`${routes.subscription_url}&${url_query}`);
  },

  // RATE EXPERIENCE
  async rateExperience(_, payload) {
    return await api.newService("old").push(routes.rate_url, payload);
  },

  // GET CATCHUP REMINDER
  async getCatchupReminder({ commit }, use_child_token) {
    let response = await api
      .newService("old")
      .fetch(routes.reminder_url, use_child_token);
    if (response.code === 200)
      commit("UPDATE_CATCHUP_REMINDERS", response.data);
    return response;
  },

  // UPDATE CATCHUP REMINDER
  async updateCatchupReminder(_, { payload, use_child_token }) {
    return await api
      .newService("old")
      .update(routes.reminder_url, payload, false, use_child_token);
  },

  // GET FEATURE LOGGER
  async getFeatureLogger(_, name) {
    return await api
      .newService("old")
      .fetch(`${routes.logger_url}?name=${name}`);
  },

  async getMultipleFeatureLogs(_, payload) {
    return await api
      .newService("old")
      .push(routes.logger_url, { name: payload });
  },

  // UPDATE FEATURE LOGGER
  async updateFeatureLogger(_, { name, value, type = "" }) {
    return await api
      .newService("old")
      .update(`${routes.logger_url}?name=${name}&type=${type}&value=${value}`);
  },

  // UPDATE MULTIPLE FEATURE LOGGER
  async updateMultipleFeatureLogger(_, payload) {
    return await api.newService("old").update(routes.logger_url, payload);
  },

  async updateTour({ commit, getters, dispatch }, manner) {
    let { step } = getters.getTour;

    // MANNER => "completed", "ongoing", "pending"

    // ON INCREASE
    if (["ongoing", "completed"].includes(manner)) {
      commit("UPDATE_TOUR", {
        step: (step += 1),
        step_progress: manner,
        completed: manner === "completed" ? true : false,
      });

      // LOG FEATURES HERE (tour_step, tour_completed, tour_step_progress)
      let payload = [
        {
          name: "tour_step",
          type: "",
          value: step,
        },
        {
          name: "tour_completed",
          type: "",
          value: manner === "completed" ? true : false,
        },
        {
          name: "tour_step_progress",
          type: "",
          value: manner,
        },
      ];

      await dispatch("updateMultipleFeatureLogger", payload);
    }
    // ON CANCEL (SKIP / DISMISS)
    else {
      commit("UPDATE_TOUR", { step, step_progress: "pending" });

      // LOG FEATURES HERE (tour_step, tour_completed, tour_step_progress)
      let payload = [
        {
          name: "tour_step",
          type: "",
          value: step,
        },
        {
          name: "tour_completed",
          type: "",
          value: false,
        },
        {
          name: "tour_step_progress",
          type: "",
          value: "pending",
        },
      ];

      await dispatch("updateMultipleFeatureLogger", payload);
    }
  },

  async resetProgressStep({ commit, dispatch }) {
    commit("UPDATE_TOUR", {
      step: 1,
      step_progress: "ongoing",
      completed: manner === false,
    });

    let payload = [
      {
        name: "tour_step",
        type: "",
        value: 1,
      },
      {
        name: "tour_completed",
        type: "",
        value: false,
      },
      {
        name: "tour_step_progress",
        type: "",
        value: "ongoing",
      },
    ];

    await dispatch("updateMultipleFeatureLogger", payload);
  },

  /**
   *  SYNCHRONOUS ACTIONS
   */
  setTeacherSubjectList({ commit }, data) {
    commit("UPDATE_TEACHER_SUBJECT_LIST", data);
  },

  setSelectedClass({ commit }, level) {
    commit("UPDATE_SELECTED_CLASS", level);
  },

  updateTeacherClassList({ commit }, new_class) {
    commit("ADD_CLASS_TO_TEACHER_CLASS_LIST", new_class);
  },

  emptyTeacherInClass({ commit }) {
    commit("EMPTY_TEACHERS_IN_CLASS");
  },

  emptyParentChildList({ commit }) {
    commit("CLEAR_PARENT_CHILD_LIST");
  },
};
