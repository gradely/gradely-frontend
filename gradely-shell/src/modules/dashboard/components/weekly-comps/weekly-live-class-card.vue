<template>
  <div
    class="weekly-body weekly-by-5-columns rounded-2 white-text-bg mgb-2 position-relative pointer"
  >
    <!-- LABEL  -->
    <div
      class="label position-absolute h-100 brand-accent-bg smooth-transition"
    ></div>

    <!-- COLUMN ONE  -->
    <div class="column-one">
      <div class="avatar avatar-square brand-accent-light-bg mgr-10">
        <div class="icon icon-videocam brand-accent"></div>
      </div>

      <!-- INFO  -->
      <div class="info">
        <div
          class="title-text brand-navy font-weight-700 mgb-2 text-capitalize"
        >
          {{ live_class.title }}
        </div>
        <div class="meta-text color-grey-dark">
          {{ live_class.subject_name }}
        </div>
      </div>
    </div>

    <!-- COLUMN TWO  -->
    <div class="column-two text-truncate">{{ getDueDate }}</div>

    <!-- COLUMN THREE  -->
    <div class="column-three text-truncate">
      {{ live_class.class_name }}
    </div>

    <!-- COLUMN FOUR  -->
    <div class="column-four text-truncate">
      {{ getTeacherFullname }}
    </div>
  </div>
</template>

<script>
export default {
  name: "weeklyLiveClassCard",

  props: {
    live_class: {
      type: Object,
      default: () => ({
        id: 1,
        title: "Class title",
        subject_name: "Subject title",
        teacher_firstname: "",
        teacher_lastname: "",
        class_name: "Year 1",
        datetime: "Tues 23rd Aug. 2021",
      }),
    },
  },

  computed: {
    getDueDate() {
      let { w2, d3, m4, y1 } = this.$date
        .formatDate(this.live_class.datetime)
        .getAll();
      return `${w2} ${d3} ${m4}, ${y1}`;
    },

    getTeacherFullname() {
      return this.live_class.teacher_firstname
        ? `${this.live_class.teacher_firstname} ${this.live_class.teacher_lastname}`
        : null;
    },
  },
};
</script>

<style lang="scss" scoped></style>
