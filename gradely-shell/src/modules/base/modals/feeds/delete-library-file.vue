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
          Remove library File
        </div>

        <div class="info-text color-ash text-center mgb-5">
          Are you sure you want to remove this file from your library? Click
          remove to confirm.
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
          @click="removeFile"
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
  name: "removeFileModal",

  components: {
    modalCover,
  },

  props: {
    token: {
      type: String,
    },
  },

  methods: {
    ...mapActions({ deleteLibraryFile: "dbFeeds/deleteLibraryFile" }),

    removeFile() {
      this.handleClick("removeBtn", "Removing...");

      this.deleteLibraryFile(this.token)
        .then((response) => {
          // console.log(response);
          this.handleClick("removeBtn", "Remove", false);

          if (response.code === 200) {
            this.pushAlert("File removed successfully!", "success");
            this.$bus.$emit("extractDeletedFile", this.token);
            this.$emit("closeTriggered");
          } else {
            this.pushAlert("File was not removed", "warning");
          }
        })
        .catch(() => {
          this.handleClick("removeBtn", "Remove", false);
          this.pushAlert("An error occured while removing file", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
