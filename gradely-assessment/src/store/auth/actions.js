import { $serviceApi as api } from "@/services/service-api";

const routes = {
  login: "/login",
  logout: "/logout",
  validate: "/validate",
  profile: "/general/user",
};

export default {
  // HANDLE USER LOGIN
  async loginUser({ commit }, data) {
    let response = await api.service().push(routes.login, data);
    if (response) {
      if (response.code === 200) {
        commit("AUTH_SUCCESS", { response: response.data, auth: true });
        return response;
      }
    }
  },

  // CHECK IF THE TOKEN HAS ACCESS
  async checkTokenAccess({ commit }, token) {
    let response = await api.service().push(routes.validate, { token });
    return response === false ? commit("AUTH_LOGOUT") : true;
  },

  // GET USER PROFILE DATA
  async getActiveUserProfile({ commit }) {
    let response = await api.service().fetch(routes.profile);
    if (response) {
      commit("AUTH_SUCCESS", { response: response.data });
      return response;
    }
  },

  // HANDLE USER LOGOUT
  async logoutUser({ commit }) {
    let response = await api.service().push(routes.logout);
    if (response) {
      commit("AUTH_LOGOUT");
      return response;
    }
  },
};
