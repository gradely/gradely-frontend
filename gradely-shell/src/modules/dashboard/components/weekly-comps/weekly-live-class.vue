<template>
  <div class="weekly-live-class">
    <div class="weekly-title-row">
      <!-- TEXT  -->
      <div class="text">Live Classes this week</div>

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
          <div class="column-two">Lesson Date</div>
          <div class="column-three">Class</div>
          <div class="column-four">Teacher</div>
        </div>

        <!-- WEEKLY BODY  -->
        <template>
          <weekly-live-class-card
            v-for="(data, index) in weekly_data"
            :key="index"
            :live_class="data"
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
          empty_message="No live class has been scheduled in your school this week.
        Make sure you have a teacher assigned to a class"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import weeklyMixins from "@/modules/dashboard/mixins/weekly-mixins";
import pagination from "@/shared/components/pagination";
import weeklyDefault from "@/modules/dashboard/components/weekly-comps/weekly-default";

export default {
  name: "weeklyLiveClass",

  metaInfo: {
    title: "Weekly Live Class",
  },

  mixins: [weeklyMixins],

  components: {
    weeklyDefault,
    pagination,
    weeklyLiveClassCard: () =>
      import(
        /* webpackChunkName: "weeklyCard" */ "@/modules/dashboard/components/weekly-comps/weekly-live-class-card"
      ),
    weeklyFilterRow: () =>
      import(
        /* webpackChunkName: "weeklyCard" */ "@/modules/dashboard/components/weekly-comps/weekly-filter-row"
      ),
  },

  watch: {
    $route: {
      handler(value) {
        let payload = {
          page: 1,
          weekly_type: "live-class",
          search: true,
          teacher: value.query.teacher,
          subject: value.query.subject,
          class_name: value.query.class,
        };

        this.fetchAllWeeklyLiveClass(payload);
      },
      deep: true,
    },
  },

  mounted() {
    this.fetchAllWeeklyLiveClass({
      page: 1,
      weekly_type: "live-class",
      counter: this.setCounter(),
    });
  },

  methods: {
    ...mapActions({
      getWeekly: "dbWeekly/getWeeklyData",
    }),

    // FETCH ALL WEEKLY LIVE CLASS
    fetchAllWeeklyLiveClass(payload) {
      this.setPageData(true, false);

      this.getWeekly(payload)
        .then((response) => {
          if (response.code === 200)
            this.setPageData(
              false,
              false,
              response.data,
              response.pagination,
              true
            );
          // EMPTY RESPONSE
          else if (response.code === 204) {
            this.$bus.$emit("show_response_alert", {
              message: "No live class scheduled yet!",
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

      this.fetchAllWeeklyExam({
        page,
        weekly_type: "live-class",
        search: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
