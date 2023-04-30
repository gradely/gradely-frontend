<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header"> </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- BANNER  -->
        <div class="banner position-relative top-0 w-100">
          <img
            v-lazy="
              `${getAssetBaseURL(
                'cloud',
                'gradely'
              )}/image/upload/v1639029287/TrialBanner_rkpq2f.png`
            "
            alt=""
            class="w-100 h-auto"
          />
        </div>

        <!-- CONTENT BLOCK  -->
        <div class="content-block mx-auto">
          <!-- TITLE TEXT  -->
          <div class="title-text brand-navy font-weight-600 text-center">
            Start your 30-Days free trial now
          </div>

          <!-- DESCRIPTION  -->
          <div class="description color-ash text-center">
            Everyone gets a full 30-days to use and experience Gradely without
            charge or restrictions.
          </div>

          <button class="btn btn-md btn-accent" @click="processTrialPlan">
            Try it for Free
          </button>

          <!-- INFO TEXT  -->
          <div class="info-text color-ash text-center">
            Get upto 20% in discount if you subscribe for the premium plan
            today.
            <router-link to class="btn-link">Learn more here</router-link>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer"> </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "startTrialModal",

  components: {
    modalCover,
  },

  methods: {
    processTrialPlan() {
      this.$emit("showTrialActivated");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  padding: 0 !important;
  min-height: 10vh;
  height: auto;
  max-height: 80vh;

  .banner {
    z-index: 9;
  }

  .content-block {
    position: relative;
    @include flex-column-center;
    width: 72%;
    margin-top: toRem(-100);
    z-index: 3999;

    @include breakpoint-down(lg) {
      width: 65%;
    }

    @include breakpoint-down(xs) {
      margin-top: toRem(-90);
      width: 80%;
    }

    @include breakpoint-custom-down(405) {
      margin-top: toRem(-75);
      width: 90%;
    }

    .title-text {
      @include font-height(26, 40);
      margin-bottom: toRem(28);

      @include breakpoint-down(lg) {
        @include font-height(23.75, 33);
        margin-bottom: toRem(25);
      }

      @include breakpoint-down(xs) {
        @include font-height(21.75, 32);
      }

      @include breakpoint-custom-down(405) {
        @include font-height(20, 30);
      }

      @include breakpoint-custom-down(360) {
        @include font-height(19.5, 28);
      }
    }

    .description {
      @include font-height(14, 24);
      margin-bottom: toRem(28);

      @include breakpoint-down(lg) {
        @include font-height(13, 22);
      }

      @include breakpoint-down(xs) {
        @include font-height(12.25, 20);
        margin-bottom: toRem(25);
      }
    }

    .btn {
      margin-bottom: toRem(28);
      font-size: toRem(11.5);
      padding: toRem(12.25) toRem(28);

      @include breakpoint-down(lg) {
        font-size: toRem(10);
        padding: toRem(12) toRem(26);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(9.5);
        padding: toRem(11) toRem(24);
        margin-bottom: toRem(24);
      }
    }

    .info-text {
      @include font-height(14, 23);
      margin-bottom: toRem(40);

      @include breakpoint-down(lg) {
        @include font-height(12.5, 21);
      }

      @include breakpoint-down(xs) {
        @include font-height(12.25, 20);
      }
    }
  }
}
</style>
