<template>
  <div class="student-assessment-block">
    <div class="mgt-26">
      <student-assessment-card
        v-for="(assessment, index) in assessment_list"
        :key="index"
        :assessment="assessment"
      />
    </div>

    <div class="col-12 mgt-10" v-if="show_more">
      <div
        class="see-more-btn color-white-bg text-center color-grey-dark font-weight-700 rounded-5 pointer smooth-transition"
        @click="showMoreAssessments"
      >
        See {{ text_addon }} Assessments
      </div>
    </div>
  </div>
</template>

<script>
import studentAssessmentCard from "@/modules/profile/components/student-profile-comps/student-assessment-card";

export default {
  name: "studentAssessmentBlock",

  components: {
    studentAssessmentCard,
  },

  props: {
    assessments: {
      type: Array,
      default: () => [],
    },
  },

  watch: {
    assessments: {
      handler() {
        this.loadAssessments();
      },
      deep: true,
      immediate: true,
    },
  },

  data: () => ({
    base_assessment_list: [],
    assessment_list: [],
    shrinked: true,
    text_addon: "more",
    assessment_length: 6,
    show_more: false,
  }),

  methods: {
    loadAssessments() {
      this.base_assessment_list = this.assessment_list = [];
      this.base_assessment_list = this.assessment_list = this.assessments
        .slice()
        .reverse();

      if (this.assessment_list.length > this.assessment_length) {
        this.show_more = true;
        this.text_addon = "more";
        this.assessment_list = this.assessment_list.slice(
          0,
          this.assessment_length
        );
      } else this.show_more = false;
    },

    showMoreAssessments() {
      this.shrinked = !this.shrinked;

      if (this.shrinked) {
        if (this.assessment_list.length > this.assessment_length)
          this.assessment_list = this.assessment_list.slice(
            0,
            this.assessment_length
          );
        this.text_addon = "more";
      } else {
        this.assessment_list = this.base_assessment_list;
        this.text_addon = "less";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.student-assessment-block {
  .see-more-btn {
    @include font-height(12.5, 18);
    padding: toRem(9);

    @include breakpoint-down(xs) {
      @include font-height(12, 16);
    }

    &:hover {
      background: $brand-accent-light !important;
      color: $color-text !important;
    }
  }
}
</style>
