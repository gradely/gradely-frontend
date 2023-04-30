<template>
  <div
    class="nav-switcher rounded-20 brand-navy-bg smooth-transition pointer"
    :title="selected_child.name"
    @click="toggleSwitchModal"
  >
    <div class="avatar icon-wrapper rounded-10 icon-one overflow-hidden mgr-8">
      <img
        v-lazy="selected_child.image"
        class="avatar-img brand-inverse-bg"
        :alt="$string.getStringInitials(selected_child.name)"
        v-if="selected_child.image"
      />

      <div
        class="avatar-text"
        v-else
        :class="$color.getProfileBgColor(selected_child.name)"
      >{{ $string.getStringInitials(selected_child.name) }}</div>
    </div>

    <!-- ITEM  -->
    <div class="item text-truncate">
      {{
      loading_child_name
      ? "Loading..."
      : selected_child.name || "No child selected"
      }}
    </div>

    <div class="icon-wrapper icon-two">
      <div class="icon brand-inverse icon-opposite-caret"></div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" mode="in-out" v-if="show_switch_modal">
        <switch-child-modal :children="children_list" @closeTriggered="toggleSwitchModal" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "parentNavSwitcher",

  components: {
    switchChildModal: () =>
      import(
        /* webpackChunkName: "switchChildModal" */ "@/shared/modals/switch-child-modal"
      ),
  },

  data: () => ({
    show_switch_modal: false,
    loading_child_name: true,

    children_list: [],

    selected_child: {
      id: 1,
      name: "Add your child",
      image: "",
    },
  }),

  watch: {
    $route: {
      handler() {
        this.fetchAllParentChildren();
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions({
      getParentChildren: "general/getParentChildren",
      getChildToken: "general/getChildToken",
    }),

    toggleSwitchModal() {
      let child_size = this.children_list?.length;
      let { full_name, id } = this.children_list[0];

      child_size > 1
        ? (this.show_switch_modal = !this.show_switch_modal)
        : this.$router.push({
            name: "ManageChild",
            params: { id, name: full_name },
          });
    },

    // FETCH ALL PARENT CHILD
    fetchAllParentChildren() {
      this.loading_child_name = true;
      this.children_list = [];

      this.getParentChildren()
        .then((response) => {
          if (response.code === 200) {
            this.children_list = response.data;
            this.setCurrentChildId(); // UPDATE SELECTED CHILD
          }

          // EMPTY STATE
          else if (response.code === 204 || response.code === 404) {
            this.pushAlert("No child data was loaded!", "warning");
            this.loading_child_name = false;
          }

          //   ERROR STATE
          else this.errorState();
        })
        .catch(() => this.errorState());
    },

    // ERROR STATE
    errorState() {
      this.pushAlert(
        "An error occured while loading parent children data",
        "error"
      );

      this.loading_child_name = false;
    },

    setCurrentChildId() {
      let route_child_id = Number(this.$route.params.id);

      if (route_child_id) {
        let selected_child = this.children_list.find(
          (child) => Number(child.id) === route_child_id
        );

        this.selected_child.id = selected_child.id;
        this.selected_child.name = selected_child.full_name;
        this.selected_child.image = selected_child.image;

        this.$bus.$emit("loadCurrentChild", selected_child);

        this.loading_child_name = false;

        // UPDATE CURRENT CHILD TOKEN
        this.getChildToken(route_child_id);
      }
      // IF CHILD ID IS NOT VALID
      else this.loadFirstChild(this.children_list[0].id);
    },

    // RELOAD THE ROUTE INTO THE FIRST CHILD
    loadFirstChild(id) {
      this.$router
        .push({
          name: this.$router.currentRoute.name,
          params: { id },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") throw error;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$body_font: "Noto Sans JP", Roboto, Segoe UI, Open Sans, sans-serif;

.nav-switcher {
  .avatar {
    .avatar-text {
      font-family: $body_font !important;
    }
  }
}
</style>
