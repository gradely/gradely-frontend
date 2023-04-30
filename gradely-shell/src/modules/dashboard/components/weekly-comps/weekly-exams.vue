<template>
  <div class="weekly-exam">
    <div class="weekly-title-row">
      <!-- TEXT  -->
      <div class="text">School Exams</div>

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

    <!-- CONTENT  -->
    <div class="content-area">
      <!-- WEEKLY HEADER  -->
      <template v-if="weekly_data.length">
        <div class="weekly-header weekly-by-5-columns">
          <div class="column-one">Description</div>
          <div class="column-two">Date</div>
          <div class="column-three">Class</div>
          <div class="column-four">Created By</div>
          <div class="column-five">Options</div>
        </div>

        <!-- WEEKLY BODY  -->
        <template>
          <weekly-exam-card
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
          empty_message="No exam has been approved this week.
        Make sure you have a teacher assigned to a class"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import weeklyMixins from "@/modules/dashboard/mixins/weekly-mixins";
import weeklyDefault from "@/modules/dashboard/components/weekly-comps/weekly-default";

export default {
  name: "weeklyExams",

  metaInfo: {
    title: "Weekly Exam",
  },

  mixins: [weeklyMixins],

  components: {
    weeklyDefault,
    weeklyExamCard: () =>
      import(
        /* webpackChunkName: "weeklyCard" */ "@/modules/dashboard/components/weekly-comps/weekly-exam-card"
      ),
    weeklyFilterRow: () =>
      import(
        /* webpackChunkName: "weeklyCard" */ "@/modules/dashboard/components/weekly-comps/weekly-filter-row"
      ),
    pagination: () =>
      import(
        /* webpackChunkName: "pagination" */ "@/shared/components/pagination"
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

        this.fetchAllWeeklyExam(payload);
      },
      deep: true,
    },
  },

  created() {
    this.$bus.$on("updateStartStatus", (id) => {
      this.weekly_data.map((exam) => {
        if (exam.id === id) {
          exam.can_start = exam.can_start ? 0 : 1;
        }
      });
    });
  },

  mounted() {
    this.fetchAllWeeklyExam({ page: 1 });
  },

  methods: {
    ...mapActions({
      getApprovedWeeklyExams: "dbWeekly/getApprovedWeeklyExams",
    }),

    // FETCH ALL WEEKLY EXAMS

    fetchAllWeeklyExam(payload) {
      this.setPageData(true, false);

      this.getApprovedWeeklyExams(payload)
        .then((response) => {
          if (response.code === 200) {
            this.setPageData(
              false,
              false,
              response.data ?? [],
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
      this.fetchAllWeeklyExam({ page });
    },
  },
};
</script>

<style lang="scss" scoped></style>
