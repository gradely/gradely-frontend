import { mapGetters } from 'vuex';

const MixinAuthUser = {
  computed: {
    ...mapGetters({
      authType: 'auth/getAuthAccount',
      authUser: 'auth/getAuthUser',
    }),

    // GET AUTH TYPE
    getAuthType() {
      let types = ['school', 'teacher', 'parent', 'student', 'tutor'];
      return this.authType ? types[Number(this.authType)] : false;
    },

    // GET AUTH USER DATA
    getAuthUser() {
      return Object.keys(this.authUser).length ? this.authUser : {};
    },
  },
};

export { MixinAuthUser };
