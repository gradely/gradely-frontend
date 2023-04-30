<template>
  <div class="position-relative d-flex justify-content-start w-100">
    <div class="spacer"></div>

    <div class="starter-todo-list padded-area pdt-0 w-100">
      <!-- TODOS  -->
      <div class="todos" v-if="loadTodoType.length">
        <div
          class="todo w-100 rounded-10 smooth-transition pointer"
          v-for="(todo, index) in loadTodoType"
          :key="index"
          @click="openTodo(index)"
        >
          <div class="add-box">
            <div class="icon icon-plus"></div>
          </div>

          <div class="title color-text">{{ todo.text }}</div>
        </div>
      </div>

      <!-- HELP SUPPORT BLOCK -->
      <help-support-block />
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_add_class_modal">
        <teacher-add-class-modal
          @closeTriggered="toggleAddClassModal"
          @show_invite_school="toggleInviteSchoolModal"
          @show_find_class="toggleFindClassModal"
        />
      </transition>

      <transition name="fade" v-if="show_find_class_modal">
        <find-class-modal @closeTriggered="toggleFindClassModal" />
      </transition>

      <transition name="fade" v-if="show_invite_school_modal">
        <invite-school-modal @closeTriggered="toggleInviteSchoolModal" />
      </transition>

      <transition name="fade" v-if="show_invite_student_modal">
        <invite-students-modal
          :school_id="getSchoolID"
          :class_id="getClassID"
          :class_code="getClassCode"
          @closeTriggered="toggleInviteStudent"
        />
      </transition>

      <transition name="fade" v-if="show_invite_teacher_modal">
        <invite-teachers-modal @closeTriggered="toggleTeacherInvite" />
      </transition>

      <transition name="fade" v-if="show_create_assessment_modal">
        <create-assessment-modal @closeTriggered="toggleCreateAssessment" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "starterTodoList",

  components: {
    teacherAddClassModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/teacher-add-class-modal"
      ),
    findClassModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/find-class-modal"
      ),
    inviteSchoolModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/invite-school-modal"
      ),
    inviteStudentsModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/members/invite-students-modal"
      ),
    inviteTeachersModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/invite-teachers-modal"
      ),
    createAssessmentModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/assessments/create-assessment-modal"
      ),
    helpSupportBlock: () =>
      import(
        /* webpackChunkName: "FeedEntry" */ "@/modules/base/components/feed-comps/post-block-comps/help-support-block"
      ),
  },

  computed: {
    ...mapGetters({
      getTeacherClassList: "general/getTeacherClassList",
      getSelectedClass: "general/getSelectedClass",
    }),

    loadTodoType() {
      if (this.getAuthType === "school") return this.school_todo;
      else if (this.getAuthType === "teacher") return this.teacher_todo;
      else return [];
    },

    getSchoolID() {
      if (this.getAuthType === "school")
        return Number(this.getAuthUser.school_id);
      if (this.getSelectedClass.school_id)
        return Number(this.getSelectedClass.school_id);
      return "";
    },

    getClassID() {
      if (this.getAuthType === "teacher") return this.$route.params.id;
      return "";
    },

    getClassCode() {
      return this.getSelectedClass?.class_code;
    },
  },

  watch: {
    getTeacherClassList: {
      handler(value) {
        this.teacher_todo[0].status = value?.classes.length ? true : false;
      },
    },
  },

  data: () => ({
    show_invite_student_modal: false,
    show_invite_teacher_modal: false,
    show_create_assessment_modal: false,

    show_add_class_modal: false,
    show_find_class_modal: false,
    show_invite_school_modal: false,

    school_todo: [
      {
        status: false,
        text: "Add teachers to this class",
      },
    ],

    teacher_todo: [
      {
        status: false,
        text: "Invite your students",
      },
    ],
  }),

  methods: {
    toggleAddClassModal() {
      this.show_add_class_modal = !this.show_add_class_modal;
    },

    toggleFindClassModal() {
      this.show_find_class_modal = !this.show_find_class_modal;
    },

    toggleInviteSchoolModal() {
      this.show_invite_school_modal = !this.show_invite_school_modal;
    },

    toggleInviteStudent() {
      this.show_invite_student_modal = !this.show_invite_student_modal;
    },

    toggleTeacherInvite() {
      this.show_invite_teacher_modal = !this.show_invite_teacher_modal;
    },

    toggleCreateAssessment() {
      this.show_create_assessment_modal = !this.show_create_assessment_modal;
    },

    openTodo(index) {
      // SCHOOL ACCOUNT
      if (this.getAuthType === "school") this.toggleTeacherInvite();
      // TEACHER ACCOUNT
      else if (this.getAuthType === "teacher") this.toggleInviteStudent();
    },
  },
};
</script>

<style lang="scss" scoped>
.starter-todo-list {
  margin-top: toRem(-5);

  .title-text {
    font-weight: 600;
    @include font-height(13.75, 18);
    margin-bottom: toRem(5);

    @include breakpoint-down(xl) {
      @include font-height(12.5, 18);
    }

    @include breakpoint-down(xs) {
      @include font-height(12, 17);
    }
  }

  .todos {
    margin-bottom: toRem(15);

    .todo {
      border: 1px dashed $brand-accent;
      background: $brand-accent-light;
      @include flex-row-start-nowrap;
      padding: toRem(13) toRem(16);

      &:hover {
        background: $brand-inverse-light;
        border: 1px dashed $brand-inverse;
      }

      @include breakpoint-down(xs) {
        padding: toRem(16);
      }

      .add-box {
        position: relative;
        @include square-shape(32);
        margin-right: toRem(13);
        border: toRem(1) solid $brand-accent;
        border-radius: toRem(5);

        .icon {
          @include center-placement;
          font-size: toRem(15);
          color: $brand-accent;
        }
      }

      .complete {
        border: toRem(1) solid $brand-inverse;
        background: $brand-inverse;

        .icon {
          font-size: toRem(13);
          color: $white-text;

          @include breakpoint-down(xl) {
            font-size: toRem(12);
          }
        }
      }

      .title {
        @include font-height(12, 15);
        @include transition(0.4s);
      }
    }
  }
}
</style>
