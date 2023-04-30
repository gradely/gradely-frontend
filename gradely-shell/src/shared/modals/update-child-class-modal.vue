<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Update Class</div>
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
          Your class and curriculum, determines the topics used to provide
          learning resources. Use with caution.
        </div>

        <div class="form-group compact-row w-100">
          <label for="className" class="label-compact label-sm">Class </label>
          <select required v-model="class_id" class="form-control">
            <option disabled value="">Select class</option>

            <option
              :value="level.id"
              v-for="(level, index) in getClassList"
              :key="index"
            >
              {{ level.description }}
            </option>
          </select>
        </div>

        <div class="form-group compact-row w-100">
          <label for="password" class="label-compact label-sm">Password </label>
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
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end">
        <button
          class="btn btn-accent modal-btn"
          ref="resetBtn"
          :disabled="disabled"
          @click="updateChildLevel"
        >
          SAVE CHANGES
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
    ...mapGetters({ getClassList: "general/getClassList" }),

    disabled() {
      return !this.class_id || !this.password;
    },

    getChildCode() {
      return this.child ? this.child?.code : null;
    },

    getClassName() {
      return (
        this.getClassList.find((level) => {
          return Number(level.id) === Number(this.class_id);
        })?.description || ""
      );
    },

    getUpdateForm() {
      return {
        child_id: this.child.id,
        global_class_id: this.class_id,
        password: this.password,
      };
    },
  },

  watch: {
    child: {
      handler(child) {
        this.class_id = child.class.global_class_id || "";
      },
      immediate: true,
    },
  },

  data() {
    return {
      form: {
        password: "",
        student_code: this.child?.code,
      },

      className: "",
      class_id: "",

      show_password: false,
      password: "",
    };
  },

  mounted() {
    this.$refs.passwordInput.focus();
    this.loadGlobalClassList();
  },

  methods: {
    ...mapActions({
      getGlobalClassList: "general/getGlobalClassList",
      updateChildClass: "general/updateChildClass",
    }),

    togglePasswordType() {
      this.show_password = !this.show_password;
    },

    async loadGlobalClassList() {
      if (this.getClassList?.length) return;
      await this.getGlobalClassList();
    },

    updateChildLevel() {
      this.handleClick("resetBtn", "Updating..");
      this.updateChildClass(this.getUpdateForm)
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
</style>
