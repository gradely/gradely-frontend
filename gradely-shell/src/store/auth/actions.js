import { $serviceApi as api } from "@/services/service-api";

const routes = {
  login: "/auth/login",
  logout: "/logout",
  validate: "/validate",
  sms_login: "/sms/validate",
  check_token: "/auth/check",
  refresh_token: "/auth/refresh",
  auth_profile: "/auth/profile",
  mode: "/mode",
};

export default {
  // HANDLE USER LOGIN
  async loginUser({ commit }, data) {
    let response = await api.newService("old").push(routes.login, data);

    if (response) {
      if (response.code === 200)
        commit("AUTH_SUCCESS", { response: response.data, auth: true });
      return response;
    } else return false;
  },

  // CHECK IF THE TOKEN IS VALID
  async checkTokenValidity() {
    return await api.newService("old").push(routes.check_token, null, false);
  },

  // GENERATE NEW TOKEN SET
  async generateTokenSet({ commit }) {
    let response = await api.newService("old").push(routes.refresh_token, {
      refresh_token: localStorage.getItem("gradelyCapEntryToken"),
    });

    return response?.code === 200
      ? commit("UPDATE_TOKEN_SET", response.data)
      : commit("AUTH_LOGOUT");
  },

  // GET USER PROFILE DATA
  async getActiveUserProfile({ commit }) {
    let response = await api.newService("old").fetch(routes.auth_profile);
    if (response) {
      commit("AUTH_SUCCESS", { response: response.data });
      return response;
    }
  },

  // LOGIN USER BY TOKEN
  async loginUserByToken({ commit }, token) {
    let response = await api
      .service("old")
      .push(`${routes.sms_login}?token=${token}`);

    //SET STATE IF VALIDATED PROPERLY
    if (response) {
      if (response.code === 200)
        commit("AUTH_SUCCESS", {
          response: { ...response.data, token },
          auth: true,
        });
      return response;
    } else return false;
  },

  // Token is expired or not valid!

  // HANDLE USER LOGOUT
  async logoutUser({ commit }, redirect=true) {
    let response = await api.service("old").push(routes.logout);
    if (response && redirect) {
      commit("AUTH_LOGOUT");
      return response;
    }
  },

  // UPDATE CATCHUP MODE
  async updateCatchupMode({ commit }, data) {
    let mode = { mode: data };
    let response = await api.service("old").push(routes.mode, mode);
    if (response.code === 200) commit("UPDATE_CATCHUP_MODE", data);
    return response;
  },

  updateVerificationStatus({ commit }) {
    commit("CONFIRM_VERIFICATION_STATUS");
  },

  updateBoardingStatus({ commit }) {
    commit("CONFIRM_BOARDED_STATUS");
  },
};
