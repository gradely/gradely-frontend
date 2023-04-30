import { $serviceApi as api } from "@/services/service-api";

const routes = {
  // VERIFICATION
  verify_account: "/auth/verify-account",
  verify_account_code: "/auth/verify-account",
  update_contact: "/auth/update-contact",
  update_contact_without_code: "/auth/update-contact-without-code",
  request_verification: "/auth/verification-code",
  parent_request_code: "/parent/student/request-child-contact-update-code",

  // SCHOOL ONBOARDING
  school_setup: "/school/classes/generate",

  // TEACHER ONBOARDING
  addTeacherByCode: "/teacher/class/add-teacher",
  verifyClassCode: "/teacher/class/",
  teacherInviteSchool: "/invites/parent-school",

  //PARENT ONBOARDING
  addChild: "/parent/signup-child",
  verifyCode: "/parent/child-code",
  connectExistingChild: "/parent/connect-child",

  // STUDENT ONBOARDING
  security_question: "/student/security-question",
  child_avatars: "/general/avatar",
  save_avatar: "/student/avatar",
  invite_parent: "/invites/student-parent",
  join_class_with_code: "/student/class",

  // UPDATE ONBOARDING
  update_onboarding: "/general/update-boarding",
};

export default {
  // REQUEST ACCOUNT VERIFICATION
  async requestAccountVerification(_, payload) {
    return await api.newService("old").push(routes.verify_account, payload);
  },

  // VERIFY ACCOUNT CODE
  async verifyAccountCode(_, payload) {
    return await api
      .newService("old")
      .update(routes.verify_account_code, payload);
  },

  // UPDATE USER CONTACT
  async updateContact({ commit }, payload) {
    let response = await api
      .newService("old")
      .update(routes.update_contact, payload);

    response.code === 200
      ? commit("auth/UPDATE_AUTH_USER_CONTACT", payload, { root: true })
      : null;

    return response;
  },

  // UPDATE USER CONTACT WITHOUT CODE
  async updateContactWithoutCode({ commit }, payload) {
    let response = await api
      .newService("old")
      .update(routes.update_contact_without_code, payload);

    response.code === 200
      ? commit("auth/UPDATE_AUTH_USER_CONTACT", payload, { root: true })
      : null;

    return response;
  },

  // RESEND VERIFICATION CODE
  async resendVerificationCode(_, payload) {
    return await api
      .newService("old")
      .push(routes.request_verification, payload);
  },

  async sendVerificationCode(_, payload) {
    return await api
      .newService("old")
      .push(routes.parent_request_code, payload);
  },

  // SCHOOL ACTIONS
  async setUpSchool(_, form) {
    return await api.service("old").push(routes.school_setup, form);
  },

  // TEACHER ACTIONS
  async verifyClassCode(_, code) {
    return await api.service("old").fetch(routes.verifyClassCode + code);
  },

  async addTeacherToSchool(_, code) {
    return await api.service("old").push(routes.addTeacherByCode, { code });
  },

  async teacherInviteSchool(_, invite_form) {
    return await api
      .service("old")
      .push(routes.teacherInviteSchool, invite_form);
  },

  //PARENTS ACTIONS
  async addNewChild({ commit }, child_data) {
    let response = await api.service("old").push(routes.addChild, child_data);
    commit("general/RESET_CHILD_LIST", null, { root: true });
    return response;
  },

  async verifyCode(_, code) {
    return await api.service("old").push(routes.verifyCode, { code });
  },

  async connectChild({ commit }, form) {
    let response = await api
      .service("old")
      .push(routes.connectExistingChild, form);
    commit("general/RESET_CHILD_LIST", null, { root: true });
    return response;
  },

  // STUDENT ACTIONS
  async getSecurityQuestions({ commit }) {
    let response = await api
      .service("old")
      .fetch(routes.security_question + "s");
    if (response.code === 200)
      commit("UPDATE_SECURITY_QUESTIONS", response.data);
    return response;
  },

  async updateSecurityQuestion(_, answer) {
    return await api.service("old").update(routes.security_question, answer);
  },

  async getChildAvatars({ commit }) {
    let response = await api.service("old").fetch(routes.child_avatars);
    if (response.code === 200) commit("UPDATE_CHILD_AVATARS", response.data);
    return response;
  },

  async setChildAvatar({ commit }, avatar) {
    let response = await api.service("old").update(routes.save_avatar, avatar);
    if (response.code === 200)
      commit("auth/UPDATE_USER_IMAGE", avatar.avatar, { root: true });
    return response;
  },

  async inviteParent(_, parent_data) {
    return await api.service("old").push(routes.invite_parent, parent_data);
  },

  async studentJoinClass(_, { code, use_child_token }) {
    return await api
      .service("old")
      .push(
        routes.join_class_with_code,
        { code },
        true,
        false,
        use_child_token
      );
  },

  // UPDATE ONBOARDING STATUS
  async updateOnboarding() {
    return await api.service("old").update(routes.update_onboarding);
  },
};
