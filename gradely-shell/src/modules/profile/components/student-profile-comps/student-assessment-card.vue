<template>
  <div class="student-assessment-card pointer smooth-animation">
    <!-- ASSESSMENT STATE -->
    <div
      class="avatar assessment-state"
      :class="getAssessmentScore > 10 ? 'rgba-brand-green' : 'rgba-brand-tonic'"
    >
      <div
        class="icon"
        :class="getAssessmentScore > 10 ? 'icon-accept' : 'icon-decline'"
      ></div>
    </div>

    <!-- ASSESSMENT INFO -->
    <div class="assessment-info w-100">
      <!-- LEFT SECTION -->
      <div class="left-section">
        <div class="avatar avatar-with-meta rounded-5">
          <div class="avatar-title">{{ getClosed.day }}</div>
          <div class="avatar-meta">{{ getClosed.month }}</div>
        </div>

        <div class="info">
          <!-- TITLE  -->
          <div class="title-text brand-primary font-weight-600 text-capitalize">
            {{ assessment.childHomework.title }}
          </div>

          <!-- DESCRIPTION -->
          <div class="description color-grey-dark">
            {{ assessment.subject.name }} • {{ getAssessmentScore }}%
          </div>
        </div>
      </div>

      <!-- MID SECTION -->
      <div class="mid-section">
        <!-- TOP -->
        <div class="score color-grey-dark w-100">
          <div class="text">Score</div>
          <div class="value">{{ getAssessmentScore }}%</div>
        </div>

        <!-- BOTTOM -->
        <div
          class="progress-bar position-relative w-100 rounded-10 brand-inverse-light-bg"
        >
          <div
            class="progress position-absolute h-100"
            :class="$color.getProgressBarColor(getAssessmentScore) + '-bg'"
            :style="'width:' + getAssessmentScore + '%'"
            role="progress"
          ></div>
        </div>
      </div>

      <!-- RIGHT SECTION -->
      <div class="right-section pdr-5">
        <router-link to class="btn-link link-no-underline font-weight-500"
          >View</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "studentAssessmentCard",

  props: {
    assessment: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    getClosed() {
      let { d1, m4 } = this.$date
        .formatDate(this.assessment.childHomework.close_date)
        .getAll();
      return {
        day: d1,
        month: m4,
      };
    },

    getTypeColor() {
      if (this.assessment.type === "homework") return "brand-inverse";
      else if (this.assessment.type === "exam") return "brand-accent";
      else return "toffee";
    },

    getAssessmentScore() {
      return Math.round(Number(this.assessment.score)) || 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.student-assessment-card {
  @include flex-row-between-nowrap;
  padding-bottom: toRem(10);
  margin-bottom: toRem(10);
  border-bottom: toRem(1) solid rgba($border-grey, 0.25);

  &:hover {
    border-bottom: toRem(1) solid rgba($brand-accent, 0.25);
  }

  .assessment-state {
    @include square-shape(30);
    margin-right: toRem(20);

    @include breakpoint-down(lg) {
      @include square-shape(28);
      margin-right: toRem(12);
    }

    .icon {
      @include center-placement;
      font-size: toRem(16);
    }
  }

  .assessment-info {
    @include flex-row-between-nowrap;

    .left-section {
      width: 50%;
      @include flex-row-start-nowrap;

      @include breakpoint-down(lg) {
        width: 55%;
      }

      @include breakpoint-down(sm) {
        width: 90%;
      }

      .avatar {
        margin-right: toRem(12);
        @include square-shape(40);

        @include breakpoint-down(lg) {
          margin-right: toRem(8);
          @include square-shape(37);
        }

        @include breakpoint-down(xs) {
          margin-right: toRem(6);
          @include square-shape(36);
        }

        .avatar-title {
          @include font-height(11.5, 15);

          @include breakpoint-down(lg) {
            @include font-height(11, 15);
          }

          @include breakpoint-down(xs) {
            @include font-height(10.5, 14);
          }
        }

        .avatar-meta {
          @include font-height(10.5, 16.5);
          margin-top: toRem(-0.5);

          @include breakpoint-down(lg) {
            @include font-height(10, 15);
            margin-top: toRem(-1);
          }

          @include breakpoint-down(xs) {
            margin-top: toRem(-0.5);
            @include font-height(9, 14);
          }
        }
      }

      .info {
        .title-text {
          @include font-height(12.5, 17);
          margin-bottom: toRem(2.5);

          @include breakpoint-down(lg) {
            @include font-height(11.5, 16);
          }

          @include breakpoint-down(xs) {
            @include font-height(11, 15);
          }

          span {
            @include font-height(11.5, 17);
          }
        }

        .description {
          @include font-height(11.5, 16);

          @include breakpoint-down(lg) {
            @include font-height(11, 15);
          }

          @include breakpoint-down(xs) {
            @include font-height(10.45, 14);
          }
        }
      }
    }

    .mid-section {
      width: 26%;

      @include breakpoint-down(lg) {
        width: 23%;
      }

      @include breakpoint-down(sm) {
        display: none;
      }

      .score {
        @include flex-row-between-nowrap;
        @include font-height(11.75, 16);
        margin-bottom: toRem(5);

        @include breakpoint-down(lg) {
          @include font-height(11, 15);
        }
      }

      .progress-bar {
        height: toRem(6);

        @include breakpoint-down(lg) {
          height: toRem(5);
        }
      }
    }

    .right-section {
      font-size: toRem(12.85);
      text-align: right;
      width: 20%;

      @include breakpoint-down(lg) {
        font-size: toRem(12.25);
        width: 15%;
      }

      @include breakpoint-down(sm) {
        width: 10%;
      }
    }
  }

  .rgba-brand-tonic {
    background: #ffdcde;
    color: $brand-tonic;
  }

  .rgba-brand-green {
    background: rgba(89, 225, 184, 0.25);
    color: $brand-green;
  }

  .rgba-brand-grey {
    background: #e5e5e5;
    color: $color-grey-dark;
  }
}
</style>
