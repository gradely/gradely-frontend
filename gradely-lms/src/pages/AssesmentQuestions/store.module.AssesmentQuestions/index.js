import {
  deleteData,
  getData,
  putData
} from "../../../services/api/Axios.method";
import { SET_NETWORK_ERROR_MESSAGE } from "../../../store/module/general/constant";
import {
  FETCH_TEACHER_QUESTIONS,
  GET_TEACHER_QUESTIONS,
  SET_TEACHER_QUESTIONS,
  GET_IS_QUESTION_LOADING,
  SET_IS_QUESTION_LOADING,
  TEACHER_QUESTIONS_URL,
  GET_IS_ASESSMENT_DELETING,
  SET_IS_ASESSMENT_DELETING,
  SET_IS_ASESSMENT_PUBLISHING,
  ASSESMENT_PUBLISH_ACTION,
  PUBLISH_URL,
  GET_PUBLISHED_DATA,
  SET_PUBLISHED_DATA,
  ASSESMENT_DELETE_ACTION,
  SET_DELETE_DATA,
  GET_IS_ASESSMENT_PUBLISHING,
  HOMEWORK_URL,
  GET_DELETE_DATA,
  GET_IS_ASSESMENT_DETAILS_LOADING,
  GET_ASSESMENT_DETAILS,
  SET_IS_ASSESMENT_DETAILS_LOADING,
  SET_ASSESMENT_DETAILS,
  GET_ASSESMENT_DETAILS_ACTION,
  GET_EDIT_ASSESMENT_DETAILS,
  GET_IS_ASSESMENT_EDITING,
  SET_IS_ASSESMENT_EDITING,
  SET_EDIT_ASSESMENT_DETAILS,
  EDIT_ASSESMENT_DETAILS_ACTION
} from "./constants";

const state = {
  questionsData: [],
  isQuestionsLoading: false,
  isAsessmentPublishing: false,
  isAsessmentDeleting: false,
  publishedData: null,
  deleteData: null,
  isAssesmentDetailsLoading: false,
  assesmentDetails: null,
  isHomeworkEditing: false,
  editHomeworkDetails: null
};

const getters = {
  [GET_TEACHER_QUESTIONS]: (state) => state.questionsData,
  [GET_IS_QUESTION_LOADING]: (state) => state.isQuestionsLoading,
  [GET_IS_ASESSMENT_DELETING]: (state) => state.isAsessmentDeleting,
  [GET_IS_ASESSMENT_PUBLISHING]: (state) => state.isAsessmentPublishing,
  [GET_PUBLISHED_DATA]: (state) => state.publishedData,
  [GET_DELETE_DATA]: (state) => state.deleteData,
  [GET_IS_ASSESMENT_DETAILS_LOADING]: (state) =>
    state.isAssesmentDetailsLoading,
  [GET_ASSESMENT_DETAILS]: (state) => state.assesmentDetails,
  [GET_EDIT_ASSESMENT_DETAILS]: (state) => state.editHomeworkDetails,
  [GET_IS_ASSESMENT_EDITING]: (state) => state.isHomeworkEditing
};

const mutations = {
  [SET_TEACHER_QUESTIONS](state, payload) {
    state.questionsData = payload;
  },
  [SET_IS_QUESTION_LOADING](state, payload) {
    state.isQuestionsLoading = payload;
  },
  [SET_IS_ASESSMENT_DELETING](state, payload) {
    state.isAsessmentDeleting = payload;
  },
  [SET_IS_ASESSMENT_PUBLISHING](state, payload) {
    state.isAsessmentPublishing = payload;
  },
  [SET_PUBLISHED_DATA](state, payload) {
    state.publishedData = payload;
  },
  [SET_DELETE_DATA](state, payload) {
    state.deleteData = payload;
  },
  [SET_IS_ASSESMENT_DETAILS_LOADING](state, payload) {
    state.isAssesmentDetailsLoading = payload;
  },
  [SET_ASSESMENT_DETAILS](state, payload) {
    state.assesmentDetails = payload;
  },
  [SET_IS_ASSESMENT_EDITING](state, payload) {
    state.isHomeworkEditing = payload;
  },
  [SET_EDIT_ASSESMENT_DETAILS](state, payload) {
    state.editHomeworkDetails = payload;
  }
};

const actions = {
  [FETCH_TEACHER_QUESTIONS]({ commit }, homework_id) {
    commit(SET_IS_QUESTION_LOADING, true, { root: true });
    getData(TEACHER_QUESTIONS_URL(homework_id))
      .then((response) => {
        commit(SET_TEACHER_QUESTIONS, response?.data, { root: true });
        commit(SET_IS_QUESTION_LOADING, false, { root: true });
      })
      .catch((err) => {
        commit(SET_IS_QUESTION_LOADING, false, { root: true });
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        throw new Error(err);
      });
  },
  [ASSESMENT_PUBLISH_ACTION]({ commit }, payload) {
    commit(SET_IS_ASESSMENT_PUBLISHING, true);
    putData(PUBLISH_URL(payload))
      .then((response) => {
        commit(SET_PUBLISHED_DATA, response?.data, { root: true });
        commit(SET_IS_ASESSMENT_PUBLISHING, false, { root: true });
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_ASESSMENT_PUBLISHING, false, { root: true });
        throw new Error(err);
      });
  },
  [ASSESMENT_DELETE_ACTION]({ commit }, payload) {
    commit(SET_IS_ASESSMENT_DELETING, true);
    deleteData(HOMEWORK_URL(payload))
      .then((response) => {
        commit(SET_DELETE_DATA, response?.data, { root: true });
        commit(SET_IS_ASESSMENT_DELETING, false, { root: true });
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_ASESSMENT_DELETING, false, { root: true });
        throw new Error(err);
      });
  },
  [GET_ASSESMENT_DETAILS_ACTION]({ commit }, homework_id) {
    commit(SET_IS_ASSESMENT_DETAILS_LOADING, true);
    getData(HOMEWORK_URL(homework_id))
      .then((response) => {
        commit(SET_ASSESMENT_DETAILS, response?.data, { root: true });
        commit(SET_IS_ASSESMENT_DETAILS_LOADING, false, {
          root: true
        });
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_ASSESMENT_DETAILS_LOADING, false, {
          root: true
        });
        throw new Error(err);
      });
  },
  [EDIT_ASSESMENT_DETAILS_ACTION]({ commit }, payload) {
    commit(SET_IS_ASSESMENT_EDITING, true);
    putData(HOMEWORK_URL(payload?.homework_id), payload?.data)
      .then((response) => {
        commit(SET_IS_ASSESMENT_EDITING, false);
        commit(SET_EDIT_ASSESMENT_DETAILS, response?.data, { root: true });
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_ASSESMENT_EDITING, false);
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
