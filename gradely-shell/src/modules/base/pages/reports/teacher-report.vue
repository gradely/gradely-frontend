<template>
  <div class="teacher-report-page">
    <!-- PAGE TITLE ROW  -->
    <div class="page-title-row smooth-animation">
      <!-- PAGE TITLE  -->
      <div class="page-title font-weight-700 color-text">Class Report</div>

      <!-- REPORT CARD BUTTON  -->
      <button
        class="btn btn-accent"
        :disabled="isSubjectAvailable"
        @click="goToReportCardApp"
        v-if="false"
      >
        Report Card
      </button>
    </div>

    <!-- SELECTION ROW  -->
    <div class="selection-row smooth-animation">
      <!-- SUBJECT CARD  -->
      <drop-select-card
        v-if="current_subject"
        title="Subject"
        :value="current_subject.name"
        card_style="mgr-10"
        @toggleCard="toggleSubjectModal"
      />

      <drop-select-card v-else title="Subject" card_style="mgr-10" disabled />

      <!-- TERM CARD  -->
      <drop-select-card
        v-if="current_subject"
        title="Term"
        :value="current_term"
        @toggleCard="toggleTermModal"
      />
    </div>

    <!-- CLASS PERFORMANCE BLOCK  -->
    <class-performance-block :performance="report_summary" />

    <!-- CLASS AGGREGATE BLOCK -->
    <class-aggregate-block
      :topics="topic_list"
      :students="student_list"
      :report="getReport"
      @selectTopic="loadStudentTopicPerformance($event)"
    />

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_subject_modal">
        <switch-subject-modal
          :pre_selected_subject="current_subject"
          @selectSubject="current_subject = $event"
          @closeTriggered="toggleSubjectModal"
        />
      </transition>

      <transition name="fade" v-if="show_term_modal">
        <switch-term-modal
          :pre_selected_term="current_term"
          @selectTerm="current_term = $event.name"
          @closeTriggered="toggleTermModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { EXTERNAL_URL } from "@/env";
import { mapActions, mapGetters } from "vuex";
import classPerformanceBlock from "@/modules/base/components/report-comps/teacher-comps/class-performance-block";
import classAggregateBlock from "@/modules/base/components/report-comps/teacher-comps/class-aggregate-block";
import dropSelectCard from "@/shared/components/drop-select-card";

export default {
  name: "teacherReportPage",

  metaInfo: {
    title: "Report",
  },

  components: {
    classPerformanceBlock,
    classAggregateBlock,
    dropSelectCard,
    switchSubjectModal: () =>
      import(
        /* webpackChunkName: "switchSubjectModal" */ "@/modules/base/modals/reports/switch-subject-modal"
      ),
    switchTermModal: () =>
      import(
        /* webpackChunkName: "switchTermModal" */ "@/modules/base/modals/reports/switch-term-modal"
      ),
  },

  computed: {
    ...mapGetters({
      getTeacherClasses: "general/getTeacherClassList",
      getTeacherSubjects: "general/getTeacherSubjectList",
      getClassSubjects: "general/getClassSubjects",
    }),

    isSubjectAvailable() {
      return this.getTeacherSubjects.length ? false : true;
    },

    watchRouteAndSubjectChange() {
      const { getTeacherSubjects } = this;
      return {
        getTeacherSubjects,
      };
    },

    getReportPayload() {
      return {
        class_id: this.$route.params.id,
        subject_id: Number(this.current_subject.subject_id),
        term: this.current_term,
      };
    },

    getReport() {
      let report = [];
      for (let key in this.class_report) {
        report.push(this.class_report[key]);
      }
      return report;
    },
  },

  data: () => ({
    current_term: "first",
    current_subject: {
      subject_id: 1,
      name: "Mathematics",
    },

    student_count: {},
    topic_performance: [],
    topic_list: [],
    student_list: [],

    report_summary: null,
    class_report: null,

    environment: process.env.NODE_ENV,
    show_subject_modal: false,
    show_term_modal: false,

    class_subjects: [],

    loading_report: false,
    loading_summary: false,
  }),

  watch: {
    class_report: {
      handler(report) {
        if (!this.loading_summary) {
          this.$bus.$emit("hide_loader");
        }
      },
      immediate: true,
    },

    report_summary: {
      handler(summary) {
        if (!this.loading_report) {
          this.$bus.$emit("hide_loader");
        }
      },
      immediate: true,
    },

    getTeacherSubjects: {
      handler() {
        if (this.getAuthType !== "teacher") return;
        this.$bus.$emit("show_loader", "Loading Report");
        this.setupQueryData();
        this.loadClassReport();
        this.loadReportSummary();
      },
      immediate: true,
    },

    $route: {
      handler(new_route, old_route) {
        if (
          new_route?.params?.id !== old_route?.params?.id &&
          this.getAuthType === "school"
        ) {
          this.$bus.$emit("show_loader", "Loading Report");
          this.getClassGeneralSubjects();
        }
        if (new_route?.query?.subject_id || new_route?.query?.term) {
          this.$bus.$emit("show_loader", "Loading Report");
          this.setupQueryData();
          this.loadClassReport();
          this.loadReportSummary();
        }
      },
      immediate: true,
    },

    getClassSubjects: {
      handler() {
        if (this.getAuthType !== "school") return;
        this.$bus.$emit("show_loader", "Loading Report");
        this.setupQueryData();
        this.loadReportSummary();
        this.loadClassReport();
      },
    },
  },

  methods: {
    ...mapActions({
      subjectPerformance: "dbReports/getClassSubjectPerformance",
      studentTopicPerformance: "dbReports/getClassTopicPerformance",
      getClassSubject: "general/getClassSubject",
      getClassReportSummary: "dbReports/getClassReportSummary",
      getClassReport: "dbReports/getClassReport",
    }),

    toggleSubjectModal() {
      this.show_subject_modal = !this.show_subject_modal;
    },

    toggleTermModal() {
      this.show_term_modal = !this.show_term_modal;
    },

    loadReportSummary() {
      if (!this.current_subject?.subject_id) {
        // this.$bus.$emit("hide_loader");
        this.report_summary = null;
        return;
      }
      this.loading_summary = true;

      this.getClassReportSummary(this.getReportPayload)
        .then((response) => {
          this.loading_summary = false;
          if (response.code === 200) {
            this.report_summary = response.data;
          } else {
            this.report_summary = null;
          }
        })
        .catch((err) => {
          this.report_summary = null;
          this.loading_summary = false;
          console.log("error fetching report summary", err);
        });
    },

    loadClassReport() {
      if (!this.current_subject?.subject_id) {
        // this.$bus.$emit("hide_loader");
        this.class_report = null;
        return;
      }

      this.loading_report = true;

      this.getClassReport(this.getReportPayload)
        .then((response) => {
          this.loading_report = false;
          if (response.code === 200) {
            this.class_report = response.data;
          } else {
            this.class_report = null;
            if (response.data.message)
              this.pushAlert(response.data.message, "warning");
          }
        })
        .catch((err) => {
          this.class_report = null;
          this.loading_report = false;
          this.pushAlert("error fetching report summary", "warning");
          console.log("error fetching report summary", err);
        });
    },

    // LOAD CLASS PERFORMANCE BY SUBJECT AND TERM
    loadClassPerformance() {
      if (this.current_subject) {
        let payload = {
          class_id: this.$route.params.id,
          term: this.current_term.toLowerCase(),
          subject_id: this.current_subject.subject_id,
        };

        this.loadStudentTopicPerformance(); //LOAD STUDENT TOPIC PERFORMANCE

        this.subjectPerformance(payload)
          .then((response) => {
            // console.log(">>>", response);
            let { studentStat, topicPerformance, topic_list } = response.data;
            this.updateState(studentStat, topicPerformance, topic_list);
          })
          .catch(() => this.updateState());
      } else {
        this.updateState();
        this.student_list = [];
      }
    },

    // SETUP STATE PAYLOAD
    updateState(student_count = {}, topic_performance = [], topic_list = []) {
      this.student_count = student_count;
      this.topic_performance = topic_performance;
      this.topic_list = topic_list;
    },

    // LOAD STUDENT PERFORMANCE BY TOPIC
    loadStudentTopicPerformance(topic_id) {
      let query_param = this.setupTopicQueryPayload(topic_id); //QUERY PARAM

      // console.log("query", query_param);

      this.studentTopicPerformance(query_param)
        .then((response) => (this.student_list = response.data))
        .catch(() => (this.student_list = []));
    },

    // SETUP TOPIC QUERY PAYLOAD
    setupTopicQueryPayload(topic_id = null) {
      let payload = {
        class_id: this.$route.params.id,
        term: this.current_term.toLowerCase(),
        subject_id: this.current_subject.subject_id,
      };

      let base_query = `?class_id=${payload.class_id}&term=${payload.term}&subject_id=${payload.subject_id}`;

      return topic_id ? `${base_query}&topic_id=${topic_id}` : `${base_query}`;
    },

    // SETUP QUERY DATA FOR SUBJECT AND TERM
    setupQueryData() {
      let current_subject_id = Number(this.$route.query.subject_id);
      let current_term = this.$route.query.term;

      // GET CURRENT SUBJECT
      this.current_subject = current_subject_id
        ? this.getSubjectDataById(current_subject_id)
        : this.getSubjectDataById();

      // GET CURRENT TERM
      this.current_term = current_term
        ? current_term
        : this.getAuthUser.term.toLowerCase();
    },

    getSubjectDataById(subject_id = null) {
      let subject_list =
        this.getAuthType === "school"
          ? this.getClassSubjects
          : this.getTeacherSubjects;
      if (subject_id)
        return subject_list.find(
          (item) => Number(item.subject_id) === subject_id
        );
      else if (subject_list.length) return subject_list[0];
      else return false;
    },

    getClassGeneralSubjects() {
      let class_id = Number(this.$route.params.id);
      this.getClassSubject(class_id).then(({ code, data }) => {
        if (code === 200) this.class_subjects = data;
      });
    },

    // ACCESS REPORT CARD APP
    goToReportCardApp() {
      if (this.getTeacherSubjects.length) {
        let report_card_route = `/teacher/select-assessment/${this.$route.params.id}?subject_id=${this.current_subject}&term=${this.current_term}`;

        // REDIRECT
        location.href = EXTERNAL_URL("report-card", report_card_route);
      } else
        this.$bus.$emit("show_response_alert", {
          message: "No subject assigned to this class!",
          type: "error",
        });
    },
  },
};
</script>1

<style lang="scss" scoped>
.teacher-report-page {
  .page-title-row {
    @include flex-row-between-nowrap;
    margin-bottom: toRem(30);

    .page-title {
      @include font-height(19, 21);

      @include breakpoint-down(lg) {
        @include font-height(17, 18);
      }

      @include breakpoint-down(sm) {
        @include font-height(16, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(15.5, 16);
      }
    }

    .btn {
      padding: toRem(11) toRem(26);
      font-size: toRem(11);
      font-weight: 600 !important;

      @include breakpoint-down(sm) {
        font-size: toRem(10.5);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(10.25);
      }
    }
  }

  .selection-row {
    @include flex-row-start-wrap;
    margin-bottom: toRem(18);

    .selection {
      @include flex-row-start-nowrap;
      background: $white-text;
      padding: toRem(8) toRem(15);
      border-radius: toRem(7);
      cursor: pointer;
      @include transition(0.4s);

      @include breakpoint-down(lg) {
        padding: toRem(7) toRem(14);
      }

      @include breakpoint-down(sm) {
        padding: toRem(6) toRem(13);
      }

      &:hover {
        background: $brand-inverse-light;
      }

      &:first-of-type {
        margin-right: toRem(14);

        @include breakpoint-down(sm) {
          margin-right: toRem(10);
        }
      }

      .text {
        @include font-height(12.75, 16);
        margin-right: toRem(5);
        color: $brand-navy;

        @include breakpoint-down(lg) {
          @include font-height(12, 15);
        }

        @include breakpoint-down(sm) {
          @include font-height(11.5, 15);
        }
      }

      .avatar {
        right: toRem(-7);
        @include square-shape(22);
        .icon {
          @include center-placement;
          font-size: toRem(10);
          color: $color-grey-dark;
        }
      }
    }
  }
}
</style>
