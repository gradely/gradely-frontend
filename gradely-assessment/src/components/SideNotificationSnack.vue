<template>
  <!-- <portal to="notification"> -->
  <div
    v-if="getToastState"
    :class="getToastState.toastOpen ? 'show' : ''"
    class="notification-sidebar-snack"
  >
    <section class="msg-container-main">
      <span
        v-if="getToastState.toastState.includes('error')"
        class="error-icon-wrapper icon-alert-circle"
      ></span>
      <span
        v-else-if="getToastState.toastState.includes('warning')"
        class="warning-icon-wrapper icon-error-alert"
      ></span>
      <span
        v-else-if="getToastState.toastState.includes('success')"
        class="success-icon-wrapper icon-checked-fill"
      ></span>
      <span class="inner-text-wrapper" v-if="getToastState">{{
        getToastState.toastText
      }}</span>
    </section>
    <span
      v-if="getToastState.showBtn"
      @click="handleToastClose"
      class="close-icon icon-decline"
    ></span>
  </div>
  <!-- </portal> -->
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "NotificationSidebarSnack",

  computed: {
    ...mapGetters(["getToastState"]),
  },

  methods: {
    ...mapMutations(["clearToast"]),
    handleToastClose() {
      this.clearToast();
    },
  },
};
</script>

<style lang="scss" scoped>
.close-icon {
  cursor: pointer;
  margin: 0px 10px;
}
.notification-sidebar-snack {
  position: fixed;
  top: 6rem;
  right: 0;
  padding: 1rem;
  border-radius: 4px;
  margin: 6px;
  box-shadow: 0 2px 4px 0 #2e3d4921;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translate(50rem, -10px);
  z-index: 99999;

  transition: 1.5s;

  .msg-container-main {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    // warning icon
    .warning-icon-wrapper {
      margin: 0.4rem 0.56rem;
      color: $brand-accent;
    }

    // successful icon
    .success-icon-wrapper {
      margin: 0.4rem 0.56rem;
      color: #11c45b;
    }
    .error-icon-wrapper {
      margin: 0.4rem 0.56rem;
      color: #cc1016;
    }
  }
}
.notification-sidebar-snack.show {
  transform: translate(0rem, -10px);
}
</style>
