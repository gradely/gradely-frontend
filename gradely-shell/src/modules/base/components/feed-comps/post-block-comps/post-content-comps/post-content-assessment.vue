<template>
  <div class="position-relative d-flex justify-content-start w-100">
    <div class="spacer"></div>

    <div class="post-content-area padded-area pt-0 w-100">
      <div class="content-area-card rounded-10">
        <!-- LEFT  -->
        <div class="left">
          <div
            class="avatar brand-red-light-bg rounded-5"
            v-if="post.reference && post.reference.tag === 'exam'"
          >
            <img
              v-lazy="mxStaticImg('Exam.svg', 'dashboard')"
              alt="Exam"
              class="exam-avatar"
            />
          </div>

          <div class="avatar brand-inverse-light-bg rounded-5" v-else>
            <div class="icon icon-library brand-navy"></div>
          </div>
        </div>

        <!-- RIGHT  -->
        <div class="right">
          <!-- TOP ROW  -->
          <div class="top-row">
            <!-- TITLE TEXT  -->
            <div class="title-text color-text font-weight-600">
              {{ $string.getCapitalizeText(post.reference.title) }}
            </div>

            <!-- META TEXT  -->
            <div class="meta-text color-grey-dark">
              {{ post.reference.subject }}
            </div>
          </div>

          <!-- MIDDLE ROW  -->
          <div class="middle-row">
            <!-- DATE  -->
            <div class="info date-row font-weight-500">
              <div
                class="title text-uppercase"
                :class="getAssessmentStatus.color"
              >
                {{ getAssessmentStatus.text }}
              </div>
              <div class="value color-text">
                {{ getDueDate ? getDueDate : "No close date available" }}
              </div>
            </div>

            <!-- STATUS  -->
            <div class="info status-row color-grey-dark">
              <div class="title">Status</div>
              <div class="value">Due Date</div>
            </div>
          </div>

          <!-- BOTTOM ROW  -->
          <div class="bottom-row">
            <template v-if="!hasQuestions">
              <button
                class="btn"
                @click="goToTourAssessmentReport"
                v-if="isTourAssessment"
              >
                View Report
              </button>

              <button class="btn" disabled v-else>No Questions</button>

              <!-- TOUR DESCRIPTION TEXT -->
              <template v-if="$route.query.tour">
                <div
                  class="
                    tour-description
                    white-text-bg
                    rounded-5
                    h-auto
                    smooth-animation
                    index-1
                  "
                  v-if="show_tooltip"
                >
                  <!-- TOUR TEXT -->
                  <div class="tour-text color-text">
                    Click on view report to see the details of the assessment
                    created
                  </div>

                  <!-- TOUR CTA -->
                  <div class="tour-cta">
                    <router-link
                      :to="{
                        name: 'GradelyFeeds',
                        params: { id: $route.params.id },
                        query: { completed_tour: true, dismissed: true },
                      }"
                      class="btn dismiss-btn color-text ignore"
                    >
                      Dismiss
                    </router-link>

                    <button
                      class="btn modal-btn btn-accent ignore"
                      @click="goToTourAssessmentReport"
                    >
                      View
                    </button>
                  </div>
                </div>
              </template>
            </template>

            <template v-else>
              <template v-if="getDueDate">
                <!-- MANAGE BUTTON PARENT AND STUDENT TAKEN STATE  -->
                <router-link
                  :to="{
                    name: 'AssessmentStudentReview',
                    params: {
                      id: $route.params.id,
                      assessment_id: post.reference.id,
                    },
                    query: { title: post.reference.title },
                  }"
                  class="btn"
                  v-if="isParentChildAndTakenState"
                  >View Report</router-link
                >

                <!-- MANAGE BUTTON PARENT AND STUDENT CLOSED STATE -->
                <button
                  class="btn"
                  disabled
                  v-else-if="isParentChildAndClosedState"
                >
                  Assessment Closed
                </button>

                <button
                  v-else
                  class="btn"
                  @click="processButtonHandler"
                  :disabled="!canStartAssessment"
                >
                  {{ processButtonText }}
                </button>

                <!-- DROPDOWN OPTIONS FOR SCHOOL AND TEACHER -->
                <template v-if="!$route.query.tour">
                  <div
                    class="options pointer rounded-12 smooth-transition"
                    @click="toggleOptions"
                    v-on-clickaway="hideOptions"
                    v-if="
                      getAuthType === 'school' ||
                      (getAuthType === 'teacher' &&
                        post.isOwner &&
                        !isPostReviwed)
                    "
                  >
                    <div class="icon icon-ellipsis-h brand-navy"></div>

                    <!-- DROPDOWN  -->
                    <div
                      class="
                        dropdown
                        rounded-5
                        box-shadow-effect
                        smooth-transition
                        white-text-bg
                      "
                      v-if="show_more_option"
                    >
                      <div class="item" @click="toggleExtendDate">
                        <div class="icon-cover">
                          <div class="icon icon-clock gfont-18"></div>
                        </div>
                        <div>Manage Date</div>
                      </div>

                      <div
                        class="item text-capitalize"
                        @click="toggleRestartAssessment"
                      >
                        <div class="icon-cover">
                          <div class="icon icon-restart gfont-14-5"></div>
                        </div>
                        <div>Restart Assessment</div>
                      </div>

                      <div
                        class="item text-capitalize"
                        @click="toggleDeleteAssessment"
                      >
                        <div class="icon-cover">
                          <div class="icon icon-trash gfont-18"></div>
                        </div>
                        <div>Delete Assessment</div>
                      </div>
                    </div>
                  </div>
                </template>
              </template>

              <template v-else>
                <button class="btn" disabled>Invalid Assessment</button>
              </template>
            </template>
          </div>
        </div>
      </div>

      <!-- CoNTENT DETAILS  -->
      <div class="content-details">
        <div class="text text-capitalize">
          {{ post.reference.tag }}
        </div>

        <div class="bullet"></div>
        <div class="text">{{ post.reference.subject }}</div>
        <div class="bullet" v-if="isSchoolAndTeacher"></div>

        <div
          v-if="isSchoolAndTeacher"
          @click="viewParticipants"
          class="text link link-underline pointer smooth-transition"
        >
          <template v-if="isTourAssessment"
            >{{ tour_students.length }} Attempts</template
          >

          <template v-else>
            {{ post.reference.submitted_student_count }}
            {{
              post.reference.submitted_student_count == 1
                ? "Attempt"
                : "Attempts"
            }}
          </template>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_start_assessment_modal">
        <start-assessment-modal
          :assessment="post.reference"
          @closeTriggered="toggleStartAssessment"
        />
      </transition>

      <transition name="fade" v-if="show_extend_date_modal">
        <extend-date-modal
          :deadline="getDeadline"
          :assessment_id="post.reference.id"
          @closeTriggered="toggleExtendDate"
        />
      </transition>

      <transition name="fade" v-if="show_restart_assessment_modal">
        <restart-assessment-modal
          :deadline="getDeadline"
          :assessment_id="post.reference.id"
          @closeTriggered="toggleRestartAssessment"
        />
      </transition>

      <transition name="fade" v-if="show_delete_assessment_modal">
        <delete-assessment-modal
          :assessment_id="post.reference.id"
          assessment_type="published"
          @closeTriggered="toggleDeleteAssessment"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import STUDENTS from "@/store/general/students";

export default {
  name: "postContentAssessment",

  components: {
    startAssessmentModal: () =>
      import(
        /* webpackChunkName: "startAssessmentModal" */ "@/modules/base/modals/assessments/start-assessment-modal"
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
    post: {
      type: Object,
    },
  },

  computed: {
    getAssessmentColor() {
      if (this.post?.reference?.tag === "exam") return "brand-red";
      else if (this.post?.reference?.tag === "homework") return "brand-inverse";
      else return "brand-accent";
    },

    getDueDate() {
      let { d3, m4, y1, h1, b2, a0 } = this.$date
        .formatDate(this.post?.reference?.close_date)
        .getAll();

      return m4 === undefined ? false : `${d3} ${m4}, ${y1} ${h1}:${b2} ${a0}`;
    },

    isSchoolAndTeacher() {
      return ["school", "teacher"].includes(this.getAuthType) ? true : false;
    },

    // Checking if the post is reviewed or not.
    isPostReviwed() {
      return this.post?.reference?.review_status &&
        this.getAuthType == "teacher" &&
        this.post?.reference?.tag == "exam" &&
        this.post?.reference?.submitted_student_count == 0 &&
        this.$route.query?.tour !== 7
        ? true
        : false;
    },

    getDeadline() {
      return {
        open_date: this.post?.reference?.open_date,
        close_date: this.post?.reference?.close_date,
      };
    },

    hasQuestions() {
      let question_count = this.post?.reference?.question_count ?? 0;
      return question_count > 0 ? true : false;
    },

    isTourAssessment() {
      let tour_titles = [
        "Gradely Tour",
        "Gradely Tour Session",
        "Gradely Class Tour",
        "Class Tour",
        "Gradely LMS Tour",
      ];

      return tour_titles.includes(this.post.reference?.title) ? true : false;
    },

    getAssessmentStatus() {
      let today = new Date();
      let close_date = new Date(this.post?.reference?.close_date);
      let open_date = new Date(this.post?.reference?.open_date);

      open_date.setHours(open_date.getHours() - 1);
      close_date.setHours(close_date.getHours() - 1);

      if (today > close_date)
        return {
          color: "brand-tonic",
          text: "Closed",
        };
      else if (today < open_date)
        return {
          color: "brand-accent",
          text: "Pending",
        };
      else
        return {
          color: "brand-green",
          text: "Open",
        };
    },

    canStartAssessment() {
      if (["school", "teacher"].includes(this.getAuthType)) return true;
      return this.hasStarted && !this.hasClosed ? true : false;
    },

    hasStarted() {
      let today = new Date();
      let open_date = new Date(this.post?.reference?.open_date);
      open_date.setHours(open_date.getHours() - 1);

      let can_start = this.post?.reference?.can_start ?? true;

      return open_date <= today && can_start ? true : false;
    },

    hasClosed() {
      let today = new Date();
      let close_date = new Date(this.post?.reference?.close_date);
      close_date.setHours(close_date.getHours() - 1);

      return today >= close_date ? true : false;
    },

    getFeedBackMessage() {
      if (!this.hasStarted)
        return `You can't start this ${this.post?.reference?.tag} yet`;
      if (this.hasClosed)
        return `This ${this.post?.reference?.tag} already closed`;
      return `You can't take this assessment`;
    },

    processButtonText() {
      if (["school", "teacher"].includes(this.getAuthType)) {
        if (this.$route.query?.tour == 7) return "View Report";

        if (
          this.post?.reference?.tag === "exam" &&
          this.getAuthType === "teacher"
        )
          return this.post?.reference?.submitted_student_count == 0
            ? "Manage Assessment"
            : "View Report";
        else
          return this.post?.reference?.submitted_student_count == 0
            ? "Manage Assessment"
            : "View Report";
      }

      // PARENT AND STUDENT
      else if (["parent", "student"].includes(this.getAuthType))
        return `Start ${this.post?.reference?.tag}`;
    },

    isParentChildAndClosedState() {
      if (["parent", "student"].includes(this.getAuthType)) {
        let date_ref = new Date();
        let current_date = new Date(
          `${date_ref.getFullYear()}-${
            date_ref.getMonth() + 1
          }-${date_ref.getDate()}`
        );

        let close_day = new Date(this.post?.reference?.close_date);
        close_day.setHours(close_day.getHours() - 1);

        return current_date > close_day ? true : false;
      } else return false;
    },

    isParentChildAndTakenState() {
      if (["parent", "student"].includes(this.getAuthType)) {
        return this.post?.reference?.is_taken ? true : false;
      } else return false;
    },
  },

  data: () => ({
    show_more_option: false,
    show_start_assessment_modal: false,
    show_extend_date_modal: false,
    show_restart_assessment_modal: false,
    show_delete_assessment_modal: false,
    tour_students: STUDENTS,

    false_assessment: false,
    show_tooltip: false,
  }),

  mounted() {
    setTimeout(() => (this.show_tooltip = true), 6250);
  },

  methods: {
    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    toggleStartAssessment() {
      this.show_start_assessment_modal = !this.show_start_assessment_modal;
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

    goToTourAssessmentReport() {
      return this.$router.push({
        name: "AssessmentSummaryReview",
        params: {
          id: this.$route.params.id,
          assessment_id: this.post?.reference?.id,
        },
        query: {
          title: this.post?.reference?.title,
          tour: this.$route.query?.tour ? this.$string.encodeString(8) : null,
        },
      });
    },

    processButtonHandler() {
      let tour = this.$route.query?.tour;

      if (tour == 7)
        return this.$router.push({
          name: "AssessmentSummaryReview",
          params: {
            id: this.$route.params.id,
            assessment_id: this.post?.reference?.id,
          },
          query: {
            title: this.post?.reference?.title,
            tour: this.$string.encodeString(8),
          },
        });

      if (!this.canStartAssessment) {
        this.pushAlert(this.getFeedBackMessage, "warning");
        return;
      }

      if (["school", "teacher"].includes(this.getAuthType)) {
        if (this.post?.reference?.submitted_student_count == 0) {
          this.toggleExtendDate();
        } else
          return this.$router.push({
            name: "AssessmentSummaryReview",
            params: {
              id: this.$route.params.id,
              assessment_id: this.post?.reference?.id,
            },
            query: { title: this.post?.reference?.title },
          });
      }

      // PARENT AND STUDENT
      else if (this.getAuthType === "parent" || this.getAuthType === "student")
        this.toggleStartAssessment();
    },

    viewParticipants() {
      if (this.isTourAssessment) {
        return this.$router.push({
          name: "AssessmentParticipantReview",
          params: {
            id: this.$route.params.id,
            assessment_id: this.post?.reference?.id,
          },
          query: { title: this.post?.reference?.title },
        });
      } else if (this.post?.reference?.submitted_student_count == 0) {
        this.pushAlert("No assessment attempt yet", "warning");
      } else
        return this.$router.push({
          name: "AssessmentParticipantReview",
          params: {
            id: this.$route.params.id,
            assessment_id: this.post?.reference?.id,
          },
          query: { title: this.post?.reference?.title },
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  &:disabled {
    background: rgba($border-grey, 0.75) !important;
    border: toRem(1) solid rgba($border-grey-dark, 0.5) !important;
  }
}

.exam-avatar {
  @include center-placement;
  @include square-shape(20);
}

.tour-description {
  position: absolute;
  padding: toRem(12) toRem(14);
  width: toRem(245);
  left: 30%;
  top: 75%;

  @include breakpoint-down(sm) {
    left: 30%;
    top: 88%;
    width: toRem(230);
  }

  .tour-text {
    @include font-height(11.25, 18);
    margin-bottom: toRem(12);

    @include breakpoint-down(sm) {
      @include font-height(11, 18);
    }
  }

  .tour-cta {
    @include flex-row-end-nowrap;

    .dismiss-btn {
      background: transparent !important;
      box-shadow: none !important;
      border: none !important;
    }

    .btn {
      font-size: toRem(10);

      @include breakpoint-down(xs) {
        font-size: toRem(10.25);
      }
    }
  }
}
</style>
