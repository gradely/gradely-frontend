<template>
  <div
    v-if="status == '0'"
    class="review-alert-card rounded-5 mgb-20"
    :class="
      status == '0'
        ? ['border-brand-tonic', 'brand-red-light-bg']
        : ['color-grey-dark', 'brand-accent-light-bg']
    "
  >
    <!-- ICON -->
    <div
      class="icon"
      :class="
        status == '0'
          ? ['icon-error-alert', 'brand-tonic']
          : ['icon-info-circle', 'color-ash']
      "
    ></div>

    <div>
      <div class="title-text brand-navy font-weight-600">
        Questions {{ status == "0" ? "Rejected" : "Pending" }}
      </div>

      <div class="meta-text brand-navy mgt-5" v-if="status == '0'">
        {{ remark ? remark : "No remark provided" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reviewAlertCard",

  props: {
    status: {
      type: String,
      default: "1",
    },

    remark: {
      type: String,
      default: "No remark provided!",
    },
  },
};
</script>

<style lang="scss" scoped>
.review-alert-card {
  @include flex-row-start-nowrap;
  align-items: flex-start;
  padding: toRem(16);

  @include breakpoint-down(lg) {
    padding: toRem(13);
  }

  .icon {
    margin-right: toRem(14);
    padding-top: toRem(2);
    font-size: toRem(23);
  }

  .title-text {
    @include font-height(13.5, 19);
  }

  .meta-text {
    @include font-height(12.75, 17);
  }
}
</style>