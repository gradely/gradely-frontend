<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body central-placement">
        <div class="top-row">
          <img
            v-lazy="mxStaticImg('DeleteCan.svg')"
            alt=""
            class="w-100 h-100"
          />
        </div>

        <!-- TITLE  -->
        <div class="title-text brand-tonic font-weight-700 mgt-20 mgb-20">
          Delete Class Branch!
        </div>

        <div class="info-text color-ash text-center mgb-10">
          Are you sure you want to delete
          <span class="font-weight-700">{{ class_arm_name }}</span
          >? <br />
          Please type your account password in the field below.
        </div>

        <!-- PASSWORD AREA -->
        <div class="password-area mgt-10 w-100">
          <input
            type="password"
            class="form-control w-100 gfont-13"
            ref="passwordInput"
            v-model="account_password"
            placeholder="Enter account password"
          />
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-center mgb-10">
        <button
          class="btn modal-btn transparent-bg no-shadow color-text mgr-10"
          @click="$emit('closeTriggered')"
        >
          Cancel
        </button>

        <button
          class="btn modal-btn btn-accent mgl-10"
          ref="deleteBtn"
          :disabled="isDisabled"
          @click="deleteClassArm"
        >
          Delete
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "deleteClassArmModal",

  components: {
    modalCover,
  },

  props: {
    class_id: Number,
    class_arm_name: String,
  },

  computed: {
    isDisabled() {
      return this.account_password ? false : true;
    },
  },

  data: () => ({
    account_password: "",
  }),

  mounted() {
    this.setupPasswordInput();
  },

  methods: {
    ...mapActions({
      deleteSchoolClass: "dbHome/deleteSchoolClass",
    }),

    deleteClassArm() {
      this.handleClick("deleteBtn", "Deleting...");

      let payload = {
        id: this.class_id,
        password: this.account_password,
      };

      this.deleteSchoolClass(payload)
        .then((response) => {
          if (response.code === 200) {
            this.pushAlert("Class arm deleted successfully!", "success");
            this.$bus.$emit("reloadClasses");
          }
          // NON 200 RESPONSE
          else {
            this.pushAlert(
              "Please check account password and retry!",
              "warning"
            );
            this.handleClick("deleteBtn", "Delete", false);
          }
        })
        .catch(() => {
          this.handleClick("deleteBtn", "Delete", false);
          this.pushAlert("Error deleting class name", "error");
        });
    },

    setupPasswordInput() {
      this.$refs.passwordInput.focus();
    },
  },
};
</script>

<style lang="scss" scoped></style>
