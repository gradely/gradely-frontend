<template>
  <div>
    <!-- DISABLED STATE  -->
    <div
      class="drop-select-card rounded-10 border-border-grey-light disabled-state"
      :class="card_style"
      v-if="disabled"
    >
      <div class="title font-weight-700 mgr-8">{{ title }}:</div>

      <!-- RIGHT  -->
      <div class="right d-flex justify-content-end align-items-center">
        <div class="value text-capitalize color-ash-lighter">
          No {{ title }} found
        </div>

        <div class="avatar">
          <div class="icon icon-caret-down border-grey"></div>
        </div>
      </div>
    </div>

    <div
      class="drop-select-card rounded-5 border-border-grey white-text-bg smooth-transition pointer"
      :class="card_style"
      @click="$emit('toggleCard')"
      v-else
    >
      <!-- LEFT  -->
      <div class="title font-weight-700 mgr-8">{{ title }}:</div>

      <!-- RIGHT  -->
      <div class="right d-flex justify-content-end align-items-center">
        <div class="value text-capitalize">{{ value }}</div>

        <div class="avatar">
          <div class="icon icon-caret-down color-ash"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dropSelectCard",

  props: {
    title: {
      type: String,
      default: "Title",
    },

    value: {
      type: String,
      default: "Value",
    },

    card_style: {
      type: String,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.drop-select-card {
  @include flex-row-between-nowrap;
  margin-bottom: toRem(10);
  padding: toRem(9) toRem(13);

  @include breakpoint-down(lg) {
    padding: toRem(8) toRem(12);
  }

  @include breakpoint-down(md) {
    margin-bottom: toRem(7);
  }

  @include breakpoint-down(xs) {
    @include flex-column-start-start;
    padding: toRem(10) toRem(12) toRem(5);
  }

  &:hover {
    border: toRem(1) solid $brand-inverse-light !important;
    box-shadow: 0 toRem(1) toRem(4) rgba(0, 0, 0, 0.15);
  }

  .title,
  .value {
    @include font-height(12.25, 17);
    color: $color-ash;

    @include breakpoint-down(lg) {
      @include font-height(12, 16);
    }

    @include breakpoint-down(xs) {
      @include font-height(10, 15);
    }
  }

  .value {
    @include breakpoint-down(xs) {
      @include font-height(12.5, 18);
    }
  }

  .avatar {
    @include square-shape(22);
    margin-right: toRem(-7);
    margin-left: toRem(12);

    @include breakpoint-down(xs) {
      margin-left: toRem(14);
    }

    .icon {
      @include center-placement;
      margin-top: toRem(1);
      font-size: toRem(10);

      @include breakpoint-down(xs) {
        font-size: toRem(9.5);
      }
    }
  }
}

.disabled-state {
  cursor: not-allowed;
  background: rgba($white-text, 0.85);

  &:hover {
    border: none !important;
    box-shadow: none !important;
  }
}
</style>
