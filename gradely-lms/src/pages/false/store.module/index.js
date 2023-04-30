import { postData } from "../../../services/api/Axios.method";
import { SET_NETWORK_ERROR_MESSAGE } from "../../../store/module/general/constant";
import {
  GET_IS_LOGGING_IN,
  GET_LOGIN_DATA,
  LOGIN_URL,
  POST_LOGIN_ACTION,
  SET_IS_LOGGING_IN,
  SET_LOGIN_DATA
} from "./constants";

const state = {
  loginData: null,
  loggingIn: false
};

const getters = {
  [GET_LOGIN_DATA]: (state) => state.loginData,
  [GET_IS_LOGGING_IN]: (state) => state.loggingIn
};

const mutations = {
  [SET_LOGIN_DATA](state, payload) {
    state.loginData = payload;
  },
  [SET_IS_LOGGING_IN](state, payload) {
    state.loggingIn = payload;
  }
};

const actions = {
  async [POST_LOGIN_ACTION]({ commit }, data) {
    commit(SET_IS_LOGGING_IN, true);
    await postData(LOGIN_URL, data)
      .then((response) => {
        commit(SET_LOGIN_DATA, response?.data);
        commit(SET_IS_LOGGING_IN, false);
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_LOGGING_IN, false);
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
