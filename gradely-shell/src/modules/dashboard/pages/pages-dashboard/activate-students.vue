<template>
  <div class="gradely-app-container topnav-offset">
    <div class="gradely-container px-1 px-sm-3 px-md-5 px-lg-4 px-xl-5 mx-auto">
      <!-- BACK BTN  -->
      <router-link
        :to="{ name: 'DashboardStudent' }"
        class="back-btn rounded-30 smooth-transition box-shadow-effect"
        title="Back to Students"
      >
        <div class="icon icon-arrow-left mgr-5 smooth-transition"></div>
        <div class="text smooth-transition">Students</div>
      </router-link>

      <!-- TOP ROW  -->
      <title-top-row title="Activate Students" :counter="0" />

      <!-- STUDENT SELECTION ROW  -->
      <student-selection-row @filterChange="processFilterChanges($event)" />

      <!-- SELECTION COUNTER  -->
      <div class="selection-counter-row">
        <!-- SELECTION COUNT  -->
        <div class="selection-count color-grey-dark mgr-20">
          <span class="font-weight-600 count mgr-4">{{
            getStudentSelected.length
          }}</span>
          <span class="text">Students Selected</span>
        </div>

        <!-- CLEAR SELECTION  -->
        <div
          class="clear-selection pointer"
          v-if="getStudentSelected.length"
          title="Clear student selection"
          @click="clearOutSelection"
        >
          <span class="icon-close mgr-5 smooth-transition"></span>
          <div class="text smooth-transition">Clear Selection</div>
        </div>
      </div>

      <!-- TEACHER CARD ROWS  -->
      <div class="mx-auto container-block">
        <template v-if="students.length">
          <activate-student-table-header :students="students" />

          <activate-student-table-body
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
          <div class="position-relative mgb-80">
            <student-table-skeleton
              v-for="(_, index) in default_count_state"
              :key="index"
              :loading="loading"
            />

            <!-- EMPTY CONTENT STATE  -->
            <empty-content-state
              v-if="empty_state"
              title="No Student Found"
              content="There are no students found on your student list at the moment!"
            />
          </div>
        </template>
      </div>
    </div>

    <!-- ACTIVATE STUDENT BASE  -->
    <activate-student-base
      :license="license"
      :total_students="students.length"
    />

    <!-- MODALS -->
    <portal to="gradely-modals"> </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import titleTopRow from "@/modules/dashboard/components/student-comps/title-top-row";
import studentSelectionRow from "@/modules/dashboard/components/student-comps/student-selection-row";
import activateStudentTableHeader from "@/modules/dashboard/components/student-comps/activate-student-table-header";
import activateStudentBase from "@/modules/dashboard/components/student-comps/activate-student-base";
import studentTableSkeleton from "@/modules/dashboard/components/student-comps/student-table-skeleton";
import pagination from "@/shared/components/pagination";

export default {
  name: "activateStudent",

  metaInfo: {
    title: "Activate Students"
  },

  components: {
    titleTopRow,
    studentSelectionRow,
    activateStudentTableHeader,
    activateStudentBase,
    studentTableSkeleton,
    pagination,
    activateStudentTableBody: () =>
      import(
        /* webpackChunkName: "activateStudentTableBody" */ "@/modules/dashboard/components/student-comps/activate-student-table-body"
      )
  },

  computed: {
    ...mapGetters({
      getStudentSelected: "dbStudent/getStudentSelected"
    })
  },

  data: () => ({
    default_count_state: 7,
    loading: true,
    empty_state: false,

    students: [],
    pagination: {
      pageCount: 0
    },

    license: {
      basic: {
        total: 0,
        used: 0
      },
      premium: {
        total: 0,
        used: 0
      }
    },

    url_suffix: {
      page: 1
    }
  }),

  created() {
    this.$bus.$on("reloadState", () => this.fetchStudentAndClearSelection());
  },

  mounted() {
    this.fetchAllSchoolStudents();
    this.updateStudentSelection({ ids: [], bulk: true });
  },

  methods: {
    ...mapActions({
      getSchoolStudent: "dbStudent/getSchoolStudentList",
      updateStudentSelection: "dbStudent/updateStudentSelection"
    }),

    toggleFilter() {
      this.$refs.selectionRow.classList.toggle("d-none");
    },

    fetchStudentAndClearSelection() {
      this.fetchAllSchoolStudents();
      this.clearOutSelection();
    },

    clearOutSelection() {
      this.updateStudentSelection({ ids: [], bulk: true });
      this.$bus.$emit("toggleStudentSelection", false);
      this.$bus.$emit("clearOut");
    },

    // FETCH ALL SCHOOL STUDENTS
    fetchAllSchoolStudents() {
      this.setupActiveState(true, false, [], {});

      this.getSchoolStudent(this.url_suffix)
        .then(response => {
          if (response.code === 200)
            this.setupActiveState(
              false,
              false,
              response.data.students,
              response.pagination,
              response.data.license,
              true
            );
          // EMPTY RESPONSE
          else if (response.code === 204) {
            this.$bus.$emit("show_response_alert", {
              message: "No student added yet!",
              type: "success"
            });

            this.setupActiveState();
          }
          // 4** AND 5** RESPONSE
          else {
            this.$bus.$emit("show_response_alert", {
              message: "An error occured while loading student data",
              type: "error"
            });
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
      paging = {},
      license = {},
      check_length = false
    ) {
      this.loading = loading;
      this.empty_state = empty;
      this.students = state;
      this.pagination = paging;
      this.license = license;

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
    }
  }
};
</script>

<style lang="scss" scoped>
.topnav-offset {
  @include breakpoint-custom-down(450) {
    top: toRem(80) !important;
  }
}

.container-block {
  margin-bottom: toRem(260) !important;
  border: toRem(1) solid transparent;

  @include breakpoint-down(md) {
    margin-bottom: toRem(250) !important;
  }

  @include breakpoint-custom-down(548) {
    margin-bottom: toRem(310) !important;
  }
}

.back-btn {
  @include flex-row-start-nowrap;
  background: $white-text;
  width: max-content;
  padding: toRem(8) toRem(16);
  margin-bottom: 0;

  @include breakpoint-down(xl) {
    margin-bottom: toRem(-4);
    padding: toRem(6.5) toRem(13);
  }

  @include breakpoint-down(lg) {
    padding: toRem(6) toRem(12);
  }

  @include breakpoint-down(md) {
    display: none;
  }

  .icon {
    font-size: toRem(14);
    color: $brand-primary;
  }

  .text {
    color: $brand-primary;
    font-size: toRem(13);

    @include breakpoint-down(xl) {
      font-size: toRem(12.5);
    }

    @include breakpoint-down(md) {
      font-size: toRem(12);
    }
  }

  &:hover {
    background: $brand-primary;

    .icon {
      color: $white-text;
    }

    .text {
      color: $white-text;
    }
  }
}

.selection-counter-row {
  @include flex-row-start-nowrap;
  margin-bottom: toRem(20);

  @include breakpoint-down(md) {
    display: none;
  }

  .selection-count {
    .count {
      font-size: toRem(14);

      @include breakpoint-down(lg) {
        font-size: toRem(13);
      }
    }

    .text {
      font-size: toRem(12.75);

      @include breakpoint-down(md) {
        font-size: toRem(12);
      }
    }
  }

  .clear-selection {
    @include flex-row-start-nowrap;
    color: $color-ash;
    margin-top: toRem(4);

    &:hover {
      color: $brand-tonic;
    }

    .icon-close {
      font-size: toRem(13);

      @include breakpoint-down(xl) {
        font-size: toRem(12);
      }

      @include breakpoint-down(lg) {
        font-size: toRem(11.5);
        margin-top: toRem(1.75);
      }
    }

    .text {
      font-size: toRem(13);

      @include breakpoint-down(xl) {
        font-size: toRem(13);
      }

      @include breakpoint-down(md) {
        font-size: toRem(12);
      }
    }
  }
}
</style>
