import { mapGetters } from "vuex";

const MixinAuthUser = {
  computed: {
    ...mapGetters({
      authType: "auth/getAuthAccount",
      authUser: "auth/getAuthUser",
      authToken: "auth/getAuthToken",
    }),

    // GET AUTH TYPE
    getAuthType() {
      let types = ["school", "teacher", "parent", "student"];
      return this.authType ? types[Number(this.authType)] : false;
    },

    // GET AUTH USER DATA
    getAuthUser() {
      return Object.keys(this.authUser).length ? this.authUser : {};
    },

    // GET AUTH TOKEN DATA
    getAuthToken() {
      return this.authToken ? this.authToken : null;
    },
  },
};

export { MixinAuthUser };
