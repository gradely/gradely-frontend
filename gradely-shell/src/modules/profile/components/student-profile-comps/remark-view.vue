<template>
  <div class="remark-block">
    <!-- LEFT SECTION -->
    <div class="left-section pdr-7">
      <!-- TEACHER IMAGE  -->
      <div class="avatar rounded-5">
        <img
          v-lazy="remark.creator.image"
          :alt="$string.getStringInitials(remarkCreatorFullname)"
          v-if="remark.creator.image"
          class="avatar-img"
        />
        <div
          v-else
          class="avatar-text white-text"
          :class="$color.getProfileBgColor(remarkCreatorFullname)"
        >
          {{ $string.getStringInitials(remarkCreatorFullname) }}
        </div>
      </div>

      <!-- REMARK CONTENT  -->
      <div class="content">
        <!-- TOP SECTION (FULL NAME)  -->
        <div class="top mgb-2">
          <span class="full-name font-weight-600 color-text text-capitalize">{{
            remarkCreatorFullname
          }}</span>
          <span class="date mgl-10 color-grey-dark"
            >-- &nbsp; {{ getRemarkDate }}</span
          >
        </div>

        <!-- TEACHER SUBJECT INFO  -->
        <div class="middle color-grey-dark">{{ subject.name }} Teacher</div>

        <!-- REMARK CONTENT  -->
        <div class="bottom color-ash">
          {{ remark.remark }}
        </div>
      </div>
    </div>

    <!-- RIGHT SECTION -->
    <div class="right-section position-relative" v-if="showRemarkOption">
      <div
        class="avatar rounded-7 pointer"
        @click="toggleOptions"
        v-on-clickaway="hideOptions"
      >
        <div class="icon icon-ellipsis-h border-grey-dark"></div>
      </div>

      <!-- DROPDOWN  -->
      <div
        class="
          dropdown
          rounded-5
          box-shadow-effect
          smooth-transition smooth-animation
          white-text-bg
        "
        v-if="show_more_option"
      >
        <div class="item" @click="toggleUpdateRemark">
          <div class="icon-cover">
            <div class="icon icon-edit-pen"></div>
          </div>

          <div>Update Remark</div>
        </div>

        <div class="item" @click="toggleDeleteRemark">
          <div class="icon-cover">
            <div class="icon icon-trash"></div>
          </div>

          <div>Delete Remark</div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_delete_remark_modal">
        <delete-remark-modal
          :remark="remark"
          @closeTriggered="toggleDeleteRemark"
        />
      </transition>

      <transition name="fade" v-if="show_update_remark_modal">
        <update-remark-modal
          :remark="remark"
          :subject="subject"
          @closeTriggered="toggleUpdateRemark"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "remarkBlock",

  components: {
    deleteRemarkModal: () =>
      import(
        /* webpackChunkName: "deleteRemarkModal" */ "@/modules/profile/modals/delete-remark-modal"
      ),
    updateRemarkModal: () =>
      import(
        /* webpackChunkName: "updateRemarkModal" */ "@/modules/profile/modals/update-remark-modal"
      ),
  },

  props: {
    remark: {
      type: Object,
    },

    subject: {
      type: Object,
    },
  },

  computed: {
    getRemarkDate() {
      return this.$date.formatDate(this.remark?.created_at).timeDifference();
    },

    showRemarkOption() {
      return this.getAuthType === "teacher" || this.getAuthType === "student"
        ? Number(this.getAuthUser.id) === Number(this.remark.creator.id)
          ? true
          : false
        : false;
    },

    remarkCreatorFullname() {
      return `${this.remark.creator.firstname} ${this.remark.creator.lastname}`;
    },
  },

  data: () => ({
    show_more_option: false,
    show_update_remark_modal: false,
    show_delete_remark_modal: false,
  }),

  methods: {
    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    toggleUpdateRemark() {
      this.show_update_remark_modal = !this.show_update_remark_modal;
    },

    toggleDeleteRemark() {
      this.show_delete_remark_modal = !this.show_delete_remark_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.remark-block {
  @include flex-row-between-nowrap;
  align-items: flex-start;
  padding-bottom: toRem(15);
  margin-bottom: toRem(15);
  border-bottom: toRem(1) solid rgba($border-grey, 0.75);

  .left-section {
    @include flex-row-start-nowrap;
    align-items: flex-start;
  }

  .right-section {
    .avatar {
      background: rgba($border-grey, 0.3);
      @include square-shape(30);
      @include transition(0.4s);
      right: toRem(-12);

      @include breakpoint-down(xs) {
        @include square-shape(28);
      }

      .icon {
        @include center-placement;
        font-size: toRem(20);
      }

      &:hover {
        background: rgba($brand-inverse-light, 0.7);
      }
    }

    .dropdown {
      right: toRem(-7);
    }
  }

  .avatar {
    @include square-shape(40);
    margin-right: toRem(14);

    @include breakpoint-down(lg) {
      @include square-shape(38);
      margin-right: toRem(12);
    }

    @include breakpoint-down(sm) {
      @include square-shape(36);
      margin-right: toRem(10);
    }

    @include breakpoint-down(xs) {
      @include square-shape(33);
      margin-right: toRem(8);

      .avatar-text {
        font-size: toRem(11);
      }
    }
  }

  .content {
    .top {
      .full-name {
        @include font-height(13, 20);

        @include breakpoint-down(lg) {
          line-height: toRem(18);
        }

        @include breakpoint-down(xs) {
          @include font-height(12, 15);
        }
      }

      .date {
        @include font-height(12, 16);

        @include breakpoint-down(lg) {
          @include font-height(11.5, 16);
        }

        @include breakpoint-down(xs) {
          @include font-height(11, 15);
        }
      }
    }

    .middle {
      @include font-height(11.25, 16);
      letter-spacing: 0.02em;
      margin-bottom: toRem(12);

      @include breakpoint-down(xs) {
        @include font-height(10.5, 16);
        margin-bottom: toRem(10);
      }
    }

    .bottom {
      @include font-height(13, 23);

      @include breakpoint-down(lg) {
        @include font-height(12.25, 21);
      }

      @include breakpoint-down(sm) {
        @include font-height(12, 21);
      }

      @include breakpoint-down(xs) {
        @include font-height(11.5, 21);
      }
    }
  }
}
</style>
