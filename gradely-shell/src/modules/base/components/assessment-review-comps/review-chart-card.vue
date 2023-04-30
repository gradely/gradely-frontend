<template>
  <div class="review-chart-card white-text-bg rounded-10">
    <!-- EMPTY REPORT OVERLAY -->
    <div
      class="score-overlay"
      v-if="summary.ungraded_count && summary.has_essay"
    >
      <div class="icon-wrapper mgb-20">
        <img
          v-lazy="mxStaticImg('empty-report-icon.png')"
          alt="empty"
          class="report-icon"
        />
      </div>

      <div class="text-content text-center color-ash mgb-20">
        Assessment report is not ready. Grade the outstanding questions to see
        full report.
      </div>

      <router-link
        :to="{
          name: 'AssessmentGradeReview',
          params: {
            assessment_id: $route.params.assessment_id,
            student_id: student_id,
          },
        }"
      >
        <button class="btn btn-sm btn-accent mx-auto">Grade Questions</button>
      </router-link>
    </div>

    <chart-column
      :student_performance="getStudentPerformance"
      :show_total="false"
      show_advanced_options
      :average_score="summary.average"
      report
      v-else
    />

    <!-- CHART INFO  -->
    <div class="chart-info">
      <div class="column d-flex flex-column align-items-center">
        <div class="value">
          <template v-if="$route.query.tour || isTourAssessment">
            {{ tour_students.length }}/{{ tour_students.length }}
          </template>

          <template v-else>
            {{ summary.submitted_students ? summary.submitted_students : 0 }}/{{
              summary.expected_students ? summary.expected_students : 0
            }}
          </template>
        </div>
        <div class="title">SUBMITTED</div>
      </div>

      <div class="column d-flex flex-column align-items-center">
        <div class="value">
          <template v-if="$route.query.tour || isTourAssessment">
            100%
          </template>

          <template v-else>
            {{
              summary.submitted_students
                ? summary.completion_rate
                  ? summary.completion_rate
                  : 0
                : 0
            }}%
          </template>
        </div>
        <div class="title">COMPLETION RATE</div>
      </div>
    </div>

    <!-- GRADED BLOCK  -->
    <div
      class="graded-block rounded-10 mgt-20 color-white-bg"
      v-if="summary.has_essay"
    >
      <!-- TOP TEXT  -->
      <div class="top-text" v-if="summary.ungraded_count">
        You have
        <span class="font-weight-600">{{ summary.ungraded_count }}</span>
        ungraded question.
      </div>

      <div class="top-text" v-else>All questions graded</div>

      <!-- BOTTOM TEXT  -->
      <router-link
        :to="{
          name: 'AssessmentGradeReview',
          params: {
            assessment_id: $route.params.assessment_id,
            student_id: student_id,
          },
        }"
        class="bottom-text"
      >
        <div class="btn-link font-weight-600 mgr-12">
          {{ summary.ungraded_count ? "Grade Questions Now" : "Review Grades" }}
        </div>

        <div class="avatar brand-accent-bg">
          <div class="icon icon-caret-right white-text"></div>
        </div>
      </router-link>
    </div>

    <!-- RELEASE / RECALL RESULT -->
    <div
      class="release-button mgt-20 position-relative"
      style="top: 5px"
      v-if="getAuthType === 'school' && summary.tag === 'exam'"
    >
      <button
        class="btn btn-soft-accent btn-block"
        ref="releaseBtn"
        @click="toggleReleaseResult"
      >
        {{ summary.can_see_score ? "Recall" : "Release" }} Student Result
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import chartColumn from "@/modules/base/components/report-comps/teacher-comps/chart-column";
import STUDENTS from "@/store/general/students";

export default {
  name: "reviewChartCard",

  components: {
    chartColumn,
  },

  props: {
    summary: {
      type: Object,
      default() {
        return {
          average: 0,
          expected_students: 0,
          submitted_students: 0,
          struggling_students: 0,
          average_students: 0,
          excellent_students: 0,
          due_date: "2021-10-03 18:27:00",
          open_date: "2021-10-03 18:27:00",
          duration: null,
          can_start: 0,
          can_see_score: 0,
        };
      },
    },

    student_id: {
      type: [String, Number],
      default: 5199,
    },
  },

  computed: {
    getDueDate() {
      if (!this.summary?.due_date) return "";
      let { d3, m4, y1, h01, b2, a0 } = this.$date
        .formatDate(this.summary?.due_date)
        .getAll();

      return `${d3} ${m4}, ${y1} ${h01}:${b2} ${a0}`;
    },

    sumUpStudents() {
      if (!this.summary) return 0;
      return (
        this.summary.excellent_students +
        this.summary.average_students +
        this.summary.struggling_students
      );
    },

    getStudentPerformance() {
      if (!this.summary)
        return {
          excelling: 0,
          average: 0,
          struggling: 0,
        };
      return {
        excelling: this.summary?.excellent_students ?? 0,
        average: this.summary?.average_students ?? 0,
        struggling: this.summary?.struggling_students ?? 0,
      };
    },

    isTourAssessment() {
      let tour_titles = [
        "Gradely Tour",
        "Gradely Tour Session",
        "Gradely Class Tour",
        "Class Tour",
        "Gradely LMS Tour",
      ];

      return tour_titles.includes(this.$route.query?.title) ? true : false;
    },
  },

  watch: {
    summary(value) {
      // console.log("SUMMARY", value);
    },
  },

  data: () => ({
    student_count: {
      studentsCount: 10,
      excellence: 4,
      average: 4,
      struggling: 0,
    },

    tour_students: STUDENTS,
  }),

  methods: {
    ...mapActions({
      approveOrDeclineExam: "dbAssessments/approveOrDeclineExam",
    }),

    toggleReleaseResult() {
      this.handleClick(
        "releaseBtn",
        this.summary?.can_see_score
          ? "Recalling result..."
          : "Releasing result..."
      );

      let payload = {
        homework_id: this.$route.params.assessment_id,
        assessment_info: {
          status: 1,
          open_date: this.summary?.open_date,
          close_date: this.summary?.due_date,
          duration: this.summary?.duration,
          can_start: this.summary?.can_start,
          can_see_score: this.summary?.can_see_score ? 0 : 1,
          can_see_answer: this.summary?.can_see_score ? 0 : 1,
        },
      };

      this.approveOrDeclineExam(payload)
        .then((response) => {
          this.handleClick(
            "releaseBtn",
            this.summary?.can_see_score ? "Result recalled" : "Result released",
            false
          );

          if (response.code === 200) {
            this.pushAlert(
              this.summary?.can_see_score
                ? "Exam recalled successfully!"
                : "Exam released successfully!",
              "success"
            );

            setTimeout(() => {
              location.reload();

              this.handleClick(
                "releaseBtn",
                this.summary?.can_see_score
                  ? "Release student exam"
                  : "Recall student exam",
                false
              );
            }, 2000);
          } else {
            this.pushAlert(
              this.summary?.can_see_score
                ? "Recalling exam failed!"
                : "Releasing exam failed!",
              "warning"
            );
          }
        })
        .catch(() => {
          this.handleClick(
            "releaseBtn",
            this.summary?.can_see_score
              ? "Recall student exam"
              : "Release student exam",
            false
          );

          this.pushAlert(
            this.summary?.can_see_score
              ? "Recalling exam failed!"
              : "Releasing exam failed!",
            "error"
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.review-chart-card {
  box-shadow: 0 toRem(1) toRem(4) rgba($black-text, 0.15);
  padding: toRem(35) toRem(40);

  @include breakpoint-down(lg) {
    padding: toRem(28) toRem(30);
  }

  @include breakpoint-custom-down(870) {
    padding: toRem(20);
  }

  @include breakpoint-down(md) {
    padding: toRem(28) toRem(30);
  }

  @include breakpoint-down(xs) {
    padding: toRem(20);
  }

  @include breakpoint-custom-down(460) {
    padding: toRem(20) toRem(13);
  }

  .chart-info {
    @include flex-row-between-nowrap;
    align-items: flex-start;
    margin-top: toRem(36);

    .column {
      .value {
        @include font-height(13, 18);
        margin-bottom: toRem(4);
        font-weight: 600;
        color: $color-text;
        text-align: right;

        @include breakpoint-down(xs) {
          @include font-height(12.5, 17);
        }
      }

      .title {
        @include font-height(10.75, 14);
        color: $color-grey-dark;

        @include breakpoint-down(xs) {
          @include font-height(10.5, 13);
        }
      }
    }
  }

  .graded-block {
    padding: toRem(15);
    margin-left: -5%;
    width: 110%;

    @include breakpoint-down(md) {
      margin-left: unset;
      width: 100%;
    }

    @include breakpoint-down(xs) {
      padding: toRem(13);
    }

    .top-text {
      @include font-height(12.75, 19);
      margin-bottom: toRem(5);

      @include breakpoint-down(xs) {
        @include font-height(12.5, 18);
      }

      @include breakpoint-custom-down(360) {
        @include font-height(11.75, 18);
      }
    }

    .bottom-text {
      @include flex-row-start-nowrap;
      @include font-height(13, 19);
      width: max-content;

      @include breakpoint-down(xs) {
        @include font-height(12.5, 19);
      }

      @include breakpoint-custom-down(360) {
        @include font-height(11.75, 18);
      }

      .avatar {
        @include square-shape(18);
        @include transition(0.175s);

        @include breakpoint-custom-down(360) {
          @include square-shape(16);
        }

        .icon {
          @include center-placement;
          font-size: toRem(9);

          @include breakpoint-custom-down(360) {
            font-size: toRem(6);
          }
        }
      }

      &:hover {
        .avatar {
          background: $brand-inverse !important;
        }
      }
    }
  }

  .release-button {
    @include flex-row-center-nowrap;

    .btn {
      font-size: toRem(10.75);
      width: 100%;
    }
  }

  .score-overlay {
    width: 100%;
    background: #ffffff;

    .icon-wrapper {
      margin: auto;
      @include square-shape(70);
      background: $brand-navy;
      border-radius: 50%;
      position: relative;

      .report-icon {
        @include center-placement;
        @include square-shape(45);
      }
    }

    .text-content {
      @include font-height(12.75, 22);
    }
  }
}
</style>
