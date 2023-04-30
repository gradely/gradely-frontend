<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          Reschedule Class
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- LESSON DATE  -->
        <div class="form-group compact-row w-100">
          <label for="StartDate" class="label-compact label-sm"
            >Lesson Date
          </label>
          <input
            type="date"
            v-model="start_date"
            :min="min_date"
            id="StartDate"
            class="form-control"
            required
          />
        </div>

        <!-- LESSON TIME  -->
        <div class="form-group compact-row w-100">
          <label for="startTime" class="label-compact label-sm"
            >Lesson Time
          </label>
          <input
            type="time"
            v-model="start_time"
            id="startTime"
            class="form-control"
            required
          />
        </div>

        <!-- INTERVAL -->
        <div class="form-group compact-row w-100" v-if="false">
          <label for="interval" class="label-compact label-sm"
            >Repeat Class
          </label>
          <select id="interval" class="form-control">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-center mgb-10">
        <button
          class="btn modal-btn btn-soft-accent mgl-10"
          ref="scheduleBtn"
          @click="rescheduleClass"
        >
          Reschedule Class
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "rescheduleLiveclassModal",

  components: {
    modalCover,
  },

  props: {
    post: {
      type: Object,
    },
  },

  data() {
    return {
      min_date: "",
      start_date: this.post?.reference?.availability.split(" ")[0],
      start_time: this.post?.reference?.availability.split(" ")[1],
    };
  },

  mounted() {
    this.SetMinDate();
  },

  methods: {
    ...mapActions({
      rescheduleLiveClass: "dbFeeds/rescheduleLiveClass",
    }),

    SetMinDate() {
      let schedule = new Date();
      let year = schedule.getFullYear(),
        month =
          schedule.getMonth() + 1 > 9
            ? schedule.getMonth() + 1
            : `0${schedule.getMonth() + 1}`,
        day =
          schedule.getDate() > 9
            ? schedule.getDate()
            : `0${schedule.getDate()}`;

      this.min_date = `${year}-${month}-${day}`;
    },

    rescheduleClass() {
      this.handleClick("scheduleBtn", "Rescheduling...");

      let payload = {
        session_id: this.post?.reference?.id,
        availability: `${this.start_date} ${this.excludeMiliSeconds(
          this.start_time
        )}`,
      };

      this.rescheduleLiveClass(payload)
        .then((response) => {
          this.handleClick("scheduleBtn", "Reschedule Class", false);

          if (response.code === 200) {
            this.pushAlert("Live class rescheduled successfully!", "success");
            this.$bus.$emit("reloadFeeds");
            this.$bus.$emit("reloadUpcoming");

            this.$emit("closeTriggered");
          } else this.pushAlert("Live class reschedule failed!", "warning");
        })
        .catch(() => {
          this.handleClick("scheduleBtn", "Reschedule Class", false);
          this.pushAlert("Live class reschedule failed!", "error");
        });
    },

    // EXCLUDE MILI-SECONDS
    excludeMiliSeconds(time) {
      let splitted_time = time.split(":");
      return `${splitted_time[0]}:${splitted_time[1]}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-top: toRem(12);
  margin-bottom: toRem(30);

  .form-control {
    font-size: toRem(12.5);
  }
}

.modal-cover-footer {
  margin-top: toRem(-30);
  margin-bottom: toRem(10);

  @include breakpoint-custom-down(340) {
    margin-top: toRem(-45);
  }
}
</style>
