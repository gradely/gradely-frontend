<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
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
        <div class="title-text brand-tonic font-weight-700 mgt-20 mgb-15">
          Delete Assessment!
        </div>

        <div class="info-text color-ash text-center mgb-5">
          Are you sure you want to delete this assessment? <br />
          Enter <span class="font-weight-600">delete</span> below to confirm.
        </div>

        <!-- PASSWORD AREA -->
        <div class="password-area mgt-10 w-100">
          <input
            type="text"
            class="form-control w-100 gfont-13 text-center"
            ref="deleteInput"
            v-model="confirmation"
            placeholder="delete"
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
          ref="delete"
          @click="removeAssessment"
          :disabled="confirmation !== 'delete'"
        >
          Delete
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import { mapActions } from "vuex";

export default {
  name: "deleteAssessmentModal",

  components: {
    modalCover,
  },

  props: {
    assessment_id: [Number, String],
    assessment_type: String,
  },

  computed: {
    getDeletePayload() {
      return {
        assessment_id: this.assessment_id,
        assessment_type: this.assessment_type,
      };
    },
  },

  data() {
    return {
      confirmation: "",
    };
  },

  mounted() {
    this.$refs.deleteInput.focus();
  },

  methods: {
    ...mapActions({ deleteAssessment: "dbAssessments/deleteAssessment" }),

    removeAssessment() {
      this.handleClick("delete", "Deleting...");
      this.deleteAssessment(this.getDeletePayload)

        .then((response) => {
          this.handleClick("delete", "Delete", false);

          if (response.code === 200) {
            this.pushAlert("Assessment successfully deleted", "success");
            this.$bus.$emit("reloadAssessment", this.assessment_type);
            this.$bus.$emit("postDeleted", this.assessment_id);

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1500);
          } else {
            this.pushAlert("Assessement could not be deleted", "warning");
          }
        })
        .catch(() => {
          this.handleClick("delete", "Delete", false);
          this.pushAlert("Error deleting assessment", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
