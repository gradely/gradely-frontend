<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-mini' }"
    :trigger_self_close="false"
  >
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="top-row">
          <img
            v-lazy="mxStaticImg('TeacherOnboarding.png', 'dashboard')"
            alt="Gradely_Welcome_Tour"
            class="w-100 background-image"
          />

          <!-- GRADELY ICON -->
          <img
            v-lazy="mxStaticImg('logoMarker.svg')"
            class="gradely-icon"
            alt=""
          />
        </div>

        <!-- TITLE  -->
        <div class="title-text brand-navy font-weight-700">
          Welcome to your Digital Classroom
        </div>

        <div class="info-text color-text text-center">
          Send class updates, assessments, notes, videos and more. Start
          building your digital classroom community today!
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex flex-column align-items-center">
        <button class="btn btn-accent mgb-7" @click="initiateTour">
          Let's go
        </button>

        <div
          class="btn-link link color-ash smooth-transition"
          @click="dismissTour"
        >
          No thanks, I’ve got this
        </div>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "teacherStartTourModal",

  components: {
    modalCover,
  },

  computed: {
    ...mapGetters({ getTour: "general/getTour" }),
  },

  methods: {
    ...mapActions({ updateTour: "general/updateTour" }),

    initiateTour() {
      this.updateTour("ongoing");
      setTimeout(
        () =>
          this.$router.push(
            `${this.$route.path}?tour=${this.$string.encodeString(2)}`
          ),
        200
      );

      setTimeout(() => this.$emit("closeTriggered"), 300);
    },

    dismissTour() {
      this.updateTour("completed");
      setTimeout(() => this.$emit("closeTriggered"), 300);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  margin-top: toRem(40);
  @include flex-column-start-center;

  .top-row {
    width: 90%;
    position: relative;
    margin-top: toRem(-20);
    margin-bottom: toRem(15);

    .background-image {
      min-height: toRem(210);
      height: auto;
      max-height: toRem(220);

      @include breakpoint-down(sm) {
        min-height: toRem(160);
        max-height: toRem(160);
      }
    }

    .gradely-icon {
      @include center-placement;
      @include square-shape(62);

      @include breakpoint-down(sm) {
        @include square-shape(48);
      }
    }
  }

  .title-text {
    @include font-height(15.5, 19);
    margin-bottom: toRem(9);

    @include breakpoint-down(sm) {
      @include font-height(15, 18);
    }

    @include breakpoint-down(xs) {
      @include font-height(13.25, 17);
    }
  }

  .info-text {
    @include font-height(12.5, 22);
    margin-bottom: toRem(-7);
    width: 98%;

    @include breakpoint-down(sm) {
      @include font-height(11.75, 22);
    }
  }
}

.modal-cover-footer {
  .btn {
    font-size: toRem(11);
    padding: toRem(12) toRem(32);

    @include breakpoint-down(sm) {
      font-size: toRem(11.5);
      padding: toRem(12) toRem(45);
    }
  }

  .link {
    margin-top: toRem(10);
    margin-bottom: toRem(15);
    @include font-height(12.75, 17);

    @include breakpoint-down(sm) {
      margin-bottom: toRem(10);
      @include font-height(12, 17);
    }

    &:hover {
      color: $brand-accent !important;
    }
  }
}
</style>
