<template>
  <div class="student-table-header student-table-check">
    <div class="column-one checkbox-inline">
      <input
        type="checkbox"
        v-model="all_selected"
        :checked="is_checked"
        ref="clearCheckbox"
        @change="toggleAllStudentSelection"
      />
    </div>
    <div class="column-two">STUDENT</div>
    <div class="column-three">PARENT</div>
    <div class="column-four">LICENSE</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "activateStudentTableHeader",

  props: {
    students: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    all_selected: false,
    is_checked: false,
  }),

  created() {
    this.$bus.$on("clearOut", () => this.clearSelection());
  },

  methods: {
    ...mapActions({
      updateStudentSelection: "dbStudent/updateStudentSelection",
    }),

    toggleAllStudentSelection() {
      if (this.all_selected) {
        let all_student = [];
        this.students.map((student) => all_student.push(Number(student.id)));
        this.updateStudentSelection({ ids: all_student, bulk: true });

        this.$bus.$emit("toggleStudentSelection", true);
      } else {
        this.updateStudentSelection({ ids: [], bulk: true });
        this.$bus.$emit("toggleStudentSelection", false);
      }
    },

    clearSelection() {
      if (this.all_selected) this.$refs.clearCheckbox.click();
    },
  },
};
</script>

<style lang="scss" scoped></style>
