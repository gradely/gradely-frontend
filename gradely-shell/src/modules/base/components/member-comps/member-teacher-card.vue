<template>
  <div
    class="
      member-teacher-card
      position-relative
      white-text-bg
      rounded-5
      mgb-6
      smooth-transition
      pointer
    "
    @click="goToTeacherProfile"
  >
    <!-- HOVER LABEL  -->
    <div
      class="label position-absolute h-100 brand-accent-bg smooth-transition"
    ></div>

    <!-- LEFT  -->
    <div class="left">
      <div class="avatar rounded-8">
        <img
          v-lazy="teacher.image"
          :alt="$string.getStringInitials(teacher.full_name)"
          v-if="teacher.image"
          class="avatar-img"
        />
        <div
          v-else
          class="avatar-text white-text"
          :class="$color.getProfileBgColor(teacher.full_name)"
        >
          {{ $string.getStringInitials(teacher.full_name) }}
        </div>
      </div>

      <!-- TEACHER INFO  -->
      <div class="info">
        <div class="name font-weight-600 color-text mgb-3 text-capitalize">
          {{ teacher.full_name }}
        </div>
        <div class="subjects color-grey-dark">{{ getSubjectList }}</div>
      </div>
    </div>

    <!-- RIGHT  -->
    <div class="right position-relative">
      <div
        class="avatar rounded-7 pointer ignore"
        @click="toggleOptions"
        v-on-clickaway="hideOptions"
      >
        <div class="icon icon-ellipsis-h border-grey-dark ignore"></div>
      </div>

      <!-- DROPDOWN  -->
      <div
        class="
          dropdown
          rounded-5
          box-shadow-effect
          smooth-transition smooth-animation
          white-text-bg
          ignore
        "
        v-if="show_more_option"
      >
        <router-link
          :to="{
            name: 'TeacherProfile',
            params: { teacher_id: teacher.id },
            query: { name: teacher.full_name },
          }"
          class="item ignore"
        >
          <div class="icon-cover ignore">
            <div class="icon icon-user-outline ignore"></div>
          </div>
          <div class="ignore">View Profile</div>
        </router-link>

        <div class="item ignore" @click="toggleRemoveTeacher">
          <div class="icon-cover ignore">
            <div class="icon icon-trash ignore"></div>
          </div>
          <div class="ignore">Remove from Class</div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_remove_teacher_modal">
        <remove-teacher-modal
          :teacher="teacher"
          @closeTriggered="toggleRemoveTeacher"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "memberTeacherCard",

  components: {
    removeTeacherModal: () =>
      import(
        /* webpackChunkName: "removeTeacherModal" */ "@/modules/base/modals/members/remove-teacher-modal"
      ),
  },

  props: {
    teacher: {
      type: Object,
      default: () => ({
        id: 1,
        full_name: "Alice Jones",
        image: null,
        teacherSubjects: [],
      }),
    },
  },

  computed: {
    getSubjectList() {
      let subjects = [];
      this.teacher.teacherSubjects.map((subject) =>
        subjects.push(subject.name)
      );

      if (subjects.length > 1) {
        if (subjects.length > 5)
          return `${subjects.slice(0, 5).join(", ")} ...`;
        else return subjects.join(", ");
      } else if (subjects.length === 1) return subjects[0];
      else return "No subject assigned yet!";
    },
  },

  data: () => ({
    show_more_option: false,
    show_remove_teacher_modal: false,
  }),

  methods: {
    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    toggleRemoveTeacher() {
      this.show_remove_teacher_modal = !this.show_remove_teacher_modal;
    },

    goToTeacherProfile($event) {
      if (!$event.target.classList.contains("ignore"))
        this.$router.push({
          name: "TeacherProfile",
          params: { teacher_id: this.teacher.id },
          query: { name: this.teacher.full_name },
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.member-teacher-card {
  @include flex-row-between-nowrap;
  padding: toRem(14);
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);

  @include breakpoint-down(lg) {
    padding: toRem(12);
  }

  @include breakpoint-down(xs) {
    padding: toRem(10) toRem(8);
  }

  .label {
    left: 0;
    top: 0;
    width: toRem(2);
    border-radius: toRem(5) 0 0 toRem(5);
    display: none;
  }

  &:hover {
    background: rgba($white-text, 0.6) !important;

    .label {
      display: unset;
    }
  }

  .left {
    @include flex-row-start-nowrap;

    .avatar {
      @include square-shape(40);
      margin-right: toRem(13);

      @include breakpoint-down(lg) {
        @include square-shape(42);
        margin-right: toRem(12);
      }

      @include breakpoint-down(md) {
        @include square-shape(40);
      }

      @include breakpoint-down(sm) {
        @include square-shape(38);
        margin-right: toRem(10);
      }

      .avatar-text {
        font-size: toRem(11.75);

        @include breakpoint-down(xs) {
          font-size: toRem(11.5);
        }
      }
    }

    .name {
      @include font-height(12.75, 18);

      @include breakpoint-down(xs) {
        @include font-height(12, 16);
      }
    }

    .subjects {
      @include font-height(11.75, 16);

      @include breakpoint-down(sm) {
        @include font-height(11.25, 15);
      }

      @include breakpoint-down(xs) {
        @include font-height(10.5, 14);
      }
    }
  }

  .right {
    .avatar {
      @include square-shape(30);
      background: rgba($border-grey, 0.4);

      .icon {
        @include center-placement;
        font-size: toRem(18.5);
      }

      &:hover {
        background: $brand-inverse-light;
      }
    }
  }
}
</style>
