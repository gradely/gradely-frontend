<template>
  <div
    class="trial-alert-card rounded-5 brand-inverse-light-bg border-brand-inverse mgb-30"
  >
    <div class="left-info">
      <!-- TEXT DETAIL  -->
      <div class="text color-text mgr-15">
        <img :src="mxStaticImg('GiftBox.svg')" alt="" class="mgr-6" /> Get
        unlimited access to Gradely Premium.
      </div>

      <!-- ACTION BUTTON  -->
      <div class="inner-wrapper">
        <button class="btn btn-accent my-0" @click="toggleTrialModal">
          1 Month Free
        </button>

        <div class="text color-text">
          <router-link to class="learn-more link-underline smooth-transition"
            >Learn More</router-link
          >
        </div>
      </div>
    </div>

    <div
      class="icon icon-close border-grey-dark pointer smooth-transition"
      title="Close"
    ></div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_trial_modal">
        <start-trial-modal
          @showTrialActivated="closeTrialOpenActivated"
          @closeTriggered="toggleTrialModal"
        />
      </transition>

      <transition name="fade" v-if="show_activated_trial_modal">
        <trial-activated-modal @closeTriggered="toggleActivatedTrialModal" />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "trialAlertCard",

  components: {
    startTrialModal: () =>
      import(
        /* webpackChunkName: "startTrialModal" */ "@/modules/dashboard/modals/start-trial-modal"
      ),
    trialActivatedModal: () =>
      import(
        /* webpackChunkName: "trialActivatedModal" */ "@/modules/dashboard/modals/trial-activated-modal"
      ),
  },

  data: () => ({
    show_trial_modal: false,
    show_activated_trial_modal: false,
  }),

  methods: {
    toggleTrialModal() {
      this.show_trial_modal = !this.show_trial_modal;
    },

    toggleActivatedTrialModal() {
      this.show_activated_trial_modal = !this.show_activated_trial_modal;
    },

    closeTrialOpenActivated() {
      this.show_trial_modal = false;
      this.toggleActivatedTrialModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.trial-alert-card {
  @include flex-row-between-nowrap;
  padding: toRem(12) toRem(18);

  @include breakpoint-down(md) {
    margin-bottom: toRem(20) !important;
  }

  @include breakpoint-down(sm) {
    padding: toRem(10) toRem(18);
    margin-bottom: toRem(15) !important;
  }

  @include breakpoint-down(xs) {
    padding: toRem(8) toRem(10);
  }

  @include breakpoint-custom-down(380) {
    @include flex-row-between-nowrap;
  }

  .left-info {
    @include flex-row-start-wrap;

    @include breakpoint-custom-down(610) {
      @include flex-column-start-start;
    }
  }

  .inner-wrapper {
    @include flex-row-start-nowrap;

    @include breakpoint-custom-down(610) {
      margin-top: toRem(10);
    }
  }

  .text {
    position: relative;
    top: toRem(2.5);
    @include font-height(13.25, 18);

    @include breakpoint-down(xl) {
      @include font-height(13.25, 18);
    }

    @include breakpoint-down(md) {
      @include font-height(13, 18);
    }

    @include breakpoint-down(sm) {
      @include font-height(12.25, 17);
    }

    @include breakpoint-down(xs) {
      @include font-height(11.5, 18);
      margin-right: toRem(10) !important;
    }

    .learn-more {
      position: relative;
      top: toRem(-2);
      font-weight: 600;
      @include font-height(12.75, 19);
      color: $brand-navy;

      @include breakpoint-down(xl) {
        @include font-height(12.75, 18);
      }

      @include breakpoint-down(md) {
        @include font-height(12.25, 17);
      }

      @include breakpoint-down(sm) {
        @include font-height(11.75, 16);
      }

      @include breakpoint-down(xs) {
        @include font-height(10.75, 15);
      }

      &:hover {
        color: $brand-accent;
      }
    }
  }

  .btn {
    font-size: toRem(9.5);
    padding: toRem(9) toRem(20);
    margin-left: toRem(5);
    margin-right: toRem(20);

    @include breakpoint-down(lg) {
      font-size: toRem(9.5);
      margin-left: toRem(3);
      margin-right: toRem(15);
      padding: toRem(9.5) toRem(20);
    }

    @include breakpoint-down(sm) {
      font-size: toRem(9);
      margin-right: toRem(12);
    }
  }

  .icon {
    font-size: toRem(16);

    &:hover {
      color: $brand-red !important;
    }
  }
}
</style>
