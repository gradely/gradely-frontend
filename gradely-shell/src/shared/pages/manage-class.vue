<template>
  <div class="manage-class gradely-container">
    <div class="row d-flex justify-content-center">
      <div class="wrapper">
        <div class="manage-class-block white-text-bg rounded-15">
          <!-- CLASS INFO  -->
          <class-info-block :class_detail="class_detail" />

          <!-- CLASS SUBJECTS -->
          <class-subjects-block
            :class_subjects="class_subjects"
            :class_id="Number(class_detail.id)"
            :global_class_id="Number(class_detail.global_class_id)"
          />

          <!-- ACADEMIC INFO -->
          <class-academic-info :class_detail="class_detail" />
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_unlink_modal">
        <unlink-child-account-modal @closeTriggered="toggleUnlinkChild" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import classInfoBlock from "@/shared/components/manage-class-comps/class-info-block";
import classSubjectsBlock from "@/shared/components/manage-class-comps/class-subjects-block";
import classAcademicInfo from "@/shared/components/manage-class-comps/class-academic-info";

export default {
  name: "manageClass",

  components: {
    classInfoBlock,
    classSubjectsBlock,
    classAcademicInfo,
    unlinkChildAccountModal: () =>
      import(
        /* webpackChunkName: "unlinkChildAccountModal" */ "@/shared/modals/unlink-child-account-modal"
      ),
  },

  data() {
    return {
      show_unlink_modal: false,
      class_detail: {},
      class_subjects: [],
    };
  },

  created() {
    this.$bus.$on("remountSubjects", () => this.getSelectedClassSubjects());
  },

  mounted() {
    this.getSelectedClassDetails();
    this.getSelectedClassSubjects();
  },

  methods: {
    ...mapActions({
      getClassDetail: "general/getClassDetail",
      getTeacherSubjectsInClass: "general/getTeacherSubjectsInClass",
    }),

    getSelectedClassDetails() {
      this.getClassDetail(this.$route.params.id)
        .then((response) => (this.class_detail = response?.data ?? {}))
        .catch((err) => console.log(err));
    },

    getSelectedClassSubjects() {
      this.getTeacherSubjectsInClass(this.$route.params.id)
        .then((response) => (this.class_subjects = response?.data ?? []))
        .catch((err) => console.log(err));
    },

    toggleUnlinkChild() {
      this.show_unlink_modal = !this.show_unlink_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.manage-class {
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

  .manage-class-block {
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
}
</style>
