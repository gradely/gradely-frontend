<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-capitalize">
          Report Post
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="feedback-modal">
          <!-- TITLE TEXT  -->
          <div class="title-text">What is wrong with the post?</div>

          <!-- ITEM TWO  -->
          <label for="spam_post" class="check-item checkbox">
            <input
              type="radio"
              value="spam"
              v-model="form.title"
              id="spam_post"
            />
            <div class="text mgl-6">Spam Post</div>
          </label>

          <!-- ITEM THREE  -->
          <label for="fraudulent" class="check-item checkbox">
            <input
              type="radio"
              value="fraudulent"
              v-model="form.title"
              id="fraudulent"
            />
            <div class="text mgl-6">Fraudulent</div>
          </label>

          <!-- ITEM FOUR  -->
          <label for="others" class="check-item checkbox">
            <input
              type="radio"
              value="others"
              v-model="form.title"
              id="others"
            />
            <div class="text mgl-6">Others (Please specify)</div>
          </label>

          <!-- FORM AREA  -->
          <div class="form-area">
            <div class="form-title">
              <span class="font-weight-600"> Any other details?</span>
              (Optional)
            </div>

            <textarea
              cols="30"
              rows="5"
              v-model="form.description"
              class="form-control"
              placeholder="Your Message here"
            ></textarea>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-center mgb-10">
        <button
          class="btn btn-accent"
          ref="reportBtn"
          @click="reportPost"
          :disabled="isDisabled"
        >
          Report Feed
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "reportFeedPostModal",

  components: {
    modalCover,
  },

  props: {
    post_id: {
      type: Number,
    },
  },

  computed: {
    isDisabled() {
      return this.form.title ? false : true;
    },
  },

  data() {
    return {
      form: {
        reference_id: this.post_id,
        title: "",
        description: "",
      },
    };
  },

  methods: {
    ...mapActions({ reportFeedPost: "dbFeeds/reportFeedPost" }),

    reportPost() {
      this.handleClick("reportBtn", "Reporting...");

      this.reportFeedPost(this.form)
        .then((response) => {
          this.handleClick("reportBtn", "Report", false);

          if (response.code === 200) {
            this.pushAlert("Report sent successfully!", "success");
            this.$emit("closeTriggered");
          } else {
            this.pushAlert("Post was not reported", "warning");
          }
        })
        .catch(() => {
          this.handleClick("reportBtn", "Report", false);
          this.pushAlert("An error occured while reporting post", "error");
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
