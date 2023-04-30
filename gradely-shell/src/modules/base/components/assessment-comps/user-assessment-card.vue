<template>
  <div
    class="user-assessment-card smooth-transition"
    :class="assessment.status === 'Expired' ? 'not-allowed' : 'pointer'"
    @click="checkAssessmentState"
  >
    <!-- INFO BLOCK  -->
    <div class="info-block">
      <div class="avatar avatar-with-meta rounded-5">
        <div class="avatar-title">{{ day }}</div>
        <div class="avatar-meta">{{ month }}</div>
      </div>

      <!-- INFO  -->
      <div class="info">
        <!-- TITLE  -->
        <div class="title-text brand-primary font-weight-600 text-capitalize">
          {{ assessment.title }}
        </div>

        <!-- DESCRIPTION  -->
        <div class="description color-grey-dark">
          {{ assessment.subject.name }} •
          <span
            class="text-capitalize"
            v-if="card_type === 'new'"
            :class="getTagColor"
            >{{ assessment.tag }}</span
          >

          <span
            class="text-uppercase font-weight-600"
            :class="getStatusColor"
            v-if="card_type === 'completed'"
            >{{
              assessment.status === "Expired" ? "Missed" : "Completed"
            }}</span
          >
        </div>
      </div>
    </div>

    <!-- SCORE BLOCK  -->
    <div class="score-block" v-if="card_type !== 'new'">
      <!-- TOP  -->
      <div class="top">
        <div class="title color-text">Score</div>
        <div class="value color-grey-dark">
          {{ canSeeScore ? (assessment.score || 0) + "%" : "__" }}
        </div>
      </div>

      <!-- BOTTOM PROGRESS BAR -->
      <div class="progress position-relative rounded-5 brand-inverse-light-bg">
        <div
          class="
            progress-bar
            position-absolute
            brand-green-bg
            h-100
            smooth-transition
          "
          role="progressbar"
          :style="'width:' + (canSeeScore ? assessment.score : 0) + '%'"
        ></div>
      </div>
    </div>

    <!-- CTA BLOCK  -->
    <div class="cta-block">
      <div class="locked-link smooth-transition" v-if="is_subscribed">
        <span class="icon-lock-fill gfont-12 mgr-3"></span> Locked
      </div>

      <template v-else>
        <template v-if="assessment.status === 'Expired'">
          <div class="border-grey-dark gfont-12">No Report</div>
        </template>

        <template v-else>
          <template>
            <!-- WEB VIEW -->
            <div
              class=""
              :class="
                card_type === 'new'
                  ? 'btn open-link'
                  : canView
                  ? 'open-link'
                  : 'border-grey-dark gfont-12 open-link font-weight-400'
              "
            >
              {{
                card_type === "new"
                  ? `${accountState} ${assessment.tag}`
                  : canView
                  ? "View Report"
                  : "Pending Report"
              }}
            </div>

            <!-- MOBILE VIEW  -->
            <div
              class="open-link open-link-mobile"
              :class="
                canView && card_type === 'completed'
                  ? null
                  : 'border-grey-dark gfont-12 font-weight-400'
              "
            >
              {{
                card_type === "new"
                  ? `${accountState}`
                  : canView
                  ? "Report"
                  : "Pending"
              }}
            </div>
          </template>
        </template>
      </template>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_child_switch_modal">
        <parent-to-child-modal @closeTriggered="toggleChildSwitch" />
      </transition>

      <transition name="fade" v-if="show_start_assessment_modal">
        <start-assessment-modal
          :assessment="assessment"
          @closeTriggered="toggleStartAssessment"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "userAssessmentCard",

  components: {
    parentToChildModal: () =>
      import(
        /* webpackChunkName: "parentToChildModal" */ "@/modules/base/modals/assessments/parent-to-child-modal"
      ),
    startAssessmentModal: () =>
      import(
        /* webpackChunkName: "startAssessmentModal" */ "@/modules/base/modals/assessments/start-assessment-modal"
      ),
  },

  props: {
    is_subscribed: {
      type: Boolean,
      default: false,
    },
    card_type: {
      type: String,
      default: "new",
    },

    assessment: {
      type: Object,
      default: () => ({
        id: 1,
        title: "Assessment title...",
        subject: {
          name: "Mathematics",
        },
        close_date: "2021-10-12 11:23:00",
        tag: "homework",
        is_closed: 0,
        is_proctor: 0,
        status: "Closed",
        score: 0,
        questionCount: 0,
        questionsDuration: 0,
      }),
    },
  },

  computed: {
    getTagColor() {
      if (this.assessment.tag === "homework") return "brand-inverse";
      else if (this.assessment.tag === "exam") return "brand-tonic";
      else return "brand-accent";
    },

    getStatusColor() {
      return this.assessment.status === "Closed"
        ? "brand-accent"
        : "brand-tonic";
    },

    accountState() {
      return this.getAuthType === "parent" ? "Attempt" : "Start";
    },

    canStartAssessment() {
      return (this.hasStarted && !this.hasClosed) || this.isTaken
        ? true
        : false;
    },

    isTaken() {
      return this.assessment?.is_taken ? true : false;
    },

    hasStarted() {
      let today = new Date();
      let open_date = new Date(this.assessment?.open_date);
      let can_start = this.assessment?.can_start;
      return open_date <= today && can_start ? true : false;
    },

    hasClosed() {
      let today = new Date();
      let close_date = new Date(this.assessment?.close_date);
      let can_start = this.assessment?.can_start;
      return today >= close_date && can_start ? true : false;
    },

    getFeedBackMessage() {
      if (!this.hasStarted)
        return `You can't start this ${this.assessment?.tag} yet`;
      if (this.hasClosed) return `This ${this.assessment?.tag} already closed`;
      return `You can't take this assessment`;
    },

    canView() {
      return this.assessment?.can_see_answer || this.getAuthType != "student"
        ? true
        : false;
    },

    canSeeScore() {
      return this.assessment?.can_see_score || this.getAuthType != "student"
        ? true
        : false;
    },
  },

  data: () => ({
    account_type: null,
    progress_count: 75,
    show_child_switch_modal: false,
    show_start_assessment_modal: false,

    day: "",
    month: "",
  }),

  mounted() {
    this.account_type = this.getAuthType;
    this.setDate();
  },

  methods: {
    toggleChildSwitch() {
      this.show_child_switch_modal = !this.show_child_switch_modal;
    },

    toggleStartAssessment() {
      this.show_start_assessment_modal = !this.show_start_assessment_modal;
    },

    setDate() {
      this.day = this.$date.formatDate(this.assessment.close_date).getDay("d2");
      this.month = this.$date
        .formatDate(this.assessment.close_date)
        .getMonth("m4");
    },

    // CHECK IF ASSESSMENT IS OPEN, COMPLETED OR EXPIRED
    checkAssessmentState() {
      if (this.card_type === "completed" && !this.canView) {
        this.pushAlert("You cant view report at the moment", "warning");
        return;
      }

      if (!this.canStartAssessment && this.card_type === "new") {
        this.pushAlert(this.getFeedBackMessage, "warning");
        return;
      }

      if (this.card_type === "new") this.toggleStartAssessment();
      else {
        this.assessment.status === "Closed"
          ? this.$router.push({
              name: "AssessmentStudentReview",
              params: {
                id: this.$route.params.id,
                assessment_id: this.assessment.id,
              },
              query: { title: this.assessment.title },
            })
          : this.pushAlert("No assessment report available!", "warning");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-assessment-card {
  padding: toRem(10) toRem(6);
  border-bottom: toRem(1) solid rgba($border-grey, 0.45);
  @include flex-row-between-wrap;

  @include breakpoint-down(xl) {
    padding: toRem(10) toRem(4);
  }

  &:hover {
    background: rgba($border-grey, 0.15);
    border-radius: toRem(3.5);
  }

  .info-block {
    position: relative;
    @include flex-row-start-nowrap;
    padding-right: toRem(10);
    width: 55%;

    @include breakpoint-down(md) {
      width: 75%;
    }

    .mobile-score {
      position: absolute;
      top: 2px;
      left: calc(100% - 80px);
    }

    .avatar {
      margin-right: toRem(12);
      @include square-shape(42);

      @include breakpoint-down(lg) {
        margin-right: toRem(8);
        @include square-shape(38);
      }

      @include breakpoint-down(xs) {
        margin-right: toRem(6);
        @include square-shape(36);
      }

      .avatar-title {
        @include font-height(12, 18);

        @include breakpoint-down(lg) {
          @include font-height(11.5, 17);
        }

        @include breakpoint-down(xs) {
          @include font-height(11, 15);
        }
      }

      .avatar-meta {
        @include font-height(10.5, 16.5);

        @include breakpoint-down(lg) {
          @include font-height(10, 15);
          margin-top: toRem(-2);
        }

        @include breakpoint-down(xs) {
          margin-top: toRem(-0.5);
          @include font-height(9, 14);
        }
      }
    }

    .info {
      .title-text {
        @include font-height(12.525, 18);
        margin-bottom: toRem(1);

        @include breakpoint-down(md) {
          @include font-height(12, 17);
          margin-bottom: toRem(2.5);
        }

        @include breakpoint-down(xs) {
          @include font-height(12, 18);
        }

        span {
          @include font-height(11.5, 17);
        }
      }

      .description {
        @include font-height(11.5, 16);

        @include breakpoint-down(lg) {
          @include font-height(11.25, 15);
        }

        @include breakpoint-down(xs) {
          @include font-height(11, 14);
        }
      }
    }
  }

  .score-block {
    padding-right: toRem(10);
    width: 25%;

    @include breakpoint-down(md) {
      display: none;
    }

    .top {
      @include flex-row-between-nowrap;
      @include font-height(11.25, 17);
      margin-bottom: toRem(4);
    }

    .progress {
      height: toRem(6);
      overflow: hidden;
      margin-bottom: toRem(12);

      .progress-bar {
        left: 0;
      }
    }
  }

  .cta-block {
    @include flex-row-end-nowrap;
    width: 20%;

    .open-link,
    .locked-link {
      color: $brand-accent;
      @include font-height(12.5, 19);
      @include transition(0.4s);
      text-transform: capitalize;
      font-weight: 600;
      cursor: pointer;

      @include breakpoint-down(md) {
        @include font-height(12.25, 18);
      }

      @include breakpoint-down(xs) {
        display: none;
      }

      &:hover {
        color: $brand-inverse;
      }
    }

    .open-link-mobile {
      display: none;

      @include breakpoint-down(xs) {
        @include font-height(12, 16);
        display: unset;
      }
    }

    .btn {
      padding: toRem(8) toRem(11);
      font-size: toRem(12);
      letter-spacing: unset;
    }

    .locked-link {
      pointer-events: none;
      color: $brand-tonic;
      cursor: not-allowed;
    }
  }

  .not-allowed {
    cursor: not-allowed !important;
  }
}
</style>
