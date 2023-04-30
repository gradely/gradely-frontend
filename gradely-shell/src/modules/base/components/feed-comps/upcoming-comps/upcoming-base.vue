<template>
  <div class="upcoming-base">
    <!-- CALENDAR  -->
    <router-link
      :to="{ name: 'GradelyCalendar' }"
      class="calendar"
      v-if="isSchoolTeacher"
    >
      <div class="avatar">
        <div class="icon icon-calendar brand-accent"></div>
      </div>

      <div class="calendar-link off-white smooth-transition">See Calendar</div>
    </router-link>

    <!-- ASSIGNED TEACHERS SECTION -->
    <div class="assigned-teachers-section" v-if="getAuthType === 'school'">
      <div class="title-text border-grey font-weight-600">
        ASSIGNED TEACHERS
      </div>

      <!-- TEACHER LIST -->
      <div class="teacher-row">
        <router-link
          :to="{
            name: 'TeacherProfile',
            params: { teacher_id: teacher.id },
            query: { name: teacher.full_name },
          }"
          class="avatar teacher-avatar smooth-transition"
          :class="$color.getProfileBgColor(teacher.full_name)"
          :title="teacher.full_name"
          v-for="(teacher, index) in teacher_list"
          :key="index"
        >
          <img
            v-lazy="teacher.image"
            alt=""
            class="avatar-img"
            v-if="teacher.image"
          />

          <div
            v-else
            class="avatar-text"
            :class="$color.getProfileBgColor(teacher.full_name)"
          >
            {{ $string.getStringInitials(teacher.full_name) }}
          </div>
        </router-link>

        <!-- ADD TEACHER  -->
        <div
          class="teacher-avatar add-teacher smooth-transition"
          title="Add Teacher"
          @click="toggleAssignTeacher"
        >
          <div class="icon icon-plus smooth-transition"></div>
        </div>
      </div>
    </div>

    <!-- CHANGE STUDENT MODE SECTION -->
    <div class="change-student-mode mgt-7" v-if="isParentStudent">
      <div class="title-text border-grey font-weight-600">CURRENT MODE</div>

      <!-- MODE ROW -->
      <div class="mode-row">
        <div class="left">
          <div class="mode-card position-relative rounded-7 brand-red-light-bg">
            <img v-lazy="mxStaticImg('Path.svg')" alt="" />
          </div>

          <!-- DISPLAY MODE -->
          <div class="mode-text border-grey font-weight-500 text-capitalize">
            {{ getStudentMode ? getStudentMode + " Mode" : "No mode selected" }}
          </div>
        </div>

        <div
          class="right pointer smooth-transition"
          title="Switch mode"
          @click="toggleSwitchMode"
        >
          <div class="icon icon-control"></div>
        </div>
      </div>
    </div>

    <!-- CLASS CODE VIEW BLOCK -->
    <template>
      <class-code-block :key="$string.generateRandomString(10)" />
    </template>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_assign_teacher_modal">
        <assign-teacher-class-modal
          @closeTriggered="toggleAssignTeacher"
          @inviteTeacher="toggleInviteTeachers"
        />
      </transition>

      <transition name="fade" v-if="show_invite_teacher_modal">
        <invite-teachers-modal @closeTriggered="toggleInviteTeachers" />
      </transition>

      <transition name="fade" v-if="show_mode">
        <switch-mode-modal @closeTriggered="toggleSwitchMode" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import classCodeBlock from "@/modules/base/components/feed-comps/upcoming-comps/class-code-block";

export default {
  name: "upcomingBase",

  components: {
    classCodeBlock,
    assignTeacherClassModal: () =>
      import(
        /* webpackChunkName: "assignTeacherClassModal" */ "@/modules/base/modals/members/assign-teacher-class-modal"
      ),
    inviteTeachersModal: () =>
      import(
        /* webpackChunkName: "inviteTeachersModal" */ "@/modules/dashboard/modals/invite-teachers-modal"
      ),
    switchModeModal: () =>
      import(
        /* webpackChunkName: "switchModeModal" */ "@/shared/modals/switch-mode-modal"
      ),
  },

  computed: {
    isSchoolTeacher() {
      return this.getAuthType === "school" || this.getAuthType === "teacher"
        ? true
        : false;
    },

    isParentStudent() {
      return this.getAuthType === "parent" || this.getAuthType === "student"
        ? true
        : false;
    },

    getStudentMode() {
      return this.getAuthUser.mode;
    },
  },

  watch: {
    $route: {
      handler(value) {
        if (this.getAuthType === "school")
          value.params.id
            ? this.fetchCurrentClassTeacher()
            : (this.teacher_list = []);
      },
      immediate: true,
    },

    getAuthUser: {
      handler(value) {
        this.getAuthType === "student" ? (this.mode = value.mode) : null;
      },
      immediate: true,
    },
  },

  data: () => ({
    show_assign_teacher_modal: false,
    show_invite_teacher_modal: false,
    show_mode: false,

    teacher_list: [],
    mode: "",
  }),

  created() {
    this.$bus.$on("loadCurrentChild", (child_data) => {
      // console.log(child_data);
      this.mode = child_data.mode;
    });

    this.$bus.$on("reloadTeacherInClass", () => {
      this.fetchCurrentClassTeacher();
    });
  },

  methods: {
    ...mapActions({
      getTeachersInClass: "general/getTeachersInClass",
    }),

    // FETCH ALL CURRENT CLASS TEACHERS
    fetchCurrentClassTeacher() {
      this.teacher_list = []; // EMPTY TEACHER LIST

      this.getTeachersInClass(this.$route.params.id)
        .then((response) => {
          this.teacher_list = response.code === 200 ? response.data : [];
        })
        .catch(() =>
          this.pushAlert(
            "An error occured while loading class teachers data",
            "error"
          )
        );
    },

    // ADD TEACHERS MODAL
    toggleAssignTeacher() {
      this.show_assign_teacher_modal = !this.show_assign_teacher_modal;
    },

    toggleInviteTeachers() {
      this.show_invite_teacher_modal = !this.show_invite_teacher_modal;
    },

    toggleSwitchMode() {
      this.show_mode = !this.show_mode;
    },
  },
};
</script>

<style lang="scss" scoped>
.upcoming-base {
  margin-top: toRem(12);

  .calendar {
    @include flex-row-start-nowrap;
    width: max-content;
    margin-bottom: toRem(14);

    @include breakpoint-down(xs) {
      display: none;
    }

    .avatar {
      @include square-shape(26);
      margin-right: toRem(5);

      .icon {
        @include center-placement;
        font-size: toRem(17.5);
      }
    }

    .calendar-link {
      @include font-height(11.75, 16);
      font-weight: 600;
    }

    &:hover {
      .calendar-link {
        color: $brand-accent !important;
      }
    }
  }

  .assigned-teachers-section,
  .change-student-mode {
    margin-top: toRem(2);

    .title-text {
      @include font-height(10.85, 16);
      margin-bottom: toRem(14);

      @include breakpoint-down(xs) {
        display: none;
      }
    }

    .teacher-row {
      @include flex-row-start-wrap;

      @include breakpoint-down(xs) {
        display: none;
      }

      .teacher-avatar {
        @include square-shape(34);
        border-radius: toRem(7);
        margin-bottom: toRem(10);
        margin-right: toRem(10);
        position: relative;
        cursor: pointer;

        .avatar-text {
          font-weight: 509;
          font-size: toRem(12);
          color: $white-text;
        }
      }

      .add-teacher {
        border: toRem(1) dashed $border-grey;

        .icon {
          @include center-placement;
          font-size: toRem(16);
          color: $border-grey;
        }

        &:hover {
          border: toRem(1) dashed $brand-accent;

          .icon {
            color: $brand-accent;
          }
        }
      }
    }
  }

  .change-student-mode {
    .mode-row {
      @include flex-row-between-nowrap;
      margin-top: toRem(-2);
      margin-bottom: toRem(14);

      .left {
        @include flex-row-start-nowrap;

        .mode-card {
          @include square-shape(33);
          margin-right: toRem(10);

          img {
            @include center-placement;
            @include square-shape(26);
          }
        }

        .mode-text {
          font-size: toRem(12.25);
        }
      }
    }
  }

  .right {
    background: rgba($black-text, 0.4);
    @include square-shape(32);
    border-radius: toRem(10);
    position: relative;
    overflow: hidden;

    @include breakpoint-down(xs) {
      @include square-shape(34);
      border-radius: toRem(7) !important;
    }

    .icon {
      @include center-placement;
      font-size: toRem(15);
      color: $brand-accent;
    }

    &:hover {
      background: rgba($black-text, 0.7);
    }
  }
}
</style>
