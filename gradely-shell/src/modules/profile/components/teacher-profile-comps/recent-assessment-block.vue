<template>
  <div>
    <div class="recent-assessment">
      <recent-assessment-card
        v-for="(homework, index) in homework_list"
        :key="index"
        :homework="homework"
      />
    </div>

    <!-- SEE MORE ASSESSMENT  -->
    <div
      class="assessment-link font-weight-600 btn-link smooth-transition"
      @click="showMoreHomwork"
      v-if="show_more"
    >
      See {{ text_addon }} {{ teacher_name.split(" ")[0] }}'s Assessment
    </div>
  </div>
</template>

<script>
import recentAssessmentCard from "@/modules/profile/components/teacher-profile-comps/recent-assessment-card";

export default {
  name: "recentAssessmentBlock",

  components: {
    recentAssessmentCard,
  },

  props: {
    teacher_name: String,

    teacher: {
      type: Object,
      default: () => ({
        homework: [],
      }),
    },
  },

  watch: {
    "teacher.homework": {
      handler(value) {
        if (value) this.loadHomework();
      },
      immediate: true,
    },
  },

  data() {
    return {
      base_homework_list: [],
      homework_list: [],
      shrinked: true,
      text_addon: "",
      show_more: false,
      shrink_length: 10,
    };
  },

  methods: {
    loadHomework() {
      this.base_homework_list = this.teacher.homework.slice().reverse();
      this.homework_list = this.teacher.homework.slice().reverse();

      if (this.homework_list.length > this.shrink_length) {
        this.show_more = true;
        this.text_addon = "More";
        this.homework_list = this.homework_list.slice(0, this.shrink_length);
      } else this.show_more = false;
    },

    showMoreHomwork() {
      this.shrinked = !this.shrinked;
      if (this.shrinked) {
        if (this.homework_list.length > this.shrink_length)
          this.homework_list = this.homework_list.slice(0, this.shrink_length);
        this.text_addon = "More";
      } else {
        this.homework_list = this.base_homework_list;
        this.text_addon = "Less";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.recent-assessment {
  margin-bottom: toRem(20);
}

.assessment-link {
  @include font-height(13, 18);

  @include breakpoint-down(sm) {
    @include font-height(12, 17);
  }
}
</style>
