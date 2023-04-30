<template>
  <div class="post-thread">
    <!-- NAV BUILD -->
    <nav-sub-build v-if="getAuthToken" />
    <unauthorized-nav v-else />

    <div
      class="gradely-app-container topnav-offset"
      :class="getAuthToken ? 'header-auth-attach' : 'header-attach'"
    >
      <div class="gradely-container mx-auto">
        <div class="gradely-row w-100 mx-auto">
          <!-- CONTENT VIEW  -->
          <div class="content-view mx-auto">
            <!-- CONTENT BLOCK  -->
            <div class="feed-timeline-row smooth-animation">
              <!-- CONTENT  -->
              <div class="timeline mgb-30">
                <!-- POST CONTENT  -->
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

                  <!-- NO INTERNET BLOCK -->
                  <template v-if="network_related">
                    <no-internet-block
                      :key="$string.generateRandomString(10)"
                    />
                  </template>
                </template>
              </div>

              <!-- UPCOMING BLOCK  -->
              <div class="upcoming fixed-upcoming" ref="upcoming" v-if="false">
                <!-- <upcoming-block /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- UNAUTHORIZED BLOCK -->
    <unauthorized-banner v-if="!getAuthToken" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import navSubBuild from "@/shared/components/nav-sub-build";
import postSkeleton from "@/modules/base/components/feed-comps/post-block-comps/post-skeleton";

export default {
  name: "postThread",

  components: {
    navSubBuild,
    postSkeleton,
    // upcomingBlock: () =>
    //   import(
    //     /* FeedEntry */ "@/modules/base/components/feed-comps/upcoming-comps/upcoming-block"
    //   ),
    postBlock: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/post-block"
      ),
    unauthorizedBanner: () =>
      import(/* FeedEntry */ "@/modules/base/modals/feeds/unauthorized-banner"),
    unauthorizedNav: () =>
      import(/* FeedEntry */ "@/shared/components/nav-comps/unauthorized-nav"),
  },

  data() {
    return {
      is_fetching: true,
      posts: [],
      page: 1,
      page_end: 0,
      skeleton_count: 2,
      network_related: false,
    };
  },

  mounted() {
    this.fetchFeedThread();
  },

  methods: {
    ...mapActions({ getFeedThread: "dbFeeds/getFeedThread" }),

    fetchFeedThread() {
      this.posts = [];

      this.getFeedThread(this.$route.params.token)
        .then((response) => {
          if (response.code === 200) {
            this.posts.push(response.data);
            this.is_fetching = false;
          } else this.posts = [];
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.header-auth-attach {
  @include breakpoint-down(xs) {
    top: toRem(54) !important;
  }
}

.header-attach {
  @include breakpoint-down(xs) {
    top: toRem(68) !important;
  }
}

.feed-timeline-row {
  @include flex-row-center-wrap;
  align-items: flex-start;

  .timeline {
    position: relative;
    width: 62%;
    margin-bottom: toRem(100) !important;

    @include breakpoint-down(md) {
      width: 100%;
      order: 2;
    }

    @include breakpoint-down(xs) {
      margin-bottom: toRem(140) !important;
    }
  }

  .fixed-upcoming {
    position: fixed;
    width: toRem(360);
    left: 59%;

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