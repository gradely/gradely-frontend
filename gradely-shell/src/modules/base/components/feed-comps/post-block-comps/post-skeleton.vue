<template>
  <div class="post-skeleton post-container-block mgb-10">
    <div class="padded-area">
      <!-- TOP  -->
      <div class="top">
        <div
          class="avatar avatar-square"
          :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>

        <!-- INFO  -->
        <div class="info w-100">
          <div
            class="line-one rounded-3 mgb-4"
            :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
          ></div>
          <div
            class="line-two rounded-3"
            :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
          ></div>
        </div>
      </div>

      <!-- MIDDLE  -->
      <div class="middle w-100 mgt-25">
        <div
          class="line line-one"
          :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>
        <div
          class="line line-two"
          :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>
        <div
          class="line line-three"
          :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "postSkeleton",

  props: {
    loading_state: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.post-skeleton {
  background: rgba($white-text, 0.8);

  .top {
    @include flex-row-start-nowrap;

    .avatar {
      @include square-shape(34);
      margin-right: toRem(10);
    }

    .line-one {
      width: 60%;
      height: toRem(16);
    }

    .line-two {
      width: 40%;
      height: toRem(12);
    }
  }

  .middle {
    .line {
      margin-bottom: toRem(8);
      border-radius: toRem(3);
      height: toRem(15);
    }

    .line-one {
      width: 95%;
    }

    .line-two {
      width: 80%;
    }

    .line-three {
      width: 60%;
    }
  }
}
</style>
