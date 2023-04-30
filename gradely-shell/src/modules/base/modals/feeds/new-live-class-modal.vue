<template>
  <modal-cover @closeModal="closeModal" :modal_style="{ size: 'modal-sm-md' }">
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pd-0">
        <new-live-class-state @close="closeModal" />
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "newLiveClassModal",

  components: {
    modalCover,
    newLiveClassState: () =>
      import(
        /* webpackChunkName: "postAssessmentState" */ "@/modules/base/components/feed-comps/post-input-comps/new-live-class-state"
      ),
  },

  methods: {
    closeModal() {
      this.$emit("closeOpenState");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  min-height: 20vh;
  height: auto;
  max-height: 95vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: toRem(6);
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba($border-grey, 0.75);
    width: toRem(6);
    border-radius: toRem(6);
  }
}
</style>
