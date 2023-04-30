<template>
  <div class="position-relative">
    <div
      class="default-skeleton-loader position-relative w-100 mgb-4 rounded-5"
      v-for="(_, index) in state_count"
      :key="index"
    >
      <!-- BLOCK ONE  -->
      <div class="block-one h-auto w-100">
        <div
          class="line-one mgb-5 rounded-5"
          :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>

        <div
          class="line-two rounded-5"
          :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>
      </div>

      <!-- BLOCK TWO  -->
      <div
        class="block-two rounded-5"
        :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
      ></div>
    </div>

    <!-- EMPTY CONTENT STATE  -->
    <empty-content-state
      v-if="empty_state"
      :title="empty.title"
      :content="empty.message"
      :extra_content="{
        has_cta: cta.has_cta,
        show_extra_text: cta.show_extra_text,
        btn_text: cta.cta_text,
      }"
      @buttonClicked="$emit('handleClicked')"
    />
  </div>
</template>

<script>
export default {
  name: "defaultSkeletonLoader",

  props: {
    empty_state: {
      type: Boolean,
      default: false,
    },
    loading_state: {
      type: Boolean,
      default: true,
    },
    empty: {
      type: Object,
      default: () => ({
        title: "",
        message: "",
      }),
    },
    cta: {
      type: Object,
      default: {
        has_cta: false,
        cta_text: "Invite",
      },
    },
  },

  data: () => ({
    state_count: 7,
  }),
};
</script>

<style lang="scss" scoped>
.default-skeleton-loader {
  background: rgba(#fff, 0.6);
  @include flex-row-between-nowrap;
  padding: toRem(10);

  .line-one {
    width: 50%;
    height: toRem(22);
  }

  .line-two {
    width: 30%;
    height: toRem(16);
  }

  .block-two {
    width: 15%;
    height: toRem(28);
  }
}
</style>
