<template>
  <div class="card-wrapper position-relative">
    <div
      class="
        member-student-card
        w-100
        rounded-10
        white-text-bg
        pointer
        position-relative
      "
      @click="goToStudentProfile"
    >
      <!-- OPTIONS  -->
      <div
        class="options rounded-7 pointer smooth-transition ignore"
        @click="toggleOptions"
        v-on-clickaway="hideOptions"
      >
        <div class="wrapper w-100 h-100 position-relative ignore">
          <div class="icon icon-ellipsis-h color-grey-dark ignore"></div>
        </div>
      </div>

      <!-- USER IMAGE  -->
      <div
        class="avatar"
        :class="student.image ? 'border-brand-inverse' : null"
      >
        <img
          v-lazy="student.image"
          :alt="$string.getStringInitials(getStudentFullname)"
          class="avatar-img"
          v-if="student.image"
        />
        <div
          class="avatar-text"
          :class="$color.getProfileBgColor(getStudentFullname)"
          v-else
        >
          {{ $string.getStringInitials(getStudentFullname) }}
        </div>
      </div>

      <!-- USER INFO  -->
      <div class="info">
        <div class="name font-weight-600 color-text text-capitalize">
          {{ getStudentFullname }}
        </div>
        <div class="student-code color-grey-dark text-uppercase">
          {{ student.code }}
          <span
            class="icon icon-copy brand-accent mgl-5 gfont-15 ignore"
            title="Copy Class Code"
            @click="copyClassCode"
          ></span>

          <input
            type="text"
            ref="classCode"
            :value="student.code"
            class="position-absolute index--9 ignore"
            style="opacity: 0"
          />
        </div>
      </div>

      <!-- BOTTOM  -->
      <div class="bottom">
        <template v-if="+student.relationshipStatus">
          <div
            class="avatar border-0 color-white-bg ignore"
            @click="toggleContactParent"
          >
            <div class="icon icon-chat border-grey-dark ignore"></div>
          </div>

          <div
            class="text contact-link border-grey-dark ignore"
            @click="toggleContactParent"
          >
            Contact Parent
          </div>
        </template>

        <template v-else>
          <div class="avatar ignore" @click="toggleParentInvite">
            <div class="icon icon-user-plus border-grey-dark ignore"></div>
          </div>

          <div
            class="text btn-link link-no-underline ignore"
            @click="toggleParentInvite"
          >
            Invite Parent
          </div>
        </template>
      </div>
    </div>

    <!-- DROPDOWN  -->
    <div
      class="
        dropdown
        rounded-5
        box-shadow-effect
        smooth-transition smooth-animation
        white-text-bg
        index-9
        ignore
      "
      v-if="show_more_option"
    >
      <div class="item ignore" @click="goToStudentProfile">
        <div class="icon-cover">
          <div class="icon icon-user-outline"></div>
        </div>
        <div>View Profile</div>
      </div>

      <div class="item ignore" @click="toggleChangeClass">
        <div class="icon-cover">
          <div class="icon icon-swap"></div>
        </div>
        <div>Change Class</div>
      </div>

      <div class="item ignore" @click="toggleRemoveStudent">
        <div class="icon-cover">
          <div class="icon icon-trash"></div>
        </div>
        <div>Remove from Class</div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_invite_parent_modal">
        <invite-parent-modal
          @closeTriggered="toggleParentInvite"
          :child="getChild"
          :relationship="getRelationship"
          :school_id="getSchoolID"
          :class_id="getClassID"
        />
      </transition>

      <transition name="fade" v-if="show_contact_parent_modal">
        <parent-detail-message-modal
          modal_type="message"
          message_lock
          :parent="getParentDetails"
          :student_reference_id="Number(student.id)"
          @closeTriggered="toggleContactParent"
        />
      </transition>

      <transition name="fade" v-if="show_change_class_modal">
        <change-class-modal
          :student="student"
          @closeTriggered="toggleChangeClass"
        />
      </transition>

      <transition name="fade" v-if="show_remove_student_modal">
        <remove-student-modal
          :student="{
            id: student.id,
            full_name: this.getStudentFullname,
          }"
          @closeTriggered="toggleRemoveStudent"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "memberStudentCard",

  components: {
    inviteParentModal: () =>
      import(
        /* webpackChunkName: "inviteParentModal" */ "@/modules/dashboard/modals/invite-parent-modal"
      ),
    parentDetailMessageModal: () =>
      import(
        /* webpackChunkName: "parentDetailMessageModal" */ "@/modules/dashboard/modals/parent-detail-message-modal"
      ),
    removeStudentModal: () =>
      import(
        /* webpackChunkName: "removeStudentModal" */ "@/modules/base/modals/members/remove-student-modal"
      ),
    changeClassModal: () =>
      import(
        /* webpackChunkName: "changeClassModal" */ "@/modules/base/modals/members/change-class-modal"
      ),
  },

  props: {
    student: {
      type: Object,
      default: () => ({
        id: 1,
        full_name: "Richy Jones",
        code: "",
        image: "",
        relationshipStatus: 0,
      }),
    },
  },

  watch: {
    show_contact_parent_modal: {
      handler(state) {
        if (state) this.updateStudentParent();
      },
      immediate: true,
    },
  },

  computed: {
    ...mapGetters({ getSelectedClass: "general/getSelectedClass" }),

    getStudentFullname() {
      return this.student.firstname
        ? `${this.student.firstname} ${this.student.lastname}`
        : "Student Name...";
    },

    getChild() {
      return {
        id: this.student.id,
        image: this.student.image,
        fullname: this.getStudentFullname,
        class_name: this.getSelectedClass.name,
      };
    },

    getSchoolID() {
      if (this.getAuthType === "school") return this.getAuthUser.school_id;
      return "";
    },

    getClassID() {
      if (this.getAuthType === "teacher") return this.$route.params.id;
      return "";
    },

    getRelationship() {
      if (this.getAuthType === "school") return "school proprietor";
      return "";
    },

    defultParent() {
      return {
        parent_id: 1,
        parent_image: "",
        parent_firstname: "Gradely",
        parent_lastname: "Parent",
        parent_phone: "+2347088654321",
        parent_email: "Parent@qa.team",
        relationship: "Guardian",
      };
    },

    getParentDetails() {
      if (this.student?.relationshipStatus && this.parents.length) {
        let parent = this.parents[0];
        return {
          parent_id: parent.id,
          parent_image: parent.image,
          parent_firstname: parent.firstname,
          parent_lastname: parent.lastname,
          parent_phone: parent.phone,
          parent_email: parent.email,
          relationship: parent?.relationship,
        };
      } else return this.defultParent;
    },
  },

  data: () => ({
    show_more_option: false,
    show_invite_parent_modal: false,
    show_contact_parent_modal: false,
    show_change_class_modal: false,
    show_remove_student_modal: false,
    parents: [],
  }),

  methods: {
    ...mapActions({
      getStudentParent: "dbProfile/getStudentParent",
    }),

    async updateStudentParent() {
      let { code, data } = await this.getStudentParent(Number(this.student.id));
      if (code == 200) this.parents = data;
    },

    copyClassCode() {
      let code_input = this.$refs.classCode;
      code_input.select();
      code_input.setSelectionRange(0, 99999); /*For mobile devices*/
      document.execCommand("copy");

      code_input.value
        ? this.pushAlert("Student code copied successfully", "success")
        : this.pushAlert("No student code available", "warning");
    },

    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    toggleParentInvite() {
      this.show_invite_parent_modal = !this.show_invite_parent_modal;
    },

    goToStudentProfile($event) {
      if (!$event.target.classList.contains("ignore")) {
        if (
          this.getAuthType === "teacher" &&
          !this.getSelectedClass?.subjects?.length
        ) {
          this.pushAlert(
            "You are not assigned any subjects in " +
              this.getSelectedClass.name,
            "warning"
          );
          return;
        }
        this.$router.push({
          name: "StudentProfile",
          params: { id: this.$route.params.id, student_id: this.student.id },
          query: { name: this.getStudentFullname },
        });
      }
    },

    toggleContactParent() {
      this.show_contact_parent_modal = !this.show_contact_parent_modal;
    },

    toggleChangeClass() {
      this.show_change_class_modal = !this.show_change_class_modal;
    },

    toggleRemoveStudent() {
      this.show_remove_student_modal = !this.show_remove_student_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  width: 25%;
  margin-bottom: toRem(15);
  padding: 0 1%;

  @include breakpoint-down(lg) {
    padding: 0 1%;
    width: 33.33%;
  }

  @include breakpoint-down(sm) {
    padding: 0 0.5%;
    width: 100%;
    margin-bottom: toRem(5);
  }

  .member-student-card {
    @include flex-column-center;
    height: toRem(210);
    @include transition(0.4s);
    box-shadow: 0 toRem(1) toRem(4) rgba(0, 0, 0, 0.15);

    @include breakpoint-down(xl) {
      height: toRem(200);
    }

    @include breakpoint-down(sm) {
      @include flex-row-start-nowrap;
      height: toRem(70);
      padding: toRem(12);
    }

    @include breakpoint-down(xs) {
      height: toRem(65);
      padding: toRem(10);
      border-radius: toRem(5) !important;
    }

    @include breakpoint-custom-down(360) {
      height: toRem(60);
      padding: toRem(7);
    }

    &:hover {
      background: rgba($white-text, 0.7) !important;
      box-shadow: 0 toRem(2) toRem(6) rgba($brand-inverse, 0.15);
    }

    .options {
      background: rgba($border-grey, 0.35);
      @include square-shape(30);
      position: absolute;
      right: toRem(10);
      top: toRem(10);

      @include breakpoint-down(sm) {
        @include center-y;
      }

      .icon {
        @include center-placement;
        font-size: toRem(22);

        @include breakpoint-down(xs) {
          font-size: toRem(19.5);
        }
      }

      &:hover {
        background: rgba($brand-inverse-light, 0.75);
      }
    }

    .avatar {
      @include square-shape(75);
      margin-bottom: toRem(15);
      margin-top: toRem(-18);

      @include breakpoint-down(xl) {
        @include square-shape(62);
      }

      @include breakpoint-down(md) {
        @include square-shape(68);
      }

      @include breakpoint-down(sm) {
        @include square-shape(46);
        margin-bottom: 0;
        margin-right: toRem(12);
        margin-top: unset;
        border-radius: toRem(7) !important;
      }

      @include breakpoint-down(xs) {
        @include square-shape(38);
        margin-right: toRem(10);
      }

      .avatar-text {
        font-size: toRem(14) !important;

        @include breakpoint-down(md) {
          font-size: toRem(12.25) !important;
        }

        @include breakpoint-down(sm) {
          font-size: toRem(11.5) !important;
        }

        @include breakpoint-down(xs) {
          font-size: toRem(11) !important;
        }
      }
    }

    .info {
      @include flex-column-center;

      @include breakpoint-down(sm) {
        align-items: flex-start;
      }

      .name {
        @include font-height(13, 19);
        margin-bottom: toRem(4);

        @include breakpoint-down(xl) {
          @include font-height(12.5, 18);
          margin-bottom: toRem(3);
        }

        @include breakpoint-down(sm) {
          text-align: left !important;
        }

        @include breakpoint-down(xs) {
          @include font-height(11.75, 17);
          margin-bottom: toRem(1);
        }
      }

      .student-code {
        @include font-height(11.5, 15);

        @include breakpoint-down(xl) {
          @include font-height(11.25, 14);
        }

        @include breakpoint-down(sm) {
          text-align: left !important;
        }

        @include breakpoint-down(xs) {
          @include font-height(11, 13);
        }
      }
    }

    .bottom {
      @include flex-row-center-nowrap;
      border-top: toRem(1) solid rgba($border-grey, 0.7);
      margin-top: toRem(13);
      padding-top: toRem(10);
      margin-bottom: toRem(-25);
      width: 92%;

      @include breakpoint-down(xl) {
        padding-top: toRem(12);
      }

      @include breakpoint-down(sm) {
        display: none;
      }

      .avatar {
        @include square-shape(30);
        margin-right: toRem(10);
        border: toRem(1) dashed $border-grey;
        margin-top: unset;
        margin-bottom: unset;

        @include breakpoint-down(xl) {
          @include square-shape(26);
        }

        .icon {
          @include center-placement;
          font-size: toRem(15);

          @include breakpoint-down(xl) {
            font-size: toRem(13.5);
          }
        }
      }

      .text {
        @include font-height(12.25, 18);

        @include breakpoint-down(lg) {
          @include font-height(12, 17);
        }
      }

      .contact-link {
        @include transition(0.4s);

        &:hover {
          color: $brand-inverse !important;
        }
      }
    }
  }

  .dropdown {
    top: toRem(40);
    right: toRem(7);

    @include breakpoint-down(sm) {
      right: toRem(6);
    }

    @include breakpoint-down(xs) {
      right: toRem(3);
    }
  }
}
</style>
