<template>
  <div
    class="
      post-catchup-card
      rounded-5
      white-text-bg
      overflow-hidden
      h-auto
      smooth-transition
      pointer
    "
  >
    <!-- IMAGE TOP  -->
    <div class="top">
      <img
        v-lazy="
          `${getAssetBaseURL(
            'cloud',
            'gradely'
          )}/image/upload/v1639028044/PracticeCardOne_cithwy.svg`
        "
        alt=""
      />
    </div>

    <!-- TEXT CONTENT  -->
    <div class="bottom">
      <!-- SUB TEXT -->
      <div class="sub-text color-grey-dark">
        {{ card_type == "recommendation" ? "Practice" : "Diagnostic Test" }}
      </div>

      <!-- BASE TEXT -->
      <div class="base-text color-text font-weight-600">Approximation</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "postCatchupCard",

  props: {
    card_type: String,
  },
};
</script>

<style lang="scss" scoped>
.post-catchup-card {
  position: relative;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  min-width: toRem(170);
  width: toRem(170);
  margin-right: toRem(6);

  &:last-of-type {
    margin-right: toRem(3);
  }

  @include breakpoint-down(xl) {
    min-width: toRem(140);
    width: toRem(140);
  }

  @include breakpoint-down(lg) {
    min-width: toRem(155);
    width: toRem(155);
  }

  @include breakpoint-down(xs) {
    margin-right: toRem(5);
    min-width: toRem(140);
    width: toRem(140);
  }

  &:hover {
    transform: scale(0.98);
  }

  .top {
    position: relative;
    height: toRem(170);

    @include breakpoint-down(xl) {
      height: toRem(140);
    }

    @include breakpoint-down(lg) {
      height: toRem(155);
    }

    @include breakpoint-down(xs) {
      height: toRem(140);
    }

    img {
      @include background-cover;
    }
  }

  .bottom {
    padding: toRem(15) toRem(10);

    @include breakpoint-down(xl) {
      padding: toRem(13) toRem(9);
    }

    .sub-text {
      text-transform: uppercase;
      @include font-height(11, 13);
      margin-bottom: toRem(3);

      @include breakpoint-down(xl) {
        @include font-height(9, 12);
      }
    }

    .base-text {
      text-transform: capitalize;
      @include font-height(13.5, 19);

      @include breakpoint-down(xl) {
        @include font-height(12, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(11.5, 17);
      }
    }
  }
}
</style>
