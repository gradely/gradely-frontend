<template>
  <div class="course-instructor-card">
    <div class="title font-weight-600 brand-primary mgb-20">
      Course Instructor
    </div>

    <!-- INSTRUCTOR INFO -->
    <div class="instructor-info">
      <!-- TUTOR IMAGE -->
      <div
        class="tutor-image rounded-25 position-relative brand-inverse-bg"
      ></div>

      <!-- TUTOR INFO -->
      <div class="tutor-info">
        <div class="name color-text mgb-10">Femi Ibiwoye</div>
        <div class="description color-ash">
          A short information about the instructor. Not more than 2 lines or 240
          characters.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "courseInstructorCard",
};
</script>

<style lang="scss" scoped>
.course-instructor-card {
  margin: toRem(50) 0 toRem(70);

  @include breakpoint-down(md) {
    margin: toRem(35) 0 toRem(70);
  }

  .title {
    @include font-height(17.75, 26);

    @include breakpoint-down(sm) {
      @include font-height(16.5, 25);
    }

    @include breakpoint-down(xs) {
      @include font-height(16.25, 24);
    }
  }

  .instructor-info {
    @include flex-row-start-nowrap;

    @include breakpoint-down(sm) {
      align-items: flex-start;
    }

    .tutor-image {
      @include square-shape(96);
      margin-right: toRem(30);

      @include breakpoint-down(md) {
        margin-right: toRem(20);
      }

      @include breakpoint-down(sm) {
        @include square-shape(85);
      }

      @include breakpoint-down(xs) {
        @include square-shape(80);
        margin-right: toRem(15);
      }
    }

    .name {
      @include font-height(14.75, 24);

      @include breakpoint-down(sm) {
        @include font-height(14.25, 20);
      }
    }

    .description {
      @include font-height(13.75, 25);
      width: 70%;

      @include breakpoint-down(sm) {
        @include font-height(13.5, 25);
        width: 80%;
      }

      @include breakpoint-down(xs) {
        @include font-height(13, 25);
        width: 95%;
      }
    }
  }
}
</style>