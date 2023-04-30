<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-sm-md' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Approve Exam</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-0">
        <!-- ASSESSMENT INFO -->
        <div class="assessment-info">
          <div class="avatar rounded-10 brand-red-light-bg">
            <img
              v-lazy="mxStaticImg('ExamIcon.png', 'base')"
              alt="gradely-exam-review"
            />
          </div>

          <div>
            <div class="title-text color-text font-weight-600 text-capitalize">
              {{ bulk ? "Bulk Approval" : homework.title }}
            </div>

            <div class="meta-text color-text">
              <template v-if="bulk">
                <div>
                  {{ getPendingExamSelected.length }} exams was selected for
                  approval!
                </div>
              </template>

              <template v-else>
                <div>{{ homework.subject }}</div>
                <div class="dot"></div>
                <div>
                  {{ homework.question_count }}
                  Question{{ homework.question_count === 1 ? null : "s" }}
                </div>
                <div class="dot"></div>
                <div>
                  {{ homework.score }}
                  Point{{ homework.score === 1 ? null : "s" }}
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="info-text color-ash">
          To approve this {{ bulk ? "exams" : "exam" }}, please set when you
          want the exam to be available to students.
        </div>

        <div class="d-flex justify-content-between">
          <!-- OPEN DATE -->
          <div class="form-group date-field compact-row">
            <label
              for="openDate"
              class="label-compact label-sm gfont-11-5 color-text"
            >
              Open Date
            </label>
            <input
              type="datetime-local"
              v-model="open_date"
              class="form-control"
              id="openDate"
            />
          </div>

          <!-- CLOSE DATE -->
          <div class="form-group date-field compact-row">
            <label
              for="closeDate"
              class="label-compact label-sm gfont-11-5 color-text"
            >
              Close Date
            </label>
            <input
              type="datetime-local"
              v-model="close_date"
              class="form-control"
              id="closeDate"
            />
          </div>
        </div>

        <!-- DURATION -->
        <div class="form-group compact-row w-100 mgb-15">
          <label
            for="duration"
            class="label-compact label-sm gfont-11-5 color-text"
          >
            Duration (in minutes)
          </label>
          <input
            type="number"
            v-model="duration"
            class="form-control"
            id="duration"
            placeholder="5"
          />
        </div>

        <!-- START/STOP EXAM -->
        <div class="form-group w-100 mgb-10">
          <label for="start_exam" class="check-item checkbox checkbox-sm">
            <input type="checkbox" id="start_exam" v-model="start_exam" />
            <div class="text">Start exam on opening date time</div>
          </label>
        </div>

        <!-- SHOW EXAM SCORE  -->
        <div class="form-group w-100 mgb-10">
          <label for="exam_score" class="check-item checkbox checkbox-sm">
            <input type="checkbox" id="exam_score" v-model="show_score" />
            <div class="text">Show exam score on completion</div>
          </label>
        </div>

        <!-- SHOW EXAM ANSWER  -->
        <div class="form-group w-100 mgb-10">
          <label for="exam_answer" class="check-item checkbox checkbox-sm">
            <input type="checkbox" id="exam_answer" v-model="show_answer" />
            <div class="text">
              Display exam answers to students on completion
            </div>
          </label>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end mgb-10">
        <button
          class="btn modal-btn transparent-bg no-shadow color-text mgr-10"
          @click="$emit('closeTriggered')"
        >
          Cancel
        </button>

        <button
          class="btn btn-accent"
          ref="approveBtn"
          @click="approveExam"
          :disabled="isDisabled"
        >
          Approve Exam
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "approvePendingModal",

  components: {
    modalCover,
  },

  props: {
    homework: {
      type: Object,
    },

    bulk: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      getPendingExamSelected: "dbWeekly/getPendingExamSelected",
    }),

    isDisabled() {
      return this.open_date && this.close_date && this.duration ? false : true;
    },

    getNewOpenDate() {
      let open_date = new Date(this.open_date);
      let date_string = open_date.toISOString();
      return date_string;
    },

    getNewCloseDate() {
      let close_date = new Date(this.close_date);
      let date_string = close_date.toISOString();
      return date_string;
    },

    getTodayDate() {
      return new Date().toISOString().substring(0, 16);
    },
  },

  data() {
    return {
      open_date: this.bulk
        ? ""
        : new Date(this?.homework?.open_date)?.toISOString()?.substring(0, 16),

      close_date: this.bulk
        ? ""
        : new Date(this?.homework?.close_date)?.toISOString()?.substring(0, 16),

      duration: this.bulk
        ? ""
        : Math.round(
            Number(
              this.homework?.duration ??
                this.homework?.question_duration ??
                this.homework?.questionsDuration
            ) / 60
          ),

      start_exam: true,
      show_score: true,
      show_answer: true,
    };
  },

  mounted() {
    // console.log(this.open_date);
  },

  methods: {
    ...mapActions({
      approveOrDeclineExam: "dbAssessments/approveOrDeclineExam",
    }),

    approveExam() {
      this.handleClick("approveBtn", "Approving...");

      let payload = {
        homework_id: this.bulk ? 0 : this.$route.params.assessment_id,
        assessment_info: {
          status: 1,
          open_date: this.getNewOpenDate,
          close_date: this.getNewCloseDate,
          duration: Number(this.duration),
          can_start: this.start_exam ? 1 : 0,
          can_see_score: this.show_score ? 1 : 0,
          can_see_answer: this.show_answer ? 1 : 0,
        },
      };

      console.log(payload);

      this.bulk
        ? (payload.assessment_info.exam_id = this.getPendingExamSelected)
        : null;

      this.approveOrDeclineExam(payload)
        .then((response) => {
          // console.log(response);
          this.handleClick("approveBtn", "Approve Exam", false);

          if (response.code === 200) {
            this.pushAlert("Exam approved successfully!", "success");

            this.bulk
              ? this.$bus.$emit("reloadPendingList")
              : this.$bus.$emit("reloadPendingExam");

            this.$emit("closeTriggered");
          } else {
            this.pushAlert("Exam was not approved", "warning");
          }
        })
        .catch(() => {
          this.handleClick("approveBtn", "Approve Exam", false);
          this.pushAlert("An error occured while approving exam", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  .assessment-info {
    @include flex-row-start-nowrap;

    .avatar {
      @include square-shape(42);
      margin-right: toRem(10);

      img {
        @include center-placement;
        @include square-shape(18);
      }
    }

    .title-text {
      @include font-height(13.78, 19);
      margin-bottom: toRem(1.5);

      @include breakpoint-down(xs) {
        @include font-height(13, 18);
      }
    }

    .meta-text {
      @include flex-row-start-wrap;
      @include font-height(12.25, 19);
    }

    .dot {
      @include square-shape(6);
      background: $border-grey;
      padding-top: toRem(3);
      margin: auto toRem(5);
      border-radius: 50%;
    }
  }

  .info-text {
    @include font-height(13, 22);
    margin: toRem(24) auto toRem(20);
  }

  .date-field {
    width: 48.5%;
  }

  .form-control {
    @include font-height(12.75, 19);
  }

  .check-item {
    @include flex-row-start-nowrap;

    .text {
      margin-top: toRem(3);
      margin-left: toRem(5);
      font-size: toRem(12.75);
    }
  }
}

.modal-cover-footer {
  .btn {
    padding: toRem(13) toRem(34);
    font-size: toRem(10.75);
  }
}
</style>
