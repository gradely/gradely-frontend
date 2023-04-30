<template>
  <div class="upcoming-default">
    <div class="avatar border-grey-bg">
      <div class="icon icon-pie border-grey-dark"></div>
    </div>

    <div class="text brand-inverse-light">
      {{ getEmptyMessage }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "upcomingDefault",

  computed: {
    ...mapGetters({
      getParentChildren: "general/getParentChildren",
      getTeacherClassList: "general/getTeacherClassList",
    }),

    getEmptyMessage() {
      if (this.getAuthType === "school" || this.getAuthType === "teacher") {
        if (
          this.getAuthType === "teacher" &&
          !this.getTeacherClassList?.classes?.length
        )
          return "Join a class to get started on Gradely!";
        else return "There are no upcoming activities for this class";
      } else if (this.getAuthType === "parent") {
        return this.getParentChildren.length
          ? "There are no upcoming activities for this child"
          : "Add your child to get started on Gradely!";
      } else return "There are no upcoming activities for you today!";
    },
  },
};
</script>

<style lang="scss" scoped>
.upcoming-default {
  @include flex-row-start-nowrap;
  margin-top: toRem(20);
  padding-bottom: toRem(10);
  border-bottom: toRem(1) solid rgba($black-text, 0.1);

  @include breakpoint-down(xs) {
    // margin-top: toRem(30);
  }

  .avatar {
    @include square-shape(35);
    margin-right: toRem(8);

    @include breakpoint-down(xs) {
      margin-right: toRem(10);
    }

    .icon {
      @include center-placement;
      font-size: toRem(19);
    }
  }

  .text {
    @include font-height(12, 18);
    padding-right: toRem(6);
  }
}
</style>
