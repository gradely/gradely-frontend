<template>
  <div class="user-videos">
    <template v-if="videos.length">
      <div class="mgt-10">
        <user-video-card
          v-for="(video, index) in videos"
          :key="index"
          :video="video"
        />
      </div>

      <!-- PAGINATION  -->
      <pagination
        v-if="pagination && pagination.pageCount > 1"
        :paging="pagination"
        @navigatePage="paginateData($event)"
      />

      <!-- LOAD MORE LINK  -->
      <template>
        <button
          class="btn btn-primary-outline load-more-btn rounded-30"
          v-if="false"
        >
          LOAD MORE
        </button>
      </template>
    </template>

    <template v-else>
      <default-skeleton-loader
        :empty_state="empty_state"
        :loading_state="loading"
        :empty="{
          title: 'No School Videos!',
          message: 'No school videos has been assigned to your class yet!'
        }"
        :cta="{
          has_cta: false
        }"
      />
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import pagination from "@/shared/components/pagination";
import defaultSkeletonLoader from "@/shared/components/default-skeleton-loader";
import userTermBlock from "@/modules/base/components/assessment-comps/user-term-block";

export default {
  name: "userVideos",

  components: {
    pagination,
    userTermBlock,
    defaultSkeletonLoader,
    userVideoCard: () =>
      import(
        /* webpackChunkName: 'userVideoCard' */ "@/modules/base/components/assessment-comps/user-video-card"
      )
  },

  watch: {
    $route: {
      handler() {
        let query = Object.keys(this.$route.query);

        if (query.length) {
          this.is_search = true;
          this.fetchVideos();
        } else this.fetchVideos();
      },
      immediate: true,
      deep: true
    },

    search_value: {
      handler() {
        this.is_search = true;
        this.fetchVideos();
      }
    }
  },

  data: () => ({
    loading: true,
    empty_state: true,
    is_search: false,

    videos: [],
    page: 1,
    pagination: {
      pageCount: 0
    },

    search_value: null
  }),

  created() {
    this.$bus.$on("searchSchoolwork", search => {
      this.search_value = search;
    });
  },

  methods: {
    ...mapActions({
      getSchoolWork: "dbAssessments/getSchoolWork"
    }),

    fetchVideos() {
      this.defaultSchoolState(true, false);

      let payload = {
        page: this.page,
        type: "videos",
        child_id: this.$route.params.id,
        search: this.is_search,
        subject_id: this.$route?.query?.subject,
        creator_id: this.$route?.query?.creator,
        search_value: this.search_value
      };

      this.getSchoolWork(payload)
        .then(response => {
          // console.log(response);

          if (response.code === 200) {
            this.defaultSchoolState(
              false,
              false,
              response.data,
              response.pagination
            );

            setTimeout(
              () => (this.empty_state = this.videos.length ? false : true),
              2000
            );
          }

          // EMPTY STATE
          else if (response.code === 204 || response.code === 406) {
            this.defaultSchoolState();
            this.empty_state = this.videos.length ? false : true;
          }
          // ERROR STATE
          else this.handleErrorState();
        })
        .catch(() => this.handleErrorState());
    },

    // ERROR STATE
    handleErrorState() {
      this.$bus.$emit("show_response_alert", {
        message: "An error occured while loading school work videos",
        type: "error"
      });

      this.defaultSchoolState();
      this.empty_state = this.videos.length ? false : true;
    },

    defaultSchoolState(loading = false, empty = false, data = [], paging = {}) {
      this.loading = loading;
      this.empty_state = empty;
      this.videos = data;
      this.pagination = paging;
    },

    paginateData($event) {
      this.page = $event;
      this.is_search = true;
      this.fetchVideos();
    }
  }
};
</script>

<style lang="scss" scoped>
.user-videos {
}
</style>
