<template>
  <div
    class="post-container-block rounded-10 mgb-10 smooth-animation"
    v-if="diagnostics.length"
  >
    <img
      v-lazy="mxStaticImg('DiagnosticPanel.png', 'base')"
      alt="gradely-diagnostic"
      class="rounded-10"
    />

    <!-- CONTENT BLOCK -->
    <div class="content-block w-100 h-auto index-1 border">
      <!-- TITLE TEXT -->
      <div class="title-text brand-navy mgb-5 text-center">
        Start your journey to mastery.
      </div>

      <div class="meta-text color-text text-center">
        Complete your free pretest to begin.
      </div>

      <!-- DIAGNOSTICS ROW -->
      <div class="diagnostic-row w-100 overflow-auto">
        <diagnostic-card
          v-for="(diagnostic, index) in diagnostics"
          :key="index"
          :count="index + 1"
          :diagnostic="diagnostic"
        />
      </div>

      <!-- SCHEDULE ROW -->
      <div class="schedule-row rounded-10 color-text">
        Can’t take the test now?
        <span
          class="font-weight-600 pointer brand-navy smooth-transition"
          @click="toggleScheduleLater"
          >Schedule for Later.</span
        >
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="schedule_later_modal">
        <schedule-later-modal
          @closeTriggered="toggleScheduleLater"
          :reminders="getCatchupReminders"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "postDiagnosticsBlock",

  components: {
    diagnosticCard: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/diagnostic-card"
      ),
    scheduleLaterModal: () =>
      import(/* modal */ "@/modules/base/modals/feeds/schedule-later-modal"),
  },

  computed: {
    ...mapGetters({
      getCurrentChildToken: "general/getCurrentChildToken",
      getCatchupReminders: "general/getCatchupReminders",
    }),
  },

  watch: {
    getCurrentChildToken: {
      handler(new_token, old_token) {
        if (new_token === old_token || !new_token) return;
        this.loadCatchupReminders();
      },
      immediate: true,
    },
  },

  data: () => ({
    diagnostics: [],
    schedule_later_modal: false,
    catchup_reminders: [],
  }),

  created() {
    this.$bus.$on("modeUpdated", () => this.loadDiagnostics());
  },

  mounted() {
    setTimeout(() => this.loadDiagnostics(), 1000);
  },

  methods: {
    ...mapActions({
      getDiagnosticContent: "dbFeeds/getDiagnosticContent",
      getCatchupReminder: "general/getCatchupReminder",
    }),

    loadDiagnostics() {
      this.getDiagnosticContent(this.$route.params.id)
        .then((response) => {
          this.diagnostics = response?.data ? response.data : [];
        })
        .catch((err) => console.log(err));
    },

    toggleScheduleLater() {
      this.schedule_later_modal = !this.schedule_later_modal;
    },

    loadCatchupReminders() {
      let use_child_token = this.getAuthType === "parent" ? true : false;
      this.getCatchupReminder(use_child_token)
        .then((response) => {
          if (response.code === 200) this.catchup_reminders = response.data;
        })
        .catch((err) => {
          console.log("errror getting catchup reminders", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.post-container-block {
  img {
    @include background-cover;
    @include full-width-height;
  }

  .content-block {
    @include flex-column-center;
    padding: toRem(25) toRem(5);
    position: relative;

    @include breakpoint-down(sm) {
      padding: toRem(20) toRem(5);
    }

    @include breakpoint-down(xs) {
      padding: toRem(15) toRem(5);
    }

    .title-text {
      @include font-height(17, 29);

      @include breakpoint-down(md) {
        @include font-height(15.5, 26);
      }

      @include breakpoint-down(xs) {
        @include font-height(14.5, 24);
      }
    }

    .meta-text {
      @include font-height(12, 19);
    }

    .diagnostic-row {
      @include flex-row-start-nowrap;
      padding: toRem(30) 0 toRem(25);
      position: relative;
      overflow: auto;

      @include breakpoint-down(md) {
        padding: toRem(22) 0 toRem(25);
      }

      @include breakpoint-down(xs) {
        padding: toRem(20) 0 toRem(10);
      }

      &::-webkit-scrollbar {
        width: 0;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: transparent;
        width: 0;
      }
    }

    .schedule-row {
      background: rgba(255, 255, 255, 0.3);
      padding: toRem(6) toRem(16);
      font-size: toRem(12);

      span {
        text-decoration: underline;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
