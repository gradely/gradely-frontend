<template>
  <div class="activity-card pointer smooth-transition">
    <!-- LEFT SECTION  -->
    <div class="left">
      <!-- AVATAR  -->
      <div class="avatar avatar-square brand-inverse-light-bg">
        <!-- PRACTICE TYPE  -->
        <img
          v-lazy="mxStaticImg('TopicImg.png')"
          alt=""
          class="avatar-img"
          v-if="activity.type === 'practice' || activity.type === 'video'"
        />

        <!-- ASSESSMENT TYPE  -->
        <div
          class="icon icon-library brand-navy"
          v-if="
            activity.type === 'assessment' || activity.type === 'schoolwork'
          "
        ></div>

        <!-- VIDEO TYPE -->
        <div
          class="icon icon-video-type icon-play-bg brand-accent pointer index-1"
          v-if="activity.type === 'video'"
        ></div>
      </div>

      <!-- INFO COLUMN  -->
      <div class="info">
        <!-- TOP  -->
        <div class="top color-text">
          {{ getCardTypeTitle }} ::
          <span class="font-weight-700">{{ activity.title }}</span>
        </div>

        <!-- BOTTOM  -->
        <div class="bottom color-grey-dark">
          <span class="date-time">{{ getDate }}</span>
          <span class="mx-2">•</span>
          <span class="font-weight-700 text-uppercase brand-primary">{{
            getCardTypeInfo
          }}</span>
        </div>
      </div>
    </div>

    <!-- LEFT SECTION  -->
    <div class="right" v-if="false">
      <div class="btn-link font-weight-600 link-no-underline">View</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "activityCard",

  props: {
    activity: {
      type: Object,
      default: () => ({
        title: "Topic Title",
        thumbnail: "TopicImg.png",
        date: "17 Mar, 2021",
        time: "12:45",
        type: "practice",
      }),
    },
  },

  computed: {
    getCardTypeTitle() {
      if (this.activity.type === "practice") return "Practiced";
      else if (
        this.activity.type === "assessment" ||
        this.activity.type === "schoolwork"
      )
        return "Completed";
      else if (this.activity.type === "video") return "Watched";
      else return false;
    },

    getCardTypeInfo() {
      if (this.activity.type === "practice") return "Practice";
      else if (
        this.activity.type === "assessment" ||
        this.activity.type === "schoolwork"
      )
        return "SchoolWork";
      else if (this.activity.type === "video") return "Video Lesson";
      else return false;
    },

    getDate() {
      let { d3, m4, y1, h02, b2 } = this.$date
        .formatDate(this.activity.created_at)
        .getAll();

      return `${d3} ${m4}, ${y1} ${h02}:${b2}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-card {
  @include flex-row-between-nowrap;
  border-bottom: toRem(1) solid rgba($border-grey, 0.7);
  padding: toRem(10) toRem(5);

  @include breakpoint-down(lg) {
    padding: toRem(10) 0;
  }

  &:hover {
    border-bottom: toRem(1) solid rgba($brand-accent, 0.3);
  }

  .left {
    @include flex-row-start-nowrap;
    padding-right: toRem(25);

    .avatar {
      @include square-shape(40);
      margin-right: toRem(12);

      @include breakpoint-down(lg) {
        @include square-shape(36);
        margin-right: toRem(10);
      }

      @include breakpoint-down(sm) {
        @include square-shape(34);
        margin-right: toRem(8);
      }

      @include breakpoint-down(xs) {
        margin-right: toRem(6);
      }

      .icon {
        @include center-placement;
        font-size: toRem(20);

        @include breakpoint-down(lg) {
          font-size: toRem(18);
        }
      }

      .icon-video-type {
        font-size: toRem(17);

        @include breakpoint-down(lg) {
          font-size: toRem(15);
        }
      }
    }

    .top {
      @include font-height(12.75, 18);
      margin-bottom: toRem(3);

      @include breakpoint-down(lg) {
        @include font-height(12, 17);
      }

      @include breakpoint-down(sm) {
        @include font-height(11.5, 16);
      }

      @include breakpoint-down(xs) {
        @include font-height(11, 15);
      }
    }

    .bottom {
      @include font-height(10.75, 14);

      @include breakpoint-down(lg) {
        @include font-height(10.5, 14);
      }

      @include breakpoint-down(xs) {
        @include font-height(10, 14);
      }
    }
  }

  .right {
    .btn-link {
      @include font-height(13, 18);

      @include breakpoint-down(lg) {
        @include font-height(12.25, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(11.5, 16);
      }
    }
  }
}
</style>
