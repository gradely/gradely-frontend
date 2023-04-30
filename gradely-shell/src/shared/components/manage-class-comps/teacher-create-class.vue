<template>
  <div class="teacher-create-class smooth-transition">
    <div class="form-row mgb-0 pdb-0">
      <div class="form-group compact-row w-100">
        <label for="className" class="label-compact label-sm">Class Name</label>
        <input
          type="text"
          id="className"
          class="form-control"
          placeholder="Name your class"
          required
          v-model="form.class_name"
        />
      </div>

      <!-- ACADEMIC LEVEL -->
      <div class="form-group compact-row w-100">
        <label for="academicLevel" class="label-compact label-sm"
          >Academic Level
        </label>
        <select
          class="form-control"
          id="academicLevel"
          v-model="form.global_class_id"
        >
          <option disabled selected value="">Select academic level</option>
          <option
            :value="item.id"
            v-for="(item, index) in class_levels"
            :key="index"
          >
            {{ item.description }}
          </option>
        </select>
      </div>

      <!-- BUTTON ROW -->
      <div class="bottom-row w-100">
        <button
          class="btn btn-accent btn-block mgb-40 mx-auto"
          :disabled="isDisabled"
          @click="createClass"
          ref="createBtn"
        >
          Create Class
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "teacherCreateClass",

  computed: {
    isDisabled() {
      return this.form.class_name && this.form.global_class_id ? false : true;
    },
  },

  data() {
    return {
      form: {
        global_class_id: "",
        class_name: "",
      },

      class_levels: [],
    };
  },

  mounted() {
    this.fetchGlobalClassList();
  },

  methods: {
    ...mapActions({
      getGlobalClassList: "general/getGlobalClassList",
      teacherCreateClass: "general/teacherCreateClass",
      updateTeacherClassList: "general/updateTeacherClassList",
    }),

    fetchGlobalClassList() {
      this.getGlobalClassList().then(
        (response) => (this.class_levels = response?.data ?? [])
      );
    },

    createClass() {
      this.handleClick("createBtn", "creating...");

      this.teacherCreateClass(this.form)
        .then((response) => {
          this.handleClick("createBtn", "Create Class", false);

          if (response.code === 200) {
            this.pushAlert("Class created successfully", "success");
            this.updateTeacherClassList(response.data);

            this.$bus.$emit("showSubjectModal", {
              class_id: response.data.class_id,
              global_class_id: response.data.global_class_id,
            });

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1300);
          } else {
            this.pushAlert(response.message, "warning");
          }
        })
        .catch(() => {
          this.handleClick("createBtn", "Create Class", false);
          this.pushAlert("An error occured while creating class", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-row {
  .bottom-row {
    .btn {
      width: 80%;
      padding: toRem(16.5);
    }
  }
}
</style>