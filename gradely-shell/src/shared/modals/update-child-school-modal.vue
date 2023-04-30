<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Update School Information</div>
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

        <div class="info color-ash">
          Do you have a new class code for your child. Enter the class code
          below to change to another class.
        </div>

        <div class="form-group compact-row w-100 mgb-25">
          <label for="className" class="label-compact label-sm">Class Code</label>
          <input type="text" class="form-control" @keyup.enter="verifyCode" v-model="class_code" />
          <!-- TOGGLE ICON  -->
          <div
            class="addon index-9 pointer smooth-transition brand-accent"
            @click="verifyCode"
            title="Verify class code"
          >
            <span v-if="!verifying && class_code" class="gfont-11 verify-button">VERIFY</span>
            <div v-if="verifying" class="icon icon-dotted-spinner animate gfont-13"></div>
          </div>
        </div>

        <div class="form-group compact-row w-100 mgb-25">
          <label for="password" class="label-compact label-sm">Password</label>
          <input
            :type="show_password ? 'text' : 'password'"
            class="form-control"
            placeholder="Enter your password to confirm"
            ref="passwordInput"
            v-model="password"
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

        <div class="class-details-block pd-10 border rounded-10 mgb-25" v-if="class_details">
          <div
            class="brand-navy gfont-13 font-weight-600 mgb-8 text-uppercase"
          >{{class_details.abbreviation}} ({{class_details.class_code}})</div>
          <div class="gfont-12 color-ash">@{{class_details.school_name}}</div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end">
        <button class="btn btn-accent modal-btn" ref="resetBtn" @click="updateSchool">SAVE CHANGES</button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";
import childInfoModalCard from "@/modules/dashboard/modals/child-info-modal-card";

export default {
  name: "updateChildSchoolModal",

  components: {
    modalCover,
    childInfoModalCard,
  },

  props: {
    child: {
      type: Object,
      default: () => {
        return {
          image: "",
          code: "GRD/2014/0960",
          full_name: "Promote Me",
        };
      },
    },
  },

  computed: {
    disabled() {
      return !this.password || !this.getClassCode;
    },

    getUpdateForm() {
      return {
        child_id: this.child.id,
        class_code: this.getClassCode,
        password: this.password,
      };
    },

    getClassCode() {
      return this.class_details?.class_code;
    },
  },

  data() {
    return {
      form: {
        password: "",
        student_code: this.child?.code,
      },

      className: "",
      class_code: "",
      class_details: null,

      show_password: false,
      password: "",
      verifying: false,
    };
  },

  mounted() {
    this.$refs.passwordInput.focus();
  },

  methods: {
    ...mapActions({
      updateChildSchool: "general/updateChildSchool",
      verifyClassCode: "general/verifyClassCode",
    }),

    verifyCode() {
      if (!this.class_code) return;

      this.verifying = true;
      this.verifyClassCode(this.class_code)
        .then((response) => {
          this.verifying = false;
          if (response.code === 200) this.class_details = response.data;
          else {
            this.class_details = null;
            this.pushAlert("Invalid class code", "warning");
          }
        })
        .catch((err) => {
          this.verifying = false;
          console.log("error validating class code", err);
        });
    },

    validateFields() {
      if (!this.getClassCode) {
        this.pushAlert("Please verify and use a valid class code", "warning");
        return false;
      }
      if (!this.password) {
        this.pushAlert("Please input your password", "warning");
        return false;
      }
      return true;
    },

    updateSchool() {
      if (!this.validateFields()) return;

      this.handleClick("resetBtn", "Updating..");
      this.updateChildSchool(this.getUpdateForm)
        .then((response) => {
          this.handleClick("resetBtn", "Save Changes", false);
          if (response.code === 200) {
            this.pushAlert("Child class updated", "success");

            setTimeout(() => {
              this.$bus.$emit("updateChildrenList");
            }, 1200);

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1800);
          } else if (response.code === 400) {
            this.pushAlert(response.message, "warning");
          } else {
            this.pushAlert("Failed to update child class", "warning");
          }
        })
        .catch((err) => {
          this.handleClick("resetBtn", "Save Changes", false);
          this.pushAlert("Failed to update child class", "error");
          console.log("error updating child class", err);
        });
    },

    togglePasswordType() {
      this.show_password = !this.show_password;
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

.verify-button {
  transition: color ease-in-out 0.2s;
  &:hover {
    color: $brand-inverse;
  }
}
</style>
