<template>
  <div class="day-list">
    <!-- WEEK VIEW -->
    <div class="week-view">
      <div class="week">Mon</div>
      <div class="week">Tue</div>
      <div class="week">Wed</div>
      <div class="week">Thur</div>
      <div class="week">Fri</div>
      <div class="week">Sat</div>
      <div class="week">Sun</div>
    </div>

    <!-- DAY VIEW -->
    <div class="day-view">
      <div
        class="day-col text-center position-relative"
        v-for="(data, index) in days"
        :key="index"
        :class="data | setActiveState(event_list, today, selected_day)"
        @click="updateCalendarState(data)"
      >
        <div
          :id="'day' + index"
          class="day rounded-circle pointer select-none color_ash"
          :class="[data === undefined ? 'invisible' : 'day-' + data]"
        >
          {{ data }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "dayList",

  props: {
    current_day: Number,
    day: Number,
    month: Number,
    year: Number,
  },

  computed: {
    ...mapGetters({
      getSelectedDate: "dbCalendar/getSelectedDate",
      getMonthlyEvent: "dbCalendar/getCalendarEvent",
    }),
  },

  watch: {
    month: "loadCurrentMonthDays",
    year: "loadCurrentMonthDays",

    getSelectedDate: {
      handler(value) {
        this.selected_day = value.split("-")[2];
        this.getAllMonthlyEvents();
      },
      immediate: true,
    },
  },

  data: () => ({
    teacher_id: null,
    date_obj: new Date(),

    days: [],
    today: "",
    selected_day: "",
    event_list: [],
  }),

  filters: {
    setActiveState(day, event_list, current_day, selected_day) {
      if (event_list.includes(day)) return "active";
      if (day === current_day) return "current-day";
      if (day == selected_day) return "selected-day";
    },
  },

  mounted() {
    this.teacher_id = this.$route.params.teacher_id
      ? this.$route.params.teacher_id
      : null;
    this.loadCurrentMonthDays();
    this.getAllMonthlyEvents();
  },

  methods: {
    ...mapActions({
      setCalendar: "dbCalendar/updateSelectedDate",
      getCurrentMonthEvent: "dbCalendar/getMonthlyActivities",
    }),

    loadCurrentMonthDays() {
      this.days.length = 0;

      let first_day = this.getMonthFirstDay(this.year, this.month).getDay();
      let total_days = this.getMonthLastDay(this.year, this.month).getDate();

      this.initialArrayLength(first_day);

      for (let i = 1; i <= total_days; i++) {
        this.days.push(i);
      }

      this.activeDay();
    },

    getAllMonthlyEvents() {
      this.event_list = [];

      this.getCurrentMonthEvent(this.teacher_id)
        .then((response) => {
          if (response.code === 200) {
            if (response.data.length) {
              let filtered_data = this.filterMonthlyEventBasedonTeacherId(
                response.data
              );

              filtered_data.map((event) => {
                this.event_list.push(Number(event.date.split("-")[2]));
              });
            } else this.event_list = [];
          } else this.event_list = [];
        })
        .catch(() => (this.event_list = []));
    },

    getMonthFirstDay(year, month) {
      return new Date(year, month);
    },

    getMonthLastDay(year, month) {
      return new Date(year, month + 1, 0);
    },

    activeDay() {
      this.today =
        this.date_obj.getMonth() === this.month &&
        this.date_obj.getFullYear() === this.year
          ? this.current_day
          : "";
    },

    initialArrayLength(day) {
      if (day === 0) this.days.length = 6;
      else if (day === 1) this.days.length = 0;
      else if (day === 2) this.days.length = 1;
      else if (day === 3) this.days.length = 2;
      else if (day === 4) this.days.length = 3;
      else if (day === 5) this.days.length = 4;
      else if (day === 6) this.days.length = 5;
    },

    updateCalendarState(day) {
      let dateList = this.getSelectedDate.split("-");
      this.setCalendar(`${dateList[0]}-${dateList[1]}-${day}`);
    },

    filterMonthlyEventBasedonTeacherId(data) {
      if (this.teacher_id) {
        let teacher_events = [];
        data.map((item) => {
          if (item.teacher_id == this.teacher_id) teacher_events.push(item);
        });

        return teacher_events;
      } else return data;
    },
  },
};
</script>

<style lang="scss" scoped>
.day-list {
  .week-view,
  .day-view {
    @include font-height(12.5, 18);
    width: 100%;

    @include breakpoint-down(sm) {
      @include font-height(12, 16);
    }

    @include breakpoint-down(xs) {
      @include font-height(11, 15);
    }

    .week,
    .day-col {
      width: 14.286%;
      text-align: center;
    }
  }

  .week-view {
    @include flex-row-evenly-nowrap;
    color: $border-grey-dark;
    padding-bottom: toRem(12);
    margin-bottom: toRem(15);
    border-bottom: toRem(1) solid $border-grey;
  }

  .day-view {
    @include flex-row-evenly-wrap;
    justify-content: flex-start;

    .day-col {
      @include flex-row-center-nowrap;
      margin-bottom: toRem(13.5);

      .day {
        @include flex-row-center-nowrap;
        @include square-shape(28);
        transition: background-color 0.1s ease-in-out;

        &:hover {
          background-color: rgba($brand-inverse, 0.3);
        }
      }
    }

    .active {
      .day {
        background: rgba($brand-accent, 0.3);
      }
    }

    .current-day {
      .day {
        background: rgba($brand-green, 0.4) !important;
      }
    }

    .selected-day {
      .day {
        background: rgba($brand-red, 0.5) !important;
      }
    }
  }
}
</style>
