<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <div slot="modal-cover-header" class="gfont-14 font-weight-600 header">
      UPDATE PHONE
    </div>

    <!-- MODAL BODY  -->
    <div slot="modal-cover-body" class="body">
      <img v-lazy="verificationBadge" alt="badge" class="badge" />

      <div class="gfont-13 text-center mgb-25 mgt-12">
        Enter the 6 digit code sent to
        <span class="font-weight-600">{{ phone }}</span> to update your child's
        phone
      </div>

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
        @click="updateCredential"
      >
        Update
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
          <div
            class="
              verify-later-msg
              color-ash
              text-center
              gfont-13-5
              smooth-transition
            "
            v-if="resend_count > 2"
          >
            Having problems verifying your phone number?
            <span class="btn-link mgt-5" @click="navigateToPhoneVerification"
              >Use another phone number</span
            >
          </div>

          <div
            class="resend-link color-ash text-center smooth-transition"
            v-else
          >
            Didn’t get a code?
            <div class="mgt-7 smooth-transition">
              <span class="btn-link" @click="resendCode">Resend Code</span>
            </div>
          </div>
        </template>
      </template>
    </div>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";
export default {
  name: "ChildPhoneVerification",

  components: {
    modalCover,
  },

  props: {
    phone: {
      type: String,
      default: "",
    },

    child_id: {
      type: [String, Number],
      default: "",
    },
  },

  computed: {
    verificationBadge() {
      return `${this.getAssetBaseURL(
        "cloud",
        "gradely"
      )}/image/upload/v1639030662/VerificationAvatar_axcdp7.png`;
    },

    getPayload() {
      return {
        payload: {
          phone: this.phone,
          code: this.getPassCode,
        },
        child_id: this.child_id,
      };
    },

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

      show_verification_error: false,

      resend_count: 1,
      resend_countdown: 0,
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
        if (value.length === 1) this.updateCredential();
      },
    },
  },

  mounted() {
    this.$nextTick(() => this.$refs.serialOne.focus());
  },

  methods: {
    ...mapActions({
      resendVerificationCode: "onboarding/sendVerificationCode",
      updateChildLogin: "general/updateChildLogin",
    }),

    navigateToPhoneVerification() {
      this.$emit("resubmitPhone", this.phon);
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
    async sendOutVerificationCode() {
      let response = await this.resendVerificationCode({ phone: this.phone });
      if (response.code == 200)
        this.pushAlert("Verification code sent", "success");
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

    updateCredential() {
      this.handleClick("verifyBtn", "updating...");

      this.updateChildLogin(this.getPayload)
        .then((response) => {
          this.handleClick("verifyBtn", "update", false);

          if (response?.data?.code === 200 || response?.code === 200) {
            this.pushAlert("Child login information updated", "success");
            this.$bus.$emit("updateChildrenList");

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1500);
          } else {
            this.show_verification_error = true;
            setTimeout(() => {
              this.show_verification_error = false;
            }, 3000);
          }
        })
        .catch(() => {
          this.handleClick("verifyBtn", "update", false);
          this.pushAlert("Failed to update login information", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: toRem(20) 0 0 toRem(20);

  @include breakpoint-down(sm) {
    padding: toRem(15) 0 0 toRem(15);
  }
}

.body {
  padding: toRem(15) toRem(25) toRem(25) toRem(25);

  @include breakpoint-down(sm) {
    padding: toRem(12) toRem(20) toRem(20) toRem(20);
  }

  @include breakpoint-down(xs) {
    padding: toRem(10) toRem(15) toRem(15) toRem(15);
  }
}

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
  @include font-height(13, 18);

  @include breakpoint-custom-down(380) {
    @include font-height(12.5, 17);
  }
}

.badge {
  display: block;
  @include rectangle-shape(170, 120);
  margin: auto;
}
</style>