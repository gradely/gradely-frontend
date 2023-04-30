<template>
  <div class="participant-block">
    <review-wrapper title_text="Participants">
      <template slot="content" v-if="getParticipants.length">
        <!-- ASSESSMENT TABLE  -->
        <template>
          <!-- HEADER  -->
          <template>
            <!-- <participant-exam-table-header v-if="participants[0].proctor" /> -->
            <participant-homework-table-header />
          </template>

          <template v-if="isTourAssessment">
            <div v-for="(student, index) in tour_students" :key="index">
              <participant-homework-table-body
                :counter="index + 1"
                :counts="tour_students.length"
                :student="student"
              />
            </div>
          </template>

          <template v-else>
            <div v-for="(student, index) in getParticipants" :key="index">
              <!-- PROCTOR -->
              <!-- <participant-exam-table-body
              v-if="student.proctor"
              :counter="index + 1"
              :student="student"
            /> -->

              <participant-homework-table-body
                :counter="index + 1"
                :counts="getParticipants.length"
                :student="student"
              />
            </div>
          </template>
        </template>
      </template>

      <!-- DEFAULT STATE  -->
      <template slot="content" v-else>
        <default-skeleton-loader
          :empty_state="!getAssessmentReport"
          :loading_state="!getAssessmentReport"
          :empty="{
            title: 'No Participant Yet!',
            message: 'No student has currently taken this assessment',
          }"
          :cta="{
            has_cta: false,
          }"
        />
      </template>
    </review-wrapper>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import STUDENTS from "@/store/general/students";

export default {
  name: "participantBlock",

  metaInfo: {
    title: "Assessment Participant",
  },

  components: {
    reviewWrapper: () =>
      import(
        /* webpackChunkName "assessment-summary" */ "@/modules/base/components/assessment-review-comps/review-wrapper"
      ),
    defaultSkeletonLoader: () =>
      import(
        /* webpackChunkName "default" */ "@/shared/components/default-skeleton-loader"
      ),
    participantExamTableHeader: () =>
      import(
        /* webpackChunkName "assessment-participant" */ "@/modules/base/components/assessment-review-comps/participant-exam-table-header"
      ),
    participantExamTableBody: () =>
      import(
        /* webpackChunkName "assessment-participant" */ "@/modules/base/components/assessment-review-comps/participant-exam-table-body"
      ),
    participantHomeworkTableHeader: () =>
      import(
        /* webpackChunkName "assessment-participant" */ "@/modules/base/components/assessment-review-comps/participant-homework-table-header"
      ),
    participantHomeworkTableBody: () =>
      import(
        /* webpackChunkName "assessment-participant" */ "@/modules/base/components/assessment-review-comps/participant-homework-table-body"
      ),
  },

  computed: {
    ...mapGetters({ getAssessmentReport: "dbAssessments/getAssessmentReport" }),

    getParticipants() {
      if (this.$route.query.tour || this.isTourAssessment) {
        return [1];
      } else {
        if (!this.getAssessmentReport) return [];
        return this.getAssessmentReport.students_taken;
      }
    },

    isTourAssessment() {
      let tour_titles = [
        "Gradely Tour",
        "Gradely Tour Session",
        "Gradely Class Tour",
        "Class Tour",
        "Gradely LMS Tour",
      ];

      return tour_titles.includes(this.$route.query?.title) ? true : false;
    },
  },

  data: () => ({
    loading: true,
    empty: false,

    participants: [],
    tour_students: STUDENTS,
  }),
};
</script>

<style lang="scss" scoped></style>
