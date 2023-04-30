<template>
  <div class="position-relative d-flex justify-content-start w-100 h-auto">
    <div class="spacer"></div>

    <div class="post-content-area padded-area pt-0 w-100">
      <div class="info-text color-ash mgb-10">
        Your weekly class performance update.
      </div>

      <!-- STUDENT PERFORMANCE -->
      <template v-if="post.reference.length">
        <student-performance-row
          v-for="(student, index) in post.reference"
          :key="index"
          :student="student"
        />
      </template>

      <!-- RECOMMENDATION BUTTON -->
      <router-link
        :to="`/report/${getAuthType}/${$route.params.id}`"
        class="btn btn-secondary mgt-14 w-100"
      >
        See Full Class Performance
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostContentPerformance",

  components: {
    studentPerformanceRow: () =>
      import(
        /* webpackChunkName: 'studentPerformanceRow' */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/student-performance-row"
      ),
  },

  props: {
    post: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.post-content-area {
  .info-text {
    @include font-height(12.5, 17);
  }

  .btn {
    background: darken($color-white, 4%) !important;
    font-weight: 500 !important;
    text-transform: capitalize;

    &:hover {
      background: $brand-accent-light !important;
    }
  }
}
</style>
