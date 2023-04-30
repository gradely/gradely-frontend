import { getData, postData, putData } from "../../../services/api/Axios.method";
import { getLocalStorage } from "../../../services/localStorageMgt";
import { SET_NETWORK_ERROR_MESSAGE } from "../../../store/module/general/constant";
import {
  BULK_QUESTIONS_URL,
  CLASS_QUESTIONS_DETAILS_URL,
  QUESTIONS_URL,
  EXCEL_FORMAT_QUESTIONS_URL,
  FETCH_CLASS_QUESTION_DETAILS,
  FETCH_TOPIC_LIST,
  CREATE_TOPIC,
  GET_BULK_QUESTIONS,
  GET_CLASS_QUESTION_DETAILS,
  GET_CREATE_QUESTIONS,
  GET_QUESTION_LOADING,
  GET_EXTRACTED_QUESTIONS,
  GET_TOPICS_LIST,
  GET_TOPICS_LOADING,
  POST_BULK_QUESTIONS,
  POST_CREATE_QUESTIONS,
  POST_EXTRACT_EXCEL_FORMAT_QUESTIONS,
  POST_EXTRACT_TEXT_AIKEN_FORMAT_QUESTIONS,
  SEARCH_TOPICS,
  SEARCH_TOPICS_URL,
  SET_BULK_QUESTIONS,
  SET_CLASS_QUESTION_DETAILS,
  SET_CREATE_QUESTIONS,
  SET_EXTRACTED_QUESTIONS,
  SET_QUESTION_LOADING,
  SET_TOPICS_LOADING,
  SET_TOPIC_LIST,
  ADD_TOPIC,
  SET_TOPIC_STATUS,
  GET_TOPIC_STATUS,
  TEXT_AIKEN_FORMAT_QUESTIONS_URL,
  TOPICS_URL,
  NEW_TOPIC_URL,
  GET_IS_EXTRACTING,
  SET_IS_EXTRACTING,
  SET_IS_UPLOADING,
  GET_IS_UPLOADING,
  GET_IS_EDITING,
  SET_IS_EDITING,
  GET_EDIT_QUESTION,
  SET_EDIT_QUESTION,
  PUT_EDIT_QUESTION,
  GET_IS_SINGLE_LOADING,
  SET_IS_SINGLE_LOADING
} from "./constants";

const state = {
  bulk_questions: "",
  question_created: "",
  topic_list: [],
  isTopicsLoading: false,
  is_question_loading: false,
  editable_question: null,
  isExtracting: false,
  extracted_questions: null,
  is_uploading: false,
  is_editing: false,
  edit_question_data: null,
  is_single_loading: false,
  topic_status: false
};

const getters = {
  [GET_BULK_QUESTIONS]: state => state.bulk_questions,
  [GET_CREATE_QUESTIONS]: state => state.question_created,
  [GET_TOPICS_LIST]: state => state.topic_list,
  [GET_TOPICS_LOADING]: state => state.isTopicsLoading,
  [GET_QUESTION_LOADING]: state => state.is_question_loading,
  [GET_CLASS_QUESTION_DETAILS]: state => state.editable_question,
  [GET_IS_EXTRACTING]: state => state.isExtracting,
  [GET_EXTRACTED_QUESTIONS]: state => state.extracted_questions,
  [GET_IS_UPLOADING]: state => state.is_uploading,
  [GET_IS_EDITING]: state => state.is_editing,
  [GET_EDIT_QUESTION]: state => state.edit_question_data,
  [GET_IS_SINGLE_LOADING]: state => state.is_single_loading,
  [GET_TOPIC_STATUS]: state => state.topic_status
};

const mutations = {
  [SET_BULK_QUESTIONS](state, payload) {
    state.bulk_questions = payload;
  },
  [SET_CREATE_QUESTIONS](state, payload) {
    state.question_created = payload;
  },
  [SET_TOPIC_LIST](state, payload) {
    state.topic_list = payload;
  },
  [ADD_TOPIC](state, topic) {
    if (Object.keys(state.topic_list).length) {
      state.topic_list.data.splice(0, 0, topic.data);
    } else {
      state.topic_list = { ...topic, data: [topic.data] };
    }
  },
  [SET_TOPIC_STATUS](state, status) {
    state.topic_status = status;
  },
  [SET_TOPICS_LOADING](state, payload) {
    state.isTopicsLoading = payload;
  },
  [SET_QUESTION_LOADING](state, payload) {
    state.is_question_loading = payload;
  },
  [SET_CLASS_QUESTION_DETAILS](state, payload) {
    state.editable_question = payload;
  },
  [SET_IS_EXTRACTING](state, payload) {
    state.isExtracting = payload;
  },
  [SET_EXTRACTED_QUESTIONS](state, payload) {
    state.extracted_questions = payload;
  },
  [SET_IS_UPLOADING](state, payload) {
    state.is_uploading = payload;
  },
  [SET_IS_EDITING](state, payload) {
    state.is_editing = payload;
  },
  [SET_EDIT_QUESTION](state, payload) {
    state.edit_question_data = payload;
  },
  [SET_IS_SINGLE_LOADING](state, payload) {
    state.is_single_loading = payload;
  }
};

const actions = {
  // create questions
  [POST_CREATE_QUESTIONS]({ commit }, payload) {
    commit(SET_QUESTION_LOADING, true);
    postData(QUESTIONS_URL(payload?.param), payload?.data)
      .then(response => {
        commit(SET_CREATE_QUESTIONS, response?.data, { root: true });
        commit(SET_QUESTION_LOADING, false);
      })
      .catch(err => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_QUESTION_LOADING, false);
        throw new Error(err);
      });
  },

  //fetch single question
  [FETCH_CLASS_QUESTION_DETAILS]({ commit }, data) {
    commit(SET_IS_SINGLE_LOADING, true);
    getData(CLASS_QUESTIONS_DETAILS_URL(data))
      .then(response => {
        commit(SET_IS_SINGLE_LOADING, false);
        commit(SET_CLASS_QUESTION_DETAILS, response?.data, { root: true });
      })

      .catch(err => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_SINGLE_LOADING, false);
        throw new Error(err);
      });
  },

  // create bulk questions
  [POST_BULK_QUESTIONS]({ commit }, data) {
    commit(SET_IS_UPLOADING, true);
    postData(BULK_QUESTIONS_URL, data)
      .then(response => {
        commit(SET_BULK_QUESTIONS, response?.data, { root: true });
        commit(SET_IS_UPLOADING, false);
      })
      .catch(err => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_UPLOADING, false);
        throw new Error(err);
      });
  },

  // extract questions from txt file
  [POST_EXTRACT_EXCEL_FORMAT_QUESTIONS]({ commit }, data) {
    commit(SET_IS_EXTRACTING, true);
    const optionalHeader = {
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getLocalStorage("gradelyAuthToken")}`
      }
    };
    postData(EXCEL_FORMAT_QUESTIONS_URL, data, optionalHeader?.headers)
      .then(response => {
        commit(SET_IS_EXTRACTING, false);
        commit(SET_EXTRACTED_QUESTIONS, response?.data, { root: true });
      })
      .catch(err => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_EXTRACTING, false);
        throw new Error(err);
      });
  },

  // extract questions from excel file
  [POST_EXTRACT_TEXT_AIKEN_FORMAT_QUESTIONS]({ commit }, data) {
    commit(SET_IS_EXTRACTING, true);
    const optionalHeader = {
      data,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    postData(TEXT_AIKEN_FORMAT_QUESTIONS_URL, data, optionalHeader?.headers)
      .then(response => {
        commit(SET_IS_EXTRACTING, false);
        commit(SET_EXTRACTED_QUESTIONS, response?.data, {
          root: true
        });
      })
      .catch(err => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_EXTRACTING, false);
        throw new Error(err);
      });
  },
  [FETCH_TOPIC_LIST]({ commit }, data) {
    commit(SET_TOPICS_LOADING, true);
    getData(TOPICS_URL(data))
      .then(response => {
        if (response?.data?.code === 200) {
          commit(SET_TOPIC_LIST, response?.data, {
            root: true
          });
        }
        commit(SET_TOPICS_LOADING, false);
      })
      .catch(err => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_TOPICS_LOADING, false);
        throw new Error(err);
      });
  },

  async [CREATE_TOPIC]({ commit }, topicPayload) {
    try {
      const optionalHeader = {
        topicPayload,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalStorage("gradelyAuthToken")}`
        }
      };

      let response = await postData(
        NEW_TOPIC_URL,
        topicPayload,
        optionalHeader?.headers
      );

      if (response?.data?.code === 200) {
        commit(ADD_TOPIC, response?.data, {
          root: true
        });
      }

      return response?.data;
    } catch (err) {
      commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
      throw new Error(err);
    }
  },

  async searchTopics({commit},payload){
    try{
      return await getData(SEARCH_TOPICS_URL(payload));
    }
    catch(err){
      commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
      throw new Error(err);
    }
  },

  [SEARCH_TOPICS]({ commit }, data) {
    commit(SET_TOPICS_LOADING, true);

    getData(SEARCH_TOPICS_URL(data))
      .then(response => {
        if (!response?.data?.data) {
          return;
        }

        let new_topic_list = [
          ...state?.topic_list?.data,
          ...response?.data?.data
        ].filter((topic, index, topics) => {
          return (
            index === topics.findIndex(new_topic => new_topic.id === topic.id)
          );
        });

        commit(
          SET_TOPIC_LIST,
          {
            ...state.topic_list,
            data: new_topic_list
          },
          {
            root: true
          }
        );
        commit(SET_TOPICS_LOADING, false);
      })
      .catch(err => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_TOPICS_LOADING, false);
        throw new Error(err);
      });
  },

  // edit question
  [PUT_EDIT_QUESTION]({ commit }, payload) {
    commit(SET_IS_EDITING, true);
    putData(QUESTIONS_URL({ id: payload.homework_id }), payload?.data)
      .then(response => {
        commit(SET_EDIT_QUESTION, response?.data, {
          root: true
        });
        commit(SET_IS_EDITING, false);
      })
      .catch(err => {
        commit(SET_NETWORK_ERROR_MESSAGE, err, { root: true });
        commit(SET_IS_EDITING, false);
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
