<template>
  <div class="weekly-discussion-filter">
    <div class="title-text color-grey-dark">FILTER</div>

    <!-- FILTER BY CLASS  -->
    <div class="filter-by-class">
      <label class="label-text font-weight-700 color-text">Class</label>

      <select
        class="form-control"
        v-model="class_id"
        @change="$emit('filterClass', class_id)"
      >
        <option disabled value="null" selected>Select Class</option>
        <option value="all">Select All</option>
        <option
          :value="item.id"
          v-for="(item, index) in class_list"
          :key="index"
          >{{ item.name }}</option
        >
      </select>
    </div>

    <!-- FILTER BY POST  -->
    <div class="filter-by-post">
      <label class="label-text font-weight-700 color-text">Post By...</label>

      <div
        class="wrapper d-flex flex-column justify-content-start align-items-start"
      >
        <!-- ALL  -->
        <label
          for="all"
          class="pointer checkbox checkbox-inline mgr-5"
          v-if="false"
        >
          <input
            type="checkbox"
            id="all"
            v-model="filter.all"
            :checked="filter.all"
          />
          <div class="label color-grey-dark select-none">
            All
          </div>
        </label>

        <!-- STUDENTS  -->
        <label for="student" class="pointer checkbox checkbox-inline mgr-5">
          <input
            type="checkbox"
            id="student"
            v-model="filter.student"
            :checked="filter.student"
          />
          <div class="label color-grey-dark select-none">
            Students
          </div>
        </label>

        <!-- PARENTS  -->
        <label for="parent" class="pointer checkbox checkbox-inline mgr-5">
          <input
            type="checkbox"
            id="parent"
            v-model="filter.parent"
            :checked="filter.parent"
          />
          <div class="label color-grey-dark select-none">
            Parents
          </div>
        </label>

        <!-- TEACHERS  -->
        <label for="teachers" class="pointer checkbox checkbox-inline mgr-5">
          <input
            type="checkbox"
            id="teachers"
            v-model="filter.teacher"
            :checked="filter.teacher"
          />
          <div class="label color-grey-dark select-none">
            Teachers
          </div>
        </label>

        <!-- SCHOOL ADMIN  -->
        <label
          for="school_admin"
          class="pointer checkbox checkbox-inline mgr-5"
        >
          <input
            type="checkbox"
            id="school_admin"
            v-model="filter.school"
            :checked="filter.school"
          />
          <div class="label color-grey-dark select-none">
            School Admin
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "weeklyDiscussionFilter",

  props: {
    clear_selection: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      class_list: [],
      class_id: null,

      filter: {
        all: true,
        teacher: false,
        student: false,
        parent: false,
        school: false,
      },
    };
  },

  watch: {
    filter: {
      handler(value) {
        this.filterPosts(value);
      },
      deep: true,
    },

    clear_selection: {
      handler(value) {
        // console.log(value);

        if (value) {
          this.filter.teacher = null;
          this.filter.student = null;
          this.filter.parent = null;
          this.filter.school = null;
        }
      },
      immediate: true,
    },
  },

  mounted() {
    this.fetchAssociatedClasses();
  },

  methods: {
    ...mapActions({
      getSchoolClasses: "dbHome/getSchoolClasses",
    }),

    fetchAssociatedClasses() {
      this.class_list = [];

      this.getSchoolClasses().then((response) => {
        response.data.map((class_level) =>
          class_level.classes.map((arm) => this.setupClass(arm))
        );
      });
    },

    setupClass(class_object) {
      let class_data = {};
      class_data.id = class_object?.class_id ?? class_object?.id;
      class_data.name = class_object.class_name;
      class_data.image = null;
      class_data.selected = false;

      this.class_list.push(class_data);
    },

    filterPosts(filter) {
      let types = [];

      if (filter.school || filter.teacher || filter.student || filter.parent) {
        // this.filter.all = false;

        filter.school ? types.push("school") : null;
        filter.teacher ? types.push("teacher") : null;
        filter.student ? types.push("student") : null;
        filter.parent ? types.push("parent") : null;

        this.$emit("filterList", types);
      } else {
        // this.filter.all = true;
        this.$emit("filterList", ["all"]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.weekly-discussion-filter {
  .title-text {
    @include font-height(15, 21);
    margin-bottom: toRem(30);

    @include breakpoint-down(sm) {
      @include font-height(13, 18);
      margin-bottom: toRem(18);
    }
  }

  .label-text {
    @include font-height(16, 21);
    margin-bottom: toRem(8);

    @include breakpoint-down(sm) {
      @include font-height(14.5, 18);
      margin-bottom: toRem(5);
    }
  }

  .filter-by-class {
    margin-bottom: toRem(32);
  }

  .filter-by-post {
    .wrapper {
      label {
        @include flex-row-start-nowrap;
        margin-left: 0 !important;
        padding-top: toRem(2);
        margin-bottom: toRem(-15);
        width: max-content;

        .label {
          margin-top: toRem(5);
          margin-left: toRem(5);
          font-size: toRem(14);

          @include breakpoint-down(sm) {
            font-size: toRem(12.5);
          }
        }
      }
    }
  }
}
</style>
