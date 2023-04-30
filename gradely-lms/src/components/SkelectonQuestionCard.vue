<template>
  <div class="card-main-wrapper">
    <span class="icon-chat-card chart-left-icon"></span>
    <span class="avatar circle-three-dot-wrapper"></span>
    <section class="card-top-main-body">
      <span class="top-inner-wrapper">
        <span class="checkbox-holder"> </span>
        <span class="question-right">
          <span
            >Arrange the following from the greatest to the least. -9, +5, -6,
            +2, -4</span
          >
        </span>
      </span>
    </section>
    <section class="card-bottom-main-body">
      <div class="options-to-questions-wrapper">
        <div class="options-question-item">
          <span class="circle-option-tick avatar">a</span>
          <span class="option-answer">+5, +2, -2, -4, -9</span>
        </div>
        <div class="options-question-item">
          <span
            class="circle-option-tick circle-option-tick-correct-active avatar"
            >b</span
          >
          <span class="option-answer">+5, +2, -2, -4, -9</span>
        </div>
        <div class="options-question-item">
          <span class="circle-option-tick avatar">c</span>
          <span class="option-answer">+5, +2, -2, -4, -9</span>
        </div>
        <div class="options-question-item">
          <span class="circle-option-tick avatar">d</span>
          <span class="option-answer">+5, +2, -2, -4, -9</span>
        </div>
      </div>
    </section>
    <section class="footer-to-question-wrapper">
      <span class="footer-inner-main"></span>
    </section>
  </div>
</template>

<script>
export default {
  name: "SkelectonQuestionCard",
  data() {
    return {};
  },
  components: {},

  methods: {}
};
</script>
<style lang="scss" scoped>
* {
  color: transparent;
  border-radius: 5px;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}
.card-main-wrapper {
  position: relative;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 1px 4px #00000026;
  border-radius: 5px;
  padding: 0.8rem 1rem;
  margin: 1rem auto;
  .circle-three-dot-wrapper {
    background: #d5d5d5;
    padding: toRem(7) toRem(12);
    color: transparent;
    position: absolute;
    top: toRem(16);
    right: toRem(22);
  }
  .chart-left-icon {
    color: #d5d5d5;
    font-size: 2rem;
    position: absolute;
    left: toRem(-7);
    top: toRem(19);
  }
  .bold-text {
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 18px;
    color: #113255;
  }
  .card-top-main-body {
    padding: 0.65rem 0px;
  }
  .card-bottom-main-body {
    padding: 0.56rem 0px;
    border-top: 1px solid transparent;
  }
  .top-inner-wrapper {
    .question-right {
      background: #d5d5d5;
      color: transparent;
      border-radius: 7px;
      margin-left: 1rem;
      margin-top: 2rem;
      max-height: 1.6rem;
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
    align-items: flex-start;
    @include flex-row-start-wrap;
    @include breakpoint-down(lg) {
      max-width: 100%;
    }
    .options-question-item {
      @include flex-row-start-wrap;
      width: 48%;
      margin: 1%;
      .option-answer {
        background: #d5d5d5;
        color: #d5d5d5;
        border-radius: 7px;
      }
      flex-flow: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      @include breakpoint-down(lg) {
        width: 100%;
        margin: 1rem 0px;
      }
      .circle-option-tick {
        @include flex-row-center-wrap;
        margin-right: 0.86rem;
        background: #d5d5d5;
        color: #d5d5d5;
        font-size: 14px;
        line-height: 50%;
        cursor: pointer;
      }
    }
  }
}

.footer-to-question-wrapper {
  @include flex-row-start-nowrap;
  width: 100%;
  padding: 0.5rem 0px;
  border-top: 1px solid transparent;
  .footer-inner-main {
    width: 50%;
    padding: 0.77rem 0px;
    background: #d5d5d5;
    color: #d5d5d5;
    border-radius: 7px;
  }
}
</style>
