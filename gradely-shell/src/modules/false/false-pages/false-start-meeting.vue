<template>
  <div class="">
    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_start_liveclass_modal">
        <start-liveclass-modal />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "startMeeting",

  components: {
    startLiveclassModal: () =>
      import(
        /* webpackChunkName: "startLiveclassModal" */ "@/modules/base/modals/assessments/start-liveclass-modal"
      ),
  },

  data() {
    return {
      show_start_liveclass_modal: false,
    };
  },

  mounted() {
    this.toggleStartLiveClass();
  },

  methods: {
    toggleStartLiveClass() {
      this.show_start_liveclass_modal = !this.show_start_liveclass_modal;
    },
  },
};
</script>

<style></style>
