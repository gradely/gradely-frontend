const weekly = {
  data: () => ({
    loading: true,
    empty_state: false,

    weekly_data: [],
    pagination: {
      pageCount: 0,
    },
  }),

  methods: {
    // SET PAGE DATA
    setPageData(
      loading = false,
      empty = true,
      state = [],
      paging = {},
      check_length = false
    ) {
      this.loading = loading;
      this.empty_state = empty;
      this.weekly_data = state;
      this.pagination = paging;

      // CHECK DATA LENGTH
      if (check_length) {
        if (this.weekly_data.length === 0) {
          this.loading = false;
          this.empty_state = true;
        }
      }
    },

    // SET PAGE COUNTER
    setCounter() {
      if (this.$route.query.counter === 0) return 0;
      else if (this.$route.query.counter > 0) return this.$route.query.counter;
      else return this.$route.query.counter;
    },
  },
};

export default weekly;
