<template>
  <div
    class="calendar-plugin white-text-bg rounded-10 w-100 h-auto"
    :class="{ 'border-border-grey': show_border }"
  >
    <!-- CONTROL SELECTION  -->
    <control-selector
      :placement="placement"
      :month_display="setMonthDisplay"
      :year_display="setYear"
      @changeCalendarView="view = $event"
      @increaseDate="processDateIncrease($event)"
      @decreaseDate="processDateDecrease($event)"
    />

    <transition name="fade" mode="out-in">
      <keep-alive>
        <component
          :is="view"
          :current_day="setCurrentDay"
          :day="setDay"
          :month="setMonth"
          :year="setYear"
          :current_year="setCurrentYear"
          :year_min="setYear - 15"
          :year_max="setYear"
          @updateMonth="changeMonth($event)"
          @updateYear="changeYear($event)"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import controlSelector from "@/modules/base/plugins/calendar/control-selector";
import dayList from "@/modules/base/plugins/calendar/day-list";
import monthList from "@/modules/base/plugins/calendar/month-list";
import yearList from "@/modules/base/plugins/calendar/year-list";

export default {
  name: "calendarPlugin",

  components: {
    controlSelector,
    dayList,
    monthList,
    yearList,
  },

  props: {
    show_border: {
      type: Boolean,
      default: false,
    },

    placement: {
      type: String,
      default: "center",
    },
  },

  computed: {
    ...mapGetters({
      getSelectedDate: "dbCalendar/getSelectedDate",
    }),

    setCurrentDay() {
      let new_date = new Date();
      return new_date.getDate();
    },

    setCurrentYear() {
      let new_date = new Date();
      return new_date.getFullYear();
    },

    setDay() {
      return this.date_obj.getDate();
    },

    setMonth() {
      return this.date_obj.getMonth();
    },

    setMonthDisplay() {
      return this.months[this.setMonth];
    },

    setYear() {
      return this.date_obj.getFullYear();
    },
  },

  data: () => ({
    view: "dayList",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],

    date_obj: new Date(),
    day: 0,
    month: 0,
    year: 0,
    month_display: "",
  }),

  mounted() {
    this.month = this.date_obj.getMonth();
    this.year = this.date_obj.getFullYear();
  },

  methods: {
    ...mapActions({
      setCalendar: "dbCalendar/updateSelectedDate",
    }),

    switchToDay() {
      this.view = "dayList";
      this.$bus.$emit("changeView", 1);
    },

    switchToMonth() {
      this.view = "monthList";
      this.$bus.$emit("changeView", 2);
    },

    increaseMonth() {
      this.month++;
      this.date_obj = new Date(this.year, this.month);
    },

    decreaseMonth() {
      this.month--;
      this.date_obj = new Date(this.year, this.month);

      // let dateList = this.getDateState.split("-");
      // let dateString = `${dateList[0]}-${this.month + 1}-${dateList[2]}`;
      // this.updateDate(dateString);
    },

    increaseYear() {
      this.year++;
      this.date_obj = new Date(this.year, this.month);
    },

    decreaseYear() {
      this.year--;
      this.date_obj = new Date(this.year, this.month);
    },

    increaseYearRange() {
      this.year += 15;
      this.date_obj = new Date(this.year, this.month);
    },

    decreaseYearRange() {
      this.year -= 15;
      this.date_obj = new Date(this.year, this.month);
    },

    changeMonth(event) {
      this.month = event;
      this.date_obj = new Date(this.year, this.month);
      this.switchToDay();
    },

    changeYear(event) {
      this.year = event;
      this.date_obj = new Date(this.year, this.month);
      this.switchToMonth();
    },

    processDateIncrease(view) {
      if (view === "dayList") {
        this.increaseMonth();
        this.checkMonthAndIncreaseDate();
      }
      // MONTH VIEW
      else if (view === "monthList") this.increaseYear();
      // TEAR VIEW
      else if (view === "yearList") this.increaseYearRange();
    },

    processDateDecrease(view) {
      if (view === "dayList") {
        this.decreaseMonth();
        this.checkMonthAndDecreaseDate();
      }
      // MONTH VIEW
      else if (view === "monthList") this.decreaseYear();
      // YEAR VIEW
      else if (view === "yearList") this.decreaseYearRange();
    },

    checkMonthAndIncreaseDate() {
      let dateList = this.getSelectedDate.split("-"),
        month = Number(dateList[1]);

      // CHECK IF NUMBER IS EQUAL TO 11
      if (month === 12) {
        this.setCalendar(
          `${(Number(dateList[0]) + 1).toString()}-1-${dateList[2]}`
        );
      } else {
        this.setCalendar(
          `${dateList[0]}-${(Number(dateList[1]) + 1).toString()}-${
            dateList[2]
          }`
        );
      }
    },

    checkMonthAndDecreaseDate() {
      let dateList = this.getSelectedDate.split("-"),
        month = Number(dateList[1]);

      // CHECK IF NUMBER IS EQUAL TO 0
      if (month === 1) {
        this.setCalendar(
          `${(Number(dateList[0]) - 1).toString()}-12-${dateList[2]}`
        );
      } else {
        this.setCalendar(
          `${dateList[0]}-${(Number(dateList[1]) - 1).toString()}-${
            dateList[2]
          }`
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-plugin {
  box-sizing: border-box;
  padding: toRem(22.5) toRem(18);
}
</style>
