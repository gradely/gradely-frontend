import { GetterTree } from 'vuex';

// MODELS
import { AuthModel } from '@/store/models';

const authGetters: GetterTree<AuthModel, any> = {
  getAuthUser: (state) => state.authUser,
  getAuthToken: (state) => state.token,
  getAuthAccount: (state) => state.authUser.cap_token.slice(-1),
};

export { authGetters as default };
