<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-sm-md-avg' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header brand-navy-bg">
        <!-- LEFT SECTION -->
        <div class="left-section mgr-15">
          <div class="class-card brand-accent-light-bg rounded-10">
            <div class="icon icon-videocam brand-accent"></div>
          </div>
        </div>

        <!-- RIGHT SECTION -->
        <div class="right-section">
          <div class="title brand-accent font-weight-600 mgb-13">
            REMEDIAL CLASS WITH
          </div>

          <!-- STUDENT ROW -->
          <div class="student-row mgb-16">
            <div
              class="student-card rounded-40 smooth-transition pointer"
              title="Remove student"
              @click="removeStudent(index)"
              v-for="(student, index) in student_list"
              :key="index"
            >
              <div class="text brand-inverse-light">
                {{ student.firstname }} {{ student.lastname }}
              </div>

              <div class="cancel brand-navy-bg rounded-circle">
                <div class="icon icon-minus brand-red"></div>
              </div>
            </div>
          </div>

          <template v-if="!this.isTourAssessment">
            <!-- ADD STUDENT -->
            <div class="add-student pointer" @click="$emit('selectStudent')">
              <div class="icon icon-plus"></div>
              <div class="text">Add More Student</div>
            </div>
          </template>
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- TOPIC AREA -->
        <div class="topic-area mgb-34">
          <div class="icon icon-practice-card brand-inverse mgr-10"></div>

          <div>
            <div class="title-text color-ash mgb-4">Recommended Topic</div>
            <div class="topic-text brand-navy font-weight-700">
              {{ resource.title }}
            </div>
          </div>
        </div>

        <!-- CLASS TITLE -->
        <div class="form-group compact-row w-100 mgb-30">
          <label for="classTitle" class="label-compact label-sm"
            >Class Title</label
          >
          <input
            type="text"
            id="classTitle"
            class="form-control"
            v-model="form.class_title"
            placeholder="Enter class title"
          />
        </div>

        <!-- CLASS DATE -->
        <div class="row mgb-30">
          <div class="col-6">
            <div class="form-group compact-row">
              <label for="classDate" class="label-compact label-sm"
                >Class Date</label
              >
              <input
                type="date"
                id="classDate"
                class="form-control"
                v-model="form.start_date"
              />
            </div>
          </div>

          <!-- START TIME -->
          <div class="col-6">
            <div class="form-group compact-row">
              <label for="startTime" class="label-compact label-sm"
                >Start Time</label
              >
              <input
                type="time"
                id="startTime"
                class="form-control"
                v-model="form.start_time"
              />
            </div>
          </div>

          <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-accent" @click="recommendClass">
              RECOMMENDED CLASS
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer"> </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "tutorResourceModal",

  components: {
    modalCover,
  },

  props: {
    resource: Object,
    students: Array,
  },

  computed: {
    isTourAssessment() {
      let tour_titles = [
        "Gradely Tour",
        "Gradely Tour Session",
        "Gradely Class Tour",
        "Class Tour",
        "Gradely LMS Tour",
      ];

      return tour_titles.includes(this.$route.query.title) ? true : false;
    },
  },

  data() {
    return {
      form: {
        class_title: this.resource.title,
        start_date: "",
        start_time: "",
      },

      student_list: this.students,
    };
  },

  mounted() {
    this.setupPrefilledDateTime();
  },

  methods: {
    setupPrefilledDateTime() {
      let today = new Date();
      let tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      let { y1, m2, d2, h02, b2 } = this.$date
        .formatDate(tomorrow, false)
        .getAll();

      this.form.start_date = `${y1}-${m2}-${d2}`;
      this.form.start_time = `${h02}:${b2}`;
    },

    removeStudent(idx) {
      this.student_list = this.student_list.filter((_, index) => index !== idx);
    },

    recommendClass() {
      this.$emit(
        "shareResource",
        `${this.form.start_date} ${this.form.start_time}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-header {
  padding: toRem(20) toRem(18) toRem(25);
  @include flex-row-start-nowrap;
  align-items: flex-start;

  .left-section {
    .class-card {
      @include square-shape(40);
      position: relative;

      .icon {
        @include center-placement;
        font-size: toRem(22);
      }
    }
  }

  .right-section {
    .title {
      @include font-height(12, 16);
    }

    .student-row {
      @include flex-row-start-wrap;

      .student-card {
        margin: toRem(2.5) toRem(4);
        background: rgba($black-text, 0.4);
        padding: toRem(7) toRem(14);
        @include flex-row-center-nowrap;

        &:hover {
          background: rgba($brand-red, 0.4);
        }

        &:first-of-type {
          margin-left: 0;
        }

        &:last-of-type {
          margin-right: 0;
        }

        .text {
          margin: 0 toRem(13) 0 toRem(3);
          font-size: toRem(11.5);
        }

        .cancel {
          @include square-shape(20);
          position: relative;

          .icon {
            @include center-placement;
            font-size: toRem(15);
          }
        }
      }
    }

    .add-student {
      @include flex-row-start-nowrap;
      width: max-content;
      color: rgba($color-white, 0.6);

      &:hover {
        color: rgba($color-white, 0.9);
      }

      .icon {
        @include transition(0.4s);
        font-size: toRem(18);
        margin-right: toRem(10);
      }

      .text {
        @include transition(0.4s);
        font-size: toRem(12.75);
      }
    }
  }
}

.modal-cover-body {
  padding: toRem(22) toRem(20) toRem(5);

  .topic-area {
    @include flex-row-start-nowrap;
    align-items: flex-start;

    .icon {
      font-size: toRem(21);
    }

    .title-text {
      @include font-height(12, 16);
    }

    .topic-text {
      @include font-height(14.5, 18);
    }
  }

  .btn {
    padding: toRem(12.5) toRem(32);
    font-size: toRem(10.5);
  }
}
</style>
