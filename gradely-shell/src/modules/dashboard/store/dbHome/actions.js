import { $serviceApi as api } from "@/services/service-api";

const routes = {
  schoolActivity: "/school/general/dashboard-todo-status",
  schoolWorkActivities: "/school/general/dashboard-summary",
  schoolClasses: "/school/classes/group-classes",
  schoolSubjects: "/school/preferences/subjects",
  classArmUpdate: "/school/classes/update",
  manageClassUrl: "/school/classes",
  schoolRoles: "/school/general/school-roles",
  schoolChecklist: "/school/account-setup",
  requestMeeting: "/school/general/request-call",
};

export default {
  // GET SCHOOL ACTIVITY STATUS
  async getSchoolActivityStatus({ commit, getters }) {
    let school_activity = getters.getSchoolActivity;

    // CHECK IF SCHOOL ACTIVITY GETTER HAS DATA ALREADY
    if (Object.keys(school_activity).length)
      return api.deliverFromStore(school_activity);
    else {
      let response = await api.service("old").fetch(routes.schoolActivity);
      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? commit("UPDATE_SCHOOL_ACTIVITY", response.data)
        : null;
      return response;
    }
  },

  // GET ALL SCHOOL WORK ACTIVITIES
  async getAllSchoolWorkActivities() {
    return await api.newService("old").fetch(routes.schoolWorkActivities);
  },

  // GET SCHOOL CHECKLIST
  async loadSchoolChecklist({ commit }) {
    let response = await api.newService("old").fetch(routes.schoolChecklist);

    response.code === 200
      ? commit("UPDATE_SCHOOL_CHECKLIST", response.data)
      : null;

    return response;
  },

  // GET ALL SCHOOL CLASSES AND BRANCH
  async getSchoolClasses({ commit, getters }, refresh = false) {
    let school_classes = getters.getSchoolClasses;

    // CHECK IF SCHOOL CLASSES GETTER HAS DATA ALREADY
    if (Object.keys(school_classes).length && !refresh)
      return api.deliverFromStore(school_classes);
    else {
      let response = await api.service("old").fetch(routes.schoolClasses);
      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? commit("UPDATE_SCHOOL_CLASSES", response.data)
        : null;
      return response;
    }
  },

  async getSchoolSubjectList({ commit }) {
    let { code, data } = await api.service("old").fetch(routes.schoolSubjects);
    if (code === 200) commit("UPDATE_SCHOOL_SUBJECTS", data);
    return data;
  },

  async getSchoolRoleList({ commit }) {
    let { code, data } = await api.service("old").fetch(routes.schoolRoles);
    console.log("roels in sch", data);
    if (code === 200) commit("UPDATE_SCHOOL_ROLES", data);
    return data;
  },

  /****************** PUSH REQUEST ********************/
  async createNewClassArm({ commit }, classArmInfo) {
    let response = await api
      .service("old")
      .push(routes.manageClassUrl, classArmInfo);

    response.code === 200 ? commit("UPDATE_SCHOOL_CLASSES", []) : null;

    return response;
  },

  async requestAMeeting(_, payload) {
    return await api.service("old").push(routes.requestMeeting, payload);
  },

  /****************** PUT REQUEST ********************/
  async updateSchoolClassName({ commit }, updateInfo) {
    let response = await api
      .service("old")
      .update(routes.classArmUpdate, updateInfo);

    response.code === 200 ? commit("UPDATE_SCHOOL_CLASSES", []) : null;

    return response;
  },

  /****************** DELETE REQUEST ********************/
  async deleteSchoolClass({ commit }, { id, password }) {
    let response = await api
      .service("old")
      .remove(`${routes.manageClassUrl}/${id}`, { password });

    response.code === 200 ? commit("UPDATE_SCHOOL_CLASSES", []) : null;

    return response;
  },

  updateClassSelections({ commit }, payload) {
    commit("UPDATE_CLASS_SELECTIONS", payload);
  },
};
