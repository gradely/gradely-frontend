<template>
  <div class="assessment-student-report">
    <!-- REPORT TOP  -->
    <student-report-top :assessment="assessment_data" :students="students" />

    <!-- REPORT BOTTOM  -->
    <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 mx-auto">
      <div class="report-bottom">
        <!-- LEFT SECTION  -->
        <div class="left-section">
          <report-chart-block :assessment="assessment_data" />
        </div>

        <!-- RIGHT SECTION  -->
        <div class="right-section">
          <review-wrapper title_text="Questions Answered">
            <template slot="content">
              <!-- CONTENT -->
              <template v-if="getQuestions.length">
                <template v-for="(question, index) in getQuestions">
                  <!-- THEORY QUESTION -->
                  <question-answer-card
                    :key="index"
                    :counter="index + 1"
                    :question="question"
                    :student_info="{
                      image: assessment_data.student_image,
                      full_name: assessment_data.student_name,
                      date: assessment_data.datetime,
                    }"
                    v-if="question.type === 'essay'"
                  />

                  <!-- NON THEORY QUESTION -->
                  <student-question-card
                    :key="'x' + index"
                    :counter="index + 1"
                    :question="question"
                    :student_info="{
                      image: assessment_data.student_image,
                      full_name: assessment_data.student_name,
                      date: assessment_data.datetime,
                    }"
                    v-else
                  />
                </template>
              </template>

              <!-- DEFAULT STATE -->
              <template v-else>
                <default-question-card />
                <default-question-card />
                <default-question-card />
              </template>
            </template>
          </review-wrapper>
        </div>
      </div>
    </div>

    <!-- PAGE LOADER -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_page_loader">
        <page-loader loading_text="Loading Report" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import studentReportTop from "@/modules/base/components/student-report-comps/student-report-top";
import reviewWrapper from "@/modules/base/components/assessment-review-comps/review-wrapper";
import reportChartBlock from "@/modules/base/components/student-report-comps/report-chart-block";
import questionAnswerCard from "@/modules/base/components/student-report-comps/question-answer-card";
import studentQuestionCard from "@/modules/base/components/assessment-review-comps/student-question-card";
import defaultQuestionCard from "@/modules/base/components/assessment-review-comps/default-question-card";
import pageLoader from "@/shared/components/page-loader";

export default {
  name: "assessmentStudentReport",

  metaInfo: {
    title: "Student Report",
  },

  components: {
    studentReportTop,
    reviewWrapper,
    reportChartBlock,
    questionAnswerCard,
    studentQuestionCard,
    defaultQuestionCard,
    pageLoader,
  },

  computed: {
    getQuestions() {
      return this.assessment_data?.questions || [];
    },
  },

  watch: {
    $route: {
      handler() {
        this.show_page_loader = true;
        this.loadStudentAssessmentReport();
      },
      immediate: true,
    },
  },

  data: () => ({
    students: [],
    assessment_data: {},
    show_page_loader: true,
  }),

  mounted() {
    this.fetchParticipants();
  },

  methods: {
    ...mapActions({
      getAssessmentDetails: "dbAssessments/getAssessmentDetails",
      getAssessmentReport: "dbAssessments/getAssessmentReport",
    }),

    fetchParticipants() {
      this.students = [];

      let payload = {
        homework_id: this.$route.params.assessment_id,
        type: "student",
      };

      this.getAssessmentDetails(payload)
        .then((response) => {
          response.code === 200
            ? (this.students = response.data)
            : this.pushAlert("Failed to get assessment participants", "error");
        })
        .catch(() => {
          this.pushAlert("Failed to get assessment participants", "error");
        });
    },

    // LOAD CURRENT STUDENT ASSESSMENT REPORT
    loadStudentAssessmentReport() {
      let payload = {
        student_id: this.$route.params.student_id,
        assessment_id: this.$route.params.assessment_id,
      };

      this.getAssessmentReport(payload)
        .then((response) => {
          this.show_page_loader = false;
          // console.log(response);

          if (response.code === 200) this.assessment_data = response.data;
          else
            this.pushAlert("Failed to get student assessment report", "error");
        })
        .catch(() => {
          this.pushAlert("Failed to get student assessment report", "error");
          this.show_page_loader = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.assessment-student-report {
  .report-bottom {
    @include flex-row-between-wrap;
    align-items: flex-start;
    margin-bottom: toRem(40);

    .left-section {
      width: 34%;

      @include breakpoint-down(lg) {
        width: 35%;
      }

      @include breakpoint-down(md) {
        margin-bottom: toRem(40);
        width: 100%;
      }
    }

    .right-section {
      width: 60%;

      @include breakpoint-down(xl) {
        width: 62%;
      }

      @include breakpoint-down(lg) {
        width: 63%;
      }

      @include breakpoint-down(md) {
        width: 100%;
      }
    }
  }
}
</style>
