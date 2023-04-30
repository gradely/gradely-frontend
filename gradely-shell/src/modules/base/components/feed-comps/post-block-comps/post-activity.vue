<template>
  <div class="position-relative d-flex justify-content-start w-100">
    <div class="spacer"></div>

    <div class="activity-wrapper padded-area pdt-0 pdb-0 w-100">
      <div class="post-activity">
        <!-- LIKE  -->
        <div
          class="activity like"
          :class="{ 'post-liked': is_liked }"
          :title="is_liked ? 'Dislike post' : 'Like post'"
          @click="likePost"
        >
          <div class="avatar">
            <div class="icon icon-thumbs-up"></div>
          </div>

          <!-- ACTIVITY TEXT  -->
          <div class="text">
            {{ is_liked ? "Liked" : "Like" }}
            <span
              class="mgl-1 position-relative smooth-animation"
              v-if="Number(like_count) > 0"
              >({{ like_count }})</span
            >
          </div>
        </div>

        <!-- COMMENT  -->
        <div
          class="activity"
          @click="$emit('commentClicked')"
          title="Make a comment"
        >
          <div class="avatar">
            <div class="icon icon-chat"></div>
          </div>

          <!-- ACTIVITY TEXT -->
          <div class="text">
            Comment
            <span
              class="mgl-1 position-relative smooth-animation"
              v-if="Number(comment_count) > 0"
              >({{ comment_count }})</span
            >
          </div>
        </div>

        <!-- SHARE  -->
        <div class="activity" @click="toggleSharePost" title="Share post">
          <div class="avatar">
            <div class="icon icon-share"></div>
          </div>

          <!-- ACTIVITY TEXT  -->
          <div class="text">Share</div>
        </div>
      </div>

      <!-- MODALS -->
      <portal to="gradely-modals">
        <transition name="fade" v-if="show_share_post_modal">
          <share-post-modal
            :token="post.token"
            @closeTriggered="toggleSharePost"
          />
        </transition>
      </portal>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "postActivity",

  components: {
    sharePostModal: () =>
      import(
        /* webpackChunkName: "sharePostModal" */ "@/modules/base/modals/feeds/share-post-modal"
      ),
  },

  props: {
    post: {
      type: Object,
    },
  },

  data() {
    return {
      show_share_post_modal: false,

      is_liked: this.post?.myLike ?? this.post?.my_like_status,
      like_count: Number(this.post?.likesCount ?? this.post?.like_count),
      comment_count: Number(
        this.post?.commentCount ?? this.post?.comment_count
      ),
    };
  },

  created() {
    this.$bus.$on("increaseCommentCount", (id) => {
      if (this.post.id === id) this.comment_count += 1;
    });

    this.$bus.$on("decreaseCommentCount", (id) => {
      if (this.post.id === id) this.comment_count -= 1;
    });
  },

  methods: {
    ...mapActions({ likeFeedPost: "dbFeeds/likeFeedPost" }),

    toggleSharePost() {
      this.show_share_post_modal = !this.show_share_post_modal;
    },

    togglePostLike() {
      this.is_liked = !this.is_liked;

      this.like_count = this.is_liked
        ? Number(this.like_count) + 1
        : Number(this.like_count) - 1;
    },

    likePost() {
      if (this.getAuthToken) {
        this.togglePostLike();

        this.likeFeedPost(this.post.id)
          .then((response) => {
            // console.log(response);

            if (response.data === "feed liked")
              this.pushAlert("Post liked successfully", "success");
            else if (response.data === "feed unliked")
              this.pushAlert("Post unliked successfully", "success");
            else this.pushAlert("Activity on post not successful", "warning");
          })
          .catch(() => {
            this.pushAlert("Activity on post not successful", "error");
            this.togglePostLike();
          });
      } else {
        this.pushAlert("You need to be logged in to like a post!", "warning");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-wrapper {
  .post-activity {
    @include flex-row-between-nowrap;
    border-top: toRem(1) solid darken($brand-inverse-light, 15);
    padding: toRem(9) toRem(30);

    @include breakpoint-down(xl) {
      padding: toRem(9) toRem(12);
    }

    @include breakpoint-down(lg) {
      padding: toRem(9) toRem(35);
    }

    @include breakpoint-down(xs) {
      padding: toRem(9) toRem(13);
    }

    @include breakpoint-custom-down(350) {
      padding: toRem(9);
    }

    .activity {
      @include flex-row-start-nowrap;
      @include transition(0.4s);
      cursor: pointer;

      .avatar {
        @include square-shape(30);

        @include breakpoint-down(xl) {
          @include square-shape(27);
        }

        @include breakpoint-down(xs) {
          @include square-shape(25);
        }

        .icon {
          @include transition(0.4s);
          @include center-placement;
          color: $color-text;
          font-size: toRem(16);

          @include breakpoint-down(xs) {
            font-size: toRem(15);
          }
        }
      }

      .text {
        @include transition(0.4s);
        @include font-height(12.5, 17);
        color: $color-ash;

        @include breakpoint-down(lg) {
          @include font-height(12.25, 17);
        }

        @include breakpoint-down(xs) {
          @include font-height(12, 16);
        }
      }

      &:hover {
        .avatar {
          .icon {
            color: $brand-inverse;
          }
        }

        .text {
          color: $brand-inverse;
        }
      }
    }

    .like {
      .avatar {
        .icon {
          margin-top: toRem(-1.5);
        }
      }
    }

    .post-liked {
      .avatar {
        .icon {
          color: $brand-inverse !important;
        }
      }

      .text {
        color: $brand-inverse !important;
      }
    }
  }
}
</style>
