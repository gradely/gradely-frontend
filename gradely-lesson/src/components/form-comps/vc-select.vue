<template>
  <div class="vc-select__container" v-on-clickaway="toggleFalse">
    <div @click="toggleDropdown" class="vc-select">
      <i :class="[icon_class, 'vc-select__icon']"></i>

      <div class="vc-select__select">
        <div class="vc-select__select-content">
          <div v-show="name.length > 0" class="vc-select__select-name">
            {{ name }}:
          </div>
          <div class="vc-select__select-placeholder">
            {{ selectedOption['title'] || placeholder }}
          </div>
        </div>

        <i class="icon-caret-down vc-select__caret"></i>
      </div>
    </div>

    <transition
      v-if="isOpen"
      mode="in-out"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="vc-dropdown mgt-10">
        <button class="vc-dropdown__option">Mathematics</button>
        <button class="vc-dropdown__option">Mathematics</button>
        <button class="vc-dropdown__option">Mathematics</button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VueConstructor } from 'vue';

// INTERFACES
import { IVue } from '../../interfaces';

@Component
export default class extends (Vue as VueConstructor<IVue>) {
  // PROPS
  @Prop({ default: 'Select' }) readonly name!: string;
  @Prop({ default: 'Select option' }) readonly placeholder!: string;
  @Prop({ default: 'icon-book-cover' }) readonly icon_class!: string;
  @Prop({ default: [] }) readonly options!: Array<any>;
  @Prop({ default: {} || null }) readonly selectedOption!: object | any;

  // DATA
  public isOpen = false;

  // MDETHODS
  public toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  public toggleFalse() {
    this.isOpen = false;
  }
}
</script>

<style lang="scss" scoped>
@mixin flex-center() {
  display: flex;
  align-items: center;
}
.vc-select {
  @include flex-center();

  &__icon {
    color: $brand-inverse;
    font-size: toRem(20);
    margin-right: toRem(20);
  }

  &__select {
    cursor: pointer;
    width: 100%;
    padding: toRem(10) 0;
    border-bottom-width: toRem(1);
    border-bottom-style: solid;
    border-bottom-color: $brand-inverse-light;

    @include flex-center();
    justify-content: space-between;

    &-content {
      @include flex-center();
    }

    &-name {
      height: 100%;
      font-size: toRem(14);
      line-height: toRem(19);
      margin-right: toRem(5);
      color: $border-grey-dark;
    }

    &-placeholder {
      font-size: toRem(16);
      font-weight: 500;
      line-height: toRem(22);
      color: $color-text;
    }
  }

  &__caret {
    font-size: toRem(16);
    color: $border-grey-dark;
  }

  &__container {
    width: 100%;
    position: relative;
  }
}

.vc-dropdown {
  width: 100%;
  min-height: auto;
  max-height: toRem(200);

  overflow: hidden;
  overflow-y: auto;

  border-radius: toRem(15);
  background: $white-text;

  display: block;

  position: absolute;
  z-index: 10;

  @include box-shadow();
  @include gray-scrollbar();

  &__option {
    display: block;

    width: 100%;
    text-align: left;
    padding: toRem(8) toRem(15);
    background: inherit;
    border-bottom: 1px solid $border-grey;

    &:last-child {
      border-bottom-width: 0px;
    }

    &--active {
      color: $brand-navy;
      background: lighten($color: $brand-inverse-light, $amount: 3);
      border-bottom-color: $brand-accent;
    }

    &:hover,
    &:focus {
      color: $brand-navy;
      background: lighten($color: $brand-inverse-light, $amount: 3);
      border-bottom-color: $brand-accent;
    }
  }
}
</style>
