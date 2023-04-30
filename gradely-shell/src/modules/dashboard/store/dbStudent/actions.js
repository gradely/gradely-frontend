import { $serviceApi as api } from "@/services/service-api";

const routes = {
  schoolStudents: "/school/students",
  updateSub: "/school/students/modify-subscription",
  removeStudent: "/school/student/",
};

export default {
  // GET SCHOOL STUDENTS LIST
  async getSchoolStudentList(
    { commit, getters },
    {
      page,
      license = null,
      student_info = null,
      class_id = null,
      search = false,
    }
  ) {
    let {
      current_state,
      current_page,
      current_license,
    } = getters.getSchoolStudents;

    // CHECK IF STUDENT HAS STATE
    if (current_state.length && !search)
      return api.deliverFromStore(
        { students: current_state, license: current_license },
        current_page
      );
    else {
      let url_suffix = `page=${page}`;
      license ? (url_suffix += `&license=${license}`) : null;
      student_info ? (url_suffix += `&student=${student_info}`) : null;
      class_id ? (url_suffix += `&class=${class_id}`) : null;

      let response = await api
        .service("old")
        .fetch(`${routes.schoolStudents}?${url_suffix}`);

      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? search
          ? null
          : commit("UPDATE_SCHOOL_STUDENTS_LIST", response)
        : null;

      return response;
    }
  },

  /****************** PUT REQUEST ************************/
  async updateStudentSubscription({ commit }, new_status) {
    let response = await api
      .service("old")
      .update(routes.updateSub, new_status);

    response.code === 200
      ? commit("UPDATE_STUDENT_SUBSCRIPTION", new_status)
      : null;

    return response;
  },

  /****************** DELETE REQUEST **************************/
  async deleteStudentFromSchool({ commit }, student_id) {
    let response = await api
      .service("old")
      .remove(`${routes.removeStudent}${student_id}`);

    response.code === 200 ? commit("REMOVE_STUDENT", student_id) : null;

    return response;
  },

  // SYNCHRONOUS ACTIONS
  updateStudentSelection(
    { commit, getters },
    { id = null, ids = [], bulk = false }
  ) {
    if (bulk) commit("UPDATE_SELECTED_STUDENT", ids);
    else {
      // CHECK IF ID ALREADY EXIST
      let is_exist = getters.getStudentSelected.findIndex(
        (item) => item === id
      );

      if (is_exist === -1)
        commit("UPDATE_SELECTED_STUDENT", [...getters.getStudentSelected, id]);
      else {
        getters.getStudentSelected.splice(is_exist, 1);
        commit("UPDATE_SELECTED_STUDENT", getters.getStudentSelected);
      }
    }
  },
};
