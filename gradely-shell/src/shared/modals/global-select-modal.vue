<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          {{ modal_detail.title }}
        </div>

        <!-- SEARCH BAR  -->
        <div class="modal-search-bar mgt-10" v-if="selections_repo.length > 8">
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
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- SELECTION CONTENT  -->
        <template v-if="selections.length">
          <plain-select-card
            v-for="(selection, index) in selections"
            :key="index"
            :index="index"
            :item="selection"
            @selected="updateSelection($event)"
          />
        </template>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer"></div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import plainSelectCard from "@/shared/components/plain-select-card";

export default {
  name: "globalSelectModal",

  components: {
    modalCover,
    plainSelectCard,
  },

  props: {
    modal_detail: {
      type: Object,
      default: () => ({
        title: "Title goes here...",
        pre_selected: "",
        data: [],
        url_data: {
          query_key: "", // QUERY KEY
          query_value: "", // QUERY KEY TYPE
        },
      }),
    },
  },

  watch: {
    modal_detail: {
      handler(value) {
        this.selections_repo = this.selections = value?.data.length
          ? value.data
          : [];
      },
      immediate: true,
      deep: true,
    },

    selections: {
      handler(value) {
        value.length ? this.checkIfDataIsPreselected() : null;
      },
      // deep: true,
      immediate: true,
    },
  },

  data: () => ({
    search_value: null,
    selections_repo: [],
    selections: [],
  }),

  methods: {
    // CHECK IF SELECTED HAS PRE-SELECTED DATA
    checkIfDataIsPreselected() {
      this.selections.map((selection) => (selection.selected = false));

      let selected_index = this.selections.findIndex((selection) =>
        this.checkType(this.modal_detail.pre_selected) === "string"
          ? selection.name === this.modal_detail.pre_selected
          : selection.id === this.modal_detail.pre_selected
      );

      this.selections[selected_index].selected = true;
    },

    // CHECK TYPE OF SELECTED DATA
    checkType(selected) {
      return typeof selected;
    },

    // FILTER SELECTIONS
    filterSelections() {
      let filtered_list = [];

      if (this.search_value.length)
        this.selections_repo.map((selection) => {
          if (
            selection.name
              .toLowerCase()
              .includes(this.search_value.toLowerCase())
          ) {
            filtered_list.push(selection);
            this.selections = filtered_list;
          }
        });
      else this.selections = this.selections_repo;
    },

    // UPDATE SELECTED DATA
    updateSelection(selection) {
      let selected_data = this.selections[selection];

      this.reloadRoute({
        [this.modal_detail.url_data.query_key]:
          this.modal_detail.url_data.query_value === "id"
            ? selected_data.id
            : selected_data.name,
      });
    },

    // RELOAD ROUTE
    reloadRoute(query) {
      this.$router
        .push({
          name: this.$router.currentRoute.name,
          params: { id: this.$route.params.id },
          query: { ...this.$route.query, ...query },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
        });

      this.$emit("closeTriggered"); // CLOSE MODAL
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  min-height: 10vh;
  height: auto;
  max-height: 44vh;
}
</style>
