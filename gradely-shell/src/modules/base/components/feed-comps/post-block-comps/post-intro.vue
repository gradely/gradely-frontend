<template>
  <div class="post-intro padded-area">
    <!-- LEFT SECTION  -->
    <div class="left">
      <div class="avatar rounded-5 brand-inverse-light-bg">
        <img
          v-lazy="
            isServerImage ? intro.image : mxStaticImg(intro.image, 'base')
          "
          :alt="$string.getStringInitials(intro.name)"
          class="avatar-img"
          v-if="intro.image"
        />

        <div
          class="avatar-text"
          :class="
            $color.getProfileBgColor(intro.in_house ? 'Gradely' : intro.name)
          "
          v-else
        >
          {{
            $string.getStringInitials(intro.in_house ? "Gradely" : intro.name)
          }}
        </div>
      </div>

      <!-- INFO -->
      <div class="info">
        <div class="title-text color-text font-weight-600">
          {{ $string.getCapitalizeText(intro.name) }}

          <!-- TITLE EXTENSIONS -->
          <span class="font-weight-400">{{ processLightExtensions }}</span>
          <span class="font-weight-600">{{ processBoldExtensions }}</span>
        </div>

        <!-- DESCRIPTION META -->
        <div class="meta-text color-grey-dark">
          {{ post.id ? intro.description : "Tour Session" }}
        </div>
      </div>
    </div>

    <!-- RIGHT SECTION -->
    <template v-if="post.id">
      <div class="right position-relative" v-if="getAuthToken">
        <template v-if="intro.type !== 'gradely'">
          <div
            class="avatar rounded-10 pointer smooth-transition"
            title="More Options"
            @click="toggleOptions"
            v-on-clickaway="hideOptions"
          >
            <div class="icon icon-ellipsis-h color-grey-dark"></div>
          </div>
        </template>

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
          <div class="item" @click="toggleFeedReport">
            <div class="icon-cover">
              <div class="icon icon-announcement-speaker"></div>
            </div>
            <div>Report Post</div>
          </div>

          <div class="item" @click="toggleFeedDelete" v-if="post.is_owner">
            <div class="icon-cover">
              <div class="icon icon-trash"></div>
            </div>
            <div>Remove Post</div>
          </div>
        </div>
      </div>
    </template>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_feed_report_modal">
        <report-feed-post-modal
          :post_id="post.id"
          @closeTriggered="toggleFeedReport"
        />
      </transition>

      <transition name="fade" v-if="show_delete_feed_modal">
        <delete-feed-post-modal
          :post_id="post.id"
          @closeTriggered="toggleFeedDelete"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "postIntro",

  components: {
    reportFeedPostModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/feeds/report-feed-post-modal"
      ),
    deleteFeedPostModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/feeds/delete-feed-post-modal"
      ),
  },

  props: {
    post: {
      type: Object | String,
    },

    intro: {
      type: Object,
      default: () => ({
        name: "Gradely",
        description: "Welcome to class",
        image: "",
        type: "gradely",
        in_house: false,
        in_house_tip: false,
      }),
    },
  },

  computed: {
    isServerImage() {
      return this.intro.image.startsWith("http");
    },

    processLightExtensions() {
      if (this.intro.in_house_tip) return " from Gradely";
      else {
        if (["live_class", "liveclass"].includes(this?.post?.type))
          return " scheduled a";
        else if (this?.post?.type === "post") return " started a";
        else if (this?.post?.type === "lesson") return " shared a";
        else if (["exam", "homework", "quiz"].includes(this?.post?.type))
          return " created an";
        else if (this?.post?.type === "article") {
          return this?.post?.reference?.length > 1
            ? " shared some"
            : " shared an";
        } else if (this?.post?.type === "performance") return " shared";
        else return;
      }
    },

    processBoldExtensions() {
      if (["live_class", "liveclass"].includes(this?.post?.type))
        return " live class";
      else if (this?.post?.type === "post") return " discussion";
      else if (this?.post?.type === "lesson") return " lesson note";
      else if (["exam", "homework", "quiz"].includes(this?.post?.type))
        return " assessment";
      else if (this?.post.type === "article") {
        return this?.post?.reference?.length > 1 ? " articles" : " article";
      } else if (this?.post?.type === "performance")
        return " class performance";
      else return;
    },
  },

  data: () => ({
    show_more_option: false,
    show_feed_report_modal: false,
    show_delete_feed_modal: false,
  }),

  methods: {
    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    toggleFeedReport() {
      this.show_feed_report_modal = !this.show_feed_report_modal;
    },

    toggleFeedDelete() {
      this.show_delete_feed_modal = !this.show_delete_feed_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-intro {
  @include flex-row-between-nowrap;

  .left {
    @include flex-row-start-nowrap;
    padding-right: toRem(5);

    .avatar {
      margin-right: toRem(10);
      @include square-shape(35);

      .avatar-text {
        font-size: toRem(12);
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
        margin-right: toRem(7);
      }
    }

    .title-text {
      @include font-height(12.5, 19);
      margin-bottom: toRem(1);

      @include breakpoint-down(sm) {
        @include font-height(12.25, 17.5);
      }

      @include breakpoint-down(xs) {
        @include font-height(11.75, 17.5);
        font-weight: 500 !important;
        margin-bottom: toRem(1.5);
      }
    }

    .meta-text {
      @include font-height(11.25, 15);

      @include breakpoint-down(xl) {
        @include font-height(11, 13);
      }

      @include breakpoint-down(sm) {
        @include font-height(10.75, 14);
      }
    }
  }

  .right {
    .avatar {
      @include square-shape(33);
      background: rgba($border-grey-light, 0.65);

      @include breakpoint-down(sm) {
        border-radius: toRem(7) !important;
        @include square-shape(34);
      }

      .icon {
        @include center-placement;
        font-size: toRem(24);

        @include breakpoint-down(xl) {
          font-size: toRem(20);
        }
      }

      &:hover {
        background: rgba($brand-inverse-light, 0.6);
      }
    }
  }
}
</style>
