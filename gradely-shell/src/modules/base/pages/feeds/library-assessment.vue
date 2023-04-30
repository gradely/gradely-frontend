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
        <div class="avatar brand-inverse-light-bg">
          <div class="icon icon-library brand-inverse"></div>
        </div>

        <!-- TITLE  -->
        <div>
          <div class="title font-weight-600 color-text">
            Assessments
            <span class="font-weight-400"
              >({{ published_assessments.length }})</span
            >
          </div>

          <div class="meta-text color-grey-dark mgt-4">
            Find assessment published in your class here.
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

    <!-- PUBLISHED ASSESSMENT -->
    <template name="publish">
      <template v-if="published_assessments.length">
        <assessment-card
          v-for="(assessment, index) in published_assessments"
          :key="index"
          :assessment="assessment"
        />
        <!-- PAGINATION  -->
        <pagination
          v-if="published_pagination && published_pagination.pageCount > 1"
          :paging="published_pagination"
          @navigatePage="paginatePublishedData($event)"
        />
      </template>

      <!-- ASSESSMENT EMPTY STATE  -->
      <template v-else>
        <default-skeleton-loader
          :empty_state="published_empty"
          :loading_state="published_loading"
          :empty="{
            title: 'No published assessment!',
            message: 'You currently do not have any published assessment!',
          }"
          :cta="{
            has_cta: false,
          }"
        />
      </template>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import defaultSkeletonLoader from "@/shared/components/default-skeleton-loader";
import pageTabSwitcher from "@/modules/base/components/assessment-comps/page-tab-switcher";

export default {
  name: "libraryAssessments",

  metaInfo: {
    title: "Library Assessments",
  },

  components: {
    pageTabSwitcher,
    defaultSkeletonLoader,
    assessmentCard: () =>
      import(
        /* webpackChunkName: "assessmentCard" */ "@/modules/base/components/assessment-comps/assessment-card"
      ),
    pagination: () =>
      import(
        /* webpackChunkName: "pagination" */ "@/shared/components/pagination"
      ),
  },

  watch: {
    $route: {
      handler() {
        this.fetchAllAssessment("published");
      },
      immediate: true,
    },
  },

  data() {
    return {
      published_loading: false,
      published_empty: true,
      published_assessments: [],
      published_page: 1,
      published_pagination: {
        pageCount: 0,
      },
    };
  },

  created() {
    this.$bus.$on("reloadAssessment", (type) => {
      type === "published" ? this.fetchAllAssessment("published") : null;
    });
  },

  methods: {
    ...mapActions({
      getSchoolTeacherAssessment: "dbAssessments/getSchoolTeacherAssessment",
    }),

    // FETCH ALL ASSESSMENT
    fetchAllAssessment(type) {
      this.activeAssessmentState(type, true, false);

      let payload = this.generateAssessmentPayload(type);

      this.getSchoolTeacherAssessment(payload)
        .then((response) => {
          if (response.code === 200) {
            this.activeAssessmentState(
              type,
              false,
              false,
              response.data,
              response.pagination
            );
          }

          // EMPTY STATE
          else if (response.code === 204 || response.code === 406)
            this.activeAssessmentState(type);
          // ERROE STATE
          else this.handleErrorState(type);
        })
        .catch(() => this.handleErrorState(type));
    },

    // HANDLE ERROR STATE
    handleErrorState(type) {
      this.$bus.$emit("show_response_alert", {
        message: "An error occured while loading assessment data",
        type: "error",
      });

      this.activeAssessmentState(type);
    },

    // SET DEFAULT STATE OF ASSESSMENT
    activeAssessmentState(
      type,
      loading = false,
      empty = true,
      data = [],
      paging = {}
    ) {
      if (type === "published") {
        this.published_loading = loading;
        this.published_empty = empty;
        this.published_assessments = data;
        this.published_pagination = paging;
      }
    },

    // GENERATE ASSESSMENT PAYLOAD
    generateAssessmentPayload(type) {
      return {
        page: type === "published" ? this.published_page : this.draft_page,
        class_id: this.$route.params.id,
        account: this.getAuthType,
        type,
        search: this.is_search,
      };
    },

    // NAVIGATE PAGES FOR PUBLISHED ASSESSMENT
    paginatePublishedData($event) {
      this.published_page = $event;
      this.is_search = true;
      this.fetchAllAssessment("published");
    },
  },
};
</script>

<style lang="scss" scoped></style>
