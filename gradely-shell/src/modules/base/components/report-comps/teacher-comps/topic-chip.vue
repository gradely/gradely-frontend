<template>
  <div
    class="topic-chip pointer smooth-transition"
    :class="index === active_index ? 'active-chip' : null"
    @click="$emit('selected', index)"
  >
    <!-- TOPIC IMAGE  -->
    <div class="avatar">
      <img v-lazy="topic.image" class="avatar-img" alt="" v-if="topic.image" />
      <div class="avatar-img topic-bg" v-else>
        <div class="bookmark icon icon-bookmark"></div>
      </div>
    </div>

    <div class="text color-grey-dark">{{ topic.topic }}</div>
  </div>
</template>

<script>
export default {
  name: "topicChip",

  props: {
    index: Number,
    topic: {
      type: Object,
      required: true,
    },
    active_index: Number,
  },
};
</script>

<style lang="scss" scoped>
.topic-chip {
  @include flex-row-start-nowrap;
  border-radius: toRem(35);
  padding: toRem(7) toRem(15) toRem(7) toRem(8);
  margin-right: toRem(9);
  border: toRem(1) solid $border-grey;
  width: max-content;

  @include breakpoint-down(lg) {
    padding: toRem(5) toRem(12) toRem(5) toRem(6);
    margin-right: toRem(7);
  }

  &:hover {
    color: $brand-navy;
    background: $brand-inverse-light;
  }

  .avatar {
    margin-right: toRem(8);

    @include breakpoint-down(lg) {
      margin-right: toRem(8);
      @include square-shape(28);
    }

    @include breakpoint-down(xs) {
      margin-right: toRem(6);
      @include square-shape(26);
    }
  }

  .text {
    @include font-height(11.75, 16);
    white-space: nowrap;

    @include breakpoint-down(lg) {
      @include font-height(11.5, 15);
    }

    @include breakpoint-down(xs) {
      @include font-height(11.25, 14);
    }
  }
}

.active-chip {
  border: toRem(1) solid $brand-inverse;
  color: $brand-navy;
  background: $brand-inverse-light;
}

.topic-bg {
  position: relative;
  background: rgba($brand-tonic, 0.75);
  @include square-shape(43);

  .bookmark {
    @include center-placement;
  }
}
</style>
