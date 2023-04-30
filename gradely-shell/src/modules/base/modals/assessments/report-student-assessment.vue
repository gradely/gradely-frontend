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
          Report to Admin
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="feedback-modal">
          <!-- TITLE TEXT  -->
          <div class="title-text">What are you reporting for?</div>

          <!-- ITEM TWO  -->
          <label for="spam_post" class="check-item checkbox">
            <input
              type="radio"
              value="cheating"
              v-model="form.title"
              id="spam_post"
            />
            <div class="text mgl-6">Cheating</div>
          </label>

          <!-- ITEM THREE  -->
          <label for="fraudulent" class="check-item checkbox">
            <input
              type="radio"
              value="impersonation"
              v-model="form.title"
              id="fraudulent"
            />
            <div class="text mgl-6">Impersonation</div>
          </label>

          <!-- ITEM FOUR  -->
          <label for="others" class="check-item checkbox">
            <input
              type="radio"
              value="disobedience to instruction"
              v-model="form.title"
              id="others"
            />
            <div class="text mgl-6">Disobedience to instruction</div>
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
          @click="reportQuestion"
          :disabled="isDisabled"
        >
          Report Student
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "reportStudentAssessment",

  components: {
    modalCover,
  },

  props: {
    question_id: {
      type: [Number, String],
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
        reference_id: Number(this.question_id),
        title: "",
        description: "",
      },
    };
  },

  methods: {
    ...mapActions({
      reportStudentAssessment: "dbAssessments/reportStudentAssessment",
    }),

    reportQuestion() {
      this.handleClick("reportBtn", "Reporting...");

      this.reportStudentAssessment(this.form)
        .then((response) => {
          this.handleClick("reportBtn", "Report", false);

          if (response.code === 200) {
            this.pushAlert("Report sent successfully!", "success");
            this.$emit("closeTriggered");
          } else {
            this.pushAlert("Student was not reported", "warning");
          }
        })
        .catch(() => {
          this.handleClick("reportBtn", "Report", false);
          this.pushAlert("An error occured while reporting student", "error");
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
