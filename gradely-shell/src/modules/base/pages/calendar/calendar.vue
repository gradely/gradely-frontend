<template>
  <div class="gradely-calendar gradely-app-container topnav-offset">
    <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 mx-auto">
      <!-- TOP ROW  -->
      <title-top-row title="My Calendar" />

      <div class="content-wrapper">
        <!-- CALENDAR BLOCK  -->
        <div class="calendar-block">
          <calendar-plugin show_border />

          <!-- SELECTION FILTER  -->
          <div class="selection-filter">
            <label
              for="liveClass"
              class="pointer checkbox checkbox-inline mgr-5"
            >
              <input type="checkbox" id="liveClass" v-model="live_class" />
              <div class="label-text color-grey-dark select-none">
                Live Class
              </div>
            </label>

            <label
              for="assessments"
              class="pointer checkbox-inline assessment-check"
            >
              <input type="checkbox" id="assessments" v-model="assessment" />
              <div class="label-text color-grey-dark select-none">
                Assessments
              </div>
            </label>
          </div>
        </div>

        <!-- TASK BLOCK  -->
        <div class="task-block">
          <!-- TOP ROW  -->
          <calendar-top-row :total_task="tasks.length" />

          <!-- CONTENT STATE  -->
          <template v-if="tasks.length">
            <task-card
              v-for="(task, index) in tasks"
              :key="index"
              :task="task"
            />
          </template>

          <!-- EMPTY STATE  -->
          <template v-else>
            <div class="position-relative">
              <task-card-skeleton
                v-for="(_, index) in 6"
                :key="index"
                :loading="loading"
              ></task-card-skeleton>

              <!-- EMPTY CONTENT STATE  -->
              <empty-content-state
                v-if="empty_state"
                title="No Schedule Found"
                content="There are no schedule found on your student list at the moment!"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import titleTopRow from "@/modules/dashboard/components/student-comps/title-top-row";

export default {
  name: "calendar",

  metaInfo: {
    title: "Calendar Schedules",
  },

  components: {
    titleTopRow,
    calendarPlugin: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: 'calendar' */ "@/modules/base/plugins/calendar/calendar-plugin"
      ),
    calendarTopRow: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: 'calendar' */ "@/modules/base/components/calendar-comps/calendar-top-row"
      ),
    taskCard: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: 'calendar' */ "@/modules/base/components/calendar-comps/task-card"
      ),
    taskCardSkeleton: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: 'calendar' */ "@/modules/base/components/calendar-comps/task-card-skeleton"
      ),
  },

  computed: {
    ...mapGetters({
      getSelectedDate: "dbCalendar/getSelectedDate",
    }),

    getReadableDate() {
      let date = this.getSelectedDate.replace("T", " ").replace("Z", "");
      let { d3, m4, y1, h01, b2, a0 } = this.$date.formatDate(date).getAll();
      return `${d3} ${m4}, ${y1} ${h01}:${b2} ${a0}`;
    },

    watchBothLiveClassAndAssessment() {
      const { live_class, assessment } = this;
      return {
        live_class,
        assessment,
      };
    },
  },

  watch: {
    getSelectedDate: "fetchCalendarDateEvent",

    watchBothLiveClassAndAssessment: {
      handler() {
        this.filterTasks();
      },
    },
  },

  data: () => ({
    loading: true,
    empty_state: false,

    live_class: true,
    assessment: true,

    tasks_repo: [],
    tasks: [],

    class_id: null,
  }),

  mounted() {
    this.class_id = this.$route.params.id ? this.$route.params.id : null;
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
          if (response.code === 200) {
            // this.showResponseAlert(
            //   `Class activity for ${this.getReadableDate}`,
            //   "success"
            // );

            this.setupEventData(false, false, response.data);
          }

          // EMPTY STATE
          else if (response.code === 406 || response.code === 204) {
            this.showResponseAlert(
              `No activity for ${this.getReadableDate}`,
              "warning"
            );
            this.setupEventData();
          }

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
      this.tasks_repo = this.tasks = data;
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

    // FILTER TASK BASED ON LIVE CLASS OR ASSESSMENT OR NONE
    filterTasks() {
      this.tasks = [];

      // BOTH EVENT TYPES
      if (this.live_class && this.assessment) this.tasks = this.tasks_repo;
      // LIVE CLASS TYPE
      else if (this.live_class) {
        this.tasks_repo.map((task) => {
          if (task.type === "live_class") this.tasks.push(task);
        });
      }
      // ASSESSMENT TYPE
      else if (this.assessment) {
        this.tasks_repo.map((task) => {
          if (task.type !== "live_class") this.tasks.push(task);
        });
      }
      // EMPTY TYPE
      else {
        this.tasks = [];
        this.empty_state = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.gradely-calendar {
  .content-wrapper {
    @include flex-row-between-wrap;
    align-items: flex-start;

    .calendar-block {
      width: 38%;

      @include breakpoint-down(md) {
        margin-bottom: toRem(40);
        width: 100%;
      }

      .selection-filter {
        @include flex-row-start-nowrap;
        padding-left: toRem(4);

        label {
          @include flex-row-start-nowrap;
          .label-text {
            margin-top: toRem(5);
            margin-left: toRem(5);
            font-size: toRem(12.75);
          }
        }

        .assessment-check {
          input {
            &:checked:after {
              background-color: $brand-inverse;
              border-color: $brand-inverse;
            }
          }
        }
      }
    }

    .task-block {
      width: 58%;

      @include breakpoint-down(lg) {
        width: 60%;
      }

      @include breakpoint-down(md) {
        width: 100%;
      }
    }
  }
}
</style>
