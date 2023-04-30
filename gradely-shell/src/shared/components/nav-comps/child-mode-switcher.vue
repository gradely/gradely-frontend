<template>
  <div
    class="mode-nav-switcher custom-teacher-nav-switcher rounded-18 smooth-transition pointer"
    @click="toggleSwitchMode"
  >
    <div class="icon-wrapper icon-one">
      <div class="icon brand-navy icon-control"></div>
    </div>

    <!-- ITEM  -->
    <div class="item text-truncate brand-navy font-weight-500">
      Switch Mode
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_mode">
        <switch-mode-modal @closeTriggered="toggleSwitchMode" />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "childModeSwitcher",

  components: {
    switchModeModal: () =>
      import(
        /* webpackChunkName: "switchModeModal" */ "@/shared/modals/switch-mode-modal"
      ),
  },

  data: () => ({
    show_mode: false,
  }),

  mounted() {
    this.reRouteChild();
  },

  methods: {
    toggleSwitchMode() {
      this.show_mode = !this.show_mode;
    },

    // RE ROUTE A CHILD IF CHILD ROUTE ID IS 0
    reRouteChild() {
      if (this.getAuthType === "student" && this.$route.params.id == 0) {
        this.$router.push({
          name: this.$router.currentRoute.name,
          params: { id: this.getAuthUser.id },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
