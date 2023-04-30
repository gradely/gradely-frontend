<template>
  <div class="app-description-carousel w-100 rounded-10 overflow-hidden">
    <!-- LEFT NAV  -->
    <div class="left-nav h-100 brand-tonic-bg">
      <!-- OVERLAY  -->
      <div class="overlay"></div>

      <img
        v-lazy="image_list[current_index - 1]"
        v-if="image_list[current_index - 1]"
        alt="Previous image"
        class="smooth-transition"
      />

      <!-- NAV BTN  -->
      <div class="nav-btn pointer" title="Previous" @click="prevSlide">
        <div class="icon-left icon-caret-left"></div>
      </div>
    </div>

    <!-- CAROUSEL SLIDER  -->
    <div class="carousel-block h-100 brand-inverse-bg smooth-transition">
      <img
        v-lazy="image_list[current_index]"
        alt="current image"
        class="smooth-transition"
      />
    </div>

    <!-- RIGHT NAV  -->
    <div class="right-nav h-100 brand-accent-bg">
      <!-- NEXT IMAGE -->
      <img
        v-lazy="image_list[current_index + 1]"
        v-if="image_list[current_index + 1]"
        alt="Next image"
        class="smooth-transition"
      />

      <!-- OVERLAY  -->
      <div class="overlay"></div>

      <!-- NAV BTN  -->
      <div class="nav-btn pointer" title="Next" @click="nextSlide">
        <div class="icon-right icon-caret-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "appDescriptionCarousel",

  computed: {
    ...mapGetters({
      getAppInfo: "dbApp/getAppInfo",
    }),
  },

  watch: {
    "getAppInfo.data": {
      handler(value) {
        if (Object.keys(value).length) this.loadImages(value.media);
      },
      immediate: true,
    },
  },

  data: () => ({
    image_list: [
      // "reportCardSlide_1.png",
      // "reportCardSlide_2.png",
      // "reportCardSlide_3.png",
      // "reportCardSlide_4.png",
      // "reportCardSlide_5.png",
    ],
    current_index: 0,
  }),

  methods: {
    loadImages(images) {
      this.$nextTick(() => {
        images.map((media) => this.image_list.push(media.media));
      });
    },

    nextSlide() {
      this.current_index =
        this.current_index === this.image_list.length - 1
          ? 0
          : this.current_index + 1;
    },

    prevSlide() {
      this.current_index =
        this.current_index === 0
          ? this.image_list.length - 1
          : this.current_index - 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes slide-left {
  0%,
  30% {
    margin-left: -40px;
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.app-description-carousel {
  @include flex-row-between-nowrap;
  margin-bottom: toRem(50);
  height: toRem(330);

  @include breakpoint-down(xl) {
    height: toRem(370);
  }

  @include breakpoint-down(lg) {
    height: toRem(320);
  }

  @include breakpoint-down(md) {
    height: toRem(370);
  }

  @include breakpoint-down(sm) {
    height: toRem(350);
  }

  @include breakpoint-custom-down(520) {
    height: toRem(330);
  }

  @include breakpoint-down(xs) {
    height: toRem(280);
  }

  @include breakpoint-custom-down(410) {
    height: toRem(250);
  }

  @include breakpoint-custom-down(350) {
    height: toRem(220);
  }

  .left-nav,
  .right-nav {
    @include flex-column-center;
    position: relative;
    width: 10.5%;

    @include breakpoint-down(sm) {
      width: 10%;
    }

    @include breakpoint-down(xs) {
      width: 10.5%;
    }

    @include breakpoint-custom-down(410) {
      width: 11%;
    }

    @include breakpoint-custom-down(350) {
      width: 11.5%;
    }

    img {
      @include background-cover;
    }

    .overlay {
      @include background-cover;
      background: rgba($brand-black, 0.25);
      z-index: 1;
    }
  }

  .carousel-block {
    position: relative;
    width: 76%;

    @include breakpoint-down(sm) {
      width: 77.5%;
    }

    @include breakpoint-down(xs) {
      width: 76%;
    }

    @include breakpoint-custom-down(350) {
      width: 75%;
    }

    img {
      animation: slide-left 0.3s ease-in-out forwards;
      @include background-cover;
    }
  }

  .nav-btn {
    position: relative;
    border-radius: toRem(15);
    @include square-shape(42);
    background: $white-text;
    z-index: 9;

    @include breakpoint-down(sm) {
      @include square-shape(38);
    }

    @include breakpoint-custom-down(520) {
      @include square-shape(33);
    }

    @include breakpoint-down(xs) {
      @include square-shape(31);
    }

    @include breakpoint-custom-down(350) {
      @include square-shape(28);
    }

    .icon-left,
    .icon-right {
      @include center-placement;
      font-size: toRem(16);
      color: $brand-navy;
      margin-top: toRem(1);
      margin-left: toRem(-1);

      @include breakpoint-down(sm) {
        font-size: toRem(15);
      }

      @include breakpoint-custom-down(520) {
        font-size: toRem(13);
      }

      @include breakpoint-down(sm) {
        font-size: toRem(11);
      }

      @include breakpoint-custom-down(350) {
        font-size: toRem(10);
      }
    }

    .icon-right {
      margin-left: toRem(1);
    }
  }
}
</style>
