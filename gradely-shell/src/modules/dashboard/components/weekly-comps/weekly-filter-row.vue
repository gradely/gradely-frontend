<template>
  <div class="weekly-filter-row position-relative">
    <!-- FILTER ICON -->
    <div class="filter-mobile rounded-circle" @click="toggleMobileFilter">
      <div class="position-relative w-100 h-100">
        <div class="icon icon-filter-lines"></div>
      </div>
    </div>

    <div
      class="
        filter-row
        d-flex
        justify-content-start
        align-items-center
        flex-wrap
        smooth-animation
      "
      :class="show_mobile_filter ? 'override-mobile-filter' : null"
    >
      <!-- SUBJECT  -->
      <select-filter
        title="Subject"
        select_key="subject"
        :filter_list="subjects"
      />

      <!-- TEACHER -->
      <select-filter
        title="Teacher"
        select_key="teacher"
        :filter_list="sortedTeacherList"
      />

      <!-- CLASS -->
      <select-filter
        title="Class"
        select_key="class"
        :filter_list="class_list"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import selectFilter from "@/shared/components/select-filter";

export default {
  name: "weeklyFilterRow",

  components: {
    selectFilter,
  },

  data() {
    return {
      class_list: [],
      teachers: [],
      subjects: [],
      show_mobile_filter: false,
    };
  },

  computed: {
    sortedTeacherList() {
      if (this.teachers.length) {
        return this.teachers.sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase()
            ? 1
            : b.title.toLowerCase() > a.title.toLowerCase()
            ? -1
            : 0
        );
      } else return [];
    },
  },

  mounted() {
    this.fetchSchoolClasses();
    this.loadSchoolTeachers();
    this.loadSchoolSubjects();
  },

  methods: {
    ...mapActions({
      getSchoolClasses: "dbHome/getSchoolClasses",
      getSchoolSubjectList: "dbHome/getSchoolSubjectList",
      getTeachers: "dbTeacher/getSchoolTeachers",
    }),

    toggleMobileFilter() {
      this.show_mobile_filter = !this.show_mobile_filter;
    },

    fetchSchoolClasses() {
      this.class_list = [];

      this.getSchoolClasses()
        .then((response) => {
          response.data.map((class_level) =>
            class_level.classes.map((arm) => {
              let class_arm = {};
              class_arm.value = arm.id;
              class_arm.title = arm.class_name;

              this.class_list.push(class_arm);
            })
          );
        })
        .catch(() =>
          this.pushAlert("An error occured while loading class data", "error")
        );
    },

    // LOAD SCHOOL TEACHERS
    loadSchoolTeachers(page = 1, all = 1) {
      this.teachers = [];

      this.getTeachers({ page, all })
        .then((response) => {
          if (response.code === 200) {
            response?.data.map((teacher) => {
              let teacher_obj = {};
              teacher_obj.value = teacher.id;
              teacher_obj.title = teacher.full_name;

              this.teachers.push(teacher_obj);
            });
          }
          // EMPTY RESPONSE
          else this.teachers = [];
        })
        .catch(() => (this.teachers = []));
    },

    // LOAD ALL SCHOOL SUBJECTS
    loadSchoolSubjects() {
      this.getSchoolSubjectList()
        .then((response) => {
          response?.map((subject) => {
            let subject_obj = {};
            subject_obj.value = subject.subject_id;
            subject_obj.title = subject.name;

            this.subjects.push(subject_obj);
          });
        })
        .catch(() => (this.subjects = []));
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-mobile {
  @include square-shape(30);
  background: $brand-navy;
  position: absolute;
  top: toRem(-42);
  display: none;
  right: 0;

  @include breakpoint-down(xs) {
    display: unset;
  }

  .icon {
    @include center-placement;
    color: $white-text;
    font-size: toRem(13);
  }
}

.filter-row {
  @include breakpoint-down(xs) {
    display: none !important;
  }
}

.override-mobile-filter {
  display: unset !important;
}
</style>