<template>
  <div
    class="position-relative"
    :class="show_tour_cover && post_index == 0 ? 'tour-index' : null"
  >
    <div
      class="post-block post-container-block mgb-10 smooth-transition"
      :class="post.id === post_delete_id ? 'delete-state' : null"
    >
      <!-- POST INTRO  -->
      <post-intro :intro="getIntroContent" :post="post" />

      <!-- CONTENT AREA  -->
      <div class="content-area">
        <post-content-text :content="getTextContent" />

        <!-- POST CONTENT AREA  -->
        <keep-alive>
          <component
            :is="getPostContentType"
            :post="post"
            :image="loadAllPossibleAttachmentImages"
            :video="loadAllPossibleAttachmentVideos"
            :attachments="loadAllPossibleAttachmentDocuments"
          ></component>
        </keep-alive>
      </div>

      <!-- RECOMENDED DISPLAY -->
      <recommended-display
        v-if="getTourRecommendedStudents.length"
        :students="getTourRecommendedStudents"
      />

      <!-- POST ACTIVITY  -->
      <template v-if="post.id">
        <post-activity :post="post" @commentClicked="toggleCommentEntry" />
      </template>

      <!-- POST COMMENT DISPLAY AREA  -->
      <post-comment-display :post_id="post.id" :comments="loadComments" />

      <!-- POST COMMENT ENTRY  -->
      <post-comment-entry :post="post" v-if="show_comment_entry" />

      <!-- MODALS -->
      <portal to="gradely-modals">
        <transition name="fade" v-if="show_tour_cover">
          <tour-cover />
        </transition>
      </portal>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import postIntro from "@/modules/base/components/feed-comps/post-block-comps/post-intro";
import postContentText from "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/post-content-text";

export default {
  name: "postBlock",

  components: {
    postIntro,
    postContentText,
    postActivity: () =>
      import(
        /* webpackChunkName: "post-block" */ "@/modules/base/components/feed-comps/post-block-comps/post-activity"
      ),
    postContentImage: () =>
      import(
        /* webpackChunkName: "post-block" */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/post-content-image"
      ),
    postCommentDisplay: () =>
      import(
        /* webpackChunkName: "post-block" */ "@/modules/base/components/feed-comps/post-block-comps/post-comment-display"
      ),
    postCommentEntry: () =>
      import(
        /* webpackChunkName: "post-block" */ "@/modules/base/components/feed-comps/post-block-comps/post-comment-entry"
      ),
    postContentAssessment: () =>
      import(
        /* webpackChunkName: "post-block" */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/post-content-assessment"
      ),
    postContentLiveclass: () =>
      import(
        /* webpackChunkName: "post-block" */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/post-content-liveclass"
      ),
    postContentLesson: () =>
      import(
        /* webpackChunkName: "post-block" */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/post-content-lesson"
      ),
    postContentAttachment: () =>
      import(
        /* webpackChunkName: "post-block" */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/post-content-attachment"
      ),
    postContentPerformance: () =>
      import(
        /* webpackChunkName: "post-block" */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/post-content-performance"
      ),
    postContentArticle: () =>
      import(
        /* webpackChunkName: "post-block" */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/post-content-article"
      ),
    postVideoPlayer: () =>
      import(
        /* webpackChunkName: "post-block" */ "@/shared/components/post-video-player"
      ),
    recommendedDisplay: () =>
      import(
        /* webpackChunkName: "post-block" */ "@/modules/base/components/feed-comps/post-block-comps/recommended-display"
      ),
    tourCover: () =>
      import(/* webpackChunkName: "modal" */ "@/shared/components/tour-cover"),
  },

  props: {
    post_index: Number,
    post: Object,
  },

  computed: {
    getIntroContent() {
      if (Object.keys(this.post.user).length) {
        if (["article", "performance"].includes(this.post.type)) {
          return {
            name: "Gradely",
            description: "Gradely Support",
            image: "",
            type: this.post?.type,
          };
        }

        return {
          name:
            this.post?.user?.name ||
            this.post?.user?.full_name ||
            "Richy Jones",
          description: this.$date
            .formatDate(this.post?.created_at)
            .timeDifference(),
          image: this.post?.user?.image,
          type: this.post?.type,
        };
      } else
        return {
          name: "Bukola Olabode",
          description: "23 minutes ago",
          image: "",
          type: "homework",
        };
    },

    getTextContent() {
      if (this.post.type === "article") return;

      return this.post.description
        ? { custom_text: this.post.description }
        : { custom_text: "" };
    },

    getPostContentType() {
      // CHECK IF POST IS OF TYPE HOMEWORK OR LIVE CLASS OR LESSON
      if (this.post?.type === "homework") return "postContentAssessment";
      // CHECK IF POST IS LIVE CLASS
      else if (this.post?.type === "live_class") return "postContentLiveclass";
      // CHECK IF POST IS LESSON
      else if (this.post?.type === "lesson") return "postContentLesson";
      // CHECK IF POST IS PERFORMNACE
      else if (this.post?.type === "performance")
        return "postContentPerformance";
      // CHECK IF POST IS ARTICLE
      else if (this.post?.type === "article") return "postContentArticle";
      // SHARE RESOURCE TYPE
      else if (this.post?.type === "share") {
        if (this.post?.tag === "image") return "postContentImage";
        if (this.post?.tag === "video") return "postVideoPlayer";
        if (this.post?.tag === "document") return "postContentAttachment";

        if (this.post?.tag === "recommendation") {
          if (this.post?.reference?.recommendation_type === "video")
            return "postVideoPlayer";
        }
      }
      // CHECK ATTACHMENTS
      else if (this.checkAttachment("image")) return "postContentImage";
      else if (this.checkAttachment("video")) return "postVideoPlayer";
      else if (this.checkAttachment("document")) return "postContentAttachment";
      else return false;
    },

    loadAllPossibleAttachmentImages() {
      let image_list = [];

      if (this.checkAttachment("image")) {
        this.post?.attachments.map((image) => image_list.push(image.filename));
        return image_list;
      } else return image_list;
    },

    loadAllPossibleAttachmentVideos() {
      let video_list = [];

      if (this.post?.type === "post") {
        if (this.checkAttachment("video")) {
          this.post?.attachments.map((video) =>
            video_list.push({
              name: video.filename,
              thumbnail: video.thumbnail,
              type: "post",
            })
          );
        }
      }

      if (this.post?.type === "share" && this.post?.tag === "video") {
        video_list.push({
          name:
            this.post?.reference?.owner === "gradely"
              ? this.post?.reference?.url
              : this.generateVideoURL(this.post?.reference?.token),
          thumbnail: this.post?.reference?.thumbnail,
          type: "shared",
        });
      }

      if (this.post?.type === "share" && this.post?.tag === "recommendation") {
        video_list.push({
          name:
            this.post?.reference?.owner !== "whizitup"
              ? this.post?.reference?.url
              : this.generateVideoURL(this.post?.reference?.token),
          thumbnail: this.post?.reference?.thumbnail,
          type: "shared",
        });
      }

      return video_list;
    },

    loadAllPossibleAttachmentDocuments() {
      let document_list = [];

      if (this.post?.type === "post") {
        if (this.checkAttachment("document")) {
          let attachments =
            this.post?.attachments ?? this.post?.reference?.attachments;
          attachments.map((document) => document_list.push(document));
        }
      }

      if (this.post?.type === "share" && this.post?.tag === "document") {
        let attachments =
          this.post?.attachments ?? this.post?.reference?.attachments;
        attachments.map((document) => document_list.push(document));
      }

      return document_list;
    },

    loadComments() {
      return this.post?.comment || this.post?.comments || [];
    },

    isLiveClassOpened() {
      let date_ref = new Date();
      let current_date = new Date(
        `${date_ref.getFullYear()}-${
          date_ref.getMonth() + 1
        }-${date_ref.getDate()}`
      );

      let close_day = new Date(this.post.reference.availability.split(" ")[0]);

      return current_date > close_day ? false : true;
    },

    removeClosedClasses() {
      if (this.getPostContentType === "postContentLiveclass") {
        if (this.isLiveClassOpened)
          return this?.post?.reference.status === "completed" ? false : true;
        else return false;
      } else return true;
    },

    getTourRecommendedStudents() {
      return this.post?.reference?.recommended_students ?? [];
    },
  },

  watch: {
    $route: {
      handler(value) {
        setTimeout(() => {
          this.show_tour_cover = value.query?.tour == 7 ? true : false;
        }, 3000);
      },
      immediate: true,
    },

    fetched_video_link: {
      handler(value) {
        // console.log(value);
        this.loadAllPossibleAttachmentVideos[0].name = value;
      },
    },
  },

  data: () => ({
    show_comment_entry: false,
    post_delete_id: null,
    show_tour_cover: false,

    fetched_video_link: null,
  }),

  created() {
    this.$bus.$on(
      "extractDeletedPost",
      (post_id) => (this.post_delete_id = post_id)
    );
  },

  methods: {
    ...mapActions({ getVideoLink: "dbFeeds/getVideoLink" }),

    checkAttachment(file_type) {
      return this.post?.attachments?.some((file) => file.filetype == file_type);
    },

    toggleCommentEntry() {
      if (this.getAuthToken) {
        this.show_comment_entry = !this.show_comment_entry;
      } else {
        this.pushAlert(
          "You need to be logged in to make a comment!",
          "warning"
        );
      }
    },

    // GENERATE NON GRADELY VIDEO
    generateVideoURL(token) {
      this.getVideoLink(token)
        .then((response) => {
          this.fetched_video_link = response.data.url;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.delete-state {
  background: rgba($brand-red-light, 0.75);
}

.tour-index {
  z-index: 3000;
}
</style>
