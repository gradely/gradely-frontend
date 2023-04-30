<template>
  <div>
    <div
      class="document-collection"
      v-for="(items, title, index) in docs"
      :key="index"
    >
      <div class="term-description border-grey-dark">
        <div class="term">{{ title }}</div>
        <div class="line w-100"></div>
      </div>

      <template>
        <document-card
          v-for="(doc, index) in items"
          :key="index"
          :document="doc"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "documentCollection",

  components: {
    documentCard: () =>
      import(
        /* webpackChunkName: "documentCard" */ "@/modules/base/components/feed-comps/post-library-comps/document-card"
      ),
  },

  props: {
    docs: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.document-collection {
  margin-bottom: toRem(20);

  @include breakpoint-down(sm) {
    margin-bottom: toRem(15);
  }

  .term-description {
    margin-bottom: toRem(10);
    @include flex-row-start-nowrap;

    @include breakpoint-down(lg) {
      margin-bottom: toRem(8);
    }

    @include breakpoint-down(sm) {
      margin-bottom: toRem(7);
    }

    .term {
      @include font-height(14.25, 24);
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
