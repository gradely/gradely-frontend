<template>
  <div
    class="student-table-body white-text-bg rounded-3 mgb-4 smooth-transition student-table-check"
  >
    <!-- LABEL  -->
    <div
      class="label position-absolute h-100 brand-accent-bg smooth-transition"
    ></div>

    <!-- CHECKBOX  -->
    <div class="column-one checkbox-inline">
      <input
        type="checkbox"
        v-model="is_checked"
        :checked="is_checked"
        @click="selectStudent"
      />
    </div>

    <!-- STUDENT INFO  -->
    <div class="column-two student-info">
      <!-- STUDENT IMAGE -->
      <div
        class="avatar"
        :class="student.student_image ? 'border-brand-inverse' : null"
      >
        <img
          v-lazy="student.student_image"
          alt=""
          class="avatar-img"
          v-if="student.student_image"
        />

        <div
          class="avatar-text"
          v-else
          :class="$color.getProfileBgColor(getStudentFullname)"
        >
          {{ $string.getStringInitials(getStudentFullname) }}
        </div>
      </div>

      <!-- INFO  -->
      <div class="info">
        <router-link
          :to="{
            name: 'StudentProfile',
            params: { student_id: student.id },
            query: { name: getStudentFullname },
          }"
          class="name font-weight-600 color-text text-capitalize"
        >
          {{ getStudentFullname }}
        </router-link>
        <div class="class-year color-ash">{{ student.class_name }}</div>
      </div>
    </div>

    <!-- PARENT INFO   -->
    <div class="column-three parent-info">
      <!-- HAS PARENT  -->
      <template v-if="getParentFullname">
        <div
          class="avatar"
          :class="student.parent_image ? 'border-brand-inverse' : null"
        >
          <img
            v-lazy="student.parent_image"
            alt=""
            class="avatar-img"
            v-if="student.parent_image"
          />
          <div
            v-else
            class="avatar-text"
            :class="$color.getProfileBgColor(getParentFullname)"
          >
            {{ $string.getStringInitials(getParentFullname) }}
          </div>
        </div>

        <div class="name color-text text-capitalize">
          {{ getParentFullname }}
        </div>
      </template>
    </div>

    <!-- LICENSE  -->
    <div class="column-four subscription">
      <!-- NOT DISABLED STATE  -->
      <template v-if="student.subscription_status">
        <div class="color-ash text-capitalize">
          {{ student.subscription_status }}
        </div>
      </template>

      <!-- DISABLED STATE  -->
      <template v-else>
        <div class="border-grey-dark">Disabled</div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "activateStudentTableBody",

  props: {
    student: Object,
    default: () => ({
      id: 1,
      parent_id: 1,
      student_image: "",
      student_firstname: "Femi",
      student_lastname: "Ibiwoye",
      parent_image: "",
      parent_firstname: "Boye",
      parent_lastname: "Oshinaga",
      class_name: "Year 1 - Gold",
      subscription_status: null,
    }),
  },

  computed: {
    getStudentFullname() {
      return this.student.student_firstname
        ? `${this.student.student_firstname} ${this.student.student_lastname}`
        : false;
    },

    getParentFullname() {
      return this.student.parent_firstname
        ? `${this.student.parent_firstname} ${this.student.parent_lastname}`
        : false;
    },
  },

  data: () => ({
    show_more_option: false,
    is_checked: false,
  }),

  created() {
    this.$bus.$on("toggleStudentSelection", (checked) =>
      this.handleSelection(checked)
    );
  },

  methods: {
    ...mapActions({
      updateStudentSelection: "dbStudent/updateStudentSelection",
    }),

    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    selectStudent() {
      this.updateStudentSelection({ id: Number(this.student.id) });
    },

    handleSelection(checked) {
      this.is_checked = checked;
    },
  },
};
</script>

<style lang="scss" scoped></style>
