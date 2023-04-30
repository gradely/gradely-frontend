<template>
  <div class="gradely-container mx-auto">
    <!-- CONTENT BLOCK  -->
    <div class="feed-timeline-row smooth-animation">
      <!-- CONTENT  -->
      <div class="timeline mgb-30">
        <!-- POST INPUT BLOCK  -->
        <div class="post-input-wrapper smooth-animation" id="tabSwitcher">
          <post-input-block />
        </div>

        <!-- POST FILTER LIBRARY SWITCHER  -->
        <post-library-switcher v-if="isSchoolAndTeacherUser" />

        <!-- CREATE ASSESSMENT ONBOARDING FLOW -->
        <template v-if="outer_onboarding">
          <div
            class="position-relative"
            :class="show_tour_cover ? 'tour-index' : null"
          >
            <feed-onboarding-block
              v-if="showStudentOnboardingBlock"
              :intro_content="{
                name: 'Gradely',
                description: 'Teacher Walkthrough',
                type: 'gradely',
              }"
            />

            <getting-started-block
              v-if="showAddStudentOnboardingBlock"
              :intro_content="{
                name: 'Gradely',
                description: 'Teacher Walkthrough',
                type: 'gradely',
              }"
            >
              <template slot="content-area">
                <starter-todo-list />
              </template>
            </getting-started-block>
          </div>
        </template>

        <template v-else>
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
                <template>
                  <!-- DIAGNOSTIC AND RECOMMENDATIONS -->
                  <diagnostic-recomendation-block
                    key="a4"
                    v-if="['parent', 'student'].includes(getAuthType)"
                  />

                  <!-- CONTENT STATE  -->
                  <template v-if="posts.length">
                    <post-block
                      :key="index"
                      :post_index="index"
                      v-for="(post, index) in posts"
                      :post="post"
                    />
                  </template>
                </template>

                <template>
                  <!-- Note: (( TThis section is only visible to parent and student )) -->
                  <getting-started-list
                    key="3"
                    v-if="isParentStudentEmptyState"
                  />

                  <!-- TOUR DISPLAY FLOW -->
                  <tour-posts-block
                    v-if="tour_posts.length"
                    key="tour_posts"
                    :posts="tour_posts"
                  />

                  <template v-else>
                    <!-- Note: (( This section is only visible to school and teacher )) -->
                    <getting-started-block
                      key="2"
                      :intro_content="starter_intro"
                      v-if="isSchoolTeacherEmptyState"
                    >
                      <template slot="content-area">
                        <starter-todo-list />
                      </template>
                    </getting-started-block>
                  </template>
                </template>

                <!-- NO INTERNET BLOCK -->
                <template v-if="network_related">
                  <no-internet-block :key="$string.generateRandomString(10)" />
                </template>
              </template>
            </template>

            <!-- LIBRARY CONTENT -->
            <template v-if="post_view === 'library'">
              <post-library-block :key="$string.generateRandomString(10)" />
            </template>
          </transition-group>
        </template>

        <!-- VISIBILITY OBSERVER LOADER -->
        <template v-if="post_view === 'feed' && !is_scroll_active">
          <post-skeleton
            v-if="posts.length && posts.length > 4"
            v-observe-visibility="{
              callback: fetchMorePost,
              throttle: 1000,
            }"
          />
        </template>
      </div>

      <!-- UPCOMING BLOCK  -->
      <div class="upcoming fixed-upcoming" ref="upcoming">
        <upcoming-block />
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_end_liveclass_modal">
        <end-class-feedback-modal @closeTriggered="toggleEndLiveClassRating" />
      </transition>

      <transition name="fade" v-if="show_scheduled_modal">
        <class-scheduled-modal
          :class_details="getLiveClassDetails"
          @closeTriggered="toggleScheduledModal"
        />
      </transition>

      <transition name="fade" v-if="show_tour_complete">
        <tour-complete-modal @closeTriggered="toggleTourComplete" />
      </transition>

      <transition name="fade" v-if="show_tour_cover">
        <tour-cover />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import postSkeleton from "@/modules/base/components/feed-comps/post-block-comps/post-skeleton";
import postInputBlock from "@/modules/base/components/feed-comps/post-input-comps/post-input-block";
import classScheduledModal from "@/modules/base/components/feed-comps/post-input-comps/class-scheduled-modal";

export default {
  name: "feedTimeline",

  metaInfo: {
    title: "Feed",
  },

  components: {
    postSkeleton,
    postInputBlock,
    classScheduledModal,
    postLibrarySwitcher: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/post-library-switcher"
      ),
    upcomingBlock: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/upcoming-comps/upcoming-block"
      ),
    postBlock: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/post-block"
      ),
    gettingStartedList: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/getting-started-list"
      ),
    gettingStartedBlock: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/getting-started-block"
      ),
    starterTodoList: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/starter-todo-list"
      ),
    noInternetBlock: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/no-internet-block"
      ),
    postLibraryBlock: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-library-comps/post-library-block"
      ),
    endClassFeedbackModal: () =>
      import(
        /* webpackChunkName: "FeedEntry" */ "@/modules/base/modals/assessments/end-class-feedback-modal"
      ),
    diagnosticRecomendationBlock: () =>
      import(
        /* webpackChunkName: "FeedEntry" */ "@/modules/base/components/feed-comps/post-block-comps/diagnostic-recomendation-block"
      ),
    feedOnboardingBlock: () =>
      import(
        /* webpackChunkName: "FeedEntry" */ "@/modules/base/components/feed-comps/post-block-comps/feed-onboarding-block"
      ),
    tourPostsBlock: () =>
      import(
        /* webpackChunkName: "FeedEntry" */ "@/modules/base/components/feed-comps/post-block-comps/tour-posts-block"
      ),
    tourCover: () =>
      import(/* webpackChunkName: "modal" */ "@/shared/components/tour-cover"),
    tourCompleteModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/feeds/tour-complete-modal"
      ),
  },

  computed: {
    ...mapGetters({
      getTour: "general/getTour",
      getTeacherLiveClass: "dbFeeds/getTeacherLiveClass",
    }),

    isSchoolTeacherEmptyState() {
      return this.posts.length === 0 &&
        (this.getAuthType === "school" || this.getAuthType === "teacher") &&
        !this.network_related
        ? true
        : false;
    },

    isParentStudentEmptyState() {
      return this.posts.length === 0 &&
        (this.getAuthType === "parent" || this.getAuthType === "student") &&
        !this.network_related
        ? true
        : false;
    },

    isSchoolAndTeacherUser() {
      return this.getAuthType === "school" || this.getAuthType === "teacher"
        ? true
        : false;
    },

    showStudentOnboardingBlock() {
      if (this.getAuthType === "school") {
        return this.tour_step === 4 && this.tour_step_progress === "ongoing"
          ? true
          : false;
      } else if (this.getAuthType === "teacher") {
        return this.tour_step === 3 && this.tour_step_progress === "ongoing"
          ? true
          : false;
      }
    },

    showAddStudentOnboardingBlock() {
      if (this.getAuthType === "teacher") {
        return this.tour_step === 2 && this.tour_step_progress === "ongoing"
          ? true
          : false;
      }
    },

    getLiveClassDetails() {
      if (!this.class_details)
        return {
          subject: "My Subject",
          date: "Today",
          time: "Now",
        };

      let date = this.$date.formatDate(this.class_details?.availability);
      let day = date.getDay("d1");
      let month = date.getMonth("m3");
      let year = date.getYear("y1");
      let hour = date.getHour("h01");
      let minutes = date.getMinute("b2");
      let meridian = date.getMeridian();

      return {
        subject: this.class_details?.subject,
        date: `${day} ${month} ${year}`,
        time: `${hour}:${minutes} ${meridian}`,
      };
    },
  },

  async mounted() {
    if (this.getAuthType === "teacher" && !this.getTeacherLiveClass?.link)
      await this.generateLiveClassLink();

    // CHECK FOR TOUR POSTS
    this.tour_posts = JSON.parse(localStorage.getItem("tourPosts")) ?? [];
  },

  data() {
    return {
      is_scroll_active: false,
      is_fetching: true,

      posts: [],
      page: null,
      is_search: false,
      skeleton_count: 2,
      student_class_id: null,

      post_view: "feed",
      starter_intro: {
        name: "Gradely",
        description: "Welcome to class",
        type: "gradely",
      },
      tour_posts: [],

      network_related: false,
      show_end_liveclass_modal: false,

      outer_onboarding: false,
      show_tour_cover: false,
      tour_step: 1,
      tour_step_progress: "completed",
      show_tour_complete: false,

      class_details: null,
      show_scheduled_modal: false,
    };
  },

  watch: {
    $route: {
      handler() {
        this.post_view =
          this.$route.query.view === "library" ? "library" : "feed";

        this.$route.query?.completed_tour && this.toggleTourComplete();

        // CHECK IF TOUR IS ONGOING
        this.checkIfTourIsOngoing();
      },
      immediate: true,
    },
  },

  created() {
    // this.fetchLibrarySummary();
    this.$bus.$on("extractDeletedPost", (post_id) =>
      this.filterOutDeletedPost(post_id)
    );

    this.$bus.$on("class_scheduled", (details) => {
      this.class_details = details;
      this.toggleScheduledModal();
    });

    this.$bus.$on("postDeleted", (post_id) => {
      this.posts = this.posts.filter((post) => {
        return post?.reference?.id !== post_id;
      });
    });

    this.$bus.$on("reloadFeeds", () => this.resetAndFetchPost());

    this.$bus.$on("postUpdated", (post_reference) => {
      this.updatePostsAfterRestart(post_reference);
    });

    // CHECK IF LIVE CLASS MEETING HAS ENDED
    if (this.$route.query.class_ended) this.toggleEndLiveClassRating();
  },

  methods: {
    ...mapActions({
      getFeedsData: "dbFeeds/getFeedsData",
      getLibrarySummary: "dbFeeds/getLibrarySummary",
      getFeatureLogger: "general/getFeatureLogger",
      getMultipleFeatureLogs: "general/getMultipleFeatureLogs",
      generateLiveClassLink: "dbFeeds/generateLiveClassLink",
      getChildClassDetails: "general/getChildClassDetails",
    }),

    toggleTourComplete() {
      this.show_tour_complete = !this.show_tour_complete;
    },

    toggleScheduledModal() {
      this.show_scheduled_modal = !this.show_scheduled_modal;
    },

    checkIfTourIsOngoing() {
      if (this.$route?.query?.tour) {
        if (this.$route?.query.tour != 7) {
          let tour_step = this.$string.decodeString(this.$route?.query?.tour);

          setTimeout(() => {
            this.tour_step_progress = "ongoing";
            this.tour_step = tour_step;
            this.show_tour_cover = true;
            this.outer_onboarding = true;
          }, 3000);
        } else {
          this.outer_onboarding = false;
          if (Number(this.$route.params.id) !== 0) this.resetAndFetchPost();
        }
      }

      // FETCH POST
      else {
        this.outer_onboarding = false;
        if (Number(this.$route.params.id) !== 0) this.resetAndFetchPost();
      }
    },

    updatePostsAfterRestart(post_reference) {
      this.posts = this.posts.map((post) => {
        if (post_reference.id === post?.reference?.id)
          return { ...post, reference: post_reference };
        else return post;
      });
    },

    async fetchLibrarySummary() {
      await this.getLibrarySummary(this.$route.params.id);
    },

    resetAndFetchPost() {
      this.posts = [];
      this.page = null;
      this.is_scroll_active = false;
      this.is_fetching = true;

      this.fetchLatestPost();
    },

    // GET STUDENT CLASS ID
    getStudentClassId(payload) {
      this.getChildClassDetails(this.$route.params.id).then((response) => {
        this.student_class_id = response.data.class_id;

        // RESET PAYLOAD
        payload.account_id = this.student_class_id;
        payload.student_id = this.$route.params.id;

        // FETCH POST
        this.fetchFeedsPerAccount(payload);
      });
    },

    fetchLatestPost() {
      let payload = {
        account_id: Number(this.$route.params.id),
        page: this.page,
        search: this.is_search,
      };

      ["parent", "student"].includes(this.getAuthType)
        ? this.getStudentClassId(payload)
        : this.fetchFeedsPerAccount(payload);
    },

    fetchFeedsPerAccount(payload) {
      let entry_timestamp = this.getAuthUser.entry_timestamp;
      let current_timestamp = Math.round(new Date().getTime() / 1000);
      let entry_range = current_timestamp - entry_timestamp;

      this.getFeedsData(payload)
        .then((response) => {
          // console.log("POSTS", response);

          if ([200, 204].includes(response.code)) {
            this.is_fetching = false;

            if (response?.data?.length) {
              this.page = response.data.at(-1)?.id;

              let filtered_post = this.filterOutInvalidPost(response.data);

              entry_range < 25
                ? (this.posts = filtered_post)
                : this.posts.push(...filtered_post);
            } else {
              this.is_scroll_active = true;
            }
          }

          // NON 200 RESPONSES
          else this.errorState();
        })
        .catch((err) => {
          setTimeout(() => {
            this.errorState();
            this.is_scroll_active = true;
            this.network_related = true;
          }, 2000);
        });
    },

    errorState() {
      this.posts = [];
      this.page = null;
      this.is_fetching = false;
    },

    // FILTER OUT INVALID REFERENCE POST OF ARTICLE AND HOMEWORK
    filterOutInvalidPost(posts) {
      let artcles_and_homework = [];
      let others = [];

      posts.map((post) => {
        ["article", "homework"].includes(post.type)
          ? artcles_and_homework.push(post)
          : others.push(post);
      });

      let filtered_aticles_and_homework = artcles_and_homework.filter(
        (item) => item.reference
      );

      // REMOVE ALL ARTICLE RELATED POST IF USER IS NOT TEACHER
      if (this.getAuthType !== "teacher")
        filtered_aticles_and_homework = filtered_aticles_and_homework.filter(
          (item) => item.type !== "article"
        );

      let modified_post = [...filtered_aticles_and_homework, ...others];

      return modified_post.sort((a, b) =>
        a.id > b.id ? -1 : b.id > a.id ? 1 : 0
      );
    },

    fetchMorePost(isVisible) {
      if (!isVisible) return;

      this.is_scroll_active = false;
      this.is_search = true;

      setTimeout(() => this.fetchLatestPost(), 2300);
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
</style>
