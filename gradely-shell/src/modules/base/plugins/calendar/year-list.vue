<template>
  <div class="year-list">
    <div class="years-view w-100 h-auto overflow-auto">
      <div
        class="years w-25 text-center color-ash border-0 select-none pointer"
        v-for="(year, index) in years"
        :key="index"
        @click="setUpdateYear(year)"
        :class="year | highlightSelectedYear(current_year, selected_year)"
      >
        {{ year }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "yearList",

  props: {
    current_year: Number,
    year_min: Number,
    year_max: Number,
  },

  computed: {
    ...mapGetters({
      getSelectedDate: "dbCalendar/getSelectedDate",
    }),
  },

  watch: {
    year_min: "yearData",

    getSelectedDate: {
      handler(value) {
        this.selected_year = value.split("-")[0];
      },
      immediate: true,
    },
  },

  filters: {
    highlightSelectedYear(year, current_year, selected_year) {
      if (year === current_year) return "active";
      else if (year == selected_year) return "selected";
      else return false;
    },
  },

  data: () => ({
    years: [],
    date_obj: new Date(),
    selected_year: "",
  }),

  mounted() {
    this.yearData();
  },

  methods: {
    ...mapActions({
      setCalendar: "dbCalendar/updateSelectedDate",
    }),

    setUpdateYear(year) {
      this.$emit("updateYear", year);

      let dateList = this.getSelectedDate.split("-");
      this.setCalendar(`${year}-${dateList[1]}-${dateList[2]}`);
    },

    yearData() {
      this.years.length = 0;
      for (let i = this.year_min; i <= this.year_max; i++) {
        this.years.push(i);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.year-list {
  .years-view {
    @include flex-row-evenly-wrap;
    justify-content: flex-start;
    font-size: toRem(12.5);

    @include breakpoint-down(sm) {
      font-size: toRem(12);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(11.5);
    }

    .years {
      padding-top: toRem(10);
      padding-bottom: toRem(10);
      margin-bottom: toRem(5);
      transition: background-color 0.25s ease-in-out;

      &:hover {
        background-color: rgba($brand-accent, 0.3);
      }
    }

    .active {
      background: rgba($brand-green, 0.3);
    }

    .selected {
      background: rgba($brand-red, 0.2);
    }
  }
}
</style>
