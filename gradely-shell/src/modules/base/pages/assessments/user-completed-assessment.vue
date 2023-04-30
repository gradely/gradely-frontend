<template>
  <div class="completed-assessment-page">
    <template v-if="getCompletedAssessment.length">
      <user-assessment-card
        v-for="(assessment, index) in assessments"
        :key="index"
        card_type="completed"
        :assessment="assessment"
      />

      <!-- PAGINATION  -->
      <pagination
        v-if="pagination && pagination.pageCount > 1"
        :paging="pagination"
        @navigatePage="paginateData($event)"
      />
    </template>

    <!-- EMPTY STATE  -->
    <template v-else>
      <default-skeleton-loader
        :empty_state="empty_state"
        :loading_state="loading"
        :empty="{
          title: 'No Completed Assessment!',
          message: '',
        }"
        :cta="{
          has_cta: false,
        }"
      />
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import userAssessmentCard from "@/modules/base/components/assessment-comps/user-assessment-card";
import pagination from "@/shared/components/pagination";
import defaultSkeletonLoader from "@/shared/components/default-skeleton-loader";

export default {
  name: "completedAssessment",

  components: {
    userAssessmentCard,
    pagination,
    defaultSkeletonLoader,
  },

  computed: {
    getCompletedAssessment() {
      if (Array.isArray(this.assessments)) return this.assessments;
      else return Object.keys(this.assessments);
    },
  },
  watch: {
    $route: {
      handler() {
        let query = Object.keys(this.$route.query);

        if (query.length) {
          this.is_search = true;
          this.fetchAssessment();
        } else this.fetchAssessment();
      },
      immediate: true,
      deep: true,
    },

    search_value: {
      handler() {
        this.is_search = true;
        this.fetchAssessment();
      },
    },
  },

  data: () => ({
    loading: true,
    empty_state: false,
    is_search: false,

    assessments: [],
    page: 1,
    pagination: {
      pageCount: 0,
    },

    search_value: null,
  }),

  created() {
    this.$bus.$on("searchSchoolwork", (search) => {
      this.search_value = search;
    });
  },

  methods: {
    ...mapActions({
      getSchoolWork: "dbAssessments/getSchoolWork",
    }),

    fetchAssessment() {
      this.defaultSchoolState(true, false);

      let payload = {
        page: this.page,
        type: "completed",
        child_id: this.$route.params.id,
        search: this.is_search,
        subject_id: this.$route?.query?.subject,
        assessment_type: this.$route?.query?.type,
        search_value: this.search_value,
      };

      this.getSchoolWork(payload)
        .then((response) => {
          // console.log(response);

          if (response.code === 200) {
            this.defaultSchoolState(
              false,
              false,
              response.data,
              response.pagination
            );

            this.empty_state = setTimeout(
              () => (this.assessments.length ? false : true),
              2000
            );
          }

          // EMPTY STATE
          else if (response.code === 204 || response.code === 406) {
            this.defaultSchoolState();
            this.empty_state = this.assessments.length ? false : true;
          }
          // ERROR STATE
          else this.handleErrorState();
        })
        .catch(() => this.handleErrorState());
    },

    // ERROR STATE
    handleErrorState() {
      this.$bus.$emit("show_response_alert", {
        message: "An error occured while loading school work data",
        type: "error",
      });

      this.defaultSchoolState();
      this.empty_state = this.assessments.length ? false : true;
    },

    defaultSchoolState(loading = false, empty = true, data = [], paging = {}) {
      this.loading = loading;
      this.empty_state = empty;
      this.assessments = data;
      this.pagination = paging;
    },

    paginateData($event) {
      this.page = $event;
      this.is_search = true;
      this.fetchAssessment();
    },
  },
};
</script>

<style lang="scss" scoped></style>
