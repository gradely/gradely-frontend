<template>
  <div class="summary-block">
    <!-- REMEDIAL ALERT CARD  -->
    <remedial-alert-card v-if="false" />

    <!-- LESSON RECOMMENDATIONS -->
    <div class="position-relative" v-if="getResources">
      <review-wrapper title_text="Resources to help your students">
        <template slot="content">
          <div class="outer-wrapper position-relative">
            <div class="lesson-row position-relative" ref="lessonRow">
              <lesson-recommend-card
                v-for="(item, index) in resources"
                :key="index"
                :resource="item"
                :students="resource_students"
              />
            </div>

            <!-- NAVIGATION -->
            <template v-if="getResources > 2">
              <div
                class="nav left-nav"
                title="Slide Left"
                @click="scrollLessonRow(-200)"
              >
                <div class="wrapper">
                  <div class="icon icon-caret-left"></div>
                </div>
              </div>

              <div
                class="nav right-nav"
                title="Slide Right"
                @click="scrollLessonRow(+200)"
              >
                <div class="wrapper">
                  <div class="icon icon-caret-right"></div>
                </div>
              </div>
            </template>

            <!-- TOUR DESCRIPTION TEXT -->
            <div
              class="
                tour-description
                brand-inverse-bg
                rounded-5
                position-absolute
                smooth-animation
                h-auto
              "
              v-if="show_tooltip"
            >
              <!-- TOUR TEXT -->
              <div class="tour-text black-text">
                Some students failed questions in this topic. Share a lesson
                resource to help them improve.
              </div>
            </div>
          </div>
        </template>
      </review-wrapper>
    </div>

    <!-- HELP STUDENTS BLOCK ONE  -->
    <template v-if="!this.isTourAssessment">
      <review-wrapper
        title_text="Help these students"
        v-if="getStrugglingStudents.length"
      >
        <template slot="content">
          <help-child-card
            v-for="(student, index) in getStrugglingStudents"
            :key="index"
            :student="student"
          />
        </template>
      </review-wrapper>
    </template>

    <!-- HELP STUDENTS BLOCK TWO  -->
    <review-wrapper
      title_text="Help your students here"
      description="Click on a question to reveal the student(s)"
      v-if="getWeakQuestions.length"
    >
      <template slot="content">
        <template v-for="(question, index) in getWeakQuestions">
          <help-child-accordion
            v-if="question.wrong_students.length"
            :key="index"
            :question="question"
            :total_students="getTotalExpectedStudent"
          />
        </template>

        <!-- SHOW MORE  -->
        <div class="show-more-link btn-link" v-if="false">
          Show More Questions
        </div>
      </template>
    </review-wrapper>

    <!--QUESTIONS ATTEMPTED  -->
    <review-wrapper title_text="Questions Attempted">
      <template slot="content" v-if="$route.query.tour || isTourAssessment">
        <question-card
          v-for="(question, index) in tour_questions"
          :key="index"
          :counter="index + 1"
          :question="question"
        />
      </template>

      <template v-else>
        <template slot="content" v-if="getQuestions">
          <template>
            <question-card
              v-for="(question, index) in questions"
              :key="index"
              :counter="index + 1"
              :question="question"
            />
          </template>

          <!-- SHOW MORE  -->
          <div class="show-more-link btn-link" v-if="false">
            Show More Questions
          </div>
        </template>

        <!-- EMPTY STATE  -->
        <template slot="content" v-else>
          <default-skeleton-loader
            :empty_state="empty"
            :loading_state="loading"
            :empty="{
              title: 'No Questions Available!',
              message: 'No question data available, It seems you are offline',
            }"
            :cta="{
              has_cta: false,
            }"
          />
        </template>
      </template>
    </review-wrapper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TOUR_QUESTIONS from "@/store/general/questions";
import TOUR_RECOMMENDATIONS from "@/store/general/tour-recommendations";
import STUDENTS from "@/store/general/students";
import WEAK_STUDENTS from "@/store/general/weak-students";

export default {
  name: "summaryBlock",

  metaInfo: {
    title: "Assessment Summary",
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
    remedialAlertCard: () =>
      import(
        /* webpackChunkName "assessment-summary" */ "@/modules/base/components/assessment-review-comps/remedial-alert-card"
      ),
    lessonRecommendCard: () =>
      import(
        /* webpackChunkName "assessment-summary" */ "@/modules/base/components/assessment-review-comps/lesson-recommend-card"
      ),
    helpChildCard: () =>
      import(
        /* webpackChunkName "assessment-summary" */ "@/modules/base/components/assessment-review-comps/help-child-card"
      ),
    helpChildAccordion: () =>
      import(
        /* webpackChunkName "assessment-summary" */ "@/modules/base/components/assessment-review-comps/help-child-accordion"
      ),
    questionCard: () =>
      import(
        /* webpackChunkName "assessment-summary" */ "@/modules/base/components/assessment-review-comps/question-card"
      ),
    tourCover: () =>
      import(/* webpackChunkName: "modal" */ "@/shared/components/tour-cover"),
  },

  computed: {
    ...mapGetters({ getAssessmentReport: "dbAssessments/getAssessmentReport" }),

    getStrugglingStudents() {
      if (!this.getAssessmentReport) return [];
      else {
        if (this.$route.query.tour || this.isTourAssessment) return [];
        return this.getAssessmentReport?.students_taken?.filter((student) => {
          return student.score <= 40 && student.is_graded;
        });
      }
    },

    getTotalExpectedStudent() {
      return this.isTourAssessment
        ? STUDENTS.length ?? 5
        : this.getAssessmentReport?.summary?.expected_students ?? 0;
    },

    getWeakQuestions() {
      return this.isTourAssessment
        ? this.tour_weak_students
        : this.getAssessmentReport?.weak_questions ?? [];
    },

    getQuestions() {
      return this.questions?.length ?? 0;
    },

    getResources() {
      return this.resources?.length ?? 0;
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

  watch: {
    getAssessmentReport: {
      handler(value) {
        if (this.$route?.query?.tour || this.isTourAssessment) return false;
        else {
          if (Object.keys(value?.recommendations).length) {
            this.resources = value?.recommendations?.resources ?? [];
            this.resource_students = value?.recommendations?.students ?? [];
          } else {
            this.resources = this.resource_students = [];
          }
        }
      },
    },

    show_tour_cover: {
      handler(value) {
        if (value) setTimeout(() => (this.show_tooltip = true), 3000);
        else this.show_tooltip = false;
      },
      immediate: true,
    },
  },

  data: () => ({
    loading: true,
    empty: false,

    students: [],
    questions: [],

    tour_questions: [],
    tour_weak_students: [],

    resources: [],
    resource_students: [],

    show_left: false,
    show_right: true,

    show_tour_cover: false,
    show_tooltip: false,
  }),

  created() {
    this.checkForOngoingTour();
  },

  mounted() {
    this.fetchAssessmentQuestions();
  },

  methods: {
    ...mapActions({
      getAssessmentDetails: "dbAssessments/getAssessmentDetails",
      getAssessmentInfo: "dbAssessments/getAssessmentInfo",
      getFeatureLogger: "general/getFeatureLogger",
    }),

    checkForOngoingTour() {
      // localStorage.setItem(
      //   "selectedTourQuestions",
      //   JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])
      // );

      if (this.$route?.query?.tour || this.isTourAssessment) {
        if (this.$route?.query?.tour) this.show_tour_cover = true;

        // FETCH TOUR BASED RESOURCES
        // this.getTourRecommendations();
        this.resources = TOUR_RECOMMENDATIONS;
        this.loadSelectedTourQuestions();
      } else this.show_tour_cover = false;
    },

    loadSelectedTourQuestions() {
      // CHECK IF SELECTED TOUR QUESTIONS EXIST IN LOCAL STORAGE
      let selected_questions = localStorage.getItem("selectedTourQuestions");

      // GET FROM LOCAL STORAGE
      if (selected_questions) this.getTourQuestions(selected_questions);
      // GET FROM LOGGER
      else {
        this.getFeatureLogger(`SAVED_TOUR_${this.$route.params.assessment_id}`)
          .then((response) => this.getTourQuestions(response?.data[0]?.value))
          .catch((err) => console.log(err));
      }
    },

    getTourQuestions(selected) {
      this.tour_questions = [];
      this.tour_weak_students = [];
      let parsed_questions = JSON.parse(selected);

      // GET TOUR QUESTIONS
      TOUR_QUESTIONS.map((question) => {
        if (parsed_questions.includes(question.id))
          this.tour_questions.push(question);
      });

      // GET WEAK STUDENTS
      WEAK_STUDENTS.map((student, index) => {
        this.tour_weak_students.push({
          ...this.tour_questions[index],
          wrong_students: student.wrong_students,
        });
      });
    },

    scrollLessonRow(scroll_value) {
      let lesson_row = this.$refs.lessonRow;
      lesson_row.scrollLeft += scroll_value;
      lesson_row.scrollBehaviour = "smooth";
    },

    // FETCH ALL ASSESSMENT QUESTIONS DETAILS
    fetchAssessmentQuestions() {
      this.defaultQuestionState();

      let payload = {
        homework_id: this.$route.params.assessment_id,
        type: "question",
      };

      this.getAssessmentDetails(payload)
        .then((response) => {
          if (response.code === 200)
            this.defaultQuestionState(false, false, response.data);
          else this.defaultQuestionState(false, true);
        })
        .catch(() => {
          this.$bus.$emit("show_response_alert", {
            message: "An error occured while loading assessment question data",
            type: "error",
          });

          this.defaultQuestionState(false, true);
        });
    },

    getTourRecommendations() {
      this.getAssessmentInfo({
        id: this.$route.params.assessment_id,
        tour: true,
      })
        .then((response) => {
          if (response.code === 200) {
            this.resources = response?.data?.resources;
            this.resource_students = response?.data?.students;

            let single_practice = this.resources.at(1);
            let mixed_practice = this.resources.at(2);
            let remedial = this.resources.at(3);

            this.resources[1] = remedial;
            this.resources[2] = single_practice;
            this.resources[3] = mixed_practice;
          }
        })
        .catch(() => console.log("Tour resources failed"));
    },

    // LOAD DEFAULT QUESTION STATE
    defaultQuestionState(loading = true, empty = false, data = []) {
      this.loading = loading;
      this.empty = empty;
      this.questions = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.lesson-row {
  @include flex-row-start-nowrap;
  padding-bottom: toRem(15);
  overflow: auto;

  &::-webkit-scrollbar {
    height: toRem(3);
  }

  &::-webkit-scrollbar-track {
    border-radius: toRem(3);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: toRem(3);
    background: $brand-accent;
  }
}

.nav {
  @include transition(0.4s);
  @include square-shape(32);
  @include center-y;
  margin-top: toRem(-10);
  background: $brand-navy;
  border-radius: 50%;
  cursor: pointer;
  z-index: 9;

  &:hover {
    background: rgba($brand-navy, 0.8);
  }

  @include breakpoint-down(sm) {
    display: none;
  }

  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    .icon {
      @include center-placement;
      color: $brand-inverse-light;
      font-size: toRem(12);
    }
  }
}

.left-nav {
  left: toRem(-5);
}

.right-nav {
  right: toRem(-5);
}

.show-more-link {
  @include font-height(14, 19);

  @include breakpoint-down(sm) {
    @include font-height(13, 18);
  }
}

.tour-description {
  z-index: 999;
  left: toRem(166);
  top: toRem(285);

  @include breakpoint-down(sm) {
    left: toRem(10);
    top: toRem(277);
  }

  @include breakpoint-down(xs) {
    width: toRem(250);
    left: toRem(14);
    top: toRem(265);
  }

  &::after {
    background: $brand-inverse;

    @include breakpoint-down(sm) {
      left: 69%;
    }
  }
}
</style>
