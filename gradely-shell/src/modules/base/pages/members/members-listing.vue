<template>
  <div class="page-container">
    <div class="title-row smooth-animation">
      <!-- LEFT -->
      <div class="left">
        <!-- TITLE -->
        <div class="title font-weight-600 color-text">
          Members <span class="font-weight-400"></span>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="right d-flex justify-content-end">
        <template v-if="getCurrentRoute === 'students'">
          <button class="btn btn-accent" @click="toggleInviteStudent">
            <div class="icon icon-plus"></div>
            <div class="text">Student</div>
          </button>
        </template>

        <template v-if="getCurrentRoute === 'teachers'">
          <button class="btn btn-accent" @click="toggleAssignTeacher">
            <div class="icon icon-plus"></div>
            <div class="text">Teacher</div>
          </button>
        </template>
      </div>
    </div>

    <!-- PAGE TAB  -->
    <template v-if="account_type === 'school'">
      <page-tab-switcher
        :tabs="tabs"
        @updateAssessmentView="assessment_view = $event"
      />
    </template>

    <!-- MEMBERS -->
    <div class="member-container smooth-animation">
      <transition name="fade" mode="out-in">
        <component :is="members_view"></component>
      </transition>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_invite_student_modal">
        <invite-students-modal
          :school_id="getSchoolID"
          :class_id="getClassID"
          :class_code="getClassCode"
          @closeTriggered="toggleInviteStudent"
        />
      </transition>

      <transition name="fade" v-if="show_assign_teacher_modal">
        <assign-teacher-class-modal
          @closeTriggered="toggleAssignTeacher"
          @inviteTeacher="toggleTeacherInvite"
        />
      </transition>

      <transition name="fade" v-if="show_invite_teacher_modal">
        <invite-teachers-modal @closeTriggered="toggleTeacherInvite" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageTabSwitcher from "@/modules/base/components/assessment-comps/page-tab-switcher";

export default {
  name: "membersListing",

  components: {
    pageTabSwitcher,
    memberStudents: () =>
      import(
        /* webpackChunkName: "member" */ "@/modules/base/components/member-comps/member-students"
      ),
    memberTeachers: () =>
      import(
        /* webpackChunkName: "member" */ "@/modules/base/components/member-comps/member-teachers"
      ),
    inviteStudentsModal: () =>
      import(
        /* webpackChunkName: "inviteStudentsModal" */ "@/modules/base/modals/members/invite-students-modal"
      ),
    assignTeacherClassModal: () =>
      import(
        /* webpackChunkName: "assignTeacherClassModal" */ "@/modules/base/modals/members/assign-teacher-class-modal"
      ),
    inviteTeachersModal: () =>
      import(
        /* webpackChunkName: "inviteTeachersModal" */ "@/modules/dashboard/modals/invite-teachers-modal"
      ),
  },

  computed: {
    ...mapGetters({ getSelectedClass: "general/getSelectedClass" }),

    getCurrentRoute() {
      let route_data = this.$route.path.split("/");

      if (route_data.includes("students")) return "students";
      else if (route_data.includes("teachers")) return "teachers";
      else return "students";
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

  data: () => ({
    account_type: null,
    members_view: "memberStudents",
    show_invite_student_modal: false,
    show_invite_teacher_modal: false,
    show_assign_teacher_modal: false,

    tabs: [
      { title: "Students", route: "GradelyStudents" },
      { title: "Teachers", route: "GradelyTeachers" },
    ],
  }),

  watch: {
    $route: {
      handler() {
        this.members_view = this.setupMembersView();
      },
      immediate: true,
    },
  },

  mounted() {
    this.account_type = this.getAuthType;
  },

  methods: {
    setupMembersView() {
      let route_data = this.$route.path.split("/");

      if (route_data.includes("students")) return "memberStudents";
      else if (route_data.includes("teachers")) return "memberTeachers";
      else return "memberStudents";
    },

    toggleInviteStudent() {
      this.show_invite_student_modal = !this.show_invite_student_modal;
    },

    toggleAssignTeacher() {
      this.show_assign_teacher_modal = !this.show_assign_teacher_modal;
    },

    toggleTeacherInvite() {
      this.show_assign_teacher_modal = false;
      this.show_invite_teacher_modal = !this.show_invite_teacher_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  margin-bottom: toRem(40);

  .right {
    .btn {
      padding: toRem(11.5) toRem(26);

      @include breakpoint-down(sm) {
        @include square-shape(32);
        padding: toRem(11);
      }

      .icon {
        font-size: toRem(17);
        margin-right: toRem(5);

        @include breakpoint-down(sm) {
          margin-right: 0;
        }
      }

      .text {
        font-size: toRem(10.5);

        @include breakpoint-down(sm) {
          display: none;
        }
      }
    }
  }
}
</style>
