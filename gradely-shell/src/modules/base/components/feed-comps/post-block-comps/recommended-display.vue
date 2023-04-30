<template>
  <div
    class="
      recommended-display
      position-relative
      d-flex
      justify-content-start
      w-100
    "
  >
    <div class="spacer"></div>

    <div class="post-content-area padded-area pt-0 w-100">
      <div class="d-flex flex-column">
        <div class="recommended-text border-grey-dark mgb-5">
          RECOMMENDED FOR
        </div>

        <!-- CHILDREN LIST -->
        <div class="children-list">
          <div
            class="shape avatar"
            v-for="(student, index) in students"
            :key="index"
            :title="`${student.firstname} ${student.lastname}`"
          >
            <img
              v-if="student.image"
              :src="student.image"
              class="avatar-img"
              :alt="`${student.firstname} ${student.lastname}`"
            />

            <div
              v-else
              class="avatar-text white-text gfont-11"
              :class="
                $color.getProfileBgColor(
                  `${student.firstname} ${student.lastname}`
                )
              "
            >
              {{
                $string.getStringInitials(
                  `${student.firstname} ${student.lastname}`
                )
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommendedDisplay",

  props: {
    students: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.recommended-display {
  .recommended-text {
    @include font-height(10.25, 15);
  }

  .children-list {
    @include flex-row-start-wrap;

    .shape {
      @include square-shape(26);
      margin: 0 toRem(2.5);
      background: $color-white;
      border-radius: toRem(10);
      color: $color-grey-dark;

      @include breakpoint-down(xs) {
        @include square-shape(24);
      }

      .text {
        @include center-placement;
        font-size: toRem(11.5);

        @include breakpoint-down(xs) {
          font-size: toRem(11);
        }
      }

      &:first-of-type {
        margin-left: 0;
      }
    }
  }
}
</style>