<template>
  <modal-cover @closeModal="$emit('closeTriggered')" :show_close_btn="true">
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header header-nav-modal">
        <div class="preview-question">Preview Question</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div>
          <section class="card-top-main-body">
            <div>
              <span
                >Arrange the following from the greatest to the least. -9, +5,
                -6, +2, -4</span
              >
            </div>
          </section>
          <section class="card-bottom-main-body">
            <div class="options-to-questions-wrapper">
              <div class="options-question-item">
                <span class="circle-option-tick avatar">a</span>
                <span>+5, +2, -2, -4, -9</span>
              </div>
              <div class="options-question-item">
                <span
                  class="
                    circle-option-tick circle-option-tick-correct-active
                    avatar
                  "
                  >b</span
                >
                <span>+5, +2, -2, -4, -9</span>
              </div>
              <div class="options-question-item">
                <span class="circle-option-tick avatar">c</span>
                <span>+5, +2, -2, -4, -9</span>
              </div>
              <div class="options-question-item">
                <span class="circle-option-tick avatar">d</span>
                <span>+5, +2, -2, -4, -9</span>
              </div>
            </div>
            <div class="explanation-header">Explanation</div>
            <div class="explanation-meta-data-info">
              The ‘option A’ is a solid shape. The shape is a square prism and
              it is a 3D shape.
            </div>
          </section>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer modal-cover-footer-inner d-flex">
        <span class="icon-flag"></span>
        <div>
          <span class="issue-questions">Have an issue with this question?</span>
          <span class="submit-feedback">Submit Feedback</span>
        </div>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import ModalCover from "@/components/ModalComps/ModalCover";
export default {
  name: "PreviewQuestionModal",
  components: {
    ModalCover
  }
};
</script>

<style lang="scss" scoped>
.explanation-header {
  font-weight: bold;
  font-size: toRem(14);
  line-height: 19px;
  text-transform: uppercase;
  color: #959595;
}
.explanation-meta-data-info {
  font-size: toRem(14);
  line-height: 165%;
  color: #353535;
}

.modal-cover-footer-inner {
  border: 1px solid #d5d5d5;
  @include flex-row-start-wrap;
  .issue-questions {
    font-size: toRem(14);
    line-height: toRem(16);
    color: #555555;
  }

  .submit-feedback {
    font-size: toRem(14);
    font-weight: bold;
    line-height: toRem(16);
    color: $brand-accent;
    margin: 5px;
  }
}

.header-nav-modal {
  background: #ffffff;
  box-shadow: 0px 1px 4px #00000026;
  .preview-question {
    font-weight: bold;
    font-size: 1rem;
    line-height: 22px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: #353535;
  }
}

.options-to-questions-wrapper {
  @include flex-row-start-wrap;
  align-items: flex-start;
  @include breakpoint-down(lg) {
    max-width: 100%;
  }
  .options-question-item {
    @include flex-row-start-wrap;
    width: 48%;
    margin: 1%;
    flex-flow: nowrap;
    @include breakpoint-down(lg) {
      width: 100%;
      margin: 1rem 0px;
    }
    flex-flow: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .circle-option-tick {
      @include flex-row-center-wrap;
      margin-right: 0.86rem;
      background: #f5f5f5;
      font-size: 14px;
      line-height: 50%;
      color: #555555;
      cursor: pointer;
    }

    // add this class to show correct tick on option in card
    .circle-option-tick-correct-active:before {
      content: "\2713";
      position: absolute;
      top: 0px;
      left: 0;
      width: 100%;
      height: 100%;
      @include flex-row-center-nowrap;
      color: $brand-black;
      font-weight: bold;
      text-align: center;
      z-index: 1;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      background-color: $brand-green;
    }
  }
}

.top-inner-wrapper {
  @include flex-row-start-nowrap;
  .question-right {
    padding-left: 10px;
  }
}
</style>
