<template>
  <div class="selection-top-row w-100">
    <!-- LEFT  -->
    <div class="left-section pdr-12">
      <div class="meta-text color-grey-dark">Student’s Progress in:</div>
      <div class="title-text color-text text-capitalize">
        {{ current_exam.name }} Exam - {{ current_subject.name }}
      </div>
    </div>

    <!-- RIGHT  -->
    <div class="right-section">
      <!-- SUBJECT CARD  -->
      <drop-select-card
        v-if="current_subject.name"
        title="Subject"
        :value="current_subject.name"
        card_style="mgr-10"
        @toggleCard="toggleSubjectModal"
      />

      <drop-select-card v-else title="Subject" card_style="mgr-10" disabled />

      <!-- TERM CARD  -->
      <drop-select-card
        v-if="current_subject.name"
        title="Exam"
        :value="current_exam.name"
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
            pre_selected: current_subject.id,
            data: getExamSubjectList,
            url_data: {
              query_key: 'subject',
              query_value: 'id',
            },
          }"
        />
      </transition>

      <transition name="fade" v-if="show_exam_modal">
        <global-select-modal
          @closeTriggered="toggleTermModal"
          :modal_detail="{
            title: 'Change Exam',
            pre_selected: current_exam.id,
            data: getExamList,
            url_data: {
              query_key: 'exam_id',
              query_value: 'id',
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
  name: "examSelectionTopRow",

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
      getStudentReport: "dbReports/getStudentReport",
      getExamList: "general/getExamList",
      getExamSubjectList: "general/getExamSubjectList",
    }),
  },

  props: {
    report: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    getStudentProfile: {
      handler() {
        this.current_subject = this.getStudentProfile.data.selectedSubject;
      },
      deep: true,
    },

    getStudentReport: {
      handler() {
        this.current_subject = this.getStudentReport.selectedSubject;
        this.current_exam = this.getStudentReport.selectedExam;
      },
      deep: true,
    },
  },

  data: () => ({
    current_exam: {
      id: 1,
      name: "BECE",
    },

    current_subject: {
      id: 1,
      name: "Mathematics",
    },

    show_subject_modal: false,
    show_exam_modal: false,
  }),

  methods: {
    toggleSubjectModal() {
      this.show_subject_modal = !this.show_subject_modal;
    },

    toggleTermModal() {
      this.show_exam_modal = !this.show_exam_modal;
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
