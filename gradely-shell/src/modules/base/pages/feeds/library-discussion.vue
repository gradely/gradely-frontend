<template>
  <div class="gradely-container library-container mx-auto p-sm-3">
    <div class="title-row">
      <!-- LEFT -->
      <div class="left">
        <div class="avatar brand-green-light-bg">
          <div class="icon icon-chats-circle brand-green"></div>
        </div>

        <!-- TITLE -->
        <div>
          <div class="title font-weight-600 color-text">
            Discussions
            <span class="font-weight-400">({{ posts.length }})</span>
          </div>

          <div class="meta-text color-grey-dark mgt-4">
            Find discussions shared in your class here.
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="right" v-if="false">
        <div class="filter white-text-bg rounded-30 smooth-transition pointer">
          <div class="avatar mgr-3">
            <div class="icon icon-filter-lines smooth-transition"></div>
          </div>
          <div class="text smooth-transition">Filter</div>
        </div>
      </div>
    </div>

    <!-- CONTENT BLOCK  -->
    <div class="feed-timeline-row smooth-animation">
      <!-- CONTENT  -->
      <div class="timeline mgb-30">
        <transition-group name="fade" mode="in-out">
          <!-- POST CONTENT  -->
          <template v-if="post_view === 'feed'">
            <!-- POST LAZY LOADER  -->
            <template v-if="is_fetching">
              <post-skeleton
                :key="index"
                v-for="(_, index) in skeleton_count"
              />
            </template>

            <!-- POST CONTENT STATE -->
            <template v-else>
              <!-- CONTENT STATE  -->
              <template v-if="posts.length">
                <post-block
                  :key="index"
                  v-for="(post, index) in posts"
                  :post="post"
                />
              </template>

              <default-skeleton-loader
                v-if="!network_related && !posts.length"
                :empty_state="empty_state"
                :loading_state="is_fetching"
                :empty="{
                  title: 'No Discussions',
                  message:
                    'You currently do not have any library discussion available!',
                }"
                :cta="{
                  has_cta: false,
                  cta_text: '',
                }"
                :key="$string.generateRandomString(10)"
              />

              <!-- NO INTERNET BLOCK -->
              <template v-if="network_related && !posts.length">
                <no-internet-block :key="$string.generateRandomString(10)" />
              </template>
            </template>
          </template>
        </transition-group>

        <!-- VISIBILITY OBSERVER LOADER  -->

        <template v-if="!infinite_scroll_end || is_fetching">
          <post-skeleton
            v-if="posts.length && post_view === 'feed'"
            v-observe-visibility="{
              callback: fetchMorePost,
              throttle: 300,
            }"
          />
        </template>
      </div>

      <!-- UPCOMING BLOCK  -->
      <div class="upcoming fixed-upcoming" ref="upcoming">
        <feed-discussion-filter
          :entry_class="Number($route.params.id)"
          @classSwitched="class_id = $event"
          @filter="filter = $event"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import postSkeleton from "@/modules/base/components/feed-comps/post-block-comps/post-skeleton";

export default {
  name: "feedTimeline",

  metaInfo: {
    title: "Feeds",
  },

  components: {
    postSkeleton,
    upcomingBlock: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/upcoming-comps/upcoming-block"
      ),
    postBlock: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/post-block"
      ),
    noInternetBlock: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/no-internet-block"
      ),
    defaultSkeletonLoader: () =>
      import(/* FeedEntry */ "@/shared/components/default-skeleton-loader"),

    feedDiscussionFilter: () =>
      import(
        /* FeedEntry */ "@/modules/dashboard/components/teacher-comps/feed-discussion-filter"
      ),
  },

  data() {
    return {
      infinite_scroll_end: false,
      is_fetching: true,
      empty_state: false,

      posts: [],
      page: 1,
      page_end: 0,
      is_search: false,
      skeleton_count: 2,
      filter: "",
      class_id: "",

      post_view: "feed",
      starter_intro: {
        name: "Gradely",
        description: "Welcome to class",
        type: "gradely",
      },

      network_related: false,
      show_end_liveclass_modal: false,

      can_start: true,
      can_start_timeout: null,
      timeout: null,
    };
  },

  watch: {
    $route: {
      handler() {
        this.post_view =
          this.$route.query.view === "library" ? "library" : "feed";

        this.resetAndFetchPost();
      },
      immediate: true,
    },

    class_id: {
      handler() {
        this.getNewFilteredPosts();
      },
    },

    filter: {
      handler() {
        this.getNewFilteredPosts();
      },
    },
  },

  created() {
    this.$bus.$on("extractDeletedPost", (post_id) =>
      this.filterOutDeletedPost(post_id)
    );

    this.$bus.$on("reloadFeeds", () => this.resetAndFetchPost());

    // CHECK IF LIVE CLASS MEETING HAS ENDED
    if (this.$route.query.class_ended) {
      this.toggleEndLiveClassRating();
    }
  },

  methods: {
    ...mapActions({
      getFeedsData: "dbFeeds/getFeedsData",
    }),

    resetCanStart() {
      this.can_start = false;
      if (this.can_start_timeout) clearTimeout(this.can_start_timeout);
      this.can_start_timeout = setTimeout(() => {
        this.can_start = true;
      }, 1300);
    },

    deferredSearch(custom_payload) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.fetchLatestPost(custom_payload);
      }, 1300);
    },

    getNewFilteredPosts() {
      this.resetCanStart();

      let payload = {
        type: "post",
        search: true,
      };

      this.resetAndFetchPost(payload);
    },

    resetAndFetchPost(custom_payload = null) {
      this.posts = [];
      this.page = 1;
      this.page_end = 0;
      this.infinite_scroll_end = false;
      this.is_fetching = true;

      this.can_start
        ? this.fetchLatestPost(custom_payload)
        : this.deferredSearch(custom_payload);
    },

    fetchLatestPost(custom_payload = null) {
      // let entry_timestamp = this.getAuthUser.entry_timestamp;
      // let current_timestamp = Math.round(new Date().getTime() / 1000);
      // let entry_range = current_timestamp - entry_timestamp;

      let payload = custom_payload ?? {
        account_id: Number(this.$route.params.id),
        type: "post",
      };

      payload.filter = this.filter;
      payload.account_id = this.class_id || Number(this.$route.params.id);

      this.getFeedsData(payload)
        .then((response) => {
          if (response.code === 200) {
            this.is_fetching = false;

            if (!response?.data?.length) {
              if (!this.posts?.length) this.errorState();
              else
                this.pushAlert(
                  "You've reached the end of class discussion",
                  "warning"
                );
              return;
            }

            // this.page_end = response.pagination.pageCount;

            // if (entry_range < 32) this.posts = response.data;
            else this.posts.push(...response.data);

            // console.log(this.posts);
          }

          // NON 200 RESPONSES
          else this.errorState();
        })
        .catch(() => {
          setTimeout(() => {
            this.errorState();
            this.network_related = true;
          }, 2000);
        });
    },

    errorState() {
      this.posts = [];
      this.page = 1;
      this.is_fetching = false;
      this.empty_state = true;
    },

    fetchMorePost(isVisible) {
      if (!isVisible) return; // CHECK SCROLLING VISIBILITY
      this.resetCanStart();

      // // CHECK IF PAGE IS EQAUL TO PAGE COUNT
      // if (this.page === this.page_end) {
      //   this.infinite_scroll_end = true;
      //   return;
      // }

      // this.page += 1; //INCREASE PAGE NUMBER
      // this.is_search = true;
      let page_end = this.posts.length - 1;
      let page = this.posts[page_end]?.id ?? "";

      let payload = {
        account_id: Number(this.$route.params.id),
        type: "post",
        page,
        search: true,
      };

      this.fetchLatestPost(payload);
    },

    filterOutDeletedPost(id) {
      setTimeout(
        () => (this.posts = this.posts.filter((post) => post.id !== id)),
        1500
      );
    },

    toggleEndLiveClassRating() {
      this.show_end_liveclass_modal = !this.show_end_liveclass_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.feed-timeline-row {
  @include flex-row-between-wrap;
  align-items: flex-start;

  .timeline {
    width: 60%;

    @include breakpoint-down(xl) {
      width: 61.5%;
    }

    @include breakpoint-down(lg) {
      width: 62%;
    }

    @include breakpoint-down(md) {
      width: 100%;
      order: 2;
      margin-bottom: toRem(-10) !important;
    }
  }

  .upcoming {
    width: 37.45%;
    top: unset;

    @include breakpoint-down(xl) {
      width: 35.5%;
    }

    @include breakpoint-down(lg) {
      width: 100%;
      order: 1;
      margin-bottom: toRem(17);
    }
  }

  .fixed-upcoming {
    position: fixed;
    width: toRem(335);
    left: 58.25%;

    @include breakpoint-down(xl) {
      width: toRem(305);
      left: 60.25%;
    }

    @include breakpoint-custom-down(1080) {
      width: toRem(300);
      left: 61.5%;
    }

    @include breakpoint-custom-down(1020) {
      width: toRem(315);
    }

    @include breakpoint-down(lg) {
      width: toRem(330);
      left: unset;
      right: 2.25%;
    }

    @include breakpoint-custom-down(940) {
      width: toRem(300);
    }

    @include breakpoint-custom-down(860) {
      width: toRem(280);
    }

    @include breakpoint-custom-down(780) {
      width: toRem(270);
    }

    @include breakpoint-down(md) {
      position: unset;
      order: 1;
      width: 100%;
    }
  }
}
</style>
