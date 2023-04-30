<template>
  <div class="catchup-reminder-block">
    <div class="title-text font-weight-600 color-text">CATCHUP! REMINDER</div>

    <!-- DETAIL BLOCK  -->
    <div class="detail-block rounded-7">
      <!-- LEFT -->
      <div class="left">
        <div class="time color-ash font-weight-700">{{ getReminderTime }}</div>
        <div class="divider-line"></div>
        <div
          class="
            week-row
            d-flex
            justify-content-start
            align-items-center
            flex-wrap
          "
        >
          <div
            class="week-day"
            v-for="(day, index) in getWeekDays"
            :key="index"
          >
            {{ day.slug }}
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div
        class="block-link font-weight-700 pointer smooth-transition"
        @click="toggleScheduleLater"
      >
        UPDATE
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="schedule_later_modal">
        <schedule-later-modal
          @closeTriggered="toggleScheduleLater"
          :reminders="getCatchupReminders"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "catchupReminderBlock",

  components: {
    scheduleLaterModal: () =>
      import(/* modal */ "@/modules/base/modals/feeds/schedule-later-modal"),
  },

  computed: {
    ...mapGetters({ getCatchupReminders: "general/getCatchupReminders" }),

    getWeekDays() {
      return this.week_days.filter((week) => {
        return this.getCatchupReminders.find((alarm) => {
          return alarm.day.toLowerCase() === week.name.toLowerCase();
        });
      });
    },

    getReminderTime() {
      if (!this.getCatchupReminders?.length) return "NO REMINDER";
      if (
        this.getCatchupReminders?.length &&
        !this.getCatchupReminders[0].send_at
      )
        return "NO REMINDER";
      let time = this.getCatchupReminders[0].send_at;
      let splits = time.split(":");
      let meridian = Number(splits[0]) < 12 ? "AM" : "PM";
      return `${splits[0]}:${splits[1]} ${meridian}`;
    },
  },

  data: () => ({
    schedule_later_modal: false,
    week_days: [
      {
        slug: "Mon",
        name: "Monday",
      },
      {
        slug: "Tue",
        name: "Tuesday",
      },
      {
        slug: "Wed",
        name: "Wednesday",
      },
      {
        slug: "Thu",
        name: "Thursday",
      },
      {
        slug: "Fri",
        name: "Friday",
      },
      {
        slug: "Sat",
        name: "Saturday",
      },
      {
        slug: "Sun",
        name: "Sunday",
      },
    ],
  }),

  mounted() {
    this.getReminders();
  },

  methods: {
    ...mapActions({ getCatchupReminder: "general/getCatchupReminder" }),

    getReminders() {
      let use_child_token = this.getAuthType === "parent" ? true : false;

      this.getCatchupReminder(use_child_token)
        .then((response) => {})
        .catch((err) => console.log(err));
    },

    toggleScheduleLater() {
      this.schedule_later_modal = !this.schedule_later_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.catchup-reminder-block {
  margin-bottom: toRem(20);
  .title-text {
    @include font-height(13.25, 18);
    margin-bottom: toRem(10);
    padding-left: toRem(10);

    @include breakpoint-down(lg) {
      @include font-height(12, 17);
    }

    @include breakpoint-down(sm) {
      @include font-height(11, 16);
    }
  }

  .detail-block {
    padding: toRem(12);
    border: toRem(1) solid $brand-inverse-light;
    @include flex-row-between-wrap;

    .left {
      @include flex-row-start-nowrap;

      .time {
        @include font-height(13, 18);
        white-space: nowrap;

        @include breakpoint-down(lg) {
          @include font-height(12, 16);
        }
      }

      .divider-line {
        border: toRem(0.75) solid $border-grey;
        margin: auto toRem(15);
        height: toRem(28);
      }

      .week-day {
        border: toRem(1) solid $brand-accent;
        background: $brand-accent-light;
        padding: toRem(5) toRem(10);
        border-radius: toRem(12);
        margin: toRem(4);
        font-size: toRem(11);
        width: max-content;
        color: $brand-navy;
        text-align: center;

        @include breakpoint-down(xs) {
          font-size: toRem(10.5);
        }
      }
    }

    .block-link {
      @include font-height(12, 16);
      color: $brand-accent;

      @include breakpoint-down(lg) {
        @include font-height(11, 16);
      }

      &:hover {
        color: $brand-inverse;
      }
    }
  }
}
</style>
