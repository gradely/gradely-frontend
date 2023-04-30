<template>
  <div
    class="
      summer-card
      w-100
      h-100
      rounded-12
      box-shadow-effect
      overflow-hidden
      pointer
      smooth-transition
    "
    @click="viewCourseInfo"
  >
    <!-- TOP CARD -->
    <div
      class="top-card brand-navy-bg"
      :class="card_size === 'small' ? null : 'top-card-large'"
    >
      <div class="title-text brand-inverse-light font-weight-600">
        {{ course.name }}
      </div>

      <div
        class="course-selector rounded-30 pointer smooth-transition ignore"
        v-if="$route.name === 'GradelySummerCourses'"
      >
        <div class="icon icon-plus ignore"></div>
        <div class="text font-weight-600 ignore">SELECT</div>
      </div>
    </div>

    <!-- BOTTOM CARD -->
    <div class="bottom-card w-100 h-100 position-relative">
      <img v-lazy="course.image" :alt="course.name" />
    </div>
  </div>
</template>

<script>
export default {
  name: "summerCard",

  props: {
    card_size: {
      type: String,
      default: "small",
    },

    course: Object,
  },

  methods: {
    viewCourseInfo($event) {
      if (!$event.target.classList.contains("ignore")) {
        this.$router.push({
          name: "GradelySummerCourseInfo",
          params: { id: this.$route.params.id, slug: this.course.slug },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.summer-card {
  &:hover {
    transform: scale(0.98);
  }

  .top-card {
    @include flex-row-between-nowrap;
    padding: toRem(16) toRem(13);

    @include breakpoint-down(sm) {
      padding: toRem(12);
    }

    @include breakpoint-down(xs) {
      padding: toRem(10) toRem(8);
    }

    .title-text {
      font-size: toRem(12);

      @include breakpoint-down(sm) {
        font-size: toRem(11);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(10);
      }
    }

    .course-selector {
      @include flex-row-center-nowrap;
      padding: toRem(9) toRem(17);
      color: $white-text;
      border: toRem(1) solid $white-text;

      &:hover {
        background: $white-text;
        color: $brand-navy;
      }

      .icon {
        margin-right: toRem(8);
        font-size: toRem(17);
      }

      .text {
        font-size: toRem(11);
      }

      &-active {
        background: $white-text;
        color: $brand-navy;
      }
    }
  }

  .top-card-large {
    padding: toRem(17.5) toRem(16);

    @include breakpoint-down(sm) {
      padding: toRem(16.5) toRem(14);
    }

    .title-text {
      font-size: toRem(13.75);

      @include breakpoint-down(sm) {
        font-size: toRem(12.75);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(12.45);
      }
    }
  }

  .bottom-card {
    img {
      @include background-cover;
    }
  }
}
</style>