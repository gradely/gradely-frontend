<template>
  <div class="permission-accordion">
    <!-- IMAGE ICON  -->
    <img v-lazy="mxStaticImg(permission.icon)" alt="" />

    <!-- CONTENT SECTION  -->
    <div class="content-section w-100">
      <!-- TOP SECTION  -->
      <div class="top pointer" @click="toggleAccordion">
        <div class="title color-text select-none">{{ permission.title }}</div>

        <div
          class="icon icon-caret-down color-ash smooth-transition"
          :class="{ 'rotate-180': show_accordion }"
        ></div>
      </div>

      <!-- BOTTOM SECTION  -->
      <div class="bottom color-ash smooth-animation" v-if="show_accordion">
        {{ permission.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "permissionAccordion",

  props: {
    permission: {
      type: Object,
      default: () => ({
        icon: "UserCircle.svg",
        title: "Personally identifiable information",
        description:
          " For example your school name, address, contact information, teacher names, classes, subjects, age, students, parents, phone number or identification number",
      }),
    },
  },

  data: () => ({
    show_accordion: false,
  }),

  methods: {
    toggleAccordion() {
      this.show_accordion = !this.show_accordion;
    },
  },
};
</script>

<style lang="scss" scoped>
.permission-accordion {
  @include flex-row-between-nowrap;
  align-items: flex-start;
  margin-bottom: toRem(20);

  img {
    @include square-shape(30);
    margin-right: toRem(20);

    @include breakpoint-down(xl) {
      @include square-shape(28);
      margin-right: toRem(15);
    }

    @include breakpoint-down(xs) {
      @include square-shape(26);
      margin-right: toRem(10);
    }

    @include breakpoint-custom-down(370) {
      @include square-shape(23);
      margin-right: toRem(8);
    }
  }

  .content-section {
    padding: toRem(7) 0 toRem(10);
    border-bottom: toRem(1) solid $border-grey;

    @include breakpoint-down(xl) {
      padding: toRem(3) 0 toRem(8);
    }

    @include breakpoint-down(xs) {
      padding: toRem(4) 0 toRem(6);
    }

    @include breakpoint-custom-down(370) {
      padding: toRem(2) 0 toRem(6);
    }

    .top {
      @include flex-row-between-nowrap;
      align-items: flex-start;
      margin-bottom: toRem(12);

      @include breakpoint-down(xl) {
        margin-bottom: toRem(8);
      }

      @include breakpoint-down(xs) {
        margin-bottom: toRem(6);
      }

      .title {
        @include font-height(14.5, 23);

        @include breakpoint-down(xl) {
          @include font-height(13.25, 18);
        }

        @include breakpoint-down(xs) {
          @include font-height(12.25, 18);
        }

        @include breakpoint-custom-down(370) {
          @include font-height(11.5, 17);
        }
      }

      .icon {
        position: relative;
        margin-top: toRem(2);
        font-size: toRem(14);

        @include breakpoint-down(xl) {
          font-size: toRem(13);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(11);
        }

        @include breakpoint-custom-down(370) {
          font-size: toRem(10);
        }
      }
    }

    .bottom {
      @include font-height(13, 22);

      @include breakpoint-down(xl) {
        @include font-height(12.5, 21);
      }

      @include breakpoint-down(xs) {
        @include font-height(11.5, 19);
      }
    }
  }
}
</style>
