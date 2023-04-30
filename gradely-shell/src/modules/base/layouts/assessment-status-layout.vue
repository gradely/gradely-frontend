<template>
  <div class="assessment-status-layout">
    <!-- TABS  -->
    <div class="tabs" v-if="childInSchool">
      <router-link
        :to="{ name: tab.route }"
        class="tab smooth-transition"
        :class="isCurrentRoute === tab.route ? 'active-tab' : null"
        v-for="(tab, index) in tabs"
        :key="index"
      >
        {{ tab.title }}
      </router-link>
    </div>

    <!-- ASSESSMENT VIEW  -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "assessmentStatusLayout",

  computed: {
    ...mapGetters({
      getParentChildren: "general/getParentChildren",
      getChildClassDetails: "general/getChildClassDetails",
    }),

    isCurrentRoute() {
      return this.$route.name;
    },

    childInSchool() {
      if (this.getAuthType === "parent") {
        let active_child = this.getParentChildren.filter(
          (item) => item.id === Number(this.$route.params.id)
        );

        return active_child[0]?.user_class ? true : false;
      } else if (this.getAuthType === "student") {
        return this.getChildClassDetails?.class_detail?.has_school;
      }
    },
  },

  data: () => ({
    tabs: [
      {
        title: "New",
        route: "GradelyUserNewAssessment",
      },
      {
        title: "Completed",
        route: "GradelyUserCompletedAssessment",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.assessment-status-layout {
  .tabs {
    @include flex-row-start-nowrap;
    border-bottom: toRem(1) solid $border-grey;
    margin-bottom: toRem(8);

    .tab {
      @include font-height(13, 18);
      padding: 0 toRem(18) toRem(5);
      color: $border-grey-dark;

      @include breakpoint-down(xl) {
        @include font-height(12, 17);
      }

      @include breakpoint-down(sm) {
        @include font-height(12.5, 18);
      }

      &:hover {
        color: $color-text;
      }
    }

    .active-tab {
      border-bottom: toRem(2.5) solid $brand-accent;
      padding-bottom: toRem(4);
      color: $color-text;
    }
  }
}
</style>
