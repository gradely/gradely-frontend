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
          Remove Teacher!
        </div>

        <div class="info-text color-ash text-center mgb-5">
          Are you sure you want to remove
          <span class="font-weight-600 text-capitalize">
            {{ teacher.full_name }}</span
          >
          from your school ? Click remove to confirm.
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
          ref="removeBtn"
          @click="removeTeacher"
        >
          Remove
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "removeTeacherModal",

  components: {
    modalCover,
  },

  props: {
    teacher: {
      type: Object,
      default: () => ({
        id: 1,
        full_name: "Richy Jones",
      }),
    },
  },

  methods: {
    ...mapActions({
      removeSchoolTeacher: "dbTeacher/removeTeacherFromSchool",
    }),

    removeTeacher() {
      this.handleClick("removeBtn", "Removing...");

      this.removeSchoolTeacher(this.teacher.id)
        .then((response) => {
          if (response.code === 200)
            setTimeout(
              () =>
                this.processState(
                  `${this.teacher.full_name} removed successfully!`,
                  "success"
                ),
              1000
            );
          // ERROR STATE
          else
            this.processState(
              "An error occured while deleting teacher, check if teacher still exist!",
              "warning"
            );
        })
        .catch(() =>
          this.processState("An error occured while deleting teacher!", "error")
        );
    },

    // HANDLES BUTTON DISPLAY TEXT AND ALERT
    processState(message, type) {
      this.handleClick("removeBtn", "Remove", false);
      this.pushAlert(message, type); // HANDLE ALERT

      if (type === "success")
        setTimeout(() => {
          this.$bus.$emit("reloadState");
          this.$emit("closeTriggered");
        }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped></style>
