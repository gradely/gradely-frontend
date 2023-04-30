<template>
  <div
    class="downloading-progress w-100 h-100 brand-navy position-relative brand-green-light-bg border-brand-green"
  >
    <div class="progress fill" :style="'width:' + progress + '%'"></div>
    <!-- LOADING TEXT PROGRESS  -->
    <div class="text">
      <div class="info">Downloading: {{ file_name }}</div>

      <div class="percent">{{ progress }}%</div>
    </div>

    <!-- CLOSE ICON  -->
    <div
      class="close-icon rounded-circle pointer index-1"
      title="Cancel Download"
      @click="cancelFileDownload"
    >
      <div class="position-relative w-100 h-100">
        <div class="icon icon-decline off-white"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "fileDownloaderProgress",

  props: {
    file_name: {
      type: String,
      default: "File.jpg",
    },

    progress: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    ...mapActions({
      cancelOngoingRequest: "aws/cancelOngoingRequest",
    }),

    cancelFileDownload() {
      this.cancelOngoingRequest("download");
    },
  },
};
</script>

<style lang="scss" scoped>
.downloading-progress {
  @include font-height(11, 18);
  @include transition(0.4s);
  padding: toRem(13) toRem(22);
  border-radius: toRem(10);
  font-weight: 600;

  @include breakpoint-down(lg) {
    padding: toRem(12) toRem(20);
  }

  @include breakpoint-down(sm) {
    padding: toRem(12) toRem(15);
  }

  .fill {
    background: linear-gradient(
      135deg,
      rgba($brand-green-light, 0.5) 25%,
      transparent 25%,
      transparent 50%,
      rgba($brand-green-light, 0.5) 50%,
      rgba($brand-green-light, 0.5) 75%,
      transparent 75%,
      transparent
    );
    animation: move 0.5s linear infinite;
    background-size: toRem(30);
    border-radius: toRem(5);
  }

  @keyframes move {
    100% {
      background-position: toRem(48) 0;
    }
  }

  .progress {
    background-color: $brand-green;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
  }

  .text {
    @include flex-row-between-nowrap;
    @include center-placement;
    width: 65%;

    .info {
      @include text-truncate;
      width: 70%;
    }
  }

  .close-icon {
    @include square-shape(18);
    @include center-y;
    right: toRem(10);
    background: $black-text;

    .icon {
      @include center-placement;
      font-size: toRem(12.5);
      margin-top: toRem(0.5);
    }
  }
}
</style>
