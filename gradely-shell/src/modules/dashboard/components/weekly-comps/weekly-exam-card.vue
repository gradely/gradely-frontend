<template>
  <div
    class="
      weekly-body
      position-relative
      weekly-by-5-columns
      rounded-2
      white-text-bg
      mgb-2
      pointer
    "
    @click="goToExamReview"
  >
    <!-- LABEL  -->
    <div
      class="label position-absolute h-100 brand-accent-bg smooth-transition"
    ></div>

    <!-- COLUMN ONE  -->
    <div class="column-one">
      <div class="avatar avatar-square brand-red-light-bg mgr-10">
        <img v-lazy="mxStaticImg('Exam.svg', 'dashboard')" alt="" />
      </div>

      <!-- INFO  -->
      <div class="info">
        <div
          class="title-text brand-navy font-weight-700 mgb-2 text-capitalize"
        >
          {{ exam.title }}
        </div>
        <div class="meta-text color-grey-dark d-flex">
          {{ exam.subject }}
          <!-- <div class="dot"></div> -->
          <!-- {{ exam.question_count || 0 }} Questions -->
        </div>
      </div>
    </div>

    <!-- COLUMN TWO  -->
    <div class="column-two text-truncate">{{ getDueDate }}</div>

    <!-- COLUMN THREE  -->
    <div class="column-three text-truncate">{{ exam.class_name }}</div>

    <!-- COLUMN FOUR  -->
    <div class="column-four text-truncate">{{ exam.creator.name }}</div>

    <!-- COLUMN FIVE  -->
    <div class="column-five">
      <button
        @click="toggleStartExam"
        class="btn ignore"
        :class="exam.can_start ? 'btn-soft-tonic' : 'btn-soft-accent'"
      >
        {{ exam.can_start ? "Stop" : "Start" }}
      </button>

      <div
        class="avatar rounded-7 pointer ignore"
        @click="toggleOptions"
        v-on-clickaway="hideOptions"
      >
        <div class="icon icon-ellipsis-h border-grey-dark ignore"></div>
      </div>
    </div>

    <!-- DROPDOWN -->
    <div
      class="
        dropdown
        rounded-5
        box-shadow-effect
        smooth-transition smooth-animation
        white-text-bg
        ignore
      "
      v-if="show_more_option"
    >
      <router-link to class="item">
        <div class="icon-cover">
          <div class="icon icon-eye"></div>
        </div>
        <div class="">View Exam</div>
      </router-link>

      <div class="item ignore" @click="toggleExamLink">
        <div class="icon-cover ignore">
          <div class="icon icon-external-link ignore"></div>
        </div>
        <div class="ignore">Get Exam Link</div>
      </div>

      <div class="item ignore" @click="toggleExamDelete">
        <div class="icon-cover ignore">
          <div class="icon icon-trash ignore"></div>
        </div>
        <div class="ignore">Delete Exam</div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_delete_exam_modal">
        <delete-weekly-exam-modal
          :exam_id="exam.id"
          @closeTriggered="toggleExamDelete"
        />
      </transition>

      <transition name="fade" v-if="show_exam_link_modal">
        <exam-link-modal
          :exam_id="Number(exam.id)"
          @closeTriggered="toggleExamLink"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "weeklyExamCard",

  components: {
    deleteWeeklyExamModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/delete-weekly-exam-modal"
      ),
    examLinkModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/exam-link-modal"
      ),
  },

  props: {
    exam: {
      type: Object,
      default: () => ({
        id: 1,
        title: "Exam title",
        subject: {
          name: "Subject title",
        },
        creator: {
          name: "Teacher name",
        },
        class_name: "Year 1",
        close_date: "Tues 23rd Aug. 2021",
      }),
    },
  },

  computed: {
    getDueDate() {
      let { w2, d3, m4, y1 } = this.$date
        .formatDate(this.exam.close_date)
        .getAll();
      return `${w2} ${d3} ${m4}, ${y1}`;
    },
  },

  data: () => ({
    show_more_option: false,
    show_exam_link_modal: false,
    show_delete_exam_modal: false,
  }),

  methods: {
    ...mapActions({
      approveOrDeclineExam: "dbAssessments/approveOrDeclineExam",
    }),

    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    toggleExamDelete() {
      this.show_delete_exam_modal = !this.show_delete_exam_modal;
    },

    toggleExamLink() {
      this.show_exam_link_modal = !this.show_exam_link_modal;
    },

    toggleStartExam() {
      this.pushAlert(
        this.exam.can_start ? "Stopping exam..." : "Starting exam...",
        "loading"
      );

      let payload = {
        homework_id: this.exam.id,
        assessment_info: {
          status: 1,
          open_date: this.exam.open_date,
          close_date: this.exam.close_date,
          duration: this.exam?.duration ?? this.exam?.questionsDuration ?? 0,
          can_start: this.exam.can_start ? 0 : 1,
          can_see_score: this.exam.can_see_score,
          can_see_answer: this.exam.can_see_answer,
        },
      };

      this.approveOrDeclineExam(payload)
        .then((response) => {
          // console.log(response);

          if (response.code === 200) {
            this.pushAlert(
              this.exam.can_start
                ? "Exam stopped successfully!"
                : "Exam started successfully!",
              "success"
            );

            setTimeout(
              () => this.$bus.$emit("updateStartStatus", this.exam.id),
              500
            );
          } else
            this.pushAlert(
              this.exam.can_start
                ? "Failed to stop exam"
                : "Failed to start exam",
              "warning"
            );
        })
        .catch(() => {
          this.pushAlert("An error occured", "error");
        });
    },

    goToExamReview($event) {
      if (!$event.target.classList.contains("ignore")) {
        this.$router.push({
          name: "AssessmentPendingReview",
          params: {
            id: this.exam.class_id,
            assessment_id: this.exam.id,
          },
          query: { title: this.exam.title },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dot {
  @include square-shape(4.75);
  background: $border-grey-dark;
  margin: auto toRem(7.5);
  position: relative;
  top: toRem(1);
  border-radius: 50%;
}

.column-five {
  @include flex-row-start-nowrap;

  .btn {
    padding: toRem(6.5) toRem(13);
    margin-right: toRem(8);
    font-size: toRem(10);
  }

  .avatar {
    background: rgba($border-grey, 0.3);
    @include square-shape(30);
    @include transition(0.4s);

    @include breakpoint-down(xs) {
      @include square-shape(32);
    }

    .icon {
      @include center-placement;
      font-size: toRem(21);
    }

    &:hover {
      background: rgba($brand-inverse-light, 0.7);
    }
  }
}

.dropdown {
  right: toRem(32);
  top: 80%;

  @include breakpoint-down(lg) {
    right: toRem(18);
  }

  @include breakpoint-down(md) {
    right: toRem(7);
  }
}
</style>
