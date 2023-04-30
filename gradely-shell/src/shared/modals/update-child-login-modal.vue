<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Update Login</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgt--5">
        <child-info-modal-card
          :child="{
            image: child.image,
            fullname: child.full_name,
            class_name: child.code,
          }"
        />

        <div class="info color-ash">The child will be able to log in with the provided phone number.</div>

        <div class="form-group compact-row w-100">
          <label for="phone" class="label-compact label-sm">Phone number</label>
          <input
            type="phone"
            id="phone"
            class="form-control"
            v-model="phone"
            placeholder="Enter phone number"
            required
            :minlength="6"
            ref="phoneInput"
          />
        </div>

        <div class="form-group compact-row w-100" v-if="false">
          <label for="child-password" class="label-compact label-sm">Password</label>
          <input
            :type="show_child_password ? 'text' : 'password'"
            id="child-password"
            class="form-control"
            v-model="form.child_password"
            placeholder="Create a password for the child"
            required
            :minlength="6"
            ref="childPasswordInput"
          />

          <!-- TOGGLE ICON  -->
          <div
            class="addon index-9 pointer smooth-transition"
            :class="
              show_child_password
                ? ['icon-hide', 'brand-accent']
                : ['icon-eye', 'brand-inverse']
            "
            @click="toggleChildPasswordType"
            title="Toggle Password"
          ></div>
        </div>

        <div class="form-group compact-row w-100" v-if="false">
          <label for="password" class="label-compact label-sm">Your Password</label>
          <input
            :type="show_password ? 'text' : 'password'"
            id="password"
            class="form-control"
            v-model="form.password"
            placeholder="Enter your password to confirm"
            required
            :minlength="6"
            ref="passwordInput"
          />

          <!-- TOGGLE ICON  -->
          <div
            class="addon index-9 pointer smooth-transition"
            :class="
              show_password
                ? ['icon-hide', 'brand-accent']
                : ['icon-eye', 'brand-inverse']
            "
            @click="togglePasswordType"
            title="Toggle Password"
          ></div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end">
        <button
          class="btn btn-accent modal-btn mx-auto"
          :disabled="!isPhoneValid()"
          ref="resetBtn"
          @click="requestValidationCode"
        >submit</button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";
import childInfoModalCard from "@/modules/dashboard/modals/child-info-modal-card";

export default {
  name: "UpdateChildLoginModal",

  components: {
    modalCover,
    childInfoModalCard,
  },

  props: {
    child: {
      type: Object,
    },
  },

  computed: {
    getPayload() {
      return {
        phone: this.phone,
      };
    },
  },

  data() {
    return {
      phone: "",
      form: {
        phone: "",
        password: "",
        child_password: "",
        student_code: this.child?.code,
      },

      show_password: false,
      show_child_password: false,
    };
  },

  mounted() {
    this.$refs.phoneInput.focus();
  },

  methods: {
    ...mapActions({
      resendVerificationCode: "onboarding/sendVerificationCode",
    }),

    isPhoneValid() {
      return this.$validate.checkPhoneNumber(this.phone) === null
        ? true
        : false;
    },

    requestValidationCode() {
      this.handleClick("resetBtn", "getting code");
      this.resendVerificationCode(this.getPayload)
        .then((response) => {
          this.handleClick("resetBtn", "submit", false);
          let message =
            response.code === 200 ? "Verification code sent" : response.message;
          let type = response.code === 200 ? "success" : "warning";
          this.pushAlert(message, type);
          if (type == "success") this.updatePhone();
        })
        .catch(() => {
          this.pushAlert("Error occured!!! Try again.", "error");
          this.handleClick("resetBtn", "submit", false);
        });
    },

    updatePhone() {
      this.$emit("updateLogin", this.phone);
    },

    validateFields() {
      if (!this.form?.phone?.length < 11) {
        this.pushAlert("Enter a valid phone number", "warning");
        return false;
      }
      if (!this.form?.child_password?.length < 6) {
        this.pushAlert(
          "Child password should be at least 6 characters",
          "warning"
        );
        return false;
      }
      if (!this.form?.password) {
        this.pushAlert("Enter your password", "warning");
        return false;
      }
      return true;
    },

    togglePasswordType() {
      this.show_password = !this.show_password;
    },

    toggleChildPasswordType() {
      this.show_child_password = !this.show_child_password;
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  @include font-height(12.5, 21);
  margin-bottom: toRem(30);
  margin-top: toRem(5);
}

.addon {
  font-size: toRem(18);
  @include center-y;
  right: toRem(15);
}

.modal-cover-footer {
  margin-bottom: toRem(10);
  margin-top: toRem(-30);
}
</style>
