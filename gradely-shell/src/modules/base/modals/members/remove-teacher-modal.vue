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
          Remove Teacher!
        </div>

        <div class="info-text color-ash text-center mgb-5">
          Are you sure you want to remove
          <span class="font-weight-700 text-capitalize">
            {{ getTeacherName }}</span
          >
          from current class? Click remove to confirm.
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
          ref="removeTeacherBtn"
          @click="removeTeacher"
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
  name: "removeTeacherModal",

  components: {
    modalCover,
  },

  props: {
    teacher: {
      type: Object,
      default: () => {
        return {
          id: 7,
          full_name: "Olamide Adigun",
        };
      },
    },

    class_id: Number,
  },

  computed: {
    getTeacherName() {
      return this.teacher?.full_name
        ? this.teacher.full_name
        : `${this.teacher.firstname} ${this.teacher.lastname}`;
    },
  },

  methods: {
    ...mapActions({
      removeTeacherFromClass: "dbMembers/removeTeacherFromClass",
    }),

    removeTeacher() {
      this.handleClick("removeTeacherBtn", "Removing...");

      let payload = {
        teacher_id: this.teacher.id,
        class_id: this.class_id ? this.class_id : Number(this.$route.params.id),
      };

      this.removeTeacherFromClass(payload)
        .then((response) => {
          this.handleClick("removeTeacherBtn", "Remove", false);

          if (response.code === 200) {
            this.pushAlert(
              this.getTeacherName + " successfully removed from class",
              "success"
            );

            this.class_id
              ? this.$bus.$emit("reloadState")
              : this.$emit("reloadTeachersInClass");
          } else this.pushAlert("Teacher removal failed", "warning");
        })
        .catch(() => {
          this.handleClick("removeTeacherBtn", "Remove", false);
          this.pushAlert("An error occured while removing teacher", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
