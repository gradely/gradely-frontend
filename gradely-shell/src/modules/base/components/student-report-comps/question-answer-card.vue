<template>
  <div
    class="question-answer-card white-text-bg rounded-5 mgb-10 box-shadow-effect"
  >
    <!-- COUNTER  -->
    <div class="counter position-relative">
      <div class="icon icon-chat-card brand-navy"></div>
      <div class="count white-text">{{ counter }}</div>
    </div>

    <!-- QUESTION AND ANSWER BLOCK  -->
    <div class="question-answer-block w-100">
      <!-- QUESTION TEXT  -->
      <div class="question-text" v-html="question.question"></div>

      <!-- ANSWER TEXT  -->
      <div class="answer-text w-100">
        <span class="mgr-5">Response: </span>
        <span class="font-weight-600">
          {{ $string.getTruncatedText(question.selected, 60) }}
        </span>
      </div>

      <!-- REVIEW LINK  -->
      <div class="d-flex justify-content-end">
        <router-link
          :to="{ name: 'AssessmentGradeReview' }"
          class="btn-link ml-auto review-link font-weight-600"
          >REVIEW</router-link
        >
      </div>
    </div>

    <script
      type="application/javascript"
      defer
      async="true"
      src="https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image"
    ></script>
  </div>
</template>

<script>
export default {
  name: "questionAnswerCard",

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
  },
};
</script>

<style lang="scss" scoped>
.question-answer-card {
  @include flex-row-start-nowrap;
  align-items: flex-start;
  padding: toRem(12);
  padding-right: toRem(17);

  .counter {
    margin-right: toRem(10);
    margin-left: toRem(-21);

    @include breakpoint-down(xs) {
      margin-right: toRem(7);
    }

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

  .question-answer-block {
    .question-text {
      @include font-height(13.25, 21);
      margin-top: toRem(5);
      margin-bottom: toRem(15);

      @include breakpoint-down(xs) {
        @include font-height(12.75, 20);
      }
    }

    .answer-text {
      @include flex-row-start-wrap;
      align-items: flex-start;
      @include font-height(12.75, 21);
      padding-bottom: toRem(6);
      border-bottom: toRem(1) solid $border-grey;

      @include breakpoint-down(xs) {
        @include font-height(12.5, 20);
      }
    }

    .review-link {
      @include font-height(12.75, 21);
      margin-top: toRem(10);

      @include breakpoint-down(lg) {
        @include font-height(12.5, 21);
      }

      @include breakpoint-down(xs) {
        @include font-height(12, 19);
      }
    }
  }
}
</style>
