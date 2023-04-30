<template>
  <div
    class="review-info-card rounded-15 box-shadow-effect white-text-bg border"
  >
    <!-- TOP SECTION -->
    <div class="top-section">
      <div class="top-left">
        <div class="avatar rounded-15 brand-red-light-bg">
          <img
            v-lazy="mxStaticImg('ExamIcon.png', 'base')"
            alt="gradely-exam-review"
          />
        </div>

        <div>
          <div class="title-text color-text font-weight-600 text-capitalize">
            {{ getTitle ? getTitle : "Assessment Title" }}
          </div>
          <div class="meta-text color-text">
            {{ assessment.subject ? assessment.subject : "Subject title" }}
          </div>
        </div>
      </div>

      <div class="top-right"></div>
    </div>

    <template>
      <!-- MIDDLE SECTION -->
      <div class="middle-section">
        <!-- QUESTIONS -->
        <div class="counter">
          <div class="title">
            {{ assessment.question_count ? assessment.question_count : 0 }}
          </div>
          <div class="meta">
            QUESTION{{ assessment.question_count === 1 ? null : "s" }}
          </div>
        </div>

        <!-- SCORE -->
        <div class="counter">
          <div class="title">{{ computeMaxScore }}</div>
          <div class="meta">MAX. SCORE</div>
        </div>
      </div>

      <!-- BOTTOM SECTION -->
      <div class="bottom-section">
        <div class="item-row">
          <div class="text">Date Created</div>
          <div class="value">{{ getOpenDate ? getOpenDate : "No Date" }}</div>
        </div>

        <div class="item-row">
          <div class="text">Class</div>
          <div class="value">
            {{ assessment.class_name ? assessment.class_name : "Class name" }}
          </div>
        </div>

        <div class="item-row">
          <div class="text">Status</div>
          <div class="value" :class="getReviewStatusStyle">
            {{ getReviewStatus }}
          </div>
        </div>
      </div>

      <!-- CTA ROW -->
      <div class="cta-row" v-if="getAuthType === 'school'">
        <button
          class="btn reject-btn mgr-7"
          v-if="
            assessment.review_status === null ||
            assessment.review_status === '1'
          "
          @click="toggleRejectModal"
        >
          <div class="icon icon-thumbs-down"></div>
          <div class="text">Reject</div>
        </button>

        <button
          v-if="assessment.review_status === null"
          class="btn btn-accent approve-btn mgl-7"
          @click="toggleApproveModal"
        >
          <div class="icon icon-thumbs-up"></div>
          <div class="text">Approve</div>
        </button>
      </div>

      <!-- CTA ROW -->
      <div class="cta-row" v-if="false">
        <!-- v-if="getAuthType === 'teacher' && assessment.review_status == 0" -->
        <button class="btn btn-accent approve-btn mgl-7">
          <div class="text">Submit for Review</div>
        </button>
      </div>
    </template>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_reject_modal">
        <reject-pending-modal
          :homework="assessment"
          @closeTriggered="toggleRejectModal"
        />
      </transition>

      <transition name="fade" v-if="show_approve_modal">
        <approve-pending-modal
          :homework="assessment"
          @closeTriggered="toggleApproveModal"
        />
      </transition>
    </portal>
  </div>
</template> 

<script>
export default {
  name: "reviewInfoCard",

  components: {
    rejectPendingModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/assessment-review/reject-pending-modal"
      ),
    approvePendingModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/assessment-review/approve-pending-modal"
      ),
  },

  props: {
    assessment: {
      type: Object,
      default: () => ({
        creator: {
          name: "Richy Jones",
          image: "",
        },
        title: "Exam title here..",
        subject: "Subject...",
        open_date: "2021-11-23T21:06:00Z",
        score: 0,
        question_count: 0,
        class_name: "Junior School 1",
        review_status: null,
      }),
    },
    questions: Array,
  },

  computed: {
    getTitle() {
      return this.getAuthType === "school"
        ? this.assessment?.creator?.name
        : this.assessment?.title;
    },

    getReviewStatus() {
      if (this.assessment?.review_status == 0) return "Rejected";
      else if (this.assessment?.review_status == 1) return "Approved";
      else return "Pending";
    },

    getReviewStatusStyle() {
      if (this.assessment?.review_status == 0) return "brand-tonic";
      else if (this.assessment?.review_status == 1) return "brand-green";
      else return "brand-accent";
    },

    getOpenDate() {
      if (!this.assessment?.open_date) return "";
      let { d3, m4, y1, h01, b2, a0 } = this.$date
        .formatDate(this.assessment?.open_date)
        .getAll();

      return `${d3} ${m4}, ${y1} ${h01}:${b2} ${a0}`;
    },

    computeMaxScore() {
      return this.questions.length
        ? this.questions.reduce((total, item) => total + item?.score, 0)
        : 0;
    },
  },

  data: () => ({
    show_reject_modal: false,
    show_approve_modal: false,
  }),

  methods: {
    toggleRejectModal() {
      this.show_reject_modal = !this.show_reject_modal;
    },

    toggleApproveModal() {
      this.show_approve_modal = !this.show_approve_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.review-info-card {
  padding: toRem(22) toRem(20);

  @include breakpoint-down(lg) {
    padding: toRem(16);
  }

  @include breakpoint-down(xs) {
    padding: toRem(12) toRem(10);
  }

  .top-section {
    @include flex-row-between-nowrap;

    .top-left {
      @include flex-row-start-nowrap;
    }

    .top-right {
      display: none;

      @include breakpoint-down(xs) {
        display: unset;
      }
    }

    .avatar {
      @include square-shape(48);
      margin-right: toRem(12);

      @include breakpoint-down(xs) {
        @include square-shape(42);
        margin-right: toRem(10);
      }

      img {
        @include center-placement;
        @include square-shape(24.5);

        @include breakpoint-down(xs) {
          @include square-shape(20);
        }
      }
    }

    .title-text {
      @include font-height(14.5, 22);
      margin-bottom: toRem(2);

      @include breakpoint-down(xs) {
        @include font-height(13, 18);
      }
    }

    .meta-text {
      @include font-height(12.75, 17);

      @include breakpoint-down(xs) {
        @include font-height(12.25, 17);
      }
    }
  }

  .middle-section {
    border-top: toRem(1) solid $border-grey;
    border-bottom: toRem(1) solid $border-grey;
    @include flex-row-between-nowrap;
    padding: toRem(18) toRem(5);
    margin-top: toRem(20);

    @include breakpoint-down(xs) {
      padding: toRem(14) toRem(3);
      margin-top: toRem(15);
    }

    .counter {
      @include flex-column-center;
      width: 49%;

      .title {
        @include font-height(15.5, 24);
        margin-bottom: toRem(4);
        color: $brand-navy;
        font-weight: 600;

        @include breakpoint-down(xs) {
          @include font-height(15, 22);
        }
      }

      .meta {
        @include font-height(11.75, 16);
        color: $color-grey-dark;
      }

      &:first-of-type {
        border-right: toRem(1) solid $border-grey;
      }
    }
  }

  .bottom-section {
    margin: toRem(20) auto toRem(10);

    .item-row {
      @include flex-row-between-wrap;
      @include font-height(12.75, 18);
      margin-bottom: toRem(15);
      color: $color-ash;

      &:last-of-type {
        margin-bottom: 0;
      }

      .value {
        font-weight: 600;
      }
    }
  }

  .cta-row {
    border-top: toRem(1) solid $border-grey;
    @include flex-row-center-wrap;
    margin-top: toRem(12);
    padding-top: toRem(15);

    .btn {
      .icon {
        margin-right: toRem(8);
        font-size: toRem(16);
      }

      .text {
        font-size: toRem(12.5);
        text-transform: capitalize;
      }
    }

    .reject-btn {
      background: #eeecec;
      color: $brand-navy;

      .text {
        color: $brand-red;
      }
    }

    .approve-btn {
    }
  }
}
</style>