<template>
  <div class="select-filter smooth-transition">
    <div class="text">{{ title }}:</div>

    <select
      class="form-control text-capitalize"
      v-model="filter"
      @change="filterSelected"
    >
      <option value="" selected v-if="show_all">All {{ title }}</option>
      <option
        :value="filter.value"
        v-for="(filter, index) in filter_list"
        :key="index"
      >
        {{ filter.title }}
      </option>
    </select>

    <!-- DROPDOWN ICON -->
    <div class="dropdown-icon icon-caret-down"></div>
  </div>
</template>

<script>
export default {
  name: "selectFilter",

  props: {
    title: {
      type: String,
      default: "Filter",
    },

    select_key: String,

    default: [String, Number],

    show_all: {
      type: Boolean,
      default: true,
    },

    filter_list: {
      type: Array,
      default: () => [{ title: "Filter One", value: "filter_one" }],
    },
  },

  data: () => ({
    filter: "",
  }),

  watch: {
    $route: {
      handler(value) {
        if (!Object.keys(value.query).length) this.filter = "";
      },
    },

    default: {
      handler(value) {
        this.filter = value;
      },
      immediate: true,
    },
  },

  methods: {
    filterSelected() {
      let query = { [this.select_key]: this.filter };

      this.$router.push({
        name: this.$route.name,
        params: { id: this.$route.params.id },
        query: { ...this.$route.query, ...query },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.select-filter {
  width: auto;
  border-radius: toRem(10);
  @include flex-row-start-nowrap;
  background: $brand-inverse-light;
  padding: toRem(7.5) toRem(12);
  margin-right: toRem(10);
  margin-top: toRem(10);
  cursor: pointer;

  @include breakpoint-down(lg) {
    padding: toRem(5.5) toRem(10.5);
  }

  @include breakpoint-down(xs) {
    margin-right: 0;
    width: 100%;
  }

  .text {
    color: $color-text;
    font-size: toRem(12.75);
    line-height: toRem(19);
    margin-right: 0;

    @include breakpoint-down(lg) {
      font-size: toRem(12.5);
      line-height: toRem(18);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(12.25);
      line-height: toRem(17);
    }
  }

  .form-control {
    border: none !important;
    background: transparent !important;
    width: auto !important;
    font-weight: 600;
    font-size: toRem(12.25);
    min-height: toRem(25);
    padding: 0 toRem(8) 0 toRem(7);
    cursor: pointer;

    @include breakpoint-down(lg) {
      font-size: toRem(12.5);
      padding: 0 toRem(8) 0 toRem(7);
      font-weight: 500;
    }

    @include breakpoint-down(xs) {
      width: 100% !important;
      font-size: toRem(12);
    }
  }

  .dropdown-icon {
    font-size: toRem(11);
    font-weight: 600;
    color: $color-grey-dark;
    margin-top: toRem(2.25);
    margin-left: toRem(5);

    @include breakpoint-down(lg) {
      margin-left: toRem(2.5);
    }

    // @include breakpoint-down(lg) {
    //   position: absolute;
    //   right: toRem(10);
    // }
  }
}
</style>
