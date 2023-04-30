<template>
  <div class="position-relative">
    <div
      class="empty-report-card-state mgb-6 rounded-5"
      v-for="(_, index) in state_count"
      :key="index"
    >
      <div class="avatar border-grey-light-bg rounded-10"></div>

      <div class="content w-100">
        <div class="line-one rounded-5 border-grey-light-bg mgb-4"></div>
        <div class="line-two rounded-5 border-grey-light-bg"></div>
      </div>
    </div>

    <div class="empty-content" v-if="empty_state">
      <img
        v-lazy="mxStaticImg('EmptyState.svg')"
        alt=""
        class="mgb-20 empty-banner"
      />

      <div class="text-content color-ash text-center" v-if="category === 'all'">
        None of your students data are available at the moment!
      </div>

      <div class="text-content color-ash text-center" v-else>
        No student for selected category!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "emptyReportCardState",

  props: {
    empty_state: Boolean,
    category: String,
  },

  data: () => ({
    state_count: 5,
  }),
};
</script>

<style lang="scss" scoped>
.empty-report-card-state {
  @include flex-row-start-nowrap;
  padding: toRem(13) toRem(15);
  background: rgba($color-white, 0.45);

  @include breakpoint-down(sm) {
    padding: toRem(8) toRem(10);
  }

  .avatar {
    @include square-shape(40);
    margin-right: toRem(15);

    @include breakpoint-down(sm) {
      @include square-shape(38);
      margin-right: toRem(10);
    }
  }

  .line-one {
    height: toRem(18);
    width: 40%;

    @include breakpoint-down(sm) {
      height: toRem(15);
      width: 90%;
    }
  }

  .line-two {
    height: toRem(14);
    width: 20%;

    @include breakpoint-down(sm) {
      height: toRem(12);
      width: 50%;
    }
  }
}

.empty-content {
  @include full-width-height;
  @include stretch-area;
  @include flex-column-center;
  background: rgba($white-text, 0.45);
  mix-blend-mode: blur((25px));

  .empty-banner {
    @include square-shape(130);
  }

  .text-content {
    @include font-height(12.75, 22);
    width: 45%;

    @include breakpoint-down(lg) {
      width: 55%;
    }

    @include breakpoint-down(xs) {
      @include font-height(12.4, 18);
      width: 70%;
    }
  }
}
</style>
