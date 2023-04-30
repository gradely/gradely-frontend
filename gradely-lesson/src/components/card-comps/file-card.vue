<template>
  <div class="file-card pd-10">
    <div class="file-card__body">
      <div class="file-card__media mgr-15">
        <img v-lazy="staticImg('pdf.png')" alt="file-icon" />
      </div>

      <div class="file-card__content">
        <div class="file-card__content-title mgb-4">File name goes here</div>
        <div class="file-card__content-subtitle text-capitalize">
          Lesson Note
        </div>
      </div>
    </div>

    <button class="btn btn-default file-card__btn">change</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VueConstructor } from 'vue';

// INTERFACES
import { IVue } from '../../interfaces';

@Component
export default class extends (Vue as VueConstructor<IVue>) {}
</script>

<style lang="scss" scoped>
@mixin flex-center() {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.file-card {
  overflow: hidden;
  width: 100%;
  min-height: auto;
  max-height: toRem(60);
  margin-bottom: toRem(15);

  background: $white-text;
  border-radius: toRem(10);
  border: toRem(1) solid $border-grey;

  &:last-child {
    margin-bottom: 0px;
  }

  @include flex-center();

  &:hover {
    @include box-shadow();
  }

  &__body {
    @include flex-center();
  }

  &__media {
    overflow: hidden;
    width: toRem(40);
    height: toRem(40);
    border-radius: toRem(10);
    background: $brand-accent;

    display: grid;
    place-items: center;

    img {
      width: 50%;
      height: 50%;
      object-fit: contain;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-title {
      font-size: toRem(14);
      line-height: toRem(19);
      color: $color-text;
    }

    &-subtitle {
      font-size: toRem(12);
      line-height: toRem(16);
      color: $color-grey-dark;
    }
  }

  &__btn {
    color: $brand-navy;
    font-weight: 700 !important;
    padding: 0;

    &:hover,
    &:focus {
      padding: toRem(10) toRem(20);
    }
  }
}
</style>
