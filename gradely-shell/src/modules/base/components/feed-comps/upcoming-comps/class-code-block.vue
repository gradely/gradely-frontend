<template>
  <div>
    <div
      class="class-code-info-text brand-inverse-light"
      v-if="getAuthType === 'teacher'"
    >
      {{
        teacherClassLength ? "Add students to class with the class code." : null
      }}
    </div>

    <div class="class-code-block rounded-10">
      <div class="left">
        <!-- SCHOOL AND TEACHER -->
        <template v-if="isSchoolAndTeacher">
          <template v-if="teacherClassLength || getAuthType === 'school'">
            <div class="top-text border-grey mgb-4">Class Code</div>
            <div
              class="bottom-text brand-inverse-light"
              :key="$string.generateRandomString(10)"
            >
              {{ getClassCode || class_code }}
            </div>
          </template>

          <template v-else>
            <div class="top-text border-grey mgb-4">
              Don't belong to a class?
            </div>
            <div
              class="bottom-text brand-inverse-light"
              :key="$string.generateRandomString(10)"
            >
              Join a class now!
            </div>
          </template>
        </template>

        <!-- PARENT AND STUDENT -->
        <template v-if="isParentAndStudent">
          <template v-if="has_school">
            <div class="bottom-text brand-inverse-light mgb-4">
              {{ class_name }}
            </div>
            <div class="top-text border-grey">
              {{ school_name }}
            </div>
          </template>

          <template
            v-else-if="
              getAuthType === 'parent' && !this.getParentChildren.length
            "
          >
            <div class="bottom-text brand-inverse-light mgb-4">
              No child added?
            </div>
            <div class="top-text border-grey">Add your child on Gradely</div>
          </template>

          <template v-else>
            <div class="bottom-text brand-inverse-light mgb-4">
              Not joined a school?
            </div>
            <div class="top-text border-grey">
              Connect to your school on Gradely
            </div>
          </template>
        </template>
      </div>

      <!-- SCHOOL AND TEACHER ACCOUNT -->
      <template v-if="isSchoolAndTeacher">
        <template v-if="teacherClassLength || getAuthType === 'school'">
          <div
            class="right pointer smooth-transition"
            title="Copy class code"
            @click="copyClassCode"
          >
            <input
              type="text"
              ref="classCode"
              :value="getClassCode || class_code"
              class="position-absolute index--9 ignore"
              style="opacity: 0"
            />

            <div class="icon icon-copy"></div>
          </div>
        </template>

        <div
          v-else
          class="right pointer smooth-transition"
          title="Join Class"
          @click="toggleAddClassModal"
        >
          <div class="icon icon-school-fill"></div>
        </div>
      </template>

      <!-- PARENT AND CHILD ACCOUNT -->
      <template
        v-else-if="getAuthType === 'parent' && !this.getParentChildren.length"
      >
        <router-link
          :to="{
            name: 'ParentAddChild',
            query: { page: this.$route.path },
          }"
          class="right pointer smooth-transition"
          title="Add Child"
        >
          <div class="icon icon-user-plus"></div>
        </router-link>
      </template>

      <template v-else>
        <router-link
          :to="{
            name: 'StudentFindSchool',
            query: { child_id: $route.params.id },
          }"
          class="right pointer smooth-transition"
          title="Find your school"
          v-if="!has_school"
        >
          <div class="icon icon-search"></div>
        </router-link>
      </template>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_add_class_modal">
        <teacher-add-class-modal
          @closeTriggered="toggleAddClassModal"
          @show_invite_school="toggleInviteSchoolModal"
          @show_find_class="toggleFindClassModal"
        />
      </transition>

      <transition name="fade" v-if="show_find_class_modal">
        <find-class-modal @closeTriggered="toggleFindClassModal" />
      </transition>

      <transition name="fade" v-if="show_invite_school_modal">
        <invite-school-modal @closeTriggered="toggleInviteSchoolModal" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "classCodeBlock",

  components: {
    teacherAddClassModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/teacher-add-class-modal"
      ),
    findClassModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/find-class-modal"
      ),
    inviteSchoolModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/invite-school-modal"
      ),
    findChildSchool: () =>
      import(
        /* webpackChunkName: "findChildSchool" */ "@/modules/onboarding/pages/student-onboarding/find-child-school"
      ),
  },

  computed: {
    ...mapGetters({
      schoolClasses: "dbHome/getSchoolClasses",
      getParentChildren: "general/getParentChildren",
      getTeacherClassList: "general/getTeacherClassList",
    }),

    isSchoolAndTeacher() {
      return this.getAuthType === "school" || this.getAuthType === "teacher"
        ? true
        : false;
    },

    isParentAndStudent() {
      return this.getAuthType === "parent" || this.getAuthType === "student"
        ? true
        : false;
    },

    getClassCode() {
      if (this.current_time) return sessionStorage.getItem("classCode") || null;
    },

    teacherClassLength() {
      return this.getTeacherClassList?.classes?.length;
    },
  },

  watch: {
    getAuthUser: {
      handler(value) {
        if (this.getAuthType === "student") {
          this.has_school = value.school_name ? true : false;
          this.class_name = value.class_name;
          this.school_name = value.school_name;
        }
      },
      immediate: true,
    },

    $route: {
      handler(value) {
        this.getSchoolClassCode();

        // FOR PARENT AND STUDENT
        this.getParentChildren.length
          ? this.getChildSchoolInfo(value.params.id)
          : null;

        this.getAuthType === "student"
          ? this.getChildSchoolInfo(value.params.id)
          : null;
      },
      immediate: true,
    },
  },

  data: () => ({
    class_code: "No class selected",

    class_name: "Year 1",
    school_name: "Gradely College",
    has_school: false,

    current_time: Date.now(),

    show_add_class_modal: false,
    show_find_class_modal: false,
    show_invite_school_modal: false,
  }),

  created() {
    setInterval(() => (this.current_time = Date.now()), 1000);
  },

  methods: {
    ...mapActions({ getChildClassDetails: "general/getChildClassDetails" }),

    // GET CHILD SCHOOL ANME INFO FOR PARENT AND CHILD ACCOUNT
    getChildSchoolInfo(id) {
      if (["parent", "student"].includes(this.getAuthType)) {
        this.getChildClassDetails(id).then((response) => {
          this.has_school = response.data.has_school;
          this.school_name = response.data.school_name;
          this.class_name = response.data.class_name;

          if (this.$route.query?.class_invite) {
            this.$bus.$emit("childInSchool", this.has_school);
          }
        });
      }
    },

    copyClassCode() {
      let code_input = this.$refs.classCode;
      code_input.select();
      code_input.setSelectionRange(0, 99999); /*For mobile devices*/
      document.execCommand("copy");

      code_input.value === "No class selected"
        ? this.pushAlert("No class code available", "warning")
        : this.pushAlert("Class code copied successfully", "success");
    },

    getSchoolClassCode() {
      if (this.getAuthType === "school") {
        this.schoolClasses.map((class_level) =>
          class_level.classes.map((class_arm) => {
            if (Number(class_arm.id) === Number(this.$route.params.id))
              this.class_code = class_arm.class_code;
          })
        );
      }
    },

    toggleAddClassModal() {
      this.show_add_class_modal = !this.show_add_class_modal;
    },

    toggleFindClassModal() {
      this.show_find_class_modal = !this.show_find_class_modal;
    },

    toggleInviteSchoolModal() {
      this.show_invite_school_modal = !this.show_invite_school_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.class-code-info-text {
  @include font-height(10.85, 15);
}

.class-code-block {
  background: rgba(0, 0, 0, 0.4);
  @include flex-row-between-nowrap;
  padding: toRem(10) toRem(15);
  margin-top: toRem(6);

  @include breakpoint-down(xs) {
    padding: toRem(10.5);
  }

  .left {
    .top-text {
      @include font-height(11, 16);
    }

    .bottom-text {
      @include font-height(11.5, 18);
      font-weight: 600;
    }
  }

  .right {
    background: rgba($black-text, 0.4);
    @include square-shape(32);
    border-radius: toRem(10);
    position: relative;
    overflow: hidden;

    .icon {
      @include center-placement;
      font-size: toRem(15);
      color: $brand-accent;
    }

    &:hover {
      background: rgba($black-text, 0.7);
    }
  }
}
</style>
