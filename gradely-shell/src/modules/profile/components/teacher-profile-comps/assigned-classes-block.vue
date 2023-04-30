<template>
  <div>
    <div class="assigned-classes">
      <school-class-arm
        card_style="modify-class-arm"
        profile_type
        v-for="(item, index) in teacher.classes"
        :key="index"
        :class_detail="item"
        :teacher="teacher"
      />
    </div>

    <!-- ASSIGN CLASS LINK  -->
    <div
      class="assign-link font-weight-600 btn-link smooth-transition"
      @click="toggleAssignModal"
    >
      Assign to another Class
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_assign_modal">
        <assign-class-modal
          :option="getOption"
          :teacher="teacher"
          @closeTriggered="toggleAssignModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "assignedClassesBlock",

  components: {
    assignClassModal: () =>
      import(
        /* webpackChunkName: "assignClassModal" */ "@/modules/dashboard/modals/assign-class-modal"
      ),
    schoolClassArm: () =>
      import(
        /* webpackChunkName: "schoolClassArm" */ "@/modules/dashboard/components/home-comps/school-class-arm"
      ),
  },

  props: {
    teacher: {
      type: Object,
      default: () => ({
        classes: [
          {
            id: 1,
            class_name: "Year 1 - Gold",
            subjects: [],
          },
        ],
      }),
    },
  },

  computed: {
    ...mapGetters({
      getSchoolClasses: "dbHome/getSchoolClasses",
      getSchoolSubjects: "dbHome/getSchoolSubjects",
    }),

    extractedClasses() {
      let classes = [];
      this.getSchoolClasses.forEach((level) => {
        level.classes.forEach((part) => {
          classes.push(this.createClass(part));
        });
      });
      return classes;
    },

    getOption() {
      return {
        classes: this.extractedClasses,
        subjects: this.getSchoolSubjects,
      };
    },
  },

  data: () => ({
    show_assign_modal: false,
  }),

  mounted() {
    this.getClasses();
    this.getSubjectList();
  },

  methods: {
    ...mapActions({
      fetchSchoolClasses: "dbHome/getSchoolClasses",
      fetchSubjectList: "dbHome/getSchoolSubjectList",
    }),

    toggleAssignModal() {
      this.show_assign_modal = !this.show_assign_modal;
    },

    createClass(level) {
      return { name: level.class_name, id: level.id };
    },

    getClasses() {
      // calls the api only if the data isnt ready already
      if (this.getSchoolClasses.length) return;

      this.fetchSchoolClasses()
        .then((response) => {
          response;
        })
        .catch((err) => {
          console.log("error getting school classes", err);
        });
    },

    getSubjectList() {
      // calls the api only if the data isnt ready already

      if (this.getSchoolSubjects.length) return;

      this.fetchSubjectList()
        .then((response) => {
          response;
        })
        .catch((err) => {
          console.log("error getting school subjects", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.assigned-classes {
  @include flex-row-start-wrap;

  @include breakpoint-down(sm) {
    @include flex-row-start-nowrap;
    overflow: auto;
  }

  .modify-class-arm {
    margin-bottom: toRem(15);
    overflow: unset !important;
  }
}

.assign-link {
  @include font-height(13, 18);

  @include breakpoint-down(sm) {
    @include font-height(12, 17);
  }
}
</style>
