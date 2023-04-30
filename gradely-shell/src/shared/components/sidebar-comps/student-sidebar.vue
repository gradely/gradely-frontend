<template>
  <div class="student-sidebar white-text-bg rounded-10 box-shadow-effect">
    <!-- TOP  -->
    <div class="top">
      <div
        class="switch-btn position-relative rounded-40 smooth-transition pointer show-switch-btn-one"
        @click="toggleSwitchModal"
      >
        <div class="icon icon-control"></div>
        <div class="text">Switch Mode</div>

        <!-- INDICATOR  -->
        <div
          class="indicator brand-red-bg rounded-circle position-absolute"
          v-if="false"
        ></div>
      </div>
    </div>

    <!-- MIDDLE  -->
    <div class="middle">
      <!-- AVATAR  -->
      <div
        class="avatar"
        :class="getStudentImage ? 'border-brand-inverse' : null"
      >
        <img
          v-lazy="getStudentImage"
          :alt="getStudentFullName"
          class="avatar-img"
          v-if="getStudentImage"
        />

        <div
          class="avatar-text"
          v-else
          :class="$color.getProfileBgColor(getStudentFullName)"
        >
          {{ $string.getStringInitials(getStudentFullName) }}
        </div>
      </div>

      <div>
        <div
          class="name color-text font-weight-700 text-center text-capitalize"
        >
          {{ getStudentFullName }}
        </div>

        <div class="code color-grey-dark text-center">
          Student Code: <span class="text-uppercase">{{ getStudentCode }}</span>
        </div>

        <div class="class-name color-grey-dark text-center">
          Class: <span class="text-capitalize">{{ getStudentClassName }}</span>
        </div>

        <div
          class="switch-btn position-relative rounded-40 smooth-transition pointer show-switch-btn-two"
          @click="toggleSwitchModal"
        >
          <div class="icon icon-control"></div>
          <div class="text">Switch Mode</div>

          <!-- INDICATOR  -->
          <div
            class="indicator brand-red-bg rounded-circle position-absolute"
          ></div>
        </div>
      </div>
    </div>

    <!-- BOTTOM  -->
    <div class="bottom" v-if="!getStudentRelationship">
      <template v-if="false">
        <div
          class="avatar border-0 color-white-bg ignore"
          @click="toggleContactParent"
        >
          <div class="icon icon-chat border-grey-dark ignore"></div>
        </div>

        <div
          class="text btn-link link-no-underline ignore"
          @click="toggleContactParent"
        >
          Contact Parent
        </div>
      </template>

      <template>
        <div class="avatar" @click="toggleParentInvite">
          <div class="icon icon-user-plus border-grey-dark"></div>
        </div>

        <div
          class="text btn-link font-weight-700 link-no-underline"
          @click="toggleParentInvite"
        >
          Invite Parent
        </div>
      </template>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_switch_modal">
        <switch-mode-modal @closeTriggered="toggleSwitchModal" />
      </transition>

      <transition name="fade" v-if="show_invite_parent_modal">
        <invite-parent-modal @closeTriggered="toggleParentInvite" />
      </transition>

      <transition name="fade" v-if="show_contact_parent_modal">
        <parent-detail-message-modal
          modal_type="message"
          message_lock
          @closeTriggered="toggleContactParent"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "studentSidebar",

  components: {
    parentDetailMessageModal: () =>
      import(
        /* webpackChunkName: "parentDetailModal" */ "@/modules/dashboard/modals/parent-detail-message-modal"
      ),
    switchModeModal: () =>
      import(
        /* webpackChunkName: "switchModeModal" */ "@/shared/modals/switch-mode-modal"
      ),
    inviteParentModal: () =>
      import(
        /* webpackChunkName: "inviteParentModal" */ "@/modules/dashboard/modals/invite-parent-modal"
      ),
  },

  computed: {
    getStudentImage() {
      return this.getAuthUser.image ? this.getAuthUser.image : "";
    },

    getStudentFullName() {
      return this.getAuthUser.full_name
        ? this.getAuthUser.full_name
        : "Student name";
    },

    getStudentCode() {
      return this.getAuthUser.code ? this.getAuthUser.code : "GRA/2020****";
    },

    getStudentClassName() {
      return this.getAuthUser.class_name
        ? this.getAuthUser.class_name
        : "Junior School 1";
    },

    getStudentRelationship() {
      return this.getAuthUser.relationship ? this.getAuthUser.relationship : 0;
    },
  },

  data: () => ({
    show_switch_modal: false,
    show_invite_parent_modal: false,
    show_contact_parent_modal: false,
  }),

  mounted() {
    this.loadChildId();
  },

  methods: {
    loadChildId() {
      let route_id = this.$route.params.id;
      if (route_id !== this.getAuthUser.id)
        this.$router
          .push({
            name: this.$router.currentRoute.name,
            params: { id: this.getAuthUser.id },
          })
          .catch((error) => {
            if (error.name != "NavigationDuplicated") throw error;
          });
    },

    toggleSwitchModal() {
      this.show_switch_modal = !this.show_switch_modal;
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
.student-sidebar {
  padding: toRem(18) toRem(20);

  @include breakpoint-down(lg) {
    padding: toRem(16) toRem(8);
  }

  @include breakpoint-down(md) {
    padding: toRem(16) toRem(18);
  }

  @include breakpoint-down(xs) {
    border-radius: toRem(5) !important;
    padding-top: toRem(15);
    padding: toRem(12);
  }

  .top {
    @include flex-row-end-nowrap;
    margin-bottom: toRem(16);

    @include breakpoint-down(sm) {
      margin-bottom: toRem(6);
    }

    @include breakpoint-down(xs) {
      margin-bottom: toRem(4);
    }
  }

  .switch-btn {
    @include flex-row-center-nowrap;
    padding: toRem(8) toRem(13);
    background: $color-white;
    color: $color-grey-dark;

    @include breakpoint-down(lg) {
      padding: toRem(9) toRem(14);
    }

    @include breakpoint-down(xs) {
      padding: toRem(8) toRem(12);
    }

    &:hover {
      background: $brand-inverse-light;
      box-shadow: 0 toRem(1) toRem(4) rgba(0, 0, 0, 0.15);
    }

    .icon,
    .text {
      @include font-height(12, 18);

      @include breakpoint-down(lg) {
        @include font-height(11.5, 16);
      }

      @include breakpoint-down(xs) {
        @include font-height(11, 15);
      }
    }

    .icon {
      margin-right: toRem(10);

      @include breakpoint-down(xs) {
        margin-right: toRem(8);
      }
    }

    .indicator {
      @include square-shape(7);
      top: toRem(-2);
      right: toRem(8);

      @include breakpoint-down(lg) {
        @include square-shape(7);
      }

      @include breakpoint-down(xs) {
        @include square-shape(6);
      }
    }
  }

  .show-switch-btn-one {
    @include breakpoint-down(xs) {
      display: none;
    }
  }

  .show-switch-btn-two {
    display: none;

    @include breakpoint-down(xs) {
      @include flex-row-center-nowrap;
      margin-bottom: toRem(3);
      width: max-content;
    }
  }

  .middle {
    @include flex-column-start-center;

    @include breakpoint-down(xs) {
      @include flex-row-start-nowrap;
      align-items: flex-start;
    }

    .avatar {
      @include square-shape(115);
      margin-bottom: toRem(20);

      .avatar-text {
        font-size: toRem(28);

        @include breakpoint-down(md) {
          font-size: toRem(25);
        }

        @include breakpoint-down(sm) {
          font-size: toRem(22);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(18);
        }
      }

      @include breakpoint-down(xl) {
        @include square-shape(110);
      }

      @include breakpoint-down(lg) {
        @include square-shape(105);
        margin-bottom: toRem(18);
      }

      @include breakpoint-down(sm) {
        @include square-shape(90);
        margin-bottom: toRem(15);
      }

      @include breakpoint-down(xs) {
        @include square-shape(75);
        margin-right: toRem(12);
        margin-bottom: 0;
      }

      @include breakpoint-custom-down(360) {
        @include square-shape(65);
      }
    }

    .name {
      @include font-height(14, 20);
      margin-bottom: toRem(8);

      @include breakpoint-down(lg) {
        @include font-height(13.5, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(12.65, 17);
        text-align: left !important;
        margin-bottom: toRem(7);
      }

      @include breakpoint-custom-down(360) {
        @include font-height(12.5, 17);
        margin-bottom: toRem(6);
      }
    }

    .code {
      @include font-height(12.45, 17);
      margin-bottom: toRem(4);

      @include breakpoint-down(lg) {
        @include font-height(12.35, 17);
        margin-bottom: toRem(2.5);
      }

      @include breakpoint-down(xs) {
        @include font-height(11.5, 17);
        margin-bottom: toRem(3);
        text-align: left !important;
      }

      @include breakpoint-custom-down(360) {
        margin-bottom: toRem(2);
      }
    }

    .class-name {
      @include font-height(11.25, 17);
      margin-bottom: toRem(8);

      @include breakpoint-down(lg) {
        text-align: left !important;
      }
    }
  }

  .bottom {
    @include flex-row-center-nowrap;
    border-top: toRem(1) solid rgba($border-grey, 0.7);
    margin-top: toRem(7.5);
    padding-top: toRem(13);

    @include breakpoint-down(xl) {
      padding-top: toRem(12);
    }

    @include breakpoint-down(xs) {
      display: none;
    }

    .avatar {
      @include square-shape(30);
      margin-right: toRem(10);
      border: toRem(1) dashed $border-grey;

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
      @include font-height(12.75, 18);

      @include breakpoint-down(lg) {
        @include font-height(12, 17);
      }
    }
  }
}
</style>
