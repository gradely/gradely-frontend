<template>
  <div class="academic-info-block" v-if="getClassName || getSchoolName">
    <div class="title-text font-weight-600 color-text">CLASS INFORMATION</div>

    <!-- DETAIL BLOCK  -->
    <div class="detail-block rounded-7 mgb-7" v-if="getClassName">
      <!-- LEFT -->
      <div class="left">
        <div class="avatar brand-inverse-light-bg">
          <img v-lazy="mxStaticImg('ClassImg.png')" alt="" class="avatar-img" />
        </div>

        <!-- INFO -->
        <div class="info">
          <div class="title color-text text-capitalize">{{ getClassName }}</div>
          <div class="value color-grey-dark">Current Class</div>
        </div>
      </div>

      <!-- RIGHT -->
      <div
        class="block-link font-weight-700 pointer smooth-transition"
        @click="toggleLeaveClass"
      >
        LEAVE CLASS
      </div>
    </div>

    <div class="detail-block rounded-7" v-if="getSchoolName">
      <!-- LEFT -->
      <div class="left">
        <div class="avatar brand-inverse-light-bg">
          <img
            v-lazy="mxStaticImg('SchoolImg.png')"
            alt=""
            class="avatar-img"
          />
        </div>

        <!-- INFO -->
        <div class="info">
          <div class="title color-text text-capitalize">
            {{ getSchoolName }}
          </div>
          <div class="value color-grey-dark">Current School</div>
        </div>
      </div>

      <!-- RIGHT -->
      <div
        class="block-link font-weight-700 pointer smooth-transition"
        @click="toggleLeaveSchool"
      >
        LEAVE SCHOOL
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_leave_class">
        <teacher-leave-class-modal @closeTriggered="toggleLeaveClass" />
      </transition>

      <transition name="fade" v-if="show_leave_school">
        <teacher-leave-school-modal
          :school_id="Number(getSchoolId)"
          :school_name="getSchoolName"
          @closeTriggered="toggleLeaveSchool"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "classAcademicInfo",

  components: {
    teacherLeaveClassModal: () =>
      import(
        /* webpackChunkName: "unlinkChildAccountModal" */ "@/shared/modals/teacher-leave-class-modal"
      ),
    teacherLeaveSchoolModal: () =>
      import(
        /* webpackChunkName: "unlinkChildAccountModal" */ "@/shared/modals/teacher-leave-school-modal"
      ),
  },

  props: {
    class_detail: {
      type: Object,
    },
  },

  computed: {
    getClassName() {
      return this.class_detail?.class_name ?? "No Class";
    },

    getSchoolName() {
      return this.class_detail?.school?.name ?? false;
    },

    getSchoolId() {
      return this.class_detail?.school?.id ?? 0;
    },
  },

  data: () => ({
    show_leave_class: false,
    show_leave_school: false,
  }),

  methods: {
    toggleLeaveClass() {
      this.show_leave_class = !this.show_leave_class;
    },

    toggleLeaveSchool() {
      this.show_leave_school = !this.show_leave_school;
    },
  },
};
</script>

<style lang="scss" scoped>
.academic-info-block {
  margin-bottom: toRem(20);
  .title-text {
    @include font-height(13.25, 18);
    margin-bottom: toRem(10);
    padding-left: toRem(10);

    @include breakpoint-down(lg) {
      @include font-height(12, 17);
    }

    @include breakpoint-down(sm) {
      @include font-height(11, 16);
    }
  }

  .detail-block {
    padding: toRem(12);
    border: toRem(1) solid $brand-inverse-light;
    @include flex-row-between-wrap;

    @include breakpoint-down(xs) {
      padding: toRem(8);
    }

    .left {
      @include flex-row-start-nowrap;
      padding-right: toRem(5);

      .avatar {
        @include square-shape(40);
        border-radius: toRem(10);
        margin-right: toRem(12);

        @include breakpoint-down(xs) {
          @include square-shape(35);
          margin-right: toRem(8);
        }

        img {
          @include square-shape(22);

          @include breakpoint-down(xs) {
            @include square-shape(19);
          }
        }
      }

      .title {
        @include font-height(13.25, 19);

        @include breakpoint-down(lg) {
          @include font-height(12, 17);
        }

        @include breakpoint-down(xs) {
          @include font-height(11.5, 16);
        }
      }

      .value {
        @include font-height(11.5, 15);
        margin-top: toRem(3);
      }
    }

    .block-link {
      @include font-height(12, 16);
      color: $brand-accent;

      @include breakpoint-down(lg) {
        @include font-height(11, 16);
      }

      @include breakpoint-down(xs) {
        @include font-height(10.5, 18);
      }

      &:hover {
        color: $brand-inverse;
      }
    }
  }
}
</style>
