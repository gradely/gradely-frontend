<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <!-- BASE PAGE LOADER -->
    <transition name="fade" v-if="show_page_loader">
      <page-loader :loading_text="page_loader_text" />
    </transition>

    <!-- SNACK TOAST BAR  -->
    <portal to="notification">
      <NotificationSidebarSnack />
    </portal>

    <portal-target name="notification"></portal-target>
    <!-- NO INTERNET  -->

    <no-internet v-if="is_online" @closeAlert="hideNoInternet" />

    <!-- GRADELY PORTAL TARGET -->
    <portal-target name="gradely-modals"> </portal-target>
  </div>
</template>

<script>
import noInternet from "@/components/global-comps/no-internet";
import NotificationSidebarSnack from "@/components/SideNotificationSnack.vue";

export default {
  name: "App",

  metaInfo: {
    title: "Personalised learning platform",
    titleTemplate: "%s - Gradely.Ng",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
        async: true,
      },
    ],
  },

  components: {
    noInternet,
    NotificationSidebarSnack,
    pageLoader: () =>
      import(
        /* webpackChunkName: 'page-loader' */ "@/components/global-comps/page-loader"
      ),
  },

  data: () => ({
    alert: {
      message: "Alert message here...",
      type: "success",
    },

    show_alert: true,
    is_online: true,

    show_page_loader: false,
    page_loader_text: "Loading content",
  }),

  created() {
    // INTERNET ALERT EVENT
    this.$bus.$on("show_internet_alert", this.showNoInternet);
    this.$bus.$on("hide_internet_alert", this.hideNoInternet);

    // RESPONSE ALERT EVENT
    this.$bus.$on("show_response_alert", (data) => this.toggleAlert(data));

    // PAGE LOADER
    this.$bus.$on("show_page_loader", (text) => this.togglePageLoader(text));
  },

  mounted() {
    // dissable left click
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    // left click
    if (!window.location.href.toLowerCase().includes("test")) {
      localStorage.removeItem("assessment_id");
      localStorage.removeItem("assessment_token");
      localStorage.removeItem("assessment_log");
      localStorage.removeItem("proctor_media_url");
    }
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
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s ease-in;
}
.fade-leave-active {
  transition: opacity 0.3s ease-out;
  opacity: 0;
}
.skeleton-loader {
  position: relative;
  background: $border_grey_light;
  overflow: hidden !important;
}

.skeleton-loader::after {
  display: block;
  content: "";
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  -webkit-background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(transparent),
    color-stop(rgba(255, 255, 255, 0.2)),
    to(transparent)
  );

  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );

  /* Adding animation */
  animation: loading 0.6s infinite;
}

/* Loading Animation */
@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}
figure.image {
  width: 220px;
  height: 250px;
  display: flex;
  flex-direction: column;
  img {
    width: inherit;
    height: inherit;
  }
  figcaption {
    margin: 1rem 0rem;
  }
}
</style>
