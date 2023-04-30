<template>
  <div class="user-report-page smooth-animation">
    <exam-selection-top-row v-if="in_exam_mode" />
    <selection-top-row report v-else />

    <!-- PERFORMANCE SUMMARY  -->
    <profile-block title="Performance Summary">
      <!-- PERFORMANCE DATA  -->
      <template slot="content">
        <performance-block :student="student_info" />
      </template>
    </profile-block>

    <!-- TOPIC BREAKDOWN  -->
    <profile-block title="Topic Breakdown" v-if="checkIfTopicsExist">
      <template slot="content">
        <breakdown-block :topics="student_info.topic_breakdown" />
      </template>
    </profile-block>

    <!-- ACTIVITIES  -->
    <profile-block title="My Activities" v-if="checkIfActivities">
      <template slot="content">
        <profile-activity-block :activity="student_info.activities" />
      </template>
    </profile-block>

    <!-- REMARKS  -->
    <profile-block
      title="Teacher's Remark"
      id="remark-block"
      v-if="checkIfRemarksExist"
    >
      <template slot="content">
        <!-- REMARK INPUT  -->
        <remark-input
          v-if="false"
          :subject="getCurrentSubject"
          @updateRemark="addNewRemark($event)"
        />

        <remark-view
          v-for="(remark, index) in remarks"
          :key="index"
          :remark="remark"
          :subject="remark.subject"
        />
      </template>
    </profile-block>

    <!-- PAGE LOADER -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_page_loader">
        <page-loader />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import selectionTopRow from "@/modules/profile/components/student-profile-comps/selection-top-row";
import examSelectionTopRow from "@/modules/profile/components/student-profile-comps/exam-selection-top-row";
import profileBlock from "@/modules/profile/components/student-profile-comps/profile-block";
import performanceBlock from "@/modules/profile/components/student-profile-comps/performance-block";
import emptyPerformanceState from "@/modules/base/components/report-comps/teacher-comps/empty-performance-state";
import pageLoader from "@/shared/components/page-loader";

export default {
  name: "userReport",

  components: {
    selectionTopRow,
    examSelectionTopRow,
    profileBlock,
    performanceBlock,
    pageLoader,
    emptyPerformanceState,
    breakdownBlock: () =>
      import(
        /* webpackChunkName: "breakdownBlock" */ "@/modules/profile/components/student-profile-comps/breakdown-block"
      ),
    profileActivityBlock: () =>
      import(
        /* webpackChunkName: "profileActivityBlock" */ "@/modules/profile/components/student-profile-comps/profile-activity-block"
      ),
    remarkView: () =>
      import(
        /* webpackChunkName: "remarkView" */ "@/modules/profile/components/student-profile-comps/remark-view"
      ),
    remarkInput: () =>
      import(
        /* webpackChunkName: "remarkInput" */ "@/modules/profile/components/student-profile-comps/remark-input"
      ),
  },

  computed: {
    ...mapGetters({
      getStudentReport: "dbReports/getStudentReport",
      getStudentReportSubjects: "dbReports/getStudentReportSubjects",
      getNewStudentReport: "dbReports/getNewStudentReport",
      getExamList: "general/getExamList",
      getExamSubjectList: "general/getExamSubjectList",
    }),

    checkIfTopicsExist() {
      return this.student_info?.topic_breakdown?.length;
    },

    checkIfActivities() {
      return this.student_info?.activities?.list?.length ? true : false;
    },

    checkIfRemarksExist() {
      return this.remarks?.length &&
        ["student", "parent"].includes(this.getAuthType)
        ? true
        : false;
    },

    getCurrentSubject() {
      if (
        !this.$route?.query?.subject ||
        !this.getStudentReportSubjects?.length
      )
        return;
      return this.getStudentReportSubjects.find((subject) => {
        return Number(subject.id) === Number(this.$route?.query?.subject);
      });
    },

    in_exam_mode() {
      return false;
      // return this.getCatchupMode === "exam";
    },

    getReportPayload() {
      return {
        subject: this.$route.query.subject,
        term: this.$route.query.term,
        mode: "practice",
        student_id: this.getAuthType === "parent" ? this.$route.params.id : "",
      };
    },
  },

  watch: {
    $route: {
      handler(new_route, old_route) {
        if (new_route.params.id !== old_route.params.id) {
          this.show_page_loader = true;
          this.resetQueries();
          this.fetchStudentReportSubjects(this.$route.params.id);
        }
        this.fetchStudentProfile();
      },
    },

    getStudentReportSubjects: {
      handler(subjects) {
        if (subjects && this.$route.query.subject != subjects[0].id)
          this.$router.push({
            name: "GradelyUserReport",
            query: {
              term: "first",
              subject: subjects[0].id,
            },
          });
        if (!subjects?.length) this.resetStudentInfo();
      },
    },
  },

  created() {
    this.$bus.$on("modeUpdated", () => {
      this.show_page_loader = true;

      Object.keys(this.$route.query).length
        ? this.resetQueries()
        : this.setUpData();
    });

    this.$bus.$on("updated-remark", (update) => {
      this.remarks = this.remarks.map((remark) => {
        if (update.id === remark.id) {
          return update;
        } else return remark;
      });
    });

    this.$bus.$on("remark-deleted", (update) => {
      this.remarks = this.remarks.filter((remark) => {
        return remark.id !== update.id;
      });
    });
  },

  mounted() {
    this.getAuthType === "parent"
      ? this.fetchStudentReportSubjects(this.$route.params.id)
      : this.fetchStudentReportSubjects();
    this.fetchStudentProfile();
  },

  data() {
    return {
      show_page_loader: false,
      student_info: {
        student: {
          lastname: "My",
          firstname: "Student",
          image: "",
          code: "",
          parents: [],
        },
        performance: {},
        topic_breakdown: [],
        remarks: [],
        posts: [],
        activities: {
          list: [],
        },
      },
      remarks: [],
    };
  },

  methods: {
    ...mapActions({
      getStudentProfileReport: "dbReports/getStudentReport",
      fetchStudentReportSubjects: "dbReports/getStudentReportSubjects",
      fetchStudentReport: "dbReports/getNewStudentReport",
      getExam: "general/getExamList",
      getExamSubject: "general/getExamSubjectList",
    }),

    resetQueries() {
      if (!this.$route.query.term && !this.$route.query.subject) return;
      this.$router.push({
        name: this.$router.currentRoute.name,
        params: { id: this.$route.params.id },
        query: {},
      });
    },

    resetStudentInfo() {
      this.student_info = {
        student: {
          lastname: "My",
          firstname: "Student",
          image: "",
          code: "",
          parents: [],
        },
        performance: {},
        topic_breakdown: [],
        remarks: [],
        posts: [],
        activities: {
          list: [],
        },
      };
      this.remarks = [];
    },

    addNewRemark(remark) {
      this.student_info?.remarks?.length
        ? this.remarks.splice(0, 0, remark)
        : (this.remarks = [remark]);
      const remark_block = document.querySelector("#remark-block");
      remark_block.scrollIntoView();
    },

    // FETCH STUDENT PROFILE
    fetchStudentProfile() {
      let payload = {
        mode: "practice",
        subject: this.$route.query.subject,
        term: this.$route.query.term,
        student_id: this.getAuthType === "parent" ? this.$route.params.id : "",
      };

      if (!this.$route.query.subject || !this.$route.query.term) {
        this.show_page_loader = false;
        return;
      }

      this.show_page_loader = true;

      this.fetchStudentReport(payload)
        .then((response) => {
          this.show_page_loader = false;
          if (response.code === 200) {
            if (!response.data?.performance?.total) {
              this.student_info = response.data;
              this.remarks = response.data.remarks;
              this.pushAlert(
                "No performance report for this student",
                "warning"
              );
              // let path = localStorage.getItem("previous-page");
              // setTimeout(() => {
              //   this.$router.push({ path });
              // }, 1100);
            } else {
              this.student_info = response.data;
              this.remarks = response.data.remarks;
            }
          }
        })
        .catch(() => {
          this.show_page_loader = false;
          this.student_info = {};
          this.remarks = [];
        });
    },

    async fetchExamList() {
      await this.getExam();
    },

    async fetchSubjectList() {
      await this.getExamSubject();
    },

    setUpData() {
      if (!this.getExamList && this.in_exam_mode) this.fetchExamList();
      if (!this.getExamSubjectList && this.in_exam_mode)
        this.fetchSubjectList();

      this.fetchStudentProfile();
    },
  },
};
</script>

<style lang="scss" scoped></style>
