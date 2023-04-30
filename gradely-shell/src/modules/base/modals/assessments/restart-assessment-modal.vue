<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body central-placement pdb-0">
        <div class="top-row">
          <img
            v-lazy="mxStaticImg('restartIcon.png')"
            alt=""
            class="w-100 h-100"
          />
        </div>

        <!-- TITLE  -->
        <div class="title-text color-text font-weight-700 mgt-20 mgb-12">
          Restart Assessment
        </div>

        <div class="info-text color-ash text-center mgb-5">
          Clear current assessment submissions for all students.
        </div>

        <!-- START DATE  -->
        <div class="form-group compact-row w-100 mgt-20 mgb-25">
          <label for="StartDate" class="label-compact label-sm"
            >Start Date
          </label>
          <input
            type="datetime-local"
            v-model="open_date"
            id="StartDate"
            class="form-control"
            required
          />
        </div>

        <!-- END DATE  -->
        <div class="form-group compact-row w-100 mgb-12">
          <label for="EndDate" class="label-compact label-sm">End Date </label>
          <input
            type="datetime-local"
            v-model="close_date"
            :min="getTodayDate"
            id="EndDate"
            class="form-control"
            required
          />
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-center mgb-10">
        <button
          class="btn modal-btn transparent-bg no-shadow color-text mgr-10"
          @click="$emit('closeTriggered')"
        >
          Cancel
        </button>

        <button
          class="btn modal-btn btn-accent mgl-10"
          ref="restart"
          @click="refreshAssessment"
        >
          Restart
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import { mapActions } from "vuex";

export default {
  name: "restartAssessmentModal",

  components: {
    modalCover,
  },

  props: {
    deadline: {
      type: Object,
      default: () => {
        return {
          open_date: "2021-10-02 00:00:00",
          close_date: "2022-10-02 00:00:00",
        };
      },
    },

    assessment_id: [Number, String],
  },

  computed: {
    getNewOpenDate() {
      let open_date = new Date(this.open_date);
      let date_string = open_date.toISOString();
      let date = date_string.substring(0, 10);
      let time = date_string.substring(11, 19);
      return `${date} ${time}`;
    },

    getNewCloseDate() {
      let close_date = new Date(this.close_date);
      let date_string = close_date.toISOString();
      let date = date_string.substring(0, 10);
      let time = date_string.substring(11, 19);
      return `${date} ${time}`;
    },

    getTodayDate() {
      return new Date().toISOString().substring(0, 16);
    },

    getNewDeadline() {
      return {
        deadlineDate: {
          open_date: this.getNewOpenDate,
          close_date: this.getNewCloseDate,
        },

        assessment_id: this.assessment_id,
      };
    },

    getRestartPayload() {
      return {
        password: {
          password: "restart",
        },

        assessment_id: this.assessment_id,
      };
    },
  },

  data() {
    return {
      open_date: new Date(this.deadline.open_date)
        .toISOString()
        .substring(0, 16),

      close_date: new Date(this.deadline.close_date)
        .toISOString()
        .substring(0, 16),

      confirmation: "",
    };
  },

  methods: {
    ...mapActions({
      restartAssessment: "dbAssessments/restartAssessment",
      updateAssessmentDeadline: "dbAssessments/updateAssessmentDeadline",
    }),

    refreshAssessment() {
      this.handleClick("restart", "Restarting...");

      this.restartAssessment(this.getRestartPayload)
        .then(async (response) => {
          this.handleClick("restart", "Restart", false);

          if (response.code === 200) {
            await this.updateAssessmentDeadline(this.getNewDeadline);

            this.pushAlert("Assessment restarted successfully", "success");
            this.$bus.$emit("reloadAssessment", "published");

            this.$bus.$emit("postUpdated", response.data);
            this.$bus.$emit("reloadFeeds");

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1500);
          } else {
            this.pushAlert("Assessment failed to restart", "warning");
          }
        })
        .catch(() => {
          this.handleClick("restart", "Restart", false);
          this.pushAlert("Error restarting assessment", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  .top-row {
    margin-top: toRem(-10);
  }

  .title-text {
    @include font-height(16, 18);
  }
}

.modal-cover-footer {
  .btn {
    padding: toRem(14) toRem(40) !important;
  }
}
</style>
