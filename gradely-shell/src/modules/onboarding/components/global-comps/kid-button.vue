<template>
  <div class="kid-button position-relative pointer smooth-transition">
    <svg viewBox="0 0 179 49">
      <path
        d="M1.05312 13.3101C-0.960271 6.88043 3.81949 0.358851 10.5509 0.351104L168.612 0.169197C176.449 0.160178 181.279 8.75973 177.181 15.4261L159.677 43.8992C157.795 46.9608 154.409 48.7694 150.812 48.6347L17.5516 43.646C13.3088 43.4872 9.61988 40.6674 8.35013 36.6125L1.05312 13.3101Z"
      />
    </svg>

    <div
      class="text text-uppercase font-weight-700 brand-navy smooth-transition"
    >
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "kidButton",

  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.kid-button {
  svg {
    @include rectangle-shape(179, 49);

    @include breakpoint-down(sm) {
      @include rectangle-shape(160, 45);
    }

    path {
      @include transition(0.5s);
      fill: $brand-accent;
    }
  }

  .text {
    @include center-placement;
    font-size: toRem(11.25);
    letter-spacing: 0.04em;

    @include breakpoint-down(sm) {
      font-size: toRem(10.5);
      margin-top: toRem(-1);
      letter-spacing: 0.02em;
    }
  }

  &:hover {
    svg {
      filter: drop-shadow(toRem(1) toRem(3) toRem(6) 0 rgba($brand-black, 0.4));

      path {
        fill: $brand-inverse;
        filter: drop-shadow(
          toRem(1) toRem(3) toRem(6) 0 rgba($brand-black, 0.8)
        );
      }
    }

    .text {
      color: $white-text !important;
    }
  }
}
</style>
