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
          <div class="avatar rounded-7 brand-inverse-bg">
            <img
              v-lazy="mxStaticImg('AssessmentImg.png')"
              alt=""
              class="avatar-img"
            />
          </div>

          <!-- TITLE TEXT  -->
          <div class="title-text text-center white-text font-weight-600">
            Mathematics
          </div>

          <!-- META TEXT  -->
          <div class="meta-text text-center border-grey-dark text-uppercase">
            Checkpoint
          </div>

          <!-- INFO  -->
          <div class="info-row">
            <!-- QUESTION -->
            <div class="column">
              <div class="icon icon-circle-question-mark"></div>
              <!-- INFO  -->
              <div class="info">
                <div class="top">50</div>
                <div class="bottom">Questions</div>
              </div>
            </div>

            <!-- DURATION -->
            <div class="column">
              <div class="icon icon-circle-question-mark"></div>
              <!-- INFO  -->
              <div class="info">
                <div class="top">45 <span>minutes</span></div>
                <div class="bottom">Duration</div>
              </div>
            </div>

            <!-- TYPE -->
            <div class="column">
              <div class="icon icon-circle-question-mark"></div>
              <!-- INFO  -->
              <div class="info">
                <div class="top">Mock Exam</div>
                <div class="bottom">Type</div>
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
        <button class="btn btn-accent modal-btn">Start Exam</button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "startAssessmentModal",

  components: {
    modalCover,
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
    padding: toRem(30) 0 toRem(20);

    @include breakpoint-down(xs) {
      padding: toRem(20) 0 toRem(12);
    }

    .avatar {
      @include square-shape(92);
      margin-bottom: toRem(20);

      @include breakpoint-down(sm) {
        @include square-shape(86);
      }

      @include breakpoint-down(xs) {
        @include square-shape(80);
      }
    }

    .title-text {
      @include font-height(18, 25);
      margin-bottom: toRem(4);

      @include breakpoint-down(sm) {
        @include font-height(16, 22);
      }

      @include breakpoint-down(xs) {
        @include font-height(14.75, 20);
      }
    }

    .meta-text {
      @include font-height(11, 15);
      margin-bottom: toRem(30);

      @include breakpoint-down(sm) {
        @include font-height(10.5, 14);
      }
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
          font-size: toRem(16);
        }

        .info {
          .top {
            @include font-height(13.5, 18);
            color: $brand-inverse-light;
            margin-bottom: toRem(6);
            font-weight: 600;

            span {
              font-size: toRem(12);
              font-weight: normal !important;
            }
          }

          .bottom {
            @include font-height(12.5, 15);
            color: $border-grey-dark;
          }
        }
      }
    }
  }
}

.modal-cover-footer {
  @include flex-row-center-nowrap;
  margin-bottom: toRem(12);
  margin-top: toRem(8);

  @include breakpoint-down(xs) {
    margin-bottom: toRem(8);
    margin-top: toRem(4);
  }

  .btn {
    padding: toRem(13) toRem(34);

    @include breakpoint-down(xs) {
      padding: toRem(13) toRem(30) !important;
      font-size: toRem(9.75) !important;
    }
  }
}
</style>
