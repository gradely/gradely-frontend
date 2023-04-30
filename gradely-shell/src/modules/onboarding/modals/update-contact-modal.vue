<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-center brand-navy">
          Update Contact
        </div>

        <div class="modal-cover-meta text-center color-ash mgb-12">
          No contact information available! Please enter either an email or
          phone number to recieve a verification code
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-0">
        <div class="form-row">
          <!-- EMAIL ADDRESS -->
          <div class="form-group compact-row w-100">
            <label for="emailAddress" class="label-compact label-sm"
              >Email Address</label
            >
            <input
              type="email"
              id="emailAddress"
              class="form-control"
              placeholder="Enter your email address"
              v-model="form.email"
            />
          </div>

          <!-- PHONE NUMBER -->
          <div class="form-group compact-row w-100">
            <label for="phoneNumber" class="label-compact label-sm"
              >Phone Number</label
            >
            <input
              type="number"
              id="phoneNumber"
              class="form-control"
              placeholder="Enter your phone number"
              v-model="form.phone"
            />
          </div>
        </div>

        <!-- BUTTON ROW -->
        <div class="bottom-row w-100 d-flex">
          <button
            class="btn btn-accent btn-block mgb-40 mx-auto"
            :disabled="isDisabled"
            @click="updateUserContact"
            ref="updateBtn"
          >
            Update Contact
          </button>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer"> </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "updateContactModal",

  components: {
    modalCover,
  },

  props: {
    code: {
      type: String,
    },
  },

  computed: {
    isDisabled() {
      return this.form.email || this.form.phone ? false : true;
    },
  },

  data() {
    return {
      form: {
        code: this.code,
        email: "",
        phone: "",
      },
    };
  },

  mounted() {
    this.form.email = this.getAuthUser?.email ?? "";
    this.form.phone = this.getAuthUser?.phone ?? "";
  },

  methods: {
    ...mapActions({
      updateContactWithoutCode: "onboarding/updateContactWithoutCode",
      resendVerificationCode: "onboarding/resendVerificationCode",
    }),

    updateUserContact() {
      this.handleClick("updateBtn", "Updating...");

      this.updateContactWithoutCode(this.form)
        .then((response) => {
          if (response.code === 200) {
            this.pushAlert("Contact updated successfully", "success");
            this.resendCode();
            setTimeout(() => this.$emit("closeTriggered"), 1500);
          } else {
            this.handleClick("updateBtn", "Update Contact", false);
            this.pushAlert(
              response.data?.message ?? "An error occured",
              "error"
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          this.handleClick("updateBtn", "Update Contact", false);
          this.pushAlert("An error occured while updating contact", "error");
        });
    },

    resendCode() {
      let payload = {};

      this.form.email
        ? (payload.email = this.form.email)
        : (payload.phone = this.form.phone);

      this.resendVerificationCode(payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-title {
  @include font-height(17, 24);
  margin: toRem(12) auto toRem(16);

  @include breakpoint-down(sm) {
    @include font-height(17.25, 22);
    margin: toRem(10) auto toRem(14);
  }
}

.modal-cover-meta {
  @include font-height(12.65, 21);
}

.modal-cover-body {
  margin-top: toRem(-10);

  .bottom-row {
    .btn {
      width: 80%;
      padding: toRem(15.75);
    }
  }
}
</style>
