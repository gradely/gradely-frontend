<template>
  <div class="dashboard-app-info w-100">
    <!-- APP INFO TOP BAR  -->
    <app-info-top-bar />

    <!-- APP DETAILS  -->
    <app-details />

    <!-- CONTENT SECTION  -->
    <div
      class="
        gradely-container
        px-2 px-sm-3 px-md-5 px-lg-4 px-xl-5
        mx-auto
        wrapper
        w-100
      "
    >
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>

    <!-- GET APP CTA  -->
    <div class="get-app-cta w-100 brand-inverse-bg">
      <div class="text-info color-text font-weight-700 text-center">
        Automated report card generation for schools
      </div>

      <!-- INSTALLED -->
      <button class="btn btn-primary" v-if="app_installed" @click="launchApp">
        Launch App
      </button>

      <!-- NOT INSTALLED -->
      <button class="btn btn-primary" v-else @click="toggleInstallation">
        Get This App
      </button>
    </div>

    <!-- PAGE LOADER -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_page_loader">
        <page-loader />
      </transition>

      <transition name="fade" v-if="show_app_installation">
        <app-installation-modal @closeTriggered="toggleInstallation" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { EXTERNAL_URL } from "@/env";
import appInfoTopBar from "@/modules/dashboard/components/app-info-comps/app-info-top-bar";
import appDetails from "@/modules/dashboard/components/app-info-comps/app-details";
import pageLoader from "@/shared/components/page-loader";

export default {
  name: "dashboardAppInfo",

  components: {
    appInfoTopBar,
    appDetails,
    pageLoader,
    appInstallationModal: () =>
      import(
        /* webpackChunkName: "appInstallationModal" */ "@/modules/dashboard/modals/app-installation-modal"
      ),
  },

  computed: {
    ...mapGetters({
      getAppData: "dbApp/getAppInfo",
    }),
  },

  watch: {
    $route: {
      handler() {
        this.fetchAppDetails(this.$route.params.id);
        this.getAppStatus();
      },
      immediate: true,
      deep: true,
    },
  },

  data: () => ({
    app_installed: false,
    show_page_loader: true,
    show_app_installation: false,
  }),

  // mounted() {
  //   this.fetchAppDetails(this.$route.params.id);
  //   this.getAppStatus();
  // },

  methods: {
    ...mapActions({
      getAppInfo: "dbApp/getAppInfo",
      checkAppStatus: "dbApp/checkAppStatus",
    }),

    // FETCH APP DETAILS
    fetchAppDetails(id) {
      this.getAppInfo(id)
        .then((response) => {
          // console.log(response);

          response.code === 200
            ? (this.show_page_loader = false)
            : this.loadErrorState();
        })
        .catch(() => this.loadErrorState());
    },

    loadErrorState() {
      this.$bus.$emit("show_response_alert", {
        message: "An error occured while loading app info",
        type: "error",
      });

      setTimeout(() => this.$router.push({ name: "DashboardAppStore" }), 3000);
    },

    // GET APP INSTALLED STATUS
    getAppStatus() {
      this.checkAppStatus(this.$route.params.id)
        .then((response) => {
          this.app_installed =
            response.code === 200 ? response.data.status : false;
        })
        .catch(() => (this.app_installed = false));
    },

    toggleInstallation() {
      this.show_app_installation = !this.show_app_installation;
    },

    // LAUNCH APP
    launchApp() {
      this.pushAlert(`Launching ${this.getAppData.data.name} App`, "loading");
      let url_path = `/home?term=${this.getAuthUser.term}&session=${this.getAuthUser.session}`;
      setTimeout(
        () => (location.href = EXTERNAL_URL("report-card", url_path)),
        2500
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-app-info {
  .wrapper {
    position: relative;
    margin-top: toRem(118);
    padding-bottom: toRem(70);

    @include breakpoint-down(md) {
      margin-top: toRem(98);
      padding-bottom: toRem(30);
    }

    @include breakpoint-down(sm) {
      margin-top: toRem(85);
    }
  }

  .get-app-cta {
    @include flex-column-center;
    height: toRem(300);

    @include breakpoint-down(xl) {
      height: toRem(250);
    }

    @include breakpoint-down(md) {
      height: toRem(210);
    }

    @include breakpoint-down(sm) {
      height: toRem(200);
    }

    @include breakpoint-down(xs) {
      height: toRem(170);
    }

    .text-info {
      margin-bottom: toRem(25);
      @include font-height(22, 35);
      width: 35%;

      @include breakpoint-down(xl) {
        @include font-height(23, 33);
        width: 42%;
      }

      @include breakpoint-down(lg) {
        width: 50%;
      }

      @include breakpoint-down(md) {
        @include font-height(18, 30);
        width: 62%;
      }

      @include breakpoint-down(sm) {
        @include font-height(18, 28);
        margin-bottom: toRem(18);
        width: 68%;
      }

      @include breakpoint-down(xs) {
        @include font-height(16, 25);
        margin-bottom: toRem(16);
        width: 85%;
      }

      @include breakpoint-custom-down(370) {
        @include font-height(14.5, 22);
        margin-bottom: toRem(13);
        width: 92%;
      }
    }

    .btn {
      font-size: toRem(11.5);

      @include breakpoint-down(lg) {
        font-size: toRem(11);
        padding: toRem(12) toRem(32);
      }

      @include breakpoint-down(sm) {
        font-size: toRem(10.45);
        padding: toRem(10.5) toRem(26);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(10);
        padding: toRem(11) toRem(26);
      }

      @include breakpoint-custom-down(370) {
        font-size: toRem(9.5);
      }
    }
  }
}
</style>
