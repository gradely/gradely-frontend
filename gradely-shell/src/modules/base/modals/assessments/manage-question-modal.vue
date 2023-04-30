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
          <!-- TOP TEXT  -->
          <div class="top-text brand-accent-light text-center">
            Manage Question
          </div>

          <!-- BOTTOM TEXT  -->
          <div
            class="bottom-text white-text font-weight-600 text-center text-uppercase"
          >
            {{ assessment.title }}
          </div>

          <!-- DATE DURATION  -->
          <div class="date-duration">
            <!-- START DATE  -->
            <div class="column">
              <div class="top">
                <div class="icon icon-clock"></div>
                <div class="text">Start Date</div>
              </div>

              <div class="bottom">
                {{ getStartDate }}
              </div>
            </div>

            <!-- END DATE  -->
            <div class="column">
              <div class="top">
                <div class="icon icon-clock"></div>
                <div class="text">End Date</div>
              </div>

              <div class="bottom">{{ getEndDate }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgt-10">
        <div class="info-text text-center color-ash">
          To manage this question, click on
          <span class="font-weight-600">"Proceed to LMS"</span> to access the
          LMS!
        </div>

        <button class="btn btn-accent modal-btn mgt-20 mgb-15">
          Proceed to LMS
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "manageQuestionModal",

  components: {
    modalCover,
  },

  props: {
    assessment: {
      type: Object,
    },
  },

  computed: {
    getStartDate() {
      let { d3, m4, y1 } = this.$date
        .formatDate(this.assessment.open_date)
        .getAll();
      return `${m4} ${d3}, ${y1}`;
    },

    getEndDate() {
      let { d3, m4, y1 } = this.$date
        .formatDate(this.assessment.close_date)
        .getAll();
      return `${m4} ${d3}, ${y1}`;
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
    padding: toRem(25) 0 toRem(20);

    .top-text {
      @include font-height(10.5, 15);
      margin-bottom: toRem(12);

      @include breakpoint-down(xs) {
        @include font-height(10.25, 15);
      }
    }

    .bottom-text {
      @include font-height(17, 24);
      letter-spacing: 0.025em;
      width: 70%;

      @include breakpoint-down(xs) {
        @include font-height(14, 24);
        width: 88%;
      }
    }

    .date-duration {
      @include flex-row-center-nowrap;
      margin-top: toRem(30);

      .column {
        margin: 0 toRem(15);

        .top {
          @include flex-row-start-nowrap;
          margin-bottom: toRem(4);
          color: $brand-accent;

          .icon {
            font-size: toRem(12);
            margin-right: toRem(5);
          }

          .text {
            font-size: toRem(9.5);
          }
        }

        .bottom {
          @include font-height(11, 14);
          color: $color-white;

          @include breakpoint-down(xs) {
            @include font-height(10.75, 14);
          }
        }
      }
    }
  }
}

.modal-cover-body {
  @include flex-column-center;
  justify-content: flex-start;

  .info-text {
    @include font-height(12.75, 21);
    width: 70%;

    @include breakpoint-down(xs) {
      @include font-height(12, 20);
      width: 85%;
    }
  }
}
</style>
