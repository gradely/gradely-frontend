<template>
  <div class="slide-card round-10" @click="$emit('showLessonModal')">
    <div class="slide-card__media">
      <div class="slide-card__present">
        <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.33317 6V6.66667H3.6665V6H0.999837C0.911432 6 0.826647 5.96488 0.764135 5.90237C0.701623 5.83986 0.666504 5.75507 0.666504 5.66667V1H7.33317V5.66667C7.33317 5.75507 7.29805 5.83986 7.23554 5.90237C7.17303 5.96488 7.08824 6 6.99984 6H4.33317ZM2.6665 2.33333C2.46872 2.33333 2.27538 2.39198 2.11093 2.50186C1.94648 2.61175 1.81831 2.76792 1.74262 2.95065C1.66694 3.13338 1.64713 3.33444 1.68572 3.52842C1.7243 3.7224 1.81954 3.90059 1.9594 4.04044C2.09925 4.18029 2.27743 4.27553 2.47141 4.31412C2.66539 4.3527 2.86646 4.3329 3.04919 4.25721C3.23191 4.18153 3.38809 4.05335 3.49797 3.8889C3.60785 3.72445 3.6665 3.53111 3.6665 3.33333H2.6665V2.33333ZM4.33317 2.33333V3H6.33317V2.33333H4.33317ZM4.33317 3.66667V4.33333H6.33317V3.66667H4.33317ZM0.666504 0H7.33317V0.666667H0.666504V0Z"
            fill="#F5F5F5"
          />
        </svg>
      </div>

      <img v-lazy="getThumbNail" alt="card" class="slide-card__img" />

      <!-- <img :src="featured_document.thumbnail" :alt="featured_document.title" class="slide-card__img" /> -->
    </div>
    <div class="slide-card__body">
      <div class="slide-card__top">
        <div class="slide-card__title m-0 font-weight-700 color-text text-capitalize">{{ getTitle }}</div>
        <div class="slide-card__subtitle text-capitalize">
          <div class="color-grey-dark">{{ featured_document.subject }}</div>
          <div class="dot" />
          <!-- <div class="color-grey-dark">Slide</div> -->
          <div class="color-grey-dark text-capitalize">{{ featured_document.file_type }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideCard',

  components: {
    PresentationModal: () =>
      import(
        /* webpackChunkName: "modals" */ '@/modals/presentation-modal.vue'
      ),
  },

  props: {
    featured_document: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    getThumbNail() {
      if (this.featured_document?.type == 'image')
        return (
          this.featured_document?.thumbnail ||
          this.featured_document?.url ||
          this.staticImg('cardimage3.jpg')
        );
      return (
        this.featured_document?.thumbnail || this.staticImg('cardimage3.jpg')
      );
    },

    getTitle() {
      let names = this.featured_document?.title?.split('.');
      if (names.length > 1) names.pop();
      return names.join('');
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-card {
  cursor: pointer;
  width: toRem(200);
  flex-shrink: 0;
  position: relative;

  &:nth-last-child(1) {
    margin-right: 0;
  }

  &:hover {
    @include box-shadow();
  }

  @include breakpoint-custom-down(470) {
    width: toRem(180);
  }

  @include breakpoint-custom-down(431) {
    width: toRem(175);
  }

  @include breakpoint-custom-down(370) {
    width: toRem(230);
    max-width: 80%;
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 10px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
    border-radius: 0 0 10px 10px;
    background: #ffffff;

    .slide-card__top {
      margin-bottom: 30px;
    }
  }

  &__media {
    background: $brand-inverse-light;
    border-radius: 10px 10px 0px 0px;
    width: 100%;
    height: 120px;
    // position: relative;

    .slide-card__present {
      width: 16px;
      height: 16px;
      background: #161616;
      position: absolute;
      left: 87%;
      top: 3%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
    }

    .slide-card__img {
      width: 100%;
      object-fit: cover;
      height: 100%;
      border-radius: 10px 10px 0px 0px;
    }
  }

  &__title {
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__subtitle {
    display: flex;
    align-items: center;
    font-size: 11px;
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
}
</style>
