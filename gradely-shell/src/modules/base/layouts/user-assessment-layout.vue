<template>
  <div class="user-assessment-layout smooth-animation">
    <!-- TOP TAB  -->
    <div class="tab-top" v-if="childInSchool">
      <!-- TAB  -->
      <router-link
        :to="{ name: tab.route }"
        class="tab smooth-transition"
        :class="tab.route_list.includes(isCurrentRoute) ? 'active-tab' : null"
        v-for="(tab, index) in tabs"
        :key="index"
      >
        <!-- ICON  -->
        <div class="avatar">
          <div class="icon smooth-transition" :class="tab.icon"></div>
        </div>

        <!-- TEXT  -->
        <div class="text-title smooth-transition">{{ tab.title }}</div>
      </router-link>
    </div>

    <!-- HISTORY VIEW WRAPPER  -->
    <div class="history-view-wrapper white-text-bg">
      <!-- TOP ROW  -->
      <div class="top-row" v-if="childInSchool">
        <div class="title-text">{{ getCurrentTitle }}</div>

        <!-- SEARCH INPUT FOR WEBVIEW -->
        <div class="search-input hide-mobile">
          <input
            type="text"
            class="form-control"
            v-model="search"
            @input="$bus.$emit('searchSchoolwork', search)"
            placeholder="Search by title, subject or teacher"
          />
          <div class="icon icon-search brand-accent"></div>
        </div>

        <!-- FILTER BUTTON  -->
        <div
          class="filter border rounded-30 smooth-transition pointer d-sm-none"
          @click="toggleFilters"
          style="width: max-content"
        >
          <div class="avatar mgr-3">
            <div class="icon icon-filter-lines smooth-transition"></div>
          </div>
          <div class="text smooth-transition select-none">Filter</div>
        </div>
      </div>

      <!-- FILTER ROW BLOCK -->
      <div class="filter-row-block" v-if="childInSchool">
        <div class="data-row smooth-transition" ref="filterRow">
          <!-- SUBJECT  -->
          <select-filter
            title="Subject"
            select_key="subject"
            :filter_list="subject_list"
          />

          <!-- TEACHER -->
          <select-filter
            v-if="!isAssessment"
            title="Teacher"
            select_key="creator"
            :filter_list="teacher_list"
          />

          <!-- TERM -->
          <select-filter
            v-if="false"
            title="Term"
            select_key="term"
            :filter_list="[
              { title: 'First', value: 'first' },
              { title: 'Second', value: 'second' },
              { title: 'Third', value: 'third' },
            ]"
          />

          <!-- TYPE -->
          <select-filter
            v-if="isAssessment"
            title="Type"
            select_key="type"
            :filter_list="[
              { title: 'Homework', value: 'homework' },
              { title: 'Exam', value: 'exam' },
              { title: 'Class Quiz', value: 'quiz' },
            ]"
          />
        </div>

        <!-- SEARCH INPUT -->
        <div class="search-input d-sm-none">
          <input
            type="text"
            class="form-control"
            v-model="search"
            @input="$bus.$emit('searchSchoolwork', search)"
            placeholder="Search by title, subject or teacher"
          />
          <div class="icon icon-search brand-accent"></div>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <router-view :key="$route.params.id" />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import selectFilter from "@/shared/components/select-filter";

export default {
  name: "userAssessmentLayout",

  components: {
    selectFilter,
  },

  computed: {
    ...mapGetters({
      getParentChildren: "general/getParentChildren",
      getChildDetails: "general/getChildClassDetails",
    }),

    isCurrentRoute() {
      return this.$route.name;
    },

    isAssessment() {
      return this.$route.name === "GradelyUserNewAssessment" ||
        this.$route.name === "GradelyUserCompletedAssessment"
        ? true
        : false;
    },

    getCurrentTitle() {
      if (
        this.$route.name === "GradelyUserNewAssessment" ||
        this.$route.name === "GradelyUserCompletedAssessment"
      )
        return this.tabs[0].title;
      else if (this.$route.name === "GradelyUserNotes")
        return this.tabs[1].title;
      else if (this.$route.name === "GradelyUserVideos")
        return this.tabs[2].title;
      else return false;
    },

    childInSchool() {
      if (this.getAuthType === "parent") {
        let active_child = this.getParentChildren.filter(
          (item) => item.id === Number(this.$route.params.id)
        );

        return active_child[0]?.user_class ? true : false;
      } else if (this.getAuthType === "student") {
        return this.getChildDetails?.class_detail?.has_school;
      }
    },
  },

  data: () => ({
    tabs: [
      {
        title: "Assessment",
        icon: "icon-library",
        route: "GradelyUserNewAssessment",
        route_list: [
          "GradelyUserNewAssessment",
          "GradelyUserCompletedAssessment",
        ],
      },
      {
        title: "Notes",
        icon: "icon-note-text",
        route: "GradelyUserNotes",
        route_list: ["GradelyUserNotes"],
      },
      {
        title: "Videos",
        icon: "icon-video-card",
        route: "GradelyUserVideos",
        route_list: ["GradelyUserVideos"],
      },
    ],

    subject_list: [],
    teacher_list: [],
    search: "",
  }),

  watch: {
    $route: {
      handler() {
        this.search = "";
      },
    },
  },

  mounted() {
    this.getClassDetailId();
  },

  methods: {
    ...mapActions({
      getChildClassDetails: "general/getChildClassDetails",
      getChildClassSubjects: "dbAssessments/getChildClassSubjects",
      getChildClassTeachers: "dbAssessments/getChildClassTeachers",
    }),

    toggleFilters() {
      this.$refs.filterRow.classList.toggle("show-filters");
    },

    getClassDetailId() {
      this.getChildClassDetails(this.$route.params.id).then((response) => {
        let class_id = response.data?.class_id;

        if (class_id) {
          this.fetchChildClassSubjects(class_id);
          this.fetchChildClassTeachers(class_id);
        }
      });
    },

    // FETCH CHILD SUBJECTS
    fetchChildClassSubjects(class_id) {
      this.getChildClassSubjects(class_id)
        .then((response) => {
          this.subject_list = response.data.map((subject) => {
            return {
              title: subject.subject_name,
              value: subject.id,
            };
          });
        })
        .catch(() => {});
    },

    // FETCH CHILD TEACHERS
    fetchChildClassTeachers(class_id) {
      this.getChildClassTeachers(class_id)
        .then((response) => {
          this.teacher_list = response.data.map((teacher) => {
            return {
              title: teacher.teacher_name,
              value: teacher.id,
            };
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
%active-tab {
  background: $brand-navy !important;

  .avatar {
    .icon {
      color: $brand-inverse-light !important;
    }
  }

  .text-title {
    color: $brand-inverse-light !important;
  }
}

.user-assessment-layout {
  margin-bottom: toRem(30);

  @include breakpoint-down(xs) {
    margin-bottom: toRem(20);
  }

  .tab-top {
    @include flex-row-start-nowrap;

    .tab {
      @include flex-row-between-nowrap;
      margin-right: toRem(5);
      background: $white-text;
      border-radius: toRem(10) toRem(10) 0 0;
      padding: toRem(10) toRem(23);
      color: $border-grey-dark;

      @include breakpoint-down(xl) {
        padding: toRem(8) toRem(18);
      }

      @include breakpoint-down(xs) {
        padding: toRem(7.5) toRem(14);
      }

      .avatar {
        @include square-shape(26);
        margin-right: toRem(4);

        @include breakpoint-down(xl) {
          margin-right: toRem(2);
        }

        .icon {
          @include center-placement;
          color: $border-grey-dark;
          font-size: toRem(17);

          @include breakpoint-down(xl) {
            font-size: toRem(16);
          }

          @include breakpoint-down(xs) {
            font-size: toRem(17);
          }

          @include breakpoint-custom-down(370) {
            font-size: toRem(17);
          }
        }
      }

      .text-title {
        @include font-height(13, 18);
        color: $border-grey-dark;

        @include breakpoint-down(xl) {
          @include font-height(12.75, 17);
        }

        @include breakpoint-down(xs) {
          @include font-height(12.8, 16);
        }

        @include breakpoint-custom-down(370) {
          display: none;
        }
      }

      &:hover {
        @extend %active-tab;
      }
    }

    .active-tab {
      @extend %active-tab;
    }
  }

  .history-view-wrapper {
    border-radius: 0 toRem(10) toRem(10) toRem(10);
    padding: toRem(22);

    @include breakpoint-down(md) {
      border-radius: 0 toRem(5) toRem(5) toRem(5);
      padding: toRem(18) toRem(12);
    }

    @include breakpoint-down(xs) {
      padding: toRem(18) toRem(10);
    }

    .top-row {
      @include flex-row-between-nowrap;
      margin-top: toRem(5);
      margin-bottom: toRem(20);

      .title-text {
        color: $brand-navy;
        @include font-height(18, 28);
        font-weight: 600;

        @include breakpoint-down(xl) {
          @include font-height(18, 25);
        }

        @include breakpoint-down(md) {
          @include font-height(17, 25);
        }

        @include breakpoint-down(xs) {
          @include font-height(16.25, 24);
        }
      }
    }
  }

  .search-input {
    position: relative;
    overflow: hidden;
    height: auto;
    width: 45%;

    @include breakpoint-down(lg) {
      width: 50%;
    }

    @include breakpoint-down(sm) {
      width: 100%;
    }

    .form-control {
      border-radius: toRem(18);
      padding-left: toRem(16);
      padding-right: toRem(32);
      font-size: toRem(12.85);
      color: $color-ash;

      @include breakpoint-down(lg) {
        border-radius: toRem(14);
      }

      @include breakpoint-down(sm) {
        padding-left: toRem(12);
        border-radius: toRem(10);
        font-size: toRem(12.65);
      }
    }

    .icon {
      font-size: toRem(18);
      @include center-y;
      right: toRem(12);
      z-index: 1;
    }
  }

  .hide-mobile {
    @include breakpoint-down(sm) {
      display: none;
    }
  }

  .filter-row-block {
    margin-bottom: toRem(25);
    margin-top: toRem(-10);

    @include breakpoint-down(sm) {
      margin-top: toRem(2);
      margin-bottom: toRem(23);
    }

    .data-row {
      @include flex-row-start-wrap;

      @include breakpoint-down(sm) {
        margin-top: toRem(-13);
        margin-bottom: toRem(14);
        display: none;
      }
    }
  }
}

.show-filters {
  display: flex !important;
}
</style>
