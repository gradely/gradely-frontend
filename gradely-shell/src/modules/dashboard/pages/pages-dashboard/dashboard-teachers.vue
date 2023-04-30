<template>
  <div class="gradely-app-container topnav-offset">
    <div
      class="
        gradely-container
        px-2 px-sm-3 px-md-4 px-xl-5
        mx-auto
        smooth-animation
      "
    >
      <!-- TOP ROW  -->
      <div class="top-row">
        <!-- LEFT  -->
        <div class="left color-text font-weight-600">Teachers</div>

        <!-- RIGHT  -->
        <div class="right">
          <div
            class="filter rounded-30 smooth-transition pointer mgr-10"
            @click="toggleFilter"
          >
            <div class="avatar mgr-3">
              <div class="icon icon-filter-lines smooth-transition"></div>
            </div>
            <div class="text smooth-transition">Filter</div>
          </div>

          <!-- ADD TEACHERS  -->
          <button
            class="btn btn-accent add-new"
            title="Invite Teachers"
            @click="toggleInviteTeachers"
          >
            <div class="icon icon-plus"></div>
            <div class="text">Invite Teachers</div>
          </button>
        </div>
      </div>

      <!-- STUDENT SELECTION ROW  -->
      <teacher-selection-row
        v-if="show_filter"
        @filterChange="processFilterChanges($event)"
      />

      <!-- TEACHER CARD ROWS  -->
      <div class="teacher-card-row mx-auto">
        <template v-if="teachers.length">
          <teacher-card
            v-for="(teacher, index) in teachers"
            :key="index"
            :teacher="teacher"
          />

          <!-- PAGINATION  -->

          <div class="w-100">
            <pagination
              v-if="pagination && pagination.pageCount > 1"
              :paging="pagination"
              @navigatePage="paginateData($event)"
            />
          </div>
        </template>

        <template v-else>
          <teacher-card-skeleton
            v-for="(_, index) in default_count_state"
            :key="index"
            :loading="loading"
          />

          <!-- EMPTY CONTENT STATE  -->
          <empty-content-state
            v-if="empty_state"
            title="No Teacher Found"
            content="No teachers found on your list at the moment!"
            :extra_content="{ has_cta: true, btn_text: 'Invite teachers' }"
            @buttonClicked="toggleInviteTeachers"
          />
        </template>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <!-- <transition name="fade" v-if="show_invitation_modal">
        <invited-teachers-modal @closeTriggered="toggleInvitationModal" />
      </transition> -->

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
import { mapActions } from "vuex";

export default {
  name: "DashboardTeachers",

  metaInfo: {
    title: "Teachers Dashboard",
  },

  components: {
    teacherCardSkeleton: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "default" */ "@/modules/dashboard/components/teacher-comps/teacher-card-skeleton"
      ),
    teacherCard: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "teacherComps" */ "@/modules/dashboard/components/teacher-comps/teacher-card"
      ),
    teacherSelectionRow: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "teacherComps" */ "@/modules/dashboard/components/teacher-comps/teacher-selection-row"
      ),
    pagination: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "pagination" */ "@/shared/components/pagination"
      ),
    // pendingTeacherAlert: () =>
    //   import(
    //     /* webpackPrefetch: true */ /* webpackChunkName: "pendingTeacherAlert" */ "@/modules/dashboard/components/teacher-comps/pending-teacher-alert"
    //   ),
    // invitedTeachersModal: () =>
    //   import(
    //     /* webpackPrefetch: true */ /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/invited-teachers-modal"
    //   ),
    inviteTeachersModal: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/invite-teachers-modal"
      ),
    classSelectionModal: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/class-selection-modal"
      ),
  },

  data: () => ({
    default_count_state: 8,
    loading: true,
    empty_state: false,

    teachers: [],
    pagination: {
      pageCount: 0,
    },

    url_suffix: {
      page: 1,
      search: false,
    },

    pending_teachers: [],

    show_invite_teacher_modal: false,
    show_class_modal: false,
    show_invitation_modal: false,
    show_pending_teachers: false,
    show_filter: false,
  }),

  created() {
    this.$bus.$on("reloadState", () => this.loadSchoolTeachers());
  },

  mounted() {
    this.loadSchoolTeachers();
    // this.checkTeacherPendingList();
  },

  methods: {
    ...mapActions({
      getTeachers: "dbTeacher/getSchoolTeachers",
      getPendingTeachers: "dbTeacher/getSchoolPendingTeachers",
    }),

    // LOAD SCHOOL TEACHERS
    loadSchoolTeachers() {
      this.setupActiveState(true, false, [], {});

      this.getTeachers(this.url_suffix)
        .then((response) => {
          if (response.code === 200)
            this.setupActiveState(
              false,
              false,
              response.data,
              response.pagination,
              true
            );
          // EMPTY RESPONSE
          else if (response.code === 204) {
            this.$bus.$emit("show_response_alert", {
              message: "No teacher invited yet!",
              type: "success",
            });
            this.setupActiveState();
          }
          // 4** AND 5** RESPONSE
          else this.setupActiveState();
        })
        .catch(() => this.setupActiveState());
    },

    // SETUP ACTIVE STATE
    setupActiveState(
      loading = false,
      empty = true,
      state = [],
      paging = {},
      check_length = false
    ) {
      this.loading = loading;
      this.empty_state = empty;
      this.teachers = state;
      this.pagination = paging;

      // CHECK STUDENTS LENGTH
      if (check_length) {
        if (this.teachers.length === 0) {
          this.loading = false;
          this.empty_state = true;
        }
      }
    },

    // PROCESS FILTER CHANGES
    processFilterChanges(filter) {
      this.url_suffix.subject = filter.selected_subject;
      this.url_suffix.teacher_info = filter.teacher_info;
      this.url_suffix.class_id = filter.selected_class;
      this.url_suffix.search = true;

      this.loadSchoolTeachers();
    },

    // PAGINATE TEACHER DATA
    paginateData(page) {
      this.url_suffix.page = page;
      this.url_suffix.search = true;
      this.loadSchoolTeachers();
    },

    // CHECK TEACHER PENDING LIST
    checkTeacherPendingList() {
      this.pending_teachers = [];
      this.show_pending_teachers = false;

      this.getPendingTeachers()
        .then((response) => {
          // console.log("PENDING TEACHERS", response);
          this.pending_teachers = response.data;
          this.show_pending_teachers = response.data.length ? true : false;
        })
        .catch(() => {
          this.pending_teachers = [];
          this.show_pending_teachers = false;
        });
    },

    // ADD TEACHERS MODAL
    toggleInviteTeachers() {
      this.show_invite_teacher_modal = !this.show_invite_teacher_modal;
    },

    toggleClassModal() {
      this.show_class_modal = !this.show_class_modal;
    },

    // TOGGLE INVITATION MODAL
    toggleInvitationModal() {
      this.show_invitation_modal = !this.show_invitation_modal;
    },

    // TOGGLE PENDING MODAL
    togglePendingTeachers() {
      this.show_pending_teachers = !this.show_pending_teachers;
    },

    toggleFilter() {
      this.show_filter = !this.show_filter;
    },
  },
};
</script>

<style lang="scss" scoped>
.top-row {
  @include flex-row-between-nowrap;
  margin-top: toRem(20);
  margin-bottom: toRem(35);

  @include breakpoint-down(sm) {
    margin-top: toRem(15);
    margin-bottom: toRem(25);
  }

  .left {
    @include font-height(28, 35);

    @include breakpoint-down(xl) {
      @include font-height(24, 34);
    }

    @include breakpoint-down(lg) {
      @include font-height(22, 32);
    }

    @include breakpoint-down(md) {
      @include font-height(21, 30);
    }

    @include breakpoint-down(sm) {
      @include font-height(20.5, 30);
    }

    @include breakpoint-down(xs) {
      @include font-height(19, 30);
    }
  }

  .right {
    @include flex-row-end-nowrap;

    .filter {
      padding: toRem(8.5) toRem(14);

      @include breakpoint-down(sm) {
        padding: toRem(6) toRem(12) !important;
      }

      @include breakpoint-down(xs) {
        padding: toRem(3) toRem(12) !important;
      }
    }

    .add-new {
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

.teacher-card-row {
  position: relative;
  width: 101.5%;
  left: -0.6%;
  @include flex-row-start-wrap;
}
</style>
