<template>
  <div class="teacher-sidebar white-text-bg rounded-5 h-auto position-relative">
    <!-- PARENT LOADING STATE  -->
    <template v-if="loading">
      <sidebar-loading-state />
      <sidebar-loading-state />
    </template>

    <template v-else>
      <template v-if="children.length">
        <parent-child-card
          v-for="(child, index) in children"
          :key="index"
          :child_index="index"
          :child="child"
          @switchToChild="updateCurrentChild($event)"
        />
      </template>

      <template v-else>
        <empty-parent-state />
      </template>
    </template>

    <!-- ADD CLASS  -->
    <div class="add-child w-100">
      <div class="wrapper">
        <div class="avatar border-color-grey-light mgr-10">
          <div class="icon icon-plus brand-accent"></div>
        </div>

        <div class="text color-text pointer smooth-transition">
          Add another child
        </div>
      </div>

      <div
        v-if="false"
        class="avatar border-color-grey-light pointer"
        title="Toggle Children"
        @click="toggleMoreChildren"
      >
        <div
          class="icon brand-inverse"
          :class="is_shrinked ? 'icon-caret-fill-down' : 'icon-caret-fill-up'"
        ></div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_child_modal">
        <switch-child-modal @closeTriggered="toggleChildModal" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import sidebarLoadingState from "@/shared/components/sidebar-comps/sidebar-loading-state";
import parentChildCard from "@/shared/components/sidebar-comps/parent-child-card";
import emptyParentState from "@/shared/components/sidebar-comps/empty-parent-state";

export default {
  name: "parentSidebar",

  components: {
    sidebarLoadingState,
    parentChildCard,
    emptyParentState,
    switchChildModal: () =>
      import(
        /* webpackChunkName: "switchChildModal" */ "@/shared/modals/switch-child-modal"
      ),
  },

  computed: {
    showChildToggler() {
      if (
        window.innerWidth > 768 &&
        this.child_repo.length > this.max_child_desktop
      )
        return true;
      else if (
        window.innerWidth < 768 &&
        this.child_repo.length > this.max_child_mobile
      )
        return true;
      else return false;
    },

    watchChildrenAndShrinkedState() {
      const { is_shrinked } = this;
      return {
        is_shrinked,
      };
    },
  },

  watch: {
    watchChildrenAndShrinkedState: {
      handler() {
        // this.getShrinkedChildList();
      },
    },
  },

  data: () => ({
    show_child_modal: false,

    loading: true,
    child_repo: [],
    children: [],
    final_child_state: [],

    is_shrinked: true,
    max_child_mobile: 1,
    max_child_desktop: 6,

    selected_child: {
      id: 1,
    },
  }),

  created() {
    this.fetchAllParentChildren(this.$route.params.id);
  },

  mounted() {
    // window.onresize = () => this.getShrinkedChildList();
  },

  methods: {
    ...mapActions({
      getParentChildren: "general/getParentChildren",
    }),

    // FETCH ALL PARENT CHILD
    fetchAllParentChildren(child_id) {
      this.defaultState(true);

      this.getParentChildren()
        .then((response) => {
          if (response.code === 200) {
            this.defaultState(false, response.data);
            this.setCurrentChildId(child_id); // UPDATE SELECTED CHILD
          }

          // EMPTY STATE
          else if (response.code === 204 || response.code === 404)
            this.defaultState();
          else {
            this.$bus.$emit("show_response_alert", {
              message: "An error occured while loading parent children data",
              type: "error",
            });

            this.defaultState();
          }
        })
        .catch(() => {
          this.$bus.$emit("show_response_alert", {
            message: "An error occured while loading parent children data",
            type: "error",
          });

          this.defaultState();
        });
    },

    // DEFAULT STATE
    defaultState(loading = false, data = []) {
      this.loading = loading;
      this.child_repo = this.children = data;
    },

    // SET CURRENT SELECTED CHILD
    setCurrentChildId(child_id) {
      let child_index_exist = this.children.findIndex(
        (child) => Number(child.id) === child_id
      );

      // this.getShrinkedChildList();

      child_index_exist === -1
        ? this.reloadRoute()
        : this.updateCurrentChild({ id: child_id, index: child_index_exist });
    },

    // UPDATE CURRENT CHILD ID
    updateCurrentChild(child_data) {
      let selected_child = this.child_repo[child_data.index];
      // this.child_repo.splice(child_data.index, 1);
      this.children.splice(child_data.index, 1);

      this.child_repo = this.children = [selected_child, ...this.children];
      this.reloadRoute(child_data.id);
    },

    // RELOAD CURRENT SELECTED CHILD ROUTE
    reloadRoute(id = this.children[0].id) {
      this.$router
        .push({
          name: this.$router.currentRoute.name,
          params: { id },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") throw error;
        });
    },

    // GET SHRINKED CHILD LIST
    getShrinkedChildList() {
      if (this.is_shrinked) {
        if (
          this.child_repo.length > this.max_child_desktop &&
          window.innerWidth > 768
        ) {
          this.children = this.child_repo.slice(0, this.max_child_desktop);
          return true;
        } else if (
          this.child_repo.length > this.max_child_mobile &&
          window.innerWidth < 768
        ) {
          this.children = this.child_repo.slice(0, this.max_child_mobile);
          return true;
        } else {
          this.children = this.child_repo;
          return false;
        }
      } else {
        this.children = this.child_repo;
        return false;
      }
    },

    toggleMoreChildren() {
      this.is_shrinked = !this.is_shrinked;
    },

    toggleChildModal() {
      this.show_child_modal = !this.show_child_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.teacher-sidebar {
  .add-child {
    @include flex-row-between-nowrap;
    border-top: toRem(1) solid $border-grey;
    padding: toRem(16) toRem(15);

    @include breakpoint-down(xs) {
      padding: toRem(14) toRem(13);
    }

    .wrapper {
      @include flex-row-start-nowrap;
    }

    .avatar {
      @include square-shape(28);

      @include breakpoint-down(xs) {
        @include square-shape(24);
      }

      .icon {
        @include center-placement;
        font-size: toRem(13);
      }
    }

    .text {
      @include font-height(12.75, 18);

      @include breakpoint-down(xs) {
        @include font-height(12.5, 17);
      }

      &:hover {
        color: $brand-accent !important;
      }
    }
  }
}
</style>
