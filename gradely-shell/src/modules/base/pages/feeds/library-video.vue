<template>
  <div
    class="
      library-container
      gradely-container
      px-2 px-sm-3 px-md-4 px-xl-5
      h-auto
      mx-auto
    "
  >
    <div class="title-row">
      <!-- LEFT -->
      <div class="left">
        <div class="avatar brand-red-light-bg">
          <div class="icon icon-note-text brand-tonic"></div>
        </div>

        <!-- TITLE  -->
        <div>
          <div class="title font-weight-600 color-text">
            Videos
            <span class="font-weight-400">({{ getTotalItemCount }})</span>
          </div>

          <div class="meta-text color-grey-dark mgt-4">
            Find videos shared in your class here.
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="right" @click="toggleFilter">
        <div class="filter rounded-30 smooth-transition pointer">
          <div class="avatar">
            <div class="icon icon-filter-lines smooth-transition"></div>
          </div>
          <div class="text smooth-transition">Filter</div>
        </div>
      </div>

      <!-- SEARCH INPUT FOR WEBVIEW -->
      <div class="search-input hide-mobile">
        <input
          type="text"
          class="form-control"
          v-model="search"
          placeholder="Search by title, subject or teacher"
        />
        <div class="icon icon-search brand-accent"></div>
      </div>

      <div
        class="select-filter-wrapper"
        :class="[hide_filter && 'hide-filter']"
      >
        <select-filter
          title="Subject"
          select_key="subject_id"
          :show_all="false"
          :default="default_subject"
          :filter_list="[
            { title: 'All', value: 'all' },
            ...getCurrentClassSubjects,
          ]"
        />

        <select-filter
          title="Teacher"
          :show_all="false"
          select_key="author"
          :default="default_author"
          :filter_list="[{ title: 'All', value: 'all' }, ...teacher_list]"
        />

        <select-filter
          title="Term"
          :show_all="false"
          select_key="term"
          :default="default_term"
          :filter_list="[
            { title: 'All', value: 'all' },
            { title: 'First', value: 'first' },
            { title: 'Second', value: 'second' },
            { title: 'Third', value: 'third' },
          ]"
        />
      </div>
    </div>

    <!-- DOCUMENTS COLLECTION  -->
    <template v-if="videos.length">
      <video-collection :videos="getGroupedVideos" />
    </template>

    <template v-else>
      <default-skeleton-loader
        :empty_state="empty_state"
        :loading_state="loading_state"
        :empty="{
          title: 'No Videos!',
          message: 'You currently do not have any library videos available!',
        }"
        :cta="{
          has_cta: false,
          cta_text: '',
        }"
      />
    </template>

    <!-- LOAD MORE LINK  -->
    <template>
      <div class="gfont-13 text-center mgt-40 mgb-10">
        Showing {{ videos.length }} of {{ getTotalItemCount }}
      </div>
      <div class="progress-wrapper">
        <div class="progress-line" :style="progressSyle"></div>
      </div>

      <button
        class="btn btn-primary-outline load-more-btn rounded-30"
        @click="loadMoreVideos"
        :disabled="disabled"
      >
        <div
          v-if="loading"
          class="icon-dotted-roller gfont-17 mgr-10 animate"
        ></div>
        <div>{{ loading ? "loading.." : "see more" }}</div>
      </button>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import defaultSkeletonLoader from "@/shared/components/default-skeleton-loader";
import videoCollection from "@/modules/base/components/feed-comps/post-library-comps/video-collection";
import selectFilter from "@/shared/components/select-filter";

export default {
  name: "libraryVideos",

  metaInfo: {
    title: "Library Videos",
  },

  components: {
    videoCollection,
    defaultSkeletonLoader,
    selectFilter,
  },

  computed: {
    ...mapGetters({
      getSelectedClass: "general/getSelectedClass",
      getTeacherClassList: "general/getTeacherClassList",
      getClassSubjects: "general/getClassSubjects",
    }),

    getGroupedVideos() {
      return this.videos.reduce((groupVideos, vid) => {
        groupVideos[vid.upload_term_week]
          ? groupVideos[vid.upload_term_week].push(vid)
          : (groupVideos[vid.upload_term_week] = [vid]);
        return groupVideos;
      }, {});
    },

    getCurrentClass() {
      return (
        this.getTeacherClassList.classes?.find(
          (level) => Number(level.class_id) == Number(this.$route?.params?.id)
        ) ?? []
      );
    },

    getCurrentClassSubjects() {
      if (this.getAuthType === "school" && this.getClassSubjects.length)
        return this.getClassSubjects.map((sub) => {
          sub.title = sub.name;
          sub.value = sub.id;
          return sub;
        });

      let subjects = this.getCurrentClass?.subjects?.map((subject) => {
        return {
          title: subject?.name,
          value: subject?.subject_id,
        };
      });

      return subjects?.length
        ? subjects
        : [
            {
              title: "Mathematics",
              value: 1,
            },
          ];
    },

    getPayloadFilter() {
      // let current_term = (this.getAuthUser?.term).toLowerCase() ?? "first";
      let current_term = this?.$route?.query?.term;

      let search = this.search ? `&search=${this.search}` : "";

      let subject_id =
        !this?.$route?.query?.subject_id ||
        this?.$route?.query?.subject_id == "all"
          ? ""
          : this?.$route?.query?.subject_id;

      let term =
        this?.$route?.query?.term == "all" || !current_term
          ? ""
          : this?.$route?.query?.term || current_term;

      let author =
        !this?.$route?.query?.author || this?.$route?.query?.author == "all"
          ? ""
          : this?.$route?.query?.author;

      let filter = "";
      if (search) filter += search;
      if (subject_id) filter += `&subject_id=${subject_id}`;
      if (term) filter += `&term=${term}`;
      if (author) filter += `&creator_id=${author}`;
      return filter;
    },

    getPayload() {
      return {
        class_id: this.$route.params.id,
        page: this.page,
        filter: this.getPayloadFilter,
      };
    },

    getPageCount() {
      return this.pagination.length ? this.pagination[0].PageCount : 0;
    },

    getTotalItemCount() {
      return this.pagination.length ? this.pagination[0].TotalCount : 0;
    },

    progressSyle() {
      if (!this.getTotalItemCount) return `width:0%`;
      let progress = (this.videos?.length / this.getTotalItemCount) * 100;
      return `width:${progress}%`;
    },

    disabled() {
      return this.videos?.length >= this.getTotalItemCount || !this.can_search;
    },
  },

  watch: {
    $route() {
      this.setDefaultFilters();
    },

    getPayloadFilter() {
      this.setupActiveState(true, false);
      this.can_search ? this.fetchLibraryVideos() : this.deferredSearch();
    },
  },

  created() {
    this.$bus.$on("extractDeletedFile", (token) => {
      this.videos = this.videos.filter((vid) => {
        return vid.token !== token;
      });
    });
  },

  mounted() {
    this.fetchLibraryVideos();
    this.setDefaultFilters();
    if (!this.getClassSubjects?.length) this.fetchClassSubjects();
    if (!this.getTeacherClassList?.classes) this.fetchTeacherClasses();
    this.fetchClassTeachers();
  },

  data() {
    return {
      search: "",
      hide_filter: true,
      default_subject: "all",
      default_author: "all",
      default_term: "first",
      can_search: true,
      timeout: null,
      can_search_timeout: null,
      loading: false,
      loading_state: true,
      empty_state: false,
      videos: [],
      teacher_list: [],
      pagination: [
        {
          PageCount: 0,
        },
      ],
      page: 1,
    };
  },

  methods: {
    ...mapActions({
      getLibraryVideos: "dbFeeds/getClassVideos",
      fetchTeacherClassList: "general/getTeacherClassList",
      getClassSubject: "general/getClassSubject",
      getClassTeachers: "general/getClassTeachers",
    }),

    async fetchTeacherClasses() {
      await this.fetchTeacherClassList();
    },

    async fetchClassSubjects() {
      await this.getClassSubject(this.$route?.params.id);
    },

    fetchClassTeachers() {
      this.getClassTeachers(this.$route?.params.id)
        .then((response) => {
          this.teacher_list = response.data.map((teacher) => {
            return {
              title: teacher.teacher_name,
              value: teacher.id,
            };
          });
        })
        .catch(() => {});
    },

    setDefaultFilters() {
      // let current_term = (this.getAuthUser?.term).toLowerCase() ?? "first";
      this.default_subject = this.$route?.query?.subject_id ?? "all";
      this.default_author = this.$route?.query?.author ?? "all";
      this.default_term = this.$route?.query?.term ?? "all";
    },

    deferredSearch() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.fetchLibraryVideos();
      }, 1300);
    },

    resetCanSearch() {
      this.can_search = false;
      if (this.can_search_timeout) clearTimeout(this.can_search_timeout);
      this.can_search_timeout = setTimeout(() => {
        this.can_search = true;
      }, 1300);
    },

    toggleFilter() {
      this.hide_filter = !this.hide_filter;
    },

    loadMoreVideos() {
      this.loading = true;
      this.resetCanSearch();

      this.getLibraryVideos(this.getPayload)
        .then((response) => {
          this.loading = false;

          if (response.code === 200 && response?.data?.length) {
            this.page++;
            this.videos.push(...response.data);
            this.pagination = response.pagination;
          } else {
            this.pushAlert("Can't load more video at the moment.", "warning");
          }
        })
        .catch(() => {
          this.loading = false;
          this.pushAlert("Can't load more video at the moment.", "error");
        });
    },

    fetchLibraryVideos() {
      this.setupActiveState(true, false);
      this.resetCanSearch();

      this.page = 1;

      this.getLibraryVideos(this.getPayload)
        .then((response) => {
          if (response.code === 200) {
            this.page++;
            this.setupActiveState(
              false,
              false,
              response.data,
              response.pagination,
              true
            );
          } else this.setupActiveState(false, true);
        })
        .catch(() => this.setupActiveState(false, true));
    },

    // SETUP STUDENT ACTIVE STATE
    setupActiveState(
      loading = false,
      empty = true,
      state = [],
      paging = {},
      check_length = false
    ) {
      this.loading_state = loading;
      this.empty_state = empty;
      this.videos = state;
      this.pagination = paging;

      // CHECK LENGTH
      if (check_length) {
        if (this.videos.length === 0) {
          this.loading_state = false;
          this.empty_state = true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title-row {
  @include flex-row-between-wrap;
  gap: 20px 20px;

  @include breakpoint-down(xs) {
    gap: 20px 10px;
  }

  .right {
    display: none;

    .filter {
      background: $white-text;
      &:hover {
        background: $brand-navy;
      }
    }

    .text {
      margin-left: 5px;
      @include breakpoint-custom-down(380) {
        display: none;
        margin-left: 0px;
      }
    }

    @include breakpoint-custom-down(610) {
      display: block;
    }
  }

  .search-input {
    position: relative;
    overflow: hidden;
    height: auto;
    width: 45%;

    @include breakpoint-custom-down(610) {
      width: 100%;
    }

    .form-control {
      border-radius: toRem(18);
      padding-left: toRem(16);
      padding-right: toRem(32);
      font-size: toRem(12.85);
      color: $color-ash;

      @include breakpoint-down(lg) {
        border-radius: toRem(14);
      }

      @include breakpoint-down(sm) {
        padding-left: toRem(12);
        border-radius: toRem(10);
        font-size: toRem(12.65);
      }
    }

    .icon {
      font-size: toRem(18);
      @include center-y;
      right: toRem(12);
      z-index: 1;
    }
  }

  .select-filter-wrapper {
    width: 100%;
    @include flex-row-start-nowrap;
    gap: 0 10px;

    @include breakpoint-custom-down(510) {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px 0;
    }

    .select-filter {
      min-width: 150px;
      margin: 0;
      @include breakpoint-custom-down(510) {
        width: 100%;
      }
    }
  }

  .hide-filter {
    @include breakpoint-custom-down(610) {
      display: none;
    }
  }
}

.progress-wrapper {
  position: relative;
  height: toRem(3.5);
  width: toRem(280);
  max-width: 98%;
  background: #11bdcf;
  margin: auto;
  border-radius: toRem(10);

  .progress-line {
    position: absolute;
    height: 100%;
    background: #113255;
    border-radius: toRem(10);
    transition: all 0.25s ease-in-out;
  }
}
</style>

<style>
.load-more-btn {
  margin-top: 25px;
}

.select-filter-wrapper .select-filter .form-control {
  width: 100% !important;
}

@media screen and (max-width: 510px) {
  .select-filter-wrapper .select-filter .form-control {
    width: 100% !important;
  }
}
</style>
