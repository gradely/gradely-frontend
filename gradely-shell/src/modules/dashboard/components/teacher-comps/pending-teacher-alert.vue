<template>
  <div
    class="pending-teacher-alert position-relative rounded-5 box-shadow-effect white-text-bg overflow-hidden smooth-transition"
  >
    <!-- LABEL  -->
    <div class="label position-absolute h-100 brand-inverse-bg top-0"></div>

    <div class="text">
      {{ pending_teachers.length }} teachers needs your approval to join a
      class.
      <span
        class="btn-link font-weight-600 link-no-underline"
        @click="togglePendingModal"
        >Check them out</span
      >
    </div>

    <!-- CLOSE  -->
    <div
      class="avatar smooth-transition pointer color-white-bg"
      @click="$emit('closeTriggered')"
    >
      <div class="icon-close color-ash"></div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_pending_modal">
        <verify-teachers-modal @closeTriggered="togglePendingModal" />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "pendingTeacherAlert",

  components: {
    verifyTeachersModal: () =>
      import(
        /* webpackChunkName: "verifyTeachersModal" */ "@/modules/dashboard/modals/verify-teachers-modal"
      ),
  },

  props: {
    pending_teachers: Array,
  },

  data: () => ({
    show_pending_modal: false,
  }),

  methods: {
    togglePendingModal() {
      this.show_pending_modal = !this.show_pending_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.pending-teacher-alert {
  @include flex-row-between-nowrap;
  padding: toRem(11) toRem(20);
  margin-bottom: toRem(25);

  @include breakpoint-down(sm) {
    padding: toRem(8) toRem(17);
  }

  @include breakpoint-down(xs) {
    padding: toRem(9) toRem(15);
    padding-right: toRem(8);
  }

  .label {
    left: 0;
    width: toRem(4);
  }

  .text {
    @include font-height(12.75, 18);
    color: $color-text;

    @include breakpoint-down(md) {
      @include font-height(12.5, 18);
    }

    @include breakpoint-down(sm) {
      @include font-height(12.25, 17);
    }

    @include breakpoint-down(xs) {
      @include font-height(11.75, 18);
    }
  }

  .avatar {
    @include square-shape(26);
    margin-left: toRem(20);

    @include breakpoint-down(xs) {
      @include square-shape(30);
    }

    .icon-close {
      @include center-placement;

      @include breakpoint-down(xs) {
        font-size: toRem(12) !important;
      }
    }

    &:hover {
      background: $brand-inverse-light !important;
    }
  }
}
</style>
