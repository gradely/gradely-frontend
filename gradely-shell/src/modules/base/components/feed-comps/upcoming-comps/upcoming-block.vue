<template>
  <div class="upcoming-block color-mid-blue-bg rounded-5">
    <!-- TITLE TEXT  -->
    <div class="top-row d-flex justify-content-between align-items-center">
      <div class="upcoming-title-text color-white">UPCOMING ACTIVITIES</div>

      <!-- UPCOMING TOGGLER -->
      <div class="upcoming-toggler pointer" @click="toggleEvents">
        <div
          v-if="event_list.length"
          class="avatar rounded-7 calendar"
          v-animate-css="{
            classes: 'headShake',
            duration: 1150,
            iteration: 'infinite',
          }"
        >
          <div class="icon icon-event-schedule"></div>
          <div
            class="indicator rounded-circle index-1"
            v-if="event_list.length"
          ></div>
        </div>

        <div class="avatar rounded-7 calendar" v-else>
          <div class="icon icon-event-schedule"></div>
        </div>
      </div>
    </div>

    <template>
      <div class="upcoming-events smooth-animation" ref="eventsBlock">
        <template>
          <template v-if="loading">
            <upcoming-loader />
          </template>

          <template v-else>
            <template v-if="event_list.length">
              <upcoming-event
                :event="event"
                v-for="(event, index) in event_list"
                :key="index"
              />
            </template>

            <upcoming-default v-else />
          </template>
        </template>
      </div>

      <upcoming-base />
    </template>

    <!-- FINISH SETUP  -->
    <!-- <template v-if="false">
      <upcoming-setup />
    </template> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "upcomingBlock",

  components: {
    upcomingLoader: () =>
      import(
        /* webpackChunkName: "upcoming" */ "@/modules/base/components/feed-comps/upcoming-comps/upcoming-loader"
      ),
    upcomingDefault: () =>
      import(
        /* webpackChunkName: "default" */ "@/modules/base/components/feed-comps/upcoming-comps/upcoming-default"
      ),
    // upcomingSetup: () =>
    //   import(
    //     /* webpackChunkName: "upcoming" */ "@/modules/base/components/feed-comps/upcoming-comps/upcoming-setup"
    //   ),
    upcomingBase: () =>
      import(
        /* webpackChunkName: "upcoming" */ "@/modules/base/components/feed-comps/upcoming-comps/upcoming-base"
      ),
    upcomingEvent: () =>
      import(
        /* webpackChunkName: "upcoming" */ "@/modules/base/components/feed-comps/upcoming-comps/upcoming-event"
      ),
  },

  computed: {
    ...mapGetters({
      getTeacherClassList: "general/getTeacherClassList",
      getClassList: "general/getClassList",
      getParentChildren: "general/getParentChildren",
      getChildClassDetails: "general/getChildClassDetails",
    }),

    getAccountType() {
      return this.getAuthType === "school" || this.getAuthType === "teacher"
        ? "class"
        : "child";
    },
  },

  watch: {
    $route: {
      handler() {
        this.fetchUpcomungEvents();
      },
      immediate: true,
    },
  },

  data: () => ({
    loading: true,
    event_list: [],
  }),

  created() {
    this.$bus.$on("reloadUpcoming", () => this.fetchUpcomungEvents());
  },

  methods: {
    ...mapActions({
      getUpcomingEventData: "dbFeeds/getUpcomingEventData",
    }),

    fetchUpcomungEvents() {
      this.loading = true;

      // console.log(this.getAccountId());

      let payload = {
        account_id: Number(this.$route.params.id),
        account_type: this.getAccountType,
      };

      this.getUpcomingEventData(payload)
        .then((response) => {
          this.loading = false;

          response.code === 200
            ? (this.event_list = response.data.slice(0, 4))
            : (this.event_list = []);
        })
        .catch(() => {
          this.loading = false;
          this.event_list = [];
          this.pushAlert("Unable to fetch upcoming events!", "error");
        });
    },

    getAccountId() {
      if (this.getAuthType === "school") {
        return console.log(this.getClassList);
      } else if (this.getAuthType === "teacher") {
        return console.log(this.getTeacherClassList);
      } else if (this.getAuthType === "parent") {
        return console.log(this.getParentChildren);
      } else if (this.getAuthType === "student") {
        return console.log(this.getChildClassDetails);
      }
    },

    toggleEvents() {
      this.$refs.eventsBlock.classList.toggle("override-display");
    },
  },
};
</script>

<style lang="scss" scoped>
.upcoming-block {
  position: relative;
  padding: toRem(15.5);

  @include breakpoint-down(lg) {
    padding: toRem(14);
  }

  @include breakpoint-down(sm) {
    border-radius: toRem(1) !important;
    padding: toRem(13) toRem(12);
  }

  @include breakpoint-down(xs) {
    padding: toRem(18) toRem(8.75) toRem(16);
  }

  .upcoming-title-text {
    @include font-height(11.75, 17);
    margin-bottom: toRem(9);
    font-weight: 700;

    @include breakpoint-down(xs) {
      margin-bottom: toRem(2);
    }
  }

  .upcoming-toggler {
    display: none;

    @include breakpoint-down(xs) {
      display: unset;
    }

    .calendar {
      background: rgba($black-text, 0.3);
      @include square-shape(32);
      overflow: unset;

      .icon {
        @include center-placement;
        font-size: toRem(18);
      }

      .indicator {
        @include square-shape(7.25);
        background: $brand-tonic;
        position: absolute;
        top: toRem(6);
        right: toRem(6);
      }
    }
  }

  .upcoming-events {
    @include breakpoint-down(xs) {
      display: none;
    }
  }

  .override-display {
    display: unset !important;
  }
}
</style>
