<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header"> </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-0">
        <!-- TOP  -->
        <div class="top">
          <img v-lazy="mxStaticImg('Switch.svg')" alt="" />

          <div class="text text-center brand-navy">
            You are currently using Gradely in {{ getCatchupMode }} mode
          </div>

          <!-- MODES  -->
          <div class="modes w-100">
            <mode-select-card
              v-for="(mode, index) in mode_list"
              :key="index"
              :mode_index="index"
              :mode="mode"
              @modeSelected="toggleModeSelection"
            />
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
          justify-content-center
          pdt-0
          mgt--10
          mgb-5
        "
      >
        <button
          class="btn modal-btn btn-accent"
          ref="confirmMode"
          @click="switchMode"
        >
          Confirm Switch
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";
import modeSelectCard from "@/shared/components/sidebar-comps/mode-select-card";

export default {
  name: "switchModeModal",

  components: {
    modalCover,
    modeSelectCard,
  },

  data() {
    return {
      mode: "",
      mode_list: [
        {
          image: "Path.svg",
          name: "Practice Mode",
          description: "Practice with Gradely Questions",
          selected: true,
        },
        {
          image: "Notebook.svg",
          name: "Exam Mode",
          description: "Practice with Past Questions",
          selected: false,
        },
      ],
    };
  },

  mounted() {
    this.mode = this.getCatchupMode;
    let mode = this.mode === "practice" ? 0 : 1;
    this.toggleModeSelection(mode);
  },

  methods: {
    ...mapActions({ updateCatchupMode: "auth/updateCatchupMode" }),

    toggleModeSelection($event) {
      this.mode_list.map((mode) => (mode.selected = false));
      this.mode_list[$event].selected = true;

      this.mode = $event === 0 ? "practice" : "exam";
    },

    switchMode() {
      this.handleClick("confirmMode", "Switching...");

      this.updateCatchupMode(this.mode)
        .then((response) => {
          this.handleClick("confirmMode", "Confirm Switch", false);

          if (response.code === 200) {
            this.pushAlert(`Switched to ${this.mode} mode!`, "success");
            this.$bus.$emit("modeUpdated");
            this.$emit("closeTriggered");
          } else {
            this.pushAlert("Failed to switch mode", "warning");
          }
        })
        .catch(() => {
          this.pushAlert("Error switching mode", "error");
          this.handleClick("confirmMode", "Confirm Switch", false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  .top {
    @include flex-column-start-center;

    img {
      @include square-shape(55);
      margin-top: toRem(30);
      margin-bottom: toRem(12);

      @include breakpoint-down(xs) {
        @include square-shape(50);
        margin-top: toRem(15);
      }

      @include breakpoint-custom-down(340) {
        @include square-shape(45);
      }
    }

    .text {
      @include font-height(11.5, 19);
      margin-bottom: toRem(20);
      width: 65%;

      @include breakpoint-down(xs) {
        margin-bottom: toRem(15);
        width: 60%;
      }
    }
  }
}

.modal-cover-footer {
  margin-top: toRem(7);

  @include breakpoint-down(xs) {
    margin-top: toRem(-5) !important;
  }

  .btn {
    @include breakpoint-down(xs) {
      padding: toRem(14) toRem(36) !important;
    }
  }
}
</style>
