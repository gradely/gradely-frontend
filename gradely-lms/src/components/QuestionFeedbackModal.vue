<template>
  <modal-cover @closeModal="$emit('closeTriggered')" :show_close_btn="true">
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          What is wrong with the question?
        </div>
        <div class="modal-cover-meta" v-if="true">Select all that applies</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="checkbox-wrapper">
          <span class="checkbox-holder">
            <input
              value="Labelling Problem"
              id="topic"
              type="checkbox"
              class="checkbox-main"
              @change="handle_change"
            />
          </span>
          <label for="topic" class="label-complain">
            <div class="header-label">Labeling Problem</div>
            <div class="header-description">
              Wrong title topic, or assigned to the wrong class
            </div>
          </label>
        </div>
        <div class="checkbox-wrapper">
          <span class="checkbox-holder">
            <input
              value="Answer Issues"
              id="answer"
              type="checkbox"
              class="checkbox-main"
              @change="handle_change"
            />
          </span>
          <label for="answer" class="label-complain">
            <div class="header-label">Answer issues</div>
            <div class="header-description">
              incorrect answer, poor explanation, ambiguous answer
            </div>
          </label>
        </div>
        <div class="checkbox-wrapper">
          <span class="checkbox-holder">
            <input
              @change="handle_change"
              value="Formatting Error"
              id="format"
              type="checkbox"
              class="checkbox-main"
            />
          </span>
          <label for="format" class="label-complain">
            <div class="header-label">Formating Error</div>
            <div class="header-description">
              wrong units, wrong formular, poor formular presentation
            </div>
          </label>
        </div>
        <div class="checkbox-wrapper">
          <span class="checkbox-holder">
            <input
              @change="handle_change"
              value="Incomplete Question"
              id="incomplete"
              type="checkbox"
              class="checkbox-main"
            />
          </span>
          <label for="incomplete" class="label-complain">
            <div class="header-label">Incomplete Question</div>
            <div class="header-description">
              Missing image, text, formular, or variable
            </div>
          </label>
        </div>

        <!-- any other details region -->
        <section class="section-text-area">
          <div class="any-details-wrapper">
            <span class="other-details-txt">Any other details? </span>
          </div>
          <div class="text-area-wrapper-container">
            <textarea
              placeholder="Tell us any other thing you have against the question"
              rows="4"
              cols="50"
              name="comment"
              class="comment-feed"
              v-model="textarea"
            />
          </div>
        </section>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end">
        <button
          @click="emit_feedback"
          :disabled="loading || !this.feedback_tags.length"
          class="btn btn-accent"
        >
          <span
            v-if="loading"
            class="icon-dotted-roller icon spinner animate font-15"
          ></span>
          <span class="text">
            Submit Feedback
          </span>
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import ModalCover from "@/components/ModalComps/ModalCover";
export default {
  name: "QuestionFeedbackModal",

  components: {
    ModalCover
  },
  data() {
    return {
      textarea: "",
      feedback_tags: []
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    report_id: {}
  },
  methods: {
    emit_feedback() {
      if (this.textarea.length > 0) {
        this.$emit("feedback", {
          reference_id: this.report_id,
          title: this.feedback_tags.toString(),
          description: this.textarea
        });
        return;
      } else {
        this.$emit("feedback", {
          reference_id: this.report_id,
          title: this.feedback_tags.toString()
        });
      }
    },
    handle_change(e) {
      const feedback = this.feedback_tags.filter(
        (text) => text === e.target.value
      );
      if (feedback.length) {
        this.feedback_tags = this.feedback_tags.filter(
          (text) => text !== e.target.value
        );
      } else {
        this.feedback_tags = [...this.feedback_tags, e.target.value];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  @include flex-row-start-nowrap;
  align-items: flex-start;
  margin: 1rem 0px;
  .checkbox-holder {
    padding-top: toRem(5);
  }
  .header-label {
    font-weight: bold;
    font-size: toRem(16);
    line-height: 22px;
    display: flex;
    align-items: flex-end;
    color: #353535;
  }
  .header-description {
    font-size: toRem(12);
    line-height: 16px;
    display: flex;
    align-items: center;
    color: #757575;
  }
}

// text area style region
.text-area-wrapper-container {
  width: 100%;
  .comment-feed {
    font-size: toRem(14);
    line-height: toRem(19);
    color: #757575;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 0.67rem;
    width: inherit;
  }
}
.any-details-wrapper {
  margin: 0.5rem 0px;
  @include flex-row-start-wrap;
  .other-details-txt {
    font-weight: bold;
    font-size: toRem(14);
    line-height: toRem(19);
    color: #757575;
  }
  .optional-parenthesis {
    font-size: toRem(14);
    line-height: toRem(19);
    margin: 0px 0.45rem;
    color: #757575;
  }
}
.font-15 {
  margin-right: 10px;
}
</style>
