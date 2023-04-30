export default {
  getAuthUser: (state) => state.authUser,
  getAuthToken: (state) => state.token,
  getAuthAccount: (state) => state.authUser.cap_token.slice(-1),
};
