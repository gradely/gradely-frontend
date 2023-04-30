<template>
  <div class="gradely-app-container topnav-base-offset">
    <!-- SCHOOL BANNER  -->
    <school-banner />

    <div
      class="
        gradely-container
        px-1 px-sm-3 px-md-4 px-xl-5
        mx-auto
        smooth-animation
      "
    >
      <!-- REQUEST CALL COLUMN -->
      <trial-alert-card v-if="false" />

      <book-meeting-card
        v-if="show_book_meeting"
        @closeMeeting="show_book_meeting = false"
      />

      <!-- BOTTOM -->
      <div class="school-info-section">
        <!-- SIDE BAR -->
        <div
          class="left rounded-12 color-mid-blue-bg position-relative"
          :class="show_tour_cover ? 'tour-index' : null"
        >
          <!-- DEFAULT VIEW -->
          <template v-if="loading">
            <transition name="fade">
              <sidebar-skeleton />
            </transition>
          </template>

          <template v-else>
            <transition name="fade">
              <sidebar-default v-if="has_pending_activity" />
              <sidebar-content v-else />
            </transition>
          </template>
        </div>

        <!-- CLASS LEVELS -->
        <div class="right">
          <div class="top-row mgb-25 pt-1">
            <div class="title-text font-weight-600 color-text">My Classes</div>

            <!-- ADD CLASS  -->
            <button class="btn btn-accent position-relative" v-if="false">
              <div class="icon-plus position-absolute gfont-18"></div>
              <div class="text">Class</div>
            </button>
          </div>

          <!-- BOTTOM ROW  -->
          <div class="bottom-row">
            <template v-if="loading_class_level">
              <school-class-level-skeleton />
            </template>

            <template v-else>
              <school-class-level
                v-for="(level, index) in class_levels"
                :key="index"
                :class_index="index"
                :class_level="level.name"
                :class_branch="level.classes"
              />
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_tour_modal">
        <start-tour-modal @closeTriggered="toggleTourModal" />
      </transition>

      <transition name="fade" v-if="show_tour_cover">
        <tour-cover />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DashboardHome",

  metaInfo: {
    title: "School Dashboard",
  },

  components: {
    schoolBanner: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "DashboardEntry" */ "@/modules/dashboard/components/home-comps/school-banner"
      ),
    sidebarDefault: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "DashboardEntry" */ "@/modules/dashboard/components/home-comps/sidebar-default"
      ),
    sidebarSkeleton: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "default" */ "@/modules/dashboard/components/home-comps/sidebar-skeleton"
      ),
    trialAlertCard: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "DashboardEntry" */ "@/modules/dashboard/components/home-comps/trial-alert-card"
      ),
    bookMeetingCard: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "DashboardEntry" */ "@/modules/dashboard/components/home-comps/book-meeting-card"
      ),
    sidebarContent: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "DashboardEntry" */ "@/modules/dashboard/components/home-comps/sidebar-content"
      ),
    schoolClassLevelSkeleton: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "default" */ "@/modules/dashboard/components/home-comps/school-class-level-skeleton"
      ),
    schoolClassLevel: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "DashboardEntry" */ "@/modules/dashboard/components/home-comps/school-class-level"
      ),
    startTourModal: () =>
      import(
        /* webpackChunkName: 'modal' */ "@/modules/dashboard/modals/start-tour-modal"
      ),
    tourCover: () =>
      import(/* webpackChunkName: "modal" */ "@/shared/components/tour-cover"),
  },

  computed: {
    ...mapGetters({ getTour: "general/getTour" }),

    watchTour() {
      const { tour_completed, tour_step } = this;
      return {
        tour_completed,
        tour_step,
      };
    },
  },

  watch: {
    $route: {
      handler(value) {
        if (value?.query?.self_initiated) {
          this.show_tour_modal = true;
          window.scrollTo(0, 0);
        }
      },
      immediate: true,
    },

    watchTour: {
      handler() {
        setTimeout(() => {
          if (!this.tour_completed && this.tour_step === 1) {
            if (this.self_initiated_tour) {
              this.show_tour_modal = true;
              window.scrollTo(0, 0);
            } else if (!this.has_teachers) {
              this.show_tour_modal = true;
              window.scrollTo(0, 0);
            }
          } else this.show_tour_modal = false;
        }, 700);
      },
    },

    getTour: {
      handler(value) {
        if (
          value.step === 2 &&
          value.step_progress === "ongoing" &&
          !value.completed_tour
        ) {
          this.show_tour_cover = true;
          setTimeout(() => window.scrollTo(0, 150), 300);
        } else this.show_tour_cover = false;
      },
      deep: true,
    },
  },

  data: () => ({
    show_book_meeting: true,

    show_tour_modal: false,
    tour_completed: true,
    tour_step: 0,

    loading: true,
    has_pending_activity: false,

    loading_class_level: true,
    class_levels: [],

    show_tour_cover: false,
    has_teachers: true,
    self_initiated_tour: false,
  }),

  created() {
    this.schoolHasTeachers();
    this.$bus.$on("reloadClasses", () => this.fetchSchoolClasses());
  },

  mounted() {
    this.fetchSchoolActivity();
    this.fetchSchoolClasses();
    setTimeout(() => this.initiateSchoolTour(), 1000);
  },

  methods: {
    ...mapActions({
      getSchoolActivity: "dbHome/getSchoolActivityStatus",
      getSchoolClasses: "dbHome/getSchoolClasses",
      getFeatureLogger: "general/getFeatureLogger",
      getMultipleFeatureLogs: "general/getMultipleFeatureLogs",
      getTeachers: "dbTeacher/getSchoolTeachers",
    }),

    // LOAD SCHOOL TEACHERS
    schoolHasTeachers(page = 1, search = false) {
      this.getTeachers({ page, search })
        .then((response) => {
          if (response.code === 200)
            this.has_teachers = response.data.length ? true : false;
          // EMPTY RESPONSE
          else if (response.code === 204) this.has_teachers = false;
          // 4** AND 5** RESPONSE
          else this.has_teachers = true;
        })
        .catch(() => (this.has_teachers = true));
    },

    toggleTourModal() {
      this.show_tour_modal = !this.show_tour_modal;
    },

    // INITIALIZE USER SCHOOL TOUR
    initiateSchoolTour() {
      this.getMultipleFeatureLogs(["tour_completed", "tour_step"]).then(
        (response) => {
          let [completed, step] = response?.data;
          this.tour_completed = completed.value === "true" ? true : false;
          this.tour_step = step.value ? +step.value : 1;
        }
      );
    },

    // FETCH ALL SCHOOL TODO STATUS
    fetchSchoolActivity() {
      this.loading = true;

      this.getSchoolActivity()
        .then((response) => {
          if (response.code === 200) {
            this.loading = false;
            this.has_pending_activity = response.data.teacher ? false : true;
          } else this.setupSummaryDefaultState();
        })
        .catch(() => this.setupSummaryDefaultState());
    },

    // SETUP DEFAULT STATE FOR SCHOOL ACTIVTY
    setupSummaryDefaultState() {
      this.loading = false;
      this.has_pending_activity = false;
    },

    // FETCH ALL SCHOOL LEVEL CLASSES
    fetchSchoolClasses() {
      this.setupClassDefaultState();

      this.getSchoolClasses()
        .then((response) => {
          response.code === 200
            ? this.setupClassDefaultState(false, response.data)
            : this.setupClassDefaultState();
        })
        .catch(() => this.setupClassDefaultState());
    },

    // SETUP DEFAULT STATE FOR SCHOOL CLASSES
    setupClassDefaultState(loading = true, levels = []) {
      this.loading_class_level = loading;
      this.class_levels = levels;

      if (this.class_levels.length) this.sortClassLevels(levels);
    },

    sortClassLevels(levels) {
      this.class_levels = [];

      let primary = []; // ID FROM 1 TO 6
      let secondary = []; // ID FROM 7 TO 12
      let others = []; // ID FROM 13 UPWARDS

      levels.map((level) => {
        if (level.id <= 6) primary.push(level);
        else if (level.id >= 7 && level.id <= 12) secondary.push(level);
        else if (level.id >= 13) others.push(level);
      });

      this.class_levels = [
        ...secondary.slice().reverse(),
        ...primary.slice().reverse(),
        ...others.slice().reverse(),
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.school-info-section {
  @include flex-row-between-nowrap;
  align-items: flex-start;

  @include breakpoint-down(md) {
    @include flex-row-between-wrap;
  }

  .left {
    width: 32.5%;

    @include breakpoint-down(xl) {
      width: 34%;
    }

    @include breakpoint-down(lg) {
      width: 36.5%;
    }

    @include breakpoint-down(md) {
      width: 100%;
      margin-bottom: toRem(30);
    }

    @include breakpoint-down(sm) {
      border-radius: toRem(8) !important;
    }
  }

  .right {
    width: 65.5%;

    @include breakpoint-down(xl) {
      width: 64%;
    }

    @include breakpoint-down(lg) {
      width: 61.5%;
    }

    @include breakpoint-down(md) {
      width: 100%;
    }

    .top-row {
      @include flex-row-between-nowrap;

      .title-text {
        @include font-height(16, 20);

        @include breakpoint-down(md) {
          @include font-height(15, 17);
        }

        @include breakpoint-down(sm) {
          @include font-height(15.25, 16);
        }
      }

      .btn {
        padding: toRem(8) toRem(19);

        @include breakpoint-down(lg) {
          padding-bottom: toRem(10);
          padding-right: toRem(20);
        }

        @include breakpoint-down(sm) {
          @include square-shape(32);
          border-radius: 50%;
          position: relative;
          padding: toRem(5);
        }

        .icon-plus {
          left: toRem(17);
          @include center-y;

          @include breakpoint-down(lg) {
            left: toRem(22);
          }

          @include breakpoint-down(sm) {
            font-size: toRem(16);
            margin-top: toRem(1);
            @include center-placement;
          }
        }

        .text {
          @include font-height(11, 19);
          margin-left: toRem(20);

          @include breakpoint-down(lg) {
            @include font-height(11, 18);
          }

          @include breakpoint-down(sm) {
            display: none;
          }
        }
      }
    }
  }
}
</style>
