<template>
  <div class="student-profile-page">
    <div class="gradely-app-container topnav-base-offset">
      <div
        class="
          gradely-container
          px-2 px-sm-3 px-md-4 px-xl-5
          mx-auto
          smooth-animation
        "
      >
        <!-- PROFILE SECTIONS  -->
        <div class="profile-sections">
          <!-- LEFT SECTION  -->
          <div class="left-section">
            <student-profile-card :student="student_info" />
          </div>

          <!-- RIGHT SECTION  -->
          <div class="right-section">
            <!-- SELECTION ROW  -->
            <selection-top-row />

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

            <!-- POSTS  -->
            <profile-block
              title="Posts"
              :show_more="false"
              v-if="checkIfPPostsExist"
            >
              <template slot="content">
                <post-card-block :posts="student_info.posts" />
              </template>
            </profile-block>

            <!-- ACTIVITIES  -->
            <profile-block title="My Activities" v-if="checkIfActivities">
              <template slot="content">
                <profile-activity-block :activity="student_info.activities" />
              </template>
            </profile-block>

            <!-- ACTIVITIES  -->
            <profile-block title="Assessments" v-if="false">
              <!-- EXTRA -->
              <template slot="extra">
                <!-- COMPLETION BLOCK -->
                <div class="completion-block">
                  <div class="text color-grey-dark">
                    Completion Rate: {{ getCompletionRate }}%
                  </div>
                  <div class="completion-rate rounded-5">
                    <div
                      class="progress h-100"
                      :class="
                        $color.getProgressBarColor(getCompletionRate) + '-bg'
                      "
                      :style="'width: ' + getCompletionRate + '%'"
                    ></div>
                  </div>
                </div>
              </template>

              <template slot="content">
                <student-assessment-block
                  :assessments="student_info.homework"
                />
              </template>
            </profile-block>

            <!-- REMARKS  -->
            <profile-block
              title="Teacher's Remark"
              id="remark-block"
              v-if="showRemarkLengthForNonTeacher"
            >
              <template slot="content">
                <!-- REMARK INPUT -->
                <remark-input
                  v-if="getAuthType === 'teacher'"
                  :subject="getCurrentSubject"
                  @updateRemark="addNewRemark($event)"
                />

                <template v-if="checkIfRemarksExist">
                  <remark-view
                    v-for="(remark, index) in remarks"
                    :key="index"
                    :remark="remark"
                    :subject="remark.subject"
                  />
                </template>
              </template>
            </profile-block>
          </div>
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
import { mapActions, mapGetters } from "vuex";
import studentProfileCard from "@/modules/profile/components/student-profile-comps/student-profile-card";

export default {
  name: "studentProfilePage",

  components: {
    studentProfileCard,
    selectionTopRow: () =>
      import(
        /* webpackChunkName: "studentProfile" */ "@/modules/profile/components/student-profile-comps/selection-top-row"
      ),
    profileBlock: () =>
      import(
        /* webpackChunkName: "studentProfile" */ "@/modules/profile/components/student-profile-comps/profile-block"
      ),
    performanceBlock: () =>
      import(
        /* webpackChunkName: "studentProfile" */ "@/modules/profile/components/student-profile-comps/performance-block"
      ),
    pageLoader: () =>
      import(
        /* webpackChunkName: "pageLoader" */ "@/shared/components/page-loader"
      ),
    breakdownBlock: () =>
      import(
        /* webpackChunkName: "studentProfile" */ "@/modules/profile/components/student-profile-comps/breakdown-block"
      ),
    postCardBlock: () =>
      import(
        /* webpackChunkName: "studentProfile" */ "@/modules/profile/components/student-profile-comps/post-card-block"
      ),
    profileActivityBlock: () =>
      import(
        /* webpackChunkName: "studentProfile" */ "@/modules/profile/components/student-profile-comps/profile-activity-block"
      ),
    studentAssessmentBlock: () =>
      import(
        /* webpackChunkName: "studentProfile" */ "@/modules/profile/components/student-profile-comps/student-assessment-block"
      ),
    remarkView: () =>
      import(
        /* webpackChunkName: "studentProfile" */ "@/modules/profile/components/student-profile-comps/remark-view"
      ),
    remarkInput: () =>
      import(
        /* webpackChunkName: "studentProfile" */ "@/modules/profile/components/student-profile-comps/remark-input"
      ),
  },

  computed: {
    ...mapGetters({
      getStudentReportSubjects: "dbReports/getStudentReportSubjects",
      getNewStudentReport: "dbReports/getNewStudentReport",
    }),

    checkIfTopicsExist() {
      return this.student_info?.topic_breakdown?.length;
    },

    checkIfPPostsExist() {
      return this.student_info?.posts?.length ? true : false;
    },

    checkIfActivities() {
      return this.student_info?.activities?.list?.length ? true : false;
    },

    checkIfHomeworkExist() {
      if (Object.keys(this.student_info).length)
        return this.student_info?.homework?.length ? true : false;
      else return false;
    },

    checkIfRemarksExist() {
      return this.remarks?.length ? true : false;
    },

    showRemarkLengthForNonTeacher() {
      return this.getAuthType !== "teacher" && !this.checkIfRemarksExist
        ? false
        : true;
    },

    getCompletionRate() {
      return Object.keys(this.student_info).length
        ? this.student_info?.completion_rate
        : 0;
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
  },

  // beforeRouteEnter(to, from, next) {
  //   next(() => {
  //     if (from.fullPath !== "/")
  //       localStorage.setItem("previous-page", from.fullPath);
  //   });
  // },

  watch: {
    $route: {
      handler() {
        this.fetchStudentProfile();
      },
    },

    getStudentReportSubjects: {
      handler(subjects) {
        if (subjects && this.$route.query.subject != subjects[0].id)
          this.$router.push({
            name: "StudentProfile",
            params: {
              id: this.$route.params.id,
              student_id: this.$route.params.student_id,
            },
            query: {
              ...this.$route.query,
              term: "first",
              subject: subjects[0].id,
            },
          });
      },
    },
  },

  data: () => ({
    student_id: "",
    student_name: "",
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

    show_page_loader: true,
  }),

  created() {
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
    this.getStudentNameAndId();

    this.fetchStudentReportSubjects(this.student_id);

    this.fetchStudentProfile();
  },

  methods: {
    ...mapActions({
      getStudentProfile: "dbProfile/getStudentProfile",
      fetchStudentReportSubjects: "dbReports/getStudentReportSubjects",
      fetchStudentReport: "dbReports/getNewStudentReport",
    }),

    addNewRemark(remark) {
      this.student_info?.remarks?.length
        ? this.remarks.splice(0, 0, remark)
        : (this.remarks = [remark]);
      const remark_block = document.querySelector("#remark-block");
      remark_block.scrollIntoView();
    },

    getStudentNameAndId() {
      this.student_id = this.$route.params.student_id;
      this.student_name = this.$route.query.name;
    },

    checkForSubjectOrTerm() {
      return this.$route.query.subject || this.$route.query.term ? true : false;
    },

    // FETCH STUDENT PROFILE
    fetchStudentProfile() {
      let payload = {
        student_id: this.student_id,
        mode: this.getCatchupMode,
        subject: this.$route.query.subject,
        term: this.$route.query.term,
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
            if (!response.data.performance.total) {
              this.student_info = response.data;
              this.remarks = response.data.remarks;
              this.pushAlert("No report for this student", "warning");
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
  },
};
</script>

<style lang="scss" scoped>
.student-profile-page {
  .profile-sections {
    @include flex-row-between-wrap;
    align-items: flex-start;
    margin-top: toRem(60);

    @include breakpoint-down(sm) {
      margin-top: toRem(45);
    }

    .left-section {
      width: 26.5%;

      @include breakpoint-down(lg) {
        width: 27.5%;
      }

      @include breakpoint-down(md) {
        width: 100%;
        margin-top: toRem(-25);
        margin-bottom: toRem(40);
      }
    }

    .right-section {
      width: 72%;

      @include breakpoint-down(lg) {
        width: 71%;
      }

      @include breakpoint-down(md) {
        width: 100%;
      }
    }

    .completion-block {
      .text {
        @include font-height(11, 15);
        margin-bottom: toRem(6);
        text-align: right;

        @include breakpoint-down(sm) {
          @include font-height(10, 14);
          margin-bottom: toRem(5);
        }
      }

      .completion-rate {
        position: relative;
        overflow: hidden;
        width: toRem(150);
        height: toRem(7);
        background: $brand-inverse-light;

        @include breakpoint-down(sm) {
          width: toRem(100);
          height: toRem(6);
        }

        .progress {
          position: absolute;
        }
      }
    }
  }
}
</style>
