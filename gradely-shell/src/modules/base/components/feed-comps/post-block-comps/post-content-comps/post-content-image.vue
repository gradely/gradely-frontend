<template>
  <div
    class="
      position-relative
      d-flex
      justify-content-start
      w-100
      h-auto
      overflow-hidden
    "
  >
    <div class="spacer"></div>

    <div class="w-100 h-auto overflow-hidden">
      <template name="one" v-if="image.length === 1">
        <div
          class="post-content-image overflow-hidden pointer padded-area pdt-0"
          @click="resetImageIndex(0)"
        >
          <img
            class="brand-inverse-light-bg"
            v-lazy="isServerImage ? image[0] : mxStaticImg(image[0], 'base')"
            alt=""
          />
        </div>
      </template>

      <!-- TWO IMAGES -->
      <template name="two" v-if="image.length === 2">
        <div class="image-set-two w-100 padded-area pdt-0">
          <!-- IMAHE ONE -->
          <div class="image-card" @click="resetImageIndex(0)">
            <img
              v-lazy="image[0]"
              alt=""
              class="custom-image brand-inverse-light-bg"
            />
          </div>

          <!-- IMAHE TWO -->
          <div class="image-card" @click="resetImageIndex(1)">
            <img
              v-lazy="image[1]"
              alt=""
              class="custom-image brand-inverse-light-bg"
            />
          </div>
        </div>
      </template>

      <!-- THREE IMAGES  -->
      <template name="three" v-if="image.length === 3">
        <div class="image-holder w-100 padded-area pdt-0">
          <!-- TOP IMAGE SET -->
          <div class="top w-100" @click="resetImageIndex(0)">
            <img
              v-lazy="image[0]"
              alt=""
              class="custom-image brand-inverse-light-bg"
            />
          </div>

          <!-- BOTTOM IMAGE SET -->
          <div class="bottom w-100">
            <div class="image-card" @click="resetImageIndex(1)">
              <img
                v-lazy="image[1]"
                alt=""
                class="custom-image brand-inverse-light-bg"
              />
            </div>

            <div class="image-card" @click="resetImageIndex(2)">
              <img
                v-lazy="image[2]"
                alt=""
                class="custom-image brand-inverse-light-bg"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- FOUR IMAGES  -->
      <template name="four" v-if="image.length === 4">
        <div class="image-holder w-100 padded-area pdt-0">
          <!-- TOP IMAGE SET -->
          <div class="top w-100" @click="resetImageIndex(0)">
            <img
              v-lazy="image[0]"
              alt=""
              class="custom-image brand-inverse-light-bg"
            />
          </div>

          <!-- BOTTOM IMAGE SET -->
          <div class="bottom w-100">
            <div class="image-card image-card-by-3" @click="resetImageIndex(1)">
              <img
                v-lazy="image[1]"
                alt=""
                class="custom-image brand-inverse-light-bg"
              />
            </div>

            <div class="image-card image-card-by-3" @click="resetImageIndex(2)">
              <img
                v-lazy="image[2]"
                alt=""
                class="custom-image brand-inverse-light-bg"
              />
            </div>

            <div class="image-card image-card-by-3" @click="resetImageIndex(3)">
              <img
                v-lazy="image[3]"
                alt=""
                class="custom-image brand-inverse-light-bg"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- FIVE IMAGES  -->
      <template name="five" v-if="image.length === 5">
        <div class="image-holder w-100 padded-area pdt-0">
          <!-- TOP IMAGE SET -->
          <div class="top-split w-100">
            <div class="image-card" @click="resetImageIndex(0)">
              <img
                v-lazy="image[0]"
                alt=""
                class="custom-image brand-inverse-light-bg"
              />
            </div>

            <div class="image-card" @click="resetImageIndex(1)">
              <img
                v-lazy="image[1]"
                alt=""
                class="custom-image brand-inverse-light-bg"
              />
            </div>
          </div>

          <!-- BOTTOM IMAGE SET -->
          <div class="bottom w-100">
            <div class="image-card image-card-by-3" @click="resetImageIndex(2)">
              <img
                v-lazy="image[2]"
                alt=""
                class="custom-image brand-inverse-light-bg"
              />
            </div>

            <div class="image-card image-card-by-3" @click="resetImageIndex(3)">
              <img
                v-lazy="image[3]"
                alt=""
                class="custom-image brand-inverse-light-bg"
              />
            </div>

            <div class="image-card image-card-by-3" @click="resetImageIndex(4)">
              <img
                v-lazy="image[4]"
                alt=""
                class="custom-image brand-inverse-light-bg"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- MORE THAN 5 IMAGES  -->
      <template name="six_above" v-if="image.length > 5"></template>

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
              resources: [...image],
              image_current_index: current_index,
              thumbnails: [],
              sharable: true,
              type: 'image',
            }"
            @closeTriggered="togglePreviewer"
          />
        </transition>
      </portal>
    </div>
  </div>
</template>

<script>
import mediaViewer from "@/shared/components/media-viewer";

export default {
  name: "PostContentImage",

  components: {
    mediaViewer,
  },

  props: {
    post: {
      type: Object,
    },

    image: Array,
  },

  computed: {
    isServerImage() {
      return this.image[0].startsWith("http");
    },
  },

  data: () => ({
    show_previewer: false,
    current_index: 0,
  }),

  methods: {
    togglePreviewer() {
      this.show_previewer = !this.show_previewer;
    },

    resetImageIndex(index) {
      this.current_index = index;
      this.togglePreviewer();
    },
  },
};
</script>

<style lang="scss" scoped>
.post-content-image {
  @include transition(0.4s);
  margin-bottom: toRem(10);
  min-height: toRem(60);
  height: auto;
  max-height: toRem(400);
  position: relative;

  &:hover {
    transform: scale(0.99);
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.padded-area {
  @include breakpoint-down(xs) {
    padding-left: toRem(4) !important;
    padding-right: toRem(4) !important;
  }
}

.image-set-two {
  position: relative;
  @include flex-row-between-nowrap;
  height: 360px;

  @include breakpoint-down(sm) {
    height: 350px;
  }

  @include breakpoint-down(xs) {
    height: 320px;
  }

  @include breakpoint-custom-down(360) {
    height: 260px;
  }

  .image-card {
    @include transition(0.4s);
    background: $color-white;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    width: 49.75%;
    height: 100%;

    &:hover {
      transform: scale(0.99);
    }
  }
}

.image-holder {
  @include flex-column-center;
  justify-content: space-between;
  height: 400px;

  @include breakpoint-down(sm) {
    height: 360px;
  }

  @include breakpoint-down(xs) {
    height: 320px;
  }

  @include breakpoint-custom-down(340) {
    height: 300px;
  }

  .top {
    position: relative;
    @include transition(0.4s);
    background: $color-white;
    overflow: hidden;
    cursor: pointer;
    height: 54.75%;

    &:hover {
      transform: scale(0.99);
    }
  }

  .top-split {
    @include flex-row-between-nowrap;
    position: relative;
    overflow: hidden;
    height: 54.75%;
  }

  .bottom {
    @include flex-row-between-nowrap;
    position: relative;
    overflow: hidden;
    height: 44.8%;
  }

  .image-card {
    position: relative;
    @include transition(0.4s);
    background: $color-white;
    overflow: hidden;
    cursor: pointer;
    width: 49.8%;
    height: 100%;

    &:hover {
      transform: scale(0.99);
    }
  }

  .image-card-by-3 {
    width: 33%;
  }
}

.custom-image {
  @include background-cover;
  background-position: center center;
}
</style>
