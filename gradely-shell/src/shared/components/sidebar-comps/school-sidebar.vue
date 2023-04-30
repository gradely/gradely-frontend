<template>
  <div class="school-sidebar rounded-5 white-text-bg h-auto position-relative">
    <!-- LABEL  -->
    <div
      class="label brand-accent-bg w-100 position-absolute top-0 rounded-top-5"
    ></div>

    <!-- TOP ROW  -->
    <div class="top-row pointer" @click="toggleClassModal">
      <!-- LEFT  -->
      <div class="left">
        <div class="avatar brand-inverse-light-bg">
          <div class="icon icon-swap brand-primary"></div>
        </div>

        <div class="info w-75">
          <!-- LOADING STATE  -->
          <template v-if="loading_class_name">
            <div class="block-one rounded-5 skeleton-loader mgb-5"></div>
            <div class="block-two rounded-5 skeleton-loader"></div>
          </template>

          <template v-else>
            <div class="title-text color-text font-weight-600 mgb-2">
              {{ selected_class.name }}
            </div>
            <div class="meta-text color-grey-dark">SwitchClass</div>
          </template>
        </div>
      </div>

      <!-- RIGHT  -->
      <div class="right">
        <div class="avatar smooth-transition border-border-grey-light">
          <div class="icon icon-caret-down color-grey-dark"></div>
        </div>
      </div>
    </div>

    <!-- BOTTOM ROW  -->
    <div class="bottom-row mgt-25">
      <div class="title-text font-weight-700 color-grey-dark mgb-11">
        ASSIGNED TEACHERS
      </div>

      <!-- TEACHER ROW  -->
      <template v-if="teacher_list.length">
        <div class="teacher-row">
          <router-link
            :to="{
              name: 'TeacherProfile',
              params: { teacher_id: teacher.id },
              query: { name: teacher.full_name },
            }"
            class="avatar rounded-5"
            v-for="(teacher, index) in teacher_list"
            :key="index"
          >
            <img
              v-lazy="teacher.image"
              alt=""
              class="avatar-img"
              v-if="teacher.image"
            />

            <div
              class="avatar-text white-text"
              v-else
              :class="$color.getProfileBgColor(teacher.full_name)"
            >
              {{ $string.getStringInitials(teacher.full_name) }}
            </div>
          </router-link>

          <!-- ADD TEACHER CARD  -->
          <div
            class="avatar rounded-5 add-card smooth-transition pointer"
            title="Assign Teacher"
            @click="toggleAssignTeacher"
          >
            <div
              class="icon icon-plus color-grey-light smooth-transition"
            ></div>
          </div>
        </div>
      </template>

      <!-- EMPTY TEACHER LIST  -->
      <template v-else>
        <div class="empty-teacher-block">
          <div class="top">
            <div class="avatar border-grey-light-bg">
              <div class="icon icon-teacher border-grey-dark"></div>
            </div>

            <div class="text color-ash">
              No teacher has been assigned to this class yet.
            </div>
          </div>

          <!-- INVITE ROW  -->
          <div class="bottom" @click="toggleAssignTeacher">
            <div class="avatar">
              <div class="icon icon-plus"></div>
            </div>

            <div class="text">ASSIGN TEACHER</div>
          </div>
        </div>
      </template>

      <!-- CLASS CODE SECTION  -->
      <div class="class-code-section" v-if="selected_class.code">
        <div class="intro-text color-grey-dark">
          Share this code with anyone you wish to add to the class
        </div>

        <!-- CLASS CODE  -->
        <div class="class-code rounded-3 color-white-bg">
          <span class="text color-grey-dark mgr-10">Class Code:</span>
          <span class="value font-weight-700 brand-navy">{{
            selected_class.code
          }}</span>

          <input
            type="text"
            ref="classCode"
            :value="selected_class.code"
            class="position-absolute index--9"
            style="opacity: 0"
          />

          <span
            class="icon icon-copy mgl-5 brand-primary"
            title="Copy class code"
            @click="copyClassCode"
          ></span>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_class_modal">
        <switch-school-classes-modal
          :school_classes="class_list"
          @closeTriggered="toggleClassModal"
        />
      </transition>

      <transition name="fade" v-if="show_assign_teacher_modal">
        <assign-teacher-class-modal
          @closeTriggered="toggleAssignTeacher"
          @inviteTeacher="toggleTeacherInvite"
        />
      </transition>

      <transition name="fade" v-if="show_invite_teacher_modal">
        <invite-teachers-modal @closeTriggered="toggleTeacherInvite" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "schoolSidebar",

  components: {
    switchSchoolClassesModal: () =>
      import(
        /* webpackChunkName: "switchClassesModal" */ "@/shared/modals/switch-school-classes-modal"
      ),
    assignTeacherClassModal: () =>
      import(
        /* webpackChunkName: "assignTeacherClassModal" */ "@/modules/base/modals/members/assign-teacher-class-modal"
      ),
    inviteTeachersModal: () =>
      import(
        /* webpackChunkName: "inviteTeachersModal" */ "@/modules/dashboard/modals/invite-teachers-modal"
      ),
  },

  watch: {
    $route: {
      handler(value) {
        value.params.id !== this.selected_class.id
          ? value.params.id
            ? this.getSingleClassInfo(value.params.id)
            : this.selectFirstClass()
          : null;
      },
    },
  },

  data: () => ({
    show_class_modal: false,
    show_invite_teacher_modal: false,
    show_assign_teacher_modal: false,

    loading_class_name: false,

    class_list: [],
    teacher_list: [],
    selected_class: {
      id: 1,
      name: "No class selected",
      code: "",
    },
  }),

  mounted() {
    this.fetchSchoolClasses();
  },

  methods: {
    ...mapActions({
      getSchoolClasses: "dbHome/getSchoolClasses",
      getClassDetail: "general/getClassDetail",
      getTeachersInClass: "general/getTeachersInClass",
    }),

    toggleClassModal() {
      this.show_class_modal = !this.show_class_modal;
    },

    // FETCH ALL SCHOOL CLASSES
    fetchSchoolClasses() {
      this.class_list = [];

      this.getSchoolClasses()
        .then((response) => {
          response.data.map((class_level) =>
            class_level.classes.map((arm) => {
              let class_arm = {};
              class_arm.id = arm.id;
              class_arm.class_name = arm.class_name;
              class_arm.class_code = arm.class_code;

              this.class_list.push(class_arm);
            })
          );

          // GET SINGLE CLASS INFO
          this.getSingleClassInfo(this.$route.params.id);
        })
        .catch(() =>
          this.$bus.$emit("show_response_alert", {
            message: "An error occured while loading class data",
            type: "error",
          })
        );
    },

    // GET SINGLE CLASS DETAIL
    getSingleClassInfo(class_id) {
      this.loading_class_name = true;

      this.getClassDetail(class_id)
        .then((response) => {
          if (response.code === 200) {
            this.selected_class.id = response.data.id;
            this.selected_class.name = response.data.class_name;
            this.selected_class.code = response.data.class_code;

            this.loading_class_name = false;
            this.fetchCurrentClassTeacher();
          }
          // INVALID CLASS ID ON ROUTE
          else if (response.code === 204 || response.code === 404)
            this.selectFirstClass();
        })
        .catch(() => {
          this.$bus.$emit("show_response_alert", {
            message: "An error occured while loading class info data",
            type: "error",
          });

          this.loading_class_name = false;
        });
    },

    // SELECT FIRST CLASS ON LIST AS SELECTED CLASS
    selectFirstClass() {
      this.$router
        .push({
          name: this.$router.currentRoute.name,
          params: { id: this.class_list[0].id },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") throw error;
        });
    },

    // FETCH ALL CURRENT CLASS TEACHERS
    fetchCurrentClassTeacher() {
      this.getTeachersInClass(this.$route.params.id)
        .then((response) => {
          this.teacher_list = response.code === 200 ? response.data : [];
        })
        .catch(() =>
          this.$bus.$emit("show_response_alert", {
            message: "An error occured while loading class teachers data",
            type: "error",
          })
        );
    },

    copyClassCode() {
      let code_input = this.$refs.classCode;
      code_input.select();
      code_input.setSelectionRange(0, 99999); /*For mobile devices*/
      document.execCommand("copy");

      this.$bus.$emit("show_response_alert", {
        message: "Class code copied successfully",
        type: "success",
      });
    },

    toggleAssignTeacher() {
      this.show_assign_teacher_modal = !this.show_assign_teacher_modal;
    },

    toggleTeacherInvite() {
      this.show_assign_teacher_modal = false;
      this.show_invite_teacher_modal = !this.show_invite_teacher_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.school-sidebar {
  padding: toRem(14);

  @include breakpoint-down(lg) {
    padding: toRem(12);
  }

  @include breakpoint-down(xs) {
    padding: toRem(11) toRem(9);
  }

  .label {
    left: 0;
    height: toRem(4.25);

    @include breakpoint-down(xs) {
      height: toRem(3);
    }
  }

  .top-row {
    @include flex-row-between-nowrap;
    align-items: flex-start;
    margin-top: toRem(5);
    margin-bottom: toRem(3);

    .left {
      @include flex-row-start-nowrap;
      align-items: flex-start;
      width: 95%;

      .avatar {
        margin-right: toRem(10);
        @include square-shape(32);

        @include breakpoint-down(xs) {
          @include square-shape(30);
        }

        .icon {
          @include center-placement;
          font-size: toRem(15);
        }
      }

      .title-text {
        @include font-height(13, 19);

        @include breakpoint-down(xs) {
          @include font-height(12, 17);
        }
      }

      .meta-text {
        @include font-height(11.25, 16);
        letter-spacing: 0.02em;

        @include breakpoint-down(xs) {
          @include font-height(10.5, 13);
        }
      }

      .block-one {
        width: 80%;
        height: toRem(13);
      }

      .block-two {
        width: 40%;
        height: toRem(8);
      }
    }

    .right {
      .avatar {
        @include square-shape(28);

        @include breakpoint-down(xs) {
          @include square-shape(26);
        }
        .icon {
          @include center-placement;
          font-size: toRem(13);
        }

        &:hover {
          background: rgba($border-grey-light, 0.6);
        }
      }
    }
  }

  .empty-teacher-block {
    margin-bottom: toRem(15);

    .top {
      @include flex-row-start-nowrap;
      margin-bottom: toRem(12);

      .avatar {
        margin-right: toRem(10);

        .icon {
          @include center-placement;
          font-size: toRem(18);
        }
      }

      .text {
        @include font-height(11.5, 16);

        @include breakpoint-down(xl) {
          @include font-height(11, 15);
        }
      }
    }

    .bottom {
      @include flex-row-start-nowrap;
      width: max-content;
      cursor: pointer;

      .avatar {
        @include square-shape(28);
        margin-right: toRem(10);
        border: toRem(1) solid $border-grey;
        @include transition(0.4s);

        .icon {
          @include center-placement;
          color: $brand-accent;
          font-size: toRem(16);
        }
      }

      .text {
        @include transition(0.4s);
        font-size: toRem(11.5);
        color: $brand-accent;
        font-weight: 600;
      }

      &:hover {
        .avatar {
          border: toRem(1) solid $brand-primary;
        }

        .text {
          color: $brand-primary;
        }
      }
    }
  }

  .bottom-row {
    @include breakpoint-down(md) {
      display: none;
    }

    .title-text {
      @include font-height(11, 16);
    }

    .teacher-row {
      @include flex-row-start-wrap;
      margin-bottom: toRem(15);

      .avatar {
        @include square-shape(32);
        margin-right: toRem(8);
        margin-bottom: toRem(8);
        overflow: unset;

        .avatar-text {
          font-size: toRem(11);

          @include breakpoint-down(lg) {
            font-size: toRem(11.5);
          }
        }

        .icon {
          @include center-placement;
          font-size: toRem(18);

          @include breakpoint-down(lg) {
            font-size: toRem(16);
          }
        }
      }

      .add-card {
        border: toRem(1) dashed $border-grey;
        &:hover {
          border: toRem(1) dashed $brand-accent;
          .icon {
            color: $brand-accent !important;
          }
        }
      }
    }

    .class-code-section {
      .intro-text {
        @include font-height(11.75, 17);
        margin-bottom: toRem(10);

        @include breakpoint-down(lg) {
          @include font-height(11, 17);
          margin-bottom: toRem(12);
        }
      }

      .class-code {
        padding: toRem(5.5) toRem(12) toRem(7.5);
        width: max-content;

        @include breakpoint-down(lg) {
          padding: toRem(4) toRem(10) toRem(6);
        }

        .text {
          @include font-height(11.5, 16);

          @include breakpoint-down(lg) {
            @include font-height(11, 15);
            margin-right: toRem(6) !important;
          }
        }

        .value {
          @include font-height(12.25, 15);
        }

        .icon {
          position: relative;
          top: toRem(0.5);
          font-size: toRem(15);
          cursor: pointer;
          @include transition(0.4s);

          @include breakpoint-down(lg) {
            font-size: toRem(15);
          }

          &:hover {
            color: $brand-inverse !important;
          }
        }
      }
    }
  }
}
</style>
