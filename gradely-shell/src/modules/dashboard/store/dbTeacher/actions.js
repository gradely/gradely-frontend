import { $serviceApi as api } from "@/services/service-api";

const routes = {
  schoolTeachers: "/school/teacher",
  schoolPendingTeachers: "/school/teacher/pending",
  removeTeacherInSchool: "/school/teacher/school-remove",
  assign_role: "/school/teacher/assign-class-subject",
  teacher_role: "/teacher/classes-subjects",
};

export default {
  // GET TEACHERS IN SCHOOL
  async getSchoolTeachers(
    { commit, getters },
    {
      page = 1,
      search = false,
      subject = null,
      teacher_info = null,
      class_id = null,
      all = 0,
    }
  ) {
    let { current_state, current_page } = getters.getTeachers;

    // CHECK IF TEACHER HAS STATE
    if (current_state.length && !search)
      return api.deliverFromStore(current_state, current_page);
    else {
      let url_suffix = `page=${page}`;
      subject ? (url_suffix += `&subject=${subject}`) : null;
      teacher_info ? (url_suffix += `&name=${teacher_info}`) : null;
      class_id ? (url_suffix += `&class_id=${class_id}`) : null;

      let response = await api
        .service("old")
        .fetch(`${routes.schoolTeachers}?${url_suffix}`);

      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? search
          ? null
          : commit("UPDATE_TEACHER_LIST_STATE", response)
        : null;

      return response;
    }
  },

  // GET SCHOOL PENDING TEACHER
  async getSchoolPendingTeachers() {
    return await api.service("old").fetch(routes.schoolPendingTeachers);
  },

  /***************** POST REQUEST ********************/
  async assignTeacherRole({ commit }, teacherRoleForm) {
    let response = await api
      .service("old")
      .push(routes.assign_role, teacherRoleForm);

    if (response.name === "success")
      commit("UPDATE_TEACHER_LIST_STATE", response);

    return response;
  },

  async getTeacherRoles(_, teacher_id = "") {
    let url_suffix = teacher_id ? `?teacher_id=${teacher_id}` : "";
    return await api.service("old").fetch(routes.teacher_role + url_suffix);
  },

  /***************** DELETE REQUEST ********************/
  async removeTeacherFromSchool({ commit, getters }, teacher_id) {
    console.log("teacher payload", teacher_id);
    let response = await api
      .service("old")
      .remove(routes.removeTeacherInSchool, { teacher_id });

    let teachers = getters.getTeachers.current_state.filter(
      (teacher) => teacher.id !== teacher_id
    );

    response.code === 200
      ? commit("REMOVE_TEACHER_FROM_STATE", teachers)
      : null;

    return response;
  },

  /**
   *  SYNCHRONOUS ACTIONS
   */
};
