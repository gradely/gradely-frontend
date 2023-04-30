<template>
  <div class="new-assessment-page">
    <template v-if="getNewAssessment.length">
      <user-assessment-card
        v-for="(assessment, index) in assessments"
        :key="index"
        card_type="new"
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
        v-if="getParentChildren.length || getAuthType === 'student'"
        :empty_state="empty_state"
        :loading_state="loading"
        :empty="{
          title: childInSchool ? 'No New Assessment!' : 'Join your School',
          message: childInSchool
            ? 'No assessment has been assigned to your class yet!'
            : 'Join your school to access quizzes, homework and exams from here. ',
        }"
        :cta="{
          has_cta: childInSchool ? false : true,
          show_extra_text: false,
          cta_text: 'Find your School',
        }"
        @handleClicked="navigateToFindSchool"
      />

      <default-skeleton-loader
        v-else
        :empty_state="empty_state"
        :loading_state="loading"
        :empty="{
          title: 'No Child added yet!',
          message: 'Add your child to get started on Gradely.',
        }"
        :cta="{
          has_cta: true,
          show_extra_text: false,
          cta_text: 'Add your Child',
        }"
        @handleClicked="navigateToAddChild"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import userAssessmentCard from "@/modules/base/components/assessment-comps/user-assessment-card";
import pagination from "@/shared/components/pagination";
import defaultSkeletonLoader from "@/shared/components/default-skeleton-loader";

export default {
  name: "newAssessment",

  components: {
    userAssessmentCard,
    pagination,
    defaultSkeletonLoader,
  },

  computed: {
    ...mapGetters({
      getParentChildren: "general/getParentChildren",
      getChildClassDetails: "general/getChildClassDetails",
    }),

    getNewAssessment() {
      if (Array.isArray(this.assessments)) return this.assessments;
      else return Object.keys(this.assessments);
    },

    childInSchool() {
      if (this.getAuthType === "parent") {
        let active_child = this.getParentChildren.filter(
          (item) => item.id === Number(this.$route.params.id)
        );

        return active_child[0]?.user_class ? true : false;
      } else if (this.getAuthType === "student") {
        return this.getChildClassDetails?.class_detail?.has_school;
      }
    },

    getEmptyState() {
      if (this.childInSchool) {
      }
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
        type: "new",
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
            this.empty_state = this.assessments.length ? false : true;
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

    defaultSchoolState(loading = false, empty = false, data = [], paging = {}) {
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

    navigateToFindSchool() {
      this.$router.push({ name: "StudentFindSchool" });
    },

    navigateToAddChild() {
      this.$router.push({
        name: "ParentAddChild",
        query: { page: this.$route.path },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
