<template>
  <div class="user-note-card smooth-transition pointer" @click="openDocument">
    <!-- LEFT  -->
    <div class="left">
      <div
        class="avatar rounded-5"
        :class="$doc.getDocBgcolor(document.extension) + '-bg'"
      >
        <div
          class="icon"
          :class="$doc.getDocIconStyle(document.extension)"
        ></div>
      </div>

      <!-- DOC INFO  -->
      <div class="doc-info">
        <div class="name brand-navy font-weight-500 mgb-3">
          {{ document.title }}
        </div>
        <div class="date color-grey-dark">{{ getDisplayDate }}</div>
      </div>
    </div>

    <!-- MIDDLE  -->
    <div class="middle color-grey-dark">
      By: <span class="black-text">{{ document.user.full_name }}</span>
    </div>

    <!-- RIGHT  -->
    <div class="right position-relative">
      <div
        class="avatar pointer rounded-7 smooth-transition ignore"
        @click="toggleOptions"
        v-on-clickaway="hideOptions"
      >
        <div class="icon icon-ellipsis-h border-grey-dark ignore"></div>
      </div>

      <div
        class="
          dropdown
          rounded-5
          box-shadow-effect
          smooth-transition smooth-animation
          white-text-bg
          ignore
        "
        v-if="show_more_option"
      >
        <div class="item ignore" @click="toggleMediaPreviewer">
          <div class="icon-cover ignore">
            <div class="icon icon-eye ignore"></div>
          </div>
          <div class="ignore">View Document</div>
        </div>

        <div class="item ignore" @click="downloadDocument">
          <div class="icon-cover ignore">
            <div class="icon icon-download ignore"></div>
          </div>
          <div class="ignore">Download Document</div>
        </div>
      </div>
    </div>

    <transition name="fade" v-if="show_previewer">
      <media-viewer
        :user="{
          image: document.user.image,
          full_name: `${document.user.full_name}`,
          date: document.created_at,
        }"
        :media="{
          resources: [document],
          image_current_index: 0,
          thumbnails: [],
          sharable: true,
          type: document.filetype,
        }"
        @closeTriggered="forceCloseViewer"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import mediaViewer from "@/shared/components/media-viewer";

export default {
  name: "userNoteCard",

  components: {
    mediaViewer,
  },

  props: {
    document: {
      type: Object,
      default: () => ({
        id: 1,
        title: "Note..",
        created_at: "2021-09-23 08:34:09",
        extension: "pdf",
        filename: "",
        filetype: "",
        filesize: "",
        referenceObject: {
          token: "",
        },
        user: {
          full_name: "Teacher name",
        },
      }),
    },
  },

  computed: {
    getDisplayDate() {
      let { d3, m4, y1, h01, b2, a0 } = this.$date
        .formatDate(this.document.created_at)
        .getAll();

      return `${d3} ${m4}, ${y1} ${h01}:${b2} ${a0}`;
    },
  },

  data: () => ({
    show_more_option: false,
    show_previewer: false,
    force_close: false,
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

    toggleMediaPreviewer() {
      this.show_previewer = !this.show_previewer;
    },

    openDocument($event) {
      if (!$event.target.classList.contains("ignore")) {
        this.toggleMediaPreviewer();
      }
    },

    forceCloseViewer() {},

    downloadDocument() {
      this.downloadFromBucket({
        file_url: this.document?.filename,
        file_name: this.document?.title,
      }).then((url) => {
        let link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", this.document?.title);
        link.click();

        setTimeout(() => {
          this.resetDownloadStatus();
          this.downloadLogger(this.document?.token);
        }, 2000);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-note-card {
  @include flex-row-between-nowrap;
  padding: toRem(10) toRem(6);
  border-bottom: toRem(1) solid rgba($border-grey, 0.4);

  &:hover {
    background: rgba($border-grey, 0.15);
    border-radius: toRem(4);
  }

  .left {
    @include flex-row-start-nowrap;
    width: 52%;

    @include breakpoint-down(lg) {
      width: 48%;
    }

    @include breakpoint-down(sm) {
      width: 82%;
    }

    .avatar {
      @include square-shape(40);
      margin-right: toRem(13);

      @include breakpoint-down(lg) {
        @include square-shape(36);
        margin-right: toRem(10);
      }

      @include breakpoint-down(sm) {
        @include square-shape(34);
        margin-right: toRem(7);
      }

      .icon {
        @include center-placement;
        font-size: toRem(20);

        @include breakpoint-down(lg) {
          font-size: toRem(18);
        }
      }
    }

    .name {
      @include font-height(12.75, 18);
      word-wrap: break-word;
      word-break: break-all;

      @include breakpoint-down(sm) {
        @include font-height(12.35, 16);
      }

      @include breakpoint-down(xs) {
        @include font-height(12.25, 16);
      }
    }

    .date {
      @include font-height(11.5, 16);

      @include breakpoint-down(lg) {
        @include font-height(10.5, 14);
      }

      @include breakpoint-down(xs) {
        @include font-height(10.45, 13);
      }
    }
  }

  .middle {
    @include font-height(12.35, 15);
    width: 30%;

    @include breakpoint-down(lg) {
      @include font-height(11.5, 13);
    }

    @include breakpoint-down(sm) {
      display: none;
    }
  }

  .right {
    @include flex-row-end-nowrap;
    width: 18%;

    .avatar {
      @include square-shape(30);
      background: $color-white;

      @include breakpoint-down(lg) {
        @include square-shape(32);
      }

      .icon {
        @include center-placement;
        font-size: toRem(22);

        @include breakpoint-down(lg) {
          font-size: toRem(20);
        }
      }

      &:hover {
        background: lighten($brand-inverse-light, 5%);
      }
    }
  }
}
</style>
