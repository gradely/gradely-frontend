<template>
  <div class="recently-card" @click="$emit('showLessonModal')">
    <div class="recently-card__media">
      <img
        v-lazy="seen_video.thumbnail || staticImg('VideoPoster.png')"
        alt="card"
        class="recently-card__img"
      />
    </div>
    <div class="recently-card__body">
      <div class="recently-card__top">
        <div class="recently-card__title m-0 font-weight-700 color-text">{{ seen_video.title }}</div>
        <div class="recently-card__subtitle">
          <div class="color-grey-dark">{{ seen_video.subject || 'Subject' }}</div>
          <div class="dot" />
          <div class="color-grey-dark">{{ seen_video.type }}</div>
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
import { SeenItemModel } from '../../store/models';

@Component
export default class extends (Vue as VueConstructor<IVue>) {
  @Prop({ default: {} as SeenItemModel }) readonly seen_video!: SeenItemModel;

  // DATA
  public defaultImg = '@/assets/static/VideoPoster.png';
}
</script>

<style lang="scss" scoped>
.recently-card {
  cursor: pointer;
  width: toRem(200);
  border-radius: toRem(10);

  margin-right: toRem(20);

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    @include box-shadow();
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: toRem(5) toRem(10);
    border-radius: 0 0 toRem(10) toRem(10);
    background: $color-white;
    @include box-shadow();

    .recently-card__top {
      margin-bottom: toRem(30);
    }
  }

  &__media {
    background: $brand-accent-light;
    border-radius: toRem(10) toRem(10) 0px 0px;
    width: 100%;
    height: toRem(120);
    overflow: hidden;

    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
      border-radius: toRem(10) toRem(10) 0px 0px;
    }
  }

  &__title {
    font-size: toRem(12);

    display: block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__subtitle {
    display: flex;
    align-items: center;
    font-size: toRem(10);
    margin: toRem(4) 0;

    div {
      margin-right: toRem(10);
    }

    .dot {
      border-radius: 100%;
      background: $border-grey;
      width: toRem(4);
      height: toRem(4);
    }
  }
}
</style>
