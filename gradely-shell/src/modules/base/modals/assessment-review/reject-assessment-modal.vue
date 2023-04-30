<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-capitalize">
          Reject Submission
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="feedback-modal">
          <!-- TITLE TEXT  -->
          <div class="title-text">Why are you rejecting it?</div>

          <!-- ITEM ONE  -->
          <label for="cheating" class="check-item checkbox">
            <input type="checkbox" id="cheating" />
            <div class="text">Cheating</div>
          </label>

          <!-- ITEM TWO  -->
          <label for="impersonation" class="check-item checkbox">
            <input type="checkbox" id="impersonation" />
            <div class="text">Impersonation</div>
          </label>

          <!-- ITEM THREE  -->
          <label for="disobedience" class="check-item checkbox">
            <input type="checkbox" id="disobedience" />
            <div class="text">Disobedience to instruction</div>
          </label>

          <!-- FORM AREA  -->
          <div class="form-area">
            <div class="form-title">
              <span class="font-weight-600"> Any other details?</span>
              (Optional)
            </div>

            <textarea
              cols="30"
              rows="6"
              class="form-control"
              placeholder="Your Message here"
            ></textarea>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-center">
        <button class="btn btn-accent">
          Confirm Action
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "rejectAssessmentModal",

  components: {
    modalCover,
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-footer {
  .btn {
    padding: toRem(12.5) toRem(32);
    font-size: toRem(10.5);
  }
}
</style>
