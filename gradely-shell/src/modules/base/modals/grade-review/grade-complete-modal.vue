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
            v-lazy="mxStaticImg('SuccessIcon.svg')"
            alt=""
            class="w-100 h-100"
          />
        </div>

        <!-- TITLE  -->
        <div class="title-text brand-navy font-weight-700 mgt-20 mgb-15">
          Grading Complete
        </div>

        <div class="info-text color-ash text-center mgb-5">
          All questions in your assessment
          <span class="font-weight-600">“Assessment title here”</span> has been
          graded, and the report generated. Finalize your grades to continue.
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div
        class="modal-cover-footer d-flex flex-column align-items-center justify-content-start mgb-10"
      >
        <button class="c-btn text-uppercase btn-accent font-weight-600">
          finalize grades
        </button>

        <button
          class="c-btn btn-text mgt-10 bg-transparent no-shadow color-text"
        >
          View Assessment Report
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "gradeCompleteModal",

  components: {
    modalCover,
  },
};
</script>

<style lang="scss" scoped></style>
