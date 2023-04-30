<template>
  <div class="user-term-block">
    <div class="term-row">
      <!-- TERM  -->
      <div class="term border-grey-dark text-capitalize">
        {{ date }}
      </div>
      <!-- LINE THROUGH  -->
      <div class="line w-100"></div>
    </div>

    <!-- USER NOTE DATA  -->
    <slot name="contents"></slot>
  </div>
</template>

<script>
export default {
  name: "userTermBlock",

  props: {
    date: {
      type: String,
      default: "First Term, Week 1",
    },
  },
};
</script>

<style lang="scss" scoped>
.user-term-block {
  margin-bottom: toRem(30);

  .term-row {
    @include flex-row-start-nowrap;

    .term {
      @include font-height(13.75, 22);
      padding: toRem(10);
      padding-left: 0;
      white-space: nowrap;

      @include breakpoint-down(sm) {
        @include font-height(13.25, 21);
      }
    }

    .line {
      border-top: toRem(1) solid rgba($border-grey, 0.6);
    }
  }
}
</style>
