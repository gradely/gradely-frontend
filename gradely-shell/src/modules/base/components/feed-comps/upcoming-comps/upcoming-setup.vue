<template>
  <div class="upcoming-setup">
    <div class="text brand-inverse-light">
      You have no upcoming activities. Here are things you can do to fix that.
    </div>

    <!-- ACTIVITIES  -->
    <router-link
      to
      class="activity"
      v-for="(todo, index) in child_todo"
      :key="index"
    >
      <div class="avatar" :class="todo.status ? 'complete' : null">
        <div
          class="icon"
          :class="todo.status ? 'icon-accept' : 'icon-plus'"
        ></div>
      </div>

      <div class="title brand-inverse-light">{{ todo.text }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "upcomingSetup",

  data: () => ({
    parent_todo: [
      {
        status: true,
        text: "Find your school",
      },
      {
        status: false,
        text: "Join a Class",
      },
      {
        status: false,
        text: "Take Practice Test",
      },
    ],

    child_todo: [
      {
        status: true,
        text: "Find your school",
      },
      {
        status: false,
        text: "Invite Your Parent",
      },
      {
        status: false,
        text: "Take Diagnostic Test",
      },
      {
        status: false,
        text: "Update Profile",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.upcoming-setup {
  .text {
    @include font-height(13, 22);
    margin-bottom: toRem(10);

    @include breakpoint-down(xl) {
      @include font-height(12, 18);
    }

    @include breakpoint-down(xs) {
      @include font-height(11.5, 18);
    }
  }

  .activity {
    @include flex-row-start-nowrap;
    padding: toRem(14) toRem(5);
    border-top: toRem(1) solid rgba($black-text, 0.1);
    border-bottom: toRem(1) solid rgba($black-text, 0.1);

    @include breakpoint-down(xl) {
      padding: toRem(12) toRem(5);
    }

    .avatar {
      @include square-shape(20);
      margin-right: toRem(10);
      border: toRem(1) solid $color-grey-light;

      .icon {
        @include center-placement;
        font-size: toRem(12);
        margin-top: toRem(1);
        color: $brand-accent;

        @include breakpoint-down(xl) {
          font-size: toRem(11.5);
          margin-left: toRem(-1);
        }
      }
    }

    .complete {
      border: toRem(1) solid $brand-inverse;
      background: $brand-inverse;

      .icon {
        font-size: toRem(12.5);
        color: $white-text;

        @include breakpoint-down(xl) {
          font-size: toRem(12);
        }
      }
    }

    .title {
      @include font-height(11.5, 15);

      @include breakpoint-down(xl) {
        @include font-height(10.5, 15);
      }
    }
  }
}
</style>
