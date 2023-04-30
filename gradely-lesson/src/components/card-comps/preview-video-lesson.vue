<template>
  <div class="preview-video">
    <div class="preview-video__media">
      <div class="preview-video__transparent">
        <div class="preview-video__actions">
          <div class="preview-video__actions--left">
            <i class="icon-play"></i>
            <div class="font-weight-700">Video Lesson</div>
          </div>

          <div class="close-container">
            <i class="icon-close"></i>
          </div>
        </div>
        <div class="preview-video__playBtn">
          <svg
            width="11"
            height="14"
            viewBox="0 0 11 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5195 6.14648L1.52148 0.647457C1.36992 0.554776 1.1964 0.504151 1.01878 0.500789C0.841162 0.497428 0.665852 0.541451 0.510892 0.62833C0.355932 0.71521 0.226917 0.841807 0.137123 0.995096C0.047329 1.14839 -1.91368e-06 1.32283 0 1.50048V12.4995C0.00014455 12.6771 0.0475667 12.8515 0.137395 13.0047C0.227223 13.1579 0.356219 13.2844 0.511128 13.3712C0.666038 13.4581 0.841277 13.5021 1.01884 13.4988C1.19641 13.4956 1.3699 13.4451 1.52148 13.3525L10.5195 7.85351C10.6657 7.76413 10.7865 7.6387 10.8703 7.48925C10.954 7.3398 10.998 7.17133 10.998 7C10.998 6.82866 10.954 6.6602 10.8703 6.51075C10.7865 6.36129 10.6657 6.23587 10.5195 6.14648Z"
              fill="#FAA017"
            />
          </svg>
        </div>
        <!-- <div class="preview-video__timer font-weight-400">4:20</div> -->
      </div>
      <img
        src="@/assets/static/cardimage.jpg"
        alt="card"
        class="preview-video__img"
      />
    </div>

    <div class="preview-video__body">
      <div class="preview-video__top">
        <div class="preview-video__top--left">
          <!-- <div class="preview-video__title m-0 font-weight-700">Simple Tenses</div> -->
          <div class="preview-video__title m-0 font-weight-700">
            {{ featured_video.title }}
          </div>
          <div class="preview-video__subtitle">
            <div class="font-weight-400 color-grey-dark">
              {{ featured_video.subject }}
            </div>
            <div class="dot"></div>
            <div class="preview-video__views font-weight-400 color-grey-dark">
              <span>4,405</span> Views
            </div>
          </div>
        </div>
        <div class="preview-video__top--right" @click="toggleShareLessonModal">
          <i class="icon-share"></i>
          <div class="font-weight-700">Share Lesson</div>
        </div>
      </div>
      <div class="preview-video__bottom">
        <div class="preview-video__like">
          <i class="icon-thumbs-up"></i>
          <span class="font-weight-400">1.2k</span>
        </div>
        <div class="preview-video__dislike">
          <i class="icon-thumbs-down"></i>
          <span class="font-weight-400">700</span>
        </div>
        <div class="preview-video__download">
          <i class="icon-cloud-download"></i>
          <div class="font-weight-400">Download</div>
        </div>
      </div>
    </div>

    <!--  SHARE LESSON MODAL  -->
    <transition name="fade" v-if="showShareLessonModal">
      <share-lesson-modal
        :featured_lesson="featured_video"
        @closeTriggered="toggleShareLessonModal"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VueConstructor } from 'vue';
import { VideoItemModel } from '../../store/models';

// INTERFACES
import { IVue } from '../../interfaces';

// export default class  extends Vue {
// }
@Component({
  components: {
    // pdf: pdfvuer,
    ShareLessonModal: () =>
      import(
        /* webpackChunkName: "modals" */ '@/modals/share-lesson-modal.vue'
      ),
  },
})
export default class extends (Vue as VueConstructor<IVue>) {
  @Prop({ default: {} as VideoItemModel })
  readonly featured_video!: VideoItemModel;

  showShareLessonModal = false;

  toggleShareLessonModal() {
    this.showShareLessonModal = !this.showShareLessonModal;
  }

  // props: {
  //   featured_video: {}
  // }
}
</script>

<style lang="scss" scoped>
.preview-video {
  // width: 870px;
  width: 100%;
  border-radius: 20px;

  &__like {
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    border: 1px solid #f5f5f5;
    border-radius: 25px;
    background: #f5f5f5;
    font-size: 14px;
    color: #757575;
  }
  &__dislike {
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    border: 1px solid #f5f5f5;
    border-radius: 25px;
    background: #f5f5f5;
    font-size: 14px;
    color: #757575;
  }
  &__download {
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    border: 1px solid #f5f5f5;
    border-radius: 25px;
    background: #f5f5f5;
    font-size: 14px;
    color: #757575;
  }
}

.preview-video__body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 40px;
  // box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 10px 10px;
  background: #ffffff;
  border: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);

  .preview-video__top {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;

    &--left {
    }
    &--right {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #113255;
      font-size: 12px;
      background: #fceacf;
      border: 1px solid #faa017;
      padding: 12px 24px 12px 18px;
      border-radius: 30px;

      .icon-share {
        margin-right: 11.67px;
      }
    }
  }

  .preview-video__bottom {
    display: flex;
  }
}

.preview-video__media {
  position: relative;
  width: 100%;
  height: 520px;
  border-radius: 10px 10px 0 0;
  background: $brand-inverse-light;

  .preview-video__transparent {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30%;
    align-items: center;
    border-radius: 10px 10px 0 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));

    .preview-video__playBtn {
      width: 64px;
      height: 64px;
      border-radius: 20px;
      background: #fceacf;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .preview-video__actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 20px;

      .close-container {
        display: grid;
        place-items: center;
        border: 1px solid #f5f5f5;
        width: 48px;
        height: 48px;
        border-radius: 100%;
        background: #f5f5f5;

        .icon-close {
          color: #113255;
        }
      }

      &--left {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #ffffff;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 30px;
        padding: 8px 16px;

        .icon-play {
          margin-right: 2px;
        }
      }
    }
  }

  .preview-video__img {
    width: 100%;
    object-fit: cover;
    height: 100%;
    border-radius: 10px 10px 0 0;
  }
}
.preview-video__title {
  font-size: 21px;
  color: #353535;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.preview-video__subtitle {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin: 4px 0;

  div {
    margin-right: 10px;
  }

  .dot {
    border-radius: 100%;
    background: #d5d5d5;
    width: 4px;
    height: 4px;
  }
}
</style>
