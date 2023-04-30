<template>
  <div class="file-preview rounded-10 border mgb-5 smooth-transition w-100">
    <!-- FILE INFO -->
    <div class="file-info">
      <div
        class="avatar rounded-5"
        :class="$doc.getDocBgcolor(attachment.extension) + '-bg'"
      >
        <div
          class="icon"
          :class="$doc.getDocIconStyle(attachment.extension)"
        ></div>
      </div>

      <div class="pdr-10">
        <div class="file-name color-text mgb-2">
          {{ $string.getTruncatedText(attachment.title, 40) }}
        </div>
        <div class="file-type color-grey-dark text-capitalize">
          {{ attachment.filesize }} {{ post.type }} Note
        </div>
      </div>
    </div>

    <!-- FILE OPTION -->
    <div
      class="file-option remove-option rounded-30 pointer smooth-transition"
      @click="$bus.$emit('removeUploadedFile', attachment)"
      v-if="option_text === 'remove'"
    >
      {{ option_text }}
    </div>

    <div
      class="file-option view-option rounded-30 pointer smooth-transition"
      v-if="option_text === 'view'"
      @click="togglePreviewer"
    >
      {{ option_text }}
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_previewer">
        <media-viewer
          :user="{
            image: post.user.image,
            full_name: post.user.name,
            date: post.created_at,
          }"
          :media="{
            resources: [attachment],
            image_current_index: 0,
            thumbnails: [],
            sharable: true,
            type: attachment.filetype,
            extension: attachment.extension,
          }"
          @closeTriggered="togglePreviewer"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import mediaViewer from "@/shared/components/media-viewer";

export default {
  name: "filePreview",

  components: {
    mediaViewer,
  },

  props: {
    option_text: {
      type: String,
      default: "remove",
    },

    attachment: {
      type: Object,
      default: () => ({
        extension: "pdf",
        title: "SampleFile.pdf",
        filesize: "2kb",
      }),
    },

    post: {
      type: Object,
      default: () => ({
        type: "Document",
      }),
    },
  },

  data: () => ({
    show_previewer: false,
  }),

  methods: {
    togglePreviewer() {
      this.show_previewer = !this.show_previewer;
    },
  },
};
</script>

<style lang="scss" scoped>
.file-preview {
  @include flex-row-between-nowrap;
  padding: toRem(10);

  @include breakpoint-down(xs) {
    padding: toRem(7);
  }

  .file-info {
    @include flex-row-start-nowrap;

    .avatar {
      @include square-shape(42);
      margin-right: toRem(15);

      @include breakpoint-down(xs) {
        @include square-shape(32);
        margin-right: toRem(10);
      }

      .icon {
        @include center-placement;
        font-size: toRem(20);

        @include breakpoint-down(xs) {
          font-size: toRem(17);
        }
      }
    }

    .file-name {
      @include font-height(13, 18);

      @include breakpoint-down(xs) {
        @include font-height(12, 17);
      }
    }

    .file-type {
      @include font-height(11.5, 16);

      @include breakpoint-down(xs) {
        @include font-height(11, 16);
      }
    }
  }

  .file-option {
    border: toRem(1) solid #e5e5e5;
    padding: toRem(8) toRem(18);
    text-transform: capitalize;
    font-size: toRem(11);
    font-weight: 500;
  }

  .remove-option {
    &:hover {
      border: toRem(1) solid darken($brand-tonic, 7%);
      color: darken($brand-tonic, 7%);
    }
  }

  .view-option {
    &:hover {
      border: toRem(1) solid darken($brand-accent, 7%);
      color: darken($brand-accent, 7%);
    }
  }
}
</style>
