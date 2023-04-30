<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Edit Assessment</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="form-group compact-row w-100">
          <label for="assessmentTitle" class="label-compact label-sm"
            >Assessment Title
          </label>
          <input
            type="text"
            id="assessmentTitle"
            class="form-control"
            placeholder="Enter assessment title"
            required
            v-model="new_title"
          />
        </div>

        <!-- SELECT BLOCK  -->
        <div class="form-group compact-row w-100">
          <label class="label-compact label-sm" style="margin-left: -12px"
            >Assessment Category
          </label>
        </div>

        <!-- CATEGORIES  -->
        <div class="category-row">
          <!-- HOMEWORK  -->
          <div
            class="category"
            :class="{ 'active-category': isHomeWork }"
            @click="updateCategory('homework')"
          >
            Homework
          </div>

          <!-- EXAM  -->
          <div
            class="category"
            :class="{ 'active-category': isExam }"
            @click="updateCategory('exam')"
          >
            Exam
          </div>

          <!-- CLASS QUIZ  -->
          <div
            class="category"
            :class="{ 'active-category': isQuiz }"
            @click="updateCategory('quiz')"
          >
            Class Quiz
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end">
        <button
          class="btn modal-btn transparent-bg no-shadow color-text mgr-5"
          @click="$emit('closeTriggered')"
        >
          Cancel
        </button>

        <button
          class="btn btn-accent modal-btn mgl-5"
          ref="confirm"
          @click="updateAssessment"
        >
          Save Changes
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import { mapActions } from "vuex";

export default {
  name: "editAssessmentModal",

  components: {
    modalCover,
  },

  props: {
    assessment: Object,
  },

  computed: {
    getAssessmentUpdate() {
      return {
        assessment_id: this.assessment.id,
        assessment_type: this.assessment.type,
        assessment_update: {
          title: this.new_title,
          tag: this.category,
          open_date: this.assessment.open_date,
          close_date: this.assessment.close_date,
          subject_id: this.assessment.subject.id,
          view_by: "class",
        },
      };
    },

    isHomeWork() {
      return this.category === "homework";
    },

    isExam() {
      return this.category === "exam";
    },

    isQuiz() {
      return this.category === "quiz";
    },
  },

  data() {
    return {
      new_title: this.assessment.title,
      category: this.assessment.tag,
    };
  },

  methods: {
    ...mapActions({
      editAssessment: "dbAssessments/editAssessment",
    }),

    updateAssessment() {
      this.handleClick("confirm", "Updating...");

      this.editAssessment(this.getAssessmentUpdate)
        .then((response) => {
          this.handleClick("confirm", "Confirm", false);

          if (response.code === 200) {
            this.$bus.$emit("reloadAssessment", this.assessment.type);
            this.pushAlert("Assessment updated successfully", "success");
            location.reload();
          } else {
            this.pushAlert("Assessment failed to update", "warning");
          }
        })
        .catch(() => {
          this.handleClick("confirm", "Confirm", false);
          this.pushAlert("Error updating assessment", "error");
        });
    },

    updateCategory(category) {
      this.category = category;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-top: toRem(12);
  margin-bottom: toRem(30);

  .form-control {
    font-size: toRem(12.5);
  }
}

.category-row {
  @include flex-row-start-nowrap;
  position: relative;
  top: toRem(20);
  margin-bottom: toRem(55);

  @include breakpoint-custom-down(340) {
    @include flex-row-center-wrap;
  }

  .category {
    border: toRem(1) solid $brand-inverse;
    background: $brand-inverse-light;
    @include flex-row-start-nowrap;
    padding: toRem(8) toRem(26);
    @include transition(0.4s);
    border-radius: toRem(30);
    margin-right: toRem(15);
    font-size: toRem(11.75);
    color: $brand-navy;
    cursor: pointer;

    @include breakpoint-down(md) {
      padding: toRem(8) toRem(24);
      margin-right: toRem(12);
    }

    @include breakpoint-down(xs) {
      padding: toRem(7) toRem(20);
      margin-right: toRem(10);
      font-size: toRem(11);
    }

    @include breakpoint-custom-down(340) {
      padding: toRem(7) toRem(18);
      font-size: toRem(10.75);
      margin-right: toRem(9);
      margin-bottom: toRem(7);
    }

    &:hover {
      border: toRem(1) solid $brand-accent;
      background: $brand-accent-light;
      @include box-shadow;
    }

    &:last-of-type {
      margin-right: toRem(5);
    }
  }

  .active-category {
    border: toRem(1) solid $brand-accent;
    background: $brand-accent-light;
    font-weight: 500;
  }
}

.modal-cover-footer {
  margin-top: toRem(-30);
  margin-bottom: toRem(10);

  @include breakpoint-custom-down(340) {
    margin-top: toRem(-45);
  }
}
</style>
