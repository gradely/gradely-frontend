import { postData } from "../../../scripts/api/axios.method";

const state = {
  loginData: null,
  loggingIn: false
};

const getters = {
  getLoginData: (state) => state.loginData,
  getIsLoggingIn: (state) => state.loggingIn
};

const mutations = {
  setLoginData(state, payload) {
    state.loginData = payload;
  },
  setIsLogginIn(state, payload) {
    state.loggingIn = payload;
  }
};

const actions = {
  async postLoginAction({ commit }, data) {
    commit("setIsLogginIn", true);
    await postData("login", data)
      .then((response) => {
        commit("setLoginData", response?.data);
        commit("setIsLogginIn", false);
      })
      .catch((err) => {
        commit("setNetworkError", err, { root: true });
        throw new Error(err);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
