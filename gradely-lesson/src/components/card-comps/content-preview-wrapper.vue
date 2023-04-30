<template>
  <div class="fit-content position-absolute">
    <div class="doc-wrapper fit-content" v-if="isDoc">
      <pdf v-if="isPdf" :style="docViewStyles" :src="getContent" />

      <VueDocPreview
        v-if="isDoc && !isPdf"
        :style="docViewStyles"
        :url="getContent"
        type="office"
      />
    </div>

    <template v-if="isImage">
      <template v-if="isMultipleContent">
        <img
          v-for="(image, index) in getContent"
          :key="index"
          :style="transformStyle(index)"
          v-lazy="image"
          alt="lesson material"
          class="fit-content position-absolute fill slide"
        />
      </template>

      <template v-else>
        <img
          v-lazy="getContent"
          alt="lesson material"
          class="position-absolute fill fit-content slide"
        />
      </template>
    </template>

    <video
      ref="videoSrc"
      v-if="isVideo"
      class="fit-content"
      controls
      :src="getContent"
      :poster="getThumbnail"
    ></video>

    <div class="fit-content position-relative" v-if="isGame">
      <img
        v-lazy="staticImg('VideoPoster.png')"
        alt="game"
        class="w-100 h-100 position-absolute"
      />
      <img
        v-lazy="getGameImage"
        alt="game"
        class="w-100 h-100 position-absolute"
      />
    </div>

    <div class="navigate-button white-text font-weight-400" v-if="isOverOne">
      <div
        class="icon-wrapper"
        :class="[!showLeftCaret && 'disabled-icon']"
        @click="showLeftCaret ? slideImage(-100) : ''"
      >
        <span class="icon icon-arrow-left gfont-10 font-weight-600"></span>
      </div>

      <span class="gfont-12"
        >{{ content_index + 1 }} / {{ getContent.length }}</span
      >

      <div
        class="icon-wrapper"
        :class="[!showRightCaret && 'disabled-icon']"
        @click="showRightCaret ? slideImage(100) : ''"
      >
        <span class="icon icon-arrow-right gfont-9 font-weight-600"></span>
      </div>
    </div>

    <div
      v-if="!isGame"
      class="expand-wrapper"
      @click="saveState"
      title="Expand view"
    >
      <span class="icon icon-maximize-arrow"></span>
    </div>
  </div>
</template>

<script>
import VueDocPreview from 'vue-doc-preview';
import pdf from 'vue-pdf';
import { createNamespacedHelpers } from 'vuex';
const lesson = createNamespacedHelpers('lesson');
export default {
  name: 'ContentPreviewWrapper',

  components: {
    VueDocPreview,
    pdf,
  },

  props: {
    content: {
      type: Object,
      default: () => {},
    },

    offset: {
      type: Number,
      default: 0,
    },
  },

  watch: {
    offset: {
      handler(offset) {
        this.transform_offset += offset;
      },
      immediate: true,
    },
  },

  computed: {
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

    getGameImage() {
      return this.content?.game_image || this.staticImg('VideoPoster.png');
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

    getViewsUpdatePayload() {
      let class_id = Number(localStorage.getItem('teacher_class_id'));
      let content_id = this.content?.id;
      let content_url = this.content?.url;
      let type =
        this.content?.type == 'image' ? 'document' : this.content?.type;
      let subject_id = Number(this.content?.subject_id);

      return {
        content_id,
        content_url,
        type,
        subject_id,
        class_id,
        source: 'feed',
      };
    },
  },

  async mounted() {
    if (!this.isVideo) await this.updateViewCount(this.getViewsUpdatePayload);
    // this.$bus.$emit('refresh');
  },

  beforeDestroy() {
    if (this.isVideo && this.$refs?.videoSrc?.readyState)
      this.updateVideoContentView(this.$refs?.videoSrc);
  },

  methods: {
    ...lesson.mapActions(['updateViewCount']),

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

    slideImage(direction) {
      direction < 0 ? this.content_index++ : this.content_index--;
      this.transform_offset += direction;
    },

    transformStyle(index) {
      return {
        transform: `translateX(${this.transform_offset + index * 100}%)`,
      };
    },

    saveState() {
      if (this.$refs?.videoSrc?.readyState)
        localStorage.setItem(
          'video-' + this.content?.id,
          this.$refs?.videoSrc?.currentTime
        );
      this.$emit('preview');
    },
  },

  data() {
    return {
      transform_offset: 0,
      content_index: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
.fit-content {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: fill;
}

.doc-wrapper {
  overflow-x: hidden;
  overflow-y: auto;

  @include gray-scrollbar;
}

.fill {
  object-fit: fill;
}

.slide {
  transition: ease-in-out 0.35s transform;
}

.navigate-button {
  position: absolute;
  top: 100%;
  left: 100%;
  transform: translate(-100px, -35px);
  min-width: max-content;
  max-height: 33px;
  background: rgba(#000, 0.9);
  padding: toRem(8.5) toRem(12);
  border-radius: toRem(7);
  @include flex-row-start-nowrap;
  display: inline-flex;
  gap: 0 toRem(15);
  flex-shrink: 0;

  .icon-wrapper {
    position: relative;
    @include square-shape(18);
    border: 1.8px solid $white-text;
    border-radius: 50%;

    .icon {
      @include center-placement;
    }
  }
  .disabled-icon {
    filter: brightness(0.5);
  }
}

.expand-wrapper {
  position: absolute;
  left: 0;
  top: -5px;
  transform: translate(-55%, -90%);
  background: rgba(#000, 0.85);
  padding: toRem(6) toRem(10);
  position: relative;
  border-radius: 50%;
  @include square-shape(38);
  z-index: 5;

  @include breakpoint-down(sm) {
    @include square-shape(30);
  }

  @include breakpoint-down(xs) {
    left: 8px;
  }

  .icon {
    color: $white-text;
    @include center-placement;
    @include breakpoint-down(sm) {
      font-size: 0.8rem;
    }
  }
}
</style>
