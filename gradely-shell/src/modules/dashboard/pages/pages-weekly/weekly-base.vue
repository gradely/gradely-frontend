<template>
  <div class="gradely-app-container topnav-base-offset">
    <!-- WEEKLY INFO BANNER  -->
    <div class="weekly-info-banner brand-navy-bg w-100 h-auto">
      <div class="gradely-container px-1 px-sm-3 px-md-4 px-xl-5 mx-auto">
        <!-- TOP COLUMN  -->
        <router-link
          :to="{ name: 'DashboardHome' }"
          class="
            top-back-link
            mgb-20
            rounded-20
            pointer
            pdy-3
            pdr-20
            smooth-transition
          "
        >
          <div class="avatar">
            <div class="icon icon-caret-left"></div>
          </div>
          <!-- TEXT  -->
          <div class="text">HOME</div>
        </router-link>

        <!-- PAGE INFO TEXT  -->
        <div class="page-info-text white-text font-weight-700">
          This Week in School
        </div>
      </div>
    </div>

    <!-- SELECTIONS  -->
    <div class="gradely-container px-2 px-sm-3 mx-auto">
      <div class="weekly-selections mgb-35 overflow-auto">
        <weekly-select-card
          v-for="(weekly, index) in weeklys"
          :key="index"
          :tab="weekly"
        />
      </div>
    </div>

    <!-- CONTENT SECTION  -->
    <div class="gradely-container px-2 px-sm-3 mx-auto">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import weeklySelectCard from "@/modules/dashboard/components/weekly-comps/weekly-select-card";
export default {
  name: "weeklyBase",
  components: {
    weeklySelectCard,
  },
  computed: {},
  data() {
    return {
      weeklys: [
        {
          title: "Homework",
          style: "icon-library brand-navy",
          image: "",
          route: "WeeklyHomework",
        },
        {
          title: "Approved Exams",
          style: "icon-library brand-navy",
          image: "Exam.svg",
          route: "WeeklyExams",
        },
        {
          title: "Pending Exams",
          style: "icon-library brand-navy",
          image: "Exam.svg",
          route: "WeeklyPendingExams",
        },
        {
          title: "Live Classes",
          style: "icon-videocam brand-accent",
          image: "",
          route: "WeeklyLiveClass",
        },
        // {
        //   title: "Events",
        //   style: "icon-calendar-event color-ash",
        //   image: "",
        //   route: "WeeklyEvents",
        // },
        {
          title: "Lesson Notes",
          style: "icon-description brand-primary",
          image: "",
          route: "WeeklyLessons",
        },
        {
          title: "Discussions",
          style: "icon-discussions brand-inverse",
          image: "",
          route: "WeeklyDiscussions",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.weekly-info-banner {
  padding: toRem(30) 0;
  margin-bottom: toRem(30);

  @include breakpoint-down(md) {
    padding: toRem(25) 0 toRem(30);
  }

  @include breakpoint-down(xs) {
    padding: toRem(22) 0 toRem(27);
  }

  .top-back-link {
    background: darken($brand-navy, 4);
    @include flex-row-start-nowrap;
    color: $white-text;
    width: max-content;

    @include breakpoint-down(md) {
      margin-bottom: toRem(20) !important;
    }
    .avatar {
      @include breakpoint-down(xs) {
        @include square-shape(26);
      }
      .icon {
        @include center-placement;
        font-size: toRem(10);
        @include breakpoint-down(md) {
          font-size: toRem(9);
        }
        @include breakpoint-down(xs) {
          font-size: toRem(7);
        }
      }
    }

    .text {
      @include font-height(12, 18);
      @include breakpoint-down(md) {
        @include font-height(12, 17);
      }
      @include breakpoint-down(xs) {
        @include font-height(12, 15);
      }
    }

    &:hover {
      background: darken($brand-navy, 3);
      color: $brand-accent;

      .icon {
        color: $brand-accent !important;
      }
    }
  }
  .page-info-text {
    @include font-height(21, 32);
    margin-bottom: toRem(8);

    @include breakpoint-down(xl) {
      margin-bottom: 0;
    }

    @include breakpoint-down(md) {
      font-weight: 600 !important;
    }

    @include breakpoint-down(sm) {
      @include font-height(19, 26);
    }

    @include breakpoint-down(xs) {
      @include font-height(15, 20);
    }
  }
}
.weekly-selections {
  @include flex-row-start-nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
