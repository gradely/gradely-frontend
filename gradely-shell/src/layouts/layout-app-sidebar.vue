<template>
  <div class="layout-app-base">
    <!-- NAV BUILD  -->
    <nav-build :account_type="account_type" />

    <!-- GRADELY APP CONTAINER  -->
    <div
      class="gradely-app-container topnav-sub-offset"
      :class="inExclusionList ? 'header-attach' : null"
    >
      <div class="gradely-container mx-auto" :class="setPageLayout">
        <div class="gradely-row w-100">
          <!-- CONTENT VIEW  -->
          <div class="content-view">
            <transition name="fade" mode="out-in">
              <router-view />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import navBuild from "@/shared/components/nav-build";
// import schoolSidebar from "@/shared/components/sidebar-comps/school-sidebar";
// import teacherSidebar from "@/shared/components/sidebar-comps/teacher-sidebar";
// import parentSidebar from "@/shared/components/sidebar-comps/parent-sidebar";
// import studentSidebar from "@/shared/components/sidebar-comps/student-sidebar";

export default {
  name: "layoutAppSidebar",

  components: {
    navBuild,
    // schoolSidebar,
    // teacherSidebar,
    // parentSidebar,
    // studentSidebar,
  },

  computed: {
    setOffset() {
      return this.account_type === "school"
        ? "topnav-sub-offset"
        : "topnav-offset";
    },

    setPageLayout() {
      return this.$route.name === "GradelyFeeds"
        ? "px-0 px-sm-3 px-md-4 px-xl-5"
        : "px-2 px-sm-3 px-md-4 px-xl-5";
    },

    // loadSidebar() {
    //   if (this.account_type === "school") return "schoolSidebar";
    //   else if (this.account_type === "teacher") return "teacherSidebar";
    //   else if (this.account_type === "parent") return "parentSidebar";
    //   else if (this.account_type === "student") return "studentSidebar";
    //   else return false;
    // },

    inExclusionList() {
      return this.exclusion_list.includes(this.$route.name) ? true : false;
    },
  },

  data: () => ({
    account_type: null,
    view: null,
    exclusion_list: ["GradelyFeeds"],
    boarding_inclusion_list: [
      "GradelyFeeds",
      "GradelyStudents",
      "GradelyClassStudents",
      "GradelyTeachers",
      "GradelyAssessmentPublished",
      "GradelyUserNewAssessment",
      "GradelySchoolReport",
      "GradelyTeacherReport",
      "GradelyUserReport",
    ],
  }),

  mounted() {
    this.account_type = this.getAuthType;

    this.checkIfParentHasChild();
    this.checkIfTeacherHasClass();
  },

  methods: {
    ...mapActions({
      getParentChildren: "general/getParentChildren",
      loadTeacherClasses: "general/getTeacherClassList",
    }),

    checkIfParentHasChild() {
      setTimeout(
        () =>
          this.getAuthType === "parent" &&
          this.boarding_inclusion_list.includes(this.$route.name)
            ? this.fetchAllParentChildren()
            : null,
        1000
      );
    },

    checkIfTeacherHasClass() {
      setTimeout(
        () =>
          this.getAuthType === "teacher" &&
          this.boarding_inclusion_list.includes(this.$route.name)
            ? this.fetchTeacherClasses()
            : null,
        1000
      );
    },

    // FETCH ALL PARENT CHILD
    fetchAllParentChildren() {
      this.getParentChildren().then((response) => {
        if (response.code === 200)
          !response?.data?.length
            ? this.$router.push({ name: "ParentAddChild" })
            : null;
        // EMPTY STATE
        else if (response.code === 204 || response.code === 404)
          this.$router.push({ name: "ParentAddChild" });
      });
    },

    // FETCH ALL TEACHER ASSIGNED CLASSES
    fetchTeacherClasses() {
      this.loading_class_name = true;
      this.class_list = [];

      this.loadTeacherClasses().then((response) => {
        if (response.code === 200)
          !response?.data?.classes.length
            ? this.$router.push({ name: "TeacherConnectSchool" })
            : null;
        // EMPTY STATE
        else if (response.code === 204 || response.code === 404)
          this.$router.push({ name: "TeacherConnectSchool" });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
