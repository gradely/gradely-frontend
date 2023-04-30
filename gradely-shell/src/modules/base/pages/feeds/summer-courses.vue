<template>
  <div
    class="summer-layout gradely-container px-0 px-sm-1 px-md-1 px-xl-4 mx-auto"
  >
    <!-- CLOSE TRIGGER -->
    <div class="close-trigger pointer smooth-transition rounded-circle">
      <div class="position-relative w-100 h-100">
        <div class="icon icon-close"></div>
      </div>
    </div>

    <!-- TITLE TEXT -->
    <div class="title-text brand-navy font-weight-600">
      What will you like to Learn?
    </div>

    <!-- SUMMER COURSES -->
    <div class="summer-row row">
      <div
        class="col-12 col-sm-6 col-md-4 card-cover"
        v-for="(course, index) in summer_courses"
        :key="index"
      >
        <summer-card card_size="large" :course="course" />
      </div>
    </div>

    <!-- PAYMENT BUTTON -->
    <button class="btn btn-accent mgb-40">Continue to Payment</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "summerCourses",

  components: {
    summerCard: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/summer-card"
      ),
  },

  data: () => ({
    summer_courses: [],
  }),

  mounted() {
    this.loadSummerCourses();
  },

  methods: {
    ...mapActions({
      getSummerCourses: "dbFeeds/getSummerCourses",
      getActiveSummerCourses: "dbFeeds/getActiveSummerCourses",
    }),

    loadSummerCourses() {
      this.getSummerCourses()
        .then((response) => {
          if (response.code === 200) {
            this.summer_courses = response.data;
            this.getRegisteredCourses();
          } else {
            this.show_summer = false;
          }
        })
        .catch((err) => console.log(err));
    },

    getRegisteredCourses() {
      let child_id = this.$route.params.id;

      this.getActiveSummerCourses(child_id)
        .then((response) => {
          console.log("response payload", response);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.summer-layout {
  @include flex-column-center;
  justify-content: flex-start;
  padding-top: toRem(70);
  position: relative;
  height: 100%;

  @include breakpoint-down(sm) {
    padding-top: toRem(50);
  }

  .close-trigger {
    @include square-shape(42);
    background: $brand-inverse-light;
    position: absolute;
    right: toRem(0);
    top: toRem(30);

    @include breakpoint-down(lg) {
      @include square-shape(36);
    }

    @include breakpoint-down(sm) {
      right: toRem(6);
    }

    &:hover {
      background: $brand-red-light;
    }

    .icon {
      @include center-placement;
      font-size: toRem(18);

      @include breakpoint-down(lg) {
        font-size: toRem(17);
      }
    }
  }

  .title-text {
    @include font-height(24, 36);
    margin-bottom: toRem(50);

    @include breakpoint-down(md) {
      @include font-height(23, 30);
      margin-bottom: toRem(40);
    }

    @include breakpoint-down(sm) {
      @include font-height(22, 28);
      margin-bottom: toRem(35);
    }

    @include breakpoint-down(xs) {
      @include font-height(19, 25);
    }
  }

  .summer-row {
    @include flex-row-center-wrap;
    margin-bottom: toRem(20);
    width: 95%;

    .card-cover {
      height: toRem(255);
      margin-bottom: toRem(20);
    }
  }
}
</style>