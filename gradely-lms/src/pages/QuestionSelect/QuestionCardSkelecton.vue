<template>
  <div class="card-main-wrapper">
    <section class="card-top-main-body">
      <span class="top-inner-wrapper">
        <span class="checkbox-holder"> </span>
        <span class="question-right">
          <span class="question-title">--------------------************?</span>
          <div>
            <span class="bold-text">*****</span>
          </div>
        </span>
      </span>
      <span class="caret-spot">****</span>
    </section>
  </div>
</template>

<script>
export default {
  name: "QuestionCardSkelectonLoader"
};
</script>

<style lang="scss" scoped>
.card-main-wrapper {
  width: 100%;
  background: #ffffff94;
  border-radius: 5px;
  padding: 0.8rem 1rem;
  margin: 1rem auto;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  @include breakpoint-down(lg) {
    padding: 0.8rem 0.6rem;
  }
  .close-wrapper-lower-fold-container {
    display: none;
  }
  .bold-text {
    text-transform: uppercase;
    background: #d9dbdd;
    color: transparent;
  }
  .card-top-main-body {
    padding: 0.65rem 0px;
    @include flex-row-between-nowrap;
    align-items: flex-start;
    .caret-spot {
      background: #d9dbdd;
      color: transparent;
    }
  }
  .card-bottom-main-body {
    padding: 1rem 0px;
    border-top: 1px solid #d5d5d5;
  }
  .top-inner-wrapper {
    @include flex-row-start-nowrap;
    align-items: flex-start;
    .question-right {
      padding-left: 10px;
      .question-title {
        background: #d9dbdd;
        color: transparent;
      }
    }
  }
  .options-to-questions-wrapper {
    align-items: flex-start;
    @include flex-row-start-wrap;
    @include breakpoint-down(lg) {
      max-width: 100%;
    }
  }
}
</style>
