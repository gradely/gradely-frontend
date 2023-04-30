<template>
  <div class="help-child-card rounded-2 white-text-bg mgb-4 position-relative">
    <!-- HOVER LABEL  -->
    <div
      class="label position-absolute h-100 brand-accent-bg smooth-transition"
    ></div>

    <!-- LEFT SECTION  -->
    <div class="left-section">
      <div class="avatar avatar-square">
        <img
          v-lazy="student.image"
          :alt="$string.getStringInitials(getStudentFullname)"
          class="avatar-img"
          v-if="student.image"
        />

        <div
          class="avatar-text"
          v-else
          :class="$color.getProfileBgColor(getStudentFullname)"
        >
          {{ $string.getStringInitials(getStudentFullname) }}
        </div>
      </div>

      <div>
        <div class="top-text color-text">
          {{ getStudentFullname }} &nbsp;
          <span class="brand-tonic"
            >{{ student.total_attempts_score }}/{{ student.total_score }}
            <template v-if="false">|{{ student.score }}%</template>
          </span>
        </div>
      </div>
    </div>

    <!-- RIGHT SECTION  -->
    <div class="right-section pdl-3" v-if="false">
      <!-- REMEDIAL  -->
      <div class="custom-btn mgr-10" v-if="recommendedRemedial">
        <div class="icon icon-videocam brand-inverse"></div>
        <div class="text">Remedial Class</div>
      </div>

      <!-- RESOURCES  -->
      <div class="custom-btn" v-if="recommendResources">
        <div class="icon icon-practice-card brand-navy"></div>
        <div class="text">Resources</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "helpChildCard",

  props: {
    student: {
      type: Object,
      default: () => ({
        id: 1,
        first_name: "Elvis",
        last_name: "Efemena",
        full_name: "Efemena Elvis",
        image: "",
        quizSummaryScore: 10,
        recommendations: {
          remedial: {},
          resources: [],
        },
      }),
    },
  },

  computed: {
    recommendedRemedial() {
      // return Object.keys(this.student?.recommendations).length
      //   ? this.student.recommendations.remedial.is_recommended == 0
      //     ? true
      //     : false
      //   : false;
      return false;
    },

    recommendResources() {
      // return Object.keys(this.student?.recommendations).length
      //   ? this.student.recommendations.resources.length
      //     ? true
      //     : false
      //   : false;

      return false;
    },

    getStudentFullname() {
      return `${this.student?.lastname} ${this.student.firstname}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.help-child-card {
  @include flex-row-between-nowrap;
  padding: toRem(8) toRem(15);

  @include breakpoint-down(sm) {
    padding: toRem(8) toRem(10);
  }

  @include breakpoint-down(xs) {
    padding: toRem(8);
  }

  .label {
    left: 0;
    top: 0;
    width: toRem(2);
    border-radius: toRem(2) 0 0 toRem(2);
    display: none;
  }

  &:hover {
    background: rgba($white-text, 0.85) !important;

    .label {
      display: unset;
    }
  }

  .left-section {
    @include flex-row-start-nowrap;

    .avatar {
      @include square-shape(38);
      margin-right: toRem(10);

      @include breakpoint-down(xs) {
        @include square-shape(36);
        margin-right: toRem(8);
      }
    }

    .top-text {
      @include font-height(12.75, 18);

      @include breakpoint-down(xs) {
        @include font-height(12.25, 18);
      }
    }
  }

  .right-section {
    @include flex-row-end-nowrap;

    .custom-btn {
      @include flex-row-center-nowrap;
      padding: toRem(7) toRem(14);
      @include transition(0.4s);
      border-radius: toRem(30);
      background: $color-white;
      width: max-content;
      cursor: pointer;

      @include breakpoint-down(sm) {
        padding: toRem(9);
      }

      .icon {
        @include transition(0.4s);
        margin-right: toRem(8);
        font-size: toRem(20);

        @include breakpoint-down(sm) {
          font-size: toRem(21);
          margin-right: 0;
        }
      }

      .text {
        @include transition(0.4s);
        font-size: toRem(11);
        color: $color-ash;

        @include breakpoint-down(sm) {
          display: none;
        }
      }

      &:hover {
        box-shadow: 0 toRem(1) toRem(4) rgba($brand-black, 0.15);
        background: $brand-primary !important;

        .icon,
        .text {
          color: $white-text !important;
        }
      }
    }
  }
}
</style>
