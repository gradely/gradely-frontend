<template>
  <div class="card-wrapper h-auto position-relative">
    <div class="app-card rounded-10 overflow-hidden position-relative">
      <!-- TOP BLOCK  -->
      <div class="top-block ">
        <!-- APP ICON  -->
        <div
          class="app-icon rounded-15 position-relative skeleton-loader"
        ></div>
      </div>

      <!-- BOTTOM BLOCK  -->
      <div class="bottom-block">
        <!-- APP INFO  -->
        <div class="app-info">
          <div class="line-one rounded-5 skeleton-loader mgb-5"></div>
          <div class="line-two rounded-5 skeleton-loader"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "appDefaultCard",
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  width: 33.33%;
  padding: 0 0.9%;
  margin-bottom: toRem(23);

  @include breakpoint-down(lg) {
    padding: 0 0.65%;
  }

  @include breakpoint-down(md) {
    margin-bottom: toRem(14);
    width: 50%;
  }

  @include breakpoint-down(sm) {
    padding: 0 1.5%;
  }

  @include breakpoint-down(xs) {
    width: 100%;
    padding: 0 1%;
    margin-bottom: toRem(16);
  }
}

.app-card {
  background: rgba($white-text, 0.6);
  width: 100%;

  .top-block {
    background: rgba($white-text, 0.4);
    @include flex-column-center;
    padding: toRem(50) 0;

    @include breakpoint-down(xl) {
      padding: toRem(40) 0;
    }

    @include breakpoint-down(lg) {
      padding: toRem(35) 0;
    }

    @include breakpoint-custom-down(420) {
      padding: toRem(45) 0;
    }

    .app-icon {
      @include square-shape(96);

      @include breakpoint-down(xl) {
        @include square-shape(90);
      }

      @include breakpoint-down(lg) {
        @include square-shape(85);
      }

      @include breakpoint-down(md) {
        @include square-shape(75);
      }

      @include breakpoint-down(xs) {
        @include square-shape(65);
      }

      @include breakpoint-custom-down(420) {
        @include square-shape(75);
      }
    }
  }

  .bottom-block {
    padding: toRem(15);

    @include breakpoint-down(lg) {
      padding: toRem(11);
    }

    @include breakpoint-down(xs) {
      padding: toRem(8);
    }

    @include breakpoint-custom-down(420) {
      padding: toRem(14);
    }

    .app-info {
      width: 100%;

      .line-one {
        height: toRem(15);
        width: 70%;
      }

      .line-two {
        height: toRem(11);
        width: 40%;
      }
    }
  }
}
</style>
