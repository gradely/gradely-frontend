<template>
  <div class="control-selector">
    <!-- CENTERED PLACEMENT  -->
    <template v-if="placement === 'center'">
      <!-- LEFT NAV  -->
      <div
        class="icon icon-caret-right rotate-180"
        @click="decreaseDate"
        title="Previous"
      ></div>

      <!-- CURRENT STATE  -->
      <portal-target name="calendar-view"> </portal-target>

      <!-- RIGHT NAV  -->
      <div
        class="icon icon-caret-right"
        @click="increaseDate"
        title="Next"
      ></div>
    </template>

    <!-- LEFT PLACEMENT  -->
    <template v-else>
      <!-- CURRENT STATE  -->
      <portal-target name="calendar-view"> </portal-target>

      <div class="d-flex justify-content-end">
        <!-- LEFT NAV  -->
        <div
          class="icon icon-caret-right rotate-180 mgr-15"
          @click="decreaseDate"
          title="Previous"
        ></div>

        <!-- RIGHT NAV  -->
        <div
          class="icon icon-caret-right mgl-15"
          @click="increaseDate"
          title="Next"
        ></div>
      </div>
    </template>

    <portal to="calendar-view">
      <div
        class="current-state font-weight-600 pointer"
        @click="updateDateStateIndex"
      >
        <div class="text color-text">
          {{ processDateDisplay }}
        </div>
        <div class="icon icon-caret-fill-down color-ash"></div>
      </div>
    </portal>
  </div>
</template>

<script>
export default {
  name: "controlSelector",

  props: {
    placement: {
      type: String,
      default: "center",
    },

    month_display: {
      type: [String, Number],
      required: true,
    },

    year_display: {
      type: [String, Number],
      required: true,
    },
  },

  computed: {
    processDateDisplay() {
      if (this.date_state_index === 1)
        return `${this.month_display}, ${this.year_display}`;
      else if (this.date_state_index === 2) return `${this.year_display}`;
      else if (this.date_state_index === 3)
        return `${this.year_display - 15} - ${this.year_display}`;
    },
  },

  data: () => ({
    date_state_index: 1, // 1 => month-year, 2 => year, 3 => year range
  }),

  created() {
    this.$bus.$on("changeView", (index) => (this.date_state_index = index));
  },

  methods: {
    updateDateStateIndex() {
      this.date_state_index =
        this.date_state_index === 3 ? 1 : this.date_state_index + 1;

      // CHANGE CALENDAR VIEW
      this.$emit(
        "changeCalendarView",
        this.calendarView(this.date_state_index)
      );
    },

    calendarView(index) {
      if (index === 1) return "dayList";
      else if (index === 2) return "monthList";
      else if (index === 3) return "yearList";
    },

    increaseDate() {
      this.$emit("increaseDate", this.calendarView(this.date_state_index));
    },

    decreaseDate() {
      this.$emit("decreaseDate", this.calendarView(this.date_state_index));
    },
  },
};
</script>

<style lang="scss" scoped>
.control-selector {
  @include flex-row-between-nowrap;
  margin-bottom: toRem(22);

  .icon {
    position: relative;
    color: $border-grey-dark;
    font-size: toRem(14.5);
    cursor: pointer;
    @include transition(0.4s);

    @include breakpoint-down(xs) {
      font-size: toRem(14);
    }

    &:hover {
      color: $brand-accent;
    }
  }

  .current-state {
    @include flex-row-center-nowrap;
    .text {
      @include transition(0.4s);
      font-size: toRem(13.5);

      @include breakpoint-down(xs) {
        font-size: toRem(12.5);
      }
    }

    .icon {
      font-size: toRem(10);
      margin-top: toRem(2);
      margin-left: toRem(6);
      @include transition(0.4s);
    }

    &:hover {
      .text,
      .icon {
        color: $brand-accent !important;
      }
    }
  }
}
</style>
