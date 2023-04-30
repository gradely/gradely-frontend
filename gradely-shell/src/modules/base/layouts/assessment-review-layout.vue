<template>
  <div class="assessment-review-page">
    <div class="gradely-app-container top-0">
      <!-- REVIEW BANNER  -->
      <review-banner :title="getAssessmentTitle" :back_link="back_link" />

      <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 mx-auto">
        <!-- LEFT SECTION  -->
        <div class="left-section">
          <review-chart-card
            :student_id="getAstudentID"
            :summary="getAssessmentSummary"
          />

          <!-- ASSESSMENT SHORT LINK -->
          <div
            class="assessment-short-link rounded-10 brand-navy-bg"
            v-if="getAssessmentSummary.tag === 'exam'"
          >
            <div class="left pdr-5">
              <div class="top mgb-2">Assessment Link</div>
              <div class="bottom">{{ share_link }}</div>
            </div>

            <div
              class="
                right
                avatar
                border-brand-accent
                brand-accent-light-bg
                pointer
              "
              title="Copy assessment link"
              @click="copyShareLink"
            >
              <div class="icon icon-copy brand-navy font-weight-500"></div>
            </div>

            <input
              type="text"
              ref="shareLink"
              :value="share_link"
              class="position-absolute index--9 ignore"
              style="opacity: 0"
            />
          </div>
        </div>

        <!-- RIGHT SECTION  -->
        <div class="right-section">
          <!-- VIEW BLOCK  -->
          <template>
            <transition name="fade" mode="out-in">
              <router-view />
            </transition>
          </template>
        </div>
      </div>
    </div>

    <!-- PAGE LOADER -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="loading">
        <page-loader />
      </transition>
    </portal>
  </div>
</template>

<script>
import { APP_BASE_URL } from "@/env";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "assessmentReviewLayout",

  components: {
    reviewBanner: () =>
      import(
        /* webpackChunkName: "assessmentReview" */ "@/modules/base/components/assessment-review-comps/review-banner"
      ),
    reviewChartCard: () =>
      import(
        /* webpackChunkName: "assessmentReview" */ "@/modules/base/components/assessment-review-comps/review-chart-card"
      ),
    pageLoader: () =>
      import(
        /* webpackChunkName: "pageLoader" */ "@/shared/components/page-loader"
      ),
  },

  computed: {
    ...mapGetters({ getAssessmentReport: "dbAssessments/getAssessmentReport" }),

    getAssessmentSummary() {
      if (!this.getAssessmentReport) return {};
      return {
        ...this.getAssessmentReport?.summary,
        due_date: this.getAssessmentReport?.close_date,
        open_date: this.getAssessmentReport?.open_date,
        duration: this.getAssessmentReport?.duration,
        can_start: this.getAssessmentReport?.can_start,
        can_see_score: this.getAssessmentReport?.can_see_score,
      };
    },

    getAssessmentTitle() {
      return (
        this.$route.query?.title ?? this.getAssessmentReport?.summary?.title
      );
    },

    isTourAssessment() {
      let tour_titles = [
        "Gradely Tour",
        "Gradely Tour Session",
        "Gradely Class Tour",
        "Class Tour",
        "Gradely LMS Tour",
      ];

      return tour_titles.includes(this.getAssessmentTitle) ? true : false;
    },

    getAstudentID() {
      if (!this.getAssessmentReport) return 5199;
      else {
        if (this.$route.query.tour || this.isTourAssessment) return 5199;
        else return this.getAssessmentReport?.students_taken[0]?.id;
      }
    },
  },

  data() {
    return {
      assessment_title: "",
      summary_data: {},
      assessment_info: null,
      share_link: "",
      loading: true,
      back_link: "",

      show_page_loader: true,
    };
  },

  beforeRouteEnter(to, from, next) {
    let link = localStorage.getItem("back_link", link);

    next(
      (vm) =>
        (vm.back_link =
          !link && from?.fullPath != "/" ? from?.fullPath ?? "" : "")
    );
  },

  mounted() {
    let back_link = localStorage.getItem("back_link");
    if (back_link && !this.back_link) this.back_link = back_link;

    this.assessment_title = this.$route.query.title
      ? this.$route.query.title
      : "Title here...";

    // this.fetchAssessmentSummary();
    this.fetchAssessmentInfo();

    // this.share_link = `${APP_BASE_URL}/test/start-exam/${this.$route.params.assessment_id}`;
    this.share_link = `https://app.gradely.co/test/start-exam/${this.$route.params.assessment_id}`;
  },

  methods: {
    ...mapActions({
      getAssessmentDetails: "dbAssessments/getAssessmentDetails",
      getAssessmentInfo: "dbAssessments/getAssessmentInfo",
    }),

    fetchAssessmentInfo() {
      this.getAssessmentInfo({
        id: this.$route.params.assessment_id,
      })
        .then((response) => {
          if (response.code === 200) {
            this.loading = false;
            // if (this.$route?.query?.tour) {
            //   // ASSESS PAGE
            // } else if (!response.data.students_taken.length) {
            //   if (this.$route.query?.tour) return true;

            //   this.pushAlert("No report available yet", "warning");
            //   setTimeout(() => this.$router.go(-1), 1500);
            // }
          } else {
            this.loading = false;
            this.pushAlert(response.message, "warning");
          }
        })
        .catch(() => this.pushAlert("Error fetching report", "error"));
    },

    // FETCH ALL ASSESSMENT SUMMARY
    fetchAssessmentSummary() {
      let payload = {
        homework_id: this.$route.params.assessment_id,
        type: "summary",
      };

      this.getAssessmentDetails(payload)
        .then((response) => {
          // console.log(response);
          if (response.code === 200) {
            this.show_page_loader = false;
            this.assessment_title = response.data.title;
            this.summary_data = response.data;
          } else this.show_page_loader = false;
        })
        .catch(() => {
          this.show_page_loader = false;

          this.$bus.$emit("show_response_alert", {
            message: "An error occured while loading assessment summary data",
            type: "error",
          });
        });
    },

    copyShareLink() {
      let code_input = this.$refs.shareLink;
      code_input.select();
      code_input.setSelectionRange(0, 99999); /*For mobile devices*/
      document.execCommand("copy");

      code_input.value
        ? this.pushAlert("Assessment link copied successfully", "success")
        : this.pushAlert("No assessment link available", "warning");
    },
  },
};
</script>

<style lang="scss" scoped>
.assessment-review-page {
  .gradely-container {
    @include flex-row-between-wrap;
    align-items: flex-start;

    .left-section {
      width: 31%;

      @include breakpoint-down(md) {
        margin-bottom: toRem(40);
        width: 100%;
      }

      .assessment-short-link {
        @include flex-row-between-nowrap;
        margin-top: toRem(20);
        padding: toRem(10);

        .left {
          .top {
            @include font-height(12, 18);
            color: $white-text;
            opacity: 0.5;
          }

          .bottom {
            @include font-height(12.5, 18);
            color: $white-text;
          }
        }

        .right {
          @include square-shape(42);
          border-radius: toRem(15);

          .icon {
            @include center-placement;
            font-size: toRem(18);
          }
        }
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
    }
  }
}
</style>
