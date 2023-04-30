<template>
  <div class="child-info-block">
    <!-- CHILD IMAGE -->
    <div class="avatar" :class="getChildImage ? 'border-brand-inverse' : null">
      <img
        v-lazy="getChildImage"
        :alt="$string.getStringInitials($route.params.name)"
        class="avatar-img"
        v-if="getChildImage"
      />

      <div
        class="avatar-text"
        v-else
        :class="$color.getProfileBgColor($route.params.name)"
      >
        {{ $string.getStringInitials($route.params.name) }}
      </div>
    </div>

    <!-- CHILD NAME -->
    <div class="child-name text-center brand-navy font-weight-700">
      {{ $route.params.name }}
    </div>

    <!-- CHILD LAST SEEN -->
    <div class="child-last-name text-center" v-if="false">
      <span class="color-grey-dark">Last Seen: </span>
      <span class="color-ash font-weight-600">2 days ago</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "childInfoBlock",

  props: {
    child: {
      type: [Object, Boolean],
    },
  },

  computed: {
    getChildImage() {
      return this.child ? this.child?.image : null;
    },
  },
};
</script>

<style lang="scss" scoped>
.child-info-block {
  @include flex-column-center;
  justify-content: flex-start;
  margin-bottom: toRem(30);

  .avatar {
    @include square-shape(128);
    margin-bottom: toRem(15);
    border-radius: toRem(20);

    @include breakpoint-down(xl) {
      @include square-shape(120);
    }

    @include breakpoint-down(md) {
      @include square-shape(100);
    }

    .avatar-text {
      font-size: toRem(38);
    }
  }

  .child-name {
    @include font-height(17, 24);
    margin-bottom: toRem(6);

    @include breakpoint-down(xl) {
      @include font-height(15, 22);
    }

    @include breakpoint-down(md) {
      @include font-height(14, 20);
    }

    @include breakpoint-down(sm) {
      @include font-height(13, 18);
    }
  }

  .child-last-name {
    @include font-height(13.5, 18);

    @include breakpoint-down(xl) {
      @include font-height(12.5, 18);
    }

    @include breakpoint-down(lg) {
      @include font-height(12, 17);
    }

    @include breakpoint-down(sm) {
      @include font-height(11, 17);
    }
  }
}
</style>
