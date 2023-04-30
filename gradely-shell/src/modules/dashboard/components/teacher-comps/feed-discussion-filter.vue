<template>
  <div class="weekly-discussion-filter">
    <div class="title-text color-ash">FILTERS</div>

    <!-- FILTER BY CLASS  -->
    <div class="filter-by-class">
      <select class="form-control" v-model="class_id">
        <option disabled value="" selected>Select Class</option>
        <option
          :value="item.class_id"
          v-for="(item, index) in classList"
          :key="index"
        >
          {{ item.class_name }}
        </option>
      </select>
    </div>

    <!-- FILTER BY POST  -->
    <div class="filter-by-post">
      <label class="label-text font-weight-700 color-text">Post By...</label>

      <div
        class="
          wrapper
          d-flex
          flex-column
          justify-content-start
          align-items-start
        "
      >
        <!-- POST TYPES  -->
        <label for="all" class="pointer checkbox checkbox-inline mgr-5">
          <input type="checkbox" id="all" v-model="all" />
          <div class="label color-ash select-none">All</div>
        </label>

        <label
          v-for="(type, index) in post_by"
          :key="index"
          :for="type.value"
          class="pointer checkbox checkbox-inline mgr-5"
        >
          <input type="checkbox" :id="type.value" v-model="type.selected" />
          <div class="label color-ash select-none">{{ type.name }}</div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FeddDiscussionFilter",

  props: {
    entry_class: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    ...mapGetters({
      getTeacherClassList: "general/getTeacherClassList",
      getSchoolClassList: "general/getSchoolClassList",
    }),

    areOthersSelected() {
      return this.post_by.some((type) => type.selected);
    },

    classList() {
      let school_classes = this.getSchoolClassList.map((level) => {
        level.class_id = level.id;
        return level;
      });

      let teacher_clasess = this.getTeacherClassList.classes;

      return this.getAuthType === "school" ? school_classes : teacher_clasess;
    },

    filterKeys() {
      let creators = this.post_by.reduce((keys, type) => {
        if (type.selected) keys.push(type.value);
        return keys;
      }, []);

      let key_string = this.all ? "" : creators.join("_");
      return key_string ? key_string : "";
    },
  },

  mounted() {
    if (!this.getTeacherClassList?.classes) this.fetchTeacherClasses();
    if (!this.getClassList?.length) this.fetchGlobalClasses();
  },

  data() {
    return {
      class_id: "",

      all: true,

      post_by: [
        {
          name: "Students",
          value: "student",
          selected: false,
        },

        {
          name: "Teachers",
          value: "teacher",
          selected: false,
        },
        {
          name: "School Admin",
          value: "school",
          selected: false,
        },
        {
          name: "Me",
          value: "me",
          selected: false,
        },
      ],

      class_list: [
        {
          name: "Jss 1 Gold",
          id: 1,
        },
      ],
    };
  },

  watch: {
    entry_class: {
      handler(data) {
        this.class_id = data;
      },
      immediate: true,
    },

    class_id: {
      handler(id) {
        if (id) this.$emit("classSwitched", id);
      },
    },

    post_by: {
      handler() {
        this.$emit("updated");
      },
      deep: true,
    },

    all: {
      handler(new_state, old_state) {
        this.$emit("updated");
        if (new_state && !old_state) this.resetOthers();
      },
    },

    areOthersSelected: {
      handler(new_state, old_state) {
        if (new_state && !old_state) this.all = false;
        if (!new_state && old_state) this.all = true;
      },
    },

    filterKeys: {
      handler(query) {
        this.$emit("filter", query);
      },
    },
  },

  methods: {
    ...mapActions({
      getSchoolClasses: "dbHome/getSchoolClasses",
      fetchTeacherClassList: "general/getTeacherClassList",
      getSchoolGlobalClassList: "general/getSchoolGlobalClassList",
    }),

    async fetchTeacherClasses() {
      await this.fetchTeacherClassList();
    },

    async fetchGlobalClasses() {
      await this.getSchoolGlobalClassList();
    },

    resetOthers() {
      this.post_by = [
        {
          name: "Students",
          value: "student",
          selected: false,
        },

        {
          name: "Teachers",
          value: "teacher",
          selected: false,
        },
        {
          name: "School Admin",
          value: "school",
          selected: false,
        },
        {
          name: "Me",
          value: "me",
          selected: false,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.weekly-discussion-filter {
  .title-text {
    @include font-height(15, 21);
    margin-bottom: toRem(13);

    @include breakpoint-down(sm) {
      @include font-height(13, 18);
      margin-bottom: toRem(10);
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
