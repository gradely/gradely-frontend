<template>
  <div
    @click="$emit('switchToChild', { id: child.id, index: child_index })"
    class="parent-class-card position-relative rounded-5 overflow-hidden w-100 pointer smooth-transition"
    :class="{ 'active-card': setActiveChild }"
  >
    <!-- LABEL  -->
    <div class="label position-absolute h-100 brand-accent-bg top-0"></div>

    <div class="child-info">
      <!-- CHILD AVATAR  -->
      <div
        class="avatar avatar-square"
        :class="child.image ? 'border-brand-inverse' : null"
      >
        <img
          v-lazy="child.image"
          :alt="child.full_name"
          class="avatar-img"
          v-if="child.image"
        />

        <div
          class="avatar-text"
          :class="$color.getProfileBgColor(child.full_name)"
          v-else
        >
          {{ $string.getStringInitials(child.full_name) }}
        </div>
      </div>

      <div class="info">
        <!-- CLASS NAME  -->
        <div
          class="child-name mgb-1 brand-navy font-weight-700 pdr-10 text-capitalize"
        >
          {{ child.full_name }}
        </div>

        <!-- CLASS CODE  -->
        <div class="child-code color-grey-dark text-uppercase">
          {{ child.code }}
        </div>
      </div>
    </div>

    <div class="avatar selected mgr-0">
      <div class="icon icon-caret-right border-grey"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "parentClassCard",

  props: {
    child_index: Number,

    child: {
      type: Object,
      default: () => ({
        id: 1,
        full_name: "Richy Jones",
        code: "GRA/2020/***",
        image: "",
      }),
    },
  },

  computed: {
    setActiveChild() {
      return this.$route.params.id == this.child.id ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.parent-class-card {
  @include flex-row-between-nowrap;
  padding: toRem(12) toRem(5) toRem(12) toRem(15);

  @include breakpoint-down(lg) {
    padding: toRem(12) toRem(5) toRem(12) toRem(12);
  }

  &:hover {
    background: $brand-inverse-light !important;
  }

  .label {
    left: 0;
    width: toRem(2.75);
    display: none;
  }

  .child-info {
    @include flex-row-start-nowrap;
  }

  .avatar {
    @include square-shape(40);
    margin-right: toRem(10);

    @include breakpoint-down(xl) {
      @include square-shape(38);
      margin-right: toRem(8);
    }

    @include breakpoint-down(lg) {
      @include square-shape(34);
    }
  }

  .child-name {
    @include font-height(12.75, 20);

    @include breakpoint-down(lg) {
      @include font-height(12.5, 18);
      margin-bottom: 0 !important;
    }
  }

  .child-code {
    @include font-height(11.5, 18);

    @include breakpoint-down(lg) {
      @include font-height(11, 17);
    }

    @include breakpoint-down(xs) {
      @include font-height(11.25, 17);
    }
  }

  .selected {
    @include square-shape(30);
    display: none;

    .icon {
      @include center-placement;
      font-size: toRem(13);

      @include breakpoint-down(lg) {
        font-size: toRem(12);
      }
    }
  }
}

.active-card {
  background: $brand-inverse-light !important;

  .label {
    display: unset;
  }

  .avatar {
    display: unset;
  }
}
</style>
