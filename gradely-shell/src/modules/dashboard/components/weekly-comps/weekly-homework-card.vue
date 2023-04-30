<template>
  <div
    class="
      weekly-body
      position-relative
      weekly-by-5-columns
      rounded-2
      white-text-bg
      mgb-2
      pointer
    "
    @click="goToHomeworkReview"
  >
    <!-- LABEL  -->
    <div
      class="label position-absolute h-100 brand-accent-bg smooth-transition"
    ></div>

    <!-- COLUMN ONE  -->
    <div class="column-one">
      <div class="avatar avatar-square brand-inverse-light-bg mgr-10">
        <div class="icon icon-library brand-navy"></div>
      </div>

      <!-- INFO  -->
      <div class="info">
        <div
          class="title-text brand-navy font-weight-600 text-capitalize mgb-2"
        >
          {{ homework.title }}
        </div>
        <div class="meta-text color-grey-dark">{{ homework.subject.name }}</div>
      </div>
    </div>

    <!-- COLUMN TWO  -->
    <div class="column-two text-truncate">{{ getDueDate }}</div>

    <!-- COLUMN THREE  -->
    <div class="column-three text-truncate">
      {{ homework.class.class_name }}
    </div>

    <!-- COLUMN FOUR  -->
    <div class="column-four text-truncate">
      {{ homework.teacher.full_name }}
    </div>

    <!-- COLUMN FIVE  -->
    <div class="column-five">
      <router-link
        :to="{
          name: 'AssessmentSummaryReview',
          params: { id: homework.class_id, assessment_id: homework.id },
          query: { title: homework.title },
        }"
        class="btn-link link-no-underline font-weight-600"
        >View</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "weeklyHomeworkCard",

  props: {
    homework: {
      type: Object,
      default: () => ({
        id: 1,
        title: "Homework title",
        subject: {
          name: "Subject title",
        },
        teacher: {
          full_name: "Teacher name",
        },
        class: {
          id: 1,
          class_name: "Year 1",
        },
        class_id: 1,
        close_date: "Tues 23rd Aug. 2021",
      }),
    },
  },

  computed: {
    getDueDate() {
      let { w2, d3, m4, y1 } = this.$date
        .formatDate(this.homework.close_date)
        .getAll();
      return `${w2} ${d3} ${m4}, ${y1}`;
    },
  },

  methods: {
    goToHomeworkReview() {
      this.$router.push({
        name: "AssessmentSummaryReview",
        params: { id: this.homework.class_id, assessment_id: this.homework.id },
        query: { title: this.homework.title },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
