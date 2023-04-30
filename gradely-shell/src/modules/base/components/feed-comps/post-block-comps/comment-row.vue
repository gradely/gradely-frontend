<template>
  <div class="parent-comment w-100">
    <!-- LEFT  -->
    <div class="left">
      <div class="avatar">
        <img
          v-lazy="getUserImage"
          :alt="$string.getStringInitials(getUserFullname)"
          class="avatar-img"
          v-if="getUserImage"
        />

        <div
          v-else
          class="avatar-text"
          :class="$color.getProfileBgColor(getUserFullname)"
        >
          {{ $string.getStringInitials(getUserFullname) }}
        </div>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="right w-100">
      <!-- COMMENT INTRO -->
      <div class="comment-intro">
        <!-- USER INFO -->
        <div class="user-info">
          <div class="name brand-primary font-weight-500">
            {{ getUserFullname }}
          </div>
          <div class="time color-grey-dark">{{ getCommentDate }}</div>
        </div>

        <!-- OPTION -->
        <div
          v-if="getAuthToken"
          class="avatar pointer"
          @click="toggleOptions"
          v-on-clickaway="hideOptions"
        >
          <div class="icon icon-caret-down border-grey-dark"></div>

          <!-- DROPDOWN -->
          <div
            class="
              dropdown
              rounded-5
              box-shadow-effect
              smooth-transition smooth-animation
              white-text-bg
            "
            v-if="show_more_option"
          >
            <div class="item" @click="toggleReportComment">
              <div class="icon-cover">
                <div class="icon icon-announcement-speaker"></div>
              </div>
              <div>Report Comment</div>
            </div>

            <div
              class="item"
              @click="toggleDeleteComment"
              v-if="getAuthUser.id === comment.user_id"
            >
              <div class="icon-cover">
                <div class="icon icon-trash"></div>
              </div>
              <div>Delete Comment</div>
            </div>
          </div>
        </div>
      </div>

      <!-- COMMENT CONTENT -->
      <div class="comment-content">
        <div class="text color-text mgb-10" v-html="comment.comment"></div>

        <!-- ATTACHMENT -->
        <div
          class="
            attachment
            position-relative
            w-100
            rounded-10
            overflow-hidden
            pointer
            smooth-transition
          "
          v-if="comment.attachment"
          @click="togglePreviewer"
        >
          <img v-lazy="comment.attachment" alt="" />
        </div>
      </div>

      <!-- COMMENT ACTIVITY -->
      <div class="comment-activity" v-if="getAuthToken">
        <div
          class="activity pointer"
          :class="{ liked: is_liked }"
          :title="is_liked ? 'Dislike comment' : 'Like comment'"
          @click="likeComment"
        >
          <span class="icon icon-thumbs-up mgr-3"></span>
          {{ is_liked ? "Liked" : "Like" }}
        </div>

        <template v-if="Number(like_count) > 0">
          <div class="bullet smooth-transition"></div>
          <!-- LIKE COUNT -->
          <div class="counter smooth-animation">
            {{ like_count }} {{ Number(like_count) === 1 ? "Like" : "Likes" }}
          </div>
        </template>

        <template v-if="false">
          <div class="bullet"></div>
          <div class="activity pointer">3 Replies</div>
        </template>
      </div>

      <!-- CHILD COMMENT -->
      <div class="child-comment-wrapper">
        <slot name="child-comment"></slot>
        <!-- <child-comment-row /> -->
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_report_comment_modal">
        <report-comment-modal
          :comment_id="comment.id"
          @closeTriggered="toggleReportComment"
        />
      </transition>

      <transition name="fade" v-if="show_delete_comment_modal">
        <delete-comment-modal
          :post_id="post_id"
          :comment_id="comment.id"
          @closeTriggered="toggleDeleteComment"
        />
      </transition>

      <transition name="fade" v-if="show_previewer">
        <media-viewer
          :user="{
            image: comment.user.image,
            full_name: comment.user.name || comment.user.full_name,
            date: comment.created_at,
          }"
          :media="{
            resources: [comment.attachment],
            image_current_index: 0,
            thumbnails: [],
            sharable: true,
            type: 'image',
          }"
          @closeTriggered="togglePreviewer"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import mediaViewer from "@/shared/components/media-viewer";

export default {
  name: "commentRow",

  components: {
    mediaViewer,
    reportCommentModal: () =>
      import(
        /* webpackChunkName: "reportCommentModal" */ "@/modules/base/modals/feeds/report-comment-modal"
      ),
    deleteCommentModal: () =>
      import(
        /* webpackChunkName: "deleteCommentModal" */ "@/modules/base/modals/feeds/delete-comment-modal"
      ),
  },

  props: {
    post_id: {
      type: Number,
    },

    comment: {
      type: Object,
      default: () => ({
        attachment: "",
      }),
    },

    child: false,
  },

  computed: {
    getCommentDate() {
      return this.$date.formatDate(this.comment?.created_at).timeDifference();
    },

    getUserFullname() {
      return (
        this.comment?.user?.full_name ||
        this.comment?.user?.name ||
        "Richy Jones"
      );
    },

    getUserImage() {
      return this.comment?.user?.image;
    },
  },

  data() {
    return {
      show_more_option: false,
      show_report_comment_modal: false,
      show_delete_comment_modal: false,
      show_previewer: false,

      is_liked: this.comment?.myLike ?? this.comment?.my_like_status,
      like_count: this.comment?.likesCount ?? this.comment?.like_count,
    };
  },

  methods: {
    ...mapActions({ likeFeedComment: "dbFeeds/likeFeedComment" }),

    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    toggleReportComment() {
      this.show_report_comment_modal = !this.show_report_comment_modal;
    },

    toggleDeleteComment() {
      this.show_delete_comment_modal = !this.show_delete_comment_modal;
    },

    togglePreviewer() {
      this.show_previewer = !this.show_previewer;
    },

    toggleCommentLike() {
      this.is_liked = !this.is_liked;

      this.like_count = this.is_liked
        ? Number(this.like_count) + 1
        : Number(this.like_count) - 1;
    },

    likeComment() {
      this.toggleCommentLike();

      this.likeFeedComment(this.comment.id)
        .then((response) => {
          // console.log(response);

          if (response.data === "comment liked")
            this.pushAlert("Comment liked successfully", "success");
          else if (response.data === "comment unliked")
            this.pushAlert("Comment unliked successfully", "success");
          else this.pushAlert("Activity on comment not successful", "warning");
        })
        .catch(() => {
          this.pushAlert("Activity on comment not successful", "error");
          this.toggleCommentLike();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.parent-comment {
  @include flex-row-start-nowrap;
  align-items: flex-start;

  .left {
    .avatar {
      margin-right: toRem(10);
      @include square-shape(32);
      border-radius: toRem(5);

      .avatar-text {
        font-size: toRem(11);
      }

      @include breakpoint-down(xl) {
        margin-right: toRem(7);
        @include square-shape(32);
      }

      @include breakpoint-down(lg) {
        margin-right: toRem(10);
        @include square-shape(33);
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

  .right {
    .comment-intro {
      @include flex-row-between-nowrap;
      margin-bottom: toRem(7);

      .user-info {
        // @include flex-row-start-nowrap;

        .name {
          @include font-height(12.5, 17);

          @include breakpoint-down(xs) {
            @include font-height(11.5, 17);
          }
        }
        .time {
          @include font-height(11, 18);

          @include breakpoint-down(sm) {
            @include font-height(11, 16);
          }
        }
      }

      .avatar {
        @include square-shape(24);
        overflow: unset;

        .icon {
          @include center-placement;
          font-size: toRem(14);
          margin-left: toRem(-2.75);
        }
      }
    }

    .comment-content {
      .text {
        @include font-height(12.15, 19);
        white-space: pre-line;
        word-wrap: break-word;

        a {
          color: $brand-inverse;
          word-break: break-all;
          display: block;
          text-decoration: underline;
        }

        @include breakpoint-down(xl) {
          @include font-height(12.25, 19);
        }

        @include breakpoint-down(xs) {
          @include font-height(11, 18);
          letter-spacing: 0.02em;
        }
      }

      .attachment {
        height: toRem(180);
        margin-bottom: toRem(12);

        &:hover {
          transform: scale(0.98);
        }

        @include breakpoint-down(xs) {
          height: toRem(140);
        }

        img {
          @include background-cover;
          background-position: center center;
        }
      }
    }

    .comment-activity {
      @include flex-row-start-nowrap;
      margin-bottom: toRem(8);

      .activity {
        color: $brand-primary;
        @include font-height(12, 16);
        @include transition(0.4s);
        border-radius: toRem(20);
        padding: toRem(6) toRem(9);
        background: darken($brand-inverse-light, 4%);
        width: max-content;

        .icon {
          position: relative;
          font-size: toRem(14);
          top: toRem(0.75);
        }

        &:hover {
          background: darken($brand-inverse-light, 8.5%);
        }

        @include breakpoint-down(xs) {
          @include font-height(11, 16);
        }
      }

      .liked {
        background: darken($brand-accent-light, 3.5%);
      }

      .counter {
        @include font-height(12, 16);
        color: $brand-primary;
        position: relative;
      }

      .bullet {
        @include square-shape(6);
        background: $border-grey;
        margin: auto toRem(7);
        border-radius: 50%;

        @include breakpoint-down(xs) {
          @include square-shape(5);
        }
      }
    }
  }
}

.child-comment-wrapper {
  margin-top: toRem(5);
  padding-top: toRem(5);
}
</style>
