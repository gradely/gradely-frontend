<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-sm-md' }"
  >
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body p-0">
        <post-assessment-state on_modal show_delete />
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "createAssessmentModal",

  components: {
    modalCover,
    postAssessmentState: () =>
      import(
        /* webpackChunkName: "postAssessmentState" */ "@/modules/base/components/feed-comps/post-input-comps/post-assessment-state"
      ),
  },

  data: () => ({
    selected_category: "homework",
    categories: ["homework", "exam", "class quiz"],
  }),

  methods: {
    switchCategory(category) {
      this.selected_category = category;
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

  @include breakpoint-down(xs) {
    padding: toRem(5) !important;
  }

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
