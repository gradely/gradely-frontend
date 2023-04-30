<template>
  <div class="grade-top-info white-text-bg position-fixed w-100 index-99">
    <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 mx-auto">
      <!-- LEFT SECTION  -->
      <div class="left-section">
        <div class="avatar avatar-square brand-inverse-light-bg">
          <div class="icon icon-library brand-navy"></div>
        </div>

        <div>
          <!-- TOP TEXT  -->
          <div class="top-text color-text font-weight-600 text-capitalize">
            {{ getAssessmentTitle }}
          </div>

          <!-- BOTTOM TEXT  -->
          <div class="bottom-text color-grey-dark">
            {{ getDueDate }}
          </div>
        </div>
      </div>

      <!-- RIGHT SECTION  -->
      <div class="right-section">
        <!-- MEMBERS  -->
        <div class="members" title="Students in class">
          <div class="icon icon-group-users border-grey-dark"></div>
          <div class="value color-ash">{{ students.length }}</div>
        </div>

        <!-- CLOSE ICON  -->
        <router-link
          :to="{ name: 'AssessmentReport' }"
          class="avatar smooth-transition pointer"
          title="Go Back"
        >
          <div class="icon icon-close border-grey-dark"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "gradeTopInfo",

  props: {
    assessment: {
      type: Object,
      default: () => ({
        homework: {
          title: "Assessment Title",
          close_date: "2021-10-02 00:00:00",
        },
      }),
    },
    students: {
      type: Array,
    },
  },

  computed: {
    getDueDate() {
      let { d3, m4, y1, h1, b2, a0 } = this.$date
        .formatDate(
          this.assessment?.homework?.close_date || "2021-10-02 00:00:00"
        )
        .getAll();

      return `${d3} ${m4}, ${y1} ${h1}:${b2} ${a0}`;
    },

    getAssessmentTitle() {
      return this.assessment?.homework?.title || "Assessment title";
    },
  },
};
</script>

<style lang="scss" scoped>
.grade-top-info {
  padding: toRem(12) 0;
  top: 0;
  left: 0;

  @include breakpoint-down(xs) {
    padding: toRem(12) 0 toRem(10);
  }

  .gradely-container {
    @include flex-row-between-nowrap;

    .left-section {
      @include flex-row-start-nowrap;

      .avatar {
        @include square-shape(38);
        margin-right: toRem(15);

        @include breakpoint-down(sm) {
          @include square-shape(36);
          margin-right: toRem(8);
        }

        .icon {
          @include center-placement;
          font-size: toRem(20);

          @include breakpoint-down(sm) {
            font-size: toRem(19);
          }
        }
      }

      .top-text {
        @include font-height(12.75, 18);

        @include breakpoint-down(sm) {
          @include font-height(12.25, 17);
        }
      }

      .bottom-text {
        @include font-height(11.5, 16);
        letter-spacing: 0.015em;

        @include breakpoint-down(sm) {
          @include font-height(11, 15);
        }
      }
    }

    .right-section {
      @include flex-row-end-nowrap;

      .members {
        @include flex-row-end-nowrap;
        margin-right: toRem(25);

        @include breakpoint-down(sm) {
          margin-right: toRem(16);
        }

        .icon {
          margin-right: toRem(8);
          font-size: toRem(20);
        }

        .value {
          font-size: toRem(12.5);
        }
      }

      .avatar {
        background: $border-grey-light;
        @include square-shape(30);

        &:hover {
          background: $brand-inverse-light;
        }

        .icon {
          @include center-placement;
          font-size: toRem(12.5);
        }
      }
    }
  }
}
</style>
