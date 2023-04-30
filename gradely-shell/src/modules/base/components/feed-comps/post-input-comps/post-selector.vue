<template>
  <div
    class="post-selector box-shadow-effect rounded-5 smooth-animation ignore"
    v-on-clickaway="hideDropdown"
  >
    <!-- SEARCH BAR  -->
    <div class="modal-search-bar top-0" v-if="selections_repo.length > 6">
      <input
        type="search"
        class="form-control rounded-30"
        v-model="search_value"
        @input="filterSelections"
        @keyup="filterSelections"
        @propertyChange="filterSelections"
        @paste="filterSelections"
        @change="filterSelections"
        placeholder="Filter options..."
      />
      <div class="icon-search border-grey-dark index-1"></div>
    </div>

    <template v-if="selections.length">
      <label
        :for="'checkOne' + index"
        class="w-100 pointer ignore"
        v-for="(item, index) in selections"
        :key="index"
      >
        <div class="selector-row w-100 rounded-4 smooth-transition ignore">
          <!-- LEFT SECTION -->
          <div class="left-section ignore">
            <div class="avatar rounded-7 ignore" v-if="show_image">
              <img
                v-lazy="item.image"
                :alt="$string.getStringInitials(item.name)"
                class="avatar-img ignore"
                v-if="item.image"
              />

              <div
                v-else
                class="avatar-text ignore"
                :class="$color.getProfileBgColor(item.name)"
              >
                {{ $string.getStringInitials(item.name) }}
              </div>
            </div>

            <!-- NAME  -->
            <div class="name color-text ignore">
              {{ item.name }}
            </div>
          </div>

          <!-- RIGHT SECTION -->
          <div
            class="right-section checkbox checkbox-inline ignore"
            :class="!multi_select ? 'invisible' : null"
          >
            <input
              type="checkbox"
              :checked="item.selected"
              :id="'checkOne' + index"
              class="position-relative ignore"
              style="top: -5px"
              @change="makeSelection(item)"
            />
          </div>
        </div>
      </label>
    </template>

    <template v-else>
      <div class="empty-selection-state">
        <img v-lazy="mxStaticImg('EmptyHomework.png')" alt="" />
        <div class="text text-center color-grey-dark">
          No selection list item found!
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "postSelector",

  props: {
    multi_select: {
      type: Boolean,
      default: true,
    },

    pre_selected: {
      type: Array,
    },

    data_set: {
      type: Array,
    },

    show_image: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    data_set: {
      handler(value) {
        this.selections_repo = this.selections = value?.length ? value : [];
      },
      immediate: true,
      deep: true,
    },

    selections: {
      handler(value) {
        value.length ? this.checkIfDataIsPreselected() : null;
      },
      immediate: true,
      deep: true,
    },

    pre_selected: {
      handler() {
        this.checkIfDataIsPreselected();
      },
    },
  },

  data: () => ({
    search_value: null,
    selections_repo: [],
    selections: [],
  }),

  mounted() {
    this.selections.map((item) => (item.selected = false));
  },

  methods: {
    checkIfDataIsPreselected() {
      this.pre_selected.map((selected) => {
        this.selections.map((sort) =>
          sort.id === selected.id ? (sort.selected = true) : null
        );
      });
    },

    makeSelection(selected) {
      if (!this.multi_select)
        this.selections.map((item) => (item.selected = false));

      this.$emit("resolveSelection", selected);

      if (!this.multi_select) this.$emit("hideDropdown");
    },

    filterSelections() {
      let filtered_list = [];

      if (this.search_value.length) {
        this.selections_repo.map((selection) => {
          if (
            selection.name
              .toLowerCase()
              .includes(this.search_value.toLowerCase())
          ) {
            filtered_list.push(selection);
            // this.selections = filtered_list;
          }
        });
        this.selections = filtered_list;
      } else this.selections = this.selections_repo;
    },

    hideDropdown($event) {
      if (!$event.target.classList.contains("ignore"))
        this.$emit("hideDropdown");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-search-bar {
  margin: toRem(3.5) 0 toRem(6);

  .form-control {
    @include font-height(12.5, 16);
    min-height: toRem(38);
  }
}

.post-selector {
  background: $white-text;
  position: absolute;
  padding: toRem(7.5) toRem(7);
  max-height: toRem(260);
  z-index: 99;
  height: auto;
  width: 100%;
  overflow: auto;
  border: 1px solid $border-grey;

  &::-webkit-scrollbar {
    width: toRem(6);
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba($border-grey, 0.75);
    width: toRem(6);
    border-radius: toRem(6);
  }

  .selector-row {
    border-bottom: toRem(1) solid #e5e5e5;
    @include flex-row-between-nowrap;
    padding: toRem(6) toRem(2.5) toRem(6) toRem(7);

    .label {
      left: 0;
      width: toRem(4);
      background: $brand-accent;

      @include breakpoint-down(sm) {
        width: toRem(4);
      }
    }

    &:hover {
      background: rgba(#e5e5e5, 0.125);
    }

    .left-section {
      @include flex-row-start-nowrap;

      .avatar {
        @include square-shape(30);
        margin-right: toRem(10);

        .avatar-text {
          font-size: toRem(12);
          font-weight: 500;
        }
      }

      .name {
        font-size: toRem(12);
      }
    }
  }

  .empty-selection-state {
    @include flex-column-center;
    padding: toRem(20) toRem(10);

    img {
      margin-bottom: toRem(15);
      width: toRem(50);
      height: auto;
    }
    .text {
      @include font-height(13, 18);
    }
  }
}
</style>
