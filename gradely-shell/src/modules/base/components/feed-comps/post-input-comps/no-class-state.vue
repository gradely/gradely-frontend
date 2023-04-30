<template>
  <div class="no-subscription-state">
    <!-- CLOSE TRIGGER -->
    <div
      class="close-trigger pointer rounded-circle smooth-transition"
      title="Close"
      @click="$emit('closeOpenState')"
    >
      <div class="wrapper position-relative w-100 h-100">
        <div class="icon icon-close"></div>
      </div>
    </div>

    <img :src="mxStaticImg('EmptyHomework.png')" alt="no-class" />

    <div class="info">
      <div class="title-text font-weight-600 brand-navy">
        {{ getTitle }}
      </div>

      <div class="description color-grey-dark">
        {{ getBody }} <br />
        <router-link to class="font-weight-600" @click.native="processAction">{{
          getLink
        }}</router-link>
        and retry!
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
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
export default {
  name: "noClassState",

  components: {
    teacherAddClassModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/teacher-add-class-modal"
      ),
    findClassModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/find-class-modal"
      ),
    inviteSchoolModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/invite-school-modal"
      ),
  },

  computed: {
    getTitle() {
      return this.getAuthType === "teacher"
        ? "No Class Added!"
        : "No Child Connected!";
    },

    getBody() {
      return this.getAuthType === "teacher"
        ? `Hi ${this.getAuthUser.full_name}, you currently don't have any class on your class list, to continue on selected action.`
        : `Hi ${this.getAuthUser.full_name}, you currently don't have any child connected to Gradely.`;
    },

    getLink() {
      return this.getAuthType === "teacher" ? "Add a class" : "Connect a child";
    },
  },

  data: () => ({
    show_add_class_modal: false,
    show_find_class_modal: false,
    show_invite_school_modal: false,
  }),

  methods: {
    toggleAddClassModal() {
      this.show_add_class_modal = !this.show_add_class_modal;
    },

    toggleFindClassModal() {
      this.show_find_class_modal = !this.show_find_class_modal;
    },

    toggleInviteSchoolModal() {
      this.show_invite_school_modal = !this.show_invite_school_modal;
    },

    processAction() {
      this.getAuthType === "teacher" ? this.toggleAddClassModal() : null;
    },
  },
};
</script>

<style lang="scss" scoped>
.no-subscription-state {
  @include flex-row-center-nowrap;
  padding: toRem(50) toRem(40);
  position: relative;

  @include breakpoint-down(xs) {
    padding: toRem(50) toRem(30);
    align-items: flex-start;
  }

  @include breakpoint-custom-down(370) {
    padding: toRem(50) toRem(8);
  }

  .close-trigger {
    @include square-shape(28);
    @include square-shape(28);
    background: $color-white;
    position: absolute;
    overflow: hidden;
    top: toRem(20);
    right: toRem(20);

    @include breakpoint-down(xs) {
      @include square-shape(27);
      top: toRem(10);
      right: toRem(10);
    }

    .icon {
      @include center-placement;
      font-size: toRem(14);
      color: $border-grey-dark;

      @include breakpoint-down(xs) {
        font-size: toRem(13.5);
      }
    }

    &:hover {
      background: rgba($brand-accent-light, 0.5);
    }
  }

  img {
    margin-right: toRem(20);
    width: toRem(100);
    height: auto;

    @include breakpoint-down(md) {
      width: toRem(110);
    }

    @include breakpoint-down(xs) {
      width: toRem(80);
      margin-right: toRem(10);
    }

    @include breakpoint-custom-down(370) {
      width: toRem(70);
    }
  }

  .title-text {
    margin-bottom: toRem(12);
    @include font-height(15.5, 19);

    @include breakpoint-down(sm) {
      @include font-height(14.25, 17);
    }

    @include breakpoint-down(xs) {
      @include font-height(13.5, 17);
    }

    @include breakpoint-custom-down(370) {
      @include font-height(13.25, 17);
    }
  }

  .description {
    @include font-height(12.25, 22);

    @include breakpoint-down(xs) {
      @include font-height(11.5, 22);
    }

    @include breakpoint-custom-down(370) {
      @include font-height(11.25, 22);
    }

    a {
      color: $brand-inverse;

      &:hover {
        color: $brand-accent;
      }
    }
  }
}
</style>
