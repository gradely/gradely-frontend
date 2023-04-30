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
          <button class="pagination-number-wrapper">
            <span
              v-if="activeQuestion > 1"
              class="icon-caret-fill-left arrow-left"
              @click="$emit('change-index', activeQuestion - 1)"
            ></span>
            <span class="question-txt">
              Question {{ activeQuestion }} / {{ reArrangedQuestions.length }}
            </span>
            <span
              @click="$emit('change-index', activeQuestion + 1)"
              v-if="activeQuestion < reArrangedQuestions.length"
              class="arrow-right icon-caret-fill-right"
            ></span>
          </button>
          <div
            :key="ind"
            v-for="(question, ind) in reArrangedQuestions.filter(
              (item, index) => index + 1 === activeQuestion
            )"
            class="question-container"
          >
            <section class="card-top-main-body">
              <div
                v-if="question.comprehension"
                class="comprehension-passage d-flex flex-column justify-content-center "
                :class="
                  !showMore && question.comprehension.body.length > 520
                    ? 'align-items-center'
                    : 'align-items-start'
                "
              >
                <div class="main">
                  <div
                    class="comprehension-text"
                    :class="
                      !showMore && question.comprehension.body.length > 520
                        ? 'hide'
                        : ''
                    "
                    v-html="
                      question.comprehension.body.replace(
                        /(<p[^>]+?>|<p>|<\/p>)/gim,
                        ''
                      )
                    "
                  ></div>
                  <div
                    v-if="showMore && question.comprehension.body.length > 520"
                    class="read-less"
                    @click="showMore = false"
                  >
                    Read less
                  </div>
                </div>
                <div
                  v-if="!showMore && question.comprehension.body.length > 520"
                  class="read-more-btn"
                >
                  <button @click="showMore = true" class="show-more">
                    <span class="expand-svg d-flex">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.919282 0.91916C1.29436 0.544088 1.80306 0.333374 2.3335 0.333374H4.3335C4.70169 0.333374 5.00016 0.631851 5.00016 1.00004C5.00016 1.36823 4.70169 1.66671 4.3335 1.66671H2.3335C2.15668 1.66671 1.98712 1.73695 1.86209 1.86197C1.73707 1.98699 1.66683 2.15656 1.66683 2.33337V4.33337C1.66683 4.70156 1.36835 5.00004 1.00016 5.00004C0.631973 5.00004 0.333496 4.70156 0.333496 4.33337V2.33337C0.333496 1.80294 0.54421 1.29423 0.919282 0.91916ZM9.00016 1.00004C9.00016 0.631851 9.29864 0.333374 9.66683 0.333374H11.6668C12.1973 0.333374 12.706 0.544088 13.081 0.91916C13.4561 1.29423 13.6668 1.80294 13.6668 2.33337V4.33337C13.6668 4.70156 13.3684 5.00004 13.0002 5.00004C12.632 5.00004 12.3335 4.70156 12.3335 4.33337V2.33337C12.3335 2.15656 12.2633 1.98699 12.1382 1.86197C12.0132 1.73695 11.8436 1.66671 11.6668 1.66671H9.66683C9.29864 1.66671 9.00016 1.36823 9.00016 1.00004ZM1.00016 9.00004C1.36835 9.00004 1.66683 9.29852 1.66683 9.66671V11.6667C1.66683 11.8435 1.73707 12.0131 1.86209 12.1381C1.98712 12.2631 2.15669 12.3334 2.3335 12.3334H4.3335C4.70169 12.3334 5.00016 12.6319 5.00016 13C5.00016 13.3682 4.70169 13.6667 4.3335 13.6667H2.3335C1.80306 13.6667 1.29436 13.456 0.919282 13.0809C0.54421 12.7058 0.333496 12.1971 0.333496 11.6667V9.66671C0.333496 9.29852 0.631973 9.00004 1.00016 9.00004ZM13.0002 9.00004C13.3684 9.00004 13.6668 9.29852 13.6668 9.66671V11.6667C13.6668 12.1971 13.4561 12.7058 13.081 13.0809C12.706 13.456 12.1973 13.6667 11.6668 13.6667H9.66683C9.29864 13.6667 9.00016 13.3682 9.00016 13C9.00016 12.6319 9.29864 12.3334 9.66683 12.3334H11.6668C11.8436 12.3334 12.0132 12.2631 12.1382 12.1381C12.2633 12.0131 12.3335 11.8435 12.3335 11.6667V9.66671C12.3335 9.29852 12.632 9.00004 13.0002 9.00004Z"
                          fill="#113255"
                        />
                      </svg>
                    </span>
                    <span class="text">Expand</span>
                  </button>
                </div>
              </div>
              <div>
                <span v-html="question.question"> </span>
              </div>
            </section>
            <div
              v-if="question.image"
              class="image-section rounded-5 position-relative"
            >
              <img :src="question.image" class="image-preview" alt="image" />
            </div>
            <!-- multiple choice options starts here -->
            <div
              v-if="question.type === 'multiple'"
              class="card-bottom-main-body"
            >
              <div class="options-to-questions-wrapper">
                <div
                  class="options-question-item"
                  v-for="option in question.optionsList.filter((e) => e.label)"
                  :key="option.option"
                >
                  <span
                    v-if="question.answer"
                    class="circle-option-tick avatar"
                    :class="
                      option.option.toUpperCase() ===
                      question.answer.toUpperCase()
                        ? ' circle-option-tick-correct-active'
                        : ''
                    "
                    >{{ option.option.toUpperCase() }}</span
                  >
                  <div class="option-label" v-html="option.label"></div>
                </div>
              </div>
            </div>
            <!-- multiple choice options ends here -->

            <!-- boolean options start here -->
            <div
              v-if="question.type === 'bool'"
              class="options-to-questions-wrapper"
            >
              <div class="options-question-item">
                <span
                  class="circle-option-tick avatar"
                  :class="
                    parseInt(question.answer, 10) === 1
                      ? 'circle-option-tick-correct-active'
                      : ''
                  "
                  >A</span
                >
                <span>True</span>
              </div>
              <div class="options-question-item">
                <span
                  class="circle-option-tick avatar"
                  :class="
                    parseInt(question.answer, 10) === 0
                      ? 'circle-option-tick-correct-active'
                      : ''
                  "
                  >B</span
                >
                <span>False</span>
              </div>
            </div>
            <!-- boolean options ends here -->

            <!-- short answer ooptions starts here -->
            <div
              v-if="question.type === 'short'"
              class="single-input-wrapper-holder"
            >
              <label class="answer-wapper-label">Answer</label>
              <div v-if="array.isArray(question.answer)" class="answer-main">
                <div
                  class="txt-wrapper-component"
                  v-for="(item, index) in question.answer"
                  :key="index"
                  v-html="item"
                ></div>
              </div>
              <div
                class="txt-wrapper-component"
                v-else
                v-html="question.answer"
              ></div>
            </div>
            <!--short answer options ends here  -->

            <section class="question-meta-wrapper">
              <div class="question-meta-header">Question Meta</div>
              <div class="meta-data-item">
                <span class="label-diff-meta">Difficulty:</span>
                <span class="level">Easy</span>
              </div>
              <div class="meta-data-item">
                <span class="label-diff-meta">Duration:</span>
                <span class="level">{{ question.duration }}s</span>
              </div>
              <div v-if="question.score" class="meta-data-item">
                <span class="label-diff-meta">Score:</span>
                <span class="level">{{ question.score }}</span>
              </div>
              <div class="meta-data-item">
                <span class="label-diff-meta">Topic:</span>
                <span class="level">{{ question.topic }}</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div
        :key="ind"
        v-for="(question, ind) in reArrangedQuestions.filter(
          (item, index) => index + 1 === activeQuestion
        )"
        class="modal-cover-footer modal-cover-footer-inner d-flex"
      >
        <button
          @click="$emit('delete', question.id)"
          class="btn btn-add btn-tonic-outline"
        >
          <span class="bin-elm-ico icon-trash"></span>
          <span>Remove</span>
        </button>
        <button
          @click="$emit('edit', question.id)"
          v-if="question.owner === 1"
          class="btn btn-add btn-default-outline"
        >
          <span class="edit-elm-ico icon-edit-line"></span>
          <span>Edit</span>
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import ModalCover from "@/components/ModalComps/ModalCover";
export default {
  name: "PreviewQuestionPanelModal",
  components: {
    ModalCover
  },
  data() {
    return {
      showMore: false,
      array: Array
    };
  },
  props: {
    currentIndex: {
      type: Number,
      default: 1
    },
    questions: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    activeQuestion() {
      return this.currentIndex;
    },
    reArrangedQuestions() {
      if (!this.questions.length) return;
      const questions = this.questions.map((question) => {
        if (question.type === "multiple") {
          question.optionsList = [];
          if (question && Object.keys(question).length > 0) {
            Object.keys(question).some((key) => {
              if (/option_/.test(key)) {
                const keyOption = key.split("");
                question.optionsList.push({
                  option: keyOption[keyOption.length - 1],
                  label: question[key]
                });
              }
            });
          }
          return question;
        }
        return question;
      });
      return questions;
    }
  },
  watch: {
    activeQuestion() {
      this.showMore = false;
    }
  },
  mounted() {},
  updated() {
    window?.MathJax?.typeset();
  }
};
</script>

<style lang="scss" scoped>
.question-meta-wrapper {
  .meta-data-item {
    .label-diff-meta {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      color: #757575;
      margin-right: 5px;
    }

    .level {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 19px;
      text-transform: uppercase;
      color: #113255;
    }
  }
  .question-meta-header {
    font-style: normal;
    font-weight: bold;
    font-size: 0.87rem;
    line-height: 19px;
    text-transform: uppercase;
    color: #959595;
    margin: 1rem auto;
  }
}

.modal-cover-footer-inner {
  border: 1px solid #d5d5d5;
  @include flex-row-between-wrap;
  .btn-add {
    margin: 0.67rem 0px;
    .edit-elm-ico,
    .bin-elm-ico {
      margin: 0px 0.5rem;
      font-size: 1rem;
    }
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

.pagination-number-wrapper {
  font-style: normal;
  font-weight: normal;
  font-size: toRem(14);
  line-height: 19px;
  text-transform: uppercase;
  color: #2a4f77;
  background: transparent;
  margin: 1rem auto;
  .arrow-left,
  .arrow-right {
    margin: 5px;
  }
}
.image-section {
  margin: toRem(7);
  max-width: 260px;
  max-height: 170px;
  border: 1px solid #d5d5d5;
  background: #f5f5f5;
  .loader-main {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffffde;
    top: 0;
    bottom: 0;
  }

  .image-preview {
    max-width: inherit;
    max-height: inherit;
    width: 100%;
    object-fit: cover;
    height: 100%;
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
      margin: 0.5rem 0px;
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
.single-input-wrapper-holder {
  .answer-wapper-label {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 1.1875rem;
    text-transform: uppercase;
    color: #757575;
  }
}

.top-inner-wrapper {
  @include flex-row-start-nowrap;
  .question-right {
    padding-left: 10px;
  }
}
.option-label {
  display: flex;
}
.comprehension-passage {
  position: relative;
  padding-bottom: 1rem;
  .comprehension-text {
    overflow: hidden;
  }
  .comprehension-text.hide {
    max-height: 173px;
    -webkit-mask-image: linear-gradient(180deg, #000 9%, transparent);
    mask-image: linear-gradient(180deg, #000 9%, transparent);
  }
  .read-less {
    font-style: italic;
    text-decoration: underline;
    cursor: pointer;
    color: #faa017;
    margin-top: 13px;
  }
  .read-more-btn {
    position: absolute;
    bottom: 2rem;
    .show-more {
      padding: 8px 16px;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fceacf;
      color: #113255;
      .text {
        margin-left: 10px;
      }
    }
  }
}
</style>
