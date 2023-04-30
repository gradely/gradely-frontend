<template>
  <div class="class-schedules white-text-bg rounded-5">
    <!-- LEFT SECTION  -->
    <div class="left-section">
      <calendar-plugin placement="left" />
    </div>

    <!-- RIGHT SECTION  -->
    <div class="right-section">
      <!-- CALENDAR TOP ROW  -->
      <div class="calendar-top-row">
        <div class="avatar avatar-with-meta rounded-5">
          <div class="avatar-title">{{ getDateInfo.day }}</div>
          <div class="avatar-meta">{{ getDateInfo.week }}</div>
        </div>

        <div>
          <div class="top-text color-text font-weight-700 mgb-1">
            {{ getReadableDate }} Schedule
          </div>

          <div class="bottom-text color-grey-dark">
            Activities across all classes.
          </div>
        </div>
      </div>

      <!-- SCHEDULE LIST WRAPPER  -->
      <div class="schedule-list-wrapper">
        <template name="content-state" v-if="schedules.length">
          <schedule-card
            v-for="(schedule, index) in schedules"
            :key="index"
            :schedule="schedule"
          />
        </template>

        <template name="loading-state" v-else>
          <schedule-default :loading="loading" :empty_state="empty_state" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import calendarPlugin from "@/modules/base/plugins/calendar/calendar-plugin";
import scheduleDefault from "@/modules/profile/components/teacher-profile-comps/schedule-default";

export default {
  name: "classSchedules",

  components: {
    calendarPlugin,
    scheduleDefault,
    scheduleCard: () =>
      import(
        /* webpackChunkNmae: 'scheduleCard' */ "@/modules/profile/components/teacher-profile-comps/schedule-card"
      ),
  },

  computed: {
    ...mapGetters({
      getSelectedDate: "dbCalendar/getSelectedDate",
    }),

    getDateInfo() {
      let { d1, w2 } = this.$date.formatDate(this.getSelectedDate).getAll();
      console.log("Date", d1, w2);

      return {
        day: d1,
        week: w2,
      };
    },

    getReadableDate() {
      let date_obj = new Date(),
        today = new Date(),
        yesterday = date_obj.setDate(date_obj.getDate() - 1),
        tomorrow = date_obj.setDate(date_obj.getDate() + 2);

      if (
        new Date(`${this.getSelectedDate}`).toDateString() ===
        today.toDateString()
      )
        return "Today's";
      else if (
        new Date(`${this.getSelectedDate}`).toDateString() ===
        new Date(yesterday).toDateString()
      )
        return "Yesterday's";
      else if (
        new Date(`${this.getSelectedDate}`).toDateString() ===
        new Date(tomorrow).toDateString()
      )
        return "Tomorrow's";
      else {
        let { m3, d1 } = this.$date.formatDate(this.getSelectedDate).getAll();
        return `${m3} ${d1}`;
      }
    },
  },

  watch: {
    getSelectedDate: "fetchCalendarDateEvent",
  },

  data: () => ({
    schedules: [],
    loading: true,
    empty_state: false,
  }),

  mounted() {
    this.fetchCalendarDateEvent();
  },

  methods: {
    ...mapActions({
      getCalendarEvent: "dbCalendar/getClassCalendar",
    }),

    fetchCalendarDateEvent() {
      this.setupEventData(true, false);

      this.getCalendarEvent({ class_id: this.class_id })
        .then((response) => {
          if (response.code === 200)
            this.setupEventData(false, false, response.data);
          // EMPTY STATE
          else if (response.code === 406 || response.code === 204)
            this.setupEventData();
          // ERROR STATE
          else {
            this.setupEventData();
            this.showResponseAlert();
          }
        })
        .catch(() => {
          this.setupEventData();
          this.showResponseAlert();
        });
    },

    // LOAD EVENT STATE
    setupEventData(loading = false, empty = true, data = []) {
      this.loading = loading;
      this.empty_state = empty;
      this.schedules = data;
    },

    // SHOW ALERT RESPONSE
    showResponseAlert(
      message = "An error occured while loading class schedules",
      type = "error"
    ) {
      this.$bus.$emit("show_response_alert", {
        message,
        type,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.class-schedules {
  @include flex-row-between-wrap;
  align-items: flex-start;
  margin-bottom: toRem(30);
  padding: toRem(5);

  .left-section {
    width: 54%;

    @include breakpoint-down(md) {
      width: 100%;
    }
  }

  .right-section {
    width: 44%;
    padding: toRem(24) toRem(15) toRem(10) 0;

    @include breakpoint-down(lg) {
      width: 46%;
    }

    @include breakpoint-down(md) {
      width: 100%;
      padding: 0 toRem(15);
    }

    @include breakpoint-down(xs) {
      width: 100%;
      padding: 0 toRem(10);
    }

    .calendar-top-row {
      @include flex-row-start-nowrap;
      margin-bottom: toRem(20);

      .avatar {
        @include square-shape(42);
        margin-right: toRem(12);
        background: darken($brand-inverse-light, 10);

        @include breakpoint-down(lg) {
          @include square-shape(38);
          margin-right: toRem(8);
        }

        @include breakpoint-down(xs) {
          @include square-shape(38);
          margin-right: toRem(10);
        }

        .avatar-title {
          @include font-height(12, 17);

          @include breakpoint-down(lg) {
            @include font-height(11.5, 17);
          }

          @include breakpoint-down(xs) {
            @include font-height(10.5, 14);
          }
        }

        .avatar-meta {
          @include font-height(10, 16);

          @include breakpoint-down(lg) {
            margin-top: toRem(-2);
          }

          @include breakpoint-down(xs) {
            @include font-height(9, 14);
            margin-top: toRem(-0.5);
          }
        }
      }

      .top-text {
        @include font-height(14, 19);

        @include breakpoint-down(lg) {
          @include font-height(13, 18);
        }

        @include breakpoint-down(xs) {
          @include font-height(12.5, 17);
        }
      }

      .bottom-text {
        @include font-height(11.15, 16);
        letter-spacing: 0.025em;

        @include breakpoint-down(lg) {
          @include font-height(11, 15);
        }

        @include breakpoint-down(xs) {
          @include font-height(10.75, 14);
          letter-spacing: 0.015em;
        }
      }
    }

    .schedule-list-wrapper {
    }
  }
}
</style>
