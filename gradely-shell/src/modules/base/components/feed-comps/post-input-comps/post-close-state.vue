<template>
  <div
    class="post-close-state smooth-transition pointer"
    :class="getAuthType === 'teacher' ? 'options-state' : null"
  >
    <!-- USER AVATAR  -->
    <div class="d-flex justify-content-start align-items-center w-100">
      <div
        class="avatar avatar-square mgr-13"
        @click="$emit('switchState', 'postDiscussionState')"
      >
        <img
          v-lazy="getAuthUser.image"
          :alt="$string.getStringInitials(getAuthUser.full_name)"
          class="avatar-img"
          v-if="getAuthUser.image"
        />

        <div
          v-else
          class="avatar-text"
          :class="$color.getProfileBgColor(getAuthUser.full_name)"
        >
          {{ $string.getStringInitials(getAuthUser.full_name) }}
        </div>
      </div>

      <!-- TEXT  -->
      <div class="w-100">
        <div
          class="text rounded-15 placeholder-text"
          @click="$emit('switchState', 'postDiscussionState')"
        >
          {{ displayPlaceholder }}
        </div>
      </div>
    </div>

    <!-- POST OPTIONS  -->
    <div class="post-options w-100" v-if="getAuthType === 'teacher'">
      <div class="option-intro-text font-weight-700">CREATE A...</div>

      <!-- OPTION  -->
      <div
        class="post-option"
        @click="$emit('switchState', 'postAssessmentState')"
      >
        <div class="icon icon-library brand-inverse"></div>
        <div class="option-text">Assessment</div>
      </div>

      <!-- OPTION  -->
      <div
        class="post-option"
        @click="$emit('switchState', 'startLiveClassModal')"
      >
        <div class="icon icon-videocam brand-accent"></div>
        <div class="option-text">Live Class</div>
      </div>

      <!-- OPTION  -->
      <div class="post-option" @click="gotoLesson">
        <div class="icon icon-file-text brand-tonic"></div>
        <div class="option-text">Lesson</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { APP_BASE_URL } from "@/env";

export default {
  name: "postCloseState",

  computed: {
    ...mapGetters({ getSelectedClass: "general/getSelectedClass" }),

    displayPlaceholder() {
      if (this.getAuthType === "school") return this.placeholders.school;
      else if (this.getAuthType === "teacher") return this.placeholders.teacher;
      else if (this.getAuthType === "parent") return this.placeholders.parent;
      else if (this.getAuthType === "student") return this.placeholders.student;
      else return "Create post content...";
    },
  },

  data: () => ({
    placeholders: {
      school: "Create a general announcement",
      teacher: "Create a discussion with your student",
      parent: "Post a discussion to your child's class",
      student: "Post a discussion to your class",
    },
  }),

  methods: {
    gotoLesson() {
      // PREVIOUS ACTION RETAINED
      // $emit('switchState', 'postLessonState');

      // let global_class_id = this.getSelectedClass?.global_class_id || 8;
      let origin =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8097"
          : APP_BASE_URL;

      location.href = `${origin}/lesson?class_id=${this.$route.params.id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-close-state {
  padding: toRem(15);

  @include breakpoint-down(lg) {
    padding: toRem(14);
  }

  @include breakpoint-down(md) {
    padding: toRem(12);
  }

  @include breakpoint-down(xs) {
    padding: toRem(12) toRem(8.5);
  }

  .avatar {
    @include square-shape(38);

    .avatar-img {
      @include background-cover;
    }

    @include breakpoint-down(lg) {
      @include square-shape(34);
      margin-right: toRem(10) !important;
    }

    @include breakpoint-down(xs) {
      margin-top: toRem(2);
      margin-right: toRem(7) !important;

      .avatar-text {
        font-size: toRem(12);
      }
    }
  }

  .text {
    border: toRem(1) solid #e5e5e5;
    @include font-height(12.75, 19);
    padding: toRem(10) toRem(12);
    color: #a8a8a8;

    @include breakpoint-down(md) {
      @include font-height(12.5, 18);
    }

    @include breakpoint-down(xs) {
      @include font-height(12.5, 18);
    }
  }
}

.options-state {
  align-items: flex-start;

  .post-options {
    border-top: toRem(1) solid #e9f2f3;
    padding-top: toRem(9);
    margin: toRem(10) 0 0;

    .option-intro-text {
      color: rgba($color-grey-dark, 0.8);
      @include font-height(11.75, 16);
      margin-right: toRem(15);
      white-space: nowrap;

      @include breakpoint-down(xs) {
        display: none;
      }
    }
  }
}
</style>
