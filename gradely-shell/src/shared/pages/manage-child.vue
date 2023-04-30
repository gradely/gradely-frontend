<template>
  <div class="manage-child gradely-container">
    <div class="row d-flex justify-content-center">
      <div class="wrapper">
        <div class="manage-child-block white-text-bg rounded-15">
          <!-- CHILD INFO  -->
          <child-info-block :child="getCurrentChild" />

          <!-- STUDY MODES  -->
          <study-mode-block :child="getCurrentChild" />

          <!-- LOGIN DETAIL BLOCK -->
          <login-detail-block :child="getCurrentChild" />

          <!-- CATCHUP REMINDER -->
          <catchup-reminder-block v-if="true" />

          <!-- ACADEMIC INFO -->
          <academic-info-block :child="getCurrentChild" />

          <!-- REMOVE CHILD -->
          <div
            class="remove-child-block rounded-5 pointer text-center color-grey-dark smooth-transition"
            @click="toggleUnlinkChild"
          >Remove Child Account</div>
        </div>

        <!-- ADD CHILD CARD -->
        <router-link
          v-if="!hasMultipleChildren"
          :to="{
                name: 'ParentAddChild',
                query: { page: this.$route.path },
              }"
          class="add-child-card smooth-transition overflow-hidden rounded-15 pointer"
        >
          <!-- ADD CARD -->
          <div class="add-card smooth-transition">
            <div class="icon icon-plus brand-navy"></div>
          </div>

          <!-- ADD TEXT -->
          <div>
            <div class="add-text font-weight-700 brand-navy">Add another Child</div>
            <div
              class="gfont-12 mgt-7 color-grey-dark d-none d-sm-block"
            >Create or find your child on Gradely</div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_unlink_modal">
        <unlink-child-account-modal :child="getCurrentChild" @closeTriggered="toggleUnlinkChild" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import childInfoBlock from "@/shared/components/manage-child-comps/child-info-block";
import studyModeBlock from "@/shared/components/manage-child-comps/study-mode-block";
import loginDetailBlock from "@/shared/components/manage-child-comps/login-detail-block";
import catchupReminderBlock from "@/shared/components/manage-child-comps/catchup-reminder-block";
import academicInfoBlock from "@/shared/components/manage-child-comps/academic-info-block";

export default {
  name: "manageChild",

  components: {
    childInfoBlock,
    studyModeBlock,
    loginDetailBlock,
    catchupReminderBlock,
    academicInfoBlock,
    unlinkChildAccountModal: () =>
      import(
        /* webpackChunkName: "unlinkChildAccountModal" */ "@/shared/modals/unlink-child-account-modal"
      ),
  },

  computed: {
    ...mapGetters({ getChildrenList: "general/getParentChildren" }),

    getCurrentChild() {
      return Object.keys(this.child_data).length ? this.child_data : false;
    },

    hasMultipleChildren() {
      return this.getChildrenList?.length > 1 ? true : false;
    },
  },

  data() {
    return {
      child_data: {},
      show_unlink_modal: false,
    };
  },

  created() {
    this.$bus.$on("updateChildrenList", () => {
      this.emptyParentChildList();
      this.getSelectedChild();
    });
  },

  mounted() {
    this.getSelectedChild();
  },

  methods: {
    ...mapActions({
      getParentChildren: "general/getParentChildren",
      emptyParentChildList: "general/emptyParentChildList",
    }),

    getSelectedChild() {
      // this.child_data = false;

      this.getParentChildren()
        .then((response) => {
          response.data.map((child) => {
            if (Number(child.id) === Number(this.$route.params.id)) {
              this.child_data = child;
            }
          });
        })
        .catch();
    },

    toggleUnlinkChild() {
      this.show_unlink_modal = !this.show_unlink_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.manage-child {
  margin-top: toRem(110);
  margin-bottom: toRem(40);

  @include breakpoint-down(md) {
    margin-top: toRem(90);
  }

  .wrapper {
    width: 61%;

    @include breakpoint-down(xl) {
      width: 65%;
    }

    @include breakpoint-down(lg) {
      width: 70%;
    }

    @include breakpoint-down(md) {
      width: 90%;
    }

    @include breakpoint-down(xs) {
      width: 95%;
    }
  }

  .manage-child-block {
    padding: toRem(50);

    @include breakpoint-down(xl) {
      padding: toRem(35);
    }

    @include breakpoint-down(sm) {
      padding: toRem(30) toRem(25);
    }

    @include breakpoint-down(xs) {
      padding: toRem(25) toRem(15);
    }
  }

  .remove-child-block {
    border: toRem(1) solid $brand-red-light;
    @include font-height(13.5, 19);
    padding: toRem(15) toRem(20);
    margin-top: toRem(40);

    @include breakpoint-down(md) {
      @include font-height(12.75, 17);
    }

    @include breakpoint-down(xs) {
      @include font-height(12, 17);
    }

    &:hover {
      border: toRem(1) solid $brand-tonic;
      background: $brand-red-light;
      color: $brand-navy !important;
    }
  }

  .add-child-card {
    @include flex-row-start-nowrap;
    gap: 0 toRem(20);
    width: 100%;
    border: 1.5px dashed $border-grey;
    background: $white-text;
    margin-top: toRem(25);
    margin-bottom: toRem(55);
    padding: toRem(13);
    transition: all ease-in-out 0.25s;

    &:hover {
      // background: rgba($brand-inverse-light, 0.75);
      background: hsla(0, 0%, 96.1%, 0.5);

      .add-card {
        background: rgba($brand-accent-light, 0.75);
      }
    }

    @include breakpoint-down(md) {
      padding: toRem(10);
    }

    .add-card {
      @include square-shape(55);
      border-radius: toRem(15);
      background: $color-white;
      position: relative;

      @include breakpoint-down(md) {
        @include square-shape(50);
        border-radius: toRem(12);
      }

      @include breakpoint-down(sm) {
        @include square-shape(45);
        border-radius: toRem(12);
      }

      .icon {
        @include center-placement;
        font-size: toRem(40);

        @include breakpoint-down(md) {
          font-size: toRem(35);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(30);
        }
      }
    }

    .add-text {
      @include font-height(16.75, 19);

      @include breakpoint-down(md) {
        @include font-height(16, 18);
      }

      @include breakpoint-down(sm) {
        @include font-height(15, 18);
      }
    }
  }
}
</style>
