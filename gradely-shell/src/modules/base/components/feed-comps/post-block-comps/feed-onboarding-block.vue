<template>
  <div
    class="post-container-block mgb-10 border-brand position-relative"
    :class="show_tour_cover ? 'tour-index' : null"
  >
    <!-- POST INTRO  -->
    <post-intro :intro="intro_content" :post="{ type: 'Gradely' }" />

    <!-- CONTENT AREA  -->
    <div class="content-area">
      <post-content-text
        :content="{
          custom_text:
            'While we wait for your students to join the class. Take a look at how Gradely assessment can help your students',
        }"
      />

      <slot name="content-area"></slot>

      <!-- BOTTOM AREA -->
      <div class="bottom-area position-relative d-flex justify-content-start">
        <div class="spacer"></div>

        <div class="padded-area pdt-0 overflow-auto">
          <!-- STUDENT ROW -->
          <div class="student-row mgb-5">
            <child-onboarding-card
              v-for="(student, index) in tour_students"
              :key="index"
              :student="student"
            />
          </div>

          <!-- ASSESSMENT BUTTON -->
          <button
            class="btn btn-soft-accent w-100 text-capitalize mgb-15"
            @click="createTourAssessment"
          >
            Create Assessment
          </button>

          <!-- HELP SUPPORT BLOCK -->
          <help-support-block />
        </div>
      </div>
    </div>

    <!-- TOUR DESCRIPTION TEXT -->
    <div
      class="tour-description white-text-bg rounded-5 h-auto smooth-animation"
      v-if="show_tooltip"
    >
      <!-- TOUR TEXT -->
      <div class="tour-text color-text">
        Quickly create a simple assessment for your class students now.
      </div>

      <!-- TOUR CTA -->
      <div class="tour-cta">
        <router-link
          :to="{
            name: 'GradelyFeeds',
            params: { id: $route.params.id },
            query: { completed_tour: true, dismissed: true },
          }"
          class="btn transparent-bg no-shadow color-text ignore"
        >
          Dismiss
        </router-link>

        <button
          class="btn modal-btn btn-accent ignore"
          @click="createTourAssessment"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { EXTERNAL_URL } from "@/env";
import { mapGetters, mapActions } from "vuex";
import postIntro from "@/modules/base/components/feed-comps/post-block-comps/post-intro";
import postContentText from "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/post-content-text";
import STUDENTS from "@/store/general/students";

export default {
  name: "feedOnboardingBlock",

  components: {
    postIntro,
    postContentText,
    childOnboardingCard: () =>
      import(
        /* webpackChunkName: "FeedEntry" */ "@/modules/base/components/feed-comps/post-block-comps/child-onboarding-card"
      ),
    helpSupportBlock: () =>
      import(
        /* webpackChunkName: "FeedEntry" */ "@/modules/base/components/feed-comps/post-block-comps/help-support-block"
      ),
  },

  props: {
    intro_content: Object,
  },

  computed: {
    ...mapGetters({ getTour: "general/getTour" }),
  },

  watch: {
    getTour: {
      handler(value) {
        setTimeout(() => {
          this.show_tour_cover =
            value.step === 4 &&
            value.step_progress === "ongoing" &&
            !value.completed_tour
              ? true
              : false;
        }, 3000);
      },
      immediate: true,
      deep: true,
    },
  },

  data() {
    return {
      show_tour_cover: false,
      show_tooltip: false,

      form: {
        title: "Gradely LMS Tour",
        subject_id: 2,
        class_id: [this.$route.params.id],
        tag: "homework",
        open_date: "",
        close_date: "",
        view_by: "me",
        description: "",
        is_proctor: 0,
        selected_student: 0,
        student_selected_id: [null],
      },

      tour_students: STUDENTS,
    };
  },

  mounted() {
    setTimeout(
      () => (window.innerWidth <= 768 ? window.scrollTo(0, 250) : null),
      300
    );

    setTimeout(() => (this.show_tooltip = true), 6000);
  },

  methods: {
    ...mapActions({
      updateTour: "general/updateTour",
      createAssessment: "dbFeeds/createAssessment",
    }),

    cleanUpDate(date) {
      let datetime = date.split("T");
      return `${datetime[0]} ${datetime[1]}`;
    },

    createTourAssessment() {
      let [start, end] = this.$date.getStartEndDate();
      this.form.open_date = this.cleanUpDate(start);
      this.form.close_date = this.cleanUpDate(end);

      this.createAssessment({ payload: this.form, tour: 1 })
        .then((response) => {
          if (response.code === 200) {
            this.updateTour("ongoing");

            let tour_step = this.$string.encodeString(
              this.getAuthType === "school" ? 5 : 4
            );

            setTimeout(
              () =>
                (location.href = EXTERNAL_URL(
                  "lms",
                  `/select-question/${response.data.id}?tour=${tour_step}&class_tour_id=${this.$route.params.id}`
                )),
              200
            );
          }
          // FAILED CREATION
          else this.pushAlert("Assessment creation failed", "error");
        })
        .catch(() => {
          this.pushAlert("Assessment creation failed", "error");
          this.handleClick("continueBtn", "Continue", false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.post-container-block {
  overflow: unset;

  .bottom-area {
    margin-top: toRem(10);

    @include breakpoint-down(sm) {
      margin-top: 0;
    }

    .student-row {
      @include flex-row-start-nowrap;
      padding-bottom: toRem(10);
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
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
    .btn {
      font-size: toRem(12.25);

      @include breakpoint-down(sm) {
        font-size: toRem(11.45);
      }
    }
  }

  .tour-description {
    position: absolute;
    padding: toRem(12) toRem(14);
    width: toRem(245);
    left: 53%;
    top: 89%;

    @include breakpoint-down(sm) {
      left: 30%;
      top: 88%;
      width: toRem(230);
    }

    .tour-text {
      @include font-height(11.5, 19);
      margin-bottom: toRem(9);

      @include breakpoint-down(sm) {
        @include font-height(11, 18);
      }
    }

    .tour-cta {
      @include flex-row-end-nowrap;

      .btn {
        font-size: toRem(10);

        @include breakpoint-down(xs) {
          font-size: toRem(10.25);
        }
      }
    }
  }
}
</style>
