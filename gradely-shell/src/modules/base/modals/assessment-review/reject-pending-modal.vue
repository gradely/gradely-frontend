<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Reject Exam</div>
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
              {{ bulk ? "Bulk Rejection" : homework.title }}
            </div>

            <div class="meta-text color-text">
              <template v-if="bulk">
                <div>
                  {{ getPendingExamSelected.length }} exams was selected for
                  rejection!
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

        <!-- INFO TEXT -->
        <div class="info-text color-text font-weight-700">
          Why are you rejecting this {{ bulk ? "exams" : "exam" }}?
        </div>

        <textarea
          rows="6"
          v-model="review"
          class="form-control"
          placeholder="Please drop a comment on what you’d like the teacher to change on this assessment"
        ></textarea>
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

        <button class="btn btn-accent" ref="rejectBtn" @click="rejectExam">
          Reject Exam
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "rejectPendingModal",

  components: {
    modalCover,
  },

  computed: {
    ...mapGetters({
      getPendingExamSelected: "dbWeekly/getPendingExamSelected",
    }),

    getTodayDate() {
      return new Date().toISOString().substring(0, 16);
    },
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

  data() {
    return {
      review: "",
    };
  },

  methods: {
    ...mapActions({
      approveOrDeclineExam: "dbAssessments/approveOrDeclineExam",
    }),

    rejectExam() {
      this.handleClick("rejectBtn", "Rejecting...");

      let payload = {
        homework_id: this.bulk ? 0 : this.$route.params.assessment_id,
        assessment_info: {
          status: 0,
          open_date: this.bulk
            ? `${this.getTodayDate}:00Z`
            : this.homework.open_date,
          close_date: this.bulk
            ? `${this.getTodayDate}:00Z`
            : this.homework.close_date,
          remark: this.review,
          duration: 60,
          can_start: 1,
          can_see_score: 1,
          can_see_answer: 1,
        },
      };

      this.bulk
        ? (payload.assessment_info.exam_id = this.getPendingExamSelected)
        : null;

      this.approveOrDeclineExam(payload)
        .then((response) => {
          // console.log(response);
          this.handleClick("rejectBtn", "Reject Exam", false);

          if (response.code === 200) {
            this.pushAlert("Exam rejected successfully!", "success");

            this.bulk
              ? this.$bus.$emit("reloadPendingList")
              : this.$bus.$emit("reloadPendingExam");

            this.$emit("closeTriggered");
          } else {
            this.pushAlert("Exam was not rejected", "warning");
          }
        })
        .catch(() => {
          this.handleClick("rejectBtn", "Reject Exam", false);
          this.pushAlert("An error occured while rejecting exam", "error");
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
    @include font-height(12.75, 18);
    margin: toRem(24) auto toRem(8);
  }

  .form-control {
    @include font-height(12.75, 19);
  }
}

.modal-cover-footer {
  .btn {
    padding: toRem(13) toRem(34);
    font-size: toRem(10.75);
  }
}
</style>
