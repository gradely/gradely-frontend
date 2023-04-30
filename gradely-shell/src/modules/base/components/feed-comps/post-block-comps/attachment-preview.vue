<template>
  <div
    class="post-content-area padded-area pt-0 w-100 smooth-transition pointer"
    @click="togglePreviewer"
  >
    <div
      class="content-area-card align-items-center rounded-7 border-brand-light document-card"
    >
      <!-- LEFT  -->
      <div class="left">
        <div
          class="avatar rounded-5"
          :class="$doc.getDocBgcolor(attachment.extension) + '-bg'"
        >
          <div
            class="icon"
            :class="$doc.getDocIconStyle(attachment.extension)"
          ></div>
        </div>
      </div>

      <!-- RIGHT  -->
      <div class="right w-100">
        <!-- TOP ROW  -->
        <div class="top-row mgb-0">
          <div class="left">
            <!-- TITLE TEXT  -->
            <div class="title-text color-text font-weight-600">
              {{ attachment.title }}
            </div>

            <!-- META TEXT  -->
            <div class="meta-text color-grey-dark">
              {{ attachment.filesize }}
              {{ $doc.getDocType(attachment.extension) }} Document
            </div>
          </div>

          <!-- OPTIONS  -->
          <div
            class="right smooth-transition pointer box-shadow-effect ignore"
            @click="toggleOptions"
            v-on-clickaway="hideOptions"
          >
            <div class="icon icon-ellipsis-h brand-primary ignore"></div>

            <!-- DROPDOWN  -->
            <div
              class="dropdown rounded-5 box-shadow-effect smooth-transition smooth-animation white-text-bg ignore"
              v-if="show_more_option"
            >
              <div class="item ignore" @click="downloadFile">
                Download File
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM ROW  -->
        <div class="bottom-row w-100 brand-white-bg rounded-5" v-if="false">
          <img v-lazy="mxStaticImg('DocSample.png', 'base')" alt="" />
        </div>
      </div>
    </div>

    <!-- CONTENT DETAILS  -->
    <div class="content-details" v-if="false">
      <div class="text">Lesson</div>
      <div class="bullet"></div>
      <div class="text">Mathematics</div>
      <div class="bullet"></div>
      <div
        class="text link link-underline pointer smooth-transition"
        title="View post audience"
      >
        15 Views
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_previewer">
        <media-viewer
          :user="{
            image: post.user.image,
            full_name: post.user.full_name,
            date: post.created_at,
          }"
          :media="{
            resources: [attachment],
            thumbnails: [],
            sharable: true,
            type: attachment.filetype,
            extension: attachment.extension,
          }"
          @closeTriggered="show_previewer = false"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import mediaViewer from "@/shared/components/media-viewer";

export default {
  name: "attachmentPreview",

  components: {
    mediaViewer,
  },

  props: {
    post: {
      type: Object,
    },

    attachment: {
      type: Object,
    },
  },

  data: () => ({
    show_more_option: false,
    show_previewer: false,
  }),

  methods: {
    ...mapActions({
      downloadFromBucket: "aws/downloadFromBucket",
      resetDownloadStatus: "aws/resetDownloadStatus",
      downloadLogger: "aws/downloadLogger",
    }),

    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    togglePreviewer($event) {
      if (!$event.target.classList.contains("ignore")) {
        this.show_previewer = !this.show_previewer;
      }
    },

    // DOWNLOAD FILE
    downloadFile() {
      this.downloadFromBucket({
        file_url: this.attachment.filename,
        file_name: this.attachment.title,
      }).then((url) => {
        let link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", this.attachment.title);
        link.click();

        setTimeout(() => {
          this.resetDownloadStatus();
          this.downloadLogger(this.attachment.token);
        }, 2000);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.post-content-area {
  padding-bottom: toRem(9) !important;

  &:last-of-type {
    padding-bottom: toRem(14) !important;
  }

  .top-row {
    @include flex-row-between-nowrap;

    .right {
      position: relative;
      @include square-shape(28);
      background: rgba($border-grey-light, 0.65);
      border-radius: toRem(6);

      @include breakpoint-down(xs) {
        @include square-shape(25);
      }

      .icon {
        @include center-placement;
        font-size: toRem(21);

        @include breakpoint-down(xs) {
          font-size: toRem(18);
        }
      }

      &:hover {
        background: rgba($brand-inverse-light, 0.6);
      }
    }
  }

  .bottom-row {
    position: relative;
    height: toRem(180);
    overflow: hidden;

    @include breakpoint-down(xs) {
      height: toRem(150);
    }

    @include breakpoint-custom-down(380) {
      height: toRem(130);
    }

    img {
      background-position: center center;
      @include background-cover;
    }
  }
}

.document-card {
  margin-bottom: 0 !important;

  &:last-of-type {
    margin-bottom: toRem(10) !important;
  }
}
</style>
