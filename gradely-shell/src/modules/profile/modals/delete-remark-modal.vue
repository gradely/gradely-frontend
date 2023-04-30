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
          Delete Remark!
        </div>

        <div class="info-text color-ash text-center mgb-5">
          Are you sure you want to delete this remark from your student profile?
          Click delete to confirm.
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
          @click="removeRemark"
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
  name: "deleteRemarkModal",

  components: {
    modalCover,
  },

  props: {
    remark: {
      type: Object,
    },
  },

  methods: {
    ...mapActions({ deleteRemark: "dbProfile/deleteRemark" }),

    removeRemark() {
      this.handleClick("delete", "deleting remark");

      this.deleteRemark(this.remark.id)
        .then((response) => {
          this.handleClick("delete", "Delete", false);

          if (response.code === 200) {
            this.pushAlert("Remark deleted", "success");

            this.$bus.$emit("remark-deleted", this.remark);

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1000);
          } else {
            this.pushAlert("Failed to delete remark", "warning");
          }
        })
        .catch(() => {
          this.handleClick("delete", "Delete", false);
          this.pushAlert("Error deleting remark", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
