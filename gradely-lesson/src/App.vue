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

    <!-- NO INTERNET  -->
    <no-internet v-if="is_online" @closeAlert="hideNoInternet" />

    <!-- BASE PAGE LOADER -->
    <transition name="fade" v-if="show_page_loader">
      <page-loader :loading_text="page_loader_text" />
    </transition>

    <!-- GRADELY PORTAL TARGET -->
    <portal-target name="gradely-modals"></portal-target>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';

// INTERFACES
import { IAlert, IVue } from './interfaces';

export default (Vue as unknown as VueConstructor<IVue>).extend({
  name: 'App',

  metaInfo: {
    title: 'Personalised learning platform',
    titleTemplate: '%s - Gradely.Ng',
    htmlAttrs: {
      lang: 'en',
      amp: 'true',
    },
  },

  components: {
    fileProgressSnackBar: () =>
      import(
        /* webpackChunkName: "AppEntry" */ '@/components/global-comps/file-progress-snack-bar.vue'
      ),
    toastSnackBar: () =>
      import(
        /* webpackChunkName: "AppEntry" */ '@/components/global-comps/toast-snack-bar.vue'
      ),
    noInternet: () =>
      import(
        /* webpackChunkName: "AppEntry" */ '@/components/global-comps/no-internet.vue'
      ),
    pageLoader: () =>
      import(
        /* webpackChunkName: "AppEntry" */ '@/components/global-comps/view-loader.vue'
      ),
  },

  data: () => ({
    alert: {
      message: 'Alert message here...',
      type: 'success',
    } as IAlert,

    show_alert: false,
    is_online: true,

    show_page_loader: false,
    page_loader_text: 'Loading content',
  }),

  created() {
    // INTERNET ALERT EVENT
    this.$bus.$on('show_internet_alert', this.showNoInternet);
    this.$bus.$on('hide_internet_alert', this.hideNoInternet);

    // PAGE LOADER
    this.$bus.$on('show_page_loader', (text: string) =>
      this.togglePageLoader(text)
    );
    this.$bus.$on('hide_page_loader', () => (this.show_page_loader = false));

    // RESPONSE ALERT EVENT
    this.$bus.$on('show_response_alert', (data: any) => this.toggleAlert(data));
  },

  mounted() {
    this.$color.setPageBackgroundColor('#F0F0F0');
  },

  methods: {
    toggleAlert(data: IAlert): void {
      Object.keys(data).length ? (this.alert = data) : null;
      this.show_alert = !this.show_alert;
    },

    togglePageLoader(text: string): void {
      this.show_page_loader = !this.show_page_loader;
      this.page_loader_text = text;
    },

    showNoInternet(): void {
      this.is_online = true;
    },

    hideNoInternet(): void {
      this.is_online = false;
    },
  },
});
</script>

<style lang="scss">
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

// testing flexible width
@for $n from 1 through 100 {
  $percentage-size: calc(#{$n}% - #{$n}px);
  .wg-#{$n} {
    width: $percentage-size;
  }
  .hg-#{$n} {
    height: $percentage-size;
  }

  @include breakpoint-up(md) {
    .wg-md-#{$n} {
      width: $percentage-size;
    }
    .hg-md-#{$n} {
      height: $percentage-size;
    }
  }
}
</style>
