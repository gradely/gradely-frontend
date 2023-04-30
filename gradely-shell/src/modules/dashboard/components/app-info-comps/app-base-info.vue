<template>
  <div class="app-base-info">
    <!-- INFO  -->
    <div class="left-section">
      <!-- APP ICON  -->
      <div
        class="
          app-icon
          position-relative
          mgr-26
          brand-accent-light-bg
          rounded-15
        "
      >
        <img
          v-lazy="
            getAppInfo.data.icon
              ? getAppInfo.data.icon
              : mxStaticImg('AppFileIcon.svg', 'dashboard')
          "
          :alt="getAppInfo.data.name"
        />
      </div>

      <!-- INFO BLOCK  -->
      <div class="info-block">
        <!-- APP NAME  -->
        <div class="app-name color-text font-weight-600 mgb-10">
          {{ getAppInfo.data.name ? getAppInfo.data.name : "Loading app.." }}
        </div>

        <!-- APP DESCRIPTION  -->
        <div class="app-description color-text mgb-15">
          {{
            getAppInfo.data.description
              ? getAppInfo.data.description
              : "Loading description..."
          }}
        </div>

        <!-- APP CATEGORY  -->
        <div
          class="
            app-category
            d-flex
            justify-content-start
            align-items-center
            flex-nowrap
          "
        >
          <!-- OWNER  -->
          <div class="owner">
            By:
            <span class="font-weight-600 brand-navy text-capitalize">
              {{
                getAppInfo.data.owner ? getAppInfo.data.owner : "Gradely"
              }}</span
            >
          </div>

          <!-- CATEGORY  -->
          <div class="category">
            In:
            <span class="font-weight-600 brand-navy text-capitalize">
              {{
                getAppInfo.data.category ? getAppInfo.data.category : "Apps"
              }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- GET APP CTA  -->
    <div class="right-section">
      <!-- INSTALLED STATE -->
      <template v-if="app_installed">
        <div @click="launchApp">
          <button class="btn btn-accent">Launch App</button>

          <button class="btn-accent btn-circle">
            <div class="icon icon-external-link"></div>
          </button>
        </div>
      </template>

      <!-- NOT INSTALLED STATE -->
      <template v-else>
        <button class="btn btn-accent" @click="toggleInstallation">
          Get this App
        </button>

        <button class="btn-accent btn-circle" @click="toggleInstallation">
          <div class="icon icon-plus"></div>
        </button>
      </template>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_app_installation">
        <app-installation-modal @closeTriggered="toggleInstallation" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { EXTERNAL_URL } from "@/env";

export default {
  name: "appBaseInfo",

  components: {
    appInstallationModal: () =>
      import(
        /* webpackChunkName: "appInstallationModal" */ "@/modules/dashboard/modals/app-installation-modal"
      ),
  },

  computed: {
    ...mapGetters({
      getAppInfo: "dbApp/getAppInfo",
    }),
  },

  data: () => ({
    app_installed: false,
    show_app_installation: false,
  }),

  mounted() {
    this.getAppStatus();
  },

  methods: {
    ...mapActions({
      checkAppStatus: "dbApp/checkAppStatus",
    }),

    toggleInstallation() {
      this.show_app_installation = !this.show_app_installation;
    },

    // GET APP INSTALLED STATUS
    getAppStatus() {
      this.checkAppStatus(this.$route.params.id)
        .then((response) => {
          if (response.code === 200) {
            this.app_installed = response.data.status;
            // this.$emit("updateAppStatus", response.data.status);
          }
        })
        .catch(() => (this.app_installed = false));
    },

    // LAUNCH APP
    launchApp() {
      this.pushAlert(`Launching ${this.getAppInfo.data.name} App`, "loading");
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
.app-base-info {
  @include flex-row-between-nowrap;
  align-items: flex-start;

  .left-section {
    @include flex-row-start-nowrap;

    @include breakpoint-down(xs) {
      align-items: flex-start;
    }

    .app-icon {
      box-shadow: -1px 1px 4px rgba(0, 0, 0, 0.15);
      @include square-shape(115);

      @include breakpoint-down(xl) {
        @include square-shape(110);
        margin-right: toRem(15) !important;
      }

      @include breakpoint-down(lg) {
        @include square-shape(100);
      }

      @include breakpoint-down(md) {
        @include square-shape(95);
        margin-right: toRem(14) !important;
      }

      @include breakpoint-down(sm) {
        @include square-shape(90);
        margin-right: toRem(13) !important;
      }

      @include breakpoint-down(xs) {
        @include square-shape(75);
        margin-right: toRem(10) !important;
      }

      @include breakpoint-custom-down(380) {
        @include square-shape(55);
        box-shadow: unset;
        border-radius: toRem(7) !important;
      }

      img {
        @include center-placement;
        @include square-shape(65);

        @include breakpoint-down(xl) {
          @include square-shape(55);
        }

        @include breakpoint-down(md) {
          @include square-shape(48);
        }

        @include breakpoint-down(sm) {
          @include square-shape(42);
        }

        @include breakpoint-down(xs) {
          @include square-shape(38);
        }

        @include breakpoint-custom-down(380) {
          @include square-shape(30);
        }
      }
    }

    .info-block {
      @include breakpoint-down(sm) {
        width: 80%;
      }

      @include breakpoint-down(xs) {
        width: 65%;
      }

      .app-name {
        @include font-height(24, 32);

        @include breakpoint-down(xl) {
          @include font-height(23, 32);
        }

        @include breakpoint-down(lg) {
          @include font-height(21, 28);
        }

        @include breakpoint-down(md) {
          @include font-height(18, 22);
          margin-bottom: toRem(7) !important;
        }

        @include breakpoint-down(xs) {
          @include font-height(15, 18);
          margin-bottom: toRem(5) !important;
        }

        @include breakpoint-custom-down(380) {
          @include font-height(14.5, 18);
          margin-bottom: toRem(7) !important;
          margin-top: toRem(3);
        }
      }

      .app-description {
        @include font-height(13.75, 18);

        @include breakpoint-down(xl) {
          @include font-height(13, 18);
        }

        @include breakpoint-down(lg) {
          @include font-height(12.5, 17);
        }

        @include breakpoint-down(md) {
          margin-bottom: toRem(12) !important;
          @include font-height(12, 17);
        }

        @include breakpoint-down(xs) {
          margin-bottom: toRem(10) !important;
          @include font-height(11.5, 16);
        }
      }

      .app-category {
        .owner,
        .category {
          color: $color-grey-dark;
          @include font-height(13.25, 18);

          @include breakpoint-down(xl) {
            @include font-height(13, 18);
          }

          @include breakpoint-down(lg) {
            @include font-height(12, 17);
          }

          @include breakpoint-down(xs) {
            @include font-height(11.5, 16);
          }

          @include breakpoint-custom-down(380) {
            @include font-height(11, 16);
          }
        }

        .owner {
          border-right: toRem(1) solid $border-grey-dark;
          padding-right: toRem(14);
          margin-right: toRem(14);

          @include breakpoint-down(xs) {
            padding-right: toRem(10);
            margin-right: toRem(10);
          }
        }
      }
    }
  }

  .right-section {
    .btn {
      font-size: toRem(11.5);
      padding: toRem(12) toRem(26);

      @include breakpoint-down(xl) {
        font-size: toRem(11);
        padding: toRem(11) toRem(26);
      }

      @include breakpoint-down(md) {
        font-size: toRem(10);
        padding: toRem(10) toRem(24);
      }

      @include breakpoint-down(sm) {
        display: none;
      }
    }

    .btn-circle {
      display: none;

      @include breakpoint-down(sm) {
        display: unset;
        @include square-shape(36);
      }

      @include breakpoint-custom-down(380) {
        @include square-shape(33);
      }
    }
  }
}
</style>
