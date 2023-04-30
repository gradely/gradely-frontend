<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          Create Live Class
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="form-group compact-row w-100">
          <label for="classTitle" class="label-compact label-sm"
            >Class Title
          </label>
          <input
            type="text"
            id="classTitle"
            class="form-control"
            placeholder="Enter class title"
            required
          />
        </div>

        <!-- START DATE  -->
        <div class="form-group compact-row">
          <label for="StartDate" class="label-compact label-sm"
            >Start Date
          </label>
          <input
            type="datetime-local"
            id="StartDate"
            class="form-control"
            required
          />
        </div>

        <!-- SUBJECT AND STUDENTS ROW  -->
        <template>
          <div class="subject-student-row">
            <!-- SUBJECT  -->
            <div class="form-group compact-row w-100">
              <label for="subject" class="label-compact label-sm"
                >Assessment Subject
              </label>
              <select class="form-control" id="subject">
                <option disabled selected value="">Select subject</option>
                <option value="">Mathematics</option>
                <option value="">Agricultural Science</option>
                <option value="">Integraded Science</option>
              </select>
            </div>

            <!-- ASSIGN STUDENTS  -->
            <div class="form-group compact-row w-100">
              <label for="subject" class="label-compact label-sm"
                >Assigned to..
              </label>
              <select class="form-control" id="subject">
                <option selected value="">All Students</option>
                <option value="">Select Student(s)</option>
              </select>
            </div>
          </div>

          <!-- INFO TEXT  -->
          <div class="info-text color-ash">
            <div class="text mgr-4">
              Assigning assessment to only
            </div>

            <!-- SELECTED COUNT  -->
            <div class="selected-count position-relative pointer mgr-5">
              2 students

              <!-- HINT DROPDOWN  -->
              <div
                class="hint-dropdown move-top box-shadow-effect smooth-animation"
              >
                <span class="item">
                  Erica Jones
                </span>
                <span class="item">
                  Alice Jones,
                </span>
                <span class="item">
                  Richy Jones,
                </span>
              </div>
            </div>

            <!-- RECIPIENTS  -->
            <div
              class="btn-link font-weight-600"
              @click="$emit('showStudentModal')"
            >
              Edit Recipients
            </div>
          </div>
        </template>

        <!--ASSIGNED CLASSES -->
        <template>
          <div class="form-group compact-row w-100">
            <label for="subject" class="label-compact label-sm"
              >Assigned Class..
            </label>
            <select class="form-control" id="subject">
              <option selected value="">Junior Secondary School 1</option>
              <option value="">Select Classes</option>
            </select>
          </div>

          <!-- INFO TEXT  -->
          <div class="info-text color-ash">
            <div class="text mgr-4">
              Posting assessment to only
            </div>

            <!-- SELECTED COUNT  -->
            <div class="selected-count position-relative pointer mgr-5">
              2 classes

              <!-- HINT DROPDOWN  -->
              <div
                class="hint-dropdown move-top box-shadow-effect smooth-animation"
              >
                <div class="item">
                  Junior Secondary 1 - Gold
                </div>

                <div class="item">
                  Junior Secondary 2 - Gold
                </div>
              </div>
            </div>

            <!-- RECIPIENTS  -->
            <div
              class="btn-link font-weight-600"
              @click="$emit('showStudentModal')"
            >
              Edit Class
            </div>
          </div>
        </template>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end">
        <button
          class="btn no-shadow bg-transparent modal-btn brand-tonic"
          @click="$emit('closeTriggered')"
        >
          Cancel
        </button>

        <button class="btn btn-accent modal-btn">Create Class</button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "createAssessmentModal",

  components: {
    modalCover,
  },

  data: () => ({
    selected_category: "homework",
    categories: ["homework", "exam", "class quiz"],
  }),

  methods: {
    switchCategory(category) {
      this.selected_category = category;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  min-height: 20vh;
  height: auto;
  max-height: 80vh;

  @include breakpoint-down(sm) {
    max-height: 80vh;
  }
}

.form-group {
  margin-top: toRem(10);
  margin-bottom: toRem(23);

  @include breakpoint-down(xs) {
    margin-top: toRem(8);
    margin-bottom: toRem(20);
  }

  label {
    top: toRem(-9) !important;
    font-weight: 500 !important;
  }

  .form-control {
    font-size: toRem(12);
  }
}

.subject-student-row {
  @include flex-row-between-nowrap;

  @include breakpoint-down(xs) {
    @include flex-row-between-wrap;
  }

  .form-group {
    width: 49.25% !important;

    @include breakpoint-down(xs) {
      width: 100% !important;
    }
  }
}

.info-text {
  @include flex-row-start-nowrap;
  @include font-height(11.75, 14);
  position: relative;
  top: toRem(-17);

  @include breakpoint-down(sm) {
    @include flex-row-start-wrap;
    @include font-height(11.5, 14);
  }

  @include breakpoint-down(xs) {
    @include font-height(11.25, 14);
  }

  .selected-count {
    border-bottom: toRem(1) solid rgba($border-grey-dark, 0.8);

    .hint-dropdown {
      left: toRem(-20);
    }

    &:hover {
      .hint-dropdown {
        display: unset;
      }
    }
  }
}

.modal-cover-footer {
  margin-top: toRem(-18);
  margin-bottom: 0;

  @include breakpoint-down(xs) {
    margin-top: toRem(-8);
  }
}
</style>
