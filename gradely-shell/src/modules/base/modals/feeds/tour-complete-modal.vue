<template>
  <modal-cover
    @closeModal="dismissTour"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
    :trigger_self_close="false"
  >
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body central-placement">
        <div class="top-row mgb-0">
          <img
            v-if="$route.query.dismissed"
            v-lazy="mxStaticImg('Disappointed.png', 'base')"
            alt="Disappointed"
            class="disppointed-img"
          />

          <img
            v-else
            v-lazy="mxStaticImg('GreatJob.png', 'base')"
            class="w-100"
            alt="Great Job"
          />
        </div>

        <!-- TITLE  -->
        <div class="title-text brand-navy font-weight-700 mgt-15 mgb-13">
          {{ $route.query.dismissed ? "Tour Dismissed!" : "Great Job!" }}
        </div>

        <div class="info-text color-ash text-center mgb--5">
          <div class="text-center mgb-10">
            {{
              $route.query.dismissed
                ? "Well done going through the tour."
                : "Nice job completing the walkthrough."
            }}
          </div>

          <div class="text-center">
            <template v-if="getAuthType === 'school'">
              Find the <span class="icon-circle-question-mark"></span> button on
              your navbar to restart the tour or access more help resources on
              Gradely.
            </template>

            <template v-else>
              Thank you for going through the walkthrough, you can start
              exploring our features.
            </template>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div
        class="
          modal-cover-footer
          d-flex
          align-items-center
          justify-content-center
          mgb-10
        "
      >
        <button
          class="btn btn-accent"
          style="width: max-content"
          @click="dismissTour"
        >
          Dismiss
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "tourCompleteModal",

  components: {
    modalCover,
  },

  methods: {
    ...mapActions({ updateTour: "general/updateTour" }),

    dismissTour() {
      this.updateTour("completed");
      setTimeout(() => (location.href = `/feed/${this.$route.params.id}`), 300);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-row {
  width: toRem(170);
  height: auto;
  @include flex-row-center-nowrap;

  .disppointed-img {
    @include square-shape(135);

    @include breakpoint-down(sm) {
      @include square-shape(125);
    }
  }
}

.title-text {
  @include font-height(21.5, 24);

  @include breakpoint-down(sm) {
    @include font-height(19, 22);
  }
}

.info-text {
  @include font-height(13.5, 24);

  @include breakpoint-down(sm) {
    @include font-height(13, 22);
  }
}
</style>
