<template>
  <div class="lesson-input-type w-100 smooth-transition">
    <!-- POST INPUT  -->
    <div class="extended-textarea" role="textbox" contenteditable></div>

    <!-- ASSESSMENT BLOCK  -->
    <div class="post-input-entry-block lesson-block">
      <!-- TOP  -->
      <div class="top mgb-25">
        <!-- TITLE ROW  -->
        <div class="title-row">
          <!-- TITLE TEXT  -->
          <div class="title-text color-text">
            New Lesson
          </div>

          <!-- CANCEL TEXT  -->
          <div class="cancel-text color-grey-dark">
            Cancel
          </div>
        </div>

        <!-- TITLE INPUT  -->
        <input
          type="text"
          class="form-control title-input"
          placeholder="Add Lesson Title"
        />
      </div>

      <!-- BOTTOM  -->
      <div class="bottom">
        <div class="form-area">
          <!-- TOPIC AND SUBJECT ROW  -->
          <div class="form-area-row mgb-20">
            <!-- SELECT SUBJECT  -->
            <div class="subject-column">
              <div class="avatar">
                <div class="icon icon-book-cover color-grey-dark"></div>
              </div>

              <!-- SUBJECT INPUT -->
              <div class="wrapper position-relative">
                <select name="" class="form-control pointer">
                  <option value="">English language</option>
                  <option value="">Mathematics</option>
                  <option value="">Agricultural Science</option>
                  <option value="">Basic Integrated Science</option>
                </select>

                <!-- CARET  -->
                <div
                  class="caret index-1 position-absolute icon-caret-down color-ash"
                ></div>
              </div>
            </div>

            <!-- TOPIC INTERVAL  -->
            <div class="topic-column">
              <div class="avatar">
                <div class="icon icon-bookmark color-grey-dark"></div>
              </div>

              <!-- SUBJECT INPUT -->
              <div class="wrapper position-relative">
                <select name="" class="form-control pointer">
                  <option value="">Tag to Topic</option>
                  <option value="">Algebra</option>
                  <option value="">Indices</option>
                </select>

                <!-- CARET  -->
                <div
                  class="caret index-1 position-absolute icon-caret-down color-ash"
                ></div>
              </div>
            </div>
          </div>

          <!-- LESSON DESCRIPTION -->
          <div class="form-area-row mgb-20">
            <!--ENTER DESCRIPTION  -->
            <div class="description-column w-100">
              <div class="avatar">
                <div class="icon icon-align-justify color-grey-dark"></div>
              </div>

              <!-- DESCRIPTION INPUT -->
              <textarea
                placeholder="Add lesson description"
                rows="5"
                class="form-control pdy-15"
              ></textarea>
            </div>
          </div>

          <!-- STUDENT ROW  -->
          <div class="form-area-row mgb-20">
            <!-- SELECT STUDENT  -->
            <div class="student-column">
              <div class="avatar">
                <div class="icon icon-user-plus color-grey-dark"></div>
              </div>

              <!-- STUDENT INPUT -->
              <div class="wrapper position-relative">
                <div
                  class="form-control color-text pointer"
                  @click="toggleStudentModal"
                >
                  <!-- TITLE  -->
                  <div class="title font-weight-700 mgr-5">Assign to:</div>

                  <!-- VALUE  -->
                  <div class="value">All students</div>
                </div>

                <!-- CARET  -->
                <div
                  class="caret index-1 position-absolute icon-caret-down color-ash"
                ></div>
              </div>
            </div>
          </div>

          <!-- LESSON FILE UPLOADER -->
          <div class="form-area-row mgb-20">
            <!-- UPLOAD FILE  -->
            <div class="file-column w-100">
              <div class="avatar mgt-6">
                <div class="icon icon-file color-grey-dark"></div>
              </div>

              <!-- FILE INPUT -->
              <div class="flex-column w-100">
                <div class="wrapper position-relative w-100">
                  <label for="" class="color-grey-dark mgb-8"
                    ><span class="font-weight-700 mgr-6">LESSON NOTE</span>
                    <span>(PDF, Word docx, video, Powerpoint)</span>
                  </label>

                  <!-- UPLOADER BAR  -->
                  <div
                    class="upload-btn position-relative rounded-5 w-100 h-auto overflow-hidden"
                  >
                    <!-- UPLOAD COVER  -->
                    <label
                      for="uploadFile"
                      class="upload-cover w-100 h-100 pointer position-relative text-center brand-navy smooth-transition"
                    >
                      <input
                        type="file"
                        id="uploadFile"
                        style="display: none"
                        accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .pdf"
                      />
                      Click here to upload file
                    </label>

                    <!-- UPLOADING COVER  -->
                    <file-uploader-progress :progress="87" v-if="false" />
                  </div>
                </div>

                <!-- UPLOADED FILES  -->
                <div class="uploaded-row mgt-10">
                  <div class="wrapper">
                    <file-card :file="{ type: 'pdf' }" />
                  </div>
                  <div class="wrapper">
                    <file-card :file="{ type: 'doc' }" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ASSIGNED ROW  -->
          <div class="assigned-row color-grey-dark">
            <div class="default-text" v-if="false">
              This lesson will be open for every your students in the class
            </div>

            <div class="selected-text">
              <div class="text mgr-4">
                This lesson will be open to only
              </div>

              <!-- SELECTED COUNT  -->
              <div class="selected-count position-relative pointer">
                2 students

                <!-- HINT DROPDOWN  -->
                <div class="hint-dropdown box-shadow-effect smooth-animation">
                  <span class="item">
                    Alice Jones,
                  </span>

                  <span class="item">
                    Richy Jones,
                  </span>

                  <span class="item">
                    Erica Jones
                  </span>
                </div>
              </div>

              <!-- RECIPIENTS  -->
              <div
                class="btn-link mgl-5 font-weight-600"
                @click="toggleStudentModal"
              >
                Edit Recipients
              </div>
            </div>
          </div>
          <!-- ASSIGNED ROW  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lessonInputType",

  components: {
    fileCard: () =>
      import(
        /* webpackChunkName: "fileCard" */ "@/modules/base/components/feed-comps/post-block-comps/file-card"
      ),
    fileUploaderProgress: () =>
      import(
        /* webpackChunkName: "fileUploaderProgress" */ "@/shared/components/file-uploader-progress"
      ),
  },

  data: () => ({}),

  methods: {},
};
</script>

<style lang="scss" scoped>
.lesson-input-type {
  .extended-textarea[contenteditable] {
    &:empty {
      &::before {
        content: "Add instructions here...";
      }
    }
  }

  .lesson-block {
    .form-area {
      .form-area-row {
        @include flex-row-start-nowrap;

        @include breakpoint-down(sm) {
          @include flex-row-start-wrap;
          margin-bottom: toRem(10) !important;
        }

        .subject-column,
        .topic-column,
        .description-column,
        .student-column,
        .file-column {
          @include flex-row-start-nowrap;
          margin-right: toRem(20);

          @include breakpoint-down(xl) {
            margin-right: toRem(6);
          }

          @include breakpoint-down(lg) {
            margin-right: toRem(5);
          }

          @include breakpoint-down(sm) {
            margin-right: 0;
            margin-bottom: toRem(10);
            width: 100%;
          }

          .avatar {
            margin-right: toRem(10);

            @include breakpoint-down(xl) {
              margin-right: toRem(2);
            }

            @include breakpoint-down(lg) {
              @include square-shape(20);
              margin-right: toRem(3);
            }

            @include breakpoint-down(sm) {
              margin-right: toRem(9);
            }

            .icon {
              @include center-placement;
              font-size: toRem(22);

              @include breakpoint-down(xl) {
                font-size: toRem(18);
              }
            }
          }

          .form-control {
            min-width: toRem(230);
            width: auto;
            max-width: toRem(300);

            @include breakpoint-down(xl) {
              min-width: toRem(200);
              max-width: toRem(220);
            }

            @include breakpoint-down(lg) {
              min-width: toRem(180);
              max-width: toRem(180);
            }

            @include breakpoint-down(md) {
              min-width: toRem(200);
              max-width: toRem(200);
            }

            @include breakpoint-down(sm) {
              min-width: 100%;
              max-width: 100%;
            }
          }

          .wrapper {
            @include breakpoint-down(sm) {
              width: 100%;
            }

            .caret {
              @include center-y;
              right: toRem(14);
              font-size: toRem(10);
            }
          }
        }

        .description-column {
          align-items: flex-start;

          @include breakpoint-down(sm) {
            width: 94% !important;
          }

          @include breakpoint-down(xs) {
            width: 91% !important;
          }

          .form-control {
            width: 100%;
            max-width: 100%;
          }
        }

        .topic-column,
        .student-column {
          margin-right: 0;
        }

        .student-column {
          .wrapper {
            .form-control {
              @include font-height(12, 16);
              @include flex-row-start-nowrap;
            }
          }
        }

        .file-column {
          align-items: flex-start;
          label {
            @include font-height(12, 16);

            @include breakpoint-down(lg) {
              @include font-height(11.5, 15);
            }

            @include breakpoint-down(sm) {
              @include font-height(11.25, 15);
            }
          }

          .upload-btn {
            .upload-cover {
              background: $brand-accent-light;
              border: 1px solid $brand-accent;
              padding: toRem(14.5);
              @include font-height(12, 16);

              &:hover {
                background: $brand-inverse-light;
                border: 1px solid $brand-inverse;
              }
            }
          }

          .uploaded-row {
            @include flex-row-between-wrap;
            .wrapper {
              width: 49%;

              @include breakpoint-down(lg) {
                width: 100%;
              }
            }
          }
        }
      }

      .assigned-row {
        @include font-height(12.25, 16);

        @include breakpoint-down(lg) {
          @include font-height(12, 17);
        }

        @include breakpoint-down(sm) {
          @include font-height(11.5, 17);
        }

        .selected-text {
          @include flex-row-start-nowrap;

          @include breakpoint-down(sm) {
            @include flex-row-start-wrap;
          }

          .selected-count {
            border-bottom: toRem(1) solid $border-grey;

            &:hover {
              .hint-dropdown {
                display: unset;
              }
            }
          }
        }
      }
    }
  }
}
</style>
