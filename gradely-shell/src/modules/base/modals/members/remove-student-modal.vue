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
            v-lazy="mxStaticImg('ErrorIcon.svg')"
            alt=""
            class="w-100 h-100"
          />
        </div>

        <!-- TITLE  -->
        <div class="title-text brand-tonic font-weight-700 mgt-20 mgb-15">
          Remove Student!
        </div>

        <div class="info-text color-ash text-center mgb-5">
          Are you sure you want to remove
          <span class="font-weight-600 text-capitalize">{{
            student.full_name
          }}</span>
          from your student list ? Click remove to confirm.
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
          ref="removeStudentBtn"
          @click="removeClassStudent"
        >
          Remove
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import { mapActions } from "vuex";

export default {
  name: "removeStudentFromClassModal",

  components: {
    modalCover,
  },

  props: {
    student: Object,
    default: () => ({
      id: 1,
      full_name: "Richy Jones",
    }),
  },

  methods: {
    ...mapActions({
      removeStudentFromClass: "dbMembers/removeStudentFromClass",
    }),

    removeClassStudent() {
      this.handleClick("removeStudentBtn", "Removing...");

      let payload = {
        account: this.getAuthType,
        student_id: Number(this.student.id),
        class_id: this.$route.params.id,
      };

      this.removeStudentFromClass(payload)
        .then((response) => {
          this.handleClick("removeStudentBtn", "Remove", false);

          if (response.code === 200) {
            this.pushAlert(
              `${this.student.full_name} removed from class!`,
              "success"
            );
            this.$bus.$emit("reloadStudentInClass");
          } else
            this.pushAlert("Failed to remove student, try again!", "warning");
        })
        .catch(() => {
          this.handleClick("removeStudentBtn", "Remove", false);
          this.pushAlert("An error occured while removing student", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
