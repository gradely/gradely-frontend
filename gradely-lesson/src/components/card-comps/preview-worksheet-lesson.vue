<template>
  <div class="preview-worksheet">
    <div class="preview-worksheet__media">
      <div class="preview-worksheet__transparent">
        <div class="preview-worksheet__actions">
          <div class="preview-worksheet__actions--left">
            <i class="icon-file-text"></i>
            <div class="font-weight-700">Worksheet</div>
          </div>

          <div class="close-container">
            <i class="icon-close"></i>
          </div>
        </div>

        <div class="preview-worksheet__actions--bottom">
          <div class="preview-worksheet__slider">
            <div class="preview-worksheet__slider--left">
              <i class="icon-arrow-left"></i>
            </div>
            <div class="preview-worksheet__page-count font-weight-400">1/5</div>
            <div class="preview-worksheet__slider--right">
              <i class="icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <img
        src="@/assets/static/cardimage.jpg"
        alt="card"
        class="preview-worksheet__img"
      />
    </div>

    <div class="preview-worksheet__body">
      <div class="preview-worksheet__top">
        <div class="preview-worksheet__top--left">
          <div class="preview-worksheet__title m-0 font-weight-700">
            Learning time on the clock
          </div>
          <div class="preview-worksheet__subtitle">
            <div class="font-weight-400 color-grey-dark">Mathematics</div>
            <div class="dot"></div>
            <div
              class="preview-worksheet__views font-weight-400 color-grey-dark"
            >
              <span>4,405</span> Views
            </div>
          </div>
        </div>
        <div class="preview-worksheet__top--right">
          <i class="icon-share"></i>
          <div class="font-weight-700">Share Lesson</div>
        </div>
      </div>
      <div class="preview-worksheet__bottom">
        <div class="preview-worksheet__like">
          <i class="icon-thumbs-up"></i>
          <span class="font-weight-400">1.2k</span>
        </div>
        <div class="preview-worksheet__dislike">
          <i class="icon-thumbs-down"></i>
          <span class="font-weight-400">700</span>
        </div>
        <div class="preview-worksheet__download">
          <i class="icon-cloud-download"></i>
          <div class="font-weight-400">Download</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.preview-worksheet {
  // width: 870px;
  width: 100%;
  border-radius: 20px;

  &__page-count {
    padding: 0 12px;
  }

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

  &__slider {
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 14px;
    color: #f5f5f5;

    &--left {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      border: 1px solid #f5f5f5;
      display: grid;
      place-items: center;
    }
    &--right {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      border: 1px solid #f5f5f5;
      display: grid;
      place-items: center;
      font-size: 10px;
    }
  }
}

.preview-worksheet__body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 40px;
  // box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 10px 10px;
  background: #ffffff;
  border: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);

  .preview-worksheet__top {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;

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

  .preview-worksheet__bottom {
    display: flex;
  }
}

.preview-worksheet__media {
  position: relative;
  width: 100%;
  height: 520px;
  border-radius: 10px 10px 0 0;
  background: $brand-inverse-light;

  .preview-worksheet__transparent {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30%;
    align-items: center;
    border-radius: 10px 10px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));

    .preview-worksheet__actions {
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

        .icon-image {
          margin-right: 2px;
        }
      }

      &--bottom {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        padding: 22px 28px;
      }
    }
  }

  .preview-worksheet__img {
    width: 100%;
    object-fit: cover;
    height: 100%;
    border-radius: 10px 10px 0 0;
  }
}
.preview-worksheet__title {
  font-size: 21px;
  color: #353535;
}
.preview-worksheet__subtitle {
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
