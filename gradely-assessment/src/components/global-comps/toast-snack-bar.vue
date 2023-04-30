<template>
  <div class="toast-snack-bar alert-wrapper box-shadow-effect">
    <!-- ALERT BOX  -->
    <div class="alert-box">
      <!-- CONTENT -->
      <div class="content">
        <div
          class="icon icon-checked-fill brand-green"
          v-if="type === 'success'"
        ></div>
        <div
          class="icon icon-error-alert brand-red"
          v-if="type === 'error'"
        ></div>
        <div class="text color-text">{{ message }}</div>
      </div>

      <!-- CLOSE ICON  -->
      <div
        class="icon-close pointer color-grey-dark"
        @click="$emit('closeAlert')"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "toastSnackBar",

  props: {
    message: String,
    type: String, //Error or Success
  },

  mounted() {
    setTimeout(() => this.dismissAlert(), 5000);
  },

  methods: {
    dismissAlert() {
      this.$bus.$emit("show_response_alert", {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
