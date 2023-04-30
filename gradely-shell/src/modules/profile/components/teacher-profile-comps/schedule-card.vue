<template>
  <div class="schedule-card-wrapper">
    <div class="schedule-card">
      <!-- LABEL  -->
      <div
        class="label-column"
        :class="
          schedule.type === 'live_class'
            ? 'brand-accent-bg'
            : 'brand-inverse-bg'
        "
      ></div>

      <div class="info-row">
        <!-- CLASS NAME  -->
        <div class="top-text font-weight-600 color-text mgb-2 text-capitalize">
          {{ schedule.title }}
        </div>

        <!-- DESCRIPTION  -->
        <div class="bottom-text color-grey-dark">
          {{ schedule.subject_name }} • {{ getEventTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "scheduleCard",

  props: {
    schedule: {
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
      let { h01, b2, a0 } = this.$date
        .formatDate(this.schedule?.datetime)
        .getAll();

      return `${h01}:${b2} ${a0}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.schedule-card-wrapper {
  border-bottom: toRem(1) solid rgba($border-grey, 0.75);
  padding-bottom: toRem(10);
  margin-bottom: toRem(10);

  .schedule-card {
    @include flex-row-start-nowrap;

    .label-column {
      margin-right: toRem(10);
      width: toRem(3);
      min-height: toRem(45);
      height: auto;
      max-height: toRem(120);
    }

    .top-text {
      @include font-height(12.5, 18);

      @include breakpoint-down(lg) {
        @include font-height(12, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(11.75, 16);
      }
    }

    .bottom-text {
      @include font-height(11.45, 16);
      letter-spacing: 0.015em;

      @include breakpoint-down(lg) {
        @include font-height(11, 16);
      }
    }
  }
}
</style>
