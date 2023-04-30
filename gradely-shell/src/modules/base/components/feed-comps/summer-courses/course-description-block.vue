<template>
  <div class="course-description-block">
    <!-- COURSE TITLE -->
    <div class="course-title brand-primary font-weight-700 mgb-8">
      {{ course.name }}
    </div>

    <!-- COURSE META -->
    <div class="course-meta color-grey-dark">
      For students in Primary 1 to SS3
    </div>

    <!-- COURSE VIDEO -->
    <div
      class="
        course-video-wrapper
        w-100
        overflow-hidden
        rounded-10
        position-relative
      "
    >
      <img
        v-lazy="mxStaticImg(course.image, 'base')"
        :alt="course.name"
        class="brand-inverse-light-bg"
      />

      <template v-if="false">
        <video src=""></video>
        <div class="video-overlay position-absolute index-1">
          <div class="position-relative w-100 h-100">
            <div class="icon icon-play-bg brand-accent index-9 pointer"></div>
          </div>
        </div>
      </template>
    </div>

    <!-- ABOUT COURSE -->
    <div class="about-block content-area">
      <div class="title">About the Course</div>
      <div class="description">
        {{ course.description }}
      </div>
    </div>

    <!-- COURSE REQUIREMENTS -->
    <div class="requirement-block content-area">
      <div class="title">Requirements</div>
      <div class="description">
        {{ course.requirements }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "courseDescriptionBlock",

  props: {
    course: Object,
  },
};
</script>

<style lang="scss" scoped>
.course-description-block {
  .course-title {
    @include font-height(28, 32);

    @include breakpoint-down(lg) {
      @include font-height(23, 30);
    }

    @include breakpoint-down(md) {
      @include font-height(19, 24);
    }

    @include breakpoint-down(sm) {
      @include font-height(17, 21);
    }
  }

  .course-meta {
    @include font-height(14, 18);
    margin-bottom: toRem(40);

    @include breakpoint-down(lg) {
      @include font-height(13.5, 17);
    }

    @include breakpoint-down(md) {
      @include font-height(12.5, 16);
      margin-bottom: toRem(30);
    }

    @include breakpoint-down(sm) {
      @include font-height(12, 16);
    }
  }

  .course-video-wrapper {
    margin-bottom: toRem(40);
    height: toRem(400);

    @include breakpoint-down(lg) {
      height: toRem(360);
    }

    @include breakpoint-down(md) {
      height: toRem(320);
    }

    @include breakpoint-down(sm) {
      height: toRem(300);
    }

    @include breakpoint-down(xs) {
      height: toRem(250);
    }

    img {
      object-fit: cover;
      width: 100%;
      height: auto;
    }

    .video-overlay {
      background: rgba($black-text, 0.4);
      @include stretch-area;

      .icon {
        @include center-placement;
        font-size: toRem(55);

        @include breakpoint-down(sm) {
          font-size: toRem(45);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(40);
        }
      }
    }
  }

  .content-area {
    margin-bottom: toRem(50);

    @include breakpoint-down(md) {
      margin-bottom: toRem(30);
    }

    .title {
      @include font-height(18, 27);
      margin-bottom: toRem(12);
      color: $brand-primary;
      font-weight: 600;

      @include breakpoint-down(lg) {
        @include font-height(17, 25);
      }

      @include breakpoint-down(md) {
        @include font-height(15, 22);
        margin-bottom: toRem(10);
      }
    }

    .description {
      color: $color-ash;
      @include font-height(14.75, 27);

      @include breakpoint-down(lg) {
        @include font-height(13.75, 27);
      }

      @include breakpoint-down(md) {
        @include font-height(13.45, 27);
      }
    }
  }
}
</style>