<template>
  <router-link :to="{ name: library.route }">
    <div
      class="library-card rounded-10 white-text-bg smooth-transition pointer overflow-hidden"
    >
      <!-- AVATAR ICON  -->
      <div class="avatar rounded-5" :class="renderLibraryIconBg">
        <div class="icon" :class="renderLibraryIcon"></div>
      </div>

      <!-- TITLE  -->
      <div class="title font-weight-600 brand-navy">{{ library.title }}</div>

      <!-- COUNT  -->
      <div class="count color-grey-dark">
        {{ library.count }} {{ library.count === 1 ? "Item" : "Items" }}
      </div>

      <!-- ACCESS  -->
      <div class="access-btn position-absolute smooth-transition">
        <div class="position-relative w-100 h-100">
          <div class="icon icon-arrow-right brand-navy smooth-transition"></div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "libraryCard",

  props: {
    library: {
      type: Object,
      default: () => ({
        title: "Assessment",
        count: 0,
        route: "",
      }),
    },
  },

  computed: {
    renderLibraryIcon() {
      if (this.library.title === "Assessment")
        return "icon-library brand-inverse";
      else if (this.library.title === "Documents")
        return "icon-note-text color-ash";
      else if (this.library.title === "Videos")
        return "icon-video-card brand-tonic";
      else if (this.library.title === "Discussions")
        return "icon-chats-circle brand-green";
      else return null;
    },

    renderLibraryIconBg() {
      if (this.library.title === "Assessment") return "brand-inverse-light-bg";
      else if (this.library.title === "Documents") return "off-white-bg";
      else if (this.library.title === "Videos") return "brand-red-light-bg";
      else if (this.library.title === "Discussions")
        return "brand-green-light-bg";
      else return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.library-card {
  position: relative;
  margin-bottom: toRem(30);
  padding: toRem(15);
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: toRem(150);

  @include breakpoint-down(xl) {
    height: toRem(140);
  }

  @include breakpoint-down(sm) {
    padding: toRem(12);
    margin-bottom: toRem(20);
    height: toRem(150);
    border-radius: toRem(5) !important;
  }

  @include breakpoint-down(xs) {
    padding: toRem(12) toRem(10);
    margin-bottom: toRem(18);
    height: toRem(135);
  }

  &:hover {
    transform: scale(0.98);
  }

  .avatar {
    @include square-shape(40);
    margin-bottom: toRem(12);

    @include breakpoint-down(xl) {
      @include square-shape(38);
    }

    @include breakpoint-down(xs) {
      @include square-shape(37);
    }

    .icon {
      @include center-placement;
      font-size: toRem(20);

      @include breakpoint-down(xs) {
        font-size: toRem(18.5);
      }
    }
  }

  .title {
    @include font-height(12, 17);
    margin-bottom: toRem(4);

    @include breakpoint-down(xs) {
      @include font-height(11.5, 16);
    }
  }

  .count {
    @include font-height(11, 16);

    @include breakpoint-down(xs) {
      @include font-height(10.75, 15);
    }
  }

  .access-btn {
    bottom: 0;
    right: 0;
    @include rectangle-shape(45, 34);
    background: $brand-accent;

    @include breakpoint-down(xl) {
      @include rectangle-shape(40, 30);
    }

    @include breakpoint-down(xs) {
      @include rectangle-shape(36, 28);
    }

    .icon {
      @include center-placement;
      font-size: toRem(14);

      @include breakpoint-down(xs) {
        font-size: toRem(13);
      }
    }

    &:hover {
      background: $brand-inverse;

      .icon {
        color: $white-text !important;
      }
    }
  }
}
</style>
