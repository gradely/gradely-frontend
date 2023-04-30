<template>
  <div>
    <!-- NAV TOP BAR -->
    <nav-top-bar
      :base_navs="base_navs"
      :account_type="account_type"
      @toggleMenu="toggleMenuPanel"
      @closeMenu="closeMenuPanel"
    />

    <!-- NAV TOP SUB BAR -->
    <nav-top-sub-bar :base_navs="base_sub_navs" :account_type="account_type" />
    <!-- v-if="account_type !== 'student'" -->

    <!-- NAV BASE BAR  -->
    <nav-base-bar
      :base_navs="base_navs"
      :base_sub_navs="base_sub_navs"
      :account_type="account_type"
    />

    <!-- NAV MENU  -->
    <nav-menu
      v-if="show_menu"
      :account_type="account_type"
      @showSwitchModal="toggleSwitchModal"
    />

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_switch_modal">
        <switch-mode-modal @closeTriggered="toggleSwitchModal" />
      </transition>

      <transition name="fade" v-if="show_setup_modal">
        <quick-setup-modal
          @bookAMeeting="toggleBookMeeting"
          @toggleTeacherModal="toggleInviteTeachers"
          @closeTriggered="toggleSetupModal"
        />
      </transition>

      <transition name="fade" v-if="show_book_meeting">
        <book-meeting-modal @closeTriggered="toggleBookMeeting" />
      </transition>

      <transition name="fade" v-if="show_invite_teacher_modal">
        <invite-teachers-modal
          @toggleClass="toggleClassModal"
          @closeTriggered="toggleInviteTeachers"
        />
      </transition>

      <transition name="fade" v-if="show_class_modal">
        <class-selection-modal @closeTriggered="toggleClassModal" />
      </transition>
    </portal>
  </div>
</template>

<script>
import {
  schoolDashboard,
  schoolBase,
  teacherBase,
  userBase,
} from "@/shared/nav-routes";
import navTopBar from "@/shared/components/nav-comps/nav-top-bar";
import navTopSubBar from "@/shared/components/nav-comps/nav-top-sub-bar";

export default {
  name: "navBuild",

  components: {
    navTopBar,
    navTopSubBar,
    navMenu: () =>
      import(
        /* webpackChunkName: "nav" */ "@/shared/components/nav-comps/nav-menu"
      ),
    navBaseBar: () =>
      import(
        /* webpackChunkName: "nav" */ "@/shared/components/nav-comps/nav-base-bar"
      ),
    switchModeModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/switch-mode-modal"
      ),
    quickSetupModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/quick-setup-modal"
      ),
    bookMeetingModal: () =>
      import(
        /* webpackChunkName: 'modal' */ "@/modules/dashboard/modals/book-meeting-modal"
      ),
    inviteTeachersModal: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/invite-teachers-modal"
      ),
    classSelectionModal: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/class-selection-modal"
      ),
  },

  props: {
    account_type: String,
  },

  data: () => ({
    show_menu: false,
    base_navs: [],
    base_sub_navs: schoolBase,

    show_switch_modal: false,
    show_setup_modal: false,
    show_book_meeting: false,
    show_invite_teacher_modal: false,
    show_class_modal: false,
  }),

  watch: {
    account_type: {
      handler(value) {
        if (value) this.structureAppRoute();
      },
      immediate: true,
    },
  },

  created() {
    this.structureAppRoute(); // STRUCTURE NAV ROUTE

    this.$bus.$on("show-menu", this.toggleMenuPanel);
    this.$bus.$on("close-menu", this.closeMenuPanel);

    this.$bus.$on("show-setup-menu", this.toggleSetupModal);
  },

  methods: {
    structureAppRoute() {
      if (this.account_type === "school") {
        this.base_navs = schoolDashboard;
        this.base_sub_navs = schoolBase;
      } else if (this.account_type === "teacher")
        this.base_navs = this.base_sub_navs = teacherBase;
      else if (
        this.account_type === "parent" ||
        this.account_type === "student"
      )
        this.base_navs = this.base_sub_navs = userBase;
    },

    toggleBookMeeting() {
      this.show_switch_modal = false;
      this.show_book_meeting = !this.show_book_meeting;
    },

    toggleInviteTeachers() {
      this.show_switch_modal = false;
      this.show_invite_teacher_modal = !this.show_invite_teacher_modal;
    },

    toggleClassModal() {
      this.show_class_modal = !this.show_class_modal;
    },

    toggleSwitchModal() {
      this.show_switch_modal = !this.show_switch_modal;
    },

    toggleSetupModal() {
      this.show_setup_modal = !this.show_setup_modal;
    },

    toggleMenuPanel() {
      this.show_menu = !this.show_menu;
    },

    closeMenuPanel() {
      this.show_menu = false;
    },
  },
};
</script>

<style></style>
