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
            placeholder="Find student by name"
            @input="searchStudentlist"
            @keyup="searchStudentlist"
            @propertyChange="searchStudentlist"
            @paste="searchStudentlist"
            @change="searchStudentlist"
          />

          <div class="icon icon-search brand-accent"></div>
        </div>
      </div>
    </template>
    ``
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-0">
        <label for="studentchecker1" class="student-item">
          <div class="left">
            <div class="image-box avatar">
              <img
                :src="'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80'"
                alt=""
                class="avatar-img"
              />
            </div>
            <div class="text color-text">Giwa Omolade</div>
          </div>

          <div class="right">
            <div class="checkbox checkbox-inline">
              <input type="checkbox" id="studentchecker1" style="top: -5px" />
            </div>
          </div>
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
  name: "studentSelectionModal",

  components: {
    modalCover,
  },

  computed: {
    ...mapGetters({ getClassSelections: "dbHome/getClassSelections" }),
  },

  data() {
    return {
      search_value: "",
      student_repo: [],
      student_list: [],
    };
  },

  mounted() {
    // this.fetchSchoolClasses();
  },

  methods: {
    ...mapActions({
      getSchoolClasses: "dbHome/getSchoolClasses",
      updateClassSelections: "dbHome/updateClassSelections",
    }),

    fetchSchoolClasses() {
      this.student_list = [];

      this.getSchoolClasses()
        .then((response) => {
          response.data.map((class_level) =>
            class_level.classes.map((arm) => {
              let class_arm = {};
              class_arm.id = arm.id;
              class_arm.class_name = arm.class_name;
              class_arm.selected = false;

              this.student_list.push(class_arm);
            })
          );

          this.student_repo = this.student_list;
          this.checkSelectedList(this.student_list ?? []);
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

    searchStudentlist() {
      let filtered_list = [];

      if (this.search_value.length)
        this.student_repo.map((entry) => {
          if (
            entry.class_name
              .toLowerCase()
              .includes(this.search_value.toLowerCase())
          ) {
            filtered_list.push(entry);
            this.student_list = filtered_list;
          }
        });
      else this.student_list = this.student_repo;
    },

    updateSelection() {
      let selected_classes = this.student_list.filter((item) => item.selected);
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

  .student-item {
    @include flex-row-between-nowrap;
    padding: toRem(10) toRem(4);
    border-bottom: toRem(1) solid rgba($border-grey, 0.65);
    cursor: pointer;

    .left {
      @include flex-row-start-nowrap;

      .image-box {
        margin-right: toRem(10);
        border-radius: toRem(5);
        background: $brand-inverse-light;
        border: toRem(1) solid $brand-inverse;
      }

      .text {
        @include font-height(13, 18);
      }
    }

    .right {
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
