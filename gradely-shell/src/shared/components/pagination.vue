<template>
  <div class="pagination-container">
    <template v-if="false">
      <!-- PREVIOUS  -->
      <template v-if="page_active !== 1">
        <div
          class="nav mgr-3"
          :class="page_active === 1 ? 'disabled' : null"
          @click="$emit('navigatePage', page_active - 1)"
        >
          Prev
        </div>
      </template>

      <!-- NAV ITEMS  -->
      <div
        class="nav-item"
        :class="index + 1 === page_active ? 'active-item' : null"
        @click="$emit('navigatePage', index + 1)"
        v-for="(page, index) in page_count"
        :key="index"
      >
        <div class="item">{{ index + 1 }}</div>
      </div>

      <!-- NEXT  -->
      <template v-if="page_active !== total_pages">
        <div
          class="nav mgl-3"
          :class="page_active === total_pages ? 'disabled' : null"
          @click="$emit('navigatePage', page_active + 1)"
        >
          Next
        </div>
      </template>
    </template>

    <!-- NEW FLOW -->
    <template>
      <div class="page-info color-ash">
        Showing {{ item_from }} to {{ item_to }} of {{ total_items }} Items
      </div>

      <div class="page-nav">
        <div
          class="nav nav-prev"
          title="Previous page"
          :class="page_active === 1 ? 'disabled' : null"
          @click="$emit('navigatePage', page_active - 1)"
        >
          PREV
        </div>

        <div class="nav-entry">
          <input
            type="number"
            class="form-control text-center page-input"
            v-model="page"
          />
          <div class="page-slash color-ash">/</div>
          <div class="page-total color-ash">{{ total_pages }}</div>
          <button
            class="page-btn box-shadow-effect"
            @click="$emit('navigatePage', page)"
            :disabled="isDisabled"
          >
            GO
          </button>
        </div>

        <div
          class="nav nav-next"
          title="Next page"
          :class="page_active === total_pages ? 'disabled' : null"
          @click="$emit('navigatePage', page_active + 1)"
        >
          NEXT
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "pagination",

  props: {
    paging: {
      type: Object,
    },
  },

  computed: {
    isDisabled() {
      return this.page && this.page <= this.total_pages ? false : true;
    },

    item_from() {
      return this.item_to - this.page_size + 1;
    },

    item_to() {
      return this.page_size * this.page_active;
    },
  },

  data() {
    return {
      total_pages: this.paging.pageCount,
      page_size: this.paging.pageSize,
      page_count: Array(this.paging.pageCount).fill(true),
      page_active: this.paging.currentPage,
      total_items: this.paging.totalCount,
      page: this.paging.currentPage,
    };
  },

  watch: {
    paging: "updatePagination",
  },

  methods: {
    updatePagination() {
      this.total_pages = this.paging.pageCount;
      this.page_count = Array(this.paging.pageCount).fill(true);
      this.page_active = this.paging.currentPage;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  @include flex-row-start-wrap;
  margin: toRem(30) 0 toRem(60);

  @include breakpoint-down(md) {
    margin: toRem(25) 0 toRem(20);
  }

  @include breakpoint-down(xs) {
    margin: toRem(25) 0 toRem(10);
  }

  .nav {
    @include font-height(12.75, 18);
    @include transition(0.3s);
    color: $color-grey-dark;
    cursor: pointer;
    padding: toRem(6) toRem(10);
    border-radius: toRem(7);

    @include breakpoint-down(sm) {
      @include font-height(12.5, 16);
    }

    @include breakpoint-down(xs) {
      @include font-height(12, 16);
    }

    &:hover {
      background: rgba($border-grey, 0.7);
      color: $color-text;
    }
  }

  .nav-item {
    @include transition(0.3s);
    @include square-shape(30);
    position: relative;
    border-radius: 50%;
    color: $color-grey-dark;
    padding: toRem(10);
    margin: 0 toRem(4);
    cursor: pointer;

    @include breakpoint-down(sm) {
      @include square-shape(28);
    }

    .item {
      @include center-placement;
      @include font-height(12, 17);
      @include transition(0.3s);

      @include breakpoint-down(xs) {
        @include font-height(11.25, 16);
      }
    }

    &:hover {
      background: rgba($border-grey, 0.5);
      color: $color-text;
    }
  }

  .active-item {
    background: rgba($border-grey, 0.7);
    color: $color-text;
  }

  .disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
}

.pagination-container {
  @include flex-row-between-nowrap;
  margin: toRem(30) 0 toRem(40);

  @include breakpoint-down(md) {
    margin: toRem(25) 0 toRem(20);
  }

  @include breakpoint-down(xs) {
    margin: toRem(25) 0 toRem(10);
  }

  .page-info {
    @include font-height(12, 19);
    padding-right: toRem(7);

    @include breakpoint-down(xs) {
      @include font-height(11, 17);
    }
  }

  .page-nav {
    @include flex-row-between-nowrap;

    .nav {
      padding: toRem(6) toRem(7);
      border: toRem(1) solid $border-grey;
      @include transition(0.5s);
      border-radius: toRem(5);
      font-size: toRem(10);
      color: $brand-navy;
      font-weight: 600;
      cursor: pointer;

      &:first-of-type {
        margin-right: toRem(7);
      }

      &:last-of-type {
        margin-left: toRem(7);
      }

      &:hover {
        background: $white-text;
      }

      &.disabled {
        pointer-events: none;
        cursor: not-allowed;
        color: rgba($border-grey-dark, 0.65);
      }
    }

    .nav-entry {
      @include flex-row-between-nowrap;

      .page-input {
        @include rectangle-shape(40, 18);
        padding: toRem(13) toRem(8);
        font-size: toRem(11);
      }

      .page-slash {
        margin: auto toRem(2);
        font-size: toRem(12.75);

        @include breakpoint-down(xs) {
          font-size: toRem(12.5);
        }
      }

      .page-total {
        font-size: toRem(12.5);

        @include breakpoint-down(xs) {
          font-size: toRem(12);
        }
      }

      .page-btn {
        padding: toRem(6) toRem(8);
        background: $brand-accent;
        @include transition(0.5s);
        border-radius: toRem(5);
        margin-left: toRem(5);
        font-size: toRem(10);
        color: $brand-navy;
        font-weight: 600;
        cursor: pointer;

        &:hover {
          background: $brand-inverse;
        }
      }
    }
  }

  .nav-disabled {
    cursor: not-allowed;
    color: $border-grey;
  }
}
</style>
