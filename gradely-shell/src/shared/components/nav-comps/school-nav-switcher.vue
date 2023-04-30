<template>
  <div
    class="nav-switcher rounded-20 brand-navy-bg smooth-transition pointer"
    @click="toggleClassModal"
    :title="selected_class.name"
    v-if="!inActivatePage"
  >
    <div class="icon-wrapper rounded-10 icon-one">
      <div class="icon brand-accent icon-graduation-cap"></div>
    </div>

    <!-- ITEM  -->
    <div class="item text-truncate">
      {{ loading_class_name ? "Loading..." : selected_class.name }}
    </div>

    <div class="icon-wrapper icon-two">
      <div class="icon brand-inverse icon-opposite-caret"></div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_class_modal">
        <switch-school-classes-modal
          :school_classes="class_list"
          @closeTriggered="toggleClassModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "schoolNavSwitcher",

  components: {
    switchSchoolClassesModal: () =>
      import(
        /* webpackChunkName: "switchClassesModal" */ "@/shared/modals/switch-school-classes-modal"
      ),
  },

  computed: {
    inActivatePage() {
      return this.$route.name === "DashboardActivateStudent" ? true : false;
    },
  },

  watch: {
    $route: {
      handler(value) {
        value.params.id !== this.selected_class.id
          ? value.params.id
            ? this.getSingleClassInfo(value.params.id)
            : this.selectFirstClass()
          : null;
      },
    },
  },

  data: () => ({
    show_class_modal: false,
    loading_class_name: true,

    class_list: [],

    selected_class: {
      id: 1,
      name: "No class selected",
      class_code: "EEG",
    },
  }),

  mounted() {
    if (!this.inActivatePage) this.fetchSchoolClasses();
  },

  methods: {
    ...mapActions({
      getSchoolClasses: "dbHome/getSchoolClasses",
      getClassDetail: "general/getClassDetail",
      getTeachersInClass: "general/getTeachersInClass",
      setSelectedClass: "general/setSelectedClass",
    }),

    toggleClassModal() {
      this.show_class_modal = !this.show_class_modal;
    },

    fetchSchoolClasses() {
      this.class_list = [];

      this.getSchoolClasses()
        .then((response) => {
          response.data.map((class_level) =>
            class_level.classes.map((arm) => {
              let class_arm = {};
              class_arm.id = arm.id;
              class_arm.class_name = arm.class_name;
              class_arm.class_code = arm.class_code;

              this.class_list.push(class_arm);
            })
          );

          // GET SINGLE CLASS INFO
          this.getSingleClassInfo(this.$route.params.id);
        })
        .catch(() =>
          this.pushAlert("An error occured while loading class data", "error")
        );
    },

    // GET SINGLE CLASS DETAIL
    getSingleClassInfo(class_id) {
      this.loading_class_name = true;

      this.getClassDetail(class_id)
        .then((response) => {
          if (response.code === 200) {
            this.selected_class.id = response.data.id;
            this.selected_class.name = response.data.class_name;
            this.selected_class.class_code = response.data.class_code;

            this.setSelectedClass(this.selected_class);

            this.loading_class_name = false;
          }
          // INVALID CLASS ID ON ROUTE
          else if (response.code === 204 || response.code === 404)
            this.selectFirstClass();
        })
        .catch(() => {
          this.pushAlert(
            "An error occured while loading class info data",
            "error"
          );

          this.loading_class_name = false;
        });
    },

    // SELECT FIRST CLASS ON LIST AS SELECTED CLASS
    selectFirstClass() {
      this.$router
        .push({
          name: this.$router.currentRoute.name,
          params: { id: this.class_list[0].id },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") throw error;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-switcher {
  // width: 300px;
}
</style>
