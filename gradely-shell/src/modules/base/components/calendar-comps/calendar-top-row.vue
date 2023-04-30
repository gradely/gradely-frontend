<template>
  <div>
    <!-- TOP  -->
    <div class="calendar-top-row">
      <div class="left-section">
        <div class="avatar avatar-with-meta rounded-5">
          <div class="avatar-title">{{ getDateInfo.day }}</div>
          <div class="avatar-meta">{{ getDateInfo.week }}</div>
        </div>

        <!-- CURRENT DAY  -->
        <div class="current-day color-text font-weight-600">
          {{ getReadableDate }}
        </div>
      </div>

      <!-- CREATE NEW EVENT  -->
      <div class="right-section" v-if="getAuthType === 'teacher'">
        <div
          class="avatar pointer smooth-transition"
          title="Create new..."
          @click="toggleOptions"
          v-on-clickaway="hideOptions"
        >
          <div class="icon icon-plus smooth-transition"></div>

          <!-- DROPDOWN  -->
          <div
            class="
              dropdown
              white-text-bg
              rounded-5
              smooth-transition smooth-animation
              box-shadow-effect
            "
            v-if="show_more_option"
          >
            <router-link to class="item" @click.native="toggleCreateAssessment"
              >Create Assessment</router-link
            >
            <router-link to class="item" @click.native="toggleCreateLiveclass"
              >New Live Class</router-link
            >
          </div>
        </div>
      </div>
    </div>

    <!-- BOTTOM  -->
    <div class="calendar-bottom-row">
      <div class="counter font-weight-700 color-grey-dark">
        {{ total_task }} {{ total_task === 1 ? "Event" : "Events" }} due
      </div>

      <!-- FILTER EVENTS  -->
      <div
        class="filter rounded-30 smooth-transition pointer"
        @click="toggleFilter"
        v-if="false"
      >
        <div class="avatar mgr-3">
          <div class="icon icon-filter-lines smooth-transition"></div>
        </div>
        <div class="text smooth-transition">Filter</div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_create_assessment_modal">
        <create-assessment-modal
          @showStudentModal="toggleStudentModal"
          @closeTriggered="toggleCreateAssessment"
        />
      </transition>

      <transition name="fade" v-if="show_create_liveclass_modal">
        <create-liveclass-modal
          @showStudentModal="toggleStudentModal"
          @closeTriggered="toggleCreateLiveclass"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "calendarTopRow",

  components: {
    createAssessmentModal: () =>
      import(
        /* webpackChunkName: "createAssessmentModal" */ "@/modules/base/modals/assessments/create-assessment-modal"
      ),
    createLiveclassModal: () =>
      import(
        /* webpackChunkName: "createAssessmentModal" */ "@/modules/base/modals/assessments/create-liveclass-modal"
      ),
  },

  props: {
    total_task: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    ...mapGetters({
      getSelectedDate: "dbCalendar/getSelectedDate",
    }),

    getDateInfo() {
      let { d1, w2 } = this.$date.formatDate(this.getSelectedDate).getAll();
      return {
        day: d1,
        week: w2,
      };
    },

    getReadableDate() {
      let date_obj = new Date(),
        today = new Date(),
        yesterday = date_obj.setDate(date_obj.getDate() - 1),
        tomorrow = date_obj.setDate(date_obj.getDate() + 2);

      if (
        new Date(`${this.getSelectedDate}`).toDateString() ===
        today.toDateString()
      )
        return "Today";
      else if (
        new Date(`${this.getSelectedDate}`).toDateString() ===
        new Date(yesterday).toDateString()
      )
        return "Yesterday";
      else if (
        new Date(`${this.getSelectedDate}`).toDateString() ===
        new Date(tomorrow).toDateString()
      )
        return "Tomorrow";
      else {
        let { d3, m3, y1 } = this.$date
          .formatDate(this.getSelectedDate)
          .getAll();
        return `${m3} ${d3}, ${y1}`;
      }
    },
  },

  data: () => ({
    show_more_option: false,
    show_create_assessment_modal: false,
    show_create_liveclass_modal: false,
  }),

  methods: {
    toggleFilter() {},

    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    toggleCreateAssessment() {
      this.show_create_assessment_modal = !this.show_create_assessment_modal;
    },

    toggleCreateLiveclass() {
      this.show_create_liveclass_modal = !this.show_create_liveclass_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-top-row {
  @include flex-row-between-nowrap;
  margin-bottom: toRem(30);

  .left-section {
    @include flex-row-start-nowrap;

    .avatar {
      @include square-shape(44);
      margin-right: toRem(15);
      background: darken($brand-inverse-light, 10);

      @include breakpoint-down(xs) {
        @include square-shape(38);
        margin-right: toRem(10);
      }

      .avatar-title {
        @include font-height(13, 17);

        @include breakpoint-down(lg) {
          @include font-height(11.5, 17);
        }

        @include breakpoint-down(xs) {
          @include font-height(10.5, 14);
        }
      }

      .avatar-meta {
        @include font-height(10.5, 16);

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

    .current-day {
      @include font-height(18, 24);

      @include breakpoint-down(sm) {
        @include font-height(17, 24);
      }

      @include breakpoint-down(xs) {
        @include font-height(14.5, 22);
      }
    }
  }

  .right-section {
    .avatar {
      @include square-shape(40);
      background: $brand-accent;
      overflow: unset;

      @include breakpoint-down(xl) {
        @include square-shape(36);
      }

      @include breakpoint-down(lg) {
        @include square-shape(34);
      }

      @include breakpoint-down(xs) {
        @include square-shape(33);
      }

      .icon {
        @include center-placement;
        font-size: toRem(20);
        color: $brand-navy;

        @include breakpoint-down(lg) {
          font-size: toRem(18);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(16);
        }
      }

      &:hover {
        background: $brand-primary;

        .icon {
          color: $white-text;
        }
      }

      .dropdown {
        right: toRem(-5.25);
      }
    }
  }
}

.calendar-bottom-row {
  @include flex-row-between-nowrap;
  margin-bottom: toRem(13);

  .counter {
    @include font-height(12.75, 19);

    @include breakpoint-down(xs) {
      @include font-height(12, 17);
    }
  }
}
</style>
