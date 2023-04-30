<template>
  <div
    class="
      assessment-card
      position-relative
      rounded-5
      white-text-bg
      mgb-4
      pointer
      smooth-transition
    "
    @click="goToAssessmentReview"
    v-if="show_assessment"
  >
    <!-- HOVER LABEL  -->
    <div
      class="label position-absolute h-100 smooth-transition"
      :class="getLabelColor"
    ></div>

    <!-- INFO COLUMN  -->
    <div class="info-column">
      <div class="avatar avatar-with-meta rounded-5">
        <div class="avatar-title">{{ day }}</div>
        <div class="avatar-meta">{{ month }}</div>
      </div>

      <!-- INFO  -->
      <div class="info">
        <!-- TITLE  -->
        <div class="title-text brand-primary font-weight-600 text-capitalize">
          {{ assessment.title }}
          <span
            v-if="assessment_type === 'published'"
            class="font-weight-600 text-uppercase"
            :class="assessment.is_closed ? 'brand-red' : 'brand-green'"
          >
            - {{ assessment.is_closed ? "Closed" : "Open" }}</span
          >
        </div>

        <!-- DESCRIPTION -->
        <div class="description color-grey-dark">
          {{ assessment.subject.name }} <span class="mx-1">•</span>
          <span class="text-capitalize" :class="getTagColor"
            >{{ assessment.tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- STAT COLUMN -->
    <div class="stat-column">
      <template v-if="assessment_type === 'published'">
        <template v-if="getSubmittedStudents">
          <div
            class="progress-bar rounded-5"
            :title="`${assessment.submitted_students} ${
              assessment.submitted_students == 1 ? 'student' : 'students'
            } submitted from ${assessment.expected_students} in class`"
          >
            <div
              class="progress h-100 brand-accent-bg"
              :style="'width:' + getSubmittedStudents + '%'"
              role="progress"
            ></div>

            <div class="stat-count">
              {{ assessment.submitted_students }}/{{
                assessment.expected_students
              }}
            </div>
          </div>

          <!-- USERS -->
          <div
            v-if="false"
            class="stats position-relative"
            :title="completedStatusTooltipInfo"
          >
            <div class="avatar">
              <div class="icon icon-members border-grey-dark"></div>
            </div>

            <!-- COUNTER -->
            <div class="counter border-grey-dark">
              {{ assessment.submitted_students }}
            </div>
          </div>
        </template>

        <div v-else class="draft-text color-grey-dark">Not attempted</div>
      </template>

      <template v-else-if="assessment_type === 'draft'">
        <div
          class="draft-text color-ash"
          v-if="assessment.questionCount == '0'"
        >
          No question
        </div>

        <div class="draft-text color-ash" v-else>
          {{ assessment.questionCount }}
          {{ assessment.questionCount == 1 ? "question" : "questions" }} added
        </div>
      </template>

      <template v-else>
        <div
          class="review-text"
          :class="
            assessment.review_status === 0
              ? 'review-text-rejected'
              : 'review-text-pending'
          "
        >
          {{ assessment.review_status === 0 ? "REJECTED" : "PENDING" }}
        </div>
      </template>
    </div>

    <!-- OPTION COLUMN -->
    <div class="option-column position-relative ignore">
      <template v-if="['published', 'draft'].includes(assessment_type)">
        <div
          class="avatar rounded-7 pointer ignore"
          @click="toggleOptions"
          v-on-clickaway="hideOptions"
        >
          <div class="icon icon-ellipsis-h border-grey-dark ignore"></div>
        </div>
      </template>

      <template v-else>
        <div
          class="edit-btn rounded-10 font-weight-700 pointer smooth-transition"
        >
          EDIT
        </div>
      </template>

      <!-- DROPDOWN -->
      <div
        class="
          dropdown
          rounded-5
          box-shadow-effect
          smooth-transition smooth-animation
          white-text-bg
          ignore
        "
        v-if="show_more_option"
      >
        <router-link
          :to="{
            name: 'AssessmentSummaryReview',
            params: { id: assessment.class_id, assessment_id: assessment.id },
            query: { title: assessment.title },
          }"
          class="item ignore"
          v-if="assessment_type === 'published'"
        >
          <div class="icon-cover ignore">
            <div class="icon icon-eye ignore"></div>
          </div>
          <div class="ignore">View Report</div>
        </router-link>

        <div
          class="item ignore"
          v-if="assessment_type === 'draft'"
          @click="proceedToLms"
        >
          <div class="icon-cover ignore">
            <div class="icon icon-gear ignore"></div>
          </div>
          <div class="ignore">
            {{
              assessment.questionCount == "0"
                ? "Add Questions"
                : "Manage Questions"
            }}
          </div>
        </div>

        <div
          class="item ignore"
          v-if="getAuthType === 'teacher' && assessment.tag !== 'exam'"
          @click="toggleEditAssessment"
        >
          <div class="icon-cover ignore">
            <div class="icon icon-edit-pen ignore"></div>
          </div>
          <div class="ignore">Edit Assessment</div>
        </div>

        <div
          class="item ignore"
          v-if="assessment_type === 'published' && assessment.tag !== 'exam'"
          @click="toggleExtendDate"
        >
          <div class="icon-cover ignore">
            <div class="icon icon-clock ignore"></div>
          </div>
          <div class="ignore">Manage Assessment Date</div>
        </div>

        <div
          class="item ignore"
          v-if="assessment_type === 'published'"
          @click="toggleRestartAssessment"
        >
          <div class="icon-cover ignore">
            <div class="icon icon-restart ignore"></div>
          </div>
          <div class="ignore">Restart Assessment</div>
        </div>

        <div
          class="item ignore"
          v-if="assessment.tag !== 'exam'"
          @click="toggleDeleteAssessment"
        >
          <div class="icon-cover ignore">
            <div class="icon icon-trash ignore"></div>
          </div>
          <div class="ignore">Delete Assessment</div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_edit_assessment_modal">
        <edit-assessment-modal
          :assessment="assessment"
          @closeTriggered="toggleEditAssessment"
        />
      </transition>

      <transition name="fade" v-if="show_extend_date_modal">
        <extend-date-modal
          :deadline="getDeadline"
          :assessment_id="assessment.id"
          @closeTriggered="toggleExtendDate"
        />
      </transition>

      <transition name="fade" v-if="show_restart_assessment_modal">
        <restart-assessment-modal
          :assessment_id="assessment.id"
          @closeTriggered="toggleRestartAssessment"
        />
      </transition>

      <transition name="fade" v-if="show_delete_assessment_modal">
        <delete-assessment-modal
          :assessment_id="assessment.id"
          :assessment_type="assessment_type"
          @closeTriggered="toggleDeleteAssessment"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { EXTERNAL_URL } from "@/env";

export default {
  name: "assessmentCard",

  components: {
    editAssessmentModal: () =>
      import(
        /* webpackChunkName: "editAssessmentModal" */ "@/modules/base/modals/assessments/edit-assessment-modal"
      ),
    restartAssessmentModal: () =>
      import(
        /* webpackChunkName: "restartAssessmentModal" */ "@/modules/base/modals/assessments/restart-assessment-modal"
      ),
    extendDateModal: () =>
      import(
        /* webpackChunkName: "extendDateModal" */ "@/modules/base/modals/assessments/extend-date-modal"
      ),
    deleteAssessmentModal: () =>
      import(
        /* webpackChunkName: "deleteAssessmentModal" */ "@/modules/base/modals/assessments/delete-assessment-modal"
      ),
  },

  props: {
    assessment_type: {
      type: String,
      default: "published",
    },

    assessment: {
      type: Object,
      default: () => ({
        id: 1,
        class_id: 1,
        title: "Assessment title...",
        subject: {
          name: "Maths",
        },
        tag: "homework",
        open_date: "2021-10-02 00:00:00",
        close_date: "2021-10-02 00:00:00",
        is_closed: 0,
        submitted_students: 0,
        expected_students: 0,
      }),
    },
  },

  computed: {
    getSubmittedStudents() {
      return (
        (Number(this.assessment.submitted_students) /
          Number(this.assessment.expected_students)) *
        100
      );
    },

    getTagColor() {
      if (this.assessment.tag === "homework") return "brand-inverse";
      else if (this.assessment.tag === "exam") return "brand-tonic";
      else return "brand-accent";
    },

    completedStatusTooltipInfo() {
      if (Number(this.assessment.submitted_students) === 1)
        return `${this.assessment.submitted_students} student has completed this assessment`;
      else if (Number(this.assessment.submitted_students) > 1)
        return `${this.assessment.submitted_students} students has completed this assessment`;
      else return "No report on this assessment yet!";
    },

    getDeadline() {
      return {
        open_date: this.assessment.open_date,
        close_date: this.assessment.close_date,
      };
    },

    getLabelColor() {
      // PUBLISHED LABELS
      if (this.assessment_type === "published") {
        // Check completed, attempted and pending
        if (Number(this.assessment.submitted_students) === 0)
          return "border-grey-bg";
        else if (
          Number(this.assessment.submitted_students) ===
          Number(this.assessment.expected_students)
        )
          return "brand-green-bg";
        else return "brand-accent-bg";
      }
      // REVIEW LABELS
      else if (this.assessment_type === "review") {
        return this.assessment.review_status === 0
          ? "brand-tonic-bg"
          : "border-grey-bg";
      }
      // DRAFT LABELS
      else if (this.assessment_type === "draft") {
        return this.assessment.questionCount == "0"
          ? "border-grey-bg"
          : "brand-accent-bg";
      }
    },

    isExamType() {
      return this.getAuthType === "teacher" && this.assessment.tag === "exam"
        ? true
        : false;
    },
  },

  data: () => ({
    show_more_option: false,
    show_edit_assessment_modal: false,
    show_extend_date_modal: false,
    show_restart_assessment_modal: false,
    show_delete_assessment_modal: false,

    show_assessment: true,

    day: "",
    month: "",
  }),

  mounted() {
    this.setDate();
  },

  methods: {
    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    setDate() {
      let day = this.$date.formatDate(this.assessment.close_date).getDay("d2");
      let month = this.$date
        .formatDate(this.assessment.close_date)
        .getMonth("m4");

      this.day = !day || isNaN(Number(day)) ? "" : day;
      this.month = !month || isNaN(Number(day)) ? "" : month;

      // this.show_assessment = Number.isNaN(this.day) ? false : true;
    },

    goToAssessmentReview($event) {
      if (
        !$event.target.classList.contains("ignore") &&
        this.assessment_type === "published"
      ) {
        this.$router.push({
          name: "AssessmentSummaryReview",
          params: {
            id: this.assessment.class_id,
            assessment_id: this.assessment.id,
          },
          query: { title: this.assessment.title },
        });
      }
      // DRAFT
      else if (
        !$event.target.classList.contains("ignore") &&
        this.assessment_type === "draft"
      )
        this.proceedToLms();
      // REVIEW
      else if (
        !$event.target.classList.contains("ignore") &&
        this.assessment_type === "review"
      )
        this.$router.push({
          name: "AssessmentPendingReview",
          params: {
            id: this.$route.params.id,
            assessment_id: this.assessment.id,
          },
          query: { title: this.assessment.title },
        });
    },

    proceedToLms() {
      if (this.assessment.questionCount == "0") {
        setTimeout(() => {
          location.href = EXTERNAL_URL(
            "lms",
            `/select-question/${this.assessment.id}`
          );
        }, 150);
      } else {
        setTimeout(() => {
          location.href = EXTERNAL_URL(
            "lms",
            `/manage-questions/${this.assessment.id}`
          );
        }, 150);
      }
    },

    toggleEditAssessment() {
      this.show_edit_assessment_modal = !this.show_edit_assessment_modal;
    },

    toggleExtendDate() {
      this.show_extend_date_modal = !this.show_extend_date_modal;
    },

    toggleRestartAssessment() {
      this.show_restart_assessment_modal = !this.show_restart_assessment_modal;
    },

    toggleDeleteAssessment() {
      this.show_delete_assessment_modal = !this.show_delete_assessment_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.assessment-card {
  padding: toRem(10) toRem(14);
  @include flex-row-between-nowrap;

  .label {
    left: 0;
    top: 0;
    width: toRem(3);
    border-radius: toRem(5) 0 0 toRem(5);
    // display: none;
  }

  &:hover {
    background: rgba($white-text, 0.6) !important;

    .label {
      // display: unset;
    }
  }

  @include breakpoint-down(lg) {
    padding: toRem(10);
  }

  @include breakpoint-down(xs) {
    padding: toRem(9) toRem(8);
  }

  .info-column {
    @include flex-row-start-nowrap;
    width: 55%;

    @include breakpoint-down(lg) {
      width: 70%;
    }

    @include breakpoint-down(xs) {
      width: 80%;
    }

    .avatar {
      margin-right: toRem(12);
      @include square-shape(40);

      @include breakpoint-down(lg) {
        margin-right: toRem(8);
        @include square-shape(38);
      }

      @include breakpoint-down(xs) {
        margin-right: toRem(6);
        @include square-shape(36);
      }

      .avatar-title {
        @include font-height(12, 18);

        @include breakpoint-down(lg) {
          @include font-height(11.5, 17);
        }

        @include breakpoint-down(xs) {
          @include font-height(11, 14);
        }
      }

      .avatar-meta {
        @include font-height(10.5, 16.5);

        @include breakpoint-down(lg) {
          @include font-height(10, 15);
          margin-top: toRem(-2);
        }

        @include breakpoint-down(xs) {
          margin-top: toRem(-0.5);
          @include font-height(9, 14);
        }
      }
    }

    .info {
      .title-text {
        @include font-height(12.5, 17);
        margin-bottom: toRem(2.5);

        @include breakpoint-down(xs) {
          @include font-height(11, 15);
        }

        span {
          @include font-height(11.5, 17);
        }
      }

      .description {
        @include font-height(11.5, 16);

        @include breakpoint-down(lg) {
          @include font-height(11.25, 15);
        }

        @include breakpoint-down(xs) {
          @include font-height(10.45, 14);
        }
      }
    }
  }

  .stat-column {
    @include flex-row-start-nowrap;
    width: 33%;

    @include breakpoint-down(xs) {
      display: none;
    }

    .progress-bar {
      position: relative;
      width: 65%;
      height: toRem(20);
      background: $brand-accent-light;

      @include breakpoint-down(lg) {
        width: 60%;
      }

      .progress {
        position: absolute;
      }

      .stat-count {
        font-size: toRem(10.85);
        color: $color-ash;
        font-weight: 600;
        @include center-y;
        right: toRem(6);
      }
    }

    .avatar {
      .icon {
        @include center-placement;
        font-size: toRem(18);
      }
    }

    .counter {
      position: absolute;
      top: toRem(1);
      right: toRem(1);
      font-size: toRem(10.5);

      @include breakpoint-down(lg) {
        top: toRem(2);
        right: toRem(2);
        font-size: toRem(10);
      }
    }

    .draft-text {
      @include font-height(12, 16);
    }

    .review-text {
      padding: toRem(7) toRem(13);
      font-size: toRem(10.75);
      border-radius: toRem(10);
      font-weight: 700;

      @include breakpoint-down(sm) {
        @include font-height(10, 15);
        padding: toRem(6) toRem(12);
      }

      &-rejected {
        background: rgba($brand-tonic, 0.875);
        color: $white-text;
      }

      &-pending {
        background: $border-grey;
        color: $color-grey-dark;
      }
    }
  }

  .option-column {
    @include flex-row-end-nowrap;
    width: 10%;

    .avatar {
      background: rgba($border-grey, 0.3);
      @include square-shape(30);
      @include transition(0.4s);

      @include breakpoint-down(xs) {
        @include square-shape(32);
      }

      .icon {
        @include center-placement;
        font-size: toRem(20);
      }

      &:hover {
        background: rgba($brand-inverse-light, 0.7);
      }
    }

    .edit-btn {
      padding: toRem(6) toRem(14);
      background: #fceacf;
      color: $brand-navy;
      font-size: toRem(12);

      @include breakpoint-down(xs) {
        padding: toRem(6) toRem(12);
        font-size: toRem(11.25);
      }

      &:hover {
        background: $brand-inverse-light;
      }
    }
  }

  .dropdown {
    width: toRem(190);
  }
}
</style>
