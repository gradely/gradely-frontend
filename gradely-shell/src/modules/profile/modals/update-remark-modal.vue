<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-capitalize">Update Remark</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <child-info-modal-card
          :child="{
            image: remark.creator.image,
            fullname: remark.creator.full_name,
            class_name: 'English language Teacher',
          }"
        />

        <!-- FORM AREA  -->
        <div class="form-area">
          <textarea
            cols="30"
            rows="5"
            v-model="remark_message"
            class="form-control"
            placeholder="Your remark here..."
          ></textarea>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-center mgb-10">
        <button
          class="btn modal-btn transparent-bg no-shadow color-text mgr-10"
        >
          Cancel
        </button>

        <button
          class="btn modal-btn btn-accent mgl-10"
          ref="update"
          @click="updateRemark"
        >
          Update
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";
import childInfoModalCard from "@/modules/dashboard/modals/child-info-modal-card";

export default {
  name: "updateRemarkModal",

  components: {
    modalCover,
    childInfoModalCard,
  },

  props: {
    remark: {
      type: Object,
    },

    subject: {
      type: Object,
    },
  },

  computed: {
    updatePayload() {
      return {
        remark: this.remark_message,
        subject_id: this.subject.id,
        remark_id: this.remark.id,
      };
    },

    updatedRemark() {
      return {
        ...this.remark,
        remark: this.remark_message,
      };
    },
  },

  data() {
    return {
      remark_message: this.remark.remark,
    };
  },

  methods: {
    ...mapActions({ updateStudentRemark: "dbProfile/updateStudentRemark" }),

    updateRemark() {
      this.handleClick("update", "Updating remark");

      this.updateStudentRemark(this.updatePayload)
        .then((response) => {
          this.handleClick("update", "Update", false);
          if (response.code === 200) {
            this.pushAlert("Remark updated", "success");
            this.$bus.$emit("updated-remark", this.updatedRemark);

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1000);
          } else this.pushAlert("Failed to update remark", "warning");
        })
        .catch(() => {
          this.pushAlert("Error updating remark", "error");
          this.handleClick("update", "Update", false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-footer {
  .btn {
    padding: toRem(12.5) toRem(32);
    font-size: toRem(10.5);
  }
}
</style>
