<template>
  <div class="participant-table mgb-2" @click="goToReportPage">
    <div class="table-body exam-table smooth-transition">

      <!-- HOVER LABEL  -->
    <div
      class="label position-absolute h-100 brand-accent-bg smooth-transition"
    ></div>

      <!-- COUNTER  -->
      <div class="column-one counter">
        <div class="count color-ash">#{{ counter }}</div>
        <div class="icon icon-status-indicator" :class="$color.getProgressBarColor(student.proctor.integrity)"></div>
      </div>

      <div class="column-two candidate">
        <div class="avatar avatar-square">
          <img
            v-lazy="student.image"
            :alt="$string.getStringInitials(student.full_name)"
            class="avatar-img"
            v-if="student.image"
          />

          <div
            class="avatar-text"
            v-else
            :class="$color.getProfileBgColor(student.full_name)"
          >
            {{ $string.getStringInitials(student.full_name) }}
          </div>
        </div>

        <!-- INFO  -->
        <div>
          <div class="title-text color-text font-weight-600">
             {{ student.full_name }}
          </div>
          <div class="meta-text color-grey-dark">{{ getSubmittedDate }}</div>
        </div>
      </div>

      <div class="column-three font-weight-600 text-value pdl-2" :class="$color.getProgressBarColor(student.quizSummaryScore)">{{ student.quizSummaryScore }}%</div>

      <div class="column-four color-grey-dark text-value pdl-2">{{ student.proctor.integrity }}%</div>

      <div class="column-five action">
        <router-link :to="{name: 'AssessmentReport', params: {id: $route.params.id, assessment_id: $route.params.assessment_id, student_id: student.id}}" class="link font-weight-600 btn-link link-no-underline ignore">
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
              white-text-bg ignore
            "
            v-if="show_more_option"
          >
            <div class="item ignore" @click="toggleProctor">Proctor Summary</div>
            <div class="item ignore" v-if="false">Give Feedback</div>
            <div class="item ignore">Clear Submission</div>
          </div>
        </div>
      </div>
    </div>

      <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_proctor_report">
        <proctor-report-modal @closeTriggered="toggleProctor" @showRejectModal="toggleRejectModal" @showReportStudentModal="toggleReportStudentModal"
        @showReportErrorModal="toggleReportErrorModal" />
      </transition>

      <transition name="fade" v-if="show_reject_modal">
        <reject-assessment-modal @closeTriggered="toggleRejectModal"  />
      </transition>

      <transition name="fade" v-if="show_report_student_modal">
        <report-student-modal @closeTriggered="toggleReportStudentModal"  />
      </transition>

      <transition name="fade" v-if="show_report_error_modal">
        <report-error-modal @closeTriggered="toggleReportErrorModal"  />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "participantExamTableBody",

  components: {
    proctorReportModal: () => import( /* webpackChunkName: 'proctorReportModal' */  "@/modules/base/modals/assessment-review/proctor-report-modal"),
    rejectAssessmentModal: () => import( /* webpackChunkName: 'rejectAssessmentModal' */  "@/modules/base/modals/assessment-review/reject-assessment-modal"),
    reportStudentModal: () => import( /* webpackChunkName: 'reportStudentModal' */  "@/modules/base/modals/assessment-review/report-student-modal"),
    reportErrorModal: () => import( /* webpackChunkName: 'reportErrorModal' */  "@/modules/base/modals/assessment-review/report-error-modal"),
  },

    props: {
    counter: Number,
    student: {
      type: Object,
      default: () => ({
        id: 1,
        full_name: "Richy Jones",
        image: "",
        proctor: "",
        quizSummaryScore: 0,
        quizSummary: {
          submit_at: "2021-09-26 18:49:57"
        },
        proctor: {
          integrity: 0
        }
      })
    }
  },

  computed: {
    getSubmittedDate() {
      let { d3, m4, y1, h01, b2, a0 } = this.$date.formatDate(this.student.quizSummary.submit_at).getAll();

      return `${d3} ${m4}, ${y1} ${h01}:${b2} ${a0}`;
    }
  },

  data: () => ({
    show_more_option: false,
    show_proctor_report: false,
    show_reject_modal: false,
    show_report_student_modal: false,
    show_report_error_modal: false,
  }),

  methods: {
    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    toggleProctor() {
      this.show_proctor_report = !this.show_proctor_report;
    },

    toggleRejectModal() {
      this.show_reject_modal = !this.show_reject_modal;
    },

    toggleReportStudentModal() {
      this.show_report_student_modal = !this.show_report_student_modal;
    },

    toggleReportErrorModal() {
      this.show_report_error_modal = !this.show_report_error_modal;
    },

    goToReportPage($event) {
     if (!$event.target.classList.contains('ignore')) this.$router.push({name: 'AssessmentReport', params: {id:this.$route.params.id, assessment_id: this.$route.params.assessment_id, student_id: this.student.id}})
    }
  },
};
</script>

<style lang="scss" scoped
</style>
