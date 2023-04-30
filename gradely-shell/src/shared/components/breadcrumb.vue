<template>
  <div class="breadcrumb">
    <!-- PAGE INFO  -->
    <div class="page-info">
      <!-- PAGES  -->
      <div
        class="page"
        :class="{ hoverable: page.link }"
        v-for="(page, index) in pages"
        :key="index"
        @click="accessPageLink(index)"
      >
        <div class="text smooth-transition" :class="index | activePage(pages)">
          {{ page.title }}
        </div>
        <div class="avatar" v-if="pages.length !== index + 1">
          <div class="icon icon-caret-right"></div>
        </div>
      </div>
    </div>

    <!-- PAGE NAVIGATION  -->
    <div class="page-navigation">
      <!-- LEFT NAV  -->
      <div class="avatar pointer mgr-2">
        <div class="icon icon-caret-fill-left" title="Previous"></div>
      </div>

      <!-- TEXT  -->
      <div class="text brand-primary">1 <span class="mgx-1">/</span> 32</div>

      <!-- RIGHT NAV  -->
      <div class="avatar pointer mgl-2">
        <div class="icon icon-caret-fill-right" title="Next"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "breadcrumb",

  props: {
    pages: {
      type: Array,
      default: () => [
        {
          title: "Junior Secondary School 1",
          link: false,
          route: "",
        },
      ],
    },
  },

  filters: {
    activePage(index, pages) {
      return pages.length === index + 1 ? "active-page" : null;
    },
  },

  data: () => ({}),

  methods: {
    accessPageLink(index) {
      if (this.pages[index].link)
        this.$router.push({ name: this.pages[index].route });
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  @include flex-row-between-nowrap;
  border-bottom: toRem(1) solid rgba($border-grey, 0.8);
  padding: toRem(16) 0 toRem(13);
  margin-bottom: toRem(30);

  @include breakpoint-down(md) {
    display: none;
  }

  .page-info {
    @include flex-row-start-nowrap;

    .page {
      @include flex-row-start-nowrap;

      .text {
        @include font-height(13, 18);
        color: $color-grey-dark;

        @include breakpoint-down(lg) {
          @include font-height(12, 17);
        }
      }

      .avatar {
        @include square-shape(26);
        margin: 0 toRem(4);

        .icon {
          @include center-placement;
          color: $border-grey-dark;
          font-size: toRem(10);
        }
      }
    }

    .hoverable {
      cursor: pointer;
      .text {
        &:hover {
          color: $brand-inverse !important;
        }
      }
    }

    .active-page {
      color: $brand-navy;
      font-weight: 600;
    }
  }

  .page-navigation {
    @include flex-row-end-nowrap;

    .avatar {
      @include square-shape(28);

      .icon {
        @include center-placement;
        @include transition(0.4s);
        color: $border-grey-dark;
        font-size: toRem(10.5);
        margin-top: toRem(1);

        @include breakpoint-down(lg) {
          font-size: toRem(10);
        }
      }

      &:hover {
        .icon {
          color: $brand-inverse;
        }
      }
    }

    .text {
      @include font-height(12.5, 17);

      @include breakpoint-down(lg) {
        @include font-height(11.75, 17);
      }
    }
  }
}
</style>
