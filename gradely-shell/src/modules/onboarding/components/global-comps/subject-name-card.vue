<template>
  <div
    class="
      subject-name-card
      color-grey-dark
      rounded-20
      overflow-hidden
      pointer
      smooth-transition
    "
    :class="{ 'active-card': subject.active }"
    @click="$emit('clicked', index)"
  >
    <div class="text">{{ subject.name }}</div>

    <div
      class="icon"
      :class="subject.active ? 'icon-accept' : 'icon-plus'"
    ></div>
  </div>
</template>

<script>
export default {
  name: "subjectNameCard",

  props: {
    index: Number,
    subject: {
      type: Object,
      default: () => ({
        id: 1,
        name: "Mathematics",
        active: false,
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
%active-card {
  border: toRem(1) solid $brand-accent !important;
  background: $brand-accent-light !important;
  color: $brand-navy !important;
}

.subject-name-card {
  @include flex-row-center-nowrap;
  @include transition(0.4s);
  border: toRem(1) solid $brand-accent-light;
  margin: 0 toRem(4) toRem(10);
  padding: toRem(8) toRem(20);
  background: $white-text;

  @include breakpoint-down(xs) {
    padding: toRem(7) toRem(15);
  }

  .text {
    font-size: toRem(12.75);
    margin-right: toRem(8);

    @include breakpoint-down(xs) {
      font-size: toRem(11.5);
    }
  }

  .icon {
    font-size: toRem(15);
  }

  &:hover {
    @extend %active-card;
  }
}

.active-card {
  @extend %active-card;
}
</style>
