import {
  deleteData,
  getData,
  postData,
  putData,
} from "../../../services/api/Axios.method";
import { SET_NETWORK_ERROR_MESSAGE } from "../../../store/module/general/constant";
import { SET_IS_QUESTION_LOADING } from "../../AssesmentQuestions/store.module.AssesmentQuestions/constants";
import {
  GET_CLASS_TOPICS,
  FETCH_CLASS_TOPICS,
  CLASS_TOPICS_URL,
  SET_CLASS_TOPICS,
  FETCH_CLASS_QUESTIONS,
  CLASS_QUESTIONS_URL,
  SET_CLASS_QUESTIONS,
  GET_CLASS_QUESTIONS,
  REMOVE_QUESTIONS_FROM_HOMEWORK,
  REMOVE_QUESTIONS_FROM_HOMEWORK_URL,
  SET_REMOVED_QUESTIONS_FROM_HOMEWORK,
  GET_REMOVED_QUESTIONS_FROM_HOMEWORK,
  REPORT_QUESTION_ERROR,
  REPORT_QUESTION_ERROR_URL,
  SET_REPORT_QUESTION_ERROR,
  GET_REPORT_QUESTION_ERROR,
  GET_CLASS_TOPICS_LOADER,
  GET_CLASS_QUESTIONS_LOADER,
  SET_CLASS_TOPICS_LOADER,
  SET_CLASS_QUESTIONS_LOADER,
  GET_ADD_QUESTIONS_TO_HOMEWORK,
  SET_ADD_QUESTIONS_TO_HOMEWORK,
  ADD_QUESTIONS_TO_HOMEWORK,
  ADD_QUESTIONS_FROM_HOMEWORK_URL,
  GET_BUTTON_LOADER,
  SET_BUTTON_LOADER,
  SET_GENERAL_GLOBAL_CLASSES,
  GET_GENERAL_GLOBAL_CLASSES,
  FETCH_GENERAL_GLOBAL_CLASSES,
  FETCH_GENERAL_GLOBAL_CLASSES_URL,
  GET_IS_OWN_QUESTION_DELETING,
  GET_DELETE_OWN_QUESTION_DATA,
  SET_DELETE_OWN_QUESTION_DATA,
  DELETE_OWN_QUESTION,
  DELETE_OWN_URL,
  SET_IS_OWN_QUESTION_DELETING,
} from "./constant";

const state = {
  question_topic_list: [],
  questions_list: null,
  global_classes: null,
  question_details: null,
  question_removed: null,
  report_question_error: "",
  add_question_to_homework: "",
  is_topic_loading: true,
  is_question_loading: true,
  is_button_loading: false,
  is_own_question_deleting: false,
  delete_own_question_data: null,
};

const getters = {
  [GET_CLASS_TOPICS]: (state) => state.question_topic_list,
  [GET_CLASS_QUESTIONS]: (state) => state.questions_list,
  [GET_GENERAL_GLOBAL_CLASSES]: (state) => state.global_classes,
  [GET_ADD_QUESTIONS_TO_HOMEWORK]: (state) => state.add_question_to_homework,
  [GET_REMOVED_QUESTIONS_FROM_HOMEWORK]: (state) => state.question_removed,
  // ERROR GETTERS
  [GET_REPORT_QUESTION_ERROR]: (state) => state.report_question_error,

  // LOADERS GETTER
  [GET_CLASS_TOPICS_LOADER]: (state) => state.is_topic_loading,
  [GET_CLASS_QUESTIONS_LOADER]: (state) => state.is_question_loading,
  [GET_BUTTON_LOADER]: (state) => state.is_button_loading,
  [GET_IS_OWN_QUESTION_DELETING]: (state) => state.is_own_question_deleting,
  [GET_DELETE_OWN_QUESTION_DATA]: (state) => state.delete_own_question_data,
};

const mutations = {
  [SET_CLASS_TOPICS](state, payload) {
    state.question_topic_list = payload;
  },
  [SET_IS_OWN_QUESTION_DELETING](state, payload) {
    state.is_own_question_deleting = payload;
  },
  [SET_CLASS_QUESTIONS](state, payload) {
    state.questions_list = payload;
  },
  [SET_GENERAL_GLOBAL_CLASSES](state, payload) {
    state.global_classes = payload;
  },

  [SET_ADD_QUESTIONS_TO_HOMEWORK](state, payload) {
    state.add_question_to_homework = payload;
  },
  [SET_REMOVED_QUESTIONS_FROM_HOMEWORK](state, payload) {
    state.question_removed = payload;
  },

  [SET_REPORT_QUESTION_ERROR](state, payload) {
    state.report_question_error = payload;
  },
  [SET_DELETE_OWN_QUESTION_DATA](state, payload) {
    state.delete_own_question_data = payload;
  },

  // LOADERS MUTATIONS OR SETTERS
  [SET_CLASS_TOPICS_LOADER](state, payload) {
    state.is_topic_loading = payload;
  },
  [SET_CLASS_QUESTIONS_LOADER](state, payload) {
    state.is_question_loading = payload;
  },
  [SET_BUTTON_LOADER](state, payload) {
    state.is_button_loading = payload;
  },
};

const actions = {
  // get topics by terms ...
  [FETCH_CLASS_TOPICS]({ commit }, payload) {
    // get the homework data from LS
    commit(SET_CLASS_TOPICS_LOADER, true, { root: true });
    getData(CLASS_TOPICS_URL(payload))
      .then((response) => {
        // console.log("Topic", response);

        commit(SET_CLASS_TOPICS, response?.data, { root: true });
        commit(SET_CLASS_TOPICS_LOADER, false, { root: true });
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_CLASS_TOPICS_LOADER, false, { root: true });
        throw new Error(err);
      });
  },

  // get general classes by terms ... ie junior secoundary, senior secoundary
  [FETCH_GENERAL_GLOBAL_CLASSES]({ commit }) {
    getData(FETCH_GENERAL_GLOBAL_CLASSES_URL)
      .then((response) => {
        commit(SET_GENERAL_GLOBAL_CLASSES, response?.data, { root: true });
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        throw new Error(err);
      });
  },

  // get topic Questions
  [FETCH_CLASS_QUESTIONS]({ commit }, payload) {
    // get the homework data from LS
    if (!payload?.dont_show_loader) {
      commit(SET_CLASS_QUESTIONS_LOADER, true, { root: true });
    }
    getData(
      CLASS_QUESTIONS_URL(
        {
          ...payload?.data,
          global_class_id: payload.global_class_id,
        },
        payload?.page || 1,
        payload?.tour ?? false
      )
    )
      .then((response) => {
        // console.log("Questions", response);
        commit(SET_CLASS_QUESTIONS, response?.data, { root: true });
        commit(SET_CLASS_QUESTIONS_LOADER, false, { root: true });
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        throw new Error(err);
      });
  },

  //remove question from homework
  [REMOVE_QUESTIONS_FROM_HOMEWORK]({ commit }, payload) {
    commit(SET_IS_QUESTION_LOADING, true);
    deleteData(REMOVE_QUESTIONS_FROM_HOMEWORK_URL(payload))
      .then((response) => {
        commit(SET_REMOVED_QUESTIONS_FROM_HOMEWORK, response, { root: true });
        commit(SET_IS_QUESTION_LOADING, false);
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_QUESTION_LOADING, false);
        throw new Error(err);
      });
  },

  // add questions to homework
  [ADD_QUESTIONS_TO_HOMEWORK]({ commit }, payload) {
    commit(SET_BUTTON_LOADER, true);
    putData(ADD_QUESTIONS_FROM_HOMEWORK_URL(payload.urlParams), payload.data)
      .then((response) => {
        commit(SET_ADD_QUESTIONS_TO_HOMEWORK, response, { root: true });
        commit(SET_BUTTON_LOADER, false);
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_BUTTON_LOADER, false);
        throw new Error(err);
      });
  },

  // report question error
  [REPORT_QUESTION_ERROR]({ commit }, payload) {
    postData(REPORT_QUESTION_ERROR_URL, payload)
      .then((response) => {
        commit(SET_REPORT_QUESTION_ERROR, response, { root: true });
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        throw new Error(err);
      });
  },
  [DELETE_OWN_QUESTION]({ commit }, payload) {
    commit(SET_IS_OWN_QUESTION_DELETING, true);
    deleteData(DELETE_OWN_URL(payload))
      .then((response) => {
        commit(SET_DELETE_OWN_QUESTION_DATA, response?.data);
        commit(SET_IS_OWN_QUESTION_DELETING, false);
      })
      .catch((err) => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_OWN_QUESTION_DELETING, false);
        throw new Error(err);
      });
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
