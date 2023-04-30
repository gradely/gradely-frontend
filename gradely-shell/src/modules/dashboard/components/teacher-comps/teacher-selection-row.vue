<template>
  <div class="teacher-selection-row mgb-20 smooth-transition">
    <!-- STUDENT NAME  -->
    <div class="input-row search-bar">
      <!-- SEARCH ICON  -->
      <div class="icon-search brand-inverse index-9"></div>
      <!-- INPUT  -->
      <input
        type="search"
        class="form-control"
        v-model="form.teacher_info"
        @input="$emit('filterChange', form)"
        placeholder="Find teacher by name"
      />
    </div>

    <!-- CLASS YEAR  -->
    <div class="input-row custom">
      <select
        class="form-control"
        v-model="form.selected_class"
        @change="$emit('filterChange', form)"
      >
        <option value="" selected disabled>Select Class</option>
        <option value="" selected>All</option>
        <option
          v-for="(value, index) in class_options"
          :key="index"
          :value="value.id"
        >
          {{ value.name }}
        </option>
      </select>
    </div>

    <!-- SUBJECT  -->
    <div class="input-row custom">
      <select
        class="form-control"
        v-model="form.selected_subject"
        @change="$emit('filterChange', form)"
      >
        <option value="" disabled selected>Select Subject</option>
        <option value="">All</option>
        <option
          v-for="(value, index) in getSubjects"
          :key="index"
          :value="value.id"
        >
          {{ value.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "studentSelectionRow",

  computed: {
    ...mapGetters({
      getSchoolSubjects: "dbHome/getSchoolSubjects",
    }),

    getSubjects() {
      return this.getSchoolSubjects.map((subject) => {
        return {
          ...subject,
          id: Number(subject.subject_id),
        };
      });
    },
  },

  data: () => ({
    class_options: [],

    form: {
      teacher_info: "",
      selected_class: "",
      selected_subject: "",
    },
  }),

  mounted() {
    this.fetchSchoolClasses();
  },

  methods: {
    ...mapActions({
      getSchoolClasses: "dbHome/getSchoolClasses",
      fetchSubjectList: "dbHome/getSchoolSubjectList",
    }),

    // FETCH ALL SCHOOL LEVEL CLASSES
    fetchSchoolClasses() {
      this.class_options = [];

      this.getSchoolClasses()
        .then((response) => {
          response.code === 200
            ? this.pushToClassOptions(response.data)
            : (this.class_options = []);
        })
        .catch(() => (this.class_options = []));
    },

    getSubjectList() {
      // calls the api only if the data isnt ready already
      if (this.getSchoolSubjects.length) return;

      this.fetchSubjectList()
        .then((response) => {
          response;
        })
        .catch((err) => {
          console.log("error getting school subjects", err);
        });
    },

    // LOAD CLASS OPTIONS
    pushToClassOptions(class_list) {
      class_list.map((item) => {
        item.classes.map((arm) => {
          let class_arm = {};
          class_arm.id = arm.id;
          class_arm.name = arm.class_name;
          this.class_options.push(class_arm);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.teacher-selection-row {
  @include flex-row-between-nowrap;
  align-items: flex-start;
  margin-top: toRem(-10);

  @include breakpoint-down(md) {
    margin-top: toRem(-15);
  }

  @include breakpoint-down(sm) {
    @include flex-row-between-wrap;
  }

  .input-row {
    position: relative;
    width: 31.75%;

    @include breakpoint-down(lg) {
      width: 32.75%;
    }

    @include breakpoint-down(sm) {
      width: 100%;
      margin-bottom: toRem(2);
    }
  }

  .custom {
    @include breakpoint-down(sm) {
      width: 49.75%;
    }
  }

  .form-control {
    @include breakpoint-custom-down(640) {
      padding-left: toRem(9);
      padding-right: toRem(5);
    }

    @include breakpoint-custom-down(640) {
      padding-left: toRem(28);
    }

    @include breakpoint-down(sm) {
      padding-left: toRem(13);
      padding-right: toRem(10);
    }
  }

  .search-bar {
    .icon-search {
      font-size: toRem(17);
      @include center-y;
      left: toRem(12);

      @include breakpoint-down(md) {
        font-size: toRem(16);
      }

      @include breakpoint-custom-down(640) {
        left: toRem(8);
      }

      @include breakpoint-down(sm) {
        left: toRem(7);
        font-size: toRem(15);
      }
    }

    input {
      padding-left: toRem(38);
      font-size: toRem(13);

      @include breakpoint-down(xl) {
        padding-left: toRem(38);
      }

      @include breakpoint-down(md) {
        padding-left: toRem(32);
        font-size: toRem(12.25);
      }

      @include breakpoint-custom-down(640) {
        padding-left: toRem(28);
      }

      @include breakpoint-down(sm) {
        padding-left: toRem(28);
      }

      &::placeholder {
        @include breakpoint-down(xl) {
          font-size: toRem(12.5);
        }

        @include breakpoint-down(md) {
          font-size: toRem(12);
        }

        @include breakpoint-down(sm) {
          font-size: toRem(12);
        }
      }
    }
  }
}
</style>
