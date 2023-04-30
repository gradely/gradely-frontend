<template>
  <div
    class="review-question-card rounded-10 box-shadow-effect border mgb-7"
    :class="
      is_deleted_id === question.id ? ' brand-red-light-bg' : 'white-text-bg'
    "
  >
    <!-- QUESTION TOP -->
    <div class="question-top" @click="toggleOptions">
      <div class="left">
        <!-- COUNTER -->
        <div class="avatar counter brand-navy-bg rounded-10">
          <div class="count white-text font-weight-500">{{ count }}</div>
        </div>

        <!-- QUESTION -->
        <div class="wrapper-content">
          <div class="question-text color-ash" v-html="question.question"></div>

          <!-- QUESTION IMAGE -->
          <div
            class="question-image position-relative w-auto"
            v-if="question.image"
          >
            <img :src="question.image" alt="Question Image" class="pointer" />
          </div>

          <div class="question-info color-ash">
            <div>{{ question.topic_details.topic }}</div>
            <div class="dot"></div>
            <div>
              {{ question.score }}
              {{ question.score > 1 ? "Points" : "Point" }}
            </div>
            <div class="dot"></div>
            <div
              class="difficulty text-uppercase font-weight-600"
              :class="getDifficultyColor"
            >
              {{ question.difficulty }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="right avatar rounded-10 pointer smooth-transition"
        title="Toggle options"
      >
        <div
          class="icon brand-inverse smooth-transition icon-caret-down"
          :class="show_options ? 'rotate-180' : null"
        ></div>
      </div>
    </div>

    <!-- OPTION BOTTOM -->
    <div class="option-bottom smooth-transition" v-if="show_options">
      <div class="spacer"></div>

      <div class="w-100">
        <div class="intro color-grey-dark">
          <div class="text">{{ showOptionResponse }}</div>
          <div class="line"></div>
        </div>

        <div class="option-container">
          <review-option-column
            v-for="(option, index) in getOptions"
            :key="index"
            :option="option"
            :question_type="question.type"
          />
        </div>

        <!-- CTA ROW -->
        <div class="cta-row" v-if="status !== '1'">
          <button class="btn btn-edit mgr-15" v-if="false">
            <div class="icon icon-edit-pen color-grey-dark"></div>
            <div class="text color-ash">Edit</div>
          </button>

          <button class="btn btn-remove" @click="toggleRemoveModal">
            <div class="icon icon-trash brand-tonic"></div>
            <div class="text color-ash">Remove</div>
          </button>
        </div>
      </div>
    </div>

    <script
      type="application/javascript"
      defer
      async="true"
      src="https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image"
    ></script>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_remove_modal">
        <remove-pending-modal
          :question_id="Number(question.id)"
          :homework_id="Number($route.params.assessment_id)"
          @closeTriggered="toggleRemoveModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "reviewQuestionCard",

  components: {
    reviewOptionColumn: () =>
      import(
        /* webpackChunkName: "review-comp" */ "@/modules/base/components/assessment-pending-comps/review-option-column"
      ),
    removePendingModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/assessment-review/remove-pending-modal"
      ),
  },

  props: {
    count: Number,

    status: {
      type: String,
      default: "0",
    },

    question: {
      type: Object,
      default: () => ({
        id: 1,
        image: "",
        question: "What is the logarithmic characteristic of 1.345?",
        difficulty: "easy",
        topic_details: {
          topic: "Geometry",
        },
        answer: "A",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        option_e: "",
      }),
    },
  },

  computed: {
    getDifficultyColor() {
      if (this.question.difficulty == "easy") return "brand-navy";
      else if (this.question.difficulty == "medium") return "brand-accent";
      else if (this.question.difficulty == "hard") return "brand-tonic";
      else return "brand-inverse";
    },

    showOptionResponse() {
      if (this.question.type === "short") return "Short Answer";
      else if (this.question.type === "essay") return "Essay Question";
      else if (this.question.type === "multiple") return "Multiple Choice";
      else if (this.question.type === "bool") return "True/False";
      else return "Answer Options";
    },

    getOptions() {
      return this.generateOptions();
    },
  },

  watch: {
    question: {
      handler(value) {
        if (Object.keys(value).length) this.formatQuestion();
      },
      immediate: true,
    },
  },

  data: () => ({
    show_options: false,
    is_deleted_id: 0,
    show_remove_modal: false,
  }),

  created() {
    this.$bus.$on("extractRemovedQuestion", (question_id) => {
      this.is_deleted_id = question_id;
    });
  },

  methods: {
    toggleOptions() {
      this.show_options = !this.show_options;
    },

    toggleRemoveModal() {
      this.show_remove_modal = !this.show_remove_modal;
    },

    isSelectedOption(option) {
      return this.question.answer == option ? true : false;
    },

    // FORMAT QUESTION
    formatQuestion() {
      this.$nextTick(() => {
        let small_screen = window.matchMedia("(max-width: 568px)");
        let extra_small_screen = window.matchMedia("(max-width: 450px)");

        document.querySelectorAll(".wrapper-content").forEach((element) => {
          let children = Array.from(element?.children) ?? [];

          children?.forEach((elm) => {
            // REMOVE BREAK TAGS
            elm.querySelectorAll("br").forEach((ele) => ele.remove());

            if (elm.querySelector("p"))
              elm.querySelector("p").style.margin = "0px";

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

    generateOptions() {
      // MULTIPLE TYPE
      if (this.question.type === "multiple") {
        return [
          {
            title: "a",
            value: this.question.option_a,
            selected: this.isSelectedOption("A"),
          },
          {
            title: "b",
            value: this.question.option_b,
            selected: this.isSelectedOption("B"),
          },
          {
            title: "c",
            value: this.question.option_c,
            selected: this.isSelectedOption("C"),
          },
          {
            title: "d",
            value: this.question.option_d,
            selected: this.isSelectedOption("D"),
          },
        ];
      }

      // BOOL TYPE
      else if (this.question.type === "bool") {
        return [
          {
            title: "a",
            value: "True",
            selected: this.isSelectedOption("0"),
          },
          {
            title: "b",
            value: "False",
            selected: this.isSelectedOption("1"),
          },
        ];
      }

      // SHORT ANSWER TYPE
      else if (this.question.type === "short") {
        let option_set = [];
        let options = this.question.answer.replace(/[\[\]\"]/g, "").split(",");

        options.map((option) => {
          option_set.push({
            title: "1",
            value: option,
            selected: true,
          });
        });

        return option_set;
      }
      // ESSAY TYPE
      else if (this.question.type === "essay") return [];
      else return [];
    },
  },
};
</script>

<style lang="scss" scoped>
.review-question-card {
  padding: toRem(15);

  @include breakpoint-down(lg) {
    padding: toRem(12);
  }

  @include breakpoint-down(sm) {
    padding: toRem(12) toRem(8);
  }

  .question-top {
    @include flex-row-between-nowrap;
    align-items: flex-start;

    .left {
      @include flex-row-start-nowrap;
      align-items: flex-start;
      padding-right: toRem(10);

      .counter {
        @include square-shape(32);
        margin-right: toRem(13);

        @include breakpoint-down(xs) {
          @include square-shape(31.5);
          margin-right: toRem(8);
        }

        .count {
          @include center-placement;
          font-size: toRem(11.5);

          @include breakpoint-down(xs) {
            font-size: toRem(11);
          }
        }
      }

      .question-text {
        @include font-height(14, 24);
        margin-bottom: toRem(7);
        padding-top: toRem(1);
        word-wrap: break-word;

        @include breakpoint-down(sm) {
          @include font-height(13.85, 18.5);
        }

        @include breakpoint-down(xs) {
          @include font-height(13.25, 18);
        }
      }

      .question-image {
        margin: toRem(10) auto;
        img {
          min-width: 25%;
          width: auto;
          max-width: 40%;
          height: auto;
          max-height: toRem(240);

          @include breakpoint-down(sm) {
            max-width: 60%;
          }

          @include breakpoint-down(xs) {
            max-height: toRem(200);
          }
        }
      }

      .question-info {
        @include font-height(13.45, 20);
        @include flex-row-start-wrap;

        @include breakpoint-down(sm) {
          @include font-height(13, 18);
        }

        @include breakpoint-down(xs) {
          @include font-height(12, 17);
        }

        .difficulty {
          @include font-height(12.45, 19);

          @include breakpoint-down(xs) {
            @include font-height(11.5, 18);
          }
        }

        .dot {
          @include square-shape(6);
          background: $border-grey;
          padding-top: toRem(3);
          margin: auto toRem(10);
          border-radius: 50%;
        }
      }
    }

    .right {
      border: toRem(1) solid $border-grey;
      @include square-shape(32);

      @include breakpoint-down(xs) {
        @include square-shape(30);
      }

      &:hover {
        background: $border-grey-light;
      }

      .icon {
        @include flex-column-center;
        font-size: toRem(14);
        height: 100%;

        @include breakpoint-down(xs) {
          font-size: toRem(12.5);
        }
      }
    }
  }

  .option-bottom {
    @include flex-row-start-nowrap;
    align-items: flex-start;
    margin-top: toRem(14);

    .spacer {
      @include square-shape(32);
      margin-right: toRem(13);
    }

    .intro {
      @include flex-row-start-nowrap;
      margin-bottom: toRem(14);
      width: 100%;

      .text {
        font-size: toRem(13.25);
        padding-right: toRem(5);
        white-space: nowrap;
      }

      .line {
        position: relative;
        border-top: toRem(1) solid $border-grey;
        top: toRem(2);
        width: 100%;
      }
    }

    .option-container {
      @include flex-row-start-wrap;
    }

    .cta-row {
      @include flex-row-start-wrap;
      margin-bottom: toRem(3);

      .btn {
        padding: toRem(11) toRem(20) !important;
        background: $color-white;

        .icon {
          margin-right: toRem(8);
          font-size: toRem(16);
        }

        .text {
          text-transform: capitalize;
          font-size: toRem(12);
          font-weight: 500;
        }

        &-edit {
          &:hover {
            background: $brand-inverse-light;
          }
        }

        &-remove {
          &:hover {
            background: $brand-red-light;
          }
        }
      }
    }
  }
}
</style>