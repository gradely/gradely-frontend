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
      <title-top-row
        title="Students"
        :counter="total_students"
        show_counter
        show_filter
        @toggleFilter="showFilter"
        @inviteTeachers="toggleInviteStudentModal"
      />

      <!-- STUDENT SELECTION ROW  -->
      <student-selection-row
        v-if="show_filter"
        @filterChange="processFilterChanges($event)"
      />

      <!-- ACTIVATE ALERT  -->
      <activate-student-alert v-if="students.length" />

      <!-- TEACHER CARD ROWS  -->
      <div class="mx-auto">
        <template v-if="students.length">
          <student-table-header />
          <student-table-body
            :student="student"
            v-for="(student, index) in students"
            :key="index"
          />

          <!-- PAGINATION  -->
          <pagination
            v-if="pagination && pagination.pageCount > 1"
            :paging="pagination"
            @navigatePage="paginateData($event)"
          />
        </template>

        <template v-else>
          <div class="position-relative">
            <student-table-skeleton
              v-for="(_, index) in default_count_state"
              :key="index"
              :loading="loading"
            />

            <!-- EMPTY CONTENT STATE  -->
            <empty-content-state
              v-if="empty_state"
              title="No Student Found"
              content="No students found on your list at the moment!"
              :extra_content="{ has_cta: true, btn_text: 'Invite students' }"
              @buttonClicked="toggleInviteStudentModal"
            />
          </div>
        </template>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_invite_student_modal">
        <invite-students-modal
          :school_id="getAuthUser.school_id"
          :classes="extractedSchoolClasses"
          @closeTriggered="toggleInviteStudentModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import titleTopRow from "@/modules/dashboard/components/student-comps/title-top-row";

export default {
  name: "DashboardStudents",

  metaInfo: {
    title: "Students Dashboard",
  },

  components: {
    titleTopRow,
    studentSelectionRow: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "studententry" */ "@/modules/dashboard/components/student-comps/student-selection-row"
      ),
    studentTableHeader: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "studententry" */ "@/modules/dashboard/components/student-comps/student-table-header"
      ),
    studentTableSkeleton: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "default" */ "@/modules/dashboard/components/student-comps/student-table-skeleton"
      ),
    pagination: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "pagination" */ "@/shared/components/pagination"
      ),
    activateStudentAlert: () =>
      import(
        /* webpackChunkName: "studententry" */ "@/modules/dashboard/components/student-comps/activate-student-alert"
      ),
    studentTableBody: () =>
      import(
        /* webpackChunkName: "studententry" */ "@/modules/dashboard/components/student-comps/student-table-body"
      ),
    inviteStudentsModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/members/invite-students-modal"
      ),
  },

  computed: {
    ...mapGetters({
      getSchoolClasses: "dbHome/getSchoolClasses",
    }),

    extractedSchoolClasses() {
      let classes = [];
      !this.getSchoolClasses.length ? this.fetchSchoolClasses() : null;

      this.getSchoolClasses.forEach((level) => {
        level.classes.forEach((arm) => classes.push(this.createClass(arm)));
      });
      return classes;
    },
  },

  data: () => ({
    show_filter: false,

    default_count_state: 7,
    loading: true,
    empty_state: false,

    students: [],
    total_students: 0,
    pagination: {
      pageCount: 0,
    },

    url_suffix: {
      page: 1,
    },

    show_invite_student_modal: false,
  }),

  created() {
    this.$bus.$on("reloadSchoolStudents", () => this.fetchAllSchoolStudents());
  },

  mounted() {
    this.fetchAllSchoolStudents();
  },

  methods: {
    ...mapActions({
      getSchoolStudent: "dbStudent/getSchoolStudentList",
      fetchSchoolClasses: "dbHome/getSchoolClasses",
    }),

    showFilter() {
      this.show_filter = !this.show_filter;
    },

    toggleInviteStudentModal() {
      this.show_invite_student_modal = !this.show_invite_student_modal;
    },

    createClass(level) {
      return {
        id: level.id,
        name: level.class_name,
        class_code: level.class_code,
      };
    },

    // FETCH ALL SCHOOL STUDENTS
    fetchAllSchoolStudents() {
      this.setupActiveState(true, false, [], 0, {});

      this.getSchoolStudent(this.url_suffix)
        .then((response) => {
          // console.log(response);

          if (response.code === 200)
            this.setupActiveState(
              false,
              false,
              response.data.students,
              response.pagination.totalCount,
              response.pagination,
              true
            );
          // EMPTY RESPONSE
          else if (response.code === 204) {
            this.pushAlert("No student added yet!", "success");
            this.setupActiveState();
          }
          // 4** AND 5** RESPONSE
          else {
            this.pushAlert(
              "An error occured while loading student data",
              "error"
            );

            this.setupActiveState();
          }
        })
        .catch(() => this.setupActiveState());
    },

    // SETUP STUDENT ACTIVE STATE
    setupActiveState(
      loading = false,
      empty = true,
      state = [],
      total = 0,
      paging = {},
      check_length = false
    ) {
      this.loading = loading;
      this.empty_state = empty;
      this.students = state;
      this.total_students = total;
      this.pagination = paging;

      // CHECK STUDENTS LENGTH
      if (check_length) {
        if (this.students.length === 0) {
          this.loading = false;
          this.empty_state = true;
        }
      }
    },

    // PROCESS FILTER CHANGES
    processFilterChanges(filter) {
      this.url_suffix.license = filter.selected_license;
      this.url_suffix.student_info = filter.student_info;
      this.url_suffix.class_id = filter.selected_class;
      this.url_suffix.search = true;

      this.fetchAllSchoolStudents();
    },

    // RESET FILTERS
    resetSearchFilters() {
      this.url_suffix = { page: 1 };
    },

    paginateData(page) {
      this.resetSearchFilters(); //RESET FILTERS
      this.url_suffix.page = page;
      this.url_suffix.search = true;

      this.fetchAllSchoolStudents();
    },
  },
};
</script>

<style lang="scss" scoped></style>
