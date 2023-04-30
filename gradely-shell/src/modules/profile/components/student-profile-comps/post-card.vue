<template>
  <div
    class="
      post-card
      rounded-5
      border-border-grey
      overflow-hidden
      smooth-transition
      position-relative
      pointer
    "
  >
    <!-- TOP ROW  -->
    <div class="top-row">
      <div
        class="avatar rounded-5"
        :class="author.image ? 'border-brand-inverse' : null"
      >
        <img
          v-lazy="author.image"
          :alt="$string.getStringInitials(getAuthorFullName)"
          class="avatar-img"
          v-if="author.image"
        />

        <div
          class="avatar-text"
          v-else
          :class="$color.getProfileBgColor(getAuthorFullName)"
        >
          {{ $string.getStringInitials(getAuthorFullName) }}
        </div>
      </div>

      <div class="name font-weight-600 brand-navy">{{ getAuthorFullName }}</div>
    </div>

    <!-- POST CONTENT  -->
    <div class="post-content">
      {{ $string.getTruncatedText(post.description, 75) }}
    </div>

    <!-- POST ATTACHMENT -->
    <div
      class="post-attachment w-100 mgb-5 brand-inverse-light-bg rounded-10"
      v-if="post.token && false"
    >
      <img v-lazy="mxStaticImg('attachment-thumbnail.png')" alt="" />

      <!-- ATTACHMENT INFO -->
      <div class="attachment-info">
        <div class="title font-weight-600 color-ash">
          {{ $string.getTruncatedText(post.title, 22) }}
        </div>
        <div class="description">
          <span class="text-capitalize">{{ post.filetype || "Document" }}</span>
          attachment
        </div>
      </div>
    </div>

    <!-- POST TIMING  -->
    <div class="post-timing">{{ getDisplayDate }}</div>

    <!-- POST ACTIVITY  -->
    <div class="post-activity">
      <div class="activity">
        <div class="icon icon-thumbs-up"></div>
        <div class="text">{{ post.like_count }}</div>
      </div>

      <div class="activity">
        <div class="icon icon-chat"></div>
        <div class="text">{{ post.comment_count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "postCard",

  props: {
    author: {
      type: Object,
      default() {
        return {
          firstname: "My",
          lastname: "Student",
          image: "",
        };
      },
    },

    post: {
      type: Object,
    },
  },

  computed: {
    getDisplayDate() {
      let { d1, m4, y1, h01, b2, a0 } = this.$date
        .formatDate(this.post?.created_at)
        .getAll();

      return `${h01}:${b2} ${a0} • ${d1} ${m4}, ${y1}`;
    },

    getAuthorFullName() {
      return `${this.author.firstname} ${this.author.lastname}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card {
  @include rectangle-shape(235, 180);
  margin-right: toRem(10);
  padding: toRem(8);

  @include breakpoint-down(sm) {
    margin-right: toRem(7);
  }

  &:hover {
    border: toRem(0.75) solid rgba($brand-accent, 0.5) !important;
    background: rgba($border-grey-light, 0.2);
  }

  &:last-of-type {
    margin-right: 0;
  }

  .top-row {
    @include flex-row-start-nowrap;
    margin-bottom: toRem(12);

    .avatar {
      @include square-shape(24);
      margin-right: toRem(10);

      .avatar-text {
        font-size: toRem(10);
      }
    }

    .name {
      @include font-height(11.25, 15);
    }
  }

  .post-content {
    @include font-height(11.25, 17);
    margin-bottom: toRem(5);
    color: $color-ash;

    @include breakpoint-down(sm) {
      @include font-height(11, 17);
    }

    a {
      color: $brand-accent;
    }
  }

  .post-attachment {
    @include flex-row-start-nowrap;
    height: toRem(45);
    overflow: hidden;
    padding: toRem(5) toRem(8);

    img {
      width: auto;
      height: 100%;
    }

    .attachment-info {
      margin-left: toRem(7);

      .title {
        @include font-height(10.5, 14);
        margin-bottom: toRem(2);
      }

      .description {
        @include font-height(10, 12);
      }
    }
  }

  .post-timing {
    @include flex-row-start-nowrap;
    @include font-height(10, 14);
    color: rgba($brand-navy, 0.7);
  }

  .post-activity {
    @include flex-row-start-nowrap;
    position: absolute;
    bottom: toRem(7);
    left: toRem(8);

    .activity {
      @include flex-row-start-nowrap;
      color: $border-grey-dark;
      margin-right: toRem(20);

      &:last-of-type {
        margin-right: 0;
      }

      .icon {
        font-size: toRem(13);
        margin-right: toRem(5);
      }

      .text {
        font-size: toRem(11);
      }
    }
  }
}
</style>
