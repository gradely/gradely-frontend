<template>
  <div class="study-mode-block">
    <div class="title-text font-weight-600 color-text">STUDY MODES</div>

    <!-- MODE ROW -->
    <div class="mode-row">
      <div class="mode" v-for="(mode, index) in mode_list" :key="index">
        <mode-select-card
          :mode_index="index"
          :mode="mode"
          @modeSelected="toggleModeSelection"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import modeSelectCard from "@/shared/components/sidebar-comps/mode-select-card";

export default {
  name: "studyModeBlock",

  components: {
    modeSelectCard,
  },

  props: {
    child: {
      type: [Object, Boolean],
    },
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
    this.getMode();
  },

  methods: {
    ...mapActions({ updateCatchupMode: "auth/updateCatchupMode" }),

    getMode() {
      this.mode_list.map((mode) => (mode.selected = false));

      if (this.child)
        this.child.mode === "practice"
          ? (this.mode_list[0].selected = true)
          : (this.mode_list[1].selected = true);
      else this.mode_list[0].selected = true;
    },

    toggleModeSelection($event) {
      this.pushAlert("Switching study mode", "loading");

      this.mode_list.map((mode) => (mode.selected = false));
      this.mode_list[$event].selected = true;

      this.mode = $event === 0 ? "practice" : "exam";

      setTimeout(() => this.switchMode(), 2500);
    },

    switchMode() {
      this.updateCatchupMode(this.mode)
        .then((response) => {
          if (response.code === 200) {
            this.pushAlert(`Switched to ${this.mode} mode!`, "success");
            this.$bus.$emit("modeUpdated");
          } else {
            this.pushAlert("Failed to switch mode", "warning");
          }
        })
        .catch(() => {
          this.pushAlert("Error switching mode", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.study-mode-block {
  margin-bottom: toRem(20);
  .title-text {
    @include font-height(13.25, 18);
    margin-bottom: toRem(10);
    padding-left: toRem(10);

    @include breakpoint-down(lg) {
      @include font-height(12, 17);
    }

    @include breakpoint-down(sm) {
      @include font-height(11, 16);
    }
  }

  .mode-row {
    @include flex-row-between-wrap;

    .mode {
      width: 49%;

      @include breakpoint-down(sm) {
        width: 100%;
      }
    }
  }
}
</style>
