<template>
  <div
    class="diagnostic-card rounded-5 white-text-bg pointer smooth-transition"
    v-animate-css="showAnimation"
    @click="toggleCatchupModal"
  >
    <!-- IMAGE TOP -->
    <div class="image-top position-relative brand-inverse-light-bg rounded-5">
      <img v-lazy="diagnostic.image" :alt="diagnostic.name" />

      <!-- COMPLETED STATUS -->
      <div class="completed-status" v-if="false">
        <div class="position-relative w-100 h-100">
          <img v-lazy="mxStaticImg('Completed.png', 'base')" alt="Completed" />
        </div>
      </div>
    </div>

    <!-- TITLE TEXT -->
    <div class="title-text text-center font-weight-600 brand-navy">
      {{ diagnostic.name }}
    </div>

    <!-- CTA BUTTON -->
    <div
      class="
        card-btn card-btn-start
        rounded-20
        mx-auto
        font-weight-600
        smooth-transition
      "
    >
      <div class="icon icon-accept mgr-3" v-if="false"></div>
      <div class="text">START NOW.</div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_catchup_modal">
        <start-catchup-modal
          :detail="diagnostic"
          @closeTriggered="toggleCatchupModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "diagnosticCard",

  components: {
    startCatchupModal: () =>
      import(
        /* webpackChunkName: 'startCatchupModal'*/ "@/modules/base/modals/feeds/start-catchup-modal"
      ),
  },

  props: {
    count: Number,

    diagnostic: {
      type: Object,
    },
  },

  computed: {
    showAnimation() {
      return this.count === 1
        ? {
            classes: "bounce",
            duration: 1600,
            iteration: "infinite",
          }
        : {};
    },
  },

  data: () => ({
    show_catchup_modal: false,
  }),

  methods: {
    toggleCatchupModal() {
      this.show_catchup_modal = !this.show_catchup_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.diagnostic-card {
  @include rectangle-shape(143, 200);
  margin: auto toRem(8);
  padding: toRem(5);

  &:first-of-type {
    margin-left: toRem(3);
  }

  &:last-of-type {
    margin-right: toRem(3);
  }

  @include breakpoint-down(xs) {
    @include rectangle-shape(135, 190);
    margin: auto toRem(3);
  }

  .image-top {
    @include square-shape(133);
    margin-bottom: toRem(5);

    @include breakpoint-down(xs) {
      @include rectangle-shape(125, 123);
    }

    img {
      @include background-cover;
    }

    .completed-status {
      position: absolute;
      @include full-width-height;
      background: rgba($brand-navy, 0.6);

      img {
        @include background-cover;
        z-index: 9;
      }
    }
  }

  .title-text {
    @include font-height(11.5, 16);
    margin-bottom: toRem(7);
    @include text-truncate;
    white-space: nowrap;

    @include breakpoint-down(md) {
      @include font-height(11, 15);
    }

    @include breakpoint-down(xs) {
      @include font-height(10.5, 14);
      font-weight: 500 !important;
      margin-top: toRem(4);
    }
  }

  .card-btn {
    @include flex-row-center-nowrap;
    padding: toRem(6) toRem(16);
    width: max-content;

    .text {
      font-size: toRem(9.5);

      @include breakpoint-down(md) {
        font-size: toRem(9);
      }

      @include breakpoint-down(xs) {
        font-weight: 500 !important;
      }
    }

    .icon {
      font-size: toRem(16.5);
    }

    &-start {
      background: rgba($border-grey, 0.4);

      &:hover {
        background: $brand-inverse-light;
      }
    }

    &-done {
      background: rgba($brand-green-light, 0.65);
      color: darken($brand-green, 12%);
    }
  }
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  40%,
  43% {
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
  }
  40%,
  43%,
  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }
  70% {
    -webkit-transform: translate3d(0, -5px, 0);
    transform: translate3d(0, -5px, 0);
  }
  90% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.bounce {
  -webkit-animation-name: bounce;
  animation-name: bounce;
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;
}
</style>