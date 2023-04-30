<template>
  <div class="video-card round-10" @click="$emit('showLessonModal')">
    <img :src="image_url" alt width="200" height="200" v-if="image_url" />
    <input type="file" name id="filer" hidden @change="handleUpoad" />
    <div class="video-card__media">
      <div class="video-card__transparent">
        <div class="video-card__playBtn">
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
        <div class="video-card__timer font-weight-500">
          <span v-if="hours!=='00'">{{hours}}</span>
          <span v-if="hours!=='00'">:</span>
          <span>{{minutes}}</span>
          <span>:</span>
          <span>{{seconds}}</span>
        </div>
      </div>
      <img v-lazy="getThumbnail" alt="card" class="video-card__img" />
    </div>
    <div class="video-card__body">
      <div class="video-card__top">
        <div
          class="video-card__title m-0 font-weight-700 color-text text-capitalize"
        >{{ video.title }}</div>
        <div class="video-card__subtitle">
          <div class="color-grey-dark text-capitalize">{{ video.subject }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoCard',

  components: {
    VideoModal: () =>
      import(/* webpackChunkName: "modals" */ '@/modals/video-modal.vue'),
  },

  props: {
    video: {
      type: Object,
      default: () => {},
    },
  },

  watch: {
    video: {
      async handler(vid) {
        let video = document.createElement('video');

        video.src = vid?.url;

        video.onloadedmetadata = () => {
          let duration = video.duration;
          let hours = Math.floor(duration / 3600);
          let minutes = Math.floor((duration % 3600) / 60);
          let seconds = Math.floor(duration % 60);
          this.hours = hours < 10 ? `0${hours}` : hours;
          this.minutes = minutes < 10 ? `0${minutes}` : minutes;
          this.seconds = seconds < 10 ? `0${seconds}` : seconds;
        };
      },
      immediate: true,
    },
  },

  computed: {
    getThumbnail() {
      return this.video?.thumbnail || this.staticImg('VideoPoster.png');
    },
  },

  data() {
    return {
      showVideoModal: false,
      image_url: '',
      minutes: '00',
      seconds: '00',
      hours: '00',
    };
  },

  methods: {
    toggleVideoModal() {
      this.showVideoModal = !this.showVideoModal;
    },

    async handleUpoad(event) {
      const file = event.target.files[0];
      this.image_url = await this.getVideoThumbnail(file, 10);
    },

    uploadVideo() {
      const filer = document.getElementById('filer');
      filer.click();
    },

    getVideoThumbnail(file, seekTo = 10.0) {
      return new Promise((resolve, reject) => {
        // load the file to a video player
        const videoPlayer = document.createElement('video');

        videoPlayer.setAttribute('src', URL.createObjectURL(file));
        // console.log('getting video URL', URL.createObjectURL(file));
        videoPlayer.load();
        videoPlayer.addEventListener('error', (ex) => {
          reject('error when loading video file', ex);
        });
        // load metadata of the video to get video duration and dimensions
        videoPlayer.addEventListener('loadedmetadata', () => {
          // seek to user defined timestamp (in seconds) if possible
          if (videoPlayer.duration < seekTo) {
            reject('video is too short.');
            return;
          }
          // delay seeking or else 'seeked' event won't fire on Safari
          setTimeout(() => {
            videoPlayer.currentTime = seekTo;
          }, 200);
          // extract video thumbnail once seeking is complete
          videoPlayer.addEventListener('seeked', () => {
            console.log('video is now paused at %ss.', seekTo);
            // define a canvas to have the same dimension as the video
            const canvas = document.createElement('canvas');
            canvas.width = videoPlayer.videoWidth;
            canvas.height = videoPlayer.videoHeight;
            // draw the video frame to canvas
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);

            resolve(canvas.toDataURL('image/png'));

            // return the canvas image as a blob
            // ctx.canvas.toBlob(
            //   (blob) => {
            //     resolve(blob);
            //   },
            //   'image/jpeg',
            //   0.75 /* quality */
            // );
          });
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.video-card {
  cursor: pointer;
  width: toRem(220);
  flex-shrink: 0;

  @include breakpoint-custom-down(490) {
    width: toRem(200);
  }

  @include breakpoint-custom-down(435) {
    width: toRem(260);
  }

  &:hover,
  &:focus {
    background: $color-white;
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    .video-card__top {
      margin-bottom: 10px;
    }
  }

  &__media {
    position: relative;
    width: 100%;
    height: 150px;
    border-radius: 10px;
    background: $brand-inverse-light;

    .video-card__transparent {
      position: absolute;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));

      .video-card__playBtn {
        width: 32px;
        height: 32px;
        border-radius: 20px;
        background: #fceacf;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .video-card__timer {
        display: inline-flex;
        gap: 0 2px;
        position: absolute;
        top: 80%;
        left: 73%;
        padding: 4px 12px;
        font-size: 11px;
        border-radius: 30px;
        background: rgba(0, 0, 0, 0.65);
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .video-card__img {
      width: 100%;
      object-fit: cover;
      height: 100%;
      border-radius: 10px;
    }
  }

  &__title {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__subtitle {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin: 4px 0;

    div {
      margin-right: 10px;
    }
  }
}
</style>
