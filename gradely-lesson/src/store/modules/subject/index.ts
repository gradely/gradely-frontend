import { Module } from 'vuex';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const subjectModule: Module<any, any> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export { subjectModule as default };
