<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body central-placement">
        <div class="top-row">
          <img
            v-lazy="mxStaticImg('ErrorIcon.svg')"
            alt=""
            class="w-100 h-100"
          />
        </div>

        <!-- TITLE  -->
        <div class="title-text brand-tonic font-weight-700 mgt-20 mgb-15">
          Are you sure?
        </div>

        <div class="info-text color-ash text-center mgb-5">
          Removing this question means the question will no longer be counted as
          part of the assessment. All calculated grades will be adjusted to
          reflect this omission. This action cannot be undone!
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div
        class="modal-cover-footer d-flex flex-column align-items-center justify-content-start mgb-10"
      >
        <button class="c-btn btn-tonic">
          Yes! I want to remove this question
        </button>

        <button
          class="c-btn btn-text mgt-10 bg-transparent no-shadow color-text"
        >
          No, don’t want to remove the question
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "removeQuestionModal",

  components: {
    modalCover,
  },
};
</script>

<style lang="scss" scoped></style>
