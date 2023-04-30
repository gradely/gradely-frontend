<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="false"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header pdb-5">
        <!-- SEARCH INPUT -->
        <div class="search-input">
          <input
            type="search"
            class="form-control"
            v-model="search_value"
            placeholder="Find class by name"
            @input="searchClasslist"
            @keyup="searchClasslist"
            @propertyChange="searchClasslist"
            @paste="searchClasslist"
            @change="searchClasslist"
          />

          <div class="icon icon-search brand-accent"></div>
        </div>
      </div>
    </template>
    ``
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-0">
        <label
          :for="'classchecker' + index"
          class="class-item"
          v-for="(item, index) in class_list"
          :key="index"
        >
          <div class="checkbox checkbox-inline mgr-8">
            <input
              type="checkbox"
              :checked="item.selected"
              :id="'classchecker' + index"
              style="top: -5px"
              @change="item.selected = !item.selected"
            />
          </div>

          <div class="text color-ash">{{ item.class_name }}</div>
        </label>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer mgt-15 mgb-5 pdt-0">
        <div class="d-flex justify-content-center">
          <button
            class="btn modal-btn btn-default-outline position-relative"
            @click="updateSelection"
          >
            Done
          </button>
        </div>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "classSelectionModal",

  components: {
    modalCover,
  },

  computed: {
    ...mapGetters({ getClassSelections: "dbHome/getClassSelections" }),
  },

  data() {
    return {
      search_value: "",
      class_repo: [],
      class_list: [],
    };
  },

  mounted() {
    this.fetchSchoolClasses();
  },

  methods: {
    ...mapActions({
      getSchoolClasses: "dbHome/getSchoolClasses",
      updateClassSelections: "dbHome/updateClassSelections",
    }),

    fetchSchoolClasses() {
      this.class_list = [];

      this.getSchoolClasses()
        .then((response) => {
          response.data.map((class_level) =>
            class_level.classes.map((arm) => {
              let class_arm = {};
              class_arm.id = arm.id;
              class_arm.class_name = arm.class_name;
              class_arm.selected = false;

              this.class_list.push(class_arm);
            })
          );

          this.class_repo = this.class_list;
          this.checkSelectedList(this.class_list ?? []);
        })
        .catch(() =>
          this.pushAlert("An error occured while loading class data", "error")
        );
    },

    checkSelectedList(classes) {
      classes.map((item) => {
        if (this.getClassSelections?.some((assign) => assign.id === item.id))
          item.selected = true;
      });
    },

    searchClasslist() {
      let filtered_list = [];

      if (this.search_value.length)
        this.class_repo.map((entry) => {
          if (
            entry.class_name
              .toLowerCase()
              .includes(this.search_value.toLowerCase())
          ) {
            filtered_list.push(entry);
            this.class_list = filtered_list;
          }
        });
      else this.class_list = this.class_repo;
    },

    updateSelection() {
      let selected_classes = this.class_list.filter((item) => item.selected);
      this.updateClassSelections(selected_classes);
      this.$emit("closeTriggered");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-header {
  .search-input {
    position: relative;

    input {
      background: $color-white;
      border: toRem(1) solid $border-grey;
      border-radius: toRem(25);
      padding-left: toRem(44);
      font-size: toRem(13);

      &:focus {
        border: toRem(1) solid $brand-accent;
      }
    }

    .icon {
      @include center-y;
      left: toRem(15);
      font-size: toRem(21);
      z-index: 9;
    }
  }
}

.modal-cover-body {
  height: auto;
  max-height: 35vh;

  .class-item {
    @include flex-row-start-nowrap;
    padding: toRem(10) toRem(4);
    border-bottom: toRem(1) solid rgba($border-grey, 0.65);
    cursor: pointer;

    .text {
      font-size: toRem(12.5);
    }
  }
}

.modal-cover-footer {
  .btn {
    padding: toRem(12) toRem(34);
    font-size: toRem(10.5);
  }
}
</style>
