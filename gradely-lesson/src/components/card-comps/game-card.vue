<template>
  <div class="game-card round-10" @click="$emit('showLessonModal')">
    <div class="game-card__media border position-relative">
      <div class="game-card__play">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.3965 0.666626H2.60317C1.38984 0.666626 0.666504 1.38996 0.666504 2.60329V5.39663C0.666504 5.75996 0.729837 6.07663 0.853171 6.34329C1.13984 6.97663 1.75317 7.33329 2.60317 7.33329H5.3965C6.60984 7.33329 7.33317 6.60996 7.33317 5.39663V4.63329V2.60329C7.33317 1.38996 6.60984 0.666626 5.3965 0.666626ZM6.78984 4.16663C6.52984 3.94329 6.10984 3.94329 5.84984 4.16663L4.46317 5.35663C4.20317 5.57996 3.78317 5.57996 3.52317 5.35663L3.40984 5.26329C3.17317 5.05663 2.7965 5.03663 2.52984 5.21663L1.28317 6.05329C1.20984 5.86663 1.1665 5.64996 1.1665 5.39663V2.60329C1.1665 1.66329 1.66317 1.16663 2.60317 1.16663H5.3965C6.3365 1.16663 6.83317 1.66329 6.83317 2.60329V4.20329L6.78984 4.16663Z"
            fill="#F5F5F5"
          />
        </svg>
      </div>

      <img
        v-lazy="staticImg('VideoPoster.png')"
        alt="fb"
        class="game-card__img position-absolute w-100 h-100"
      />
      <img
        :src="featured_game.game_image || defaultImg"
        alt
        class="game-card__img position-absolute w-100 h-100"
      />
    </div>
    <div class="game-card__body">
      <div class="game-card__top">
        <div
          class="game-card__title m-0 font-weight-700 color-text text-capitalize"
        >{{ featured_game.game_title }}</div>
        <div class="game-card__subtitle">
          <span class="color-grey-dark text-capitalize">{{ featured_game.subject }}</span>
          <div class="dot" />
          <span class="color-grey-dark text-capitalize">{{ featured_game.group }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VueConstructor } from 'vue';

// INTERFACES
import { IVue } from '../../interfaces';
import { GameItemModel } from '../../store/models';

@Component
export default class extends (Vue as VueConstructor<IVue>) {
  @Prop({ default: {} as GameItemModel })
  readonly featured_game!: GameItemModel;

  // DATA
  public defaultImg = '@/assets/static/cardimage2.jpg';
}
</script>

<style lang="scss" scoped>
.game-card {
  cursor: pointer;
  width: toRem(200);
  flex-shrink: 0;
  height: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    @include box-shadow();
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 10px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
    border-radius: 0 0 10px 10px;
    background: #ffffff;

    .game-card__top {
      margin-bottom: 30px;
    }
  }

  &__media {
    background: $brand-inverse-light;
    border-radius: 10px 10px 0px 0px;
    width: 100%;
    height: 120px;
    // position: relative;

    .game-card__play {
      width: 16px;
      height: 16px;
      background: #161616;
      position: absolute;
      left: 87%;
      top: 3%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
    }

    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
      border-radius: 10px 10px 0px 0px;
    }
  }
  &__title {
    font-size: toRem(13);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__subtitle {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    font-size: 11px;
    margin: 4px 0;

    span {
      display: inline-block;
      min-width: auto;
      max-width: 60%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    div {
      margin-left: toRem(10);
      margin-right: toRem(10);
    }

    .dot {
      border-radius: 100%;
      background: #d5d5d5;
      width: 4px;
      height: 4px;
    }
  }
}
</style>
