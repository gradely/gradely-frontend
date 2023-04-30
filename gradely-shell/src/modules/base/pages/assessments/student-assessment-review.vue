<template>
  <div class="student-assessment-review">
    <div class="gradely-app-container top-0">
      <!-- REVIEW BANNER  -->
      <review-banner :title="assessment_title" />

      <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 mx-auto">
        <!-- LEFT SECTION  -->
        <div class="left-section">
          <student-review-chart-card :summary="assessment_data" />
        </div>

        <!-- RIGHT SECTION  -->
        <div class="right-section">
          <div class="title-text font-weight-700 color-text mgb-20 pdt-6">
            Review Questions
          </div>

          <!-- CONTENT  -->
          <template v-if="assessment_data.questions.length">
            <student-question-card
              v-for="(question, index) in assessment_data.questions"
              :key="index"
              :counter="index + 1"
              :question="question"
              :see_score="seeScore"
              :student_info="{
                image: assessment_data.student.image,
                full_name: `${assessment_data.student.firstname} ${assessment_data.student.lastname}`,
                date: assessment_data.submit_at,
              }"
            />
          </template>

          <!-- LOADING STATE -->
          <template v-else>
            <default-question-card />
            <default-question-card />
            <default-question-card />
            <default-question-card />
          </template>
        </div>
      </div>
    </div>

    <!-- PAGE LOADER -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_page_loader">
        <page-loader />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import reviewBanner from "@/modules/base/components/assessment-review-comps/review-banner";
import studentReviewChartCard from "@/modules/base/components/assessment-review-comps/student-review-chart-card";
import studentQuestionCard from "@/modules/base/components/assessment-review-comps/student-question-card";
import defaultQuestionCard from "@/modules/base/components/assessment-review-comps/default-question-card";
import pageLoader from "@/shared/components/page-loader";

export default {
  name: "studentAssessmentReview",

  components: {
    reviewBanner,
    studentReviewChartCard,
    studentQuestionCard,
    defaultQuestionCard,
    pageLoader,
  },

  metaInfo: {
    title: "Assessment Review",
  },

  computed: {
    seeScore() {
      return this.assessment_data?.can_see_score ? true : false;
    },
  },

  data: () => ({
    assessment_title: "",
    assessment_data: {
      questions: [],
    },

    show_page_loader: true,
  }),

  mounted() {
    this.assessment_title = this.$route.query.title
      ? this.$route.query.title
      : "Title here...";

    this.fetchAssessmentDetails();
  },

  methods: {
    ...mapActions({
      getStudentAssessmentDetails: "dbAssessments/getStudentAssessmentDetails",
    }),

    fetchAssessmentDetails() {
      this.getStudentAssessmentDetails({
        homework_id: this.$route.params.assessment_id,
        child_id: this.$route.params.id,
      })
        .then((response) => {
          // console.log(response);
          if (response.code === 200) {
            this.assessment_data = response.data;
            this.assessment_title = response.data.homework_title;
          } else if (
            response.message === "Homework yet to be computed" ||
            response.code === 406
          ) {
            this.assessment_data = { questions: [], ...response.data.computed };
            this.pushAlert("Assessment report not ready", "warning");
          } else {
            this.assessment_data = { questions: [] };
            this.pushAlert("Assessment questions failed to load", "error");
          }

          this.show_page_loader = false;
        })
        .catch(() => {
          this.assessment_data = { questions: [] };
          this.pushAlert("No assessment report found!", "error");
          this.show_page_loader = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.gradely-container {
  @include flex-row-between-wrap;
  align-items: flex-start;

  .left-section {
    width: 31%;

    @include breakpoint-down(md) {
      width: 100%;
      margin-bottom: toRem(40);
    }
  }

  .right-section {
    width: 65%;

    @include breakpoint-down(lg) {
      width: 66%;
    }

    @include breakpoint-custom-down(870) {
      width: 67%;
    }

    @include breakpoint-down(md) {
      width: 100%;
    }

    .title-text {
      @include font-height(20, 28);

      @include breakpoint-down(sm) {
        @include font-height(18, 23);
      }

      @include breakpoint-down(xs) {
        @include font-height(16.25, 21);
      }
    }
  }
}
</style>
