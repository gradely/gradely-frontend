<template>
  <div class="gradely-app-container topnav-offset">
    <div
      class="
        gradely-container
        px-2 px-sm-3 px-md-4 px-xl-5
        mx-auto
        smooth-animation
      "
    >
      <!-- TOP ROW  -->
      <title-top-row title="My Apps" />

      <div class="mx-auto">
        <div class="top-container">
          <!-- APP IS LOADING  -->
          <template v-if="loading">
            <div class="app-row mx-auto">
              <app-default-card v-for="(_, index) in 2" :key="index" />
            </div>
          </template>

          <!-- LOADING COMPLETE -->
          <template v-else>
            <!-- INSTALLED APPS  -->
            <div class="app-row" v-if="my_apps.length">
              <app-card
                v-for="(app, index) in my_apps"
                :key="index"
                :app="app"
                installed
              />
            </div>

            <!-- APP BANNER  -->
            <app-banner v-else />
          </template>
        </div>

        <!-- APP RECOMMENDATION LIST  -->
        <template v-if="gradely_apps.length">
          <div class="app-container">
            <div class="title-text font-weight-600 brand-navy">
              Recommended for you
            </div>

            <div class="description color-grey-dark">
              We've picked some apps that we think you'll need
            </div>

            <!-- APP ROW  -->
            <div class="app-row mx-auto">
              <template>
                <app-card
                  v-for="(app, index) in gradely_apps"
                  :key="index"
                  :app="app"
                />
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import titleTopRow from "@/modules/dashboard/components/student-comps/title-top-row";

export default {
  name: "DashboardApp",

  metaInfo: {
    title: "App Store",
  },

  components: {
    titleTopRow,
    appBanner: () =>
      import(
        /* webpackChunkName: "AppEntry" */ "@/modules/dashboard/components/app-comps/app-banner"
      ),
    appCard: () =>
      import(
        /* webpackChunkName: "AppEntry" */ "@/modules/dashboard/components/app-comps/app-card"
      ),
    appDefaultCard: () =>
      import(
        /* webpackChunkName: "AppEntry" */ "@/modules/dashboard/components/app-comps/app-default-card"
      ),
  },

  data: () => ({
    loading: true,
    my_apps: [],
    gradely_apps: [],
  }),

  mounted() {
    this.fetchAllSchoolApps(); //INSTALLED
    this.fetchGradelyApps(); //RECOMMENDED
  },

  methods: {
    ...mapActions({
      getSchoolApps: "dbApp/getSchoolApps",
      getRecommendedApps: "dbApp/getRecommendedApps",
    }),

    // FETCH SCHOOL INSTALLED APPS
    fetchAllSchoolApps() {
      this.loading = true;

      this.getSchoolApps()
        .then((response) => {
          if (response.code === 200 && response.data.length) {
            this.loadAppState(response.data, this.my_apps);
            this.loading = false;
          }

          // EMPTY STATE
          else this.loadDefaultState(this.my_apps);
        })
        .catch(() => this.loadDefaultState(this.my_apps));
    },

    // FETCH GRADELY APPS
    fetchGradelyApps() {
      this.getRecommendedApps()
        .then((response) => {
          if (response.code === 200 && response.data.length)
            this.loadAppState(response.data, this.gradely_apps);
          else this.gradely_apps = [];
        })
        .catch(() => (this.gradely_apps = []));
    },

    loadDefaultState(app) {
      app = [];
      this.loading = false;
    },

    // LOAD APP DATA SET
    loadAppState(data, data_list) {
      data.map((app) => data_list.push(app.details));
    },
  },
};
</script>

<style lang="scss" scoped>
.top-container {
  margin-bottom: toRem(40);
}

.app-container {
  .title-text {
    @include font-height(19, 27);
    margin-bottom: toRem(2);
    letter-spacing: 0.02em;

    @include breakpoint-down(xl) {
      @include font-height(18, 25);
    }

    @include breakpoint-down(sm) {
      @include font-height(16, 22);
    }

    @include breakpoint-down(xs) {
      @include font-height(15, 21);
    }
  }

  .description {
    @include font-height(14, 19);
    margin-bottom: toRem(30);

    @include breakpoint-down(xl) {
      @include font-height(13, 18);
    }

    @include breakpoint-down(sm) {
      @include font-height(12.5, 17);
    }

    @include breakpoint-down(xs) {
      @include font-height(12, 16);
    }
  }
}

.app-row {
  position: relative;
  width: 101.5%;
  left: -0.6%;
  @include flex-row-start-wrap;
}
</style>
