<template>
  <div>
    <div class="review-page">
      <div class="gradely-app-container topnav-base-offset">
        <div
          class="
            gradely-container
            px-2 px-sm-3 px-md-4 px-xl-5
            mx-auto
            smooth-animation
          "
        >
          <!-- TITLE ROW -->
          <div class="title-row">
            <div class="title-text brand-navy font-weight-600 text-capitalize">
              {{ assessment_title }}
            </div>

            <button
              @click="proceedToLms"
              class="btn btn-soft-accent"
              v-if="getAuthType === 'teacher'"
            >
              <div class="icon icon-plus"></div>
              <div class="text">Add Question</div>
            </button>
          </div>

          <!-- QUESTIONS SECTION -->
          <div class="question-section">
            <!-- LEFT SECTION -->
            <div class="left-section">
              <!-- ALERT CARD -->
              <div class="desktop-view">
                <review-alert-card
                  :status="assessment_info.review_status"
                  :remark="assessment_info.review_remark"
                />
              </div>

              <template v-if="questions.length">
                <review-question-card
                  v-for="(question, index) in questions"
                  :key="index"
                  :count="index + 1"
                  :status="assessment_info.review_status"
                  :question="question"
                />
              </template>
            </div>

            <!-- RIGHT SECTION -->
            <div class="right-section">
              <div class="mobile-view">
                <review-alert-card
                  :status="assessment_info.review_status"
                  :remark="assessment_info.review_remark"
                />
              </div>

              <review-info-card
                :assessment="assessment_info"
                :questions="questions"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PAGE LOADER -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_page_loader">
        <page-loader loading_text="Loading Questions" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { EXTERNAL_URL } from "@/env";
import { mapActions } from "vuex";
import pageLoader from "@/shared/components/page-loader";
import reviewInfoCard from "@/modules/base/components/assessment-pending-comps/review-info-card";

export default {
  name: "assessmentPendingReview",

  components: {
    pageLoader,
    reviewInfoCard,
    reviewAlertCard: () =>
      import(
        /* webpackChunkName: "review-comp" */ "@/modules/base/components/assessment-pending-comps/review-alert-card"
      ),
    reviewQuestionCard: () =>
      import(
        /* webpackChunkName: "review-comp" */ "@/modules/base/components/assessment-pending-comps/review-question-card"
      ),
  },

  data() {
    return {
      assessment_title: this.$route.query.title,
      show_page_loader: true,

      assessment_info: {},
      questions: [],

      show_manage_question_modal: false,
    };
  },

  created() {
    this.$bus.$on("extractRemovedQuestion", (question_id) => {
      setTimeout(
        () =>
          (this.questions = this.questions.filter(
            (question) => question.id !== question_id
          )),
        1500
      );

      setTimeout(() => this.fetchAssessmentDetails(), 1800);
    });

    this.$bus.$on("reloadPendingExam", () => location.reload());
  },

  mounted() {
    this.fetchAssessmentDetails();
  },

  methods: {
    ...mapActions({
      getPendingAssessmentInfo: "dbAssessments/getPendingAssessmentInfo",
    }),

    proceedToLms() {
      setTimeout(() => {
        location.href = EXTERNAL_URL(
          "lms",
          `/manage-questions/${this.assessment_info?.id}`
        );
      }, 150);
    },

    fetchAssessmentDetails() {
      this.getPendingAssessmentInfo(this.$route.params.assessment_id)
        .then((response) => {
          // console.log(response);
          this.show_page_loader = false;

          if (response.code === 200) {
            this.assessment_title = response.data?.homework.title;
            this.assessment_info = response.data?.homework;
            this.questions = response.data?.questions
              ? response.data?.questions
              : [];
          } else
            this.pushAlert("Unable to fetch assessment details", "warning");
        })
        .catch(() => {
          this.show_page_loader = false;
          this.pushAlert(
            "An error occured while fetching assessment details",
            "error"
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.review-page {
  .title-row {
    margin: toRem(30) auto toRem(35);
    @include flex-row-between-nowrap;

    @include breakpoint-down(sm) {
      margin: toRem(17) auto toRem(20);
    }

    .title-text {
      @include font-height(24, 32);
      padding-right: toRem(15);

      @include breakpoint-down(lg) {
        @include font-height(22, 30);
      }

      @include breakpoint-down(md) {
        @include font-height(19, 26);
      }

      @include breakpoint-down(sm) {
        @include font-height(17, 24);
        padding-right: toRem(20);
      }

      @include breakpoint-down(xs) {
        @include font-height(16, 22);
      }
    }

    .btn {
      @include breakpoint-down(sm) {
        padding: toRem(8.5);
      }

      .icon {
        font-size: toRem(18);
        margin-right: toRem(6);

        @include breakpoint-down(sm) {
          font-size: toRem(21);
          margin-right: 0;
        }
      }

      .text {
        @include breakpoint-down(sm) {
          display: none;
        }
      }
    }
  }

  .question-section {
    @include flex-row-between-wrap;
    align-items: flex-start;

    .left-section {
      width: 64%;

      @include breakpoint-down(lg) {
        width: 62%;
      }

      @include breakpoint-down(md) {
        width: 100%;
        order: 2;
      }
    }

    .right-section {
      width: 32%;

      @include breakpoint-down(lg) {
        width: 36%;
      }

      @include breakpoint-down(md) {
        margin-bottom: toRem(17);
        width: 100%;
        order: 1;
      }
    }
  }
}

.desktop-view {
  @include breakpoint-down(md) {
    display: none;
  }
}

.mobile-view {
  display: none;

  @include breakpoint-down(md) {
    display: unset;
  }
}
</style>