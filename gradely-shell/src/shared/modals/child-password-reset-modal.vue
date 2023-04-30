<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Reset Password</div>
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

        <div class="form-group compact-row w-100 mgt-35">
          <label for="new-password" class="label-compact label-sm">New Password</label>
          <input
            :type="show_password ? 'text' : 'password'"
            id="new-password"
            class="form-control"
            v-model="form.password"
            placeholder="Enter a new password for the child"
            required
            :minlength="6"
            ref="passwordInput"
          />

          <!-- TOGGLE ICON  -->
          <div
            v-if="false"
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

        <div class="form-group compact-row w-100">
          <label for="confirm-password" class="label-compact label-sm">Confirm New Password</label>
          <input
            :type="show_password ? 'text' : 'password'"
            id="confirm-password"
            class="form-control"
            v-model="confirm_password"
            placeholder="Enter the new password again"
            required
            :minlength="6"
          />

          <!-- TOGGLE ICON  -->
          <div
            v-if="false"
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
          class="btn btn-accent modal-btn"
          ref="resetBtn"
          @click="resetPassword"
        >Change Password</button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";
import childInfoModalCard from "@/modules/dashboard/modals/child-info-modal-card";

export default {
  name: "child",

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
    getChildCode() {
      return this.child ? this.child?.code : null;
    },

    isDisabled() {
      return this.form.password &&
        this.form.password.length > 6 &&
        this.form.student_code
        ? false
        : true;
    },
  },

  data() {
    return {
      form: {
        password: "",
        code: this.child?.code,
      },

      confirm_password: "",

      show_password: false,
    };
  },

  mounted() {
    this.$refs.passwordInput.focus();
  },

  methods: {
    ...mapActions({ updateChildPassword: "general/updateChildPassword" }),

    validateFields() {
      if (!this.form.password) {
        this.pushAlert("Fill in new password", "warning");
        return false;
      }
      if (this.form.password < 6) {
        this.pushAlert("Password should be at least 6 characters", "warning");
        return false;
      }
      if (this.form.password !== this.confirm_password) {
        this.pushAlert("Passwords don't match", "warning");
        return false;
      }
      return true;
    },

    togglePasswordType() {
      this.show_password = !this.show_password;
    },

    resetPassword() {
      if (!this.validateFields()) return;

      this.handleClick("resetBtn", "Resetting...");

      this.updateChildPassword(this.form)
        .then((response) => {
          this.handleClick("resetBtn", "Change Password", false);

          if (response.code === 200) {
            this.pushAlert("Password reset was successful", "success");
            setTimeout(() => this.$emit("closeTriggered"), 2000);
          } else this.pushAlert("Unable to complete password reset", "warning");
        })
        .catch(() => {
          this.handleClick("resetBtn", "Change Password", false);
          this.pushAlert("Password reset failed", "error");
        });
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
