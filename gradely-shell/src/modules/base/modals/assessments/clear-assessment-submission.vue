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
          Clear Submission!
        </div>

        <div class="info-text color-ash text-center mgb-5">
          Are you sure you want to clear this assessment submission?
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
          @click="clearAssessment"
        >
          Clear
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import { mapActions } from "vuex";

export default {
  name: "clearAssessmentSubmission",

  components: {
    modalCover,
  },

  props: {
    student_id: [Number, String],
  },

  computed: {
    getClearPayload() {
      return {
        student_id: this.student_id,
        class_id: this.$route.params.id,
        assessment_id: this.$route.params.assessment_id,
      };
    },
  },

  methods: {
    ...mapActions({
      clearStudentAssessment: "dbAssessments/clearStudentAssessment",
    }),

    clearAssessment() {
      this.handleClick("delete", "Clearing");

      this.clearStudentAssessment(this.getClearPayload)
        .then((response) => {
          this.handleClick("delete", "clear", false);
          if (response.code === 200) {
            this.pushAlert("Assessment submission cleared", "success");
            setTimeout(() => {
              this.$emit("closeTriggered");
              this.$emit("cleared");
            }, 1300);
          } else {
            this.pushAlert("Failed to clear submission", "warning");
          }
        })
        .catch(() => {
          this.handleClick("delete", "clear", false);
          this.pushAlert("Error clearing submission", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
