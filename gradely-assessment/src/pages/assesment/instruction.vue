<template>
  <div class="instruction-page">
    <!-- BACKGROUND IMAGE -->
    <img
      :src="mxStaticImg('page_background.png')"
      alt=""
      class="background-image"
    />

    <!-- INSTRUCTION CONTAINER -->
    <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 h-100 mx-auto">
      <div class="instruction-container mx-auto">
        <!-- ASSESSMENT TOP -->
        <assessment-top :assessment="assessment" />

        <div
          class="instruction-block white-text-bg box-shadow-effect rounded-15"
        >
          <!-- ASSESSMENT ALERT -->
          <assessment-alert :assessment="assessment" />

          <!-- STUDENT INFO -->
          <student-info-block :assessment="assessment" />

          <!-- INSTRUCTION COLUMN -->
          <instruction-column />
        </div>
      </div>
    </div>

    <div class="bottom-section brand-navy-bg w-100">
      <div
        class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 h-auto mx-auto"
      >
        <!-- EXIT BUTTON -->
        <button
          @click="exitApp"
          class="btn exit-btn"
          :class="!getAuthToken ? 'invisible' : null"
        >
          <div class="icon icon-decline mgr-7"></div>
          Exit
        </button>

        <!-- START BUTTON -->
        <button
          class="btn btn-accent start-btn"
          @click="startExam"
          :disabled="canStartExam ? false : true"
        >
          Start Exam
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { APP_BASE_URL } from "@/env";
import { mapActions } from "vuex";
import assessmentTop from "@/components/instruction/assessment-top";
import assessmentAlert from "@/components/instruction/assessment-alert";
import studentInfoBlock from "@/components/instruction/student-info-block";
import instructionColumn from "@/components/instruction/instruction-column";

export default {
  name: "assessmentInstruction",

  components: {
    assessmentTop,
    assessmentAlert,
    studentInfoBlock,
    instructionColumn,
  },

  computed: {
    canStartExam() {
      return this.assessment?.can_start && this.hasStarted && !this.hasClosed;
    },

    getAppURL() {
      return APP_BASE_URL;
    },

    hasStarted() {
      let today = new Date();
      let open_date = new Date(this.assessment?.open_date);
      let can_start = this.assessment?.can_start;
      return open_date <= today && can_start ? true : false;
    },

    hasClosed() {
      let today = new Date();
      let close_date = new Date(this.assessment?.close_date);
      let can_start = this.assessment?.can_start;
      return today >= close_date && can_start ? true : false;
    },
  },

  created() {
    this.$bus.$emit("show_page_loader", "Loading Exam Details..");
  },

  mounted() {
    this.getExamInfo(this.$route.params.id);
  },

  data() {
    return {
      assessment: {},
    };
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

    getExamInfo(id) {
      this.getExamDetails(id)
        .then((response) => {
          if (response?.code === 200) {
            this.$bus.$emit("show_page_loader");
            this.assessment = response.data;
            console.log(response);
          } else {
            this.$bus.$emit("show_page_loader");
          }
        })
        .catch((err) => {
          this.$bus.$emit("show_page_loader");
          console.log(err);
        });
    },

    startExam() {
      this.$router.push({
        name: "AssessmentQuestions",
        params: { id: this.assessment.id },
      });
    },

    goToLogin() {
      location.href = `${this.getAppURL}/login`;
    },
  },
};
</script>

<style lang="scss" scoped>
.instruction-page {
  position: relative;

  .background-image {
    @include background-cover;
    @include fixed-display-area;
  }

  .instruction-container {
    position: relative;
    top: toRem(70);
    width: 70%;

    @include breakpoint-down(lg) {
      width: 80%;
    }

    @include breakpoint-down(md) {
      top: toRem(60);
      width: 95%;
    }

    @include breakpoint-down(sm) {
      width: 100%;
    }

    .instruction-block {
      padding: toRem(40);
      margin-bottom: toRem(160);

      @include breakpoint-down(lg) {
        padding: toRem(35);
      }

      @include breakpoint-down(md) {
        padding: toRem(30) toRem(35);
      }

      @include breakpoint-down(sm) {
        padding: toRem(26) toRem(22);
      }

      @include breakpoint-down(xs) {
        padding: toRem(22) toRem(16);
      }
    }
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
