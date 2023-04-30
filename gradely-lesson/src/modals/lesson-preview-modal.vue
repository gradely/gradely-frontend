<template>
  <modal-cover @closeModal="closeModal" show_close_btn>
    <template slot="modal-cover-body">
      <div class="position-relative brand-navy-bg py-2 pointer">
        <!-- TITLE CHIP -->
        <div class="title-chipper">
          <div class="icon white-text gfont-12" :class="getIcon"></div>
          <div class="gfont-12">{{ getTitle }}</div>
        </div>

        <div class="content-wrapper">
          <content-preview-wrapper
            :content="content"
            @preview="togglePreview"
          />

          <!-- <img v-lazy="getThumbnail" alt="lesson material" class="thumbnail" /> -->

          <!-- <div class="play-wrapper" v-if="false">
            <span class="icon icon-play brand-accent gfont-15 play-icon"></span>
          </div>-->
        </div>
      </div>
    </template>

    <template slot="modal-cover-footer">
      <div class="p-3 p-md-4">
        <div class="d-flex justify-content-between">
          <div class="gfont-15 font-weight-700 color-text text-capitalize">
            {{ getContentTitle }}
          </div>

          <button
            class="share-button swap-button font-weight-500"
            @click="toggleShare"
          >
            <div class="icon icon-share gfont-15"></div>
            <div class="gfont-11 text-uppercase">
              Share
              <span class="d-none d-sm-inline">Lesson</span>
            </div>
          </button>

          <div
            class="icon icon-flag flag-icon gfont-20 pointer"
            @click="$emit('report')"
          ></div>
        </div>

        <div class="d-flex d-inline-flex gap-1 color-grey-dark gfont-13 mb-4">
          <div>{{ content.subject }}</div>
          <div>•</div>
          <div>{{ content.view_count }} Views</div>
        </div>

        <div class="d-flex justify-content-between align-items-stretch">
          <div class="inline-flex align-items-stretch">
            <button
              @click="likeOrdislikeContent"
              :class="
                liking || liked
                  ? 'brand-red-light-bg bran-tonic'
                  : 'color-grey-dark color-white-bg'
              "
              class="likes-button action-button d-inline-flex align-items-center rounded-15 gfont-13 gap-2"
            >
              <div
                v-if="liking"
                class="icon icon-dotted-spinner animate gfont-16 brand-tonic"
              ></div>
              <div v-if="!liking" class="icon icon-thumbs-up gfont-14"></div>
              <div v-if="!liking" class="gfont-12">{{ like_count }}</div>
            </button>

            <button
              v-if="!isGame"
              @click="downloadContent"
              ref="download"
              class="action-button d-inline-flex align-items-center rounded-15 gfont-13 gap-2"
            >
              <div class="icon icon-cloud-download gfont-20"></div>
              <div class="gfont-12">Download</div>
            </button>
          </div>

          <div
            class="icon icon-flag flag-icon gfont-20 pointer swap-flag"
            @click="$emit('report')"
          ></div>

          <button class="share-button font-weight-500" @click="toggleShare">
            <div class="icon icon-share gfont-15"></div>
            <div class="gfont-11 text-uppercase">
              Share
              <span class="d-none d-sm-inline">Lesson</span>
            </div>
          </button>
        </div>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const aws = createNamespacedHelpers('aws');
const lesson = createNamespacedHelpers('lesson');
import modalCover from '@/components/global-comps/modal-cover';
import contentPreviewWrapper from '@/components/card-comps/content-preview-wrapper';
export default {
  name: 'LessonPreviewModal',

  components: {
    modalCover,
    contentPreviewWrapper,
  },

  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    isGame() {
      return this.content?.type === 'game';
    },

    getContentTitle() {
      if (this.isGame) return this.content.game_title;
      let names = this.content?.title?.split('.');
      if (names.length < 2) return this.content?.title;
      names.pop();
      let name = names.join('');
      let long = name?.length >= 30;
      return `${name?.substring(0, 30)}${long ? '...' : ''}`;
    },

    getTitle() {
      switch (this.getContentType) {
        case 'game':
          return 'Game';
        case 'image':
          return 'Illustration';
        case 'video':
          return 'Video lesson';
        case 'document':
          return 'Presentation';
        default:
          return 'Lesson Content';
      }
    },

    getFallbackThumbnail() {
      switch (this.getContentType) {
        case 'game':
          return this.staticImg('VideoPoster.png');
        case 'image':
          return this.staticImg('VideoPoster.png');
        case 'video':
          return this.staticImg('VideoPoster.png');
        case 'document':
          return this.staticImg('VideoPoster.png');
        default:
          return this.staticImg('VideoPoster.png');
      }
    },

    getThumbnail() {
      return this.content?.thumbnail || this.getFallbackThumbnail;
    },

    getContentType() {
      return this.content?.type;
    },

    getIcon() {
      switch (this.getContentType) {
        case 'game':
          return 'icon-app-outline';
        case 'image':
          return 'icon-image';
        case 'video':
          return 'icon-play';
        case 'document':
          return 'icon-file-text';
        default:
          return 'icon-play';
      }
    },

    getLikeDislikePayload() {
      return {
        content_id: this.content?.id,
        type: this.content?.type,
      };
    },
  },

  watch: {
    content: {
      handler(status) {
        this.like_count = status?.like_count;
      },
      immediate: true,
    },
  },

  data() {
    return {
      liking: false,
      liked: false,
      like_count: 0,
    };
  },

  methods: {
    ...aws.mapActions(['downloadFromBucket', 'resetDownloadStatus']),
    ...lesson.mapActions(['likeOrDislikeLesson']),

    closeModal() {
      localStorage.removeItem('video-' + this.content?.id);
      this.$emit('closeTriggered');
    },

    likeOrdislikeContent() {
      this.liking = true;

      this.likeOrDislikeLesson(this.getLikeDislikePayload)
        .then((response) => {
          this.$bus.$emit('refresh');

          this.liking = false;
          if (response.code === 200) this.liked = true;

          response?.message?.includes('unliked')
            ? this.like_count--
            : this.like_count++;

          response.code === 200
            ? this.pushAlert(response.message, 'success')
            : this.pushAlert('Failed to like content', 'warning');
        })
        .catch((err) => {
          this.liking = false;
          this.pushAlert('Error liking content', 'error');
        });
    },

    togglePreview() {
      this.$emit('preview');
    },

    toggleShare() {
      this.$emit('share');
    },

    downloadContent() {
      let link = document.createElement('a');
      link.setAttribute('href', this.content?.url);
      link.setAttribute('download', this.content.title);
      link.click();

      // this.handleClick('download', 'downloading');
      // this.downloadFromBucket({
      //   file_url: this.content.url,
      //   file_name: this.content.title,
      // })
      //   .then((url) => {
      //     this.handleClick('download', 'download', false);
      //     let link = document.createElement('a');
      //     link.setAttribute('href', url);
      //     link.setAttribute('download', this.content.title);
      //     link.click();
      //     this.resetDownloadStatus();
      //   })
      //   .catch((err) => {
      //     this.handleClick('download', 'download', false);
      //     this.resetDownloadStatus();
      //     console.log('error downloading>>>', err);
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
.title-chipper {
  display: inline-flex;
  color: #fff;
  position: absolute;
  max-height: max-content;
  max-width: max-content;
  inset: 0;
  left: toRem(8);
  top: toRem(8);
  background: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  padding: toRem(7) toRem(14);
  gap: 0 toRem(7);
  z-index: 4;
}

.content-wrapper {
  width: 90%;
  height: 95%;
  max-height: 95%;
  aspect-ratio: 1.5;
  position: relative;
  margin: auto;

  @include breakpoint-down(md) {
    width: 90%;
  }

  @include breakpoint-down(xs) {
    width: 95%;
  }

  .thumbnail {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-wrapper {
    background: $brand-accent-light;
    @include center-placement;
    @include square-shape(40);
    border-radius: toRem(10);
    cursor: pointer;

    &:hover {
      filter: brightness(0.85);
    }

    .play-icon {
      @include center-placement;
    }
  }
}

.flag-icon {
  color: $border-grey-dark;
  transition: color ease-in-out 0.25s;

  &:hover {
    color: $brand-red;
  }

  @include breakpoint-custom-down(535) {
    display: none;
  }
}

.share-button {
  padding: toRem(4) toRem(20);
  max-height: 34px;
  min-width: max-content;
  height: 34px;
  border: 1.2px solid $brand-accent;
  border-radius: toRem(35);
  background: $brand-accent-light;
  color: $brand-navy;
  display: inline-flex;
  gap: 0 6px;
  align-items: center;

  @include breakpoint-custom-down(535) {
    display: none;
  }
}

.swap-button,
.swap-flag {
  display: none;

  @include breakpoint-custom-down(535) {
    display: inline-flex;
  }
}

.action-button {
  max-height: 31px;
  height: 31px;
  margin-right: toRem(12);
  padding: toRem(8) toRem(15);
  background: $color-white;
  color: $color-grey-dark;

  &:hover {
    background: $brand-accent;
    color: $brand-navy;
  }
}

.likes-button {
  top: -1.5px;
  position: relative;
}
</style>

<style scoped>
.modal-overlay .modal-sm-md-init {
  width: 600px;
  max-width: 90%;
  max-height: 90%;
}

@media screen and (max-width: 650px) {
  .modal-overlay .modal-sm-md-init {
    width: 550px;
    max-height: 95%;
  }
}

@media screen and (max-width: 590px) {
  .modal-overlay .modal-sm-md-init {
    width: 95%;
    max-height: 87%;
  }
}

@media screen and (max-width: 450px) {
  .modal-overlay .modal-sm-md-init {
    width: 96%;
    max-height: 85%;
  }
}
</style>
