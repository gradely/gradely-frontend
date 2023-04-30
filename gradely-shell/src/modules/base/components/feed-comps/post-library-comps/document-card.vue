<template>
  <div
    class="document-card rounded-5 white-text-bg mgb-5 box-shadow-effect smooth-transition pointer"
    @click="viewDocument"
  >
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
      <div class="doc-info w-100">
        <div class="name color-text mgb-3">
          {{ document.title }}
        </div>
        <div class="date color-grey-dark">{{ getCreatedDate }}</div>
      </div>
    </div>

    <!-- MIDDLE  -->
    <div class="middle color-grey-dark">
      By: {{ document.user.first_name }} {{ document.user.last_name }}
    </div>

    <!-- RIGHT  -->
    <div class="right position-relative">
      <div
        class="avatar rounded-7 color-white-bg pointer smooth-transition ignore"
        @click="toggleOptions"
        v-on-clickaway="hideOptions"
      >
        <div class="icon icon-ellipsis-h border-grey-dark ignore"></div>
      </div>

      <div
        class="dropdown rounded-5 box-shadow-effect smooth-transition smooth-animation white-text-bg ignore"
        v-if="show_more_option"
      >
        <div class="item ignore" @click="toggleMediaPreviewer">
          View Document
        </div>
        <div class="item ignore" @click="downloadDocument">
          Download Document
        </div>
        <div class="item ignore" @click="toggleDeleteModal">
          Delete Document
        </div>
      </div>
    </div>

    <transition name="fade" v-if="show_delete_file">
      <delete-library-file
        :token="document.token"
        @closeTriggered="forceCloseViewer"
      />
    </transition>

    <transition name="fade" v-if="show_previewer">
      <media-viewer
        :user="{
          image: document.user.image,
          full_name: `${document.user.first_name} ${document.user.last_name}`,
          date: formatDateTimeZone,
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
import deleteLibraryFile from "@/modules/base/modals/feeds/delete-library-file";
export default {
  name: "documentCard",

  props: {
    document: Object,
  },

  components: {
    mediaViewer,
    deleteLibraryFile,
  },

  computed: {
    formatDateTimeZone() {
      return this.document?.created_at.replace("T", " ").replace("Z", "");
    },

    getCreatedDate() {
      let { d3, m4, y1, h01, b2, a0 } = this.$date
        .formatDate(this.formatDateTimeZone)
        .getAll();

      return `${d3} ${m4}, ${y1} ${h01}:${b2} ${a0}`;
    },
  },

  data: () => ({
    show_more_option: false,
    show_previewer: false,
    show_delete_file: false,

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

    toggleDeleteModal() {
      this.show_delete_file = !this.show_delete_file;
    },

    viewDocument($event) {
      if (!$event.target.classList.contains("ignore")) {
        if (this.show_delete_file) {
          this.show_delete_file = false;
          return false;
        }

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
.document-card {
  @include flex-row-between-nowrap;
  padding: toRem(12);

  &:hover {
    background: rgba($white-text, 0.75) !important;
  }

  .left {
    @include flex-row-start-nowrap;
    padding-right: toRem(10);
    width: 52%;

    @include breakpoint-custom-down(420) {
      width: 85%;
    }

    .avatar {
      @include square-shape(43);
      margin-right: toRem(15);

      @include breakpoint-down(lg) {
        @include square-shape(36);
        margin-right: toRem(10);
      }

      @include breakpoint-down(sm) {
        @include square-shape(34);
        margin-right: toRem(7);
      }

      &:hover {
        background: $brand-inverse !important;
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
      @include font-height(13, 18);
      width: toRem(260);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      @include breakpoint-down(md) {
        @include font-height(12.75, 16);
        width: toRem(210);
      }

      @include breakpoint-down(sm) {
        @include font-height(12.5, 16);
        width: toRem(180);
      }

      @include breakpoint-down(xs) {
        @include font-height(12, 16);
        width: toRem(160);
      }

      @include breakpoint-custom-down(420) {
        width: 100%;
      }
    }

    .date {
      @include font-height(11, 15);

      @include breakpoint-down(lg) {
        @include font-height(10.5, 14);
      }

      @include breakpoint-down(xs) {
        @include font-height(10.45, 13);
      }
    }
  }

  .middle {
    @include font-height(12, 15);
    padding-left: toRem(7);
    width: 30%;

    @include breakpoint-down(lg) {
      @include font-height(11.5, 13);
    }

    @include breakpoint-custom-down(420) {
      display: none;
    }
  }

  .right {
    @include flex-row-end-nowrap;
    width: 18%;

    .avatar {
      @include square-shape(32);

      @include breakpoint-down(lg) {
        @include square-shape(28);
      }

      .icon {
        @include center-placement;
        font-size: toRem(22);

        @include breakpoint-down(lg) {
          font-size: toRem(18);
        }
      }

      &:hover {
        background: lighten($brand-inverse-light, 5%) !important;
      }
    }
  }
}
</style>
