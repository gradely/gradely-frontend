<template>
  <div class="sidebar-content">
    <div class="text-title color-white font-weight-700">
      This Week in School
    </div>

    <!-- BOTTOM  -->
    <div class="bottom">
      <router-link
        :to="{ name: data.route, query: { count: data.count } }"
        class="weekly-card mgb-10 rounded-5 white-text-bg smooth-transition"
        :class="data | processWeeklyActivity(weekly_data)"
        v-for="(data, index) in weekly_data"
        :key="index"
      >
        <!-- LEFT  -->
        <div class="left">
          <!-- AVATAR  -->
          <div class="avatar mgr-10" :class="data.icon_bg">
            <img
              v-lazy="mxStaticImg(data.icon_img, 'dashboard')"
              alt=""
              v-if="data.icon_img"
            />
            <div class="icon" :class="data.icon" v-else></div>
          </div>

          <!-- TEXT  -->
          <div class="text color-text" v-if="data.text">
            <span class="font-weight-600">{{ data.count }}</span>
            {{ data.text | updateDisplayText(data.count, data.id) }}
          </div>

          <!-- EVENT TYPE  -->
          <div class="event-text-column" v-else>
            <div class="title color-text font-weight-600 mgb-1">
              {{ data.event_title }}
            </div>
            <div class="meta-text color-grey-dark">{{ data.event_meta }}</div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="right position-relative w-auto">
          <div class="icon icon-caret-right border-grey-dark"></div>
        </div>
      </router-link>

      <!-- CALENDAR -->
      <div
        class="
          calendar-link
          d-flex
          justify-content-start
          align-items-center
          flex-nowrap
          mgt-14
        "
      >
        <div class="icon-calendar brand-accent mgr-10"></div>
        <router-link
          :to="{ name: 'GradelyCalendar' }"
          class="btn-link link-no-underline font-weight-600"
          >View Calendar</router-link
        >
      </div>

      <!-- QUICK SETUP CARD -->
      <quick-setup-card />

      <!-- PREMIUM SECTION -->
      <div class="premium-section" v-if="false">
        <!-- STORAGE TEXT  -->
        <div class="storage-text brand-inverse-light">
          245 MB of storage 2 GB Used
        </div>

        <!-- PROGRESS SECTION  -->
        <div
          class="progress position-relative rounded-5 brand-inverse-light-bg"
        >
          <div
            class="
              progress-bar
              position-absolute
              brand-inverse-bg
              h-100
              smooth-transition
            "
            role="progressbar"
            :style="'width:' + progress_count + '%'"
          ></div>
        </div>

        <!-- PREMIUM CARD  -->
        <div class="premium-card rounded-12 pointer smooth-transition">
          <img v-lazy="mxStaticImg('SystemUpdate.svg', 'dashboard')" alt="" />

          <div>
            <div class="text-title brand-inverse-light font-weight-600">
              Get Premium
            </div>
            <div class="text-info brand-inverse-light">
              Upgrade now to access 20GB space, 50,000+ assessment items, 5,000+
              interactive lessons and unlimited features.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "sidebarContent",

  components: {
    quickSetupCard: () =>
      import(
        /* webpackChunkName: 'card' */ "@/modules/dashboard/components/home-comps/quick-setup-card"
      ),
  },

  filters: {
    processWeeklyActivity(value, list) {
      if (value.route === "WeeklyHomework")
        return list[2].count > 0 ? "d-none" : null;

      if (value.route === "WeeklyDiscussions")
        return list[3].count > 0 ? "d-none" : null;

      if (value.route === "WeeklyExams" && value.count == 0) return "d-none";
      if (value.route === "WeeklyPendingExams" && value.count == 0)
        return "d-none";
    },

    updateDisplayText(text, count, id) {
      if (id === 1) return text;
      if (id === 2) return count > 1 ? "Live Classes Scheduled" : text;
      if (id === 3) return count > 1 ? "Exams Scheduled" : text;
      if (id === 4) return count > 1 ? "Exams Pending Review" : text;
      if (id === 5) return count > 1 ? "Lesson Shared" : text;
      if (id === 6) return count > 1 ? "Discussions Started" : text;
    },
  },

  data: () => ({
    progress_count: 20,
    weekly_data: [
      {
        id: 1,
        icon: "icon-library brand-navy",
        icon_img: "",
        icon_bg: "brand-inverse-light-bg",
        text: "Homework Created",
        count: 0,
        route: "WeeklyHomework",
        event_title: "",
        event_meta: "",
      },
      {
        id: 2,
        icon: "icon-videocam brand-accent",
        icon_img: "",
        icon_bg: "brand-accent-light-bg",
        text: "Live Class Scheduled",
        count: 0,
        route: "WeeklyLiveClass",
        event_title: "",
        event_meta: "",
      },
      {
        id: 3,
        icon: "",
        icon_img: "Exam.svg",
        icon_bg: "brand-red-light-bg",
        text: "Exam Scheduled",
        count: 0,
        route: "WeeklyExams",
        event_title: "",
        event_meta: "",
      },
      {
        id: 4,
        icon: "",
        icon_img: "Exam.svg",
        icon_bg: "brand-red-light-bg",
        text: "Exam Pending Review",
        count: 0,
        route: "WeeklyPendingExams",
        event_title: "",
        event_meta: "",
      },
      {
        id: 5,
        icon: "icon-discussion brand-navy",
        icon_img: "",
        icon_bg: "brand-inverse-light-bg",
        text: "Discussion Started",
        count: 0,
        route: "WeeklyDiscussions",
        event_title: "",
        event_meta: "",
      },
      {
        id: 6,
        icon: "icon-file-text brand-navy",
        icon_img: "",
        icon_bg: "brand-inverse-light-bg",
        text: "Lesson Shared",
        count: 0,
        route: "WeeklyLessons",
        event_title: "",
        event_meta: "",
      },

      // {
      //   id: 6,
      //   icon: "icon-activities brand-navy",
      //   icon_img: "",
      //   icon_bg: "border-grey-light-bg",
      //   text: "Learning Activities",
      //   count: 0,
      //   route: "WeeklyDiscussions",
      //   event_title: "",
      //   event_meta: "",
      // },

      // {
      //   id: 7,
      //   icon: "icon-calendar-event color-ash",
      //   icon_img: "",
      //   icon_bg: "border-grey-bg",
      //   text: "",
      //   count: 0,
      //   route: "WeeklyEvents",
      //   event_title: "Teacher Training with Gradely",
      //   event_meta: "Mon, 15 Apr, 2021 12:30 ",
      // },
    ],
  }),

  mounted() {
    this.fetchSchoolworkActivities();
  },

  methods: {
    ...mapActions({
      getSchoolworkActivities: "dbHome/getAllSchoolWorkActivities",
    }),

    fetchSchoolworkActivities() {
      this.getSchoolworkActivities()
        .then((response) => {
          let { data } = response;

          this.setupCounters(
            data.all_homework,
            data.live_class_sessions,
            data.all_exam,
            data.exam_pending_review,
            data.lesson_note_shared
          );
          // data.discussion
          // this.weekly_data.pop();
        })
        .catch(() => this.setupCounters(0, 0, 0, 0, 0, 0));
    },

    setupCounters(homework, liveclass, exam, pending_exam, lesson, discussion) {
      this.weekly_data[0].count = homework;
      this.weekly_data[1].count = liveclass;
      this.weekly_data[2].count = exam;
      this.weekly_data[3].count = pending_exam;
      this.weekly_data[4].count = lesson;
      // this.weekly_data[5].count = discussion;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-content {
  padding: 20px 20px 20px;

  @include breakpoint-down(xl) {
    padding: 20px 12px 40px;
  }

  @include breakpoint-down(lg) {
    padding: 20px 8px 40px;
  }

  @include breakpoint-down(md) {
    padding: 20px 20px 40px;
  }

  @include breakpoint-down(xs) {
    padding: 20px 10px 40px;
  }

  .text-title {
    @include font-height(13, 19);
    margin-bottom: 24px;

    @include breakpoint-down(lg) {
      font-weight: 500;
      @include font-height(12.5, 18);
    }

    @include breakpoint-down(xs) {
      @include font-height(11.5, 17);
    }
  }

  .weekly-card {
    @include flex-row-between-nowrap;
    padding: 10px 10px;

    @include breakpoint-down(xl) {
      padding: 10px 8px;
    }

    @include breakpoint-down(lg) {
      padding: 9px 6.5px;
    }

    @include breakpoint-down(md) {
      padding: 10px;
    }

    @include breakpoint-down(xs) {
      padding: 10px 8px;
    }

    &:hover {
      transform: scale(1.02);
    }

    .left {
      @include flex-row-start-nowrap;
      min-width: max-content;

      .avatar {
        @include breakpoint-down(xl) {
          margin-right: 7px !important;
        }

        @include breakpoint-down(lg) {
          @include square-shape(30);
        }

        @include breakpoint-down(md) {
          @include square-shape(32);
          margin-right: 10px !important;
        }

        @include breakpoint-down(xs) {
          @include square-shape(30);
          margin-right: 8px !important;
        }

        .icon,
        img {
          @include center-placement;
          font-size: 17px;

          @include breakpoint-down(lg) {
            font-size: 16px;
          }

          @include breakpoint-down(md) {
            font-size: 18px;
          }
        }

        img {
          @include square-shape(17);

          @include breakpoint-down(lg) {
            @include square-shape(15);
          }

          @include breakpoint-down(md) {
            @include square-shape(17);
          }
        }
      }

      .text {
        @include font-height(12.75, 18);

        @include breakpoint-down(xl) {
          @include font-height(12.5, 18);
        }

        @include breakpoint-down(lg) {
          @include font-height(12, 17);
        }

        @include breakpoint-down(md) {
          @include font-height(13, 18);
        }

        @include breakpoint-down(xs) {
          @include font-height(12, 17);
        }
      }

      .event-text-column {
        .title {
          @include font-height(14, 19);

          @include breakpoint-down(xl) {
            font-weight: 500;
            @include font-height(12, 17);
          }

          @include breakpoint-down(lg) {
            @include font-height(10.75, 16);
          }

          @include breakpoint-down(md) {
            @include font-height(11.5, 17);
          }
        }

        .meta-text {
          @include font-height(11.75, 16);

          @include breakpoint-down(xl) {
            @include font-height(10, 14);
          }

          @include breakpoint-down(lg) {
            @include font-height(9.5, 13);
          }

          @include breakpoint-down(md) {
            @include font-height(10.5, 14);
          }

          @include breakpoint-down(xs) {
            @include font-height(10.25, 14);
          }
        }
      }
    }

    .right {
      .icon {
        font-size: 12.5px;

        @include breakpoint-down(xl) {
          font-size: 12.75px;
        }

        @include breakpoint-down(lg) {
          font-size: 12px;
        }
      }
    }
  }

  .calendar-link {
    width: max-content;
    margin-bottom: toRem(65);

    .icon-calendar {
      font-size: 17px;
    }

    .btn-link {
      color: $white-text;
      font-size: 11px !important;

      &:hover {
        color: $brand-accent !important;
      }
    }
  }

  // PREMIUM SECTION
  .premium-section {
    border-top: toRem(1) solid rgba(0, 0, 0, 0.2);
    padding-top: toRem(20);
    margin-top: toRem(45);

    .storage-text {
      @include font-height(12.5, 17);
      margin-bottom: toRem(10);

      @include breakpoint-down(xl) {
        @include font-height(12.25, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(12, 18);
      }
    }

    .progress {
      height: toRem(6);
      overflow: hidden;
      margin-bottom: toRem(12);

      .progress-bar {
        left: 0;
      }
    }

    .premium-card {
      @include flex-row-start-nowrap;
      align-items: flex-start;
      background: rgba(0, 0, 0, 0.4);
      padding: toRem(12);

      &:hover {
        background: rgba(0, 0, 0, 0.5);
      }

      img {
        @include square-shape(38);
        margin-right: toRem(10);

        @include breakpoint-down(xl) {
          @include square-shape(38);
        }

        @include breakpoint-down(xs) {
          @include square-shape(34);
        }
      }

      .text-title {
        @include font-height(14, 19);
        margin-bottom: toRem(5);

        @include breakpoint-down(xl) {
          @include font-height(14, 19);
        }

        @include breakpoint-down(xs) {
          @include font-height(13, 18);
        }
      }

      .text-info {
        @include font-height(11.5, 21);

        @include breakpoint-down(xl) {
          @include font-height(11, 19);
        }

        @include breakpoint-down(md) {
          @include font-height(12.45, 22);
        }
      }
    }
  }
}
</style>
