<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-mini' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Update Class Arm</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-0">
        <!-- CLASS LEVEL  -->
        <div class="form-group compact-row w-100">
          <label for="schoolPhone" class="label-compact label-sm">
            Class Level
          </label>
          <input
            type="text"
            class="form-control"
            id="classLevel"
            :value="class_arm_name"
            disabled
          />
        </div>

        <!-- CLASS BRANCH  -->
        <div class="form-group compact-row w-100">
          <label for="schoolPhone" class="label-compact label-sm">
            Class Arm
          </label>
          <input
            type="text"
            class="form-control"
            id="classLevel"
            required
            ref="armInput"
            placeholder="Give the class a name"
            v-model="class_name"
          />
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end mgb-10 pdt-0">
        <button
          class="btn transparent-bg no-shadow color-text mgr-5"
          @click="$emit('closeTriggered')"
        >
          Cancel
        </button>

        <button
          class="btn modal-btn btn-accent mgl-5"
          @click="updateClassName"
          ref="classUpdate"
        >
          Save Changes
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import { mapActions } from "vuex";

export default {
  name: "updateClassArmModal",

  props: {
    class_level: String,
    class_arm_name: String,
    class_id: {
      type: String,
      default: "12",
    },
  },

  components: {
    modalCover,
  },

  computed: {
    classUpdateInfo() {
      return {
        id: Number(this.class_id),
        class_name: this.class_name,
      };
    },
  },

  data() {
    return {
      class_name: "",
    };
  },

  mounted() {
    this.setupArmInput();
  },

  methods: {
    ...mapActions({ updateSchoolClassName: "dbHome/updateSchoolClassName" }),

    updateClassName() {
      this.handleClick("classUpdate", "Saving");

      this.updateSchoolClassName(this.classUpdateInfo)
        .then((response) => {
          console.log(response);

          if (response.code === 200) {
            this.pushAlert("Class arm updated successfully!", "success");
            this.$bus.$emit("reloadClasses");
          }
          // NON 200 RESPONSE
          else {
            this.pushAlert("Class arm could not be updated", "warning");
            this.handleClick("classUpdate", "Save Changes", false);
          }
        })
        .catch(() => {
          this.handleClick("classUpdate", "Save Changes", false);
          this.pushAlert("Error updating class name", "error");
        });
    },

    setupArmInput() {
      this.$nextTick(() => (this.class_name = this.class_level));
      this.$refs.armInput.value = this.class_level;
      this.$refs.armInput.focus();
    },
  },
};
</script>

<style lang="scss" scoped></style>
