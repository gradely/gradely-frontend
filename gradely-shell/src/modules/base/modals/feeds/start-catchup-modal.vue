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
          <div class="avatar avatar-square topic-avatar brand-inverse-light-bg">
            <img
              v-lazy="getQuestionImage"
              class="avatar-img h-100"
              :alt="getQuestionName"
            />
          </div>

          <!-- TITLE TEXT  -->
          <div class="title-text text-center white-text font-weight-600">
            {{ getQuestionName }}
          </div>

          <!-- META TEXT  -->
          <div
            class="meta-text text-center border-grey-dark text-uppercase"
            v-if="false"
          >
            Mathematics
          </div>

          <!-- INFO  -->
          <div class="info-row">
            <!-- QUESTION -->
            <div class="column">
              <div class="icon icon-circle-question-mark"></div>
              <!-- INFO  -->
              <div class="info">
                <div class="top">{{ getQuestionCount }}</div>
                <div class="bottom">Questions</div>
              </div>
            </div>

            <!-- DURATION -->
            <div class="column">
              <div class="icon icon-watch"></div>
              <!-- INFO  -->
              <div class="info">
                <!-- <div class="top">45 <span>minutes</span></div> -->
                <div class="top">{{ getDuration }}</div>
                <div class="bottom">Duration</div>
              </div>
            </div>

            <!-- TYPE -->
            <div class="column">
              <div class="icon icon-calendar"></div>
              <!-- INFO  -->
              <div class="info">
                <div class="top">{{ getQuestiontType }}</div>
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
      <div class="modal-cover-footer pdt-3">
        <button
          class="btn btn-accent modal-btn"
          ref="startBtn"
          @click="determineAction"
        >
          Start {{ isDiagnostic ? "Pretest" : "Practice" }}
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import { EXTERNAL_URL } from "@/env";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "startCatchupModal",

  components: {
    modalCover,
  },

  props: {
    detail: {
      type: Object,
    },
  },

  computed: {
    // getDueDate() {
    //   if (this.assessment?.close_date) {
    //     let { d1, m4, y1 } = this.$date
    //       .formatDate(this.assessment?.close_date)
    //       .getAll();

    //     return `${d1} ${m4}, ${y1}`;
    //   } else return "No Due Date";
    // },

    isDiagnostic() {
      // console.log(this.detail);
      return this.detail?.diagnostic ? true : false;
    },

    getQuestionName() {
      if (this.isDiagnostic) return this.detail?.name;
      else if (this.detail?.type === "single") return this.detail.topic.topic;
      else if (this.detail?.type === "mix") return this.detail.topic[0].topic;
    },

    getQuestionImage() {
      if (this.isDiagnostic) return this.detail?.image;
      else if (this.detail?.type === "single") return this.detail.topic.image;
      else if (this.detail?.type === "mix") return this.detail.topic[0].image;
    },

    getQuestionCount() {
      if (this.isDiagnostic) return 15;
      else if (this.detail?.type === "single") return 5;
      else if (this.detail?.type === "mix") return this.topic.topic.length * 3;
      else if (this.detail?.mode === "practice") {
        if (this.topic_type === "single") return 5;
        else if (this.topic_type === "mix") return this.topic.length * 3;
      }
      return 0;
    },

    getDuration() {
      let lower_duration = Math.round((this.getQuestionCount * 30) / 60);
      let upper_duration = Math.round((this.getQuestionCount * 60) / 60);
      return `${lower_duration} - ${upper_duration}`;
    },

    getQuestiontType() {
      if (this.isDiagnostic) return "Pretest";
      else if (this.detail?.type === "single") return "Single";
      else if (this.detail?.type === "mix") return "Mix";
      else return "Practice";
    },

    getTopicIds() {
      return this.detail?.type === "single"
        ? this.detail?.topic.id
        : this.detail.topic.map((item) => Number(item.id));
    },
  },

  methods: {
    ...mapActions({
      initializeDiagnostics: "dbFeeds/initializeDiagnostics",
      initializePractice: "dbFeeds/initializePractice",
    }),

    determineAction() {
      this.isDiagnostic ? this.startDiagnostics() : this.startPractice();
    },

    startDiagnostics() {
      this.handleClick("startBtn", "Starting...");

      let request_payload = {
        payload: {
          subject_id: this.detail.id,
        },
        use_child_token: this.getAuthType === "parent" ? true : false,
      };

      this.initializeDiagnostics(request_payload).then((response) => {
        let test_id = response?.data?.id;

        if (test_id) {
          this.routeToPage(test_id, "diagnostic");
        } else {
          this.handleClick("startBtn", "Start Pretest", false);
          this.pushAlert("Starting pretest failed", "warning");
        }
      });
    },

    startPractice() {
      this.handleClick("startBtn", "Starting...");

      let request_payload = {
        payload: {
          type: this.detail.type,
          topic_ids: this.getTopicIds,
          reference_type: "daily",
          reference_id: this.detail.id,
        },
        use_child_token: this.getAuthType === "parent" ? true : false,
      };

      this.initializePractice(request_payload).then((response) => {
        let test_id = response?.data?.id;

        if (test_id) {
          this.routeToPage(test_id, "daily");
        } else {
          this.handleClick("startBtn", "Start Practice", false);
          this.pushAlert("Starting practice failed", "warning");
        }
      });
    },

    routeToPage(id, type) {
      setTimeout(
        () =>
          (location.href = EXTERNAL_URL(
            "catchup",
            `/assessment-test-v2/${this.$route.params.id}/${id}?type=${type}`
          )),
        500
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
      @include square-shape(96);
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

      @include breakpoint-down(sm) {
        @include font-height(10.5, 14);
      }
    }

    .info-row {
      @include flex-row-between-nowrap;
      margin-top: toRem(30);
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
            color: $brand-inverse-light;
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
            color: $border-grey-dark;
          }
        }
      }
    }
  }
}

.modal-cover-footer {
  @include flex-column-center;
  margin-bottom: toRem(12);
  margin-top: 0;

  @include breakpoint-down(xs) {
    margin-bottom: toRem(8);
    margin-top: toRem(4);
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
