<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header mgt-0">
        <!-- HEADER CONTENT  -->
        <div class="header-content">
          <!-- CHILD AVATAR  -->
          <div class="avatar topic-avatar brand-inverse-light-bg">
            <div class="icon icon-library"></div>
          </div>

          <!-- TITLE TEXT  -->
          <div class="title-text text-center white-text font-weight-600">
            {{ $string.getCapitalizeText(assessment.title) }}
          </div>

          <!-- META TEXT  -->
          <div class="meta-text text-center color-grey-dark text-uppercase">
            {{ assessment.subject.name }}
          </div>

          <!-- TEACHER INFO -->
          <div class="teacher-info">
            <div class="avatar rounded-5 mgr-10">
              <img
                v-lazy="getTeacher.image"
                :alt="$string.getStringInitials(getTeacher.name)"
                class="avatar-img"
                v-if="getTeacher.image"
              />

              <div
                class="avatar-text"
                v-else
                :class="$color.getProfileBgColor(getTeacher.name)"
              >
                {{ $string.getStringInitials(getTeacher.name) }}
              </div>
            </div>

            <div class="info">
              <div class="meta color-grey-dark">Given By:</div>
              <div class="teacher-name brand-inverse-light">
                {{ getTeacher.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body" v-if="false"></template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <!-- INFO  -->
        <div class="info-row">
          <!-- QUESTION -->
          <div class="column">
            <div class="icon icon-circle-question-mark"></div>
            <!-- INFO  -->
            <div class="info">
              <div class="top">
                {{ getQuestionCount }}
              </div>
              <div class="bottom">Questions</div>
            </div>
          </div>

          <!-- DURATION -->
          <div class="column">
            <div class="icon icon-watch"></div>
            <!-- INFO  -->
            <div class="info">
              <!-- <div class="top">45 <span>minutes</span></div> -->
              <div class="top">
                {{ $date.getMinutesPerSeconds(getQuestionDuration) }}
              </div>
              <div class="bottom">Duration</div>
            </div>
          </div>

          <!-- TYPE -->
          <div class="column">
            <div class="icon icon-calendar"></div>
            <!-- INFO  -->
            <div class="info">
              <div class="top">{{ getDueDate }}</div>
              <div class="bottom">Due Date</div>
            </div>
          </div>
        </div>

        <button
          class="btn btn-accent modal-btn"
          ref="startBtn"
          @click="startAssessment"
        >
          Start {{ assessment.tag }}
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { EXTERNAL_URL } from "@/env";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "startAssessmentModal",

  components: {
    modalCover,
  },

  props: {
    assessment: {
      type: Object,
    },
  },

  computed: {
    getDueDate() {
      if (this.assessment?.close_date) {
        let { d1, m4, y1 } = this.$date
          .formatDate(this.assessment?.close_date)
          .getAll();

        return `${d1} ${m4}, ${y1}`;
      } else return "No Due Date";
    },

    getQuestionCount() {
      return (
        this.assessment?.questionCount ?? this.assessment?.question_count ?? 0
      );
    },

    getQuestionDuration() {
      return (
        this.assessment?.duration ??
        this.assessment?.questionsDuration ??
        this.assessment?.question_duration ??
        3600
      );
    },

    getTeacher() {
      if (this.assessment?.teacher)
        return {
          id: this.assessment?.teacher.id,
          name: this.assessment?.teacher.full_name,
          image: this.assessment?.teacher.image,
        };
      else if (this.assessment?.user)
        return {
          id: this.assessment?.user.id,
          name: this.assessment?.user.name,
          image: this.assessment?.user.image,
        };
      else
        return {
          id: "1",
          name: "Sample Teacher",
          image: "",
        };
    },
  },

  methods: {
    startAssessment() {
      this.handleClick("startBtn", "Starting...");

      setTimeout(
        () =>
          (location.href = EXTERNAL_URL(
            "test",
            `/assessment/${this.assessment.id}?student_id=${this.$route.params.id}`
          )),
        2000
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-header {
  background: darken($brand-navy, 5%);
  position: relative;
  top: toRem(-3);

  .header-content {
    @include flex-column-center;
    padding: toRem(20) 0 toRem(15);

    @include breakpoint-down(xs) {
      padding: toRem(15) 0 toRem(12);
    }

    .avatar {
      @include square-shape(58);
      margin-bottom: toRem(16);

      @include breakpoint-down(xs) {
      }

      .icon {
        @include center-placement;
        font-size: toRem(37);
        color: $brand-navy;
      }
    }

    .topic-avatar {
      @include breakpoint-down(xs) {
        display: none;
      }
    }

    .title-text {
      @include font-height(16.5, 26);
      margin-bottom: toRem(6);

      @include breakpoint-down(sm) {
        @include font-height(16, 22);
      }

      @include breakpoint-down(xs) {
        @include font-height(14.75, 20);
      }
    }

    .meta-text {
      @include font-height(11, 15);
      margin-bottom: toRem(23);

      @include breakpoint-down(sm) {
        @include font-height(10.5, 14);
      }
    }

    .teacher-info {
      @include flex-row-center-nowrap;

      .avatar {
        @include square-shape(34);
        margin-bottom: 0;

        .avatar-text {
          font-size: toRem(11.85);
        }
      }

      .meta {
        @include font-height(10.85, 15);
      }

      .teacher-name {
        @include font-height(13, 19);
      }
    }
  }
}

.modal-cover-footer {
  @include flex-column-center;
  margin-bottom: toRem(12);
  margin-top: toRem(8);

  @include breakpoint-down(xs) {
    margin-bottom: toRem(8);
    margin-top: toRem(4);
  }

  .info-row {
    @include flex-row-between-nowrap;
    width: 90%;

    .column {
      @include flex-row-start-nowrap;
      align-items: flex-start;

      .icon {
        color: $border-grey-dark;
        padding-top: toRem(2);
        margin-right: toRem(10);
        font-size: toRem(18);
      }

      .info {
        .top {
          @include font-height(13.75, 18);
          color: $brand-navy;
          margin-bottom: toRem(6);
          font-weight: 600;

          @include breakpoint-down(xs) {
            @include font-height(12.75, 18);
          }

          span {
            font-size: toRem(12.5);
            font-weight: normal !important;
          }
        }

        .bottom {
          @include font-height(12.25, 15);
          color: $color-grey-dark;
        }
      }
    }
  }

  .btn {
    margin-top: toRem(25);
    padding: toRem(13.25) toRem(38);
    font-size: toRem(10.87) !important;

    @include breakpoint-down(xs) {
      padding: toRem(14) toRem(42) !important;
      font-size: toRem(10) !important;
    }
  }
}
</style>
