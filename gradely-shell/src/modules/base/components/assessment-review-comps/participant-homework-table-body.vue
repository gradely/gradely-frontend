<template>
  <div class="participant-table mgb-2" @click="goToReportPage">
    <div class="table-body homework-table">
      <!-- HOVER LABEL  -->
      <div
        class="label position-absolute h-100 brand-accent-bg smooth-transition"
      ></div>

      <!-- COUNTER  -->
      <div class="column-one counter">
        <div class="count color-ash">#{{ counter }}</div>
      </div>

      <div class="column-two candidate">
        <div class="avatar avatar-square">
          <img
            v-lazy="student.image"
            :alt="
              $string.getStringInitials(
                `${this.student.lastname} ${this.student.firstname}`
              )
            "
            class="avatar-img"
            v-if="student.image"
          />

          <div
            class="avatar-text"
            v-else
            :class="
              $color.getProfileBgColor(
                `${this.student.lastname} ${this.student.firstname}`
              )
            "
          >
            {{
              $string.getStringInitials(
                `${this.student.lastname} ${this.student.firstname}`
              )
            }}
          </div>
        </div>

        <!-- INFO  -->
        <div>
          <div class="title-text color-text font-weight-600">
            {{
              $string.getCapitalizeText(
                `${this.student.lastname} ${this.student.firstname}`
              )
            }}
          </div>
          <div class="meta-text color-grey-dark">{{ getSubmittedDate }}</div>
        </div>
      </div>

      <div
        class="column-three font-weight-500 text-value pdl-2"
        :class="
          isComputed
            ? $color.getProgressBarColor(getStudentScore)
            : 'color-grey-dark'
        "
      >
        <template v-if="$route.query.tour || isTourAssessment">
          {{ getStudentScore }}%
        </template>

        <template v-else>
          <template v-if="isComputed"> {{ getStudentScore }}% </template>

          <template v-else
            ><router-link :to="{ path: gradeReviewLink }"
              >Grade now</router-link
            ></template
          >
        </template>
      </div>

      <div class="column-four action">
        <template v-if="$route.query.tour || isTourAssessment">
          <div class="link font-weight-600 border-grey">Tour Report</div>
        </template>

        <template v-else>
          <router-link
            :to="{
              name: 'AssessmentReport',
              params: {
                id: $route.params.id,
                assessment_id: $route.params.assessment_id,
                student_id: student.id,
              },
            }"
            class="link font-weight-600 btn-link link-no-underline ignore"
          >
            View Report
          </router-link>

          <div
            class="avatar avatar-square pointer ignore"
            @click="toggleOptions"
            v-on-clickaway="hideOptions"
          >
            <div class="icon icon-ellipsis-h border-grey-dark ignore"></div>

            <!-- DROPDOWN  -->
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
              <div class="item ignore" v-if="false">Give Feedback</div>
              <div class="item ignore" @click="toggleClearSubmission">
                Clear Submission
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_clear_submission">
        <clear-assessment-submission
          @closeTriggered="toggleClearSubmission"
          @cleared="redirect"
          :student_id="student.id"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import clearAssessmentSubmission from "@/modules/base/modals/assessments/clear-assessment-submission";

export default {
  name: "participantHomeworkTableBody",

  components: {
    clearAssessmentSubmission,
  },

  props: {
    counts: Number,
    counter: Number,
    student: {
      type: Object,
      default: () => ({
        id: 1,
        full_name: "Richy Jones",
        image: "",
        is_graded: 0,
        proctor: "",
        quizSummaryScore: 0,
        quizSummary: {
          submit_at: "2021-09-26 18:49:57",
        },
      }),
    },
  },

  computed: {
    getSubmittedDate() {
      let { d3, m4, y1, h01, b2, a0 } = this.$date
        .formatDate(this.student.submit_at)
        .getAll();

      return `${d3} ${m4}, ${y1} ${h01}:${b2} ${a0}`;

      // return format(new Date(this.student.submit_at), "do MMM, yyyy hh:mm aa" )
    },

    getStudentScore() {
      // console.log("Student data", this.student);
      if (!this.student.is_graded) return "——";
      return this.student.score;
    },

    getScoreNumbers() {
      if (this.student.is_graded)
        return `(${this.student.total_attempts_score}/${this.student.total_score})`;
      else return;
    },

    isComputed() {
      return this.student?.is_computed || this.student?.is_graded
        ? true
        : false;
    },

    gradeReviewLink() {
      let { id, assessment_id } = this.$route.params;
      return `/assessment/grade-review/${id}/${assessment_id}/${this.student.id}`;
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

  data: () => ({
    show_more_option: false,
    show_clear_submission: false,
  }),

  methods: {
    redirect() {
      if (this.counts === 1) this.$router.push({ path: "/" });
    },

    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    toggleClearSubmission() {
      this.show_clear_submission = !this.show_clear_submission;
    },

    goToReportPage($event) {
      if (this.$route.query.title || this.isTourAssessment) return null;

      if (!$event.target.classList.contains("ignore"))
        this.$router.push({
          name: "AssessmentReport",
          params: {
            id: this.$route.params.id,
            assessment_id: this.$route.params.assessment_id,
            student_id: this.student.id,
          },
        });
    },
  },
};
</script>

<style lang="scss" scoped
</style>
