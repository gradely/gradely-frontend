<template>
  <div class="page-loader w-100 smooth-transition index-999">
    <div class="row position-relative h-100">
      <div
        class="col-12 d-flex flex-column justify-content-center align-items-center h-100 mx-auto"
      >
        <!-- SPINNER -->
        <div class="icon icon-dotted-spinner border-grey animate mgb-20"></div>

        <!-- PROCESSING TEXT -->
        <p class="text brand-white text-center">{{ loading_text }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';

// INTERFACES
import { IVue } from '@/interfaces';

export default (Vue as VueConstructor<IVue>).extend({
  name: 'PageLoader',

  props: {
    loading_text: {
      type: String,
      default: 'Loading Content',
    },
  },
});
</script>

<style lang="scss">
.page-loader {
  @include fixed-display-area;
  background: rgba($black-text, 0.8);

  .row {
    .col-12 {
      @include center-placement;

      .icon {
        font-size: toRem(40);
      }

      .text {
        @include font-height(16, 21);

        @include breakpoint-down(sm) {
          @include font-height(14, 19);
        }
      }
    }
  }
}
</style>
