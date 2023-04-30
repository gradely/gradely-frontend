<template>
  <div class="weekly-EVENS">
    <div class="weekly-title-row">
      <!-- TEXT  -->
      <div class="text">Events this week</div>

      <!-- PRINT BUTTON  -->
      <button class="btn btn-whitish" v-if="false">
        <div class="text">Print</div>
        <div class="avatar">
          <div class="icon icon-printer"></div>
        </div>
      </button>
    </div>

    <!-- CONTENT  -->
    <div class="content-area">
      <!-- WEEKLY HEADER  -->
      <template v-if="weekly_data.length">
        <div class="weekly-header weekly-by-3-columns">
          <div class="column-one">Description</div>
          <div class="column-two">Created By</div>
          <div class="column-three">Options</div>
        </div>

        <!-- WEEKLY BODY  -->
        <template>
          <weekly-event-card
            v-for="(data, index) in weekly_data"
            :key="index"
            :event="data"
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
          empty_message="No event has been created in your school this week.
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
  name: "weeklyEvents",

  metaInfo: {
    title: "Weekly Events",
  },

  mixins: [weeklyMixins],

  components: {
    weeklyDefault,
    pagination,
    weeklyEventCard: () =>
      import(
        /* webpackChunkName: "weeklyCard" */ "@/modules/dashboard/components/weekly-comps/weekly-event-card"
      ),
  },

  mounted() {
    this.fetchAllWeeklyEvent({
      page: 1,
      weekly_type: "event",
      counter: this.setCounter(),
    });
  },

  methods: {
    ...mapActions({
      getWeekly: "dbWeekly/getWeeklyData",
    }),

    // FETCH ALL WEEKLY EVENTS
    fetchAllWeeklyEvent(payload) {
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
              message: "No event created yet!",
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

      this.fetchAllWeeklyEvent({ page, weekly_type: "event", search: true });
    },
  },
};
</script>

<style lang="scss" scoped></style>
