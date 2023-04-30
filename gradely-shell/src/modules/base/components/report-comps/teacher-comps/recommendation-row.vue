<template>
  <div class="recommendation-row">
    <div class="title-text font-weight-700 color-grey-dark mgb-20">
      Our Recommendation
    </div>

    <div class="categories">
      <!-- REMEDIAL CLASS  -->
      <div class="category brand-inverse-light-bg">
        <div class="avatar">
          <div class="icon icon-video-on brand-inverse"></div>
        </div>

        <div class="text">Remedial class</div>
      </div>

      <!-- RESOURCES  -->
      <div class="category color-white-bg">
        <div class="avatar">
          <div class="icon icon-practice-card brand-navy"></div>
        </div>

        <div class="text">Resources</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommendationRow",
};
</script>

<style lang="scss" scoped>
.recommendation-row {
  .title-text {
    @include font-height(13.25, 16);
  }

  .categories {
    @include flex-row-start-nowrap;

    .category {
      @include flex-row-start-nowrap;
      @include transition(0.4s);
      border-radius: toRem(39);
      padding: toRem(8) toRem(16);
      margin-right: toRem(15);
      cursor: pointer;

      &:hover {
        background: $brand-accent-light !important;
        box-shadow: 0 toRem(1) toRem(4) rgba(0, 0, 0, 0.15);
      }

      .avatar {
        @include square-shape(26);
        margin-right: toRem(6);

        .icon {
          @include center-placement;
          font-size: toRem(18);
        }
      }

      .text {
        @include font-height(12, 16);
        color: $brand-navy;
        font-weight: 700;
      }
    }
  }
}
</style>
