<template>
  <div class="wrapper position-relative">
    <div
      class="post-destination color-white-bg rounded-15 smooth-transition pointer"
      @click="toggleDropdown"
    >
      <!-- TITLE  -->
      <div class="title color-grey-dark">Post to:</div>

      <!-- CLASS VALUE  -->
      <div class="class-value brand-navy">
        {{ getSelectedClasses }}
      </div>

      <div
        class="icon icon-caret-down border-grey-dark mgl-10 smooth-transition"
        :class="{ 'rotate-180': show_dropdown }"
      ></div>
    </div>

    <!-- DROPDOWN SELECTION -->
    <post-selector
      v-if="show_dropdown"
      :data_set="class_list"
      :pre_selected="selected_class_list"
      @resolveSelection="processSelection"
      @hideDropdown="toggleDropdown"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import postSelector from "@/modules/base/components/feed-comps/post-input-comps/post-selector";

export default {
  name: "postAudience",

  components: {
    postSelector,
  },

  computed: {
    getSelectedClasses() {
      if (this.current_time) {
        let class_data = [];
        this.selected_class_list.map((item) => class_data.push(item.name));

        if (class_data.length) {
          return class_data.length > 2
            ? `${class_data[0]}, ${class_data[1]} ....`
            : class_data.join(", ");
        } else return "No class selected";
      } else return "No class selected";
    },
  },

  data: () => ({
    current_time: Date.now(),
    show_dropdown: false,

    class_list: [],
    selected_class_list: [],
  }),

  watch: {
    class_list: {
      handler() {
        this.loadCurrentClassInfo();
      },
    },
  },

  created() {
    setInterval(() => (this.current_time = Date.now()), 1000);
  },

  mounted() {
    this.fetchAssociatedClasses();
  },

  methods: {
    ...mapActions({
      getSchoolClasses: "dbHome/getSchoolClasses",
      loadTeacherClasses: "general/getTeacherClassList",
    }),

    fetchAssociatedClasses() {
      this.class_list = [];

      if (this.getAuthType === "school") {
        this.getSchoolClasses().then((response) => {
          response.data.map((class_level) =>
            class_level.classes.map((arm) => this.setupClass(arm))
          );
        });
      }
      // TEACHER ACCOUNT
      else {
        this.loadTeacherClasses().then((response) => {
          response?.data?.classes.map((arm) => this.setupClass(arm));
        });
      }
    },

    setupClass(class_object) {
      let class_data = {};
      class_data.id = class_object?.class_id ?? class_object?.id;
      class_data.name = class_object.class_name;
      class_data.image = null;
      class_data.selected = false;

      this.class_list.push(class_data);
    },

    // LOAD THE CURRENT SELECTED CLASS INTO SELECTED CLASS ARRAY
    loadCurrentClassInfo() {
      this.class_list.map((item) =>
        item.id === this.$route.params.id
          ? this.selected_class_list.push(item)
          : null
      );
    },

    // PROCESS USER SELECTION
    processSelection(selection) {
      let selection_index = this.selected_class_list.findIndex(
        (item) => item.id === selection.id
      );

      selection_index === -1
        ? this.selected_class_list.push(selection)
        : this.selected_class_list.splice(selection_index, 1);

      this.$emit("updateSelectedClass", this.selected_class_list);
    },

    toggleDropdown() {
      this.show_dropdown = !this.show_dropdown;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-destination {
  margin-top: toRem(14);
  @include flex-row-start-nowrap;
  padding: toRem(8) toRem(14);
  width: max-content;
  max-width: 100%;

  &:hover {
    background: rgba($brand-accent-light, 0.5) !important;
  }

  .title {
    @include font-height(11.5, 16);
    margin-right: toRem(8);

    @include breakpoint-down(xs) {
      @include font-height(11, 16);
      margin-right: toRem(6);
    }
  }

  .class-value {
    @include font-height(11.5, 16);
    // @include text-truncate;

    @include breakpoint-down(xs) {
      @include font-height(11, 16);
    }
  }

  .icon {
    font-size: toRem(11.5);
  }
}
</style>
