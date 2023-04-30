<template>
  <div class="faq-card">
    <div class="title-text mgb-10 font-weight-700 brand-navy">
      {{ faq.title }}
    </div>

    <div class="description color-ash">
      {{ faq.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: "faqCard",

  props: {
    faq: {
      type: Object,
      default: () => ({
        title: "Frequent Question",
        description:
          "The report card app offers an automated Report Card Management solution which allows schools to automatically generate report cards and share with parents via the classfeed, email, and on the Gradely app.",
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.faq-card {
  .title-text {
    @include font-height(16, 22);

    @include breakpoint-down(xl) {
      @include font-height(14.5, 21);
    }

    @include breakpoint-down(md) {
      @include font-height(13.5, 21);
    }

    @include breakpoint-down(sm) {
      @include font-height(12.75, 20);
    }

    @include breakpoint-down(xs) {
      @include font-height(12.5, 18);
    }
  }

  .description {
    @include font-height(14, 24);
    padding-right: toRem(25);

    @include breakpoint-down(xl) {
      @include font-height(13, 23);
    }

    @include breakpoint-down(md) {
      @include font-height(13, 23);
      padding-right: 0;
    }

    @include breakpoint-down(sm) {
      @include font-height(12.5, 21);
    }

    @include breakpoint-down(xs) {
      @include font-height(12.25, 21);
    }
  }
}
</style>
