<template>
  <modal-cover
    @closeModal="resetRoute"
    show_close_btn
    :modal_style="{ size: 'modal-mini' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-capitalize">
          Session Feedback
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="feedback-modal">
          <!-- TITLE TEXT  -->
          <div class="title-text">
            Your feedback helps us improve your tutoring experience. Feel free
            to tell us anything you want about the session.
          </div>

          <!-- STAR RATING -->
          <div class="star-rating-row">
            <div class="text font-weight-700 color-ash mgb-10">
              How would you rate today’s class?
            </div>

            <div class="d-flex justify-content-start align-items-center">
              <div
                class="icon icon-star-full"
                :title="star.title"
                v-for="(star, index) in stars"
                :key="index"
                :class="{ active: star.active }"
                @click="handleRating(star.id)"
              ></div>
            </div>
          </div>

          <!-- FORM AREA  -->
          <div class="form-area">
            <div class="form-title">
              <span class="font-weight-600">Any other details?</span>
              (Optional)
            </div>

            <textarea
              cols="30"
              rows="5"
              class="form-control"
              placeholder="Any other thing you’d like to draw our attention to"
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
          ref="feedbackBtn"
          :disabled="isDisabled"
          @click="submitFeedback"
        >
          Submit Feedback
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "endClassFeedbackModal",

  components: {
    modalCover,
  },

  props: {
    session_id: Number,
  },

  computed: {
    isDisabled() {
      return this.form.rate ? false : true;
    },
  },

  mounted() {
    localStorage.removeItem("redirect_id");
  },

  data() {
    return {
      stars: [
        { id: 1, title: "Very Poor", active: false },
        { id: 2, title: "Poor", active: false },
        { id: 3, title: "Good", active: false },
        { id: 4, title: "Very Good", active: false },
        { id: 5, title: "Excellent", active: false },
      ],

      form: {
        rate: null,
        message: "",
        reference_id: Number(this.$route.query.session),
      },
    };
  },

  methods: {
    ...mapActions({ rateExperience: "general/rateExperience" }),

    handleRating(id) {
      this.stars.map((star) => (star.active = false));
      this.form.rate = id;

      this.stars.map((star) => {
        if (star.id <= id) star.active = true;
      });
    },

    // SUBMIT FEEDBACK DATA
    submitFeedback() {
      this.handleClick("feedbackBtn", "Submitting...");
      console.log(this.form);

      this.rateExperience(this.form)
        .then((response) => {
          this.handleClick("feedbackBtn", "Submit Feedback", false);
          console.log(response);

          if (response.code === 200) {
            this.pushAlert("Thank you for your feedback!", "success");
            this.$emit("closeTriggered");
          } else this.pushAlert("Submitting feedback failed!", "warning");
        })
        .catch(() => {
          this.handleClick("feedbackBtn", "Submit Feedback", false);
          this.pushAlert("Submitting feedback failed!", "error");
        });
    },

    resetRoute() {
      this.$router.replace({
        name: this.$route.name,
        params: { id: this.$route.params.id },
      });

      this.$emit("closeTriggered");
    },
  },
};
</script>

<style lang="scss" scoped>
.title-text {
  @include font-height(12.75, 22);
}
.text {
  @include font-height(12.65, 22);
}

.star-rating-row {
  margin-top: toRem(20);
  margin-bottom: toRem(30);

  .icon {
    @include transition(0.4s);
    margin-right: toRem(20);
    font-size: toRem(32);
    color: #e5e5e5;
    cursor: pointer;

    &:hover {
      color: rgba($brand-accent, 0.75);
    }
  }

  .active {
    color: $brand-accent;
  }
}
.modal-cover-footer {
  .btn {
    padding: toRem(12.5) toRem(32);
    font-size: toRem(10.5);
  }
}
</style>
