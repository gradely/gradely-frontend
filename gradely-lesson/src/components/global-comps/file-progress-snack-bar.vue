<template>
  <div class="snack-container" v-if="getFileProgress.uploading">
    <file-uploader-progress
      :file_name="getFileProgress.name"
      :progress="getFileProgress.progress"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const aws = createNamespacedHelpers('aws');
export default {
  name: 'fileProgressSnackBar',

  components: {
    fileUploaderProgress: () =>
      import(
        /* webpackChunkName: "fileUploaderProgress" */ '@/components/global-comps/file-uploader-progress.vue'
      ),
  },

  computed: {
    ...aws.mapGetters(['getFileProgress']),
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
