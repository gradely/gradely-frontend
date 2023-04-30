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
          Delete Approved Exam!
        </div>

        <div class="info-text color-ash text-center mgb-5">
          Are you sure you want to delete this exam?
          <br />
          This action cannot be undone! Click delete to confirm.
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
          @click="removeAssessment"
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
  name: "deleteWeeklyExamModal",

  components: {
    modalCover,
  },

  props: {
    exam_id: {
      type: Number,
    },
  },

  computed: {
    getDeletePayload() {
      return {
        assessment_id: this.exam_id,
        assessment_type: "published",
      };
    },
  },

  methods: {
    ...mapActions({ deleteAssessment: "dbAssessments/deleteAssessment" }),

    removeAssessment() {
      this.handleClick("deleteBtn", "Deleting...");
      this.deleteAssessment(this.getDeletePayload)

        .then((response) => {
          this.handleClick("deleteBtn", "Delete", false);

          if (response.code === 200) {
            this.pushAlert("Exam successfully deleted", "success");
            this.$bus.$emit("remount");

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1500);
          } else {
            this.pushAlert("Exam could not be deleted", "warning");
          }
        })
        .catch(() => {
          this.handleClick("deleteBtn", "Delete", false);
          this.pushAlert("Error deleting exam", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
