<template>
  <div class="assessment-top">
    <div class="assessment-info">
      <div class="top brand-navy font-weight-700 mgb-5 mgr-5">
        {{ getTitle }}
      </div>

      <div class="bottom color-ash">
        <div class="text">{{ getClassName }}</div>
        <div class="dot"></div>
        <div class="text">{{ getQuestionCount }} Questions</div>
        <div class="dot"></div>
        <div class="text">{{ getQuestionDuraton }} Minutes</div>
      </div>
    </div>

    <div class="start-btn">
      <button
        @click="startExam"
        class="btn btn-accent"
        :disabled="canStartExam ? false : true"
      >
        Start Exam
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "assessmentTop",

  props: {
    assessment: Object,
    default: () => ({
      title: "Exam title",
      questionCount: 0,
      duration: 0,
    }),
  },

  computed: {
    getTitle() {
      return this.assessment?.title || "Exam title here...";
    },

    getClassName() {
      return this.assessment?.class?.class_name || "Student class";
    },

    getQuestionCount() {
      return this.assessment?.questionCount || "0";
    },

    getQuestionDuraton() {
      return this.assessment?.duration
        ? this.assessment?.duration / 60
        : Math.round(Number(this.assessment?.questionsDuration ?? 60) / 60) ??
            "0";
    },

    canStartExam() {
      return this.assessment?.can_start;
    },
  },

  methods: {
    startExam() {
      this.$router.push({
        name: "AssessmentQuestions",
        params: { id: this.assessment.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.assessment-top {
  @include flex-row-between-nowrap;
  margin-bottom: toRem(30);

  @include breakpoint-down(md) {
    margin-bottom: toRem(25);
  }

  .assessment-info {
    .top {
      @include font-height(26, 35);

      @include breakpoint-down(lg) {
        @include font-height(22, 32);
      }

      @include breakpoint-down(md) {
        @include font-height(19, 28);
        margin-bottom: toRem(2) !important;
      }

      @include breakpoint-down(sm) {
        @include font-height(17, 22);
        margin-bottom: toRem(4) !important;
      }
    }

    .bottom {
      @include flex-row-start-wrap;
      @include font-height(15, 21);

      @include breakpoint-down(lg) {
        @include font-height(14, 19);
      }

      @include breakpoint-down(md) {
        @include font-height(13.25, 18);
      }

      @include breakpoint-down(sm) {
        @include font-height(12.75, 18);
      }

      .dot {
        @include square-shape(7);
        background: darken($border-grey, 7%);
        border-radius: 50%;
        margin: auto toRem(10);

        @include breakpoint-down(md) {
          @include square-shape(6);
          margin: auto toRem(8);
        }

        @include breakpoint-down(sm) {
          @include square-shape(5);
          margin: auto toRem(6);
        }
      }
    }
  }
}
</style>
