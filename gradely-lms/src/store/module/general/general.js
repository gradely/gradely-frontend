import {
  deleteData,
  getData,
  postData
} from "../../../services/api/Axios.method";
import { getLocalStorage } from "../../../services/localStorageMgt";
import {
  CHECK_TOKEN_VALIDITY_ACTION,
  DELETE_FILE_ACTION,
  DELETE_URL,
  GET_DELETE_DETAILS,
  GET_IS_DELETING,
  GET_IS_FILE_UPLOADING,
  GET_IS_LOGGED_IN,
  GET_IS_REPORTING,
  GET_NETWORK_ERROR_MESSAGE,
  GET_REPORT_DETAILS,
  GET_TEACHER_CLASSES,
  GET_TEACHER_CLASSES_ACTION,
  GET_UPLOAD_DETAILS,
  POST_UPLOAD_FILE,
  REPORT_ACTION,
  REPORT_URL,
  SET_DELETE_DETAILS,
  SET_IS_DELETING,
  SET_IS_LOGGED_IN,
  SET_IS_REPORTING,
  SET_IS_UPLOADING,
  SET_NETWORK_ERROR_MESSAGE,
  SET_REPORT_DETAILS,
  SET_TEACHER_CLASSES,
  SET_UPLOAD_DETAILS,
  TEACHER_CLASSES,
  UPLOAD_URL,
  VALIDATE
} from "./constant";

const state = {
  network_error: "",
  is_uploading: false,
  upload_details: null,
  is_deleting: false,
  delete_details: null,
  is_reporting: false,
  report_details: null,
  isLoggedIn: false,
  teacherClasses: null
};
const getters = {
  [GET_NETWORK_ERROR_MESSAGE]: (state) => state.network_error,
  [GET_IS_FILE_UPLOADING]: (state) => state.is_uploading,
  [GET_UPLOAD_DETAILS]: (state) => state.upload_details,
  [GET_DELETE_DETAILS]: (state) => state.delete_details,
  [GET_IS_DELETING]: (state) => state.is_deleting,
  [GET_IS_REPORTING]: (state) => state.is_reporting,
  [GET_REPORT_DETAILS]: (state) => state.report_details,
  [GET_IS_LOGGED_IN]: (state) => state.isLoggedIn,
  [GET_TEACHER_CLASSES]: (state) => state.teacherClasses
};

const mutations = {
  [SET_NETWORK_ERROR_MESSAGE](state, netw_err) {
    state.network_error = netw_err;
  },
  [SET_IS_UPLOADING](state, payload) {
    state.is_uploading = payload;
  },
  [SET_UPLOAD_DETAILS](state, payload) {
    state.upload_details = payload;
  },
  [SET_DELETE_DETAILS](state, payload) {
    state.delete_details = payload;
  },
  [SET_IS_DELETING](state, payload) {
    state.is_deleting = payload;
  },
  [SET_IS_REPORTING](state, payload) {
    state.is_reporting = payload;
  },
  [SET_REPORT_DETAILS](state, payload) {
    state.report_details = payload;
  },
  [SET_IS_LOGGED_IN](state, payload) {
    state.isLoggedIn = payload;
  },
  [SET_TEACHER_CLASSES](state, payload) {
    state.teacherClasses = payload;
  }
};
const actions = {
  [POST_UPLOAD_FILE]({ commit }, data) {
    commit(SET_IS_UPLOADING, true);
    const optionalHeader = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getLocalStorage("gradelyAuthToken")}`
    };
    postData(UPLOAD_URL, data, optionalHeader)
      .then((response) => {
        commit(SET_IS_UPLOADING, false);
        commit(SET_UPLOAD_DETAILS, response?.data, { root: true });
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_UPLOADING, false);
        throw new Error(err);
      });
    return state.upload_details;
  },
  [DELETE_FILE_ACTION]({ commit }, data) {
    commit(SET_IS_DELETING, true);
    deleteData(DELETE_URL(data))
      .then((response) => {
        commit(SET_IS_DELETING, false);
        commit(SET_DELETE_DETAILS, response?.data, { root: true });
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        throw new Error(err);
      });
  },
  [REPORT_ACTION]({ commit }, payload) {
    commit(SET_IS_REPORTING, true);
    postData(REPORT_URL(), payload)
      .then((response) => {
        commit(SET_IS_REPORTING, false);
        commit(SET_REPORT_DETAILS, response?.data, { root: true });
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_REPORTING, false);
        throw new Error(err);
      });
  },
  [CHECK_TOKEN_VALIDITY_ACTION]({ commit }) {
    const token = getLocalStorage("gradelyAuthToken");
    if (!token) return false;
    postData(VALIDATE, {
      token: getLocalStorage("gradelyAuthToken")
    })
      .then((response) => {
        if (response) {
          commit(SET_IS_LOGGED_IN, true);
        }
        return response;
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        throw new Error(err);
      });
  },
  [GET_TEACHER_CLASSES_ACTION]({ commit }, payload) {
    getData(`teacher/lms/related-classes?global_class=${payload}`)
      .then((response) => {
        commit(SET_TEACHER_CLASSES, response?.data);
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        throw new Error(err);
      });
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
