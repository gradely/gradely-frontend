import { postData } from "../../../services/api/Axios.method";
import { cleanUpDate } from "../../../services/dateMgt";
import {
  CREATE_HOME_WORK,
  GET_HOME_WORK,
  HOME_WORK_HOME_WORK,
  SET_HOME_WORK,
  GET_IS_LOADING,
  SET_IS_LOADING
} from "./constant";

const state = {
  homework: null,
  isLoading: false
};

const getters = {
  [GET_HOME_WORK]: (state) => state.homework,
  [GET_IS_LOADING]: (state) => state.isLoading
};

const mutations = {
  [SET_HOME_WORK](state, payload) {
    state.homework = payload;
  },
  [SET_IS_LOADING](state, payload) {
    state.isLoading = payload;
  }
};

const actions = {
  async [CREATE_HOME_WORK]({ commit }, payload) {
    commit(SET_IS_LOADING, true);
    await postData(HOME_WORK_HOME_WORK, payload)
      .then((response) => {
        const homework = response?.data?.data;
        const homework_content = {
          id: homework?.id,
          title: homework?.title,
          subject_id: homework?.subject?.id,
          global_class_id: 7,
          class_id: homework?.class_id,
          questionCount: homework?.questionCount,
          open_date: cleanUpDate(homework?.open_date),
          close_date: cleanUpDate(homework?.close_date),
          tag: homework.tag
        };
        // set payload to store
        commit(SET_HOME_WORK, homework_content, { root: true });
        commit(SET_IS_LOADING, false);
        // set payload to localstorage..
      })
      .catch((error) => {});
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
