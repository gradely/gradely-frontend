<template>
  <div class="alert-wrapper no-internet box-shadow-effect">
    <!-- ALERT BOX  -->
    <div class="alert-box">
      <!-- CONTENT -->
      <div class="content">
        <div class="icon icon-no-wifi brand-tonic"></div>
        <!-- <div class="icon icon-error-alert brand-red"></div> -->
        <div class="text color-text">No internet connection..</div>
      </div>

      <!-- CLOSE ICON  -->
      <div
        class="icon-close pointer color-grey-dark"
        @click="$emit('closeAlert')"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { IVue } from '@/interfaces';

export default (Vue as VueConstructor<IVue>).extend({
  name: 'noInternet',

  created() {
    this.checkInternetConnection();
  },

  mounted() {
    setInterval(() => this.checkInternetConnection(), 5000);
  },

  methods: {
    checkInternetConnection() {
      navigator.onLine
        ? this.$bus.$emit('hide_internet_alert')
        : this.$bus.$emit('show_internet_alert');
    },
  },
});
</script>

<style lang="scss" scoped>
.no-internet {
  top: calc(100% - 100px) !important;
  // background: rgba($brand-red-light, 0.9);

  .alert-box {
    .content {
      .icon {
        font-size: toRem(24);

        @include breakpoint-down(lg) {
          font-size: toRem(20);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(19);
        }
      }
    }
  }
}
</style>
