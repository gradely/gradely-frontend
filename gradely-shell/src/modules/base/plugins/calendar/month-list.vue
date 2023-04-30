<template>
  <div class="month-list">
    <!-- MONTH VIEW -->
    <div class="month-view w-100">
      <div
        class="month"
        :class="index | highlightSelectedMonth(selected_month)"
        @click="setUpdateMonth(index)"
        v-for="(month, index) in $date.monthList"
        :key="index"
      >
        {{ month }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "monthList",

  computed: {
    ...mapGetters({
      getSelectedDate: "dbCalendar/getSelectedDate",
    }),
  },

  watch: {
    getSelectedDate: {
      handler(value) {
        this.selected_month = value.split("-")[1];
      },
      immediate: true,
    },
  },

  filters: {
    highlightSelectedMonth(month_index, selected_month) {
      let dateObj = new Date();
      let current_month = dateObj.getMonth();

      if (current_month === month_index) return "active";
      else if (month_index + 1 == selected_month) return "selected";
      else return false;
    },
  },

  data: () => ({
    date_obj: new Date(),
    selected_month: "",
  }),

  methods: {
    ...mapActions({
      setCalendar: "dbCalendar/updateSelectedDate",
    }),

    setUpdateMonth(month) {
      this.$emit("updateMonth", month);
      let dateList = this.getSelectedDate.split("-");
      this.setCalendar(`${dateList[0]}-${month + 1}-${dateList[2]}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.month-list {
  .month-view {
    @include flex-row-between-wrap;
    font-size: toRem(12.5);
    justify-content: flex-start;

    @include breakpoint-down(sm) {
      font-size: toRem(12);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(11.5);
    }

    .month {
      width: 33.2%;
      padding-top: toRem(10);
      padding-bottom: toRem(10);
      margin-bottom: toRem(5);
      text-align: center;
      border: none;
      cursor: pointer;
      font-weight: normal;
      user-select: none;
      color: $color-ash;
      transition: background-color 0.1s ease-in-out;

      &:hover {
        background-color: rgba($brand-accent, 0.3);
      }
    }

    .active {
      background: rgba($brand-green, 0.3);
    }

    .selected {
      background: rgba($brand-red, 0.2) !important;
    }
  }
}
</style>
