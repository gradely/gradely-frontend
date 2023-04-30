<template>
  <div
    class="
      gradely-top-bar
      fixed-top
      w-100
      box-shadow-effect
      index-999
      white-text-bg
    "
  >
    <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 h-auto mx-auto">
      <div class="d-flex justify-content-between align-items-center nowrap">
        <!-- BACK BUTTON  -->
        <div
          class="back-button pointer smooth-transition"
          @click="navigateBack"
        >
          <div class="icon brand-navy icon-caret-left smooth-transition"></div>
          <div class="text brand-navy smooth-transition">Back</div>
        </div>

        <!-- TITLE  -->
        <div class="title-text brand-navy font-weight-600">
          {{ $route.meta.title }}
        </div>

        <div class="invisible">null</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navSubBuild",

  mounted() {
    if (this.$route.name !== "StudentProfile")
      localStorage.removeItem("profile_back_link");
  },

  methods: {
    navigateBack() {
      let path =
        this.$route?.meta?.back_link &&
        this.$route?.meta?.back_link(this.$route);
      if (path) {
        this.$router.push({ path });
        return;
      }

      let get_back_link = localStorage.getItem("profile_back_link");

      if (this.$route.name === "ManageClass") {
        this.$router.go(-1);
        return true;
      }

      get_back_link === "/" || !get_back_link
        ? this.$router.go(-1)
        : this.$router.push(get_back_link);
    },
  },
};
</script>

<style lang="scss" scoped>
.gradely-top-bar {
  padding-top: toRem(8);
  padding-bottom: toRem(8);

  .back-button {
    border: toRem(1) solid $border-grey;
    @include flex-row-center-nowrap;
    padding: toRem(10) toRem(20);
    border-radius: toRem(25);
    width: max-content;

    @include breakpoint-down(md) {
      padding: toRem(10) toRem(14);
      border-radius: toRem(20);
    }

    @include breakpoint-down(sm) {
      padding: toRem(9) toRem(10);
    }
    .icon {
      font-size: toRem(15);
      margin-right: toRem(8);

      @include breakpoint-down(md) {
        font-size: toRem(14);
        margin-right: 0;
      }
    }
    .text {
      font-size: toRem(13.5);

      @include breakpoint-down(md) {
        display: none;
      }
    }

    &:hover {
      background: $brand-primary;

      .icon,
      .text {
        color: $white-text !important;
      }
    }
  }

  .title-text {
    @include font-height(15, 21);

    @include breakpoint-down(md) {
      @include font-height(14.25, 19);
    }

    @include breakpoint-down(xs) {
      font-weight: 500 !important;
    }
  }
}
</style>
