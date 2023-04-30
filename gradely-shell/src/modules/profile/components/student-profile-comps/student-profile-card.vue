<template>
  <div class="student-profile-card white-text-bg rounded-7">
    <!-- PROFILE IMAGE  -->
    <div class="profile-image avatar border-brand-inverse-light">
      <img
        v-lazy="getStudent.image"
        :alt="$string.getStringInitials(getChildName)"
        class="avatar-img"
        v-if="isValidImage(getStudent.image)"
      />

      <div
        class="avatar-text"
        v-else
        :class="$color.getProfileBgColor(getChildName)"
      >
        {{ $string.getStringInitials(getChildName) }}
      </div>
    </div>

    <!-- STUDENT NAME  -->
    <div class="student-name color-text font-weight-600 text-center">
      {{ getChildName }}
    </div>

    <!-- SRUDENT CODE  -->
    <div class="student-code color-grey-dark text-uppercase text-center">
      {{ getStudent.code ? getStudent.code : "GRD/2020/0001" }}
    </div>

    <!-- PARENT COLUMN  -->
    <div class="parent-column w-100">
      <template v-if="isParentExist">
        <div class="left">
          <div class="avatar rounded-5">
            <img
              v-lazy="getAParent.image"
              :alt="$string.getStringInitials(getParentName)"
              class="avatar-img"
              v-if="isValidImage(getAParent.image)"
            />

            <div
              class="avatar-text white-text"
              v-else
              :class="$color.getProfileBgColor(getParentName)"
            >
              {{ $string.getStringInitials(getParentName) }}
            </div>
          </div>

          <div>
            <div class="name color-text font-weight-600">
              {{ getParentName }}
            </div>
            <div class="role color-grey-dark">Father</div>
            <!-- hard coded, role not returned by api -->
          </div>
        </div>

        <div class="right">
          <div
            class="avatar pointer smooth-transition"
            title="Message Parent"
            @click="toggleContactParent"
          >
            <div class="icon icon-chat brand-navy"></div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="invite-row w-100">
          <div class="circle rounded-circle" @click="toggleParentInvite">
            <div class="icon icon-user-plus border-grey-dark"></div>
          </div>

          <div
            class="text btn-link font-weight-700 link-no-underline"
            @click="toggleParentInvite"
          >
            Invite Parent
          </div>
        </div>
      </template>
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
    </portal>
  </div>
</template>

<script>
export default {
  name: "studentProfileCard",

  components: {
    inviteParentModal: () =>
      import(
        /* webpackChunkName: "inviteParentModal" */ "@/modules/dashboard/modals/invite-parent-modal"
      ),
    parentDetailMessageModal: () =>
      import(
        /* webpackChunkName: "parentDetailMessageModal" */ "@/modules/dashboard/modals/parent-detail-message-modal"
      ),
  },

  props: {
    student_name: {
      type: String,
      default: "Emmanuel James",
    },

    student: {
      type: Object,
      default: () => ({
        student: {
          lastname: "Emmanuel",
          firstname: "James",
          image: "",
          code: "",
          parents: [],
        },
      }),
    },
  },

  computed: {
    getStudent() {
      return this.student?.student;
    },

    getChildName() {
      return `${this.getStudent?.lastname} ${this.getStudent?.firstname}`;
    },

    isParentExist() {
      return this.student.parents?.length ? true : false;
    },

    getAParent() {
      if (this.isParentExist) return this.student.parents[0];
    },

    getParentName() {
      return `${this.getAParent.lastname} ${this.getAParent.firstname}`;
    },

    getChild() {
      return {
        image: this.getStudent.image,
        fullname: this.getChildName,
        class_name: "JSS 1",
        //child class not returned
      };
    },

    getClassID() {
      if (this.getAuthType === "teacher") return this.$route.params.id;
      return "";
    },

    getSchoolID() {
      if (this.getAuthType === "school") return this.getAuthUser.school_id;
      return "";
    },

    getRelationship() {
      if (this.getAuthType === "school") return "school proprietor";
      return "";
    },

    getParentDetails() {
      if (this.student?.parents?.length) {
        let parent = this.student.parents[0];
        return {
          parent_id: parent.id,
          parent_image: parent.image,
          parent_lastname: parent.lastname,
          parent_firstname: parent.firstname,
          parent_phone: parent.phone,
          parent_email: parent.email,
          relationship: "Father",
        };
      } else return false;
    },
  },

  data: () => ({
    show_invite_parent_modal: false,
    show_contact_parent_modal: false,
  }),

  methods: {
    isValidImage(image) {
      if (!image) return false;
      if (image.includes("http")) return true;
    },

    toggleParentInvite() {
      this.show_invite_parent_modal = !this.show_invite_parent_modal;
    },

    toggleContactParent() {
      this.show_contact_parent_modal = !this.show_contact_parent_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.student-profile-card {
  @include flex-column-center;
  justify-content: flex-start;
  box-shadow: 0 toRem(1) toRem(4) rgba($border-grey, 0.1);
  padding: toRem(25) toRem(20) toRem(20);

  @include breakpoint-down(lg) {
    padding: toRem(23) toRem(10) toRem(15);
  }

  @include breakpoint-down(md) {
    padding: toRem(25) toRem(20) toRem(20);
  }

  @include breakpoint-down(sm) {
    padding: toRem(25) toRem(10) toRem(20);
  }

  .profile-image {
    @include square-shape(115);
    margin-bottom: toRem(15);

    @include breakpoint-down(lg) {
      @include square-shape(105);
    }

    @include breakpoint-down(md) {
      @include square-shape(100);
    }

    .avatar-text {
      font-size: toRem(28);
    }
  }

  .student-name {
    @include font-height(14, 19);
    margin-bottom: toRem(5);

    @include breakpoint-down(lg) {
      @include font-height(13.5, 18);
      margin-bottom: toRem(3);
    }

    @include breakpoint-down(md) {
      @include font-height(13, 17);
    }
  }

  .student-code {
    @include font-height(13, 18);
    margin-bottom: toRem(20);

    @include breakpoint-down(lg) {
      @include font-height(12.5, 17);
    }

    @include breakpoint-down(md) {
      @include font-height(12, 17);
    }
  }

  .parent-column {
    @include flex-row-between-nowrap;
    border-top: toRem(1) solid rgba($border-grey, 0.65);
    padding-top: toRem(20);

    @include breakpoint-down(lg) {
      padding-top: toRem(14);
    }

    .left {
      @include flex-row-start-nowrap;

      .avatar {
        @include square-shape(42);
        margin-right: toRem(11);

        @include breakpoint-down(lg) {
          @include square-shape(36);
          margin-right: toRem(7);
        }
      }

      .name {
        @include font-height(13, 19);

        @include breakpoint-down(lg) {
          @include font-height(12.5, 18);
        }
      }

      .role {
        @include font-height(11.5, 16);

        @include breakpoint-down(lg) {
          @include font-height(11, 15);
        }
      }
    }

    .right {
      .avatar {
        @include square-shape(34);
        background: $color-white;

        @include breakpoint-down(lg) {
          @include square-shape(32);
        }

        .icon {
          @include center-placement;
          font-size: toRem(17);

          @include breakpoint-down(lg) {
            font-size: toRem(16);
          }
        }

        &:hover {
          background: $brand-inverse-light;
        }
      }
    }

    .invite-row {
      @include flex-row-center-nowrap;

      .circle {
        @include square-shape(32);
        position: relative;
        margin-right: toRem(12);
        border: toRem(1) dashed $border-grey;

        .icon {
          @include center-placement;
          font-size: toRem(14.5);
        }
      }

      .text {
        @include font-height(13, 18);
      }
    }
  }
}
</style>
