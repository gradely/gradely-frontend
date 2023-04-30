<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
    :trigger_self_close="false"
  >
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="top-row">
          <img
            v-lazy="mxStaticImg('UserFeatureCollage.png', 'dashboard')"
            alt="Gradely_Welcome_Tour"
            class="w-100"
          />
        </div>

        <!-- TITLE  -->
        <div class="title-text brand-navy font-weight-700">
          Hello {{ getAuthUser.full_name }},
        </div>

        <div class="info-text color-text text-center">
          Let's help set up your school. It should take 2 minutes.
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex flex-column align-items-center">
        <button class="btn btn-accent mgb-7" @click="initiateTour">
          Begin
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
  name: "startTourModal",

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
      setTimeout(() => this.$emit("closeTriggered"), 300);
    },

    dismissTour() {
      this.updateTour("pending");

      if (this.$route.query.self_initiated) {
        this.$router
          .replace({
            name: "DashboardHome",
          })
          .catch((error) => {
            if (error.name != "NavigationDuplicated") throw error;
          });
      }

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
    margin-top: toRem(-20);
    margin-bottom: toRem(10);

    img {
      min-height: toRem(150);
      height: auto;
      max-height: toRem(200);

      @include breakpoint-down(sm) {
        min-height: toRem(198);
      }
    }
  }

  .title-text {
    @include font-height(16, 19);
    margin-bottom: toRem(11);

    @include breakpoint-down(sm) {
      @include font-height(15, 18);
    }

    @include breakpoint-down(xs) {
      @include font-height(13.25, 17);
    }
  }

  .info-text {
    @include font-height(13, 19);
    margin-bottom: toRem(-7);
    width: 98%;

    @include breakpoint-down(sm) {
      @include font-height(11.75, 18);
    }
  }
}

.modal-cover-footer {
  .btn {
    font-size: toRem(11.5);
    padding: toRem(12) toRem(32);

    @include breakpoint-down(sm) {
      font-size: toRem(11.75);
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
