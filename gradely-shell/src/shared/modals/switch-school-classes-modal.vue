<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-mini' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Switch Class</div>

        <!-- SEARCH BAR  -->
        <div class="modal-search-bar mgt-10" v-if="school_classes.length > 8">
          <input
            type="search"
            class="form-control rounded-10"
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
      <div class="modal-cover-body position-relative smooth-transition">
        <template v-if="selections.length">
          <class-select-card
            v-for="(item, index) in selections"
            :key="index"
            :index="index"
            :class_data="{
              class_id: item.id || item.class_id,
              class_name: item.class_name,
              class_code: item.class_code,
            }"
            @classSelected="makeSelection($event)"
          />
        </template>

        <template v-else>
          <class-select-skeleton
            :loading_state="loading"
            :empty_state="selections.length > 0 ? false : true"
          />

          <!-- NO INTERNET MODAL STATE -->
          <no-internet-on-modal v-if="noInternetFound" />
        </template>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer" v-if="getAuthType === 'teacher'">
      <div class="modal-cover-footer pdt-4">
        <button
          class="btn btn-soft-accent w-100 rounded-5 text-capitalize"
          @click="$emit('add_class')"
        >
          Add {{ selections.length ? "another" : "a" }} Class
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import classSelectCard from "@/shared/components/sidebar-comps/class-select-card";

export default {
  name: "switchSchoolClassesModal",

  components: {
    modalCover,
    classSelectCard,
    classSelectSkeleton: () =>
      import(
        /* webpackChunkName: "classSelectSkeleton" */ "@/shared/modals/class-select-skeleton"
      ),
    noInternetOnModal: () =>
      import(
        /* webpackChunkName: "default" */ "@/shared/components/no-internet-on-modal"
      ),
  },

  props: {
    school_classes: [],
  },

  computed: {
    noInternetFound() {
      return !this.school_classes?.length && !navigator.onLine ? true : false;
    },
  },

  data: () => ({
    loading: false,
    empty_state: false,

    selections_repo: [],
    selections: [],

    search_value: null,
  }),

  watch: {
    school_classes: {
      handler(value) {
        this.selections_repo = this.selections = value?.length ? value : [];
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    makeSelection(id) {
      this.$router
        .push({
          name: this.$router.currentRoute.name,
          params: { id },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") throw error;
        });
      this.$emit("closeTriggered");
    },

    filterSelections() {
      let filtered_list = [];

      if (this.search_value.length)
        this.selections_repo.map((selection) => {
          if (
            selection.class_name
              .toLowerCase()
              .includes(this.search_value.toLowerCase())
          ) {
            filtered_list.push(selection);
            this.selections = filtered_list;
          }
        });
      else this.selections = this.selections_repo;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  min-height: 15vh;
  height: auto;
  max-height: 50vh;
}

.btn {
  padding: toRem(11);
  font-size: toRem(12);
  color: $color-text;
}
</style>
