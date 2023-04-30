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

    <!-- COLUMN SELECT -->
    <div class="column-select ignore">
      <div class="selection checkbox-inline ignore">
        <input
          type="checkbox"
          class="ignore"
          v-model="is_checked"
          :checked="is_checked"
          @click="selectPendingExam"
        />
      </div>
    </div>

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
          <div class="dot"></div>
          {{ exam.question_count || 0 }} Questions
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
      <button class="btn review-btn">
        <div class="icon icon-alert-circle"></div>
        <div class="text">Review</div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "weeklyPendingExamCard",

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
        created_at: "Tues 23rd Aug. 2021",
      }),
    },
  },

  computed: {
    getDueDate() {
      let { w2, d3, m4, y1 } = this.$date
        .formatDate(this.exam.created_at)
        .getAll();
      return `${w2} ${d3} ${m4}, ${y1}`;
    },
  },

  data: () => ({
    is_checked: false,
  }),

  created() {
    this.$bus.$on("togglePendingSelection", (checked) =>
      this.handleSelection(checked)
    );
  },

  methods: {
    ...mapActions({
      updatePendingExamSelection: "dbWeekly/updatePendingExamSelection",
    }),

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

    selectPendingExam() {
      this.updatePendingExamSelection({ id: Number(this.exam.id) });
    },

    handleSelection(checked) {
      this.is_checked = checked;
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

.review-btn {
  background: $color-white;
  padding: toRem(8) toRem(18);

  &:hover {
    background: $brand-accent-light;
  }

  .icon {
    margin-right: toRem(4);
    font-size: toRem(15.5);
    color: $brand-navy;
  }

  .text {
    font-size: toRem(10.5);
    color: $color-ash;
  }
}
</style>
