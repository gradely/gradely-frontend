<template>
  <div class="snack-container" v-if="getDownloadProgress.downloading">
    <!--  -->
    <file-downloader-progress
      :file_name="getDownloadProgress.name"
      :progress="getDownloadProgress.progress"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "downloadSnackBar",

  components: {
    fileDownloaderProgress: () =>
      import(
        /* webpackChunkName: "fileDownloaderProgress" */ "@/shared/components/file-downloader-progress"
      ),
  },

  computed: {
    ...mapGetters({
      getDownloadProgress: "aws/getDownloadProgress",
    }),
  },
};
</script>

<style lang="scss" scoped>
.snack-container {
  @include transition(0.8s);
  right: toRem(10);
  position: fixed;
  top: toRem(80);
  z-index: 3999;
  width: toRem(400);

  @include breakpoint-down(lg) {
    width: toRem(350);
    top: toRem(100);
  }

  @include breakpoint-down(md) {
    @include center-x;
    width: toRem(350);
    top: toRem(70);
  }

  @include breakpoint-down(xs) {
    width: toRem(300);
  }

  @include breakpoint-custom-down(340) {
    width: toRem(280);
  }
}
</style>
