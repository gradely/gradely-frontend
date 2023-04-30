<template>
  <div class="user-notes">
    <template v-if="notes.length">
      <user-term-block
        v-for="(note, index) in notes"
        :key="index"
        :date="note.date"
      >
        <template slot="contents">
          <user-note-card
            v-for="(data, index) in note.data"
            :key="index"
            :document="data"
          />
        </template>
      </user-term-block>

      <!-- PAGINATION  -->
      <pagination
        v-if="pagination && pagination.pageCount > 1"
        :paging="pagination"
        @navigatePage="paginateData($event)"
      />

      <!-- LOAD MORE LINK  -->
      <button
        class="btn btn-primary-outline load-more-btn rounded-30"
        v-if="false"
      >
        LOAD MORE
      </button>
    </template>

    <template v-else>
      <default-skeleton-loader
        :empty_state="empty_state"
        :loading_state="loading"
        :empty="{
          title: 'No School Notes!',
          message: 'No school notes has been assigned to your class yet!',
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
import userTermBlock from "@/modules/base/components/assessment-comps/user-term-block";
import pagination from "@/shared/components/pagination";
import defaultSkeletonLoader from "@/shared/components/default-skeleton-loader";

export default {
  name: "userNotes",

  components: {
    pagination,
    userTermBlock,
    defaultSkeletonLoader,
    userNoteCard: () =>
      import(
        /* webpackChunkName: 'userNoteCard' */ "@/modules/base/components/assessment-comps/user-note-card"
      ),
  },

  watch: {
    $route: {
      handler() {
        let query = Object.keys(this.$route.query);

        if (query.length) {
          this.is_search = true;
          this.fetchNotes();
        } else this.fetchNotes();
      },
      immediate: true,
      deep: true,
    },

    search_value: {
      handler() {
        this.is_search = true;
        this.fetchNotes();
      },
    },
  },

  data() {
    return {
      loading: true,
      empty_state: true,
      is_search: false,

      notes: [],
      page: 1,
      pagination: {
        pageCount: 0,
      },

      search_value: null,
    };
  },

  created() {
    this.$bus.$on("searchSchoolwork", (search) => {
      this.search_value = search;
    });
  },

  methods: {
    ...mapActions({
      getSchoolWork: "dbAssessments/getSchoolWork",
    }),

    async fetchNotes() {
      this.defaultSchoolState(true, false);

      let payload = {
        page: this.page,
        type: "notes",
        child_id: this.$route.params.id,
        search: this.is_search,
        subject_id: this.$route?.query?.subject,
        creator_id: this.$route?.query?.creator,
        search_value: this.search_value,
      };

      this.getSchoolWork(payload)
        .then((response) => {
          if (response.code === 200) {
            this.defaultSchoolState(
              false,
              false,
              response.data,
              response.pagination
            );

            this.empty_state = setTimeout(
              () => (this.notes.length ? false : true),
              2000
            );
          }

          // EMPTY STATE
          else if (response.code === 204 || response.code === 406) {
            this.defaultSchoolState();
            this.empty_state = this.notes.length ? false : true;
          }
          // ERROR STATE
          else this.handleErrorState();
        })
        .catch(() => this.handleErrorState());
    },

    // ERROR STATE
    handleErrorState() {
      this.$bus.$emit("show_response_alert", {
        message: "An error occured while loading school work notes",
        type: "error",
      });

      this.defaultSchoolState();
      this.empty_state = this.notes.length ? false : true;
    },

    defaultSchoolState(loading = false, empty = false, data = [], paging = {}) {
      this.loading = loading;
      this.empty_state = empty;
      this.notes = data;
      this.pagination = paging;
    },

    paginateData($event) {
      this.page = $event;
      this.is_search = true;
      this.fetchNotes();
    },
  },
};
</script>

<style lang="scss" scoped></style>
