<template>
  <div
    class="
      book-meeting-card
      rounded-5
      brand-inverse-light-bg
      border-brand-inverse
      mgb-15
      smooth-transition
    "
  >
    <div class="left-info">
      <!-- TEXT DETAIL  -->
      <div class="text color-text">
        <div class="icon icon-question-hexagon"></div>
        <div>Need further assistance? Book a meeting.</div>
      </div>
    </div>

    <div class="d-flex justify-content-end align-items-center">
      <a
        href="https://calendly.com/boye1/meetboye"
        target="_blank"
        class="btn btn-accent"
        >Book a Meeting</a
      >

      <!-- CLOSE TRIGGER -->
      <div
        class="close-trigger rounded-circle pointer mgl-5"
        @click="$emit('closeMeeting')"
      >
        <div class="icon icon-close"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bookMeetingCard",

  components: {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.book-meeting-card {
  @include flex-row-between-nowrap;
  padding: toRem(12) toRem(18);

  @include breakpoint-down(md) {
    margin-bottom: toRem(20) !important;
  }

  @include breakpoint-down(sm) {
    padding: toRem(10) toRem(18);
    margin-bottom: toRem(15) !important;
  }

  @include breakpoint-down(xs) {
    padding: toRem(8) toRem(10);
  }

  @include breakpoint-custom-down(380) {
    @include flex-row-between-nowrap;
  }

  .left-info {
    @include flex-row-start-wrap;

    @include breakpoint-custom-down(610) {
      @include flex-column-start-start;
    }
  }

  .inner-wrapper {
    @include flex-row-start-nowrap;

    @include breakpoint-custom-down(610) {
      margin-top: toRem(10);
    }
  }

  .text {
    position: relative;
    @include flex-row-start-nowrap;
    @include font-height(13.25, 18);

    @include breakpoint-down(xl) {
      @include font-height(13.25, 18);
    }

    @include breakpoint-down(md) {
      @include font-height(13, 18);
    }

    @include breakpoint-down(sm) {
      @include font-height(12.25, 17);
    }

    @include breakpoint-down(xs) {
      @include font-height(11.5, 18);
      margin-right: toRem(10) !important;
    }

    .icon {
      font-size: toRem(19);
      margin-right: toRem(8);
    }
  }

  .btn {
    font-size: toRem(10);
    padding: toRem(9) toRem(20);
    margin-left: toRem(5);

    @include breakpoint-down(lg) {
      font-size: toRem(9.5);
      margin-left: toRem(3);
      padding: toRem(9.5) toRem(20);
    }

    @include breakpoint-down(sm) {
      font-size: toRem(9);
    }
  }

  .close-trigger {
    position: relative;
    @include square-shape(26);
    @include transition(0.4s);
    background: darken($brand-inverse-light, 12%);

    &:hover {
      background: darken($brand-red-light, 5%);
    }

    .icon {
      @include center-placement;
      font-size: toRem(13.5);
    }
  }
}
</style>
