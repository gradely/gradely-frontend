<template>
  <div class="wrapper position-relative">
    <div class="post-recommendation-row position-relative" ref="cardRow">
      <post-catchup-card :card_type="type" />
      <post-catchup-card :card_type="type" />
      <post-catchup-card :card_type="type" />
      <post-catchup-card :card_type="type" />
    </div>

    <!-- SCROLL NAVIGATIONS  -->
    <div class="scroll-navs position-absolute w-100">
      <!-- NAV LEFT  -->
      <div
        class="nav nav-left"
        :class="!nav_left ? 'invisible' : null"
        @click="scrollCardRow(-80)"
      >
        <div class="icon icon-caret-left"></div>
      </div>

      <!-- NAV RIGHT  -->
      <div
        class="nav nav-right"
        :class="!nav_right ? 'invisible' : null"
        @click="scrollCardRow(+80)"
      >
        <div class="icon icon-caret-right"></div>
      </div>
    </div>

    <!-- SEE MORE BUTTON  -->
    <div
      class="see-more-btn color-ash pointer smooth-transition text-center rounded-5"
      v-if="type === 'recommendation'"
    >
      See More
    </div>

    <!-- SCHEDULE LATER  -->
    <div class="schedule-later color-ash" v-if="type === 'diagnostic'">
      Can’t take the test now?
      <span class="btn-link link-no-underline">Schedule for Later.</span>
    </div>
  </div>
</template>

<script>
import postCatchupCard from "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/post-catchup-card";

export default {
  name: "postRecommendationRow",

  components: {
    postCatchupCard,
  },

  props: {
    type: String,
  },

  data: () => ({
    nav_left: false,
    nav_right: true,
  }),

  methods: {
    scrollCardRow(scroll_value) {
      let card_row = this.$refs.cardRow;
      card_row.scrollLeft += scroll_value;
      card_row.scrollBehaviour = "smooth";

      this.nav_left = card_row.scrollLeft === 0 ? false : true;
      this.nav_right =
        card_row.scrollLeft === card_row.offsetLeft ? false : true;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding-bottom: toRem(2);
}

.post-recommendation-row {
  @include flex-row-start-nowrap;
  margin-left: toRem(14);
  overflow-x: auto;
  padding-bottom: toRem(12);

  @include breakpoint-down(sm) {
    margin-left: toRem(10);
  }

  @include breakpoint-down(xs) {
    margin-left: toRem(9);
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.scroll-navs {
  margin: 0 toRem(14);
  @include flex-row-between-nowrap;
  @include center-y;
  top: 35%;

  @include breakpoint-down(md) {
    display: none;
  }

  .nav {
    @include square-shape(42);
    @include transition(0.4s);
    position: relative;
    border-radius: 50%;
    background: $white-text;
    opacity: 0.5;
    box-shadow: 0 0 toRem(14) rgba(0, 0, 0, 0.25);
    cursor: pointer;

    .icon {
      @include center-placement;
      font-size: toRem(18);
      color: $brand-navy;
    }

    &:hover {
      opacity: 0.6;
    }
  }

  .nav-left {
    left: toRem(12);
  }

  .nav-right {
    right: toRem(26);
  }
}

.see-more-btn {
  @include font-height(12, 16);
  background: #f5f5f5;
  padding: toRem(15);
  margin: 0 toRem(14) toRem(14);

  @include breakpoint-down(xs) {
    @include font-height(11, 15);
    padding: toRem(12);
  }

  &:hover {
    background: $brand-inverse;
    color: $white-text !important;
  }
}

.schedule-later {
  @include font-height(12.5, 16);
  margin: toRem(10) toRem(14) toRem(14);

  @include breakpoint-down(sm) {
    @include font-height(12, 16);
  }

  @include breakpoint-down(xs) {
    margin: toRem(6) toRem(14) toRem(14);
    @include font-height(11.25, 15);
  }
}
</style>
