<template>
  <div class="post-input-block white-text-bg rounded-5 box-shadow-effect mgb-15 smooth-transition">
    <!-- POST STATE  -->
    <component
      :is="state"
      @reschedule="openPostState"
      @switchState="openPostState"
      @closeOpenState="closePostState"
    ></component>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import postCloseState from "@/modules/base/components/feed-comps/post-input-comps/post-close-state";

export default {
  name: "postInputBlock",

  components: {
    postCloseState,
    postDiscussionState: () =>
      import(
        /* webpackChunkName: "postInputState" */ "@/modules/base/components/feed-comps/post-input-comps/post-discussion-state"
      ),
    postAssessmentState: () =>
      import(
        /* webpackChunkName: "postInputState" */ "@/modules/base/components/feed-comps/post-input-comps/post-assessment-state"
      ),
    postLessonState: () =>
      import(
        /* webpackChunkName: "postInputState" */ "@/modules/base/components/feed-comps/post-input-comps/post-lesson-state"
      ),
    startLiveClassModal: () =>
      import(
        /* webpackChunkName: "postInputState" */ "@/modules/base/modals/feeds/start-live-class-modal"
      ),
    newLiveClassModal: () =>
      import(
        /* webpackChunkName: "postInputState" */ "@/modules/base/modals/feeds/new-live-class-modal"
      ),
    noSubscriptionState: () =>
      import(
        /* webpackChunkName: "postInputState" */ "@/modules/base/components/feed-comps/post-input-comps/no-subscription-state"
      ),
    noClassState: () =>
      import(
        /* webpackChunkName: "postInputState" */ "@/modules/base/components/feed-comps/post-input-comps/no-class-state"
      ),
  },

  computed: {
    ...mapGetters({
      getTeacherClassList: "general/getTeacherClassList",
      getParentChildren: "general/getParentChildren",
      getTour: "general/getTour",
    }),

    getURLQuery() {
      return ["school", "teacher"].includes(this.getAuthType)
        ? `class_id=${this.$route.params.id}`
        : `child=${this.$route.params.id}`;
    },
  },

  watch: {
    $route: {
      handler() {
        // this.getPaymentSubscriptionStatus();
      },
      immediate: true,
    },

    getTour: {
      handler(value) {
        value.step === 4 &&
        value.step_progress === "ongoing" &&
        !value.completed_tour
          ? this.openPostState("postDiscussionState")
          : false;
      },
      deep: true,
    },
  },

  data: () => ({
    state: "postCloseState",
    is_subscribed: true,
  }),

  created() {
    this.$bus.$on("schoolTourCompleted", () =>
      setTimeout(() => (this.show_tour_complete = true), 1500)
    );
  },

  methods: {
    ...mapActions({ getSubscriptionStatus: "general/getSubscriptionStatus" }),

    getPaymentSubscriptionStatus() {
      this.getSubscriptionStatus(this.getURLQuery).then((response) => {
        // console.log(response);
        this.is_subscribed = ["school", "teacher"].includes(this.getAuthType)
          ? response?.data?.status
          : response?.data?.lms;
      });
    },

    openPostState($event) {
      // TEACHER
      if (this.getAuthType === "teacher")
        this.loadState(
          $event,
          this.getTeacherClassList?.classes?.length ? true : false
        );
      // PARENT
      else if (this.getAuthType === "parent")
        this.loadState($event, this.getParentChildren?.length ? true : false);
      // SCHOOL AND CHILD
      else this.loadState($event, true);
    },

    loadState($event, connected) {
      this.state = connected
        ? this.is_subscribed
          ? $event
          : "noSubscriptionState"
        : "noClassState";
    },

    closePostState() {
      this.state = "postCloseState";
    },
  },
};
</script>

<style lang="scss" scoped>
.post-input-block {
  @include breakpoint-down(xs) {
    border-radius: toRem(5) !important;
    margin-bottom: toRem(12) !important;
  }
}
</style>
