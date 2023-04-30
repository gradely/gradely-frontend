<template>
  <div class="assessment-grade-review">
    <!-- GRADE TOP INFO  -->
    <grade-top-info :assessment="assessment_data" :students="students" />

    <!-- TOP SELECTION SECTION -->
    <grade-top-selection :students="students" />

    <!-- GRADE REVIEW BLOCK  -->
    <grade-review-section
      v-if="getQuestions.length"
      :quiz_id="assessment_data.quiz_id"
      :assessment="getQuestions"
    />

    <transition name="fade" v-if="show_page_loader">
      <page-loader />
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import pageLoader from "@/shared/components/page-loader";
import gradeTopInfo from "@/modules/base/components/grade-review-comps/grade-top-info";
import gradeTopSelection from "@/modules/base/components/grade-review-comps/grade-top-selection";
import gradeReviewSection from "@/modules/base/components/grade-review-comps/grade-review-section";

export default {
  name: "assessmentGradeReview",

  components: {
    gradeTopInfo,
    gradeTopSelection,
    gradeReviewSection,
    pageLoader,
  },

  computed: {
    getQuestions() {
      let data_set = this.assessment_data?.questions || [];
      return data_set?.filter((item) => ["essay"].includes(item.type));
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
          this.show_page_loader = false;

          console.log("Assessment/students", response);

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
          console.log("Details", response);

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

<style lang="scss" scoped></style>
