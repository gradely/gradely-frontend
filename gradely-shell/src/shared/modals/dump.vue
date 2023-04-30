<template>
  <div class="switch-child-dialog smooth-animation">
    <div class="gradely-container px-1 px-sm-3 px-md-4 px-xl-2 mx-auto">
      <div class="row position-relative">
        <!-- CLOSE DIALOG -->
        <div
          class="
            close-dialog
            rounded-20
            overflow-hidden
            smooth-transition
            pointer
          "
          title="Close dialog"
          @click="closeModal"
        >
          <div class="position-relative w-100 h-100">
            <div class="icon icon-close"></div>
          </div>
        </div>

        <!-- CONTENT AREA  -->
        <div class="content-area">
          <!-- CONTENT TOP -->
          <div class="content-top">
            <div class="title-text brand-navy font-weight-700 text-center">
              My Classes
            </div>

            <div class="meta-text color-ash text-center" v-if="false">
              Add, remove or switch your classes!
            </div>
          </div>

          <!-- CONTENT BOTTOM -->
          <div class="content-bottom mgb-20">
            <!-- ADD CHILD CARD -->
            <div
              @click="toggleAddClassModal"
              class="
                add-child-card
                smooth-transition
                overflow-hidden
                rounded-15
                pointer
              "
            >
              <!-- ADD CARD -->
              <div class="add-card smooth-transition mgb-17">
                <div class="icon icon-plus color-grey-dark"></div>
              </div>

              <!-- ADD TEXT -->
              <div class="add-text text-center font-weight-700 brand-navy">
                Add another class
              </div>
            </div>

            <!-- CLASSES SELECT -->
            <template v-if="classes.length">
              <class-select-card
                v-for="(_class, index) in classes"
                :key="index"
                :class_item="_class"
                @classSelected="makeSelection($event)"
              />
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_add_class_modal">
        <teacher-add-class-modal @closeTriggered="toggleAddClassModal" />
      </transition>

      <transition name="fade" v-if="show_invite_school_modal">
        <invite-school-modal @closeTriggered="toggleInviteSchoolModal" />
      </transition>

      <transition name="fade" mode="in-out" v-if="show_subject_modal">
        <select-subject-modal
          :class_id="class_id"
          :global_class_id="global_class_id"
          @closeTriggered="toggleSubjectModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import classSelectCard from "@/shared/components/class-select-card";

export default {
  name: "switchteacherClassModal",

  components: {
    classSelectCard,
    teacherAddClassModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/teacher-add-class-modal"
      ),
    inviteSchoolModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/invite-school-modal"
      ),
    selectSubjectModal: () =>
      import(
        /* webpackChunknAME: 'modal' */ "@/shared/modals/select-subject-modal"
      ),
  },

  data: () => ({
    classes: [],

    class_id: 0,
    global_class_id: 0,

    show_add_class_modal: false,
    show_invite_school_modal: false,
    show_subject_modal: false,
  }),

  mounted() {
    this.fetchTeacherClasses();
  },

  created() {
    this.$bus.$on("showInviteModal", () => {
      this.show_invite_school_modal = true;
      this.show_add_class_modal = false;
    });

    this.$bus.$on("showSubjectModal", ({ class_id, global_class_id }) => {
      this.class_id = class_id;
      this.global_class_id = global_class_id;

      this.show_subject_modal = true;
      this.show_add_class_modal = false;
    });
  },

  methods: {
    ...mapActions({ loadTeacherClasses: "general/getTeacherClassList" }),

    toggleAddClassModal() {
      this.show_add_class_modal = !this.show_add_class_modal;
    },

    toggleInviteSchoolModal() {
      this.show_invite_school_modal = !this.show_invite_school_modal;
    },

    toggleSubjectModal() {
      this.show_subject_modal = !this.show_subject_modal;
    },

    // FETCH ALL TEACHER ASSIGNED CLASSES
    fetchTeacherClasses() {
      this.classes = [];

      this.loadTeacherClasses().then((response) => {
        if (response.code === 200) this.classes = response.data.classes;
        else this.pushAlert("No Class data was loaded!", "warning");
      });
    },

    makeSelection(id) {
      this.$router
        .push({
          name: this.$router.currentRoute.name,
          params: { id },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") throw error;
        });
      this.$emit("closeTriggered");
    },

    closeModal() {
      this.$router.replace({
        name: "GradelyFeeds",
        params: { id: this.$route.params.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.switch-child-dialog {
  background: rgba($white-text, 0.99);
  @include fixed-display-area;
  @include transition(0.5s);
  overflow: auto !important;
  z-index: 2500;

  .close-dialog {
    position: absolute;
    top: toRem(50);
    right: toRem(50);
    background: $color-white;
    @include square-shape(42);

    @include breakpoint-down(lg) {
      @include square-shape(38);
    }

    @include breakpoint-down(md) {
      top: toRem(40);
      right: toRem(30);
    }

    @include breakpoint-custom-down(sm) {
      top: toRem(12);
      right: toRem(20);
    }

    .icon {
      @include center-placement;
      font-size: toRem(20);
      color: $brand-navy;

      @include breakpoint-down(lg) {
        font-size: toRem(18);
      }

      @include breakpoint-custom-down(380) {
        font-size: toRem(15);
      }
    }

    &:hover {
      background: $brand-accent-light;
    }
  }

  .content-area {
    position: relative;
    top: calc(13.5vh);

    @include breakpoint-down(lg) {
      top: calc(13vh);
    }

    @include breakpoint-down(md) {
      top: calc(12.5vh);
    }

    @include breakpoint-down(sm) {
      top: calc(6.25vh);
    }

    .content-top {
      @include flex-column-start-center;
      margin-bottom: toRem(50);

      @include breakpoint-down(lg) {
        margin-bottom: toRem(45);
      }

      @include breakpoint-down(md) {
        margin-bottom: toRem(40);
      }

      @include breakpoint-down(sm) {
        @include flex-row-start-nowrap;
        margin-bottom: toRem(35);
      }

      @include breakpoint-down(xs) {
        margin-bottom: toRem(20);
      }

      .title-text {
        @include font-height(26, 36);

        @include breakpoint-down(lg) {
          @include font-height(24, 34);
        }

        @include breakpoint-down(md) {
          @include font-height(22, 32);
        }

        @include breakpoint-down(sm) {
          padding-left: toRem(15);
        }

        @include breakpoint-down(xs) {
          @include font-height(18, 25);
        }
      }

      .meta-text {
        @include font-height(13.75, 22);
        margin-top: toRem(8);

        @include breakpoint-down(lg) {
          @include font-height(12.75, 21);
        }

        @include breakpoint-down(md) {
          @include font-height(12.5, 19);
        }
      }
    }

    .content-bottom {
      @include flex-row-center-wrap;
      align-items: flex-start;

      .add-child-card {
        @include rectangle-shape(240, 210);
        @include flex-column-center;
        background: transparent;
        margin: toRem(8);

        @include breakpoint-down(md) {
          @include rectangle-shape(200, 170);
          margin: toRem(6.5);
        }

        @include breakpoint-down(sm) {
          @include rectangle-shape(0, 0);
          @include flex-row-start-nowrap;
          margin: 0 toRem(5) toRem(10);
          padding: toRem(10);
          height: auto;
          width: 100%;
        }

        .add-card {
          border: toRem(1) dashed $border-grey-dark;
          @include square-shape(100);
          border-radius: toRem(25);
          background: $color-white;
          position: relative;

          @include breakpoint-down(md) {
            @include square-shape(80);
            border-radius: toRem(20);
          }

          @include breakpoint-down(sm) {
            @include square-shape(55);
            border-radius: toRem(12);
            margin-bottom: 0 !important;
            margin-right: toRem(15);
          }

          &:hover {
            background: rgba($brand-accent-light, 0.75);
          }

          .icon {
            @include center-placement;
            font-size: toRem(50);

            @include breakpoint-down(md) {
              font-size: toRem(40);
            }

            @include breakpoint-down(xs) {
              font-size: toRem(24);
            }
          }
        }

        .add-text {
          @include font-height(13.75, 19);

          @include breakpoint-down(md) {
            @include font-height(12, 18);
          }

          @include breakpoint-down(sm) {
            @include font-height(13.5, 18);
          }
        }
      }
    }
  }
}
</style>
