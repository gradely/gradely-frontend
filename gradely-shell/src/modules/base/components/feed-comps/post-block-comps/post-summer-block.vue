<template>
  <div
    class="post-container-block rounded-10 mgb-10 smooth-animation"
    v-if="show_summer"
  >
    <img
      v-lazy="mxStaticImg('backgroundPattern.png', 'base')"
      alt="gradely-diagnostic"
      class="rounded-10"
    />

    <!-- CLOSE TRIGGER -->
    <div
      class="close-trigger pointer rounded-circle index-9"
      @click="$emit('closeSummerSchool')"
    >
      <div class="position-relative w-100 h-100">
        <div class="icon icon-close"></div>
      </div>
    </div>

    <!-- CONTENT BLOCK -->
    <div class="content-block w-100 h-auto index-1 border">
      <!-- TITLE TEXT -->
      <div class="title-text font-weight-600 brand-navy mgb-5 text-center">
        Join the Gradely Summer Program
      </div>

      <div class="meta-text color-text text-center">
        Find these and more fun life skills to learn during the holiday.
      </div>

      <!-- SUMMER COURSES ROW -->
      <div class="summer-row w-100">
        <div
          class="card-cover"
          v-for="(course, index) in summer_courses"
          :key="index"
        >
          <summer-card :course="course" />
        </div>
      </div>

      <!-- ENROLL BUTTON -->
      <router-link
        :to="{ name: 'GradelySummerCourses', params: { id: $route.params.id } }"
        class="enroll-btn font-weight-600 rounded-15 text-uppercase pointer"
      >
        Enroll for Summer School
      </router-link>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade"> </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "postDiagnosticsBlock",

  components: {
    summerCard: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/summer-card"
      ),
  },

  data: () => ({
    show_summer: true,
    summer_courses: [],
  }),

  mounted() {
    this.loadSummerCourses();
  },

  methods: {
    ...mapActions({ getSummerCourses: "dbFeeds/getSummerCourses" }),

    loadSummerCourses() {
      this.getSummerCourses()
        .then((response) => {
          if (response.code === 200) {
            this.summer_courses = response.data.slice(0, 3);
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
.post-container-block {
  background: $brand-inverse-light;

  img {
    @include background-cover;
    @include full-width-height;
    mix-blend-mode: soft-light;
  }

  .close-trigger {
    @include square-shape(30);
    @include transition(0.4s);
    background: $white-text;
    position: absolute;
    right: toRem(18);
    top: toRem(18);

    @include breakpoint-down(sm) {
      @include square-shape(26);
      right: toRem(12);
      top: toRem(12);
    }

    &:hover {
      background: $brand-red-light;
    }

    .icon {
      @include center-placement;
      font-size: toRem(15);
      color: $brand-navy;

      @include breakpoint-down(sm) {
        font-size: toRem(12);
      }
    }
  }

  .content-block {
    @include flex-column-center;
    padding: toRem(30) toRem(10);
    position: relative;

    @include breakpoint-down(sm) {
      padding: toRem(25) toRem(5);
    }

    .title-text {
      @include font-height(16, 29);

      @include breakpoint-down(md) {
        @include font-height(15.5, 26);
      }

      @include breakpoint-down(sm) {
        @include font-height(14.25, 22);
      }

      @include breakpoint-down(xs) {
        @include font-height(13.25, 21);
      }
    }

    .meta-text {
      @include font-height(13.25, 19);

      @include breakpoint-down(sm) {
        @include font-height(12.5, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(11.75, 18);
      }
    }

    .summer-row {
      @include flex-row-center-nowrap;
      margin: toRem(30) auto;

      .card-cover {
        height: toRem(155);
        width: 33%;
        padding: 0 toRem(5);

        @include breakpoint-down(sm) {
          padding: 0 toRem(3.5);
          height: toRem(145);
          width: 33.5%;
        }

        @include breakpoint-down(xs) {
          padding: 0 toRem(3.5);
          height: toRem(135);
        }
        @include breakpoint-custom-down(380) {
          padding: 0 toRem(2);
          height: toRem(120);
          width: 34%;
        }
      }
    }

    .enroll-btn {
      background: $white-text;
      padding: toRem(10) toRem(21);
      font-size: toRem(10.75);
      color: $color-text;
      @include transition(0.45s);

      @include breakpoint-down(xs) {
        padding: toRem(9) toRem(19);
        font-size: toRem(10.25);
      }

      &:hover {
        background: $brand-primary;
        color: $white-text;
      }

      span {
        text-decoration: underline;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
