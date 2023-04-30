<template>
  <div class="post-comment-entry padded-area smooth-transition">
    <!-- LEFT SECTION  -->
    <div class="left">
      <div class="avatar">
        <img
          v-lazy="getAuthUser.image"
          :alt="$string.getStringInitials(getAuthUser.full_name)"
          class="avatar-img"
          v-if="getAuthUser.image"
        />

        <div
          v-else
          class="avatar-text"
          :class="$color.getProfileBgColor(getAuthUser.full_name)"
        >
          {{ $string.getStringInitials(getAuthUser.full_name) }}
        </div>
      </div>
    </div>

    <!-- RIGHT SECTION  -->
    <div
      class="right rounded-10 border-brand-inverse-light w-100 overflow-hidden smooth-transition"
    >
      <omponent
        :is="state"
        :post="post"
        @switchState="toggleCommentState"
      ></omponent>
    </div>
  </div>
</template>

<script>
import commentCloseState from "@/modules/base/components/feed-comps/post-block-comps/comment-close-state";

export default {
  name: "postCommentEntry",

  components: {
    commentCloseState,
    commentOpenState: () =>
      import(
        /* webpackChunkName: "commentOpenState" */ "@/modules/base/components/feed-comps/post-block-comps/comment-open-state"
      ),
  },

  props: {
    post: {
      type: Object,
    },
  },

  data: () => ({
    state: "commentCloseState",
  }),

  methods: {
    toggleCommentState() {
      this.state =
        this.state === "commentCloseState"
          ? "commentOpenState"
          : "commentCloseState";
    },
  },
};
</script>

<style lang="scss" scoped>
.post-comment-entry {
  @include flex-row-start-nowrap;
  align-items: flex-start;

  .left {
    .avatar {
      margin-right: toRem(10);
      @include square-shape(32);
      border-radius: toRem(5);

      .avatar-text {
        font-size: toRem(11.75);
      }

      @include breakpoint-down(xl) {
        margin-right: toRem(7);
        @include square-shape(32);

        .avatar-text {
          font-size: toRem(11.25);
        }
      }

      @include breakpoint-down(lg) {
        margin-right: toRem(10);
        @include square-shape(33);

        .avatar-text {
          font-size: toRem(11);
        }
      }

      @include breakpoint-down(sm) {
        margin-right: toRem(8);
        @include square-shape(32);

        .avatar-text {
          font-size: toRem(10.75);
        }
      }

      @include breakpoint-down(xs) {
        margin-right: toRem(6);
        @include square-shape(30);
      }
    }
  }
}
</style>
