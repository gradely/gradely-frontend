import { Module } from 'vuex';
import { AuthModel } from '@/store/models';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const authModule: Module<AuthModel, any> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

export { authModule as default };
