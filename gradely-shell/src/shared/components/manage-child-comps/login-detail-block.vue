<template>
  <div class="login-detail-block">
    <div class="title-text font-weight-600 color-text">LOGIN DETAILS</div>

    <!-- DETAIL BLOCK  -->
    <div class="detail-block rounded-7">
      <!-- LEFT -->
      <div class="avatar brand-red-light-bg">
        <img v-lazy="mxStaticImg('Shield.png')" alt class="avatar-img" />
      </div>

      <!-- RIGHT -->
      <div class="w-100">
        <div class="left">
          <!-- INFO -->
          <div class="info">
            <div class="value color-grey-dark mgb-7">Student Code</div>
            <div class="title color-text text-uppercase">{{ getChildCode }}</div>
          </div>
        </div>

        <div class="left">
          <!-- INFO -->
          <div class="info">
            <div class="value color-grey-dark mgb-7">Login phone number</div>
            <div class="title color-text">{{getChildPhone}}</div>
          </div>

          <div
            class="block-link font-weight-700 pointer smooth-transition"
            @click="toggleLoginModal"
          >UPDATE</div>
        </div>

        <div class="left">
          <!-- INFO -->
          <div class="info">
            <div class="value color-grey-dark mgb-4">Password</div>
            <div class="title color-text text-uppercase">•••••••</div>
          </div>

          <div
            class="block-link font-weight-700 pointer smooth-transition"
            @click="toggleResetModal"
          >RESET PASSWORD</div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_reset_modal">
        <child-password-reset-modal :child="child" @closeTriggered="toggleResetModal" />
      </transition>

      <transition name="fade" v-if="show_login_update_modal">
        <update-child-login-modal
          @updateLogin="submitVerificationCode"
          :child="child"
          @closeTriggered="toggleLoginModal"
        />
      </transition>

      <transition name="fade" v-if="show_login_verification_modal">
        <child-phone-verification
          :phone="login_phone"
          @closeTriggered="togglePhoneVerificationModal"
          @resubmitPhone="submitVerificationCode"
          :child_id="child.id"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import childPasswordResetModal from "@/shared/modals/child-password-reset-modal";
import updateChildLoginModal from "@/shared/modals/update-child-login-modal";
import childPhoneVerification from "@/shared/modals/child-phone-verification";

export default {
  name: "loginDetailBlock",

  components: {
    childPasswordResetModal,
    updateChildLoginModal,
    childPhoneVerification,
  },

  props: {
    child: {
      type: [Object, Boolean],
    },
  },

  computed: {
    getChildCode() {
      return this.child ? this.child?.code : null;
    },

    getChildPhone() {
      return this.child?.phone ? this.child?.phone : "Not Available";
    },
  },

  data() {
    return {
      show_reset_modal: false,
      show_login_update_modal: false,
      show_login_verification_modal: false,
      login_phone: "",
    };
  },

  methods: {
    toggleResetModal() {
      this.show_reset_modal = !this.show_reset_modal;
    },

    toggleLoginModal() {
      this.show_login_update_modal = !this.show_login_update_modal;
    },

    togglePhoneVerificationModal() {
      this.show_login_verification_modal = !this.show_login_verification_modal;
    },

    submitVerificationCode(phone) {
      this.login_phone = phone;
      this.toggleLoginModal();
      this.togglePhoneVerificationModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.login-detail-block {
  margin-bottom: toRem(20);
  .title-text {
    @include font-height(13.25, 18);
    margin-bottom: toRem(10);
    padding-left: toRem(10);

    @include breakpoint-down(lg) {
      @include font-height(12, 17);
    }

    @include breakpoint-down(sm) {
      @include font-height(11, 16);
    }
  }

  .detail-block {
    padding: toRem(12);
    border: toRem(1) solid $brand-inverse-light;
    width: 100%;
    @include flex-row-start-nowrap;
    align-items: flex-start;
    gap: 0 toRem(20);

    @include breakpoint-down(xs) {
      padding: toRem(8);
    }

    .left {
      @include flex-row-between-nowrap;
      padding: toRem(13) 0;
      border-bottom: 1.5px solid $brand-inverse-light;

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        border: none;
        padding-bottom: toRem(5);
      }

      width: 100%;

      .avatar {
        @include square-shape(40);
        border-radius: toRem(10);
        margin-right: toRem(12);

        @include breakpoint-down(xs) {
          @include square-shape(35);
          margin-right: toRem(8);
        }

        img {
          @include square-shape(22);

          @include breakpoint-down(xs) {
            @include square-shape(19);
          }
        }
      }

      .title {
        @include font-height(13.25, 19);

        @include breakpoint-down(lg) {
          @include font-height(12, 17);
        }
      }

      .value {
        @include font-height(13, 16);

        @include breakpoint-down(lg) {
          @include font-height(12, 17);
        }
      }
    }

    .block-link {
      @include font-height(12, 16);
      color: $brand-accent;

      @include breakpoint-down(lg) {
        @include font-height(11, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(10.5, 16);
      }

      &:hover {
        color: $brand-inverse;
      }
    }
  }
}
</style>
