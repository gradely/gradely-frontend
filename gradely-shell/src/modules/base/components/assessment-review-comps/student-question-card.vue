<template>
  <div
    class="
      question-card
      white-text-bg
      rounded-5
      box-shadow-effect
      mgb-10
      position-relative
    "
  >
    <!-- COUNTER  -->
    <div class="counter position-relative">
      <div class="wrapper position-relative">
        <div class="icon icon-chat-card" :class="getQuestionColorStatus"></div>
        <div class="count white-text">{{ counter }}</div>
      </div>
    </div>

    <div class="wrapper-content">
      <!-- QUESTION  -->
      <div
        class="question-text color-text position-relative"
        v-html="question.question"
      ></div>

      <!-- QUESTION IMAGE -->
      <div
        class="question-image mgt-14 mgb-0 position-relative w-auto"
        v-if="question.image"
      >
        <img :src="question.image" alt="Question Image" class="pointer" />

        <!-- IMGAE LENS -->
        <div
          class="avatar brand-inverse-light-bg pointer smooth-transition"
          title="View image"
          @click="togglePreviewer"
        >
          <div class="icon icon-zoom-in brand-navy"></div>
        </div>
      </div>

      <!-- CHOICE -->
      <div class="choice color-text position-relative mgt-8">
        <span class="mgr-5">Your answer:</span>
        <span class="font-weight-700" v-html="getQuestionChoice"></span>
      </div>
    </div>

    <!-- CORRECT STATUS -->
    <div class="correct-status w-100" :class="getQuestionColorStatus + '-bg'">
      <div class="status">{{ getQuestionTextStatus }}</div>
    </div>

    <div class="wrapper-content pdb-3" style="margin-top: unset">
      <!-- CHOICE -->
      <div class="choice color-text position-relative" v-if="seeScore">
        <span class="mgr-5"> The correct answer is:</span>
        <span class="font-weight-700" v-html="getQuestionAnswer"></span>
      </div>
    </div>

    <script
      type="application/javascript"
      defer
      async="true"
      src="https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image"
    ></script>

    <portal to="gradely-modals">
      <transition name="fade" mode="out-in" v-if="show_previewer">
        <media-viewer
          :user="{
            image: student_info.image,
            full_name: student_info.full_name,
            date: student_info.date,
          }"
          :media="{
            resources: [question.image],
            sharable: false,
            type: 'image',
          }"
          @closeTriggered="togglePreviewer"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import mediaViewer from "@/shared/components/media-viewer";

export default {
  name: "studentQuestionCard",

  components: {
    mediaViewer,
  },

  props: {
    counter: {
      type: Number,
      default: 1,
    },
    question: {
      type: Object,
      default: () => ({
        id: 1,
        image: "",
        question: "What is the logarithmic characteristic of 1.345?",
      }),
    },
    student_info: {
      type: Object,
    },

    see_score: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    seeScore() {
      return this.getAuthType != "student" || this.see_score;
    },

    getQuestionColorStatus() {
      if (!this.seeScore) return "border-grey-dark";
      if (Number(this.question?.is_correct) === 0) return "brand-red";
      else if (Number(this.question?.is_correct) === 1) return "brand-green";
      else return "border-grey-dark";
    },

    getQuestionTextStatus() {
      if (!this.seeScore) return "Pending";
      if (Number(this.question?.is_correct) === 0) return "Incorrect";
      else if (Number(this.question?.is_correct) === 1) return "Correct";
      else return "Skipped";
    },

    getQuestionChoice() {
      // MULTIPLE QUESTION TYPE
      if (this.question?.type === "multiple") {
        if (this.question?.selected) {
          let choice = this.convertValueToNum(this.question?.selected);
          return this.stripBreakTags(this.options[choice]);
        } else "Not selected";
      }
      // BOOL QUESTION TYPE
      else if (this.question?.type === "bool") {
        if (this.question?.selected === this.question?.answer) return "True";
        else return "False";
      }
      //   SHORT ANSWER
      else if (this.question?.type === "short") {
        return this.question?.selected;
      } else return false;
    },

    getQuestionAnswer() {
      // MULTIPLE QUESTION TYPE
      if (this.question?.type === "multiple") {
        let answer = this.convertValueToNum(this.question?.answer);
        return this.stripBreakTags(this.options[answer]);
      }
      // BOOL QUESTION TYPE
      else if (this.question?.type === "bool") {
        if (this.question?.answer === "1") return "True";
        else return "False";
      }
      //   SHORT ANSWER
      else if (this.question?.type === "short") {
        return this.showShortAnswer();
      } else return false;
    },
  },

  watch: {
    question: {
      handler(value) {
        if (Object.keys(value).length) {
          this.formatQuestion();
          this.loadQuestionOptionsIfMultiple();
        }
      },
      immediate: true,
    },
  },

  data: () => ({
    show_previewer: false,
    options: [],
  }),

  methods: {
    togglePreviewer() {
      this.show_previewer = !this.show_previewer;
    },

    // FORMAT QUESTION
    formatQuestion() {
      this.$nextTick(() => {
        let small_screen = window.matchMedia("(max-width: 568px)");
        let extra_small_screen = window.matchMedia("(max-width: 450px)");

        document.querySelectorAll(".wrapper-content").forEach((element) => {
          let children = Array.from(element?.children) ?? [];

          children.forEach((elm) => {
            // REMOVE BREAK TAGS
            elm.querySelectorAll("br").forEach((ele) => ele.remove());
            elm.querySelectorAll("figure").forEach((figure) => {
              figure.querySelector("img").style.minWidth = "25%";
              figure.querySelector("img").style.width = "auto";
              figure.querySelector("img").style.maxWidth = "50%";
              figure.querySelector("img").style.height = "auto";
              figure.querySelector("img").style.maxHeight = "260px";

              // WATCH FOR CHANGES IN SCREEN SIZES
              if (small_screen.matches)
                figure.querySelector("img").style.maxWidth = "60%";

              if (extra_small_screen.matches)
                figure.querySelector("img").style.maxHeight = "200px";
            });
          });
        });
      });
    },

    stripBreakTags(value) {
      return value?.replace("<br />", "");
    },

    // LOAD QUESTION OPTION IF IT IS MULTIPLE TYPE
    loadQuestionOptionsIfMultiple() {
      if (this.question?.type === "multiple") {
        this.options = [
          this.question?.option_a,
          this.question?.option_b,
          this.question?.option_c,
          this.question?.option_d,
          this.question?.option_e,
        ];
      }
    },

    convertValueToNum(value) {
      if (value.toLowerCase() === "a") return 0;
      else if (value.toLowerCase() === "b") return 1;
      else if (value.toLowerCase() === "c") return 2;
      else if (value.toLowerCase() === "d") return 3;
      else if (value.toLowerCase() === "e") return 4;
      else return 5;
    },

    showShortAnswer() {
      if (Number(this.question?.is_correct) === 1)
        return this.question?.selected;
      else return this.question?.answer.split('"')[1];
    },
  },
};
</script>

<style lang="scss" scoped>
.question-card {
  .counter {
    border: toRem(1) solid transparent;
    margin-left: toRem(-8.75);
    width: max-content;

    .wrapper {
      margin-top: toRem(10);

      .icon {
        font-size: toRem(38);

        @include breakpoint-down(xs) {
          font-size: toRem(36);
        }
      }

      .count {
        @include center-placement;
        font-size: toRem(10);
        margin-top: toRem(-2.75);

        @include breakpoint-down(xs) {
          font-size: toRem(8.5);
          margin-top: toRem(-2.25);
        }
      }
    }
  }

  .wrapper-content {
    position: relative;
    margin-top: toRem(-40);
    margin-left: toRem(45);
    padding-right: toRem(10);

    @include breakpoint-down(xs) {
      margin-left: toRem(40);
    }

    .question-text {
      @include font-height(13.25, 21);
      margin-bottom: 0;
      margin-top: toRem(5);

      @include breakpoint-down(xs) {
        @include font-height(12.5, 18);
      }
    }

    .question-image {
      img {
        min-width: 25%;
        width: auto;
        max-width: 50%;
        height: auto;
        max-height: toRem(260);

        @include breakpoint-down(sm) {
          max-width: 60%;
        }

        @include breakpoint-down(xs) {
          max-height: toRem(200);
        }
      }

      .avatar {
        @include square-shape(34);
        top: toRem(-40);
        left: toRem(5);

        @include breakpoint-down(xs) {
          @include square-shape(30);
        }

        &:hover {
          background: $brand-accent-light !important;
        }

        .icon {
          @include center-placement;
          font-size: toRem(16);
        }
      }
    }

    .choice {
      @include flex-row-start-wrap;
      align-items: flex-start;
      @include font-height(12.75, 20);
      margin-bottom: toRem(22);

      @include breakpoint-down(xs) {
        @include font-height(12.35, 18);
      }
    }
  }

  .correct-status {
    padding: toRem(10) 0;
    margin-bottom: toRem(20);

    @include breakpoint-down(xs) {
      padding: toRem(8.5) 0;
    }

    .status {
      @include font-height(13, 20);
      margin-left: toRem(45);
      color: $white-text;

      @include breakpoint-down(xs) {
        @include font-height(12.5, 18);
        margin-left: toRem(40);
      }
    }
  }
}
</style>
