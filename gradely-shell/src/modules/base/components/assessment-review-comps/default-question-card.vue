<template>
  <div class="question-card rounded-3 mgb-7">
    <!-- COUNTER  -->
    <div class="counter position-relative">
      <div class="icon icon-chat-card border-grey"></div>
    </div>

    <!-- QUESTION  -->
    <div class="wrapper w-100">
      <div class="line-one mgb-5 rounded-5 border-grey-light-bg"></div>
      <div class="line-two rounded-5 border-grey-light-bg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "defaultQuestionCard",
};
</script>

<style lang="scss" scoped>
.question-card {
  background: rgba(#fff, 0.6);
  @include flex-row-start-nowrap;
  align-items: flex-start;
  padding: toRem(13);
  width: 100%;
  height: toRem(100);

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
  }

  .line-one {
    width: 70%;
    height: toRem(18);
  }

  .line-two {
    width: 45%;
    height: toRem(18);
  }
}
</style>
