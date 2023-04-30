<template>
  <div>
    <dialog-layout
      :dialog_image="`${getAssetBaseURL(
        'cloud',
        'gradely'
      )}/image/upload/v1639030662/VerificationAvatar_axcdp7.png`"
      dialog_title="Verify your Account"
      :user_contact="getAuthUser.email || getAuthUser.phone || 'No contact'"
      @toggleProfileUpdate="toggleProfileModal"
    >
      <template slot="content">
        <!-- INPUT ROW  -->
        <div
          class="input-data-row"
          :class="show_verification_error ? 'error-state' : null"
        >
          <input
            type="text"
            v-model="serial_one"
            ref="serialOne"
            class="form-control"
          />
          <input
            type="text"
            v-model="serial_two"
            ref="serialTwo"
            class="form-control"
            :disabled="checkInputOne"
          />
          <input
            type="text"
            v-model="serial_three"
            ref="serialThree"
            class="form-control"
            :disabled="checkInputTwo"
          />
          <input
            type="text"
            v-model="serial_four"
            ref="serialFour"
            class="form-control"
            :disabled="checkInputThree"
          />
          <input
            type="text"
            v-model="serial_five"
            ref="serialFive"
            class="form-control"
            :disabled="checkInputFour"
          />
          <input
            type="text"
            v-model="serial_six"
            ref="serialSix"
            class="form-control"
            :disabled="checkInputFive"
          />
        </div>

        <!-- ERROR STATE MESSAGE -->
        <div
          class="error-state-msg brand-tonic text-center"
          v-if="show_verification_error"
        >
          Invalid Verification code entered
        </div>

        <!-- GET STARTED BUTTON  -->
        <button
          class="btn btn-accent mx-auto"
          :disabled="isDisabled"
          ref="verifyBtn"
          @click="verifyAccount"
        >
          Get Started
        </button>

        <!-- RESEND CODE LINK  -->
        <template>
          <div
            v-if="isResending"
            class="
              resend-code-msg
              color-ash
              text-center
              gfont-13-5
              smooth-transition
            "
          >
            Resending code in .{{ resend_countdown }}s
          </div>

          <template v-else>
            <!-- <div
              class="
                verify-later-msg
                color-ash
                text-center
                gfont-13-5
                smooth-transition
              "
              v-if="resend_count > 2"
            >
              Having problems verifying your account?
              <span class="btn-link" @click="navigateToVerifyLaterPage"
                >Verify later</span
              >
            </div> -->

            <div class="resend-link color-ash text-center smooth-transition">
              Not able to verify your account?
              <div class="mgt-7 smooth-transition">
                <template v-if="getAuthUser.email || getAuthUser.phone">
                  <span class="btn-link" @click="resendCode">Resend Code</span>
                  or
                </template>
                <span class="btn-link" @click="toggleProfileModal"
                  >Update Contact</span
                >
                or
                <span class="btn-link" @click="navigateToVerifyLaterPage"
                  >Verify Later</span
                >
              </div>

              <!-- HELP GUIDE -->
              <div
                class="help-guide"
                v-if="getAuthUser.email || getAuthUser.phone"
              >
                <div
                  class="
                    position-relative
                    guide-wrapper
                    box-shadow-effect
                    rounded-circle
                    pointer
                  "
                  v-animate-css="{
                    classes: 'headShake',
                    duration: 1150,
                    iteration: '10',
                  }"
                  @mouseenter="show_tooltip = true"
                  @mouseleave="show_tooltip = false"
                >
                  <div class="icon icon-circle-question-mark brand-navy"></div>
                </div>

                <!-- HELP TOOLTIP -->
                <div
                  class="help-tooltip smooth-transition rounded-5 text-left"
                  v-if="show_tooltip"
                >
                  <div class="wrapper position-relative">
                    A verification code has been sent to your
                    {{ getAuthUser.email ? "email address" : "phone number" }},
                    please check to verify.
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </template>
    </dialog-layout>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" mode="in-out" v-if="show_profile_modal">
        <update-contact-modal
          :code="code"
          @closeTriggered="toggleProfileModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import dialogLayout from "@/modules/onboarding/components/global-comps/dialog-layout";

export default {
  name: "verificationDialog",

  metaInfo: {
    title: "Verify Account",
  },

  components: {
    dialogLayout,
    updateContactModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/onboarding/modals/update-contact-modal"
      ),
  },

  computed: {
    isDisabled() {
      return this.serial_one &&
        this.serial_two &&
        this.serial_three &&
        this.serial_four &&
        this.serial_five &&
        this.serial_six
        ? false
        : true;
    },

    checkInputOne() {
      return this.serial_one.length === 1 ? false : true;
    },

    checkInputTwo() {
      return this.serial_two.length === 1 ? false : true;
    },

    checkInputThree() {
      return this.serial_three.length === 1 ? false : true;
    },

    checkInputFour() {
      return this.serial_four.length === 1 ? false : true;
    },

    checkInputFive() {
      return this.serial_five.length === 1 ? false : true;
    },

    checkInputSix() {
      return this.serial_six.length === 1 ? false : true;
    },

    getPassCode() {
      return `${this.serial_one}${this.serial_two}${this.serial_three}${this.serial_four}${this.serial_five}${this.serial_six}`;
    },

    isResending() {
      return this.resend_countdown > 0 ? true : false;
    },
  },

  data() {
    return {
      code: "",

      serial_one: "",
      serial_two: "",
      serial_three: "",
      serial_four: "",
      serial_five: "",
      serial_six: "",

      show_profile_modal: false,
      show_verification_error: false,

      resend_count: 1,
      resend_countdown: 0,

      is_invite: this.$route.query?.invited ?? false,
      show_tooltip: false,
    };
  },

  watch: {
    serial_one: {
      handler(value) {
        if (value.length === 1)
          this.$nextTick(() => this.$refs.serialTwo.focus());
        else if (value.length > 1) this.checkPastedContent(value);
      },
    },

    serial_two: {
      handler(value) {
        if (value.length === 1)
          this.$nextTick(() => this.$refs.serialThree.focus());
      },
    },

    serial_three: {
      handler(value) {
        if (value.length === 1)
          this.$nextTick(() => this.$refs.serialFour.focus());
      },
    },

    serial_four: {
      handler(value) {
        if (value.length === 1)
          this.$nextTick(() => this.$refs.serialFive.focus());
      },
    },

    serial_five: {
      handler(value) {
        if (value.length === 1)
          this.$nextTick(() => this.$refs.serialSix.focus());
      },
    },

    serial_six: {
      handler(value) {
        if (value.length === 1) this.verifyAccount();
      },
    },
  },

  created() {
    this.checkUserStatus();
    this.sendOutVerificationCode();
  },

  mounted() {
    this.$nextTick(() => this.$refs.serialOne.focus());

    setTimeout(() => {
      if (!this.getAuthUser.email && !this.getAuthUser.phone)
        this.toggleProfileModal();
    }, 2000);

    this.checkForVerificationGuide();
  },

  methods: {
    ...mapActions({
      requestAccountVerification: "onboarding/requestAccountVerification",
      verifyAccountCode: "onboarding/verifyAccountCode",
      updateVerificationStatus: "auth/updateVerificationStatus",
    }),

    checkForVerificationGuide() {
      setTimeout(() => {
        if (this.getAuthUser.email || this.getAuthUser.phone)
          this.show_tooltip = true;
      }, 2000);

      setTimeout(() => (this.show_tooltip = false), 12000);
    },

    checkPastedContent(value) {
      this.$nextTick(() => {
        let splitted = value.split("");

        this.serial_one = splitted[0] || "";
        this.serial_two = splitted[1] || "";
        this.serial_three = splitted[2] || "";
        this.serial_four = splitted[3] || "";
        this.serial_five = splitted[4] || "";
        this.serial_six = splitted[5] || "";
      });
    },

    // SEND OUT VERIFICATION CODE
    sendOutVerificationCode() {
      if (this.getAuthUser?.email || this.getAuthUser?.phone) {
        this.requestAccountVerification({
          channel: this.getAuthType === "student" ? "phone" : "",
        }).then((response) => {
          this.code = response.data?.code;
        });
      }
    },

    toggleProfileModal() {
      this.show_profile_modal = !this.show_profile_modal;
    },

    resendCode() {
      this.triggerResetCountdown(this.resend_count === 1 ? 30 : 60);
      this.sendOutVerificationCode();
      this.resend_count += 1;
    },

    triggerResetCountdown(count) {
      this.resend_countdown = count;
      const intervalCall = setInterval(() => {
        this.resend_countdown -= 1;

        if (this.resend_countdown === 0) clearInterval(intervalCall);
      }, 1000);
    },

    clearOutInput() {
      this.serial_one = "";
      this.serial_two = "";
      this.serial_three = "";
      this.serial_four = "";
      this.serial_five = "";
      this.serial_six = "";
    },

    verifyAccount() {
      this.handleClick("verifyBtn", "verifying...");

      this.verifyAccountCode({ code: this.getPassCode })
        .then((response) => {
          this.handleClick("verifyBtn", "Get Started", false);

          if (response.code === 200) {
            this.pushAlert("Account verification was successful!", "success");
            this.updateVerificationStatus();

            // CHECK BOARDING STATUS
            setTimeout(() => {
              this.getAuthUser.is_boarded
                ? this.navigateToVerifyLaterPage()
                : this.startOnboarding(this.getAuthType);
            }, 1000);
          } else {
            this.show_verification_error = true;
            setTimeout(() => (this.show_verification_error = false), 5000);
            setTimeout(() => this.clearOutInput(), 6000);
          }
        })
        .catch((err) => {
          this.handleClick("verifyBtn", "Get Started", false);
          this.pushAlert("An error occured while verifying account", "error");
        });
    },

    checkUserStatus() {
      let is_verified = this.getAuthUser.is_verified;
      let is_boarded = this.getAuthUser.is_boarded;
      let account = this.getAuthType;

      if (is_verified && is_boarded) location.href = "/";
      else if (is_verified && !is_boarded) this.startOnboarding(account);
    },

    navigateToVerifyLaterPage() {
      let is_boarded = this.getAuthUser.is_boarded;
      let account = this.getAuthType;

      if (is_boarded)
        account === "school"
          ? this.$router.replace("/home")
          : this.$router.replace("/feed/0");
      else this.startOnboarding(account);
    },

    startOnboarding(type) {
      if (type === "school") {
        this.is_invite
          ? this.$router.replace("/home")
          : this.$router.replace({ name: "SchoolSetup" });
      }
      if (type === "teacher") {
        this.is_invite || this.getAuthUser.has_class
          ? this.$router.replace("/feed/0")
          : this.$router.replace({ name: "GradelyWelcome" });
      }
      if (type === "parent") {
        this.$route.query?.redirect
          ? (location.href = this.$route.query?.redirect)
          : this.is_invite || this.getAuthUser.relationship
          ? this.$router.replace("/feed/0")
          : this.$router.replace({ name: "ParentAddChild" });
      }
      if (type === "student") {
        this.$route.query?.redirect ||
        this.getAuthUser.has_class ||
        this.is_invite
          ? this.$router.replace({
              name: "StudentSelectAvatar",
              query: this.$route.query,
            })
          : this.$router.replace({ name: "GradelyWelcome" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-data-row {
  @include flex-row-center-nowrap;
  margin-bottom: toRem(25);

  .form-control {
    width: 11.5%;
    margin: 0 toRem(4);
    font-size: toRem(13.75);
    font-weight: 600;
    padding: toRem(6) toRem(11);
    min-height: toRem(38) !important;
    text-align: center;

    @include breakpoint-custom-down(890) {
      width: 10.75%;
    }

    @include breakpoint-down(sm) {
      width: 12.5%;
    }
  }
}

.error-state {
  .form-control {
    border: toRem(1) solid $brand-tonic;
  }
}

.error-state-msg {
  @include font-height(13, 18);
  margin: toRem(-8) auto toRem(20);
}

.btn {
  margin-bottom: toRem(25);
  padding: toRem(13) toRem(45);
  font-size: toRem(11.25);

  @include breakpoint-custom-down(890) {
    padding: toRem(10) toRem(42);
    font-size: toRem(9.5);
  }

  @include breakpoint-down(sm) {
    padding: toRem(15) toRem(52);
    font-size: toRem(10.25);
  }
}

.resend-link {
  @include font-height(13.5, 18);

  @include breakpoint-custom-down(380) {
    @include font-height(13.25, 17);
  }
}

.help-guide {
  position: fixed;
  bottom: toRem(30);
  right: toRem(30);

  @include breakpoint-down(md) {
    right: toRem(10);
    bottom: toRem(12);
  }

  .guide-wrapper {
    @include square-shape(40);
    background: $white-text;

    @include breakpoint-down(md) {
      @include square-shape(35);
    }

    .icon {
      @include center-placement;
      font-size: toRem(22);

      @include breakpoint-down(md) {
        font-size: toRem(19);
      }
    }
  }

  .help-tooltip {
    position: absolute;
    left: toRem(-175);
    top: toRem(-110);
    background: lighten($brand-inverse, 4%);
    padding-bottom: toRem(12) !important;
    padding-bottom: toRem(8);
    width: auto;
    height: auto;

    @include breakpoint-down(xl) {
      height: toRem(90);
      top: toRem(-95);
    }

    @include breakpoint-down(lg) {
      height: toRem(72);
      top: toRem(-75);
    }

    @include breakpoint-down(md) {
      left: toRem(-240);
      top: toRem(-35);
      right: toRem(40);
    }

    .wrapper {
      @include font-height(12.25, 21);
      color: $black-text;

      &:after {
        content: "";
        position: absolute;
        bottom: toRem(-18);
        right: toRem(11);
        border-left: toRem(12) solid transparent;
        border-right: toRem(12) solid transparent;
        border-top: toRem(12) solid lighten($brand-inverse, 4%);

        @include breakpoint-down(md) {
          top: 65%;
          bottom: unset;
          right: toRem(-20);
          border-bottom: toRem(12) solid transparent;
          border-top: toRem(12) solid transparent;
          border-left: toRem(12) solid lighten($brand-inverse, 4%);
        }
      }
    }
  }
}
</style>
