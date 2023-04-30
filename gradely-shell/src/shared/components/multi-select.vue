<template>
  <div class="multi-select-wrapper position-relative w-100 h-auto mgb-20">
    <!-- SELECT INPUT  -->
    <div
      class="select-input form-control pointer smooth-transition h-auto"
      @click.self="toggleIsFocus"
      :class="is_focus ? 'active-select-input' : null"
    >
      <!-- SELECTIONS -->
      <div
        class="selections"
        v-if="getSelections.length"
        @click.self="toggleIsFocus"
      >
        <!-- SELECT CARD -->
        <div
          class="select-card"
          v-for="(selection, index) in getSelections"
          :key="index"
          @click="removeSelection(selection)"
        >
          <div class="text mgr-4">{{ selection.name }}</div>
          <div class="icon icon-close"></div>
        </div>
      </div>

      <!-- PLACEHOLDER TEXT -->
      <div
        class="placeholder-text border-grey-dark"
        @click.self="toggleIsFocus"
        v-else
      >
        {{ placeholder }}
      </div>

      <!-- CLOSE BUTTON -->
      <div
        class="dropdown-icon icon-caret-down border-grey-dark font-weight-500"
        @click.self="toggleIsFocus"
      ></div>
    </div>

    <!-- OPTIONS WRAPPER  -->
    <div
      class="options-wrapper rounded-4 w-100 index-9 mgt-5 smooth-animation box-shadow-effect white-text-bg"
      v-if="is_focus"
    >
      <!-- SEARCH BAR -->
      <div class="search-bar position-relative mgb-4" v-if="allow_search">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          v-model="search"
        />
        <div class="icon icon-search border-grey-dark index-9"></div>
      </div>

      <!-- OPTION LIST -->
      <div class="option-list-wrapper">
        <!-- OPTIONS -->
        <label
          class="option-row option-mix-row w-100 pointer color-text align-left smooth-transition"
          v-for="(option, index) in getFilteredSelections"
          :key="index"
        >
          <div class="left">
            <input
              type="checkbox"
              class="mgr-10"
              :checked="option.checked"
              @change="makeSelection(option)"
            />
            <div class="text position-relative">{{ option.name }}</div>
          </div>
        </label>
      </div>
      <!-- BUTTON ROW -->
      <div class="button-row mgt-5">
        <button
          class="btn bg-transparent no-shadow mgr-5 brand-tonic"
          @click="resetSelection"
        >
          RESET
        </button>

        <button
          class="btn btn-accent pdy-10 pdx-25"
          @click.self="submitSelections"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "multiSelect",

  props: {
    placeholder: {
      type: String,
      default: "Select multiple",
    },
    options: {
      type: Array,
      default: () => [],
    },
    pre_select: {
      type: Array,
      default: () => [],
    },
    allow_search: {
      type: Boolean,
      default: true,
    },
    clear_selection: {
      type: Boolean,
      default: false,
    },

    single_selection: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getFilteredSelections() {
      return this.selections.filter((selection) =>
        selection.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },

    getSelections() {
      return this.selections.filter((option) => option.checked);
    },
  },

  data() {
    return {
      is_focus: false,
      search: "",
      selections: this.options,
    };
  },

  methods: {
    toggleIsFocus() {
      this.is_focus = !this.is_focus;
    },

    dropIsFocus() {
      this.is_focus = false;
    },

    makeSelection(option) {
      // FOR A SINGLE-SELECT;
      //SET ALL OPTIONS TO FALSE, BUT TOGGLE SELECTED OPTION
      if (this.single_selection) {
        this.selections = this.selections.map((selection) => {
          let was_selected = option.index === selection.index;
          return {
            ...selection,
            checked: was_selected ? !selection.checked : false,
          };
        });
      }
      //FOR A MULTI-SELECT, TOGGLE SELECTED OPTION
      else {
        this.selections.splice(option.index, 1, {
          ...option,
          checked: !option.checked,
        });
      }
      this.$emit("selected", this.getSelections);
    },

    removeSelection(selection) {
      this.selections.splice(selection.index, 1, {
        ...selection,
        checked: false,
      });

      this.$emit("selected", this.getSelections);
    },

    resetSelection() {
      this.selections.map((selection) => {
        selection.checked = false;
        return selection;
      });

      this.$emit("selected", this.getSelections);
    },

    submitSelections() {
      this.$emit("selected", this.getSelections);
      this.is_focus = !this.is_focus;
    },
  },
};
</script>

<style lang="scss" scoped>
.multi-select-wrapper {
  .select-input {
    max-height: auto;

    .placeholder-text {
      @include font-height(12.5, 15);
      @include center-y;
      left: toRem(10);
      width: max-content;
    }

    .selections {
      @include flex-row-start-wrap;
      width: 97.25%;

      .select-text {
        @include font-height(12, 15);
        text-align: left;
        color: $color-grey-dark;
      }

      .select-card {
        @include flex-row-center-nowrap;
        @include font-height(12, 15);
        @include transition(0.4s);
        padding: toRem(11) toRem(16);
        border-radius: toRem(24);
        background: rgba($brand-inverse-light, 0.6);
        margin: toRem(2) toRem(3) toRem(3) 0;
        color: $brand-primary;

        .icon {
          position: relative;
          top: toRem(2);
          font-size: toRem(11);
        }

        &:hover {
          background: rgba($brand-red-light, 0.45);
          color: $brand-tonic;
        }
      }
    }

    .dropdown-icon {
      @include center-y;
      right: toRem(10);
      font-size: toRem(13);
    }
  }

  .options-wrapper {
    padding: toRem(8);

    .search-bar {
      input {
        padding-left: toRem(38);

        &::placeholder {
          color: $border-grey;
          font-size: toRem(12.5);
        }
      }

      .icon {
        @include center-y;
        left: toRem(15);
        font-size: toRem(16);
      }
    }

    .option-row {
      @include flex-row-start-nowrap;
      font-size: 12.25px;
      padding: toRem(8) toRem(10);
      margin-bottom: toRem(2);

      &:hover {
        background: rgba($brand-inverse-light, 0.7);
      }
    }

    .option-list-wrapper {
      max-height: toRem(170);
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: toRem(4);
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: $color-grey-light;
        height: toRem(70);
        border-radius: toRem(9);
      }
    }

    .option-mix-row {
      @include flex-row-between-nowrap;
      padding: toRem(8);
      padding-bottom: toRem(10);

      .left {
        @include flex-row-start-nowrap;

        .text {
          top: toRem(2);
        }
      }
    }

    .button-row {
      @include flex-row-end-nowrap;

      .btn {
        font-size: toRem(11);
        padding: toRem(10) toRwm(18);
      }
    }
  }

  .active-select-input {
    box-shadow: none;
    border: toRem(1) solid $brand-accent;
  }
}
</style>
