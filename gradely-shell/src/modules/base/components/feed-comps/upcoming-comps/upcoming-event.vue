<template>
  <div class="upcoming-event pointer smooth-transition" @click="processEvent">
    <!-- LEFT SECTION -->
    <div class="left">
      <div class="avatar rounded-12" :class="setupIconBg">
        <div class="icon" :class="setupIconStyle"></div>
      </div>

      <!-- INFO  -->
      <div class="info mgr-8">
        <div class="title white-text">
          {{
            event.title ? $string.getCapitalizeText(event.title) : "No title"
          }}
        </div>

        <!-- META TEXT  -->
        <div class="meta-text brand-inverse-light">
          {{ getSubjectName }} • {{ getEventDate }}
        </div>
      </div>
    </div>

    <!-- RIGHT SECTION -->
    <div class="right rounded-10 pointer smooth-transition">
      <div
        class="icon icon-caret-right brand-inverse"
        v-if="isSchoolTeacher"
      ></div>

      <div
        class="icon icon-play brand-accent"
        :title="'Start ' + event.type"
        v-if="isParentStudent"
      ></div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_start_assessment_modal">
        <start-assessment-modal
          :assessment="event.reference"
          @closeTriggered="toggleStartAssessment"
        />
      </transition>

      <transition name="fade" v-if="show_start_liveclass_modal">
        <start-liveclass-modal
          :post="event"
          @closeTriggered="toggleStartLiveClass"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "upcomingEvent",

  components: {
    startAssessmentModal: () =>
      import(
        /* webpackChunkName: "startAssessmentModal" */ "@/modules/base/modals/assessments/start-assessment-modal"
      ),

    startLiveclassModal: () =>
      import(
        /* webpackChunkName: "startLiveclassModal" */ "@/modules/base/modals/assessments/start-liveclass-modal"
      ),
  },

  props: {
    event: {
      type: Object,
      default: {
        id: 1,
        title: "Event title",
        reference: {},
        date_time: "2021-11-11 12:28:00",
        type: "homework",
      },
    },
  },

  computed: {
    setupIconStyle() {
      if (
        this.event.type === "homework" ||
        this.event.type === "exam" ||
        this.event.type === "quiz"
      )
        return "icon-library brand-navy";
      else if (this.event.type === "live_class")
        return "icon-videocam brand-accent";
      else return false;
    },

    setupIconBg() {
      if (
        this.event.type === "homework" ||
        this.event.type === "exam" ||
        this.event.type === "quiz"
      )
        return "brand-inverse-light-bg";
      else if (this.event.type === "live_class") return "brand-accent-light-bg";
      else return false;
    },

    isSchoolTeacher() {
      return this.getAuthType === "school" || this.getAuthType === "teacher"
        ? true
        : false;
    },

    isParentStudent() {
      return this.getAuthType === "parent" || this.getAuthType === "student"
        ? true
        : false;
    },

    getSubjectName() {
      return this.event?.reference?.subject?.name;
    },

    getEventDate() {
      let { d3, m4, y1, h01, b2, a0 } = this.$date
        .formatDate(this.event.date_time)
        .getAll();

      return this.event.type === "live_class"
        ? `${d3} ${m4}. ${h01}:${b2} ${a0}`
        : `${d3} ${m4}, ${y1}`;
    },
  },

  data: () => ({
    show_start_assessment_modal: false,
    show_start_liveclass_modal: false,
  }),

  methods: {
    toggleStartAssessment() {
      this.show_start_assessment_modal = !this.show_start_assessment_modal;
    },

    toggleStartLiveClass() {
      this.show_start_liveclass_modal = !this.show_start_liveclass_modal;
    },

    processEvent() {
      // ACHOOL AND TEACHER TYPE
      if (this.getAuthType === "school" || this.getAuthType === "teacher") {
        // LIVE CLASS EVENT
        if (this.event.type === "live_class") this.initializeClass();
        // ASSESSMENT EVENT
        else {
          this.$router.push({
            name: "AssessmentSummaryReview",
            params: {
              id: this.$route.params.id,
              assessment_id: this.event.id,
            },
            query: { title: this.event.title },
          });
        }
      }

      // PARENT AND STUDENT TYPE
      else if (
        this.getAuthType === "parent" ||
        this.getAuthType === "student"
      ) {
        // LIVE CLASS EVENT
        if (this.event.type === "live_class") this.initializeClass();
        // ASSESSMENT EVENT
        else this.toggleStartAssessment();
      }
    },

    initializeClass() {
      if (this.event.isOwner) this.setupClassTab();
      else {
        if (this.event?.reference?.status === "ongoing") this.setupClassTab();
        else
          this.pushAlert(
            "Your class is yet to start! Check back soon.",
            "warning"
          );
      }
    },

    setupClassTab() {
      window.open(
        `/study/live-class/class-entry/${this.$route.params.id}?host=${
          this.event.isOwner ? true : false
        }&reference_id=${this.event?.reference?.id}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.upcoming-event {
  @include flex-row-between-nowrap;
  padding: toRem(10) 0;
  border-top: toRem(1) solid rgba($black-text, 0.1);
  border-bottom: toRem(1) solid rgba($black-text, 0.1);

  &:hover {
    background: rgba($black-text, 0.04);
  }

  .left {
    @include flex-row-start-nowrap;
    align-items: flex-start;
  }

  .right {
    background: rgba($black-text, 0.2);
    @include square-shape(32);
    position: relative;

    @include breakpoint-down(xs) {
      @include square-shape(34);
      border-radius: toRem(7);
    }

    .icon {
      @include center-placement;
      font-size: toRem(13);
    }

    &:hover {
      background: rgba($black-text, 0.35);
    }
  }

  .avatar {
    margin-right: toRem(10);
    @include square-shape(37);

    @include breakpoint-down(xs) {
      border-radius: toRem(7) !important;
      @include square-shape(32);
      margin-right: toRem(8);
    }

    .icon {
      @include center-placement;
      font-size: toRem(20);

      @include breakpoint-down(xl) {
        font-size: toRem(20);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(17);
      }
    }
  }

  .title {
    @include font-height(12.25, 18.5);
    margin-bottom: toRem(2);
    font-weight: 400;
  }

  .meta-text {
    @include font-height(10.4, 16);
    margin-bottom: toRem(2);
    font-weight: 400;

    @include breakpoint-down(xs) {
      @include font-height(10.85, 13);
    }
  }

  .cta-text {
    @include transition(0.4s);
    @include font-height(11.25, 16);
    font-weight: 600;
    color: $brand-accent;

    @include breakpoint-down(xl) {
      @include font-height(11.5, 16);
    }

    @include breakpoint-down(xs) {
      @include font-height(11, 15);
    }

    &:hover {
      color: $brand-inverse;
    }
  }
}
</style>
