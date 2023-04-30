<template>
  <div
    class="
      school-class-level
      navigation-shadow-effect
      rounded-5
      overflow-hidden
      mgb-5
    "
  >
    <!-- CLASS TOP  -->
    <div class="class-top pointer" @click="toggleAccordion">
      <!-- LEFT  -->
      <div
        class="
          left-set
          d-flex
          justify-content-start
          align-items-center
          color-text
        "
      >
        <div
          class="icon icon-caret-up mgr-10 smooth-transition"
          :class="show_accordion ? null : 'rotate-180'"
        ></div>
        <div class="class-level">{{ class_level }}</div>
      </div>

      <!-- RIGHT  -->
      <div class="right-set color-grey-dark">
        {{ class_branch.length }}
        {{ class_branch.length === 1 ? " Arm" : " Arms" }}
      </div>
    </div>

    <!-- CLASS BOTTOM  -->
    <div class="class-bottom smooth-transition" v-if="show_accordion">
      <!-- CLASS ROWS  -->
      <div class="class-rows smooth-transition" ref="classLevelRow">
        <school-class-arm
          v-for="(branch, index) in class_branch"
          :key="index"
          :class_detail="branch"
          :class_level="class_level"
          :class_level_index="class_index"
          :class_arm_index="index"
        />
      </div>

      <!-- CLASS NAVIGATIONS  -->
      <div class="class-navigations">
        <div
          class="left-set d-flex justify-content-start align-items-center"
          @click="toggleModal"
        >
          <div class="avatar mgr-10 border-color-grey-light">
            <div class="icon-plus brand-accent"></div>
          </div>

          <div
            class="text brand-accent font-weight-500 pointer smooth-transition"
          >
            Add another Arm
          </div>
        </div>

        <!-- NAVS  -->
        <div
          class="right-set d-flex justify-content-end align-items-center"
          v-if="false"
        >
          <!-- LEFT   -->
          <div
            class="nav box-shadow-effect nav-left mgr-6"
            @click="scrollClassArms(-150)"
          >
            <div class="icon icon-caret-left"></div>
          </div>

          <!-- RIGHT   -->
          <div
            class="nav box-shadow-effect nav-right mgl-6"
            @click="scrollClassArms(+150)"
          >
            <div class="icon icon-caret-right"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_modal">
        <add-class-arm-modal
          :class_id="getClassID"
          :class_level="class_level"
          @closeTriggered="toggleModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "schoolClassLevel",

  components: {
    schoolClassArm: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "DashboardEntry" */ "@/modules/dashboard/components/home-comps/school-class-arm"
      ),
    addClassArmModal: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName: "modal" */ "@/modules/dashboard/modals/add-class-arm-modal"
      ),
  },

  props: {
    class_index: Number,

    class_level: {
      type: String,
      required: true,
    },

    class_branch: Array,
  },

  computed: {
    getClassID() {
      return Number(this.class_branch[0].global_class_id);
    },
  },

  data: () => ({
    show_accordion: false,
    show_modal: false,
  }),

  mounted() {
    // TOGGLE ACCORDION FOR INDEX 0
    if (this.class_index == 0) this.toggleAccordion();
  },

  methods: {
    toggleAccordion() {
      this.show_accordion = !this.show_accordion;
    },

    toggleModal() {
      this.show_modal = !this.show_modal;
    },

    scrollClassArms(scroll_value) {
      let class_level_row = this.$refs.classLevelRow;
      class_level_row.scrollLeft += scroll_value;
      class_level_row.scrollBehaviour = "smooth";
    },
  },
};
</script>

<style lang="scss" scoped>
.school-class-level {
  .class-top {
    @include flex-row-between-nowrap;
    padding: toRem(15) toRem(16);
    background: $white-text;

    @include breakpoint-down(lg) {
      padding: toRem(14) toRem(10);
    }

    @include breakpoint-down(sm) {
      padding: toRem(14) toRem(10) toRem(14) toRem(7);
    }

    .left-set {
      .icon {
        font-size: toRem(18);

        @include breakpoint-down(lg) {
          margin-right: 7px !important;
        }

        @include breakpoint-down(sm) {
          margin-right: 6px !important;
        }
      }

      .class-level {
        @include font-height(13.5, 18);

        @include breakpoint-down(lg) {
          @include font-height(13, 17);
        }

        @include breakpoint-down(sm) {
          @include font-height(12.75, 16);
        }

        @include breakpoint-down(xs) {
          @include font-height(11.75, 16);
        }
      }
    }

    .right-set {
      @include font-height(13.25, 18);

      @include breakpoint-down(lg) {
        @include font-height(12.5, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(11.75, 17);
      }
    }
  }

  .class-bottom {
    border: toRem(1) solid $border-grey;
    padding: toRem(15) 0 toRem(25) toRem(12);
    background: rgba($white-text, 0.4);

    @include breakpoint-down(xl) {
      padding: toRem(15) 0 toRem(22) toRem(16);
    }

    @include breakpoint-down(lg) {
      padding: toRem(15) 0 toRem(20) toRem(10);
    }

    .class-rows {
      @include flex-row-start-wrap;
      margin-bottom: toRem(14);
      // overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .class-navigations {
      @include flex-row-between-nowrap;
      padding-right: toRem(20);

      @include breakpoint-down(xl) {
        padding-right: toRem(16);
      }

      @include breakpoint-down(lg) {
        padding-right: toRem(10);
      }

      .avatar {
        @include square-shape(26);
        .icon-plus {
          @include center-placement;
        }

        @include breakpoint-down(lg) {
          @include square-shape(25);
        }

        @include breakpoint-down(sm) {
          @include square-shape(24);
        }
      }

      .text {
        @include font-height(13.25, 19);

        @include breakpoint-down(lg) {
          @include font-height(13, 18);
        }

        @include breakpoint-down(sm) {
          @include font-height(12.5, 17);
        }

        @include breakpoint-down(xs) {
          @include font-height(12, 17);
        }

        &:hover {
          color: $brand-inverse !important;
        }
      }

      .nav {
        background: $white-text;
        @include square-shape(30);
        @include transition(0.5s);
        border-radius: 50%;
        cursor: pointer;

        @include breakpoint-down(lg) {
          @include square-shape(27);
        }

        &:hover {
          background: $brand-inverse-light;
        }

        .icon {
          @include flex-column-center;
          @include center-placement;
          position: relative;
          color: $color-ash;
          font-size: toRem(13);

          @include breakpoint-down(lg) {
            font-size: toRem(12);
          }

          @include breakpoint-down(xs) {
            font-size: toRem(11);
          }
        }
      }
    }
  }
}
</style>
