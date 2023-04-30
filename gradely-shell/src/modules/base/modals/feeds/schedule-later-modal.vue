<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
    :trigger_self_close="false"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Update Reminder</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- WEEKLY FIELD -->
        <div class="form-row mgb-30">
          <div class="label-text">What days would you like to use CatchUp?</div>

          <div class="weekly-row">
            <div
              class="weekly-card smooth-transition"
              :class="day.selected ? 'weekly-card-active' : null"
              @click="selectWeekDay(day, index)"
              v-for="(day, index) in week_days"
              :key="index"
            >
              {{ day.slug }}
            </div>
          </div>
        </div>

        <!-- TIME FIELD -->
        <div class="form-row">
          <div class="label-text">
            What time will you be available for practice?
          </div>

          <div class="period-input">
            <div class="form-input-wrapper">
              <input type="time" v-model="reminder_time" class="form-control" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end mgb-10">
        <button
          class="btn modal-btn transparent-bg no-shadow color-text mgr-5"
          @click="$emit('closeTriggered')"
        >
          Cancel
        </button>

        <button
          class="btn btn-accent modal-btn mgl-5"
          ref="reminderBtn"
          :disabled="isDisabled"
          @click="updateReminder"
        >
          Save Changes
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "scheduleLaterModal",

  components: {
    modalCover,
  },

  props: {
    reminders: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    isDisabled() {
      return false;
    },

    updateReminderPayload() {
      let selected_day = [];
      this.week_days.forEach((week) => {
        if (week.selected) selected_day.push(week.name.toLowerCase());
      });

      return {
        payload: {
          days: selected_day,
          type: "catchup",
          send_at: this.reminder_time,
        },
        use_child_token: this.getAuthType === "parent" ? true : false,
      };
    },
  },

  watch: {
    reminders: {
      handler(reminder) {
        this.week_days = this.week_days.map((week) => {
          let in_reminder = reminder.find((alarm) => {
            return alarm.day.toLowerCase() === week.name.toLowerCase();
          });
          if (in_reminder) week.selected = true;
          return week;
        });

        this.reminder_time = reminder.length ? reminder[0].send_at : "";
      },
      immediate: true,
    },
  },

  data() {
    return {
      reminder_time: "07:09:00",
      seleted_days: [],
      week_days: [
        {
          id: 1,
          slug: "Mon",
          name: "Monday",
          selected: false,
        },
        {
          id: 2,
          slug: "Tue",
          name: "Tuesday",
          selected: false,
        },
        {
          id: 3,
          slug: "Wed",
          name: "Wednesday",
          selected: false,
        },
        {
          id: 4,
          slug: "Thu",
          name: "Thursday",
          selected: false,
        },
        {
          id: 5,
          slug: "Fri",
          name: "Friday",
          selected: false,
        },
        {
          id: 6,
          slug: "Sat",
          name: "Saturday",
          selected: false,
        },
        {
          id: 7,
          slug: "Sun",
          name: "Sunday",
          selected: false,
        },
      ],
    };
  },

  methods: {
    ...mapActions({
      reportFeedComment: "dbFeeds/reportFeedComment",
      updateCatchupReminder: "general/updateCatchupReminder",
      getCatchupReminder: "general/getCatchupReminder",
    }),

    selectWeekDay(day, index) {
      let updated_day = { ...day, selected: !day.selected };
      this.week_days.splice(index, 1, updated_day);
    },

    async updateCatchupReminderList() {
      let use_child_token = this.getAuthType === "parent" ? true : false;
      await this.getCatchupReminder(use_child_token);
    },

    updateReminder() {
      this.handleClick("reminderBtn", "Saving...");
      this.updateCatchupReminder(this.updateReminderPayload)
        .then((response) => {
          this.handleClick("reminderBtn", "Save Changes", false);
          if (response.code === 200) {
            this.pushAlert("Catchup Reminder Updated", "success");
          } else this.pushAlert("Failed to update reminder", "warning");

          setTimeout(async () => {
            await this.updateCatchupReminderList();
            this.$emit("closeTriggered");
          }, 1200);
        })
        .catch((err) => {
          this.handleClick("reminderBtn", "Save Changes", false);
          this.pushAlert("Failed to update reminder", "error");
          console.log("error updating reminder>>", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  .label-text {
    @include font-height(13.5, 17);
    margin-bottom: toRem(10);
    color: $color-text;
  }

  .weekly-row {
    @include flex-row-start-wrap;

    .weekly-card {
      border: toRem(1) solid $brand-inverse;
      background: $brand-inverse-light;
      padding: toRem(6) toRem(10);
      border-radius: toRem(15);
      font-size: toRem(12.25);
      margin: toRem(3);
      color: $color-ash;
      cursor: pointer;

      @include breakpoint-down(sm) {
        padding: toRem(6) toRem(8);
        font-size: toRem(12);
      }

      &:hover {
        border: toRem(1) solid $brand-accent;
        background: $brand-accent-light;
      }

      &-active {
        border: toRem(1) solid $brand-accent;
        background: $brand-accent-light;
      }
    }
  }
}

.modal-cover-footer {
  .btn {
    padding: toRem(12.5) toRem(32);
    font-size: toRem(10.5);
  }
}
</style>
