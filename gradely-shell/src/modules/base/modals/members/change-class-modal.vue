<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          Change Class
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgt--5">
        <child-info-modal-card :child="getStudentDetails" />

        <!-- TIP TEXT  -->
        <div class="tip-text color-ash mgb-15">
          Select a class below, to update the current class of
          <span class="font-weight-600">{{ getStudentDetails.fullname }}</span>
        </div>

        <!-- SELECT BLOCK  -->
        <div class="form-group compact-row w-100">
          <label for="newClass" class="label-compact label-sm"
            >New Class
          </label>

          <select class="form-control" id="newClass" v-model="class_id">
            <option disabled selected value="">Select new class</option>
            <option
              v-for="(branch, index) in classes"
              :key="index"
              :value="branch.id"
              >{{ branch.name }}</option
            >
          </select>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-center">
        <button
          class="btn btn-accent modal-btn"
          ref="updateClassBtn"
          @click="updateStudentClass"
        >
          Confirm
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";
import childInfoModalCard from "@/modules/dashboard/modals/child-info-modal-card";

export default {
  name: "changeClassModal",

  components: {
    modalCover,
    childInfoModalCard,
  },

  props: {
    student: {
      type: Object,
      default: () => ({
        id: 1,
        full_name: "Richy Jones",
      }),
    },
  },

  computed: {
    getNewClass() {
      return {
        account: this.getAuthType,
        student_id: this.student.id,
        class_id: Number(this.class_id),
      };
    },

    getStudentDetails() {
      return {
        image: this.student?.image,
        fullname: `${this.student?.firstname} ${this.student?.lastname}`,
        class_name: this.student?.code,
      };
    },
  },

  mounted() {
    this.getClasses();
  },

  data() {
    return {
      class_id: "",
      classes: [],
    };
  },

  methods: {
    ...mapActions({
      getSchoolClasses: "dbHome/getSchoolClasses",
      getTeacherSchoolClasses: "dbMembers/getTeacherSchoolClasses",
      changeStudentClass: "dbMembers/changeStudentClass",
    }),

    getClasses() {
      this.getAuthType === "school"
        ? this.getSchoolClasses().then((response) =>
            this.populateClassList(response.data)
          )
        : this.getTeacherSchoolClasses(this.$route.params.id).then((response) =>
            this.populateClassList(response.data)
          );
    },

    populateClassList(class_list) {
      class_list.forEach((level) => {
        level.classes.forEach((branch) => {
          this.classes.push(this.createClass(branch));
        });
      });
    },

    createClass(branch) {
      return { name: branch.class_name, id: branch.id };
    },

    updateStudentClass() {
      this.handleClick("updateClassBtn", "Confirming");

      if (!this.class_id) {
        this.pushAlert("Select new class", "warning");
        return;
      }

      this.changeStudentClass(this.getNewClass)
        .then((response) => {
          this.handleClick("updateClassBtn", "Confirm", false);

          if (response.code === 200) {
            this.pushAlert("Student's class updated successfully!", "success");
            this.$bus.$emit("reloadStudentInClass");
          } else this.pushAlert("Failed to change student's class", "warning");
        })
        .catch(() => {
          this.handleClick("updateClassBtn", "Confirm", false);
          this.pushAlert("Failed to change student's class", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.tip-text {
  @include font-height(12.5, 16);
}

.form-group {
  margin-top: toRem(30);

  .form-control {
    font-size: toRem(12.5);
  }
}

.modal-cover-footer {
  margin-top: toRem(-30);
  margin-bottom: toRem(10);
}

.class-loader {
  height: toRem(45);
}
</style>
