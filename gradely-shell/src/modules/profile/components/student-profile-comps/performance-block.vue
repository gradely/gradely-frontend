<template>
  <div class="performance-data">
    <div class="empty-state" v-if="!isReportAvailable">
      <empty-performance-state student_report />
    </div>

    <template v-else>
      <div class="left">
        <chart-column
          show_advanced_options
          :average_score="student.performance.average"
          :score="student.performance.score"
          :total="student.performance.total"
          :show_total="false"
        />

        <!-- CLASS RANKING -->
        <class-rank :ranking="student.positions" v-if="false" />
      </div>

      <div class="right">
        <topics-column :topic_performance="student.topic_performance" />
      </div>
    </template>
  </div>
</template>

<script>
import chartColumn from "@/modules/base/components/report-comps/teacher-comps/chart-column";
import topicsColumn from "@/modules/base/components/report-comps/teacher-comps/topics-column";
import emptyPerformanceState from "@/modules/base/components/report-comps/teacher-comps/empty-performance-state";

export default {
  name: "performanceBlock",

  components: {
    chartColumn,
    topicsColumn,
    emptyPerformanceState,
    classRank: () =>
      import(
        /* webpackChunkName: "classRank" */ "@/modules/profile/components/student-profile-comps/class-rank"
      ),
  },

  props: {
    student: {
      type: Object,
      default() {
        return {
          performance: {
            score: 535,
            total: 1000,
            easy: 24,
            medium: 20,
            hard: 10,
            average: 33,
          },

          topic_performance: {
            average: [],
            excellence: [],
            struggling: [],
          },
          positions: {},
          mastery: {},
        };
      },
    },
  },

  computed: {
    getMastery() {
      return "300/400";
    },

    isReportAvailable() {
      return this.student?.performance?.total;
    },
  },

  watch: {
    student: {
      handler(value) {
        // this.processStudentStats(value);
        // this.processTopicPerformance(value);
        // this.processAverageAndMastery(value);
      },
    },
    deep: true,
  },

  data: () => ({
    student_count: {
      studentsCount: 0,
      excellence: 0,
      average: 0,
      struggling: 0,
    },

    topic_performance: [],
    average_score: 80,
    mastery: "0/100",
  }),

  mounted() {
    // this.processStudentStats(this.student);
    // this.processTopicPerformance(this.student);
    // this.processAverageAndMastery(this.student);
  },

  methods: {
    // GET STUDENT CHART STATISTICS
    processStudentStats({ performance }) {
      this.student_count.studentsCount =
        performance?.struggling.length +
        performance?.average.length +
        performance?.excellence.length;

      this.student_count.excellence = performance?.excellence.length;
      this.student_count.average = performance?.average.length;
      this.student_count.struggling = performance?.struggling.length;
    },

    // GET STUDENT TOPIC PERFORMANCE LIST
    processTopicPerformance({ performance }) {
      this.topic_performance = [];

      performance?.excellence.map((topic) =>
        this.topic_performance.push({ level: "excelling", topic: topic.title })
      );

      performance?.average.map((topic) =>
        this.topic_performance.push({ level: "average", topic: topic.title })
      );

      performance?.struggling.map((topic) =>
        this.topic_performance.push({ level: "struggling", topic: topic.title })
      );
    },

    // GET STUDENT AVERAGE SCORE AND MASTERY
    processAverageAndMastery({ positions, mastery }) {
      this.average_score = positions?.studentAggregate || 0;
      this.mastery = `${mastery?.singleTotal}/${mastery?.total}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.performance-data {
  @include flex-row-between-nowrap;
  align-items: flex-start;

  @include breakpoint-down(md) {
    @include flex-column-start-start;
  }

  .left {
    width: 40%;

    @include breakpoint-down(lg) {
      width: 38%;
    }

    @include breakpoint-down(md) {
      width: 100%;
      margin-bottom: toRem(30);
    }
  }

  .right {
    width: 56%;

    @include breakpoint-down(lg) {
      width: 58%;
    }

    @include breakpoint-down(md) {
      width: 100%;
    }
  }
}
</style>
