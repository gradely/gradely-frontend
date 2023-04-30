<template>
  <div>
    <div v-if="question" class="card-main-wrapper rounded-5">
      <section class="card-bottom-main-body">
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
              v-html="question.comprehension.body"
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
        <div class="question-description" v-html="question.question"></div>
        <div
          v-show="question.image && !$route.path.includes('preview-question')"
          class="image-section rounded-5 position-relative"
        >
          <img :src="question.image" class="image-preview" alt="image" />
        </div>
        <!-- boolean section start  -->
        <div
          v-if="question.type === 'bool'"
          class="options-to-questions-wrapper"
        >
          <label class="options-question-item">
            <input
              :checked="
                !selected.length ? false : Number(selected) === 1 ? true : false
              "
              type="radio"
              value="1"
              name="true"
              @change="handle_checkbox"
            />
            <span>True</span>
          </label>
          <label class="options-question-item">
            <input
              :checked="
                !selected.length ? false : Number(selected) === 0 ? true : false
              "
              name="true"
              value="0"
              type="radio"
              @change="handle_checkbox"
            />
            <span>False</span>
          </label>
        </div>
        <!-- boolean section end -->

        <!-- multi choice question start -->
        <div
          v-if="question.type === 'multiple'"
          class="options-to-questions-wrapper"
        >
          <label
            v-for="(item, index) in optionsList.filter(
              (option) => option.label
            )"
            :key="index"
            class="options-question-item"
          >
            <input
              :checked="
                selected.length &&
                selected.toUpperCase() === item.option.toUpperCase()
                  ? true
                  : false
              "
              :value="item.option.toUpperCase()"
              type="radio"
              name="multiple"
              @change="handle_checkbox"
            />
            <span v-html="item.label"> </span>
          </label>
        </div>
        <!-- multi choice question end -->

        <!-- short answer start -->
        <div
          v-if="question.type === 'short'"
          class="single-ipnut-wrapper-holder"
        >
          <input
            class="text-area-main"
            onpaste="return false;"
            ondrop="return false;"
            @keydown="handle_text_input"
            @input="handle_text_input"
            name="answer"
            placeholder="Write answer"
            :value="selected"
            autocomplete="off"
          />
        </div>
        <!-- short ansver end -->

        <!-- essay start -->
        <div
          v-if="question.type === 'essay'"
          class="single-ipnut-wrapper-holder"
        >
          <input
            type="file"
            class="input-file"
            name="type-file"
            ref="input-file"
            @change="handle_file_change"
            accept="image/x-png,image/gif,image/jpeg,application/pdf"
          />
          <div class="text-input-main">
            <textarea
              :value="selected"
              class="text-area"
              name="essay"
              onpaste="return false;"
              ondrop="return false;"
              @keydown="handle_text_input"
              @input="handle_text_input"
            ></textarea>
            <div class="text-footer">
              Word Limit: {{ question.word_limit || 2000 }}, Word Count:
              {{ wordCount }}
            </div>
          </div>
          <div
            v-if="question && question.file_upload"
            class="attatch-file-area"
          >
            <div class="attatch-file-main">
              <span class="upper-main">Attach File</span>
              <span
                v-if="attempt && attempt.answer_attachment"
                class="icon-trash"
                @click="$emit('delete-file', question.id)"
                title="delete file"
              ></span>
            </div>
            <span @click="handle_file_select" class="main-upload-button">
              <span
                v-if="attempt && !attempt.answer_attachment"
                class="main-text"
              >
                Click here to attach your solution file
              </span>
              <span class="filename">
                {{
                  attempt && attempt.answer_attachment
                    ? attempt.answer_attachment.split("/")[
                        attempt.answer_attachment.split("/").length - 1
                      ]
                    : ""
                }}
              </span>
            </span>
            <span class="accepted-files"
              >We accept PDF, JPG, and PNG files.</span
            >
          </div>
        </div>
        <!-- essay end -->

        <!-- speak btn -->
        <div class="mgt-20 footer-main">
          <button v-if="show_speech" @click="handle_speech" class="speak-btn">
            <span class="speaker"
              ><svg
                width="24"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0072 17.4813C12.0072 17.9041 11.7629 18.2882 11.3806 18.4675C11.2328 18.5374 11.0744 18.5712 10.9171 18.5712C10.6679 18.5712 10.421 18.4856 10.2216 18.3202L4.26329 13.3829H1.08988C0.488059 13.3834 0 12.8951 0 12.2932V7.95102C0 7.34894 0.488059 6.86088 1.08988 6.86088H4.26355L10.2219 1.92355C10.5474 1.65372 10.9989 1.5962 11.3809 1.77677C11.7629 1.95605 12.0075 2.34041 12.0075 2.76295L12.0072 17.4813ZM16.1957 15.7783C16.1691 15.7801 16.1436 15.7811 16.1173 15.7811C15.8294 15.7811 15.5518 15.6674 15.3468 15.462L15.201 15.3158C14.8187 14.9342 14.7738 14.3298 15.0958 13.8959C15.9119 12.7955 16.3427 11.491 16.3427 10.1225C16.3427 8.6506 15.8537 7.27001 14.9281 6.12983C14.5757 5.69646 14.6082 5.06704 15.0032 4.67236L15.1486 4.52661C15.3664 4.30889 15.6581 4.19023 15.9739 4.20906C16.2813 4.22454 16.5685 4.36926 16.7635 4.60761C18.0473 6.17858 18.7255 8.08593 18.7255 10.1228C18.7255 12.0198 18.1258 13.8255 16.9907 15.3439C16.8011 15.5969 16.5112 15.7558 16.1957 15.7783ZM20.7017 19.1464C20.5047 19.3794 20.2196 19.5192 19.9144 19.5321C19.8995 19.5326 19.8843 19.5331 19.8688 19.5331C19.5801 19.5331 19.3031 19.4191 19.098 19.214L18.9548 19.0709C18.5547 18.671 18.5277 18.0315 18.8914 17.5987C20.6491 15.5082 21.6175 12.8533 21.6175 10.1225C21.6175 7.28213 20.5807 4.54776 18.6989 2.42321C18.3174 1.99191 18.3368 1.33901 18.7428 0.931435L18.8857 0.788268C19.0977 0.575194 19.3732 0.457822 19.6892 0.467883C19.9893 0.476395 20.273 0.608986 20.4724 0.833411C22.7471 3.39443 24 6.69373 24 10.1225C24.0005 13.4216 22.8291 16.6264 20.7017 19.1464Z"
                  fill="#113255"
                />
              </svg>
            </span>
            <span class="text mgl-10">Read to Me</span>
          </button>
        </div>
        <!-- speak btn ends here -->
      </section>

      <!-- tooltip-ish -->
      <div class="badge-wrapper">
        <div class="badge-holder">
          <div class="badge-number">
            {{ index }}
          </div>
          <div class="badge-chart"></div>
        </div>
      </div>
      <!-- End of tooltip -->
    </div>
    <!-- <p v-else>no availiable props in component assesment card</p> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AssesmentCard",

  data() {
    return {
      optionsList: [],
      showMore: false,
      wordCount: 0,
      file: {},
    };
  },

  props: {
    attempt: {},
    show_speech: {
      type: Boolean,
      default: true,
    },
    question: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
    },
    isIndexed: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: [String, Number, Boolean],
      default: "",
    },
  },
  methods: {
    ...mapActions(["toastAction", "updateQuestionShuffledOptions"]),

    customOptionListFactory(question) {
      if (question?.shuffled_options?.length) {
        this.optionsList = question?.shuffled_options;
        return;
      }

      let option = [];
      if (question && Object.keys(question).length > 0) {
        Object.keys(question).some((key) => {
          if (/option_/.test(key)) {
            const keyOption = key.split("");
            option.push({
              option: keyOption[keyOption.length - 1],
              label: question[key],
            });
          }
        });

        let shuffledOptions = [...option];
        let currentIndex = shuffledOptions.length,
          randomIndex;

        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [shuffledOptions[currentIndex], shuffledOptions[randomIndex]] = [
            shuffledOptions[randomIndex],
            shuffledOptions[currentIndex],
          ];
        }
        this.optionsList = shuffledOptions;
        this.updateQuestionShuffledOptions({
          index: this.index - 1,
          options: shuffledOptions,
        });
        return;
      }
      return;
    },
    handle_checkbox(e) {
      this.$emit("answer", {
        answer: e.target.value,
        id: this.question.id,
      });
    },
    handle_file_change(e) {
      const [file] = e.target.files;
      const fileType = file?.type
        .split("/")
        .pop()
        .toLowerCase();
      const acceptedFileTypes = ["jpeg", "jpg", "png", "pdf"];
      if (!acceptedFileTypes.includes(fileType.toLowerCase())) {
        this.toastAction({
          toastData: {
            toastOpen: true,
            toastText: "we only accept JPEG,JPG,PNG,PDF files",
            toastState: "error",
            showBtn: true,
          },
          timeout: 3000,
        });
        return;
      } else if (file.size > 10240000) {
        this.toastAction({
          toastData: {
            toastOpen: true,
            toastText: "Max Upload size is 10MB only",
            toastState: "error",
            showBtn: true,
          },
          timeout: 3000,
        });
        return;
      } else {
        // // this.$refs["preview-tag"].src = URL.createObjectURL(file);
        // // this.file = file;
        // // this.show_file = true;
        // this.file = file;
        this.$emit("file_change", e);
      }
    },
    handle_speech() {
      this.$emit("speak", this.question?.id);
    },
    handle_input(e) {
      this.$emit("answer", { answer: e.value, id: this.question.id });
    },
    handle_text_input(e) {
      if (
        this.question.type === "short"
          ? e?.target?.value.match(/(\w+)/g)?.length >= 5 &&
            e.code !== "Backspace" &&
            e.code === "Space"
          : e?.target?.value.match(/(\w+)/g)?.length >=
              this.question.word_limit &&
            e.code !== "Backspace" &&
            e.code === "Space"
      ) {
        e.preventDefault();
        return;
      }
      if (this.question.type === "essay") {
        this.wordCount = e?.target?.value.match(/(\w+)/g)?.length;
      }
      this.$emit("answer", { answer: e?.target?.value, id: this.question.id });
    },
    handle_file_select() {
      this.$refs["input-file"].click();
    },
  },
  mounted() {
    if (this.question?.type === "multiple") {
      this.customOptionListFactory(this?.question);
    }
    if (this.question?.type === "essay") {
      this.wordCount = this?.selected?.match(/(\w+)/g)?.length || 0;
    }
  },
  updated() {
    window?.MathJax?.typeset();
  },
  watch: {
    question() {
      this.showMore = false;
      if (this.question?.type === "essay") {
        this.wordCount = this?.selected?.match(/(\w+)/g)?.length || 0;
      }
      if (this.question?.type === "multiple") {
        this.customOptionListFactory(this?.question);
      }
    },
    selected() {},
  },
};
</script>
<style lang="scss" scoped>
.card-main-wrapper {
  position: relative;
  min-height: 6rem;
  background: $white-text;
  box-shadow: 0px 1px 4px #00000026;
  padding: 2rem;
  margin: 1rem auto;
  @include breakpoint-down(md) {
    padding: 1rem;
  }
  @include breakpoint-custom-down(800) {
    margin: 1rem;
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
  .question-description {
    font-style: normal;
    font-weight: normal;
    font-size: 1.3125rem;
    line-height: 29px;
    color: #353535;
    margin-bottom: 1rem;
    flex-flow: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @include breakpoint-down(md) {
      font-size: 1.1rem;
      line-height: 20px;
    }
  }
  .card-bottom-main-body {
    margin: 0 1.3rem;
    .single-input-wrapper-holder {
      .txt-wrapper-component {
        .txt-elm {
          background: #ffffff;
          border: 1px solid #d5d5d5;
          box-sizing: border-box;
          border-radius: 5px;
          padding: 0.67rem;
        }
      }
      .answer-wapper-label {
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 1.1875rem;
        text-transform: uppercase;
        color: #757575;
      }
    }
    .image-section {
      margin: 1.5rem 0;
      max-width: 260px;
      max-height: 170px;
      border: 1px solid #d5d5d5;
      background: #f5f5f5;
      .avatar {
        min-width: 1.5rem;
        min-height: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
        top: -6px;
        right: -6px;
        z-index: 1;
        transition: all 0.3s ease-in-out;
        background-color: #113255 !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .image-preview {
        max-width: inherit;
        max-height: inherit;
        width: 100%;
        object-fit: cover;
        height: 100%;
      }
    }
    .fill-missing-values-wrapper {
      .options {
        margin-right: 5px;
        font-style: normal;
        font-weight: normal;
        font-size: 1.3125rem;
        line-height: 29px;
        color: #353535;
        @include breakpoint-down(lg) {
          font-size: 1rem;
        }
      }
      .fill-missing-values-elm {
        @include flex-row-start-nowrap;
        .txt-wrapper-component {
          .txt-input-elm {
            width: 3rem;
            background: #f5f5f5;
            border: 1px solid #959595;
            box-sizing: border-box;
            border-radius: 5px;
          }
        }
      }
    }
    .options-to-questions-wrapper {
      align-items: flex-start !important;
      @include flex-row-start-wrap;
      max-width: 40rem;
      @include breakpoint-down(lg) {
        max-width: 100%;
      }
      .options-question-item {
        @include flex-row-start-wrap;
        width: 50%;
        margin: 1rem 0px;
        flex-flow: nowrap;
        @include breakpoint-down(lg) {
          // width: 100%;
          margin: 1rem 0px;
        }
        overflow: hidden;
        text-overflow: ellipsis;
        align-items: flex-start !important;
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
  // dropdown from the three circle
  .option-list-main {
    position: relative;
    .close-option-select-wrapper {
      display: none;
    }
    .option-select-wrapper {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      top: 2.5rem;
      right: -26px;
      z-index: 999;
      background: #fff;
      padding-left: 0px;
      list-style: none;
      overflow: hidden;
      user-select: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      .create-question-item {
        padding: 1rem;
        width: 100%;
        cursor: pointer;
      }
    }
  }
  .three-circles {
    position: absolute;
    top: 0rem;
    right: -1.8rem;
    height: 10px;
    width: 10px;
    border-radius: 100%;
    background: #f5f5f5;
    cursor: pointer;
  }
  .icon-ellipsis:before {
    content: "\e93c";
    @include flex-column-center;
    font-size: 1.3rem;
    color: #113255;
    padding: 6px 5px;
  }
}
// tool-tip ish badge here
.badge-wrapper {
  position: absolute;
  top: 1.875rem;
  left: toRem(-10);
  .badge-holder {
    width: 100%;
    height: 2.4rem;
    background: $brand-black;
    border-radius: 4px 4px 4px 0px;
    position: relative;
    .badge-number {
      padding: 7px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
    .badge-chart:before {
      content: "";
      position: absolute;
      top: 100%;
      left: 5px;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: $brand-black $brand-black transparent transparent;
    }
  }
}
.open-ended-values-wrapper {
  .custom-input-wrapper-container {
    .label-holder-txt {
      font-style: normal;
      font-weight: bold;
      font-size: 0.875rem;
      line-height: 19px;
      text-transform: uppercase;
      color: #757575;
      margin: 0.78rem 0px;
    }
  }
}
.footer-main {
  button {
    padding: 8px 19px;
    background: #dbf5f8;
    color: #113255;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.text-input-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.text-area-main {
  border-radius: 5px;
  width: 100%;
  height: 2rem;
  padding: 1rem;
  border: 1px solid #96a0aa;
  box-shadow: 0 2px 2px 0 #2e3c490d;
}
.text-area {
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  height: 10rem;
  outline: none;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}

.attatch-file-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 1rem;
}
.upper-main {
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-transform: uppercase;
  color: #757575;
}
.text-footer {
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  padding: 0.9rem;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-top: none;
}
.main-upload-button {
  background: #fceacf;
  border: 1px solid #faa017;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 0.5rem;
  cursor: pointer;
}
.accepted-files {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #757575;
  margin-top: 0.5rem;
}
.input-file {
  display: none;
}
.attatch-file-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .icon-trash {
    cursor: pointer;
  }
}
</style>
