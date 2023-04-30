<template>
  <div class="media-layout">
    <!-- TOP NAV -->
    <div class="preview-nav d-flex justify-content-between align-items-center">
      <div class="left-items d-flex align-items-center">
        <div
          class="avatar-wrapper font-weight-600 color-white gfont-14"
          :class="$color.getProfileBgColor(getAuthUser.full_name)"
        >
          {{ $string.getStringInitials(getAuthUser.full_name) }}
        </div>

        <img v-if="0" v-lazy alt="avatar" class="avatar-img" />

        <div>
          <div class="gfont-13 mb-1 font-weight-600 color-white">
            {{ getAuthUser.full_name }}
          </div>
          <div class="color-grey-dark gfont-11 font-weight-500">
            12th June, 2020 2:46 PM
          </div>
        </div>
      </div>

      <div
        class="right-items d-flex align-items-center gap-3 gap-sm-4 brand-inverse-light"
      >
        <div class="d-flex align-items-center gap-1" v-if="false">
          <div class="icon icon-eye gfont-12"></div>
          <div class="gfont-12">15</div>
        </div>

        <span
          class="icon icon-cloud-download gfont-22 pointer"
          @click="downloadContent"
        ></span>

        <span
          class="icon icon-share pointer"
          @click="toggleShareLessonModal"
        ></span>

        <div class="divider pointer"></div>

        <span
          class="icon icon-close gfont-12 pointer"
          @click="$emit('closeTriggered')"
        ></span>
      </div>
    </div>

    <div class="content-wrapper">
      <video
        @loadeddata="setUpVideo($refs.videoSrc)"
        ref="videoSrc"
        v-if="isVideo"
        class="video-player"
        controls
        :src="getContent"
        :poster="getThumbnail"
      ></video>

      <div class="doc-wrapper" v-if="isPdf">
        <pdf :src="getContent" :style="docViewStyles" />
      </div>

      <div class="doc-wrapper" v-if="isDoc && !isPdf">
        <VueDocPreview :style="docViewStyles" :url="getContent" type="office" />
      </div>

      <div class="image-slide" v-if="isImage">
        <div
          v-if="showLeftCaret"
          class="icon icon-caret-left left-caret gfont-13 pointer index-9"
          @click="slideImage(-100)"
        ></div>

        <div
          v-if="showRightCaret"
          class="icon icon-caret-right right-caret gfont-13 pointer"
          @click="slideImage(100)"
        ></div>

        <div class="image-wrapper">
          <template v-if="isMultipleContent">
            <img
              :style="transformStyle(index)"
              v-for="(image, index) in getContent"
              :key="index + image"
              class="slide-image"
              v-lazy="image"
              alt="lesson material"
            />
          </template>

          <template v-else>
            <img
              v-lazy="getContent"
              alt="Lesson Material"
              class="slide-image"
            />
          </template>
        </div>
      </div>

      <div
        v-if="isMultipleContent && isImage"
        class="gfont-16 doc"
        :class="isOverOne ? 'doc-preview' : 'doc-preview2'"
      >
        <div class="d-flex items-center gfont-13" v-if="isOverOne">
          <span>{{ content_index + 1 }}</span>
          <span class="mx-2">of</span>
          <span class>{{ getContent.length }}</span>
        </div>
        <span class="gfont-15 icon icon-minus pointer"></span>
        <span class="gfont-15 icon icon-zoom-in"></span>
        <span class="gfont-15 icon icon-plus pointer"></span>
      </div>
    </div>

    <transition name="fade" v-if="showShareLessonModal">
      <share-lesson-modal
        @closeTriggered="toggleShareLessonModal"
        :content="content"
      />
    </transition>
  </div>
</template>

<script>
import VueDocPreview from 'vue-doc-preview';
import pdf from 'vue-pdf';
import shareLessonModal from '@/modals/share-lesson-modal';
import { createNamespacedHelpers } from 'vuex';
const lesson = createNamespacedHelpers('lesson');

export default {
  name: 'MediaPreview',

  components: {
    VueDocPreview,
    pdf,
    shareLessonModal,
  },

  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    getTodayDate() {
      let date = new Date().toLocaleDateString();
      let day = this.$date.formatDate(date).getDay('d3');
      let month = this.$date.formatDate(date).getMonth('m3');
      let year = this.$date.formatDate(date).getYear('y1');
      let hour = this.$date.formatDate(date).getHour('h1');
      let minute = this.$date.formatDate(date).getMinute('b2');
      let meridian = this.$date.formatDate(date).getMeridian();
      return `${day} ${month}, ${year} ${hour}:${minute} ${meridian}`;
    },

    isMultipleContent() {
      return Array.isArray(this.content?.url);
    },

    isOverOne() {
      return this.isMultipleContent && this.getContent?.length > 1;
    },

    showLeftCaret() {
      let content_size = this.getContent?.length;
      return this.isMultipleContent && this.content_index < content_size - 1;
    },

    showRightCaret() {
      return this.isMultipleContent && this.content_index > 0;
    },

    getThumbnail() {
      return this.content?.thumbnail || this.staticImg('VideoPoster.png');
    },

    getContent() {
      return this.content?.url;
    },

    isPdf() {
      return this.content?.extension === 'pdf';
    },

    isGame() {
      return this.content?.type === 'game';
    },

    isImage() {
      return this.content?.type === 'image';
    },

    isVideo() {
      return this.content?.type === 'video';
    },

    isDoc() {
      return this.content?.type === 'document';
    },

    docViewStyles() {
      return {
        height: '100%',
        maxHeight: '100%',
        width: '100%',
        maxWidth: '100%',
        margin: 'auto',
      };
    },
  },

  watch: {
    $refs: {
      async handler(ref) {},
      immediate: true,
    },
  },

  data() {
    return {
      transform_offset: 0,
      content_index: 0,
      showShareLessonModal: false,
    };
  },

  beforeDestroy() {
    if (this.isVideo && this.$refs?.videoSrc?.readyState)
      this.updateVideoContentView(this.$refs?.videoSrc);
  },

  methods: {
    ...lesson.mapActions(['updateViewCount']),

    setUpVideo(video) {
      let currentTime = localStorage.getItem('video-' + this.content?.id);
      if (currentTime) video.currentTime = currentTime;
      localStorage.removeItem('video-' + this.content?.id);
    },

    updateVideoContentView(video) {
      let video_is_ready = video?.readyState;
      let class_id = Number(localStorage.getItem('teacher_class_id'));
      let total_duration = video_is_ready ? video?.duration + '' : '0';
      let current_duration = video_is_ready ? video.currentTime + '' : '0';
      let is_completed = current_duration >= 0.9 * total_duration;
      let content_id = this.content?.id;
      let content_url = this.content?.url;
      let type = this.content?.type;
      let subject_id = Number(this.content?.subject_id);

      let payload = {
        content_id,
        content_url,
        type,
        subject_id,
        class_id,
        total_duration,
        current_duration,
        is_completed,
        source: 'feed',
      };

      this.updateViewCount(payload);
    },

    closeModal() {
      this.$emit('closeTriggered');
    },

    slideImage(direction) {
      direction < 0 ? this.content_index++ : this.content_index--;
      this.transform_offset += direction;
    },

    transformStyle(index) {
      return {
        transform: `translateX(${this.transform_offset + index * 100}%)`,
      };
    },

    toggleShareLessonModal() {
      this.showShareLessonModal = !this.showShareLessonModal;
    },

    downloadContent() {
      let link = document.createElement('a');
      link.setAttribute('href', this.content?.url);
      link.setAttribute('download', this.content.title);
      link.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.media-layout {
  width: 100%;
  min-height: calc(100% + 65px);
  max-width: 100%;
  position: fixed;
  inset: 0;
  background: rgba(#000000, 0.95);
  z-index: 10;
}

.preview-nav {
  background: #000;
  padding: toRem(12) toRem(32);

  @include breakpoint-down(sm) {
    padding: toRem(12) toRem(10);
  }

  .avatar-wrapper {
    @include flex-row-center-wrap;
    @include square-shape(35);
    margin-right: toRem(10);
    border-radius: toRem(5);
  }

  .avatar-img {
    @include square-shape(30);
    border-radius: toRem(5);
    object-fit: cover;
    margin-right: toRem(10);
  }

  .divider {
    width: 1px;
    background: $brand-inverse-light;
    height: 25px;
  }
}

.right-items {
  .icon {
    transition: all ease-in-out 0.25s;
    &:hover {
      transform: scale(1.15);
    }
  }

  .icon-cloud-download {
    &:hover {
      color: $brand-accent;
    }
  }

  .icon-share {
    &:hover {
      color: $brand-green;
    }
  }

  .icon-close {
    &:hover {
      color: $brand-red;
    }
  }
}

.content-wrapper {
  position: relative;
  width: 100%;
  height: calc(100% - 65px);
  margin: auto;
  //   @include flex-column-start-center;
  @include flex-column-center;

  .video-player {
    max-height: 450px;
    max-width: 95%;
    width: 700px;
    aspect-ratio: 1.6;
    border-radius: toRem(10);
    object-fit: fill;
    background: rgba(#000, 0.95);
    position: relative;
    top: -55px;

    @include breakpoint-down(lg) {
      width: 650px;
    }

    @include breakpoint-down(md) {
      width: 570px;
    }

    @include breakpoint-custom-down(602) {
      max-height: 500px;
    }

    @include breakpoint-down(sm) {
      max-height: 75%;
      width: 94%;
      aspect-ratio: 1.3;
    }

    @include breakpoint-down(xs) {
      width: 98%;
      max-height: 80%;
      aspect-ratio: 1.2;
      border-radius: toRem(5);
    }
  }

  .image-slide {
    width: 550px;
    max-width: calc(100% - 40px);
    max-height: 70%;
    aspect-ratio: 1.5;
    position: relative;
    top: -40px;

    @include breakpoint-down(lg) {
      width: 600px;
      max-height: 70%;
    }

    @include breakpoint-down(md) {
      width: 500px;
      max-height: 75%;
    }

    @include breakpoint-down(sm) {
      width: 400px;
      max-height: 75%;
    }

    @include breakpoint-down(xs) {
      max-width: calc(100% - 37px);
      width: 98%;
      max-height: 75%;
    }

    .image-wrapper {
      display: flex;
      gap: 0 20px;
      height: 100%;
      width: 100%;
      max-width: 100%;
      max-height: 100%;
      overflow-x: hidden;
      border-radius: inherit;
      scroll-behavior: smooth;
      position: relative;
      border-radius: toRem(7);

      &::-webkit-scrollbar {
        height: 0;
      }
    }

    .slide-image {
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
      margin: auto;
      object-fit: fill;
      border-radius: inherit;
      transition: ease-in-out 0.35s transform;
      position: absolute;
    }

    .left-caret {
      background: #fff;
      border-radius: 50%;
      @include square-shape(37);
      @include flex-row-center-nowrap;
      top: calc(50% - 18.5px);
      transform: translateX(-150%);
      z-index: 10;
      position: absolute;

      @include breakpoint-custom-down(600) {
        transform: translateX(-50%);
      }
    }

    .right-caret {
      background: #fff;
      border-radius: 50%;
      @include square-shape(37);
      @include flex-row-center-nowrap;
      top: calc(50% - 18.5px);
      left: 100%;
      transform: translateX(50%);
      z-index: 10;
      position: absolute;

      @include breakpoint-custom-down(600) {
        transform: translateX(-50%);
      }
    }
  }

  .doc-wrapper {
    width: 900px;
    max-width: 95%;
    height: 100%;
    max-height: calc(100% - 65px);
    position: relative;
    top: -35px;
    overflow-y: auto;

    @include breakpoint-down(xs) {
      max-width: 98%;
    }

    &::-webkit-scrollbar {
      width: 3px;
    }
  }
}

.doc {
  display: grid;
  gap: 0 toRem(10);
  background: #000;
  color: $white-text;
  padding: toRem(7.5) toRem(15);
  border-radius: toRem(5);
}

.doc-preview {
  grid-template-columns: 55px repeat(3, 18px);
}

.doc-preview2 {
  grid-template-columns: repeat(3, 18px);
}
</style>
