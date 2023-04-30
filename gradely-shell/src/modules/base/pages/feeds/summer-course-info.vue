<template>
  <div class="gradely-app-container topnav-base-offset">
    <div
      class="
        gradely-container
        px-2 px-sm-3 px-md-4 px-xl-5
        mx-auto
        smooth-animation
      "
    >
      <!-- COURSE DESCRIPTION -->
      <div class="course-description">
        <div class="left-section">
          <course-description-block :course="summer_course_info" />
        </div>

        <div class="right-section">
          <course-enroll-block />
        </div>
      </div>

      <!-- COURSE OUTLINES -->
      <div class="course-outlines">
        <div class="title font-weight-600 brand-primary mgb-30">
          What you’ll learn
        </div>

        <div class="row">
          <div
            class="col-12 col-md-6"
            v-for="(course, index) in getCourseOutlines"
            :key="index"
          >
            <course-outlines :course="course" />
          </div>
        </div>
      </div>

      <!-- COURSE INSTRUCTORS -->
      <course-instructor-card v-if="false" />
    </div>

    <!-- COURSE DISCOVERY -->
    <div class="discovery-block mgt-70">
      <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 mx-auto">
        <div class="title brand-navy font-weight-700">
          Discover other courses
        </div>

        <!-- COURSE LIST -->
        <div class="courses row">
          <div
            class="col-12 col-sm-6 col-md-4 card-cover"
            v-for="(course, index) in other_courses"
            :key="index"
          >
            <summer-card card_size="large" :course="course" />
          </div>
        </div>

        <!-- COURSES BUTTON -->
        <router-link
          :to="{
            name: 'GradelySummerCourses',
            params: { id: $route.params.id },
          }"
          class="btn btn-whitish mgt-25 border-brand-primary"
          style="width: max-content"
        >
          SEE ALL COURSES
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SUMMER_COURSES from "@/store/general/summer-courses";
import courseDescriptionBlock from "@/modules/base/components/feed-comps/summer-courses/course-description-block";
import courseEnrollBlock from "@/modules/base/components/feed-comps/summer-courses/course-enroll-block";
import courseOutlines from "@/modules/base/components/feed-comps/summer-courses/course-outlines";
import courseInstructorCard from "@/modules/base/components/feed-comps/summer-courses/course-instructor-card";

export default {
  name: "SummerCourseInfo",

  components: {
    courseDescriptionBlock,
    courseEnrollBlock,
    courseOutlines,
    courseInstructorCard,
    summerCard: () =>
      import(
        /* Summer */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/summer-card"
      ),
  },

  computed: {
    getCourseOutlines() {
      return this.summer_course_info?.features ?? [];
    },
  },

  data: () => ({
    summer_courses: SUMMER_COURSES,
    summer_course_info: {},
    other_courses: [],
  }),

  watch: {
    $route: {
      handler() {
        this.loadSummerCourses();
        this.filterActiveCourse();
      },
      immediate: true,
    },
  },

  mounted() {
    this.$color.setPageBackgroundColor("#FFF");
  },

  methods: {
    ...mapActions({ getSummerCourses: "dbFeeds/getSummerCourses" }),

    filterActiveCourse() {
      this.summer_course_info = this.summer_courses.find(
        (course) => course.slug === this.$route.params.slug
      );
    },

    loadSummerCourses() {
      this.getSummerCourses()
        .then((response) => {
          if (response.code === 200) {
            let courses = response.data.filter(
              (course) => course.slug !== this.$route.params.slug
            );

            this.other_courses = courses.slice(0, 3);
          } else {
            this.show_summer = false;
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.gradely-app-container {
  margin-top: toRem(40);
  margin-bottom: 0 !important;

  @include breakpoint-down(md) {
    margin-top: toRem(20);
  }

  .course-description {
    @include flex-row-between-nowrap;
    align-items: flex-start;

    @include breakpoint-down(md) {
      @include flex-row-between-wrap;
    }

    .left-section {
      width: 62%;

      @include breakpoint-down(md) {
        width: 100%;
      }
    }

    .right-section {
      width: 30%;

      @include breakpoint-down(lg) {
        width: 35%;
      }

      @include breakpoint-down(md) {
        width: 100%;
      }
    }
  }

  .course-outlines {
    .title {
      margin-bottom: toRem(30);
      @include font-height(21, 30);

      @include breakpoint-down(lg) {
        @include font-height(19, 28);
      }

      @include breakpoint-down(md) {
        @include font-height(18, 26);
        margin-bottom: toRem(25);
        margin-top: toRem(45);
      }

      @include breakpoint-down(sm) {
        @include font-height(17, 24);
      }
    }
  }
}

.discovery-block {
  background: #f5f5f5;
  padding: toRem(60) 0;

  @include breakpoint-down(lg) {
    padding: toRem(45) 0;
  }

  .title {
    @include font-height(32, 45);
    margin-bottom: toRem(40);

    @include breakpoint-down(lg) {
      @include font-height(28, 40);
      margin-bottom: toRem(30);
    }

    @include breakpoint-down(md) {
      @include font-height(24, 36);
    }

    @include breakpoint-down(sm) {
      @include font-height(23, 34);
    }

    @include breakpoint-down(xs) {
      @include font-height(20, 32);
    }
  }

  .card-cover {
    height: toRem(240);
    margin-bottom: toRem(20);

    @include breakpoint-down(lg) {
      height: toRem(220);
    }
  }
}
</style>