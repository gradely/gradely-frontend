<template>
  <div class="child-info-modal-card">
    <!-- CHILD AVATAR  -->
    <div
      class="avatar rounded-5"
      :class="child.image ? 'border-brand-inverse' : null"
    >
      <img v-lazy="child.image" alt="" class="avatar-img" v-if="child.image" />

      <div
        class="avatar-text"
        :class="$color.getProfileBgColor(child.fullname)"
        v-else
      >
        {{ $string.getStringInitials(child.fullname) }}
      </div>
    </div>

    <div class="info">
      <div class="top-text font-weight-600 color-text mgb-3">
        {{ child.fullname }}
      </div>

      <div class="bottom-text color-grey-dark text-uppercase">
        {{ child.class_name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "childInfoModalCard",

  props: {
    child: {
      type: Object,
      default: () => ({
        image: "",
        fullname: "Aduragbemi Adebayo",
        class_name: "Year 7 - Gold",
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.child-info-modal-card {
  @include flex-row-start-nowrap;
  margin-bottom: toRem(25);

  @include breakpoint-down(xs) {
    margin-bottom: toRem(15);
  }

  .avatar {
    @include square-shape(42);
    margin-right: toRem(15);

    @include breakpoint-down(xs) {
      @include square-shape(38);
      margin-right: toRem(12);
    }
  }

  .top-text {
    @include font-height(13.25, 18);

    @include breakpoint-down(xs) {
      @include font-height(12.5, 17);
    }
  }

  .bottom-text {
    @include font-height(12, 16);

    @include breakpoint-down(xs) {
      @include font-height(11.5, 15);
    }
  }
}
</style>
