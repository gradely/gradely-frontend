<template>
  <router-link
    v-if="show_assessment"
    :to="{
      name: 'AssessmentSummaryReview',
      params: { id: homework.class_id, assessment_id: homework.id },
      query: { title: homework.title },
    }"
    class="recent-assessment-card position-relative white-text-bg rounded-5 pointer mgb-3"
  >
    <!-- HOVER LABEL  -->
    <div
      class="label position-absolute h-100 brand-accent-bg smooth-transition"
    ></div>

    <!-- INFO COLUMN  -->
    <div class="info-column">
      <div class="avatar avatar-with-meta rounded-5">
        <div class="avatar-title">{{ day }}</div>
        <div class="avatar-meta">{{ month }}</div>
      </div>

      <!-- INFO  -->
      <div class="info">
        <!-- TITLE  -->
        <div class="title-text font-weight-600">
          <span class="brand-primary text-capitalize">{{
            homework.title
          }}</span>
          -
          <span class="status" :class="getClosedStatusStyle">{{
            homework.is_closed ? "CLOSED" : "OPEN"
          }}</span>
        </div>

        <!-- DESCRIPTION  -->
        <div class="description color-grey-dark">
          {{ homework.subject.name }} •
          <span class="text-capitalize font-weight-500" :class="getTagColor">{{
            homework.tag
          }}</span>
        </div>
      </div>
    </div>

    <!-- STAT COLUMN  -->
    <div class="stat-column">
      <div class="color-grey-dark">
        {{ homework.class.class_name }}
      </div>
    </div>

    <div class="option btn-link link-no-underline font-weight-600">View</div>
  </router-link>
</template>

<script>
export default {
  name: "recentAssessmentCard",

  props: {
    homework: {
      type: Object,
      default: () => ({
        id: 1,
        title: "",
        tag: "",
        subject: {
          name: "",
        },
        class: {
          id: 1,
          class_name: "",
        },
        is_closed: 0,
        close_date: "",
      }),
    },
  },

  computed: {
    getTagColor() {
      if (this.homework.tag === "homework") return "brand-inverse";
      else if (this.homework.tag === "exam") return "brand-accent";
      else return "toffee";
    },

    getClosedStatusStyle() {
      if (this.homework.is_closed) return "brand-tonic";
      else return "brand-green";
    },
  },

  data: () => ({
    day: "",
    month: "",
    show_assessment: false,
  }),

  mounted() {
    this.setDate();
  },

  methods: {
    setDate() {
      this.day = this.$date.formatDate(this.homework.close_date).getDay("d2");
      this.month = this.$date
        .formatDate(this.homework.close_date)
        .getMonth("m4");

      this.show_assessment = Number.isNaN(this.day) ? false : true;
    },
  },
};
</script>

<style lang="scss" scoped>
.recent-assessment-card {
  @include flex-row-between-nowrap;
  padding: toRem(10) toRem(14);

  @include breakpoint-down(lg) {
    padding: toRem(10);
  }

  @include breakpoint-down(xs) {
    padding: toRem(9) toRem(8);
  }

  .label {
    left: 0;
    top: 0;
    width: toRem(2);
    border-radius: toRem(5) 0 0 toRem(5);
    display: none;
  }

  &:hover {
    background: rgba($white-text, 0.8) !important;

    .label {
      display: unset;
    }
  }

  .info-column {
    @include flex-row-start-nowrap;
    width: 50%;

    @include breakpoint-down(lg) {
      width: 70%;
    }

    @include breakpoint-down(xs) {
      width: 80%;
    }

    .avatar {
      margin-right: toRem(12);
      @include square-shape(40);

      @include breakpoint-down(lg) {
        margin-right: toRem(8);
        @include square-shape(38);
      }

      @include breakpoint-down(xs) {
        margin-right: toRem(6);
        @include square-shape(36);
      }

      .avatar-title {
        @include font-height(12, 18);

        @include breakpoint-down(lg) {
          @include font-height(11.5, 17);
        }

        @include breakpoint-down(xs) {
          @include font-height(11, 15);
        }
      }

      .avatar-meta {
        @include font-height(10.5, 16.5);

        @include breakpoint-down(lg) {
          @include font-height(10, 15);
          margin-top: toRem(-2);
        }

        @include breakpoint-down(xs) {
          margin-top: toRem(-0.5);
          @include font-height(9, 14);
        }
      }
    }

    .info {
      .title-text {
        @include font-height(13, 18);
        margin-bottom: toRem(2);

        @include breakpoint-down(xs) {
          @include font-height(11.75, 16);
        }

        .status {
          @include font-height(12, 18);

          @include breakpoint-down(xs) {
            @include font-height(11.75, 16);
          }
        }
      }

      .description {
        @include font-height(12, 17);

        @include breakpoint-down(lg) {
          @include font-height(11.25, 15);
        }

        @include breakpoint-down(xs) {
          @include font-height(10.5, 14);
        }
      }
    }
  }

  .stat-column {
    @include font-height(12, 16);
    font-weight: 500;

    @include breakpoint-down(sm) {
      display: none;
    }
  }

  .option {
    width: 10%;
    text-align: right;
    @include font-height(13, 18);
  }
}
</style>
