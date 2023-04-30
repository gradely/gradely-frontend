<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="top-row">
          <img
            v-lazy="
              `${getAssetBaseURL(
                'cloud',
                'gradely'
              )}/image/upload/v1639029294/TrialFlower_ydzyof.svg`
            "
            alt=""
            class="w-100 h-100"
          />
        </div>

        <!-- TITLE  -->
        <div class="title-text brand-navy font-weight-700">
          Free trial Activated
        </div>

        <div class="info-text color-text text-center">
          Enjoy all the goodness of Gradely premium for 30 days without any
          cost. You will automatically be upgraded to the Freemium plan at the
          end of your trial period.
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex flex-column align-items-center">
        <button class="btn btn-accent mgb-7">Get Premium</button>

        <button
          class="btn transparent-bg no-shadow color-text"
          @click="$emit('closeTriggered')"
        >
          Dismiss
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "trialActivatedModal",

  components: {
    modalCover,
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  margin-top: toRem(40);
  @include flex-column-start-center;

  .top-row {
    @include square-shape(160);
    margin-top: toRem(-25);

    @include breakpoint-down(lg) {
      @include square-shape(140);
    }

    @include breakpoint-down(xs) {
      @include square-shape(120);
    }
  }

  .title-text {
    @include font-height(20, 26);
    margin-top: toRem(-5);
    margin-bottom: toRem(11);

    @include breakpoint-down(lg) {
      @include font-height(18, 23);
    }

    @include breakpoint-down(xs) {
      margin-top: toRem(2);
      @include font-height(16, 20);
    }
  }

  .info-text {
    @include font-height(13.75, 24);
    margin-bottom: toRem(-7);
    width: 98%;

    @include breakpoint-down(lg) {
      @include font-height(13.25, 22);
    }

    @include breakpoint-down(xs) {
      @include font-height(12.75, 21.5);
    }
  }
}

.modal-cover-footer {
  .btn {
    @include breakpoint-down(lg) {
      font-size: toRem(10.5);
      padding: toRem(11) toRem(28);
    }
  }
}
</style>
