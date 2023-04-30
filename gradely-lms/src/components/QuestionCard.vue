<template>
  <div class="card-main-wrapper">
    <section class="card-top-main-body">
      <span class="top-inner-wrapper">
        <span class="checkbox-holder">
          <input
            @change="$emit('check', question.id)"
            type="checkbox"
            class="checkbox-main"
            :checked="is_checked"
          />

          <!-- TOUR DESCRIPTION -->
          <template>
            <div
              class="
                tour-description
                brand-inverse-bg
                rounded-5
                h-auto
                smooth-animation
              "
              v-if="show_first_tour"
            >
              <!-- TOUR TEXT -->
              <div class="tour-text black-text">
                Select a minimum of 5 questions to continue
              </div>
            </div>
          </template>
        </span>
        <span
          @click="isActiveQuestCard = !isActiveQuestCard"
          class="question-right"
        >
          <div
            v-if="question.comprehension"
            class="
              comprehension-passage
              d-flex
              flex-column
              justify-content-center
            "
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
          <span v-html="question.question"></span>
          <div>
            <span
              class="bold-text"
              :class="
                question.difficulty === 'medium'
                  ? 'medium'
                  : question.difficulty === 'hard'
                  ? 'hard'
                  : ''
              "
              >{{ question.difficulty }}</span
            >
            <span class="duration-time"
              >Duration:&nbsp;{{ question.duration }}s</span
            >
          </div>
        </span>
      </span>
      <span
        @click="isActiveQuestCard = !isActiveQuestCard"
        class="icon-caret-down"
      ></span>
    </section>
    <div
      :class="[
        isActiveQuestCard
          ? `wrapper-lower-fold-container`
          : 'close-wrapper-lower-fold-container',
      ]"
    >
      <section class="card-bottom-main-body">
        <div
          v-if="question.type === 'multiple'"
          class="options-to-questions-wrapper"
        >
          <div
            v-for="(item, index) in optionsList"
            :key="index"
            class="options-question-item"
          >
            <span
              v-if="item.label != null"
              :class="
                question.answer === item.option.toUpperCase()
                  ? `
                circle-option-tick
                avatar
                circle-option-tick-correct-active`
                  : `circle-option-tick
                avatar`
              "
              >{{ item.option }}</span
            >
            <span
              v-if="item.label != null"
              v-html="formatOption(item.label)"
            ></span>
          </div>
        </div>
        <div
          v-if="question.type === 'bool'"
          class="options-to-questions-wrapper"
        >
          <div class="options-question-item">
            <span
              :class="
                Number(question.answer) === 1
                  ? `
                circle-option-tick
                avatar
                circle-option-tick-correct-active`
                  : `circle-option-tick
                avatar`
              "
              >A</span
            >
            <span>True</span>
          </div>
          <div class="options-question-item">
            <span
              :class="
                Number(question.answer) === 0
                  ? `
                circle-option-tick
                avatar
                circle-option-tick-correct-active`
                  : `circle-option-tick
                avatar`
              "
              >B</span
            >
            <span>False</span>
          </div>
        </div>
        <div
          v-if="question.type === 'short'"
          class="options-to-questions-wrapper"
        >
          <div class="answer-main">
            <div class="answer-text">Answer</div>
            <div class="answers-main">
              <span
                class="answer-main"
                v-for="(item, index) in question.answer"
                :key="index"
                >{{ item }}</span
              >
            </div>
          </div>
        </div>
      </section>
      <section class="footer-to-question-wrapper">
        <button
          @click="$emit('question-report', question.id)"
          class="e-holder-wrapper"
        >
          <span class="icon-main">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.33333 2.81975V8.09756C3.72193 8.03655 4.1645 7.99992 4.66667 7.99992C5.9245 7.99992 6.96076 8.41465 7.76201 8.73534C7.77186 8.73928 7.78167 8.74321 7.79145 8.74712L7.82852 8.76195C8.68703 9.10535 9.29284 9.33325 10 9.33325C10.6195 9.33325 11.0511 9.25826 11.3333 9.18009V3.90228C10.9447 3.96329 10.5022 3.99992 10 3.99992C8.74217 3.99992 7.70591 3.58518 6.90466 3.2645C6.89481 3.26056 6.885 3.25663 6.87522 3.25272L6.83815 3.23789C5.97962 2.89448 5.37383 2.66659 4.66667 2.66659C4.04721 2.66659 3.6156 2.74158 3.33333 2.81975ZM2.58333 1.66659C2.99999 1.49992 3.66665 1.33325 4.66667 1.33325C5.66667 1.33325 6.50036 1.66673 7.33227 1.99949L7.37054 2.01481C8.1906 2.34293 9.01537 2.66659 10 2.66659C10.8014 2.66659 11.3884 2.55953 11.8038 2.43159C12.006 2.3693 12.2258 2.40671 12.396 2.5324C12.5662 2.65808 12.6667 2.85712 12.6667 3.06872V9.64122C12.6667 9.89455 12.5231 10.126 12.2961 10.2385C12.2339 10.2694 12.1631 10.3013 12.0833 10.3333C11.6667 10.4999 11 10.6666 10 10.6666C9 10.6666 8.16631 10.3331 7.33439 10.0003L7.29615 9.98504C6.4761 9.65692 5.6513 9.33325 4.66667 9.33325C3.8653 9.33325 3.27829 9.44031 2.86291 9.56825C2.66069 9.63054 2.4409 9.59313 2.27068 9.46744C2.10045 9.34175 2 9.14272 2 8.93112V2.35862C2 2.10529 2.14358 1.87385 2.37056 1.76132C2.43279 1.73047 2.50352 1.69851 2.58333 1.66659Z"
                fill="#959595"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.66667 6.66659C3.03486 6.66659 3.33333 6.96506 3.33333 7.33325V14.6666C3.33333 15.0348 3.03486 15.3333 2.66667 15.3333C2.29848 15.3333 2 15.0348 2 14.6666V7.33325C2 6.96506 2.29848 6.66659 2.66667 6.66659Z"
                fill="#959595"
              />
            </svg>
          </span>
          <span class="e-load-side-txt">Report</span>
        </button>
        <button
          v-if="question.owner === 1"
          @click="$emit('question-edit', question.id)"
          class="e-holder-wrapper"
        >
          <span class="icon-main">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.79289 13.5002H3C2.86739 13.5002 2.74021 13.4475 2.64645 13.3537C2.55268 13.26 2.5 13.1328 2.5 13.0002V10.2073C2.5 10.1416 2.51293 10.0766 2.53806 10.0159C2.56319 9.95527 2.60002 9.90015 2.64645 9.85372L10.1464 2.35372C10.2402 2.25995 10.3674 2.20728 10.5 2.20728C10.6326 2.20728 10.7598 2.25995 10.8536 2.35372L13.6464 5.14662C13.7402 5.24038 13.7929 5.36756 13.7929 5.50017C13.7929 5.63278 13.7402 5.75995 13.6464 5.85372L6.14645 13.3537C6.10002 13.4002 6.0449 13.437 5.98424 13.4621C5.92357 13.4872 5.85855 13.5002 5.79289 13.5002Z"
                stroke="#959595"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.5 4L12 7.5"
                stroke="#959595"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.96799 13.4682L2.53174 10.032"
                stroke="#959595"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="e-load-side-txt">Edit</span>
        </button>
        <button
          type="button"
          v-if="question.owner === 1"
          @click="$emit('question-delete', question.id)"
          class="e-holder-wrapper"
        >
          <span class="icon-main">
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.333252 4.00008C0.333252 3.63189 0.631729 3.33341 0.999919 3.33341H12.9999C13.3681 3.33341 13.6666 3.63189 13.6666 4.00008C13.6666 4.36827 13.3681 4.66675 12.9999 4.66675H0.999919C0.631729 4.66675 0.333252 4.36827 0.333252 4.00008Z"
                fill="#F6515B"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.66659 2.00008C5.48977 2.00008 5.32021 2.07032 5.19518 2.19534C5.07016 2.32037 4.99992 2.48994 4.99992 2.66675V3.33341H8.99992V2.66675C8.99992 2.48994 8.92968 2.32037 8.80466 2.19534C8.67963 2.07032 8.51006 2.00008 8.33325 2.00008H5.66659ZM10.3333 3.33341V2.66675C10.3333 2.13631 10.1225 1.62761 9.74747 1.25253C9.37239 0.877462 8.86369 0.666748 8.33325 0.666748H5.66659C5.13615 0.666748 4.62744 0.877462 4.25237 1.25253C3.8773 1.62761 3.66659 2.13631 3.66659 2.66675V3.33341H2.33325C1.96506 3.33341 1.66659 3.63189 1.66659 4.00008V13.3334C1.66659 13.8638 1.8773 14.3726 2.25237 14.7476C2.62744 15.1227 3.13615 15.3334 3.66659 15.3334H10.3333C10.8637 15.3334 11.3724 15.1227 11.7475 14.7476C12.1225 14.3726 12.3333 13.8638 12.3333 13.3334V4.00008C12.3333 3.63189 12.0348 3.33341 11.6666 3.33341H10.3333ZM2.99992 4.66675V13.3334C2.99992 13.5102 3.07016 13.6798 3.19518 13.8048C3.32021 13.9298 3.48977 14.0001 3.66659 14.0001H10.3333C10.5101 14.0001 10.6796 13.9298 10.8047 13.8048C10.9297 13.6798 10.9999 13.5102 10.9999 13.3334V4.66675H2.99992Z"
                fill="#F6515B"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.66659 6.66675C6.03478 6.66675 6.33325 6.96522 6.33325 7.33341V11.3334C6.33325 11.7016 6.03478 12.0001 5.66659 12.0001C5.2984 12.0001 4.99992 11.7016 4.99992 11.3334V7.33341C4.99992 6.96522 5.2984 6.66675 5.66659 6.66675Z"
                fill="#F6515B"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.33325 6.66675C8.70144 6.66675 8.99992 6.96522 8.99992 7.33341V11.3334C8.99992 11.7016 8.70144 12.0001 8.33325 12.0001C7.96506 12.0001 7.66659 11.7016 7.66659 11.3334V7.33341C7.66659 6.96522 7.96506 6.66675 8.33325 6.66675Z"
                fill="#F6515B"
              />
            </svg>
          </span>
          <span class="e-load-side-txt">Delete</span>
        </button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionCard",

  props: {
    index: Number,
    question_count: Number,

    question: {
      type: Object,
    },

    savedHomeWork: {
      type: Array,
      default: () => [],
    },
  },

  watch: {
    question_count: {
      handler(value) {
        this.show_first_tour = false;

        setTimeout(() => {
          if (value === 0 && this.$route.query.tour && this.index == 0)
            this.show_first_tour = true;
        }, 3000);
      },
      immediate: true,
    },
  },

  data() {
    return {
      isActiveQuestCard: "",
      is_checked: false,
      optionsList: [],
      showMore: false,

      show_first_tour: false,
    };
  },

  methods: {
    formatOption(value) {
      return value.replace("<p>", "").replace("</p>", "");
    },

    customOptionListFactory: function (question) {
      if (question && Object.keys(question).length > 0) {
        Object.keys(question).some((key) => {
          if (/option_/.test(key)) {
            const keyOption = key.split("");
            this.optionsList.push({
              option: keyOption[keyOption.length - 1],
              label: question[key],
            });
          }
        });
        return;
      }
      return;
    },

    checkPropQuestionIdInLocalFrmStorage: function () {
      if (!this.savedHomeWork || !this.savedHomeWork.length) {
        return;
      } else {
        const filterQuestion = this.savedHomeWork?.filter(
          (e) => parseInt(e, 10) === parseInt(this.question.id, 10)
        );
        if (filterQuestion?.length) {
          this.is_checked = true;
        }
      }
    },
  },

  mounted() {
    // this is calling method to get the options array
    this.customOptionListFactory(this.question);
    // check the checked question with local-storage
    this.checkPropQuestionIdInLocalFrmStorage();
  },

  updated() {
    window?.MathJax?.typeset();
  },
};
</script>
<style lang="scss" scoped>
.card-main-wrapper {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 1px 4px #00000026;
  border-radius: 5px;
  padding: 0.8rem 1rem;
  margin: 1rem auto;

  @include breakpoint-down(lg) {
    padding: 0.8rem 0.6rem;
  }

  .close-wrapper-lower-fold-container {
    display: none;
  }

  .bold-text {
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 18px;
    text-transform: uppercase;
    color: #113255;
  }

  .hard {
    color: #f6515b !important;
  }

  .medium {
    color: #faa017 !important;
  }

  .card-top-main-body {
    padding: 0.65rem 0px;
    @include flex-row-between-nowrap;
    align-items: flex-start;

    .icon-caret-down {
      padding: 4px;
      cursor: pointer;
    }
  }

  .card-bottom-main-body {
    padding: 1rem 0px;
    border-top: 1px solid #d5d5d5;
  }

  .top-inner-wrapper {
    @include flex-row-start-nowrap;
    align-items: flex-start;
    .checkbox-holder {
      padding-top: toRem(8);
      position: relative;

      .tour-description {
        position: absolute;
        box-shadow: toRem(7) 0 toRem(25) rgba($black-text, 0.15);
        padding: toRem(18) toRem(15) toRem(16);
        width: toRem(220);
        top: toRem(32);
        left: toRem(-16);
        z-index: 1;

        @include breakpoint-down(sm) {
          padding: toRem(13) toRem(12);
          left: toRem(-12);
          width: toRem(170);
        }

        &::after {
          content: "";
          position: absolute;
          top: toRem(-6);
          left: 7.5%;
          transform: rotate(45deg);
          @include square-shape(18);
          background: $brand-inverse;

          @include breakpoint-down(sm) {
            @include square-shape(15);
            top: toRem(-4);
            left: 8%;
          }
        }

        .tour-text {
          @include font-height(12.5, 19);
          margin-bottom: toRem(5);

          @include breakpoint-down(sm) {
            @include font-height(11.75, 19);
          }

          @include breakpoint-down(xs) {
            margin-bottom: toRem(7);
          }
        }
      }
    }
    .question-right {
      padding-left: 10px;
      padding-top: 4px;

      @include breakpoint-down(sm) {
        padding-top: 5px;
        padding-left: 5px;
      }

      span {
        font-size: 15px;

        @include breakpoint-down(sm) {
          @include font-height(13.25, 21.5);
        }
      }

      .duration-time:before {
        content: "•";
        padding: 5px;
      }
      .duration-time {
        color: #858585;
        font-size: 0.797rem;
      }
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
      @include font-height(14.25, 19);
      width: 48%;
      margin: 1%;
      flex-flow: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @include breakpoint-down(lg) {
        // width: 100%;
        @include font-height(14, 19);
        margin: 1rem 0px;
      }

      @include breakpoint-down(sm) {
        @include font-height(13, 18);
      }

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
}

.footer-to-question-wrapper {
  @include flex-row-start-nowrap;
  width: 100%;
  padding: 1rem 0px;
  border-top: 1px solid #d5d5d5;
  .e-holder-wrapper {
    background: transparent;
    padding: 0px 1rem;
    @include flex-row-start-wrap;
    .e-load-side-txt {
      font-style: normal;
      font-weight: normal;
      font-size: 0.875rem;
      line-height: 19px;
      color: #113255;
      padding: 3px;
    }
    .icon-main {
      padding: 3px;
      @include flex-column-center;
    }
  }
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
.answer-text {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 1.1875rem;
  text-transform: uppercase;
  color: #757575;
}
.answers-main {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}
</style>
