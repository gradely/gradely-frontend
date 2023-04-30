<template>
  <div :class="show_tour_cover && isFirstClass ? 'tour-index' : null">
    <div
      class="school-class-arm white-text-bg rounded-5 mgb-10 pointer"
      :class="card_style"
      @click="goToClassFeed"
    >
      <!-- CLASS LABEL  -->
      <div
        class="class-label position-absolute w-100 top-0 rounded-top-5"
        :class="$color.generateRandomColors()"
      ></div>

      <!-- TOP ROW  -->
      <div class="top-row position-relative">
        <div class="class-year color-text font-weight-600">
          {{ class_detail.class_name }}
        </div>

        <!-- OPTIONS  -->
        <div
          class="avatar rounded-7 pointer smooth-transition ignore"
          @click="toggleDropdown"
          v-on-clickaway="forceClose"
        >
          <div class="icon icon-ellipsis-h color-grey-dark ignore"></div>
        </div>

        <div
          class="dropdown smooth-transition smooth-animation ignore"
          v-if="show_dropdown"
        >
          <div
            class="item ignore"
            v-if="!profile_type"
            @click="toggleEditModal"
          >
            <div class="icon-cover ignore">
              <div class="icon icon-edit-pen ignore"></div>
            </div>
            <div class="ignore">Edit Info</div>
          </div>

          <router-link
            v-if="!profile_type"
            :to="{ name: 'GradelyFeeds', params: { id: class_detail.id } }"
            class="item ignore"
          >
            <div class="icon-cover ignore">
              <div class="icon icon-eye ignore"></div>
            </div>
            <div class="ignore">View Feeds</div>
          </router-link>

          <template v-if="!profile_type">
            <div
              class="item ignore"
              @click="toggleDeleteModal"
              v-if="class_detail.can_delete == 1"
            >
              <div class="icon-cover ignore">
                <div class="icon icon-trash ignore"></div>
              </div>
              <div class="ignore">Delete Class</div>
            </div>
          </template>

          <div
            class="item ignore"
            v-if="profile_type"
            @click="toggleSelectSubject"
          >
            <div class="icon-cover ignore">
              <div class="icon ignore"></div>
            </div>
            <div class="ignore">Assign Subject</div>
          </div>

          <div
            class="item ignore"
            v-if="profile_type"
            @click="toggleRemoveTeacher"
          >
            <div class="icon-cover ignore">
              <div class="icon ignore"></div>
            </div>
            <div class="ignore">Remove from class</div>
          </div>
        </div>
      </div>

      <!-- TEACHER CLASSES  -->
      <div
        class="teacher-classes position-relative color-ash ignore"
        v-if="profile_type"
      >
        <div class="text mgr-5 ignore">Teaches</div>
        <div
          class="subject-count position-relative pointer link-underline ignore"
        >
          {{ class_detail.subjects.length }}
          {{ class_detail.subjects.length === 1 ? " Subject" : " Subjects" }}

          <!-- HINT DROPDOWN  -->
          <div
            class="hint-dropdown box-shadow-effect smooth-animation ignore"
            v-if="class_detail.subjects.length"
          >
            <div class="wrapper ignore">
              <div
                class="item ignore"
                v-for="(subject, index) in class_detail.subjects"
                :key="index"
              >
                {{ subject.name }};
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MIDDLE ROW  -->
      <div class="middle-row rounded-5 smooth-transition pointer ignore" v-else>
        <div class="class-code color-text ignore">
          Class Code:
          <span class="font-weight-600 ignore">{{
            class_detail.class_code
          }}</span>
        </div>

        <div
          class="
            copy-class-code
            w-100
            h-100
            brand-accent-light-bg brand-navy
            smooth-transition
            rounded-5
            ignore
          "
          @click="copyClassCode"
        >
          <input
            type="text"
            ref="classCode"
            :value="class_detail.class_code"
            class="position-absolute index--9 ignore"
            style="opacity: 0"
          />
          <div class="icon-copy mgr-5 ignore"></div>
          <div class="copy-text ignore">COPY CLASS CODE</div>
        </div>
      </div>

      <!-- BOTTOM ROW  -->
      <div class="bottom-row position-absolute ignore">
        <!-- CALL OUT ICON LINK -->
        <router-link
          :to="{ name: 'GradelyFeeds', params: { id: class_detail.id } }"
          class="hint--primary hint--rounded hint--top-right ignore"
          aria-label="Feed"
        >
          <span
            class="branch-icon gfont-20 color-grey-light icon-callout ignore"
          ></span>
        </router-link>

        <!-- LIBRARY ICON LINK -->
        <router-link
          :to="{
            name: 'GradelyAssessmentPublished',
            params: { id: class_detail.id },
          }"
          class="hint--primary hint--rounded hint--top ignore"
          aria-label="Assessments"
        >
          <span
            class="branch-icon gfont-20 color-grey-light icon-library ignore"
          ></span>
        </router-link>

        <!-- PIE CHART ICON LINK -->
        <router-link
          :to="{
            name: 'GradelySchoolReport',
            params: { id: class_detail.id },
          }"
          class="hint--primary hint--rounded hint--top-left ignore"
          aria-label="Reports"
        >
          <span
            class="branch-icon gfont-20 color-grey-light icon-pie-chart ignore"
          ></span>
        </router-link>
      </div>

      <!-- TOUR DESCRIPTION TEXT -->
      <div
        class="
          tour-description
          white-text-bg
          rounded-5
          position-absolute
          smooth-animation
          h-auto
        "
        v-if="show_tooltip"
      >
        <!-- TOUR TEXT -->
        <div class="tour-text color-text">
          The class is where everything happens. Click here to view a class
        </div>

        <!-- TOUR CTA -->
        <div class="tour-cta">
          <button
            class="btn transparent-bg no-shadow color-text ignore invisible"
            @click="dismissTour"
          >
            S
          </button>

          <button
            @click="updateTourAndRedirect"
            class="btn modal-btn btn-accent ignore"
          >
            View Class
          </button>
        </div>
      </div>

      <!-- MODALS -->
      <portal to="gradely-modals">
        <transition name="fade" v-if="show_edit_modal">
          <update-class-arm-modal
            :class_arm_name="class_detail.class_name"
            :class_id="class_detail.id"
            :class_level="class_level"
            @closeTriggered="toggleEditModal"
          />
        </transition>

        <transition name="fade" v-if="show_delete_modal">
          <delete-class-arm-modal
            :class_arm_name="class_detail.class_name"
            :class_id="Number(class_detail.id)"
            @closeTriggered="toggleDeleteModal"
          />
        </transition>

        <transition name="fade" v-if="show_remove_teacher_modal">
          <remove-teacher-modal
            :teacher="teacher"
            :class_id="Number(class_detail.id)"
            @closeTriggered="toggleRemoveTeacher"
          />
        </transition>

        <transition name="fade" v-if="show_select_subject_modal">
          <select-subject-modal
            :teacher_id="Number(teacher.id)"
            :class_id="Number(class_detail.id)"
            :global_class_id="Number(class_detail.global_class_id)"
            :assigned_subject="class_detail.subjects"
            @closeTriggered="toggleSelectSubject"
          />
        </transition>

        <transition name="fade" v-if="show_tour_cover">
          <tour-cover />
        </transition>
      </portal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "schoolClassArm",

  components: {
    updateClassArmModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/update-class-arm-modal"
      ),
    deleteClassArmModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/delete-class-arm-modal"
      ),
    removeTeacherModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/members/remove-teacher-modal"
      ),
    selectSubjectModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/select-subject-modal"
      ),
    tourCover: () =>
      import(/* webpackChunkName: "modal" */ "@/shared/components/tour-cover"),
  },

  props: {
    card_style: String,
    class_level_index: Number,
    class_arm_index: Number,

    profile_type: {
      type: Boolean,
      default: false,
    },

    class_level: {
      type: String,
      default: "Primary 1",
    },

    class_detail: {
      type: Object,
      default: () => ({
        id: 1,
        class_name: "Primary 1 - Gold",
        class_code: "PRI-1-GOLD",
        can_delete: 1,
        subjects: [],
      }),
    },

    teacher: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters({ getTour: "general/getTour" }),

    isFirstClass() {
      return this.class_level_index === 0 && this.class_arm_index === 0
        ? true
        : false;
    },
  },

  watch: {
    getTour: {
      handler(value) {
        if (
          value.step === 3 &&
          value.step_progress === "ongoing" &&
          !value.completed_tour
        ) {
          this.show_tour_cover = true;
          window.innerWidth <= 768
            ? window.scrollTo(0, 465)
            : window.scrollTo(0, 260);
        } else this.show_tour_cover = false;
      },
      deep: true,
    },

    show_tour_cover: {
      handler(value) {
        if (this.isFirstClass && value)
          setTimeout(() => (this.show_tooltip = true), 2000);
        else this.show_tooltip = false;
      },
      immediate: true,
    },
  },

  data: () => ({
    show_dropdown: false,
    show_edit_modal: false,
    show_delete_modal: false,
    show_remove_teacher_modal: false,
    show_select_subject_modal: false,

    show_tour_cover: false,
    show_tooltip: false,
  }),

  methods: {
    ...mapActions({ updateTour: "general/updateTour" }),

    copyClassCode() {
      let code_input = this.$refs.classCode;
      code_input.select();
      code_input.setSelectionRange(0, 99999); /*For mobile devices*/
      document.execCommand("copy");

      this.pushAlert("Class code copied successfully", "success");
    },

    goToClassFeed($event) {
      if (
        !$event.target.classList.contains("ignore") &&
        this.$route.name === "DashboardHome"
      ) {
        this.$router.push({
          name: "GradelyFeeds",
          params: {
            id: this.class_detail.id,
          },
          query: this.show_tour_cover
            ? {
                tour: this.$string.encodeString(4),
              }
            : null,
        });
      }
    },

    updateTourAndRedirect() {
      this.updateTour("ongoing");

      setTimeout(() => {
        this.$router.push({
          name: "GradelyFeeds",
          params: { id: this.class_detail.id },
          query: { tour: this.$string.encodeString(4) },
        });
      }, 700);
    },

    dismissTour() {
      this.updateTour("ongoing");
      setTimeout(() => (this.show_tour_cover = false), 1000);
    },

    toggleEditModal() {
      this.show_edit_modal = !this.show_edit_modal;
    },

    toggleDeleteModal() {
      this.show_delete_modal = !this.show_delete_modal;
    },

    toggleRemoveTeacher() {
      this.show_remove_teacher_modal = !this.show_remove_teacher_modal;
    },

    toggleSelectSubject() {
      this.show_select_subject_modal = !this.show_select_subject_modal;
    },

    toggleDropdown() {
      this.show_dropdown = !this.show_dropdown;
    },

    forceClose() {
      this.show_dropdown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.school-class-arm {
  position: relative;
  @include rectangle-shape(210, 165);
  margin-right: toRem(8);
  padding: toRem(15) toRem(13);
  box-shadow: 0 0 toRem(4) rgba(0, 0, 0, 0.15);

  @include breakpoint-down(lg) {
    @include rectangle-shape(180, 150);
    padding: toRem(12) toRem(10);
  }

  .class-label {
    left: 0;
    height: toRem(4);

    @include breakpoint-down(xs) {
      height: toRem(3);
    }
  }

  .top-row {
    @include flex-row-between-nowrap;
    align-items: flex-start;
    margin-bottom: toRem(7);

    .class-year {
      @include font-height(12.75, 17);
      padding-top: toRem(1.5);

      @include breakpoint-down(xs) {
        @include font-height(11.25, 16);
      }
    }

    .avatar {
      background: rgba($border-grey-light, 0.2);
      @include square-shape(30);
      background: $color-white;
      margin-left: toRem(5);

      @include breakpoint-down(lg) {
        @include square-shape(28);
      }

      &:hover {
        background: rgba($brand-inverse-light, 0.7);
      }

      .icon {
        font-size: toRem(21);
        @include center-placement;
      }
    }

    .dropdown {
      width: 75%;
      top: toRem(32);
      right: toRem(-8);
    }
  }

  .teacher-classes {
    @include flex-row-start-nowrap;
    @include font-height(12.5, 17);
    margin-top: toRem(10);

    @include breakpoint-down(sm) {
      @include font-height(12, 16);
    }

    .subject-count {
      .hint-dropdown {
        left: toRem(-30);

        @include breakpoint-down(sm) {
          &::after {
            left: 25%;
          }
        }

        .wrapper {
          @include flex-row-start-wrap;

          .item {
            margin-right: toRem(3);
          }
        }
      }

      &:hover {
        .hint-dropdown {
          display: unset;
        }
      }
    }
  }

  .middle-row {
    padding: toRem(7) toRem(9);
    margin-top: toRem(7);
    position: relative;
    background: #eee;

    @include breakpoint-down(lg) {
      margin-top: 6px;
      padding: toRem(6) toRem(9);
    }

    @include breakpoint-down(xs) {
      margin-top: 8px;
      padding: toRem(8) toRem(9);
    }

    .class-code {
      @include font-height(12.5, 18);

      @include breakpoint-down(lg) {
        @include font-height(12, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(11, 16);
      }
    }

    .copy-class-code {
      position: absolute;
      padding: toRem(5) toRem(9);
      @include flex-row-center-nowrap;
      font-weight: 600;
      top: 0;
      left: 0;
      opacity: 0;

      .copy-text {
        @include font-height(10.5, 16);

        @include breakpoint-down(xs) {
          @include font-height(10.25, 15);
        }
      }
    }

    &:hover {
      .copy-class-code {
        opacity: 1;
      }
    }
  }

  .bottom-row {
    @include flex-row-between-nowrap;
    bottom: toRem(15);
    width: 86.5%;
    padding: 0 toRem(12);

    .branch-icon {
      @include transition(0.3s);
      font-size: toRem(20) !important;

      @include breakpoint-down(lg) {
        font-size: toRem(18) !important;
      }

      @include breakpoint-down(xs) {
        font-size: toRem(17) !important;
      }

      &:hover {
        color: $brand-accent !important;
      }
    }
  }
}

.tour-description {
  left: toRem(25);
  top: toRem(55);

  @include breakpoint-down(sm) {
    width: toRem(250);
    left: toRem(15);
    top: toRem(45);
  }

  .tour-text {
    @include font-height(11.75, 20);
    margin-bottom: toRem(22);

    @include breakpoint-down(xs) {
      @include font-height(11.5, 19);
    }
  }

  .tour-cta {
    @include flex-row-end-nowrap;

    .btn {
      font-size: toRem(10.5);

      @include breakpoint-down(xs) {
        font-size: toRem(10.25);
      }
    }
  }
}

.tour-index {
  z-index: 3000;
}
</style>
