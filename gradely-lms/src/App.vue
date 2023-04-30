<template>
  <div id="app" class="position-relative">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <portal to="notification">
      <NotificationSidebarSnack />
    </portal>
    <portal-target name="notification"></portal-target>
    <portal-target name="lms-modal"></portal-target>
  </div>
</template>
<script>
import { setPageBackgroundColor } from "@/services/colorMgt";
import NotificationSidebarSnack from "./components/SideNotificationSnack/SideNotificationSnack.vue";
import { GET_NETWORK_ERROR_MESSAGE } from "./store/module/general/constant";
import { mapActions, mapGetters } from "vuex";
import { TOAST_ACTION } from "./components/SideNotificationSnack/store.module/constants";

export default {
  name: "App",
  components: { NotificationSidebarSnack },
  metaInfo: {
    title: "Gradely LMS",
    titleTemplate: "%s - Gradely.Ng",
    htmlAttrs: {
      lang: "en",
      amp: true
    },
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
        async: true
      }
    ]
  },
  methods: {
    ...mapActions([TOAST_ACTION])
  },
  mounted() {
    setPageBackgroundColor("#F0F0F0");
  },
  computed: {
    ...mapGetters([GET_NETWORK_ERROR_MESSAGE])
  },
  watch: {
    GET_NETWORK_ERROR_MESSAGE() {
      this[TOAST_ACTION]({
        toastData: {
          toastOpen: true,
          toastText: "Please there was an error please try again",
          toastState: "error",
          showBtn: true
        },
        timeout: 3000
      });
    }
  },
  updated() {
    window?.MathJax?.typeset();
  }
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
