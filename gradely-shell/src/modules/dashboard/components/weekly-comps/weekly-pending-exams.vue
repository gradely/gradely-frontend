<template>
  <div class="weekly-exam">
    <div class="weekly-title-row">
      <!-- TEXT  -->
      <div class="text">School Pending Exams</div>

      <!-- PRINT BUTTON  -->
      <button class="btn btn-whitish" v-if="false">
        <div class="text">Print</div>
        <div class="avatar">
          <div class="icon icon-printer"></div>
        </div>
      </button>
    </div>

    <!-- FILTER ROW -->
    <template>
      <weekly-filter-row />
    </template>

    <!-- BULK SELECTION OPTION ROW -->
    <div
      class="bulk-selection-row smooth-animation"
      v-if="getPendingExamSelected.length"
    >
      <!-- COUNTER -->
      <div class="counter color-ash">
        <span class="font-weight-600 color-text smooth-animation">{{
          getPendingExamSelected.length
        }}</span>
        {{ getPendingExamSelected.length === 1 ? "Exam" : "Exams" }} selected
      </div>

      <!-- OPTIONS -->
      <div class="options">
        <button class="btn btn-accent mgr-10" @click="toggleApproveModal">
          Approve
        </button>

        <button class="btn btn-soft-tonic" @click="toggleRejectModal">
          Reject
        </button>
      </div>
    </div>

    <!-- CONTENT  -->
    <div class="content-area">
      <!-- WEEKLY HEADER  -->
      <template v-if="weekly_data.length">
        <div class="weekly-header weekly-by-5-columns">
          <div class="column-select">
            <div class="selection checkbox-inline ignore">
              <input
                type="checkbox"
                class="ignore mgl-4"
                v-model="all_selected"
                :checked="is_checked"
                ref="clearCheckbox"
                @change="toggleAllStudentSelection"
              />
            </div>
          </div>

          <div class="column-one">Description</div>
          <div class="column-two">Date</div>
          <div class="column-three">Class</div>
          <div class="column-four">Created By</div>
          <div class="column-five">Options</div>
        </div>

        <!-- WEEKLY BODY  -->
        <template>
          <weekly-pending-exam-card
            v-for="(data, index) in weekly_data"
            :key="index"
            :exam="data"
          />

          <!-- PAGINATION  -->
          <pagination
            v-if="pagination && pagination.pageCount > 1"
            :paging="pagination"
            @navigatePage="paginateData($event)"
          />
        </template>
      </template>

      <!-- EMPTY STATE  -->
      <template v-else>
        <weekly-default
          :loading_state="loading"
          :empty_state="empty_state"
          empty_message="No exam has been created in your school this week.
        Make sure you have a teacher assigned to a class"
        />
      </template>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_reject_modal">
        <reject-pending-modal
          :bulk="true"
          @closeTriggered="toggleRejectModal"
        />
      </transition>

      <transition name="fade" v-if="show_approve_modal">
        <approve-pending-modal
          :bulk="true"
          @closeTriggered="toggleApproveModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import weeklyMixins from "@/modules/dashboard/mixins/weekly-mixins";
import weeklyDefault from "@/modules/dashboard/components/weekly-comps/weekly-default";

export default {
  name: "weeklyPendingExams",

  metaInfo: {
    title: "Weekly Pending Exam",
  },

  mixins: [weeklyMixins],

  computed: {
    ...mapGetters({
      getPendingExamSelected: "dbWeekly/getPendingExamSelected",
    }),
  },

  components: {
    weeklyDefault,
    weeklyPendingExamCard: () =>
      import(
        /* webpackChunkName: "weeklyCard" */ "@/modules/dashboard/components/weekly-comps/weekly-pending-exam-card"
      ),
    weeklyFilterRow: () =>
      import(
        /* webpackChunkName: "weeklyCard" */ "@/modules/dashboard/components/weekly-comps/weekly-filter-row"
      ),
    pagination: () =>
      import(
        /* webpackChunkName: "pagination" */ "@/shared/components/pagination"
      ),
    rejectPendingModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/assessment-review/reject-pending-modal"
      ),
    approvePendingModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/assessment-review/approve-pending-modal"
      ),
  },

  watch: {
    $route: {
      handler(value) {
        let payload = {
          page: 1,
          teacher: value.query.teacher,
          subject: value.query.subject,
          class_name: value.query.class,
        };

        this.fetchAllWeeklyPendingExam(payload);
      },
      deep: true,
    },
  },

  data: () => ({
    all_selected: false,
    is_checked: false,

    show_reject_modal: false,
    show_approve_modal: false,
  }),

  created() {
    this.$bus.$on("reloadPendingList", () =>
      this.fetchAllWeeklyPendingExam({ page: 1 })
    );
  },

  mounted() {
    this.fetchAllWeeklyPendingExam({ page: 1 });
  },

  methods: {
    ...mapActions({
      getPendingWeeklyExams: "dbWeekly/getPendingWeeklyExams",
      updatePendingExamSelection: "dbWeekly/updatePendingExamSelection",
    }),

    toggleRejectModal() {
      this.show_reject_modal = !this.show_reject_modal;
    },

    toggleApproveModal() {
      this.show_approve_modal = !this.show_approve_modal;
    },

    toggleAllStudentSelection() {
      if (this.all_selected) {
        let all_pending_exams = [];
        this.weekly_data.map((item) => all_pending_exams.push(Number(item.id)));
        this.updatePendingExamSelection({ ids: all_pending_exams, bulk: true });

        this.$bus.$emit("togglePendingSelection", true);
      } else {
        this.updatePendingExamSelection({ ids: [], bulk: true });
        this.$bus.$emit("togglePendingSelection", false);
      }
    },

    // FETCH ALL WEEKLY EXAMS
    fetchAllWeeklyPendingExam(payload) {
      this.setPageData(true, false);

      this.getPendingWeeklyExams(payload)
        .then((response) => {
          if (response.code === 200) {
            this.setPageData(
              false,
              false,
              response.data,
              response.pagination[0],
              true
            );
          }

          // EMPTY RESPONSE
          else if (response.code === 204) {
            this.$bus.$emit("show_response_alert", {
              message: "No exam created yet!",
              type: "warning",
            });
            this.setPageData();
          }

          // 4** AND 5** RESPONSE
          else {
            this.$bus.$emit("show_response_alert", {
              message: "An error occured while loading weekly data",
              type: "error",
            });
            this.setPageData();
          }
        })
        .catch(() => this.setPageData());
    },

    // PAGINATE DATA
    paginateData(page) {
      this.setPageData(true, false);
      this.fetchAllWeeklyPendingExam({ page });
    },
  },
};
</script>

<style lang="scss" scoped>
.bulk-selection-row {
  @include flex-row-between-nowrap;
  margin: 0 auto toRem(17);
  padding-left: toRem(2);

  .counter {
    @include font-height(14, 17);
    margin-right: toRem(20);
  }

  .options {
    @include flex-row-start-nowrap;

    .btn {
      padding: toRem(10) toRem(32);
      font-size: toRem(10.5);
    }
  }
}
</style>
