<template>
  <div class="class-aggregate-block white-text-bg rounded-10">
    <!-- TOP  -->
    <div class="top">
      <!-- TITLE ROW  -->
      <div class="title-row pdb-20">
        <!-- CONTENT  -->
        <div class="content">
          <div class="title-text text-uppercase font-weight-700 color-text">
            Class Aggregate
          </div>
          <div class="meta-text color-grey-dark">
            See how your class is performing in the subject
          </div>
        </div>

        <!-- GRADEBOOK BTN  -->
        <div
          class="
            gradebook-btn
            rounded-30
            smooth-transition
            color-white-bg
            pointer
          "
          v-if="false"
        >
          <div class="avatar">
            <div class="icon icon-verified-note"></div>
          </div>

          <div class="text color-text font-weight-700">View Gradebook</div>
        </div>
      </div>

      <!-- CATEGORIES  -->
      <div class="categories">
        <div
          class="category smooth-transition"
          :class="category.slug === performance_category ? 'active' : null"
          v-for="(category, index) in categories"
          :key="index"
          @click="changeCategory(category.slug)"
        >
          {{ category.name }}
        </div>
      </div>
    </div>

    <!-- BOTTOM  -->
    <div class="bottom">
      <!-- TOPICS ROW  -->
      <div class="topics-row position-relative mgb-25">
        <topic-chip
          v-for="(topic, index) in getTopics"
          :key="index"
          :index="index"
          :topic="topic"
          :active_index="topic_index"
          @selected="makeTopicSelection($event)"
        />
      </div>

      <template v-if="getStudents.length">
        <!-- STUDENTS REPORT TABLE  -->
        <div class="student-report-table">
          <div class="table-header">
            <div class="column-one">Student</div>
            <div class="column-two">Avg. Score</div>
            <div class="column-three">Mastery</div>
          </div>

          <student-report-card
            v-for="(student, index) in getStudentFraction"
            :key="index"
            :index="index + 1"
            :student="student"
          />
        </div>
      </template>

      <template v-else>
        <empty-report-card-state
          :empty_state="isEmpty"
          :category="performance_category"
        />
      </template>

      <!-- SHOW MORE BLOCK  -->
      <template v-if="getStudents.length > max_student">
        <div
          class="
            show-more-row
            rounded-5
            pointer
            color-white-bg
            smooth-transition
          "
          @click="toggleStudentShrinkList"
        >
          <div class="text font-weight-700 color-grey-dark mgr-4">
            Show {{ is_shrinked ? "More" : "Less" }}
          </div>

          <div class="avatar">
            <div class="icon icon-caret-down color-grey-dark"></div>
          </div>
        </div>
      </template>

      <!-- RECOMMENDATION BLOCK  -->
      <recommendation-row v-if="false" />
    </div>
  </div>
</template>

<script>
import topicChip from "@/modules/base/components/report-comps/teacher-comps/topic-chip";
import studentReportCard from "@/modules/base/components/report-comps/teacher-comps/student-report-card";
import recommendationRow from "@/modules/base/components/report-comps/teacher-comps/recommendation-row";
import emptyReportCardState from "@/modules/base/components/report-comps/teacher-comps/empty-report-card-state";

export default {
  name: "classAggregateBlock",

  components: {
    topicChip,
    studentReportCard,
    recommendationRow,
    emptyReportCardState,
  },

  props: {
    topics: {
      type: Array,
      default: () => [],
    },

    students: {
      type: Array,
      default: () => [],
    },

    report: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    getTopics() {
      return (
        this.report.reverse().map((report) => {
          return report.topic;
        }) || []
      );
    },

    getStudents() {
      return (
        this.report[this.topic_index]?.students?.filter((student) => {
          return this.filterBasedOnCategory(student);
        }) || []
      );
    },

    getStudentFraction() {
      return this.is_shrinked
        ? this.getStudents.slice(0, this.max_student)
        : this.getStudents;
    },

    isEmpty() {
      return this.getStudentFraction?.length ? false : true;
    },
  },

  watch: {
    report: {
      handler() {
        this.topic_index = 0;
        //  this.performance_category = 'all';
      },
      immediate: true,
    },
  },

  data: () => ({
    max_student: 5,
    is_shrinked: true,
    empty_state: false,

    performance_category: "all",
    topic_index: 0,
    categories: [
      {
        name: "All Students",
        slug: "all",
      },
      {
        name: "Struggling",
        slug: "struggling",
      },
      {
        name: "Average",
        slug: "average",
      },
      {
        name: "Excelling",
        slug: "excelling",
      },
    ],
  }),

  methods: {
    makeTopicSelection(index) {
      this.topic_index = index;
    },

    filterBasedOnCategory(student) {
      if (this.performance_category === "all") {
        return true;
      } else if (this.performance_category === "struggling") {
        return student.performance.average < 45;
      } else if (this.performance_category === "average") {
        return (
          student.performance.average > 45 && student.performance.average <= 75
        );
      } else if (this.performance_category === "excelling") {
        return student.performance.average > 75;
      }
    },

    // CHANGE STUDENT CATEGORY
    changeCategory(category) {
      this.performance_category = category;
    },

    // TOGGLE SHRINK LIST
    toggleStudentShrinkList() {
      this.is_shrinked = !this.is_shrinked;
    },
  },
};
</script>

<style lang="scss" scoped>
.class-aggregate-block {
  box-shadow: 0 toRem(1) toRem(4) rgba($black-text, 0.15);
  margin-bottom: toRem(50);

  @include breakpoint-down(md) {
    margin-bottom: 0;
  }

  @include breakpoint-down(sm) {
    border-radius: toRem(5);
  }
  .top {
    padding: toRem(20) toRem(20) 0;
    border-bottom: toRem(1) solid $border-grey;

    @include breakpoint-down(lg) {
      padding: toRem(20) toRem(20) 0;
    }

    @include breakpoint-down(sm) {
      padding: toRem(18) toRem(15) 0;
    }

    .title-row {
      @include flex-row-between-nowrap;
      align-items: flex-start;

      .title-text {
        @include font-height(13.55, 18);
        letter-spacing: 0.01em;
        margin-bottom: toRem(4);

        @include breakpoint-down(lg) {
          @include font-height(14, 18);
        }

        @include breakpoint-down(sm) {
          @include font-height(13.5, 17);
        }
      }

      .meta-text {
        @include font-height(12.5, 16);

        @include breakpoint-down(lg) {
          @include font-height(12, 16);
        }
        @include breakpoint-down(xs) {
          @include font-height(11.5, 16);
        }
      }

      .gradebook-btn {
        @include flex-row-end-nowrap;
        padding: toRem(8) toRem(12);

        &:hover {
          background: $brand-inverse-light !important;
          box-shadow: 0 toRem(1) toRem(4) rgba(0, 0, 0, 0.15);
        }

        .avatar {
          @include square-shape(26);
          margin-right: toRem(1);
          .icon {
            @include center-placement;
            font-size: toRem(18);
            color: $brand-accent;
          }
        }

        .text {
          @include font-height(12, 16);
        }
      }
    }

    .categories {
      @include flex-row-start-nowrap;
      .category {
        @include font-height(12.5, 18);
        @include transition(0.3s);
        padding: toRem(9) toRem(7);
        color: $border-grey-dark;
        cursor: pointer;

        @include breakpoint-down(lg) {
          @include font-height(11.75, 17);
          padding: toRem(7);
        }

        @include breakpoint-down(xs) {
          @include font-height(11.5, 17);
          padding: toRem(5);
        }

        @include breakpoint-custom-down(320) {
          @include font-height(11, 16);
          padding: toRem(4);
        }

        &:hover {
          color: $brand-navy;
        }
      }

      .active {
        color: $brand-navy;
        font-weight: 600;
        border-bottom: toRem(2.25) solid $brand-accent;
      }
    }
  }

  .bottom {
    padding: toRem(20);

    @include breakpoint-down(sm) {
      padding: toRem(18) toRem(15);
    }

    .topics-row {
      @include flex-row-start-nowrap;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .show-more-row {
      @include flex-row-center-nowrap;
      margin: toRem(12) 0 toRem(22);
      padding: toRem(8) 0;

      &:hover {
        background: $brand-inverse-light !important;
      }

      .text {
        @include font-height(12.5, 18);

        @include breakpoint-down(lg) {
          @include font-height(11.5, 17);
        }
      }

      .avatar {
        @include square-shape(28);
        .icon {
          @include center-placement;
          font-size: toRem(11);
          margin-top: toRem(1);

          @include breakpoint-down(lg) {
            font-size: toRem(9.5);
          }
        }
      }
    }
  }
}
</style>
