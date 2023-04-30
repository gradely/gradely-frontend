import { $serviceApi as api } from '../../../services/service-api';
import { ActionTree } from 'vuex';
import { AuthModel } from '../../models/auth-models';

const routes = {
  login: '/auth/login',
  logout: '/logout',
  validate: '/validate',
  sms_login: '/sms/validate',
  check_token: '/auth/check',
  refresh_token: '/auth/refresh',
  auth_profile: '/auth/profile',
};

const authActions: ActionTree<AuthModel, any> = {
  // HANDLE USER LOGIN
  async loginUser({ commit }, data: any) {
    let response = await api.newService('old').push(routes.login, data);

    if (response) {
      if (response.code === 200)
        commit('AUTH_SUCCESS', { response: response.data, auth: true });
      return response;
    } else return false;
  },

  // CHECK IF THE TOKEN IS VALID
  async checkTokenValidity() {
    return await api.newService('old').push(routes.check_token, null, false);
  },

  // GENERATE NEW TOKEN SET
  async generateTokenSet({ commit }) {
    let response = await api.newService('old').push(routes.refresh_token, {
      refresh_token: localStorage.getItem('gradelyCapEntryToken'),
    } as any);

    return response?.code === 200
      ? commit('UPDATE_TOKEN_SET', response.data)
      : commit('AUTH_LOGOUT');
  },

  // GET USER PROFILE DATA
  async getActiveUserProfile({ commit }) {
    let response = await api.newService('old').fetch(routes.auth_profile);
    if (response) {
      commit('AUTH_SUCCESS', { response: response.data });
      return response;
    }
  },

  // LOGIN USER BY TOKEN
  async loginUserByToken({ commit }, token: string) {
    let response = await api
      .service('old')
      .push(`${routes.sms_login}?token=${token}`);

    //SET STATE IF VALIDATED PROPERLY
    if (response) {
      if (response.code === 200)
        commit('AUTH_SUCCESS', { response: response.data, auth: true });
      return response;
    } else return false;
  },

  // Token is expired or not valid!

  // HANDLE USER LOGOUT
  async logoutUser({ commit }) {
    let response = await api.service('old').push(routes.logout);
    if (response) {
      commit('AUTH_LOGOUT');
      return response;
    }
  },

  updateUserImage({ commit }, image: any) {
    commit('UPDATE_USER_IMAGE', image);
  },
};

export { authActions as default };
