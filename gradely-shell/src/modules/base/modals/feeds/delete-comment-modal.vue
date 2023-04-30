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
          Delete Comment!
        </div>

        <div class="info-text color-ash text-center mgb-5">
          Are you sure you want to delete this comment? Click delete to confirm.
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
          @click="deleteComment"
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
  name: "deleteCommentModal",

  components: {
    modalCover,
  },

  props: {
    post_id: {
      type: Number,
    },
    comment_id: {
      type: Number,
    },
  },

  methods: {
    ...mapActions({ deleteFeedComment: "dbFeeds/deleteFeedComment" }),

    deleteComment() {
      this.handleClick("deleteBtn", "Deleting...");

      let payload = {
        feed_id: this.post_id,
        comment_id: this.comment_id,
      };

      this.deleteFeedComment(payload)
        .then((response) => {
          // console.log(response);
          this.handleClick("deleteBtn", "Delete", false);

          if (response.code === 200) {
            this.pushAlert("Comment deleted successfully!", "success");
            this.$bus.$emit("extractDeletedComment", payload);
            this.$bus.$emit("decreaseCommentCount", this.post_id);
            this.$emit("closeTriggered");
          } else {
            this.pushAlert("Comment was not deleted", "warning");
          }
        })
        .catch(() => {
          this.handleClick("deleteBtn", "Delete", false);
          this.pushAlert("An error occured while deleting comment", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
