<template>
  <div class="page-container">
    <div class="title-row smooth-animation">
      <!-- LEFT -->
      <div class="left">
        <!-- TITLE -->
        <div class="title font-weight-600 color-text">Assessments</div>
      </div>

      <!-- RIGHT -->
      <div class="right d-flex justify-content-end">
        <!-- FILTER ASSESSMENT FOR SCHOOL -->
        <div
          v-if="false"
          class="filter rounded-30 smooth-transition pointer mgr-10"
          title="Filter assessment"
        >
          <div class="avatar mgr-3">
            <div class="icon icon-filter-lines smooth-transition"></div>
          </div>
          <div class="text smooth-transition">Filter</div>
        </div>

        <!-- ADD NEW ASSESSMENT  -->
        <button
          class="btn btn-accent add-new"
          title="Create assessment"
          @click="toggleCreateAssessment"
        >
          <div class="icon icon-plus"></div>
          <div class="text">Assessment</div>
        </button>
      </div>
    </div>

    <!-- PAGE TAB  -->
    <template v-if="account_type === 'teacher'">
      <page-tab-switcher
        :tabs="tabs"
        @updateAssessmentView="assessment_view = $event"
      />
    </template>

    <!-- ASSESSMENT -->
    <div class="assessment-container smooth-animation">
      <!-- PUBLISHED ASSESSMENT -->
      <template
        name="publish"
        v-if="$route.name === 'GradelyAssessmentPublished'"
      >
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
              title: 'No published assessment',
              message: 'You currently do not have any published assessment',
            }"
            :cta="{
              has_cta: true,
              cta_text:
                getAuthType === 'school'
                  ? 'Assign a teacher'
                  : 'Create Assessment',
            }"
            @handleClicked="processDisplayModal"
          />
        </template>
      </template>

      <!-- DRAFT ASSESSMENT -->
      <template name="draft" v-if="$route.name === 'GradelyAssessmentDraft'">
        <template v-if="draft_assessments.length">
          <assessment-card
            assessment_type="draft"
            v-for="(assessment, index) in draft_assessments"
            :key="index"
            :assessment="assessment"
          />
          <!-- PAGINATION -->
          <pagination
            v-if="draft_pagination && draft_pagination.pageCount > 1"
            :paging="draft_pagination"
            @navigatePage="paginateDraftedData($event)"
          />
        </template>

        <!-- ASSESSMENT EMPTY STATE  -->
        <template v-else>
          <default-skeleton-loader
            :empty_state="draft_empty"
            :loading_state="draft_loading"
            :empty="{
              title: 'No assessment in draft',
              message: 'You currently do not have any drafted assessment',
            }"
            :cta="{
              has_cta: true,
              cta_text: 'Create Assessment',
            }"
            @handleClicked="toggleCreateAssessment"
          />
        </template>
      </template>

      <!-- IN REVIEW ASSESSMENT -->
      <template
        name="review"
        v-if="$route.name === 'GradelyAssessmentInReview'"
      >
        <template v-if="review_assessments.length">
          <assessment-card
            assessment_type="review"
            v-for="(assessment, index) in review_assessments"
            :key="index"
            :assessment="assessment"
          />
          <!-- PAGINATION -->
          <pagination
            v-if="review_pagination && review_pagination.pageCount > 1"
            :paging="review_pagination"
            @navigatePage="paginateReviewData($event)"
          />
        </template>

        <!-- ASSESSMENT EMPTY STATE  -->
        <template v-else>
          <default-skeleton-loader
            :empty_state="review_empty"
            :loading_state="review_loading"
            :empty="{
              title: 'No assessment in review',
              message: 'You currently do not have any assessment in review.',
            }"
            :cta="{
              has_cta: false,
            }"
          />
        </template>
      </template>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_create_assessment_modal">
        <create-assessment-modal @closeTriggered="toggleCreateAssessment" />
      </transition>

      <transition name="fade" v-if="show_assign_teacher_modal">
        <assign-teacher-class-modal
          @closeTriggered="toggleAssignTeacher"
          @inviteTeacher="toggleTeacherInvite"
        />
      </transition>

      <transition name="fade" v-if="show_invite_teacher_modal">
        <invite-teachers-modal @closeTriggered="toggleTeacherInvite" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import defaultSkeletonLoader from "@/shared/components/default-skeleton-loader";
import pageTabSwitcher from "@/modules/base/components/assessment-comps/page-tab-switcher";

export default {
  name: "assessment",

  metaInfo: {
    title: "Assessments",
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
    createAssessmentModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/assessments/create-assessment-modal"
      ),

    assignTeacherClassModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/members/assign-teacher-class-modal"
      ),
    inviteTeachersModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/invite-teachers-modal"
      ),
  },

  watch: {
    $route: {
      handler(value) {
        this.$nextTick(() => {
          if (value.name === "GradelyAssessmentPublished")
            this.fetchAllAssessment("published");
          else if (value.name === "GradelyAssessmentDraft")
            this.fetchAllAssessment("draft");
          else if (value.name === "GradelyAssessmentInReview")
            this.fetchAllAssessment("review");
        });
      },
      immediate: true,
    },
  },

  data: () => ({
    account_type: null,
    assessment_view: "",
    is_search: false,

    published_loading: false,
    published_empty: true,
    published_assessments: [],
    published_page: 1,
    published_pagination: {
      pageCount: 0,
    },

    draft_loading: false,
    draft_empty: true,
    draft_assessments: [],
    draft_page: 1,
    draft_pagination: {
      pageCount: 0,
    },

    review_loading: false,
    review_empty: true,
    review_assessments: [],
    review_page: 1,
    review_pagination: {
      pageCount: 0,
    },

    show_create_assessment_modal: false,
    show_invite_teacher_modal: false,
    show_assign_teacher_modal: false,

    tabs: [
      { title: "Published", route: "GradelyAssessmentPublished" },
      { title: "In Review", route: "GradelyAssessmentInReview" },
      { title: "Draft", route: "GradelyAssessmentDraft" },
    ],
  }),

  created() {
    this.$bus.$on("reloadAssessment", (type) => {
      if (type === "published") this.fetchAllAssessment("published");
      else if (type === "draft") this.fetchAllAssessment("draft");
      else if (type === "review") this.fetchAllAssessment("review");
    });
  },

  mounted() {
    this.account_type = this.getAuthType;
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

      // DRAFT TYPE
      else if (type === "draft") {
        this.draft_loading = loading;
        this.draft_empty = empty;
        this.draft_assessments = data;
        this.draft_pagination = paging;
      }

      // REVIEW TYPE
      else if (type === "review") {
        this.review_loading = loading;
        this.review_empty = empty;
        this.review_assessments = data;
        this.review_pagination = paging;
      }
    },

    // GENERATE ASSESSMENT PAYLOAD
    generateAssessmentPayload(type) {
      let page = "";
      if (type === "published") page = this.published_page;
      else if (type === "draft") page = this.draft_page;
      else if (type === "review") page = this.review_page;

      return {
        page,
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

    // NAVIGATE PAGES FOR DRAFTED ASSESSMENT
    paginateDraftedData($event) {
      this.draft_page = $event;
      this.is_search = true;
      this.fetchAllAssessment("draft");
    },

    // NAVIGATE PAGES FOR REVIEW ASSESSMENT
    paginateReviewData($event) {
      this.review_page = $event;
      this.is_search = true;
      this.fetchAllAssessment("review");
    },

    toggleCreateAssessment() {
      this.show_create_assessment_modal = !this.show_create_assessment_modal;
    },

    toggleAssignTeacher() {
      this.show_assign_teacher_modal = !this.show_assign_teacher_modal;
    },

    toggleTeacherInvite() {
      this.show_assign_teacher_modal = false;
      this.show_invite_teacher_modal = !this.show_invite_teacher_modal;
    },

    processDisplayModal() {
      if (this.getAuthType === "school") this.toggleAssignTeacher();
      else this.toggleCreateAssessment();
    },
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  margin-bottom: toRem(40);

  .title-row {
    .title {
      @include font-height(21, 21);

      @include breakpoint-down(sm) {
        @include font-height(17.5, 19);
      }
    }

    .add-new {
      padding: toRem(11.5) toRem(26);

      @include breakpoint-down(sm) {
        @include square-shape(32);
        padding: toRem(11);
      }

      .icon {
        font-size: toRem(17);
        margin-right: toRem(5);

        @include breakpoint-down(sm) {
          margin-right: 0;
        }
      }

      .text {
        font-size: toRem(10.5);

        @include breakpoint-down(sm) {
          display: none;
        }
      }
    }
  }

  .assessment-container {
    .assessment-top-row {
      @include flex-row-between-nowrap;
      margin-bottom: toRem(15);

      .counter {
        @include font-height(12.75, 19);

        @include breakpoint-down(xs) {
          @include font-height(12, 17);
        }
      }

      .filter {
        @include flex-row-end-nowrap;
        padding: toRem(5);
        padding-right: toRem(12);
        background: $white-text;
        @include transition(0.4s);

        @include breakpoint-down(lg) {
          padding: toRem(3) toRem(6);
          padding-right: toRem(12);
        }

        @include breakpoint-down(xs) {
          padding: toRem(2) toRem(4);
          padding-right: toRem(6);
        }

        .avatar {
          @include square-shape(26);

          @include breakpoint-down(xs) {
            margin-right: 0 !important;
          }

          .icon {
            @include center-placement;
            font-size: toRem(12);
            color: $color-ash;
            margin-top: toRem(1);
            @include transition(0.4s);

            @include breakpoint-down(xs) {
              font-size: toRem(12);
            }
          }
        }

        .text {
          @include font-height(13, 16);
          color: $color-grey-dark;
          @include transition(0.4s);

          @include breakpoint-down(lg) {
            @include font-height(12, 15);
          }

          @include breakpoint-down(xs) {
            @include font-height(11.75, 15);
          }
        }

        &:hover {
          background: $brand-primary !important;
          .avatar {
            .icon {
              color: $white-text;
            }
          }

          .text {
            color: $white-text;
          }
        }
      }
    }
  }
}
</style>
