<template>
  <div
    class="task-card rounded-3 white-text-bg box-shadow-effect position-relative mgb-4 smooth-transition pointer"
  >
    <!-- LABEL  -->
    <div
      class="label position-absolute h-100"
      :class="
        task.type === 'live_class' ? 'brand-accent-bg' : 'brand-inverse-bg'
      "
    ></div>

    <!-- LEFT SECTION  -->
    <div class="left-section">
      <!-- DATE  -->
      <div class="date color-text">{{ getEventTime }}</div>

      <!-- INFO  -->
      <div class="info">
        <div
          class="title-text mgb-3 brand-navy font-weight-600 text-capitalize"
        >
          {{ task.title }}
        </div>

        <div class="description color-grey-dark">
          {{ task.class_name }} • {{ task.subject_name }}
        </div>
      </div>
    </div>

    <!-- RIGHT SECTION  -->
    <div class="right-section">
      <router-link
        :to="{
          name: 'AssessmentSummaryReview',
          params: {
            id: task.class_id,
            assessment_id: task.id
          },
          query: { title: task.title }
        }"
      >
        <div
          class="more-text btn-link font-weight-600 link-no-underline"
          v-if="task.type !== 'live_class'"
        >
          View
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "taskCard",

  props: {
    task: {
      type: Object,
      default: () => ({
        id: 1,
        title: "Event title",
        class_name: "Year 1 - Gold",
        subject_name: "English language",
        datetime: "2021-09-29 07:28:00",
        type: "live_class",
      }),
    },
  },

  computed: {
    getEventTime() {
      let { b2, h01, a0 } = this.$date.formatDate(this.task.datetime).getAll();
      return `${h01}:${b2}${a0}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.task-card {
  @include flex-row-between-nowrap;
  padding: toRem(9) toRem(20);

  @include breakpoint-down(lg) {
    padding: toRem(8) toRem(16);
  }

  @include breakpoint-down(xs) {
    padding: toRem(8) toRem(12);
  }

  &:hover {
    transform: scale(0.99);
  }

  .label {
    left: 0;
    top: 0;
    width: toRem(3);
    border-radius: toRem(3) 0 0 toRem(3);
  }

  .left-section {
    @include flex-row-start-nowrap;

    .date {
      @include font-height(12.5, 19);
      margin-right: toRem(7);
      min-width: toRem(73);
      width: toRem(73);

      @include breakpoint-down(xs) {
        @include font-height(11.5, 17);
        min-width: toRem(60);
        width: toRem(60);
      }
    }

    .title-text {
      @include font-height(12.75, 18);
      line-clamp: 2;
      -webkit-line-clamp: 2;

      @include breakpoint-down(lg) {
        @include font-height(12.5, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(12, 16);
      }
    }

    .description {
      @include font-height(11.5, 15);

      @include breakpoint-down(lg) {
        @include font-height(11, 14);
      }

      @include breakpoint-down(xs) {
        @include font-height(10.5, 14);
      }
    }
  }

  .right-section {
    .more-text {
      font-size: toRem(12.5);

      @include breakpoint-down(xs) {
        font-size: toRem(12);
      }
    }
  }
}
</style>
