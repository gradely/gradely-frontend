<template>
  <div class="selection-top-row w-100">
    <!-- LEFT  -->
    <div class="left-section pdr-12">
      <div class="meta-text color-grey-dark">Student’s Progress in:</div>
      <div class="title-text color-text text-capitalize">
        {{ getCurrentTerm.name }} Term - {{ getCurrentSubject.name }}
      </div>
    </div>

    <!-- RIGHT  -->
    <div class="right-section">
      <!-- SUBJECT CARD  -->
      <drop-select-card
        v-if="!getCurrentSubject.placeholder"
        title="Subject"
        :value="getCurrentSubject.name"
        card_style="mgr-10"
        @toggleCard="toggleSubjectModal"
      />

      <drop-select-card v-else title="Subject" card_style="mgr-10" disabled />

      <!-- TERM CARD  -->
      <drop-select-card
        v-if="getCurrentSubject"
        title="Term"
        :value="getCurrentTerm.name"
        @toggleCard="toggleTermModal"
      />
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_subject_modal">
        <global-select-modal
          @closeTriggered="toggleSubjectModal"
          :modal_detail="{
            title: 'Change Subject',
            pre_selected: getCurrentSubject.id,
            data: getStudentReportSubjects,
            url_data: {
              query_key: 'subject',
              query_value: 'id',
            },
          }"
        />
      </transition>

      <transition name="fade" v-if="show_term_modal">
        <global-select-modal
          @closeTriggered="toggleTermModal"
          :modal_detail="{
            title: 'Change Term',
            pre_selected: getCurrentTerm.name,
            data: terms,
            url_data: {
              query_key: 'term',
              query_value: 'name',
            },
          }"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import dropSelectCard from "@/shared/components/drop-select-card";

export default {
  name: "selectionTopRow",

  components: {
    dropSelectCard,
    switchSubjectModal: () =>
      import(
        /* webpackChunkName: "switchSubjectModal" */ "@/modules/base/modals/reports/switch-subject-modal"
      ),
    globalSelectModal: () =>
      import(
        /* webpackChunkName: "globalSelectModal" */ "@/shared/modals/global-select-modal"
      ),
  },

  computed: {
    ...mapGetters({
      getStudentReportSubjects: "dbReports/getStudentReportSubjects",
      getStudentReport: "dbReports/getStudentReport",
    }),

    getCurrentSubject() {
      let subject_id =
        Number(this.$route.query.subject) ||
        Number(this.getStudentReport?.selectedSubject?.id);
      return (
        this.getStudentReportSubjects?.find((subject) => {
          return Number(subject.id) === subject_id;
        }) || {
          name: "No Subject",
          id: 0,
          placeholder: true,
        }
      );
    },

    getCurrentTerm() {
      return (
        this.terms?.find((term) => {
          return term.name === this.$route.query.term;
        }) || {
          name: "first",
          id: 1,
          selected: true,
        }
      );
    },
  },

  props: {
    report: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    $route: {
      handler(value) {
        value.query.term ? this.checkTermChange(value.query.term) : null;
      },
      deep: true,
      immediate: true,
    },
  },

  data: () => ({
    current_term: "first",

    current_subject: {
      id: 1,
      name: "Mathematics",
    },

    terms: [
      {
        id: 1,
        name: "first",
        slug: "first term",
        selected: false,
      },
      {
        id: 2,
        name: "second",
        slug: "second term",
        selected: false,
      },
      {
        id: 3,
        name: "third",
        slug: "third term",
        selected: false,
      },
    ],

    show_subject_modal: false,
    show_term_modal: false,
  }),

  methods: {
    checkTermChange(term) {
      this.current_term = term;
    },

    toggleSubjectModal() {
      this.show_subject_modal = !this.show_subject_modal;
    },

    toggleTermModal() {
      this.show_term_modal = !this.show_term_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.selection-top-row {
  @include flex-row-between-wrap;
  margin-bottom: toRem(30);

  @include breakpoint-down(lg) {
    margin-bottom: toRem(20);
  }

  .left-section {
    margin-bottom: toRem(10);

    .meta-text {
      @include font-height(12, 16);
      margin-bottom: toRem(2);

      @include breakpoint-down(sm) {
        @include font-height(11, 15);
      }
    }

    .title-text {
      @include font-height(18, 24);
      font-weight: 700;

      @include breakpoint-down(lg) {
        @include font-height(17.5, 22);
      }

      @include breakpoint-down(sm) {
        @include font-height(16, 21);
      }

      @include breakpoint-down(xs) {
        @include font-height(14.5, 19);
      }
    }
  }

  .right-section {
    @include flex-row-end-nowrap;
  }
}
</style>
