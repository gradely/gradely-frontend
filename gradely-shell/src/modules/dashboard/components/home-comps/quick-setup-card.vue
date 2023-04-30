<template>
  <div class="position-relative">
    <div
      class="quick-setup-card rounded-10 pointer smooth-transition"
      @click="openChecklistState"
      v-if="show_setup_card"
    >
      <!-- LEFT SECTION  -->
      <div class="info-section">
        <div class="icon icon-question-hexagon brand-inverse"></div>

        <div>
          <div class="text-title brand-inverse-light font-weight-600">
            {{ checklist_state.value || "Completed" }}
          </div>
          <div class="text-meta border-grey">
            {{ checklist_count }} of {{ checklist_count_total }} completed
          </div>
        </div>
      </div>

      <!-- RIGHT SECTION  -->
      <div class="icon icon-caret-right"></div>
    </div>

    <!-- TOUR DESCRIPTION TEXT -->
    <div
      class="
        tour-description
        white-text-bg
        rounded-5
        position-absolute
        h-auto
        smooth-animation
      "
      v-if="show_tour_description"
    >
      <!-- TOUR TEXT -->
      <div class="tour-text color-text">
        Let’s start by adding some teachers to your school.
      </div>

      <!-- TOUR CTA -->
      <div class="tour-cta">
        <button
          class="btn transparent-bg no-shadow color-text ignore"
          @click="skipTour"
        >
          Skip
        </button>

        <button
          @click="toggleInviteTeachers"
          class="btn modal-btn btn-accent ignore"
        >
          Invite Teachers
        </button>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_invite_teacher_modal">
        <invite-teachers-modal
          @toggleClass="toggleClassModal"
          @closeTriggered="toggleInviteTeachers"
        />
      </transition>

      <transition name="fade" v-if="show_class_modal">
        <class-selection-modal @closeTriggered="toggleClassModal" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "quickSetupCard",

  components: {
    inviteTeachersModal: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/invite-teachers-modal"
      ),
    classSelectionModal: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/class-selection-modal"
      ),
  },

  computed: {
    ...mapGetters({ getTour: "general/getTour" }),
  },

  watch: {
    getTour: {
      handler(value) {
        if (
          value.step === 2 &&
          value.step_progress === "ongoing" &&
          !value.completed_tour
        ) {
          this.checklist_state = this.checklist[0];
          this.show_setup_card = true;

          setTimeout(() => (this.show_tour_description = true), 2000);
        } else this.show_tour_description = false;
      },
      deep: true,
    },
  },

  data: () => ({
    show_tour_description: false,
    show_invite_teacher_modal: false,
    show_class_modal: false,

    show_setup_card: false,
    checklist_state: {
      key: "",
      value: "Setup your School",
      type: "",
      link: "",
    },
    checklist_count: 0,
    checklist_count_total: 5,

    checklist: [
      { key: "teachers", value: "Add your Teachers", type: "modal" },
      {
        key: "upgrade_profile",
        value: "Update school profile",
        type: "url",
        link: "/app/school/settings",
      },
      {
        key: "gradely_apps",
        value: "Install school apps",
        type: "url",
        link: "/store-apps",
      },
      {
        key: "admin",
        value: "Invite school administrators",
        type: "url",
        link: "/app/school/settings/preferences/users",
      },
      // { key: "set_curriculum", value: "Configure curriculum", link: "" },
    ],
  }),

  created() {
    this.$bus.$on("reload_checklist", this.getChecklist());
  },

  mounted() {
    this.getChecklist();
  },

  methods: {
    ...mapActions({
      loadSchoolChecklist: "dbHome/loadSchoolChecklist",
      updateTour: "general/updateTour",
    }),

    skipTour() {
      setTimeout(() => this.updateTour("ongoing"), 700);
    },

    getChecklist() {
      this.loadSchoolChecklist()
        .then((response) => {
          if (response.code === 200) {
            let resolved_data = [];

            for (let item in response.data)
              if (item !== "set_curriculum")
                resolved_data.push({
                  key: item,
                  value: response.data[item],
                });

            this.checklist_count_total = resolved_data.length;
            this.checklist_count = resolved_data
              .reverse()
              .filter((item) => item.value).length;

            let teacher = resolved_data.find((item) => item.key === "teachers");

            let exist = resolved_data.find((item) => item.value === false);
            this.checklist_state = this.checklist.find((item) => {
              return !teacher.value
                ? item?.key === "teachers"
                : item?.key === exist?.key;
            });

            this.show_setup_card =
              this.checklist_count === this.checklist_count_total
                ? false
                : true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    openChecklistState() {
      this.checklist_state.type === "url"
        ? (location.href = this.checklist_state.link)
        : this.toggleInviteTeachers();
    },

    toggleInviteTeachers() {
      this.show_invite_teacher_modal = !this.show_invite_teacher_modal;
    },

    toggleClassModal() {
      this.show_class_modal = !this.show_class_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.quick-setup-card {
  position: relative;
  @include flex-row-between-nowrap;
  background: rgba(0, 0, 0, 0.4);
  margin-top: toRem(25);
  padding: toRem(16) toRem(14);

  @include breakpoint-down(lg) {
    padding: toRem(15) toRem(14);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  .info-section {
    @include flex-row-start-nowrap;
    align-items: flex-start;

    .icon {
      font-size: toRem(24);
      margin-right: toRem(12);

      @include breakpoint-down(lg) {
        margin-right: toRem(10);
      }

      @include breakpoint-down(sm) {
        font-size: toRem(22);
      }
    }

    .text-title {
      @include font-height(12.75, 19);
      margin-bottom: toRem(5);

      @include breakpoint-down(xs) {
        @include font-height(12, 17);
      }
    }

    .text-meta {
      @include font-height(11.25, 16);
      margin-top: toRem(3);

      @include breakpoint-down(lg) {
        @include font-height(11, 15);
      }

      @include breakpoint-down(sm) {
        @include font-height(10.5, 15);
      }

      @include breakpoint-down(xs) {
        @include font-height(10.25, 14);
      }
    }
  }

  .icon {
    color: rgba(245, 245, 245, 0.5);
    font-size: toRem(13);

    @include breakpoint-down(lg) {
      font-size: toRem(12);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(11);
    }
  }
}

.tour-description {
  top: toRem(70);

  @include breakpoint-down(sm) {
    top: toRem(55);
  }
}
</style>