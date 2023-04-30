<template>
  <div class="child-onboarding-card rounded-10">
    <!-- STUDENT IMAGE -->
    <div class="student-image avatar mgb-10 rounded-30 brand-inverse-light-bg">
      <img :src="student.image" class="avatar-img" :alt="student.full_name" />
    </div>

    <!-- STUDENT NAME -->
    <div class="student-name mgb-4 color-text font-weight-700 text-center">
      {{ student.full_name }}
    </div>

    <!-- STUDENT CODE -->
    <div class="student-code color-grey-dark text-center">
      {{ student.code }}
    </div>
  </div>
</template>

<script>
export default {
  name: "childOnboardingCard",

  props: {
    student: Object,
  },
};
</script>

<style lang="scss" scoped>
.child-onboarding-card {
  border: toRem(1) solid #e5e5e5;
  @include flex-column-center;
  box-sizing: border-box;
  margin: 0 toRem(5);
  min-width: toRem(180);
  width: toRem(180);
  height: toRem(190);

  @include breakpoint-down(sm) {
    margin: 0 toRem(3);
    min-width: toRem(140);
    width: toRem(145);
    height: toRem(155);
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }

  .student-image {
    border-radius: toRem(20);
    @include square-shape(90);

    @include breakpoint-down(sm) {
      border-radius: toRem(10) !important;
      @include square-shape(70);
    }

    img {
      border-radius: inherit;
    }
  }

  .student-name {
    @include font-height(13.25, 19);

    @include breakpoint-down(sm) {
      @include font-height(11.75, 16);
    }
  }

  .student-code {
    @include font-height(12, 17);

    @include breakpoint-down(sm) {
      @include font-height(11, 15);
    }
  }
}
</style>