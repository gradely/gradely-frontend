<template>
  <div class="custom-select-wrapper pointer" @click="toggleOptions" v-on-clickaway="hideOptions">
    <div>
      <span class="color-grey-dark gfont-14">{{ title }}</span>
      <span class="mgl-2 mgr-3">:</span>
      <span
        class="gfont-14 color-ash font-weight-600"
        v-if="!multiple && getSelection"
      >{{ getSelection.name }}</span>
      <span class="gfont-14 color-text" v-if="showDefaultPlaceholder">{{ defaultPlaceholder }}</span>
    </div>

    <div class="icon icon-caret-down border-grey-dark gfont-13"></div>

    <div class="options-wrapper mgt-8" v-if="multiple && getSelections.length">
      <div
        class="chip"
        v-for="(item, index) in getSelections"
        :key="index"
        @click.stop="removeSelection(item)"
      >
        <img v-if="item.image && showAvatar" v-lazy="item.image" alt="tutor" />

        <div
          v-if="!item.image && showAvatar"
          class="avatar-text gfont-10 color-white"
          :class="$color.getProfileBgColor(item.name)"
        >{{ $string.getStringInitials(item.name) }}</div>

        <div class="color-text gfont-14 font-weight-400">{{ item.name }}</div>

        <div class="icon icon-close gfont-10 color-ash mgl-7"></div>
      </div>
    </div>

    <div class="position-relative w-100" v-if="show_options">
      <div class="options smooth-animation position-absolute">
        <div class="search-wrapper mgb-6" v-if="options.length > 4">
          <div class="icon icon-search brand-accent gfont-13"></div>
          <input
            type="text"
            class="form-control search-input"
            v-model="search"
            placeholder="Filter options"
            @click.stop
          />
          <div
            v-if="search"
            class="icon icon-close gfont-11 font-weight-600 pointer"
            @click.stop="clearSearch"
          ></div>
        </div>

        <div class="empty-search" v-if="!getFilteredOptions.length">
          <img v-lazy="staticImg('EmptyHomework.png')" alt class="empty-box" />
          <div class="border-grey-dark mgb-15 gfont-13 text-center">No Match Found!!!</div>
        </div>

        <div class="label-wrapper">
          <label
            @click.stop="makeSelection(item)"
            :for="title + item.name + item.index"
            class="selection"
            :class="showAvatar ? 'avatar-columns' : 'no-avatar-columns'"
            v-for="(item, index) in getFilteredOptions"
            :key="index"
          >
            <img
              v-lazy="item.image"
              alt="avatar"
              class="avatar-wrapper"
              v-if="item.image && showAvatar"
            />

            <div
              v-if="!item.image && showAvatar"
              class="avatar-wrapper"
              :class="$color.getProfileBgColor(item.name)"
            >{{ $string.getStringInitials(item.name) }}</div>

            <div class="gfont-13 color-text">{{ item.name }}</div>
            <input
              type="checkbox"
              name="tick"
              :id="title + item.name + item.index"
              class="tick-check"
              :checked="item.selected"
              v-if="multiple"
              @change="toggleOptionSelection(item)"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',

  props: {
    multiple: {
      type: Boolean,
      default: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    showAvatar: {
      type: Boolean,
      default: false,
    },

    defaultOptions: {
      type: Array,
      default: () => [],
    },

    title: {
      type: String,
      default: 'Class',
    },

    defaultPlaceholder: {
      type: String,
      default: '',
    },
  },

  watch: {
    defaultOptions: {
      handler(options) {
        this.options = [...options];
      },
      immediate: true,
    },

    disabled(state) {
      if (state) {
        this.options = [];
        this.$emit('updated', []);
      } else {
        this.$emit(
          'updated',
          this.multiple ? this.getSelections : this.getSelection
        );
      }
    },
  },

  computed: {
    getSelection() {
      return this.options.find((option) => option.selected);
    },

    getSelections() {
      return this.options.filter((option) => option.selected);
    },

    showDefaultPlaceholder() {
      return this.multiple
        ? this.defaultPlaceholder && !this.getSelections?.length
        : this.defaultPlaceholder && !this.getSelection;
    },

    getFilteredOptions() {
      return this.options.filter((option) =>
        option.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },

  data() {
    return {
      show_options: false,
      options: [],
      search: '',
    };
  },

  methods: {
    toggleOptions() {
      if (!this.show_options) this.$emit('toggle');
      if (this.disabled) return;
      const modalBody = document.querySelector('.modal-cover-body');
      this.show_options = !this.show_options;
      this.$nextTick(() => {
        modalBody.scrollTop = 170;
      });
    },

    hideOptions() {
      this.show_options = false;
    },

    toggleOptionSelection(item) {
      this.options.splice(item.index, 1, { ...item, selected: !item.selected });
      this.$emit(
        'updated',
        this.multiple ? this.getSelections : this.getSelection
      );
    },

    makeSelection(item) {
      if (!this.multiple) {
        this.options = this.options.map((option) => {
          if (item.index === option.index) option.selected = true;
          else option.selected = false;
          return option;
        });

        this.$emit(
          'updated',
          this.multiple ? this.getSelections : this.getSelection
        );
      }
    },

    removeSelection(item) {
      this.options.splice(item.index, 1, { ...item, selected: false });
      this.$emit(
        'updated',
        this.multiple ? this.getSelections : this.getSelection
      );
    },

    clearSearch() {
      this.search = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-select-wrapper {
  width: 100%;
  padding-bottom: toRem(10);
  border-bottom: 1px solid $border-grey;
  @include flex-row-between-wrap;

  .options-wrapper {
    width: 100%;
    position: relative;

    @include flex-row-start-wrap;
    gap: 15px;

    .chip {
      @include flex-row-start-nowrap;
      gap: 0 5px;
      border: 1px solid $border-grey;
      border-radius: 8px;
      padding: toRem(4) toRem(8);
      cursor: pointer;
      transition: all ease-in-out 0.25s;

      &:hover {
        background: rgba($brand-red, 0.5);
      }

      img {
        @include square-shape(19);
        border-radius: 6px;
      }

      .avatar-text {
        @include square-shape(18);
        padding: toRem(3);
      }
    }
  }

  .empty-search {
    .empty-box {
      @include square-shape(50);
      display: block;
      margin: toRem(20) auto;
    }
  }

  .options {
    box-shadow: 0 0.0625rem 0.25rem rgba(7, 55, 75, 0.15);
    z-index: 4;
    background: $white-text;

    width: 100%;
    border-radius: 7px;
    border: 1px solid $border-grey;
    position: absolute;
    top: toRem(11);
    padding: toRem(10);

    @include breakpoint-down(xs) {
      width: calc(100% + 65px);
      right: -10px;
    }

    .label-wrapper {
      max-height: 250px;
      overflow-y: auto;
      @include gray-scrollbar;
    }

    .search-wrapper {
      width: 100%;
      height: 2.375rem;
      position: relative;

      .search-input {
        padding-left: toRem(40);
        min-height: 2.375rem;
        width: 100%;
        inset: 0;
        position: absolute;
        border-radius: toRem(20);
      }
    }

    .icon-search {
      @include center-y;
      left: 1.25rem;
      z-index: 3;
    }

    .icon-close {
      color: $brand-navy;
      @include center-y;
      left: calc(100% - 1.5rem);
      z-index: 3;
      transition: color ease-in-out 0.25s;

      &:hover {
        color: $brand-accent;
      }
    }

    .selection {
      padding: toRem(9);
      border-bottom: 1px solid $border-grey;
      display: grid;
      align-items: center;
      transition: background ease-in-out 0.25s;
      cursor: pointer;

      &:hover {
        background: rgba(229, 229, 229, 0.125);
      }
    }

    .avatar-columns {
      grid-template-columns: auto 1fr auto;
    }

    .no-avatar-columns {
      grid-template-columns: 1fr auto;
    }

    .avatar-wrapper {
      @include square-shape(30);
      @include flex-row-center-nowrap;
      border-radius: toRem(7);
      color: $color-white;
      font-size: 0.8rem;
      font-weight: 600;
      margin-right: toRem(10);
    }
  }
}
</style>
