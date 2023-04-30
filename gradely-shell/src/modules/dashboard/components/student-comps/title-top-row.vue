<template>
  <div class="top-row" :class="{ exception: inExceptionList }">
    <!-- LEFT  -->
    <div class="left color-text font-weight-600">
      {{ title }}
      <span class="font-weight-400" v-if="show_counter">({{ counter }})</span>
    </div>

    <!-- RIGHT  -->
    <div class="right d-flex">
      <!-- FILTER STUDENTS -->
      <template v-if="counter > 20">
        <div
          class="filter rounded-30 smooth-transition pointer mgr-10"
          v-if="show_filter"
          @click="$emit('toggleFilter')"
        >
          <div class="avatar mgr-3">
            <div class="icon icon-filter-lines smooth-transition"></div>
          </div>
          <div class="text smooth-transition">Filter</div>
        </div>
      </template>

      <!-- ADD STUDENTS  -->
      <button
        v-if="$route.name === 'DashboardStudent'"
        class="btn btn-accent add-new"
        title="Invite Students"
        @click="$emit('inviteTeachers')"
      >
        <div class="icon icon-plus"></div>
        <div class="text">Add Students</div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "titleTopRow",

  props: {
    title: String,
    counter: {
      type: Number,
      default: 0,
    },
    show_counter: {
      type: Boolean,
      default: false,
    },
    show_filter: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    inExceptionList() {
      return this.exception_list.includes(this.$route.name) ? true : false;
    },
  },

  data: () => ({
    exception_list: ["DashboardActivateStudent"],
  }),

  methods: {
    toggleFilter() {},
  },
};
</script>

<style lang="scss" scoped>
.top-row {
  @include flex-row-between-nowrap;
  margin-top: toRem(20);
  margin-bottom: toRem(35);

  @include breakpoint-down(sm) {
    margin-top: toRem(15);
    margin-bottom: toRem(25);
  }

  .left {
    @include font-height(27, 35);

    @include breakpoint-down(xl) {
      @include font-height(24, 34);
    }

    @include breakpoint-down(lg) {
      @include font-height(22, 32);
    }

    @include breakpoint-down(md) {
      @include font-height(21, 30);
    }

    @include breakpoint-down(sm) {
      @include font-height(20.5, 30);
    }

    @include breakpoint-down(xs) {
      @include font-height(18, 30);
    }
  }

  .add-new {
    padding: toRem(11.5) toRem(26);

    @include breakpoint-down(sm) {
      @include square-shape(32);
      padding: toRem(11);
    }

    .icon {
      font-size: toRem(17);
      margin-right: toRem(5);

      @include breakpoint-down(sm) {
        margin-right: 0;
      }
    }

    .text {
      font-size: toRem(10.5);

      @include breakpoint-down(sm) {
        display: none;
      }
    }
  }
}

.exception {
  @include breakpoint-down(md) {
    display: none;
  }
}
</style>
