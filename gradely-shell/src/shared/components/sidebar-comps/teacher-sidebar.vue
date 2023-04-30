<template>
  <div class="teacher-sidebar white-text-bg rounded-5 h-auto position-relative">
    <!-- TEACHER LOADING STATE  -->
    <template v-if="loading">
      <sidebar-loading-state />
    </template>

    <template v-else>
      <template v-if="final_class_state.length">
        <teacher-class-card
          v-for="(item, index) in final_class_state"
          :key="index"
          :active="index === 0"
          :class_id="Number(item.class_id)"
          :class_name="item.class_name"
          :class_code="item.class_code"
          @classSelected="updatedSelectedClass($event)"
        />
      </template>

      <template v-else>
        <empty-teacher-state />
      </template>
    </template>

    <!-- ADD CLASS  -->
    <div class="add-class w-100">
      <div class="wrapper" @click="toggleAddClassModal">
        <div class="avatar border-color-grey-light mgr-10">
          <div class="icon icon-plus brand-accent"></div>
        </div>

        <div class="text color-text pointer smooth-transition">
          Add another class
        </div>
      </div>

      <div
        v-if="showClassToggler"
        class="avatar border-color-grey-light pointer"
        title="Toggle Classes"
        @click="toggleMoreClasses"
      >
        <div
          class="icon brand-inverse"
          :class="is_shrinked ? 'icon-caret-fill-down' : 'icon-caret-fill-up'"
        ></div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_class_modal">
        <switch-classes-modal @closeTriggered="toggleClassModal" />
      </transition>

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
import { mapActions, mapGetters } from "vuex";
import sidebarLoadingState from "@/shared/components/sidebar-comps/sidebar-loading-state";
import teacherClassCard from "@/shared/components/sidebar-comps/teacher-class-card";
import emptyTeacherState from "@/shared/components/sidebar-comps/empty-teacher-state";

export default {
  name: "teacherSidebar",

  components: {
    sidebarLoadingState,
    teacherClassCard,
    emptyTeacherState,
    switchClassesModal: () =>
      import(
        /* webpackChunkName: "switchClassesModal" */ "@/shared/modals/switch-classes-modal"
      ),
    teacherAddClassModal: () =>
      import(
        /* webpackChunkName: "teacherAddClassModal" */ "@/shared/modals/teacher-add-class-modal"
      ),
    findClassModal: () =>
      import(
        /* webpackChunkName: "findClassModal" */ "@/shared/modals/find-class-modal"
      ),
    inviteSchoolModal: () =>
      import(
        /* webpackChunkName: "inviteSchoolModal" */ "@/shared/modals/invite-school-modal"
      ),
  },

  computed: {
    ...mapGetters({
      getTeacherClasses: "general/getTeacherClassList",
    }),

    showClassToggler() {
      if (Object.keys(this.getTeacherClasses).length) {
        if (
          window.innerWidth > 768 &&
          this.getTeacherClasses.classes.length > this.max_class_desktop
        )
          return true;
        else if (
          window.innerWidth < 768 &&
          this.getTeacherClasses.classes.length > this.max_class_mobile
        )
          return true;
        else return false;
      } else return false;
    },

    watchClassListAndShrinkedState() {
      const { class_list, is_shrinked } = this;
      return {
        class_list,
        is_shrinked,
      };
    },
  },

  data: () => ({
    loading: true,
    class_list: [],
    final_class_state: [],
    is_shrinked: true,

    max_class_mobile: 1,
    max_class_desktop: 6,

    show_class_modal: false,
    show_add_class_modal: false,
    show_find_class_modal: false,
    show_invite_school_modal: false,
  }),

  watch: {
    // getTeacherClasses: {
    //   handler(value) {
    //     if (!Array.isArray(value)) {
    //       if (value?.classes.length) this.resetClassHistory();
    //       else this.loading = false;
    //     } else this.loading = false;
    //   },
    // },

    watchClassListAndShrinkedState: {
      handler() {
        this.getShrinkedClassList();
      },
    },
  },

  created() {
    // this.loadTeacherClasses();
  },

  mounted() {
    window.onresize = () => this.getShrinkedClassList();
  },

  methods: {
    ...mapActions({
      loadTeacherClasses: "general/getTeacherClassList",
      setTeacherSubjects: "general/setTeacherSubjectList",
    }),

    toggleClassModal() {
      this.show_class_modal = !this.show_class_modal;
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

    // RESET CLASS HISTORY
    resetClassHistory() {
      this.loading = false;
      let current_class_id = Number(this.$route.params.id);

      // CHECK IF CURRENT CLASS AND LOAD SUBJECT LIST OF CLASS
      current_class_id
        ? this.loadSubjectListByClassID(Number(current_class_id))
        : this.loadSubjectListByClassID();

      // SET CLASS ID
      current_class_id = current_class_id
        ? current_class_id
        : Number(this.getTeacherClasses.classes[0].class_id);

      // UPDATE CLASS LIST
      this.updateClassList(current_class_id);

      // RELOAD ROUTE
      this.reloadRoute(current_class_id);
    },

    // LOAD SUBJECT LIST BY CLASS ID
    loadSubjectListByClassID(class_id = null) {
      if (class_id) {
        this.getTeacherClasses.classes.map((item) => {
          if (Number(item.class_id) === class_id)
            this.setTeacherSubjects(item.subjects);
        });
      } else
        this.setTeacherSubjects(this.getTeacherClasses.classes[0].subjects);
    },

    // UPDATE CLASS LIST
    updateClassList(id) {
      let selected_class = this.getTeacherClasses.classes.find(
        (item) => Number(item.class_id) === id
      );

      let outside_class = this.getTeacherClasses.classes.filter(
        (item) => Number(item.class_id) !== id
      );

      this.final_class_state = this.class_list = [
        selected_class,
        ...outside_class,
      ];
    },

    // RELOAD ROUTE
    reloadRoute(id, fresh = false) {
      let subject_id = this.$route.query.subject_id;
      let term = this.$route.query.term;

      this.$router
        .push({
          name: this.$router.currentRoute.name,
          params: { id },
          query: fresh ? null : this.setupQuery(subject_id, term),
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") throw error;
        });
    },

    setupQuery(subject_id, term) {
      if (subject_id && term) return { subject_id, term };
      else if (subject_id) return { subject_id };
      else if (term) return { term };
      else null;
    },

    // UPDATED SELECTED CLASS LIST
    updatedSelectedClass(class_id) {
      this.updateClassList(class_id);
      this.loadSubjectListByClassID(class_id);
      this.reloadRoute(class_id, true);
    },

    // GET SHRINKED CLASS LIST
    getShrinkedClassList() {
      if (this.is_shrinked) {
        if (
          this.class_list.length > this.max_class_desktop &&
          window.innerWidth > 768
        ) {
          this.final_class_state = this.class_list.slice(
            0,
            this.max_class_desktop
          );
          return true;
        } else if (
          this.class_list.length > this.max_class_mobile &&
          window.innerWidth < 768
        ) {
          this.final_class_state = this.class_list.slice(
            0,
            this.max_class_mobile
          );
          return true;
        } else {
          this.final_class_state = this.class_list;
          return false;
        }
      } else {
        this.final_class_state = this.class_list;
        return false;
      }
    },

    toggleMoreClasses() {
      this.is_shrinked = !this.is_shrinked;
    },
  },
};
</script>

<style lang="scss" scoped>
.teacher-sidebar {
  .add-class {
    @include flex-row-between-nowrap;
    border-top: toRem(1) solid $border-grey;
    padding: toRem(16) toRem(15);

    @include breakpoint-down(sm) {
      padding: toRem(12) toRem(13);
    }

    @include breakpoint-down(xs) {
      padding: toRem(10) toRem(13);
    }

    .wrapper {
      @include flex-row-start-nowrap;
    }

    .avatar {
      @include square-shape(28);

      @include breakpoint-down(xs) {
        @include square-shape(24);
      }

      .icon {
        @include center-placement;
        font-size: toRem(13);
      }
    }

    .text {
      @include font-height(12.5, 18);

      @include breakpoint-down(lg) {
        @include font-height(13, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(12.5, 17);
      }

      &:hover {
        color: $brand-accent !important;
      }
    }
  }
}
</style>
