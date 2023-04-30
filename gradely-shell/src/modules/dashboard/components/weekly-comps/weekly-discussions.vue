<template>
  <div class="weekly-discussions">
    <div class="weekly-title-row">
      <!-- TEXT  -->
      <div class="text">Discussions this week</div>

      <!-- PRINT BUTTON  -->
      <button class="btn btn-whitish" v-if="false">
        <div class="text">Print</div>
        <div class="avatar">
          <div class="icon icon-printer"></div>
        </div>
      </button>
    </div>

    <!-- CONTENT  -->
    <div class="content-area">
      <!-- FILTER BLOCK  -->
      <div class="filter-block">
        <weekly-discussion-filter
          @filterClass="filterByClass"
          @filterList="filterByList"
          :clear_selection="clear_selection"
        />
      </div>

      <!-- DISCUSSION POST BLOCK  -->
      <div class="position-relative discussion-block">
        <transition-group name="fade" mode="in-out">
          <!-- POST CONTENT  -->
          <template>
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

              <template v-else>
                <div key="empty-10">
                  <post-skeleton
                    :key="index"
                    :loading_state="false"
                    v-for="(_, index) in skeleton_count"
                  />
                </div>
              </template>

              <!-- NO INTERNET BLOCK -->
              <template v-if="network_related">
                <no-internet-block :key="$string.generateRandomString(10)" />
              </template>
            </template>
          </template>
        </transition-group>

        <!-- VISIBILITY OBSERVER LOADER  -->

        <template v-if="!infinite_scroll_end || is_fetching">
          <post-skeleton
            v-if="posts.length"
            v-observe-visibility="{
              callback: fetchMorePost,
              throttle: 300,
            }"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import weeklyDiscussionFilter from "@/modules/dashboard/components/weekly-comps/weekly-discussion-filter";
import postSkeleton from "@/modules/base/components/feed-comps/post-block-comps/post-skeleton";

export default {
  name: "weeklyDiscussions",

  components: {
    weeklyDiscussionFilter,
    postSkeleton,
    postBlock: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/post-block"
      ),
    noInternetBlock: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/no-internet-block"
      ),
  },

  data() {
    return {
      infinite_scroll_end: false,
      is_fetching: true,

      posts: [],
      post_repo: [],
      post_per_class: [],

      page: 1,
      page_end: 0,
      is_search: false,
      skeleton_count: 2,

      starter_intro: {
        name: "Gradely",
        description: "Welcome to class",
        type: "gradely",
      },

      filter_list: [],
      clear_selection: false,

      network_related: false,
    };
  },

  watch: {
    $route: {
      handler() {
        this.getDiscussion();
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions({
      getWeeklyDiscussion: "dbWeekly/getWeeklyDiscussion",
    }),

    filterByClass(class_id) {
      if (class_id === "all") this.fetchLatestPost();
      else {
        this.posts = [];
        this.post_repo.map((post) => {
          if (post.class.id === Number(class_id)) {
            this.posts.push(post);
          }
        });

        this.post_per_class = this.posts;
      }
    },

    filterByList(list) {
      this.posts = [];
      this.filter_list = list;

      let filter_data = this.post_per_class.length
        ? this.post_per_class
        : this.post_repo;

      if (list[0] === "all") {
        this.posts = filter_data;
        return;
      }

      filter_data.map((post) => {
        if (list.includes(post.user.type)) this.posts.push(post);
      });
    },

    getDiscussion() {
      this.posts = [];
      this.page = 1;
      this.page_end = 0;
      this.infinite_scroll_end = false;
      this.is_fetching = true;

      this.fetchLatestPost();
    },

    fetchLatestPost() {
      let entry_timestamp = this.getAuthUser.entry_timestamp;
      let current_timestamp = Math.round(new Date().getTime() / 1000);
      let entry_range = current_timestamp - entry_timestamp;

      this.clear_selection = true;

      this.getWeeklyDiscussion({
        page: this.page,
      })
        .then((response) => {
          console.log("DISCUSSIONS", response);

          if (response.code === 200) {
            this.is_fetching = false;
            this.page_end = response.pagination.pageCount;

            if (entry_range < 32) this.posts = response.data;
            else this.posts.push(...response.data);

            this.post_repo = this.posts;
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
    },

    fetchMorePost(isVisible) {
      if (!isVisible) return; // CHECK SCROLLING VISIBILITY

      // CHECK IF PAGE IS EQAUL TO PAGE COUNT
      if (this.page === this.page_end) {
        this.infinite_scroll_end = true;
        return;
      }

      this.page += 1; //INCREASE PAGE NUMBER
      this.is_search = true;

      this.fetchLatestPost();
    },

    filterOutDeletedPost(id) {
      setTimeout(
        () => (this.posts = this.posts.filter((post) => post.id !== id)),
        1500
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.weekly-discussions {
  .content-area {
    @include flex-row-between-wrap;
    align-items: flex-start;

    .filter-block {
      width: 30%;

      @include breakpoint-down(md) {
        width: 100%;
        margin-bottom: toRem(30);
      }
    }

    .discussion-block {
      width: 60%;

      @include breakpoint-down(md) {
        width: 100%;
      }
    }
  }
}
</style>
