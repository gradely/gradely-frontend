<template>
  <div class="instruction-column">
    <div class="instruction-title brand-navy">Examination Instructions</div>

    <div class="instruction-meta color-grey-dark">
      Please read the following instructions carefully.
    </div>

    <ul class="list-unstyled">
      <li>
        <div class="marker"></div>
        <div>You are not allowed to read out loud any questions or answer</div>
      </li>

      <li>
        <div class="marker"></div>
        <div>You desk is clean and in line with the assessment regulations</div>
      </li>

      <li>
        <div class="marker"></div>
        <div>
          You will not allow any other individual attemt the assessment, or talk
          to you during the assessment.
        </div>
      </li>

      <li>
        <div class="marker"></div>
        <div>
          You are not allowed to visit other sites during the assessment.
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "instructionColumn",
};
</script>

<style lang="scss" scoped>
.instruction-column {
  .instruction-title {
    @include font-height(18, 28);
    margin-bottom: toRem(7);

    @include breakpoint-down(lg) {
      @include font-height(17, 26);
    }

    @include breakpoint-down(md) {
      @include font-height(16.5, 25);
    }

    @include breakpoint-down(sm) {
      @include font-height(15.5, 24);
    }

    @include breakpoint-down(xs) {
      @include font-height(14.75, 23);
    }
  }

  .instruction-meta {
    @include font-height(15, 21);
    margin-bottom: toRem(15);

    @include breakpoint-down(md) {
      @include font-height(14.75, 20);
    }

    @include breakpoint-down(sm) {
      @include font-height(14.5, 19);
    }

    @include breakpoint-down(xs) {
      @include font-height(14, 18);
    }
  }

  ul {
    li {
      @include flex-row-start-nowrap;
      @include font-height(14.75, 26);
      align-items: flex-start;
      list-style-type: circle;
      margin-bottom: toRem(6);
      color: $color-ash;

      .marker {
        background: darken($border-grey, 10%);
        @include square-shape(7);
        margin-right: toRem(7);
        position: relative;
        top: toRem(9);
        border-radius: 50%;
      }

      @include breakpoint-down(md) {
        @include font-height(14.5, 24);
      }

      @include breakpoint-down(sm) {
        @include font-height(14, 24);
      }

      @include breakpoint-down(xs) {
        @include font-height(13.5, 22);
      }

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}
</style>