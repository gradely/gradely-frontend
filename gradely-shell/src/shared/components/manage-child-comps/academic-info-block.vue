<template>
  <div class="academic-info-block">
    <div class="title-text font-weight-600 color-text">ACADEMIC INFORMATION</div>

    <!-- DETAIL BLOCK  -->
    <div class="detail-block rounded-7 mgb-7">
      <!-- LEFT -->
      <div class="left">
        <div class="avatar brand-inverse-light-bg">
          <img v-lazy="mxStaticImg('ClassImg.png')" alt class="avatar-img" />
        </div>

        <!-- INFO -->
        <div class="info" v-if="childInSchool">
          <div class="value color-grey-dark mgb-5">Class Level</div>
          <div class="title color-text">{{ getGlobalClassName }}</div>
        </div>
        <div class="title color-text" v-else>{{ getGlobalClassName }}</div>
      </div>

      <!-- RIGHT -->
      <div
        class="block-link font-weight-700 pointer smooth-transition"
        @click="toggleChildClass"
        v-if="!childInSchool"
      >UPDATE CLASS</div>
    </div>

    <div class="detail-block rounded-7">
      <!-- LEFT -->
      <div class="left">
        <div class="avatar brand-inverse-light-bg">
          <img v-lazy="mxStaticImg('SchoolImg.png')" alt class="avatar-img" />
        </div>

        <!-- INFO -->
        <div class="info" v-if="childInSchool">
          <div class="title color-text mgb-5">{{ getClassName }}</div>
          <div class="value color-grey-dark">{{ getSchoolName }}</div>
        </div>
        <div class="title color-text mgb-5" v-else>{{getSchoolName}}</div>
      </div>

      <!-- RIGHT -->
      <div class="d-flex items-center gap-2" v-if="childInSchool">
        <div
          class="block-link ash-link font-weight-700 pointer smooth-transition"
          @click="toggleRemoveChildSchool"
        >REMOVE</div>
        <div
          class="block-link font-weight-700 pointer smooth-transition"
          @click="toggleChildSchool"
        >CHANGE</div>
      </div>

      <div
        class="block-link font-weight-700 pointer smooth-transition"
        @click="toggleChildSchool"
        v-else
      >FIND YOUR SCHOOL</div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="change_class_modal">
        <update-child-class-modal @closeTriggered="toggleChildClass" :child="child" />
      </transition>

      <transition name="fade" v-if="change_school_modal">
        <update-child-school-modal @closeTriggered="toggleChildSchool" :child="child" />
      </transition>

      <transition name="fade" v-if="remove_school_modal">
        <remove-child-school-modal
          @closeTriggered="toggleRemoveChildSchool"
          :child="child"
          :schoolName="getSchoolName"
          :schoolID="Number(getSchoolID)"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import updateChildClassModal from "@/shared/modals/update-child-class-modal";
import updateChildSchoolModal from "@/shared/modals/update-child-school-modal";
import removeChildSchoolModal from "@/shared/modals/remove-child-school-modal";
export default {
  name: "academicInfoBlock",

  components: {
    updateChildClassModal,
    updateChildSchoolModal,
    removeChildSchoolModal,
  },

  props: {
    child: {
      type: [Object, Boolean],
    },
  },

  computed: {
    getGlobalClassName() {
      let class_name =
        this.child?.class?.class_name || this.child?.class?.description;
      return class_name ? class_name : "No Class";
    },

    getClassName() {
      let class_name = this.child?.child_class_details?.class_name;
      return class_name ? class_name : "No Class";
    },

    getSchoolName() {
      let school_name = this.child?.child_class_details?.school_name;
      return school_name ? school_name : "Not connected to a school";
    },

    getSchoolID() {
      return this.child?.class?.school_id;
    },

    childInSchool() {
      return this.child?.child_class_details?.has_school;
    },
  },

  data() {
    return {
      change_class_modal: false,
      change_school_modal: false,
      remove_school_modal: false,
    };
  },

  methods: {
    toggleChildClass() {
      this.change_class_modal = !this.change_class_modal;
    },

    toggleChildSchool() {
      this.change_school_modal = !this.change_school_modal;
    },

    toggleRemoveChildSchool() {
      this.remove_school_modal = !this.remove_school_modal;
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

    .ash-link {
      color: $color-ash;
      &:hover {
        color: $brand-red;
      }
    }
  }
}
</style>
