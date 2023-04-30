<template>
  <div class="assessment-questions">
    <!-- BACKGROUND IMAGE -->
    <img
      :src="mxStaticImg('page_background.png')"
      alt="gradelyAssessment"
      class="background-image"
    />

    <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 h-100 mx-auto">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum deleniti
      earum possimus omnis corporis corrupti dolores consequuntur tenetur quod,
      sed debitis! Accusantium saepe nisi assumenda doloribus, voluptatum culpa
      voluptates nulla eveniet similique nihil harum sint odio corrupti.
      Molestiae, unde. Quae voluptatum sequi similique officia! Doloribus modi
      recusandae ut voluptas libero quisquam, laudantium facilis similique cum.
      Qui alias ullam asperiores iste?
    </div>

    <div class="bottom-section brand-navy-bg w-100">
      <div
        class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 h-auto mx-auto"
      >
        <!-- EXIT BUTTON -->
        <button class="btn exit-btn">
          <div class="icon icon-arrow-left mgr-7"></div>
          Prev
        </button>

        <!-- START BUTTON -->
        <button class="btn btn-accent start-btn font-weight-700">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { APP_BASE_URL } from "@/env";
import { mapActions } from "vuex";

export default {
  name: "assessmentQuestions",

  components: {},

  computed: {},

  created() {},

  mounted() {},

  data() {
    return {};
  },

  methods: {
    ...mapActions(["getExamDetails"]),

    exitApp() {
      let student_id = this.getAuthUser.id;
      let base_url =
        process.env.NODE_ENV == "development"
          ? "http://localhost:8093/feed/"
          : APP_BASE_URL + "/feed/";
      location.href = base_url + student_id;
    },
  },
};
</script>

<style lang="scss" scoped>
.assessment-questions {
  position: relative;

  .background-image {
    @include background-cover;
    @include fixed-display-area;
  }

  .bottom-section {
    position: fixed;
    bottom: 0;

    .gradely-container {
      @include flex-row-between-nowrap;
      padding-top: toRem(12);
      padding-bottom: toRem(12);

      .exit-btn {
        .icon {
          font-size: toRem(18);
        }

        &:hover {
          background: $white-text !important;
          color: $brand-navy !important;
        }
      }
    }
  }
}
</style>
