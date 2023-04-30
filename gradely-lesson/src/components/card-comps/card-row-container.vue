<template>
  <div class="mgb-50">
    <div class="header mgb-20">
      <div class="title gfont-16 text-uppercase font-weight-700 brand-navy">{{ title }}</div>
      <button
        class="show-all gfont-11 font-weight-700"
        v-if="!showSlider && showMore"
        @click="$emit('seeMore')"
      >SHOW ALL</button>
    </div>

    <div class="position-relative mgb-30">
      <div
        class="icon icon-caret-left scroll-icon color-white gfont-13"
        v-if="showSlider"
        @click="scrollCard(250)"
      ></div>

      <div
        class="icon icon-caret-right scroll-icon scroll-icon__right color-white gfont-13"
        v-if="showSlider"
        @click="scrollCard(-250)"
      ></div>

      <div class="cards-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardContainer',

  props: {
    title: {
      type: String,
      default: 'Title',
    },

    showSlider: {
      type: Boolean,
      default: false,
    },

    showMore: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    scrollCard(offset) {
      const cardWrapper = document.querySelector('.cards-wrapper');
      cardWrapper.scrollLeft += offset;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  @include flex-row-between-nowrap;

  .show-all {
    padding: toRem(7) toRem(14);
    border-radius: toRem(17);
    border: 1.5px solid $border-grey-dark;
    color: $color-grey-dark;

    &:hover {
      border-color: $brand-accent;
      color: $brand-navy;
      background: $brand-accent-light;
    }
  }
}

.scroll-icon {
  @include center-y;
  @include square-shape(33);
  @include flex-row-center-nowrap;
  left: -18px;
  background: $brand-navy;
  border-radius: 40%;
  z-index: 2;
  cursor: pointer;

  &__right {
    left: calc(100% - 18px);
  }
}

.cards-wrapper {
  scroll-behavior: smooth;
  @include flex-row-start-nowrap;
  // flex-basis: max-content;
  align-items: stretch;
  gap: 0 35px;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
