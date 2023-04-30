<template>
  <div class="lesson-feedback">
    <div class="lesson-feedback__close">
      <div class="lesson-feedback__close--wrapper">
        <i class="icon-close"></i>
      </div>
    </div>

    <div class="lesson-feedback__heading">
      <div class="font-weight-700">What is wrong with this lesson?</div>
      <div class="font-weight-400">Select all that applies</div>
    </div>

    <form class="lesson-feedback__form">
      <div class="lesson-feedback__options">
        <input class="lesson-feedback__checkbox" type="checkbox" name="check" />
        <div>
          <label
            class="lesson-feedback__options--label font-weight-700"
            for="check"
            >Labeling Problem</label
          >
          <div class="font-weight-400 lesson-feedback__options--desc">
            Wrong title topic, or assigned to the wrong subject/class.
          </div>
        </div>
      </div>
      <div class="lesson-feedback__options">
        <input class="lesson-feedback__checkbox" type="checkbox" name="check" />
        <div>
          <label
            class="lesson-feedback__options--label font-weight-700"
            for="check"
            >Content Issue</label
          >
          <div class="font-weight-400 lesson-feedback__options--desc">
            Incorrect concept, poor expanation or grammar.
          </div>
        </div>
      </div>
      <div class="lesson-feedback__options">
        <input class="lesson-feedback__checkbox" type="checkbox" name="check" />
        <div>
          <label
            class="lesson-feedback__options--label font-weight-700"
            for="check"
            >Formatting Error</label
          >
          <div class="font-weight-400 lesson-feedback__options--desc">
            Wrong spellings, poor formula presentation.
          </div>
        </div>
      </div>

      <div class="lesson-feedback__details">
        <div class="lesson-feedback__details--heading">
          <label
            class="lesson-feedback__details--label font-weight-700"
            for="more"
            >Any other details?</label
          >
          <div class="lesson-feedback__details--desc font-weight-400 px-1">
            OPTIONAL
          </div>
        </div>
        <textarea
          class="lesson-feedback__textarea"
          name="more"
          cols="30"
          rows="5"
          placeholder="tell us more"
        ></textarea>
      </div>

      <div class="lesson-feedback__submit">
        <button class="lesson-feedback__submit--btn">SUBMIT FEEDBACK</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.lesson-feedback {
  max-width: 520px;
  width: 100%;
  border: 1px solid #d5d5d5;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 10px;

  &__close {
    // text-align: end;
    display: flex;
    justify-content: flex-end;
    padding: 20px 20px;

    &--wrapper {
      width: 32px;
      height: 32px;
      background: #f5f5f5;
      display: grid;
      place-items: center;
      border-radius: 100%;
      color: #113255;
      font-size: 12px;
    }
  }

  &__heading {
    text-align: center;
    // padding-bottom: 34px;
    padding-top: 8px;

    &:nth-child(1) {
      font-size: 16px;
      color: #353535;
    }
    &:nth-child(2) {
      font-size: 14px;
      color: #555555;
    }
  }

  &__form {
    padding: 34px 34px;
  }

  &__options {
    display: flex;
    align-items: flex-start;
    margin-bottom: 28px;

    &--label {
      font-size: 16px;
      color: #353535;
    }

    &--desc {
      font-size: 12px;
      color: #757575;
    }
  }

  &__checkbox {
    margin-top: 6px;
    border-radius: 2px;
  }

  &__details {
    &--heading {
      display: flex;
    }
    &--label {
      font-size: 14px;
      color: #353535;
    }
    &--desc {
      font-size: 12px;
      color: #757575;
    }
  }
  &__textarea {
    border-radius: 5px;
    border: 1px solid #d5d5d5;
    width: 450px;
  }

  &__submit {
    display: flex;
    justify-content: flex-end;
    margin-top: 42px;

    &--btn {
      background: #faa017;
      border-radius: 30px;
      padding: 12px 25px;
      color: #353535;
      font-size: 12px;
    }
  }
}
</style>
