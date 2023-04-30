<template>
  <div class="sidebar-default">
    <!-- TOP  -->
    <div class="top position-relative w-100 h-auto">
      <img
        v-lazy="
          `${getAssetBaseURL(
            'cloud',
            'gradely'
          )}/image/upload/v1639028997/Empty_xful2j.svg`
        "
        alt=""
      />
    </div>

    <!-- BOTTOM  -->
    <div class="bottom">
      <div class="meta-text">
        Welcome to Gradely for Schools.<br />
        Complete the following to get started.
      </div>

      <!-- TOUR CARD  -->
      <quick-setup-card />

      <!-- RESUME TOUR  -->
      <div class="resume-tour" v-if="false">
        <div class="d-flex justify-content-center align-items-center pointer">
          <div class="icon icon-play-bg brand-accent"></div>
          <div class="text color-white font-weight-600">Resume Tour</div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_invite_teacher_modal">
        <invite-teachers-modal @closeTriggered="toggleInviteTeachers" />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "sidebarDefault",

  components: {
    quickSetupCard: () =>
      import(
        /* webpackChunkName: 'card' */ "@/modules/dashboard/components/home-comps/quick-setup-card"
      ),
    inviteTeachersModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/invite-teachers-modal"
      ),
  },

  data: () => ({
    show_invite_teacher_modal: false,
  }),

  methods: {
    toggleInviteTeachers() {
      this.show_invite_teacher_modal = !this.show_invite_teacher_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-default {
  padding: 0 22px;

  @include breakpoint-down(lg) {
    padding: 0 13px;
  }

  @include breakpoint-down(md) {
    padding: 0 25px;
  }

  @include breakpoint-down(sm) {
    padding: 0 18px;
  }

  @include breakpoint-down(xs) {
    padding: 0 12px;
  }

  .top {
    @include flex-row-center-nowrap;

    img {
      @include rectangle-shape(180, 215);

      @include breakpoint-down(lg) {
        @include rectangle-shape(160, 190);
      }

      @include breakpoint-down(md) {
        @include rectangle-shape(160, 200);
      }

      @include breakpoint-down(sm) {
        @include rectangle-shape(130, 190);
      }
    }
  }

  .bottom {
    position: relative;
    top: toRem(-30);
    margin-bottom: toRem(132);

    @include breakpoint-down(md) {
      margin-bottom: toRem(15);
    }

    .meta-text {
      @include font-height(12, 21);
      margin-bottom: toRem(20);
      text-align: center;
      color: #f5f5f5;

      @include breakpoint-down(lg) {
        @include font-height(12, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(11.5, 16);
      }
    }

    .resume-tour {
      @include flex-row-center-nowrap;

      .icon {
        font-size: toRem(18);
        margin-right: toRem(10);

        @include breakpoint-down(lg) {
          font-size: toRem(17);
          margin-right: toRem(9);
        }
      }

      .text {
        @include font-height(12.75, 18);

        @include breakpoint-down(lg) {
          @include font-height(12.5, 19);
        }

        @include breakpoint-down(xs) {
          @include font-height(11.5, 18);
        }
      }
    }
  }
}
</style>
