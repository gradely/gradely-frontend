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
          Report App
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="feedback-modal">
          <!-- TITLE TEXT  -->
          <div class="title-text">What is wrong with this app?</div>

          <!-- ITEM ONE  -->
          <label for="inaccurate" class="check-item checkbox">
            <input
              type="checkbox"
              id="inaccurate"
              v-model="feedback.inaccurate"
            />
            <div class="text">Inaccurate</div>
          </label>

          <!-- ITEM TWO  -->
          <label for="difficult" class="check-item checkbox">
            <input
              type="checkbox"
              id="difficult"
              v-model="feedback.difficult_to_use"
            />
            <div class="text">Difficult to use</div>
          </label>

          <!-- ITEM THREE  -->
          <label for="failed_my_needs" class="check-item checkbox">
            <input
              type="checkbox"
              id="failed_my_needs"
              v-model="feedback.not_needed"
            />
            <div class="text">Does not meet my need</div>
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
              class="form-control"
              v-model="comment"
              placeholder="Your Message here"
            ></textarea>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-center">
        <button
          class="btn btn-accent"
          ref="reportBtn"
          :disabled="isDisabled"
          @click="reportApp"
        >
          Report App
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "reportAppModal",

  components: {
    modalCover,
  },

  props: {
    app_id: Number,
    app_name: String,
    app_slug: String,
  },

  computed: {
    isDisabled() {
      let selected = Object.values(this.feedback).some((item) => item);
      return selected || this.comment ? false : true;
    },

    getPayload() {
      return {
        app_id: this.app_id,
        app_name: this.app_name,
        app_slug: this.app_slug,
        feedback: this.feedback,
        comment: this.comment,
      };
    },
  },

  data: () => ({
    feedback: {
      inaccurate: false,
      difficult_to_use: false,
      not_needed: false,
    },

    comment: "",
  }),

  methods: {
    ...mapActions({
      reportAppInStore: "dbApp/reportAppInStore",
    }),

    reportApp() {
      this.handleClick("reportBtn", "Reporting...");

      this.reportAppInStore(this.getPayload)
        .then((response) => {
          if (response.code === 200)
            this.pushAlert("Thank you for your feedback!", "success");
          // NON 200 RESPONSE
          else {
            this.pushAlert(
              "An error occured while sending your feedback, please retry!",
              "warning"
            );
            this.handleClick("reportBtn", "Report", false);
          }
        })
        .catch(() => {
          this.handleClick("reportBtn", "Report", false);
          this.pushAlert("Error reporting app", "error");
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
