<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <!-- SNACK TOAST BAR  -->
    <toast-snack-bar
      v-if="show_alert"
      :message="alert.message"
      :type="alert.type"
      @closeAlert="toggleAlert"
    />

    <!-- FILE PROGRESS SNACK BAR -->
    <file-progress-snack-bar />

    <!-- DOWNLOAD SNACK BAR -->
    <download-snack-bar />

    <!-- NO INTERNET  -->
    <no-internet v-if="is_online" @closeAlert="hideNoInternet" />

    <!-- BASE PAGE LOADER -->
    <transition name="fade" v-if="show_page_loader">
      <page-loader :loading_text="page_loader_text" />
    </transition>

    <!-- GRADELY PORTAL TARGET -->
    <portal-target name="gradely-modals"> </portal-target>
  </div>
</template>

<script>
export default {
  name: "App",

  metaInfo: {
    title: "Personalised learning platform",
    titleTemplate: "%s - Gradely",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },

  components: {
    fileProgressSnackBar: () =>
      import(
        /* webpackChunkName: "AppEntry" */ "@/shared/components/file-progress-snack-bar"
      ),
    downloadSnackBar: () =>
      import(
        /* webpackChunkName: "AppEntry" */ "@/shared/components/download-snack-bar"
      ),
    toastSnackBar: () =>
      import(
        /* webpackChunkName: "AppEntry" */ "@/shared/components/toast-snack-bar"
      ),
    noInternet: () =>
      import(
        /* webpackChunkName: "AppEntry" */ "@/shared/components/no-internet"
      ),
    pageLoader: () =>
      import(
        /* webpackChunkName: "AppEntry" */ "@/shared/components/page-loader"
      ),
  },

  data: () => ({
    alert: {
      message: "Alert message here...",
      type: "success",
    },

    show_alert: false,
    is_online: true,

    show_page_loader: false,
    page_loader_text: "Loading content",
  }),

  created() {
    // INTERNET ALERT EVENT
    this.$bus.$on("show_internet_alert", this.showNoInternet);
    this.$bus.$on("hide_internet_alert", this.hideNoInternet);

    // PAGE LOADER
    this.$bus.$on("show_page_loader", (text) => this.togglePageLoader(text));
    this.$bus.$on("show_loader", (text) => this.showPageLoader(text));
    this.$bus.$on("hide_loader", () => this.hidePageLoader());

    // RESPONSE ALERT EVENT
    this.$bus.$on("show_response_alert", (data) => this.toggleAlert(data));
  },

  mounted() {
    this.$color.setPageBackgroundColor("#F0F0F0");
  },

  methods: {
    toggleAlert(data = {}) {
      Object.keys(data).length ? (this.alert = data) : null;
      this.show_alert = !this.show_alert;
    },

    togglePageLoader(text) {
      this.show_page_loader = !this.show_page_loader;
      this.page_loader_text = text;
    },

    showPageLoader(text) {
      this.page_loader_text = text;
      this.show_page_loader = true;
    },

    hidePageLoader() {
      this.show_page_loader = false;
    },

    showNoInternet() {
      this.is_online = true;
    },

    hideNoInternet() {
      this.is_online = false;
    },
  },
};
</script>

<style lang="scss">
*,
html,
body {
  scroll-behavior: smooth !important;
}

.tour-index {
  z-index: 3000;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.225s ease;
}
.fade-leave-active {
  transition: opacity 0.225s ease;
  opacity: 0;
}
</style>
