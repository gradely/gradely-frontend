<template>
  <div>
    <div
      class="video-collection"
      v-for="(items, title, index) in videos"
      :key="index"
    >
      <div class="term-description border-grey-dark">
        <div class="term">{{ title }}</div>

        <div class="line w-100"></div>
      </div>

      <template>
        <video-card
          v-for="(video, index) in items"
          :key="index"
          :video="video"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoCollection",

  components: {
    videoCard: () =>
      import(
        /* webpackChunkName: "videoCard" */ "@/modules/base/components/feed-comps/post-library-comps/video-card"
      ),
  },

  props: {
    videos: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.video-collection {
  margin-bottom: toRem(25);

  @include breakpoint-down(sm) {
    margin-bottom: toRem(22);
  }

  .term-description {
    margin-bottom: toRem(13);
    @include flex-row-start-nowrap;

    @include breakpoint-down(lg) {
      margin-bottom: toRem(10);
    }

    @include breakpoint-down(sm) {
      margin-bottom: toRem(7);
    }

    .term {
      @include font-height(14.75, 24);
      padding: toRem(10);
      padding-left: 0;
      white-space: nowrap;

      @include breakpoint-down(xl) {
        @include font-height(14.5, 22);
      }

      @include breakpoint-down(lg) {
        @include font-height(13.5, 20);
      }

      @include breakpoint-down(sm) {
        @include font-height(13, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(12.8, 17);
      }
    }

    .line {
      border-top: toRem(1) solid $border-grey;
    }
  }
}
</style>
