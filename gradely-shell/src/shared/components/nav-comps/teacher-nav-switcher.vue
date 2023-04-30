<template>
  <div
    class="nav-switcher rounded-20 brand-navy-bg smooth-transition pointer"
    @click="toggleSwitchClassModal"
    :title="selected_class.name"
  >
    <div class="icon-wrapper rounded-10 icon-one">
      <div class="icon brand-accent icon-graduation-cap"></div>
    </div>

    <!-- ITEM  -->
    <div class="item text-truncate">
      {{
        loading_class_name
          ? "Loading..."
          : selected_class.name || "No class selected"
      }}
    </div>

    <div class="icon-wrapper icon-two">
      <div class="icon brand-inverse icon-opposite-caret"></div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" mode="in-out" v-if="show_subject_modal">
        <select-subject-modal
          :class_id="class_id"
          :global_class_id="global_class_id"
          @reloadClasses="fetchTeacherClasses(true)"
          @switchClass="toggleSwitchClassModal"
          @closeTriggered="toggleSubjectModal"
        />
      </transition>

      <transition name="fade" v-if="show_switch_class_modal">
        <switch-teacher-class-modal
          :teacher_classes="class_list"
          @showAddClassModal="toggleAddClassModal"
          @closeTriggered="toggleSwitchClassModal"
        />
      </transition>

      <transition name="fade" v-if="show_add_class_modal">
        <teacher-add-class-modal @closeTriggered="toggleAddClassModal" />
      </transition>

      <transition name="fade" v-if="show_invite_school_modal">
        <invite-school-modal @closeTriggered="toggleInviteSchoolModal" />
      </transition>

      <transition name="fade" v-if="show_tour_modal">
        <teacher-start-tour-modal @closeTriggered="toggleTourModal" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "teacherNavSwitcher",

  components: {
    selectSubjectModal: () =>
      import(
        /* webpackChunkname: 'modal' */ "@/shared/modals/select-subject-modal"
      ),
    switchTeacherClassModal: () =>
      import(
        /* webpackChunkname: 'modal' */ "@/shared/modals/switch-teacher-class-modal"
      ),
    teacherAddClassModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/teacher-add-class-modal"
      ),
    inviteSchoolModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/invite-school-modal"
      ),
    teacherStartTourModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/feeds/teacher-start-tour-modal"
      ),
  },

  data: () => ({
    self_initiated_tour: false,
    show_tour_modal: false,
    tour_completed: true,
    tour_step: 0,

    loading_class_name: true,

    class_id: 0,
    global_class_id: 0,

    class_list: [],

    selected_class: {
      id: 1,
      name: "Join a class",
      class_code: "EEG",
      school_id: "216",
      subjects: [],
    },

    show_subject_modal: false,
    show_switch_class_modal: false,
    show_add_class_modal: false,
    show_invite_school_modal: false,
  }),

  watch: {
    $route: {
      handler() {
        this.fetchTeacherClasses();
      },
      immediate: true,
    },
  },

  created() {
    this.$bus.$on("showInviteModal", () => {
      this.show_add_class_modal = false;
      this.show_invite_school_modal = true;
    });

    this.$bus.$on("showSubjectModal", ({ class_id, global_class_id }) => {
      this.class_id = +class_id;
      this.global_class_id = +global_class_id;

      this.show_subject_modal = true;
      this.show_add_class_modal = false;
    });
  },

  methods: {
    ...mapActions({
      loadTeacherClasses: "general/getTeacherClassList",
      setTeacherSubjects: "general/setTeacherSubjectList",
      setSelectedClass: "general/setSelectedClass",
      getMembers: "dbMembers/getMembers",
      getMultipleFeatureLogs: "general/getMultipleFeatureLogs",
    }),

    toggleTourModal() {
      this.show_tour_modal = !this.show_tour_modal;
    },

    toggleAddClassModal() {
      this.show_switch_class_modal = false;
      this.show_add_class_modal = !this.show_add_class_modal;
    },

    toggleInviteSchoolModal() {
      this.show_invite_school_modal = !this.show_invite_school_modal;
    },

    toggleSubjectModal() {
      this.show_subject_modal = !this.show_subject_modal;
    },

    toggleSwitchClassModal() {
      this.show_subject_modal = false;
      this.show_switch_class_modal = !this.show_switch_class_modal;
    },

    // FETCH ALL TEACHER ASSIGNED CLASSES
    fetchTeacherClasses(reset = false) {
      this.loading_class_name = true;
      this.class_list = [];

      this.loadTeacherClasses(reset)
        .then((response) => {
          if (response.code === 200) {
            this.class_list = response.data.classes;
            this.getCurrentClassInfo();
          } else {
            this.pushAlert("No Class data was loaded!", "warning");
            this.loading_class_name = false;
          }
        })
        .catch(() => (this.loading_class_name = false));
    },

    // GET CURRENT SELECTED CLASS DETAILS AND UPDATE THE CLASS SUBJECTS
    getCurrentClassInfo() {
      let route_class_id = Number(this.$route.params.id);

      if (route_class_id) {
        let selected_class = this.class_list.find(
          (item) => Number(item.class_id) === route_class_id
        );

        this.selected_class.id = selected_class.class_id;
        this.selected_class.name = selected_class.class_name;
        this.selected_class.class_code = selected_class.class_code;
        this.selected_class.school_id = selected_class.school_id;
        this.selected_class.global_class_id = selected_class.global_class_id;
        this.selected_class.subjects = selected_class.subjects;

        this.class_id = +selected_class?.class_id;
        this.global_class_id = +selected_class?.global_class_id;

        this.setSelectedClass(this.selected_class);

        this.loadSubjectListByClassID(route_class_id);
        this.loading_class_name = false;

        // SEND CURRENT CLASS CODE TO UPCOMING BLOCK
        // this.$bus.$emit("loadCurrentCode", selected_class.class_code);
        sessionStorage.setItem("classCode", selected_class.class_code);

        // CHECK IF CLASS HAS SUBJECT
        this.checkSubjectList(selected_class);
      }
      // IF CLASS ID IS NOT VALID
      else {
        this.loadFirstClass(Number(this.class_list[0].class_id));
      }
    },

    checkSubjectList(selected_class) {
      let has_subject = selected_class.subjects.length;

      if (!has_subject) setTimeout(() => this.toggleSubjectModal(), 1700);
      // CHECK IF USER HAS SEEN TOUR
      else if (!this.$route.query.tour) this.checkUserTourFlow();
    },

    checkUserTourFlow() {
      this.getMultipleFeatureLogs(["tour_completed", "tour_step"]).then(
        (response) => {
          let [completed, step] = response.data;

          this.tour_completed = ["1", "true"].includes(completed.value)
            ? true
            : false;
          this.tour_step = step.value ? +step.value : 1;

          if (!this.tour_completed && this.tour_step === 1) {
            // CHECK STUDENT LENGTH IN CLASS
            this.getMembers({
              class_id: this.$route.params.id,
              account: this.getAuthType,
              type: "students",
            }).then((response) => {
              if (response.code === 200)
                if (response?.data?.length === 0 || response.data === null)
                  setTimeout(() => this.toggleTourModal(), 500);
                // EMPTY STATE
                else if (response.code === 204)
                  setTimeout(() => this.toggleTourModal(), 500);
            });
          }
        }
      );
    },

    // LOAD SUBJECT LIST BY CLASS ID
    loadSubjectListByClassID(class_id = null) {
      if (class_id) {
        this.class_list.map((item) => {
          if (Number(item.class_id) === class_id)
            this.setTeacherSubjects(item.subjects);
        });
      } else this.setTeacherSubjects(this.class_list[0].subjects);
    },

    // RELOAD THE ROUTE INTO THE FIRST CLASS
    loadFirstClass(id) {
      this.$router
        .push({
          name: this.$router.currentRoute.name,
          params: { id },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") throw error;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
