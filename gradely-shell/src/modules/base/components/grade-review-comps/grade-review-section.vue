<template>
  <div class="grade-review-section">
    <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 mx-auto">
      <div class="row">
        <div class="col-12 col-md-8 mx-auto">
          <!-- QUESTION COUNTER  -->
          <div class="question-counter font-weight-600 brand-navy">
            Question {{ current_index + 1 }} / {{ essay_questions.length }}
          </div>

          <!-- REVIEW SECTION  -->
          <div
            class="
              review-section
              white-text-bg
              rounded-10
              position-relative
              box-shadow-effect
            "
          >
            <!-- QUESTION NUMBER  -->
            <div class="question-number">
              <div class="wrapper position-relative w-100 h-100">
                <div class="icon icon-chat-card brand-navy"></div>
                <div class="count white-text">{{ current_index + 1 }}</div>
              </div>
            </div>

            <!-- QUESTION NAVIGATION  -->
            <template v-if="essay_questions.length > 1">
              <div
                class="question-nav position-absolute avatar left-nav pointer"
                title="Previous Question"
                v-if="!isFirstQuestion"
                @click="goToPrevQuesstion"
              >
                <div class="wrapper position-relative w-100 h-100">
                  <div class="icon icon-caret-left"></div>
                </div>
              </div>

              <div
                class="question-nav position-absolute avatar right-nav pointer"
                title="Next Question"
                v-if="!isLastQuestion"
                @click="goToNextQuesstion"
              >
                <div class="wrapper position-relative w-100 h-100">
                  <div class="icon icon-caret-right"></div>
                </div>
              </div>
            </template>

            <!-- QUESTION CONTENT  -->
            <div class="question-content">
              <!-- QUESTION TEXT  -->
              <div
                class="question-text brand-navy"
                v-html="essay_questions[current_index].question"
              ></div>

              <!-- RESPONSE BLOCK  -->
              <div class="response-block">
                <div class="title-text color-text font-weight-600">
                  STUDENT'S RESPONSE
                </div>

                <!-- RESPONSE TEXT  -->
                <div
                  class="response-text color-ash"
                  v-html="essay_questions[current_index].selected"
                ></div>

                <!-- ATTACHMENT PREVIEW  -->
                <div
                  class="
                    attachment-preview
                    position-relative
                    rounded-10
                    overflow-hidden
                  "
                  v-if="essay_questions[current_index].image"
                >
                  <!-- TOP SECTION  -->
                  <div class="top-section black-text-bg">
                    <div class="left">
                      <!-- DOWNLOAD LINK  -->
                      <div class="link" title="Download Attachment">
                        <div class="icon icon-download"></div>
                        <div class="text">Download</div>
                      </div>

                      <!-- PRINT LINK  -->
                      <div class="link" title="Print Attachment" v-if="print">
                        <div class="icon icon-printer"></div>
                        <div class="text">Print</div>
                      </div>
                    </div>

                    <div class="right">
                      <div
                        class="icon icon-maximize pointer"
                        title="Expand"
                      ></div>
                    </div>
                  </div>

                  <!-- BOTTOM SECTION  -->
                  <div class="bottom-section">
                    <img v-lazy="essay_questions[current_index].image" alt="" />
                  </div>
                </div>

                <!-- ASSIGN BLOCK  -->
                <div class="assign-block">
                  <div class="title-text color-grey-dark font-weight-600">
                    ASSIGN SCORE
                    <span
                      class="type gfont-11-5 font-weight-500 text-capitalize"
                      >({{
                        essay_questions[current_index].type === "short"
                          ? "Short answer"
                          : "Essay"
                      }})</span
                    >
                  </div>

                  <!-- REVIEW INPUT ROW  -->
                  <div class="review-input">
                    <!-- REVIEW INPUT  -->
                    <div class="review-column">
                      <input
                        type="number"
                        placeholder="0"
                        step="1"
                        v-model="grade"
                        min="0"
                        :max="getCurrentQuestion.max_score"
                        class="form-control"
                      />

                      <span class="mx-2">/</span>

                      <input
                        type="text"
                        :value="essay_questions[current_index].max_score"
                        disabled
                        class="form-control"
                      />

                      <!-- UPDATE BUTTON  -->
                      <button
                        class="btn btn-inverse-outline"
                        :disabled="isDisabled"
                        ref="update"
                        @click="gradeQuestion"
                      >
                        UPDATE SCORE
                      </button>
                    </div>

                    <!-- GRADE COLUMN  -->
                    <div
                      class="grade-column rounded-30"
                      title="Graded successfully!"
                      v-if="essay_questions[current_index].is_graded"
                    >
                      <div class="icon icon-correct"></div>
                      <div class="text">Graded</div>
                    </div>
                  </div>

                  <!-- BOTTOM INFO  -->
                  <div
                    class="
                      bottom-info
                      d-flex
                      justify-content-start
                      align-items-center
                    "
                  >
                    <!-- REPORT LINK  -->
                    <div
                      class="info-link brand-navy"
                      title="Report assessment question"
                      @click="toggleReportStudent"
                    >
                      <div class="icon icon-flag"></div>
                      <div class="text">Report Question</div>
                    </div>

                    <!-- REMOVE LINK  -->
                    <div
                      v-if="false"
                      class="info-link brand-tonic"
                      @click="toggleRemoveQuestionModal"
                      title="Remove current question from assessment"
                    >
                      <div class="icon icon-trash"></div>
                      <div class="text">Remove Question</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_remove_question_modal">
        <remove-question-modal @closeTriggered="toggleRemoveQuestionModal" />
      </transition>

      <transition name="fade" v-if="show_grade_complete_modal">
        <grade-complete-modal @closeTriggered="toggleGradeCompleteModal" />
      </transition>

      <transition name="fade" v-if="report_student">
        <report-student-assessment
          @closeTriggered="toggleReportStudent"
          :question_id="getCurrentQuestion.id"
        />
      </transition>
    </portal>

    <script
      type="application/javascript"
      defer
      async="true"
      src="https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image"
    ></script>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import reportStudentAssessment from "@/modules/base/modals/assessments/report-student-assessment";

export default {
  name: "gradeReviewSection",

  components: {
    reportStudentAssessment,
    removeQuestionModal: () =>
      import(
        /* webpackChunkName: 'removeQuestionModal' */ "@/modules/base/modals/grade-review/remove-question-modal"
      ),
    gradeCompleteModal: () =>
      import(
        /* webpackChunkName: 'gradeCompleteModal' */ "@/modules/base/modals/grade-review/grade-complete-modal"
      ),
  },

  props: {
    assessment: {
      type: Array,
      default: () => [],
    },

    quiz_id: {
      type: [String, Number],
      default: 2370,
    },
  },

  computed: {
    isDisabled() {
      return !this.grade || this.grade > this.getCurrentQuestion.max_score
        ? true
        : false;
    },

    isFirstQuestion() {
      return this.current_index === 0 ? true : false;
    },

    isLastQuestion() {
      return this.essay_questions.length - 1 === this.current_index
        ? true
        : false;
    },

    getCurrentQuestion() {
      return this.essay_questions.length
        ? this.essay_questions[this.current_index]
        : {};
    },

    getQuestionUpdate() {
      return {
        quiz_id: Number(this.quiz_id),
        score: Number(this.grade),
        student_id: Number(this.$route.params.student_id),
        homework_id: Number(this.$route.params.assessment_id),
        max_score: Number(this.getCurrentQuestion.max_score),
        question_id: Number(this.getCurrentQuestion.id),
      };
    },

    getUpdatePayload() {
      return {
        attempt_id: this.getCurrentQuestion.attempt_id,
        update_info: this.getQuestionUpdate,
      };
    },

    filterEssayShortQuestions() {
      let assessment = this.assessment ?? [];

      let data = assessment?.filter((item) =>
        ["short", "essay"].includes(item.type)
      );
      return data;
    },
  },

  watch: {
    grade(newGrade) {
      if (newGrade > this.getCurrentQuestion.max_score)
        this.pushAlert(
          "Score can't be greater than question max score",
          "warning"
        );
    },

    getCurrentQuestion: {
      handler(question) {
        this.grade = question?.score;
      },
      immediate: true,
      deep: true,
    },

    assessment: {
      handler(assessment) {
        this.essay_questions = assessment;
      },
      immediate: true,
      deep: true,
    },
  },

  data() {
    return {
      current_index: 0,
      essay_questions: this.assessment,

      grade: 0,
      show_remove_question_modal: false,
      show_grade_complete_modal: false,

      report_student: false,
    };
  },

  methods: {
    ...mapActions({
      updateAssessmentQuestion: "dbAssessments/updateAssessmentQuestion",
    }),

    toggleReportStudent() {
      this.report_student = !this.report_student;
    },

    toggleRemoveQuestionModal() {
      this.show_remove_question_modal = !this.show_remove_question_modal;
    },

    toggleGradeCompleteModal() {
      this.show_grade_complete_modal = !this.show_grade_complete_modal;
    },

    goToNextQuesstion() {
      this.current_index += 1;
    },

    goToPrevQuesstion() {
      this.current_index -= 1;
    },

    gradeQuestion() {
      this.handleClick("update", "Updating");
      this.updateAssessmentQuestion(this.getUpdatePayload)
        .then((response) => {
          // console.log("updated question", response);
          this.handleClick("update", "update score", false);
          if (response.code === 200) {
            this.pushAlert("Question grade updated", "success");
          } else {
            this.pushAlert("Failed to update question grade", "warning");
          }
        })
        .catch(() => {
          this.pushAlert("Error upgrading question grade", "error");
          this.handleClick("update", "update score", false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.grade-review-section {
  margin-bottom: toRem(60);

  .question-counter {
    @include font-height(16.5, 24);
    margin-bottom: toRem(28);

    @include breakpoint-down(sm) {
      @include font-height(15, 21);
      margin-bottom: toRem(16);
    }

    @include breakpoint-down(xs) {
      @include font-height(14.25, 20);
    }
  }

  .review-section {
    padding: toRem(25) toRem(50);

    @include breakpoint-down(md) {
      padding: toRem(25) toRem(40);
    }

    @include breakpoint-down(sm) {
      padding: toRem(25) toRem(35);
    }

    @include breakpoint-down(xs) {
      padding: toRem(18);
    }

    @include breakpoint-custom-down(360) {
      padding: toRem(15);
    }

    .question-number {
      position: absolute;
      left: toRem(-8.5);
      top: toRem(20);

      @include breakpoint-down(xs) {
        top: toRem(13);
        left: toRem(-8);
        display: none;
      }

      .wrapper {
        .icon {
          font-size: toRem(38);

          @include breakpoint-down(xs) {
            font-size: toRem(34);
          }
        }

        .count {
          @include center-placement;
          font-size: toRem(9.5);
          margin-top: toRem(-2);

          @include breakpoint-down(xs) {
            font-size: toRem(9);
          }
        }
      }
    }

    .question-nav {
      box-shadow: 0 0 toRem(14) rgba($black-text, 0.25);
      @include transition(0.4s);
      @include square-shape(36);
      border-radius: toRem(15);
      background: $white-text;
      @include center-y;
      z-index: 1;

      @include breakpoint-down(md) {
        @include square-shape(35);
        box-shadow: 0 0 toRem(6) rgba($black-text, 0.25);
      }

      @include breakpoint-down(sm) {
        border-radius: toRem(12);
        box-shadow: 0 0 toRem(2) rgba($black-text, 0.25);
      }

      &:hover {
        background: rgba($brand-inverse-light, 0.7);
      }

      .icon {
        @include center-placement;
        font-size: toRem(15);
        color: $brand-navy;

        @include breakpoint-down(md) {
          font-size: toRem(14.5);
        }

        @include breakpoint-down(sm) {
          font-size: toRem(14);
        }
      }
    }

    .left-nav {
      left: toRem(-16);

      @include breakpoint-down(md) {
        left: toRem(-10);
        .icon {
          margin-left: toRem(-1.5);
        }
      }

      @include breakpoint-down(sm) {
        left: toRem(-4);
        .icon {
          margin-left: toRem(-1.5);
        }
      }
    }

    .right-nav {
      right: toRem(-16);

      @include breakpoint-down(md) {
        right: toRem(-10);
        .icon {
          margin-right: toRem(-1.5);
        }
      }

      @include breakpoint-down(sm) {
        right: toRem(-4);
        .icon {
          margin-right: toRem(-1.5);
        }
      }
    }

    .question-content {
      .question-text {
        @include font-height(13.25, 24);
        margin-bottom: toRem(20);
        letter-spacing: 0.02em;

        @include breakpoint-down(sm) {
          @include font-height(12.75, 22);
          letter-spacing: 0.0015em;
          margin-bottom: toRem(18);
        }

        @include breakpoint-down(xs) {
          @include font-height(12.5, 22);
          letter-spacing: unset;
        }
      }

      .response-block {
        .title-text {
          border-bottom: toRem(1) solid $border-grey;
          @include font-height(11.25, 17);
          padding-bottom: toRem(10);
          margin-bottom: toRem(15);
          letter-spacing: 0.02em;

          @include breakpoint-down(sm) {
            @include font-height(10.75, 17);
          }

          @include breakpoint-down(xs) {
            @include font-height(10.25, 17);
          }
        }

        .response-text {
          @include font-height(13.25, 24);
          margin-bottom: toRem(20);
          letter-spacing: 0.02em;

          @include breakpoint-down(sm) {
            @include font-height(12.75, 22);
            margin-bottom: toRem(18);
            letter-spacing: 0.0015em;
          }

          @include breakpoint-down(xs) {
            @include font-height(12.5, 22);
            letter-spacing: unset;
          }
        }

        .attachment-preview {
          margin-bottom: toRem(20);
          background: $color-text;

          .top-section {
            @include flex-row-between-nowrap;
            padding: toRem(12) toRem(20);

            .left {
              @include flex-row-start-nowrap;

              .link {
                @include flex-row-start-nowrap;
                margin-right: toRem(25);
                cursor: pointer;

                @include breakpoint-down(sm) {
                  margin-right: toRem(20);
                }

                .icon {
                  @include transition(0.4s);
                  margin-right: toRem(12);
                  font-size: toRem(16);
                  color: #e5e5e5;

                  @include breakpoint-down(sm) {
                    margin-right: toRem(10);
                    font-size: toRem(13);
                  }
                }

                .text {
                  @include transition(0.4s);
                  font-size: toRem(12);
                  color: $border-grey;

                  @include breakpoint-down(sm) {
                    font-size: toRem(11.25);
                  }
                }

                &:hover {
                  .icon,
                  .text {
                    color: $brand-inverse-light;
                  }
                }
              }
            }

            .right {
              .icon {
                font-size: toRem(15.5);
                color: #e5e5e5;

                @include breakpoint-down(sm) {
                  font-size: toRem(15);
                }

                &:hover {
                  color: $brand-inverse-light;
                }
              }
            }
          }

          .bottom-section {
            padding: toRem(20) 0 toRem(30);
            @include flex-column-center;
            background: $color-text;

            img {
              min-width: 70%;
              width: auto;
              max-width: 80%;
              height: auto;

              @include breakpoint-down(sm) {
                min-width: 80%;
                max-width: 85%;
              }

              @include breakpoint-down(xs) {
                min-width: 85%;
                max-width: 90%;
              }
            }
          }
        }

        .assign-block {
          border-top: toRem(1) solid $border-grey;
          padding-top: toRem(20);

          .title-text {
            @include font-height(11.75, 17);
            margin-bottom: toRem(10);
            border-bottom: 0;

            @include breakpoint-down(sm) {
              @include font-height(11, 17);
              margin-bottom: toRem(8);
            }

            @include breakpoint-down(xs) {
              @include font-height(10.75, 16);
            }
          }

          .review-input {
            @include flex-row-between-wrap;
            margin-bottom: toRem(25);

            @include breakpoint-down(sm) {
              @include flex-column-start-start;
            }

            .review-column {
              @include flex-row-start-nowrap;

              @include breakpoint-down(sm) {
                margin-bottom: toRem(12);
              }

              .form-control {
                @include rectangle-shape(50, 38);
                text-align: center;

                @include breakpoint-down(xs) {
                  @include rectangle-shape(50, 35);
                }
              }

              .btn {
                border: toRem(1) solid $brand-inverse;
                background: $brand-inverse-light;
                color: $brand-navy !important;
                padding: toRem(10) toRem(22);
                margin-left: toRem(20);
                margin-right: toRem(20);
                font-size: toRem(10.5);

                @include breakpoint-down(sm) {
                  margin-left: toRem(14);
                  margin-right: toRem(15);
                  font-size: toRem(10);
                }

                @include breakpoint-down(xs) {
                  margin-left: toRem(18);
                  font-size: toRem(10);
                }

                &:hover {
                  border: toRem(1) solid $brand-accent;
                  background: $brand-accent-light;
                }
              }
            }

            .grade-column {
              @include flex-row-center-nowrap;
              padding: toRem(9) toRem(18);
              background: rgba($brand-green-light, 0.8);
              color: darken($brand-green, 15%);
              cursor: help;

              @include breakpoint-down(sm) {
                padding: toRem(8.5) toRem(16);
              }

              @include breakpoint-down(xs) {
                padding: toRem(8.5) toRem(15);
              }

              .icon {
                font-size: toRem(12);
                margin-right: toRem(10);

                @include breakpoint-down(sm) {
                  font-size: toRem(11.5);
                  margin-right: toRem(9);
                }

                @include breakpoint-down(xs) {
                  font-size: toRem(11);
                }
              }

              .text {
                font-size: toRem(12);

                @include breakpoint-down(sm) {
                  font-size: toRem(11.5);
                }

                @include breakpoint-down(xs) {
                  font-size: toRem(11);
                }
              }
            }
          }

          .bottom-info {
            margin-top: toRem(10);

            .info-link {
              @include flex-row-start-nowrap;
              @include transition(0.4s);
              margin-right: toRem(30);
              cursor: pointer;

              @include breakpoint-down(xs) {
                margin-right: toRem(20);
              }

              &:hover {
                color: $brand-inverse !important;
              }

              .icon {
                margin-right: toRem(12);
                font-size: toRem(15);

                @include breakpoint-down(sm) {
                  font-size: toRem(14);
                  margin-right: toRem(8);
                }
              }

              .text {
                font-size: toRem(12.5);

                @include breakpoint-down(sm) {
                  font-size: toRem(12.25);
                }

                @include breakpoint-down(xs) {
                  font-size: toRem(12);
                }

                @include breakpoint-custom-down(360) {
                  font-size: toRem(11.5);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
