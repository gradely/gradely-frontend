<template>
  <div class="teaching-aid-card">
    <div class="teaching-aid-card__media">
      <div class="teaching-aid-card__gallery">
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.3965 0.666626H2.60317C1.38984 0.666626 0.666504 1.38996 0.666504 2.60329V5.39663C0.666504 5.75996 0.729837 6.07663 0.853171 6.34329C1.13984 6.97663 1.75317 7.33329 2.60317 7.33329H5.3965C6.60984 7.33329 7.33317 6.60996 7.33317 5.39663V4.63329V2.60329C7.33317 1.38996 6.60984 0.666626 5.3965 0.666626ZM6.78984 4.16663C6.52984 3.94329 6.10984 3.94329 5.84984 4.16663L4.46317 5.35663C4.20317 5.57996 3.78317 5.57996 3.52317 5.35663L3.40984 5.26329C3.17317 5.05663 2.7965 5.03663 2.52984 5.21663L1.28317 6.05329C1.20984 5.86663 1.1665 5.64996 1.1665 5.39663V2.60329C1.1665 1.66329 1.66317 1.16663 2.60317 1.16663H5.3965C6.3365 1.16663 6.83317 1.66329 6.83317 2.60329V4.20329L6.78984 4.16663Z"
            fill="#F5F5F5"
          />
        </svg>
      </div>
      <img
        src="@/assets/static/cardimage.jpg"
        alt="card"
        class="teaching-aid-card__img"
      />
    </div>
    <div class="teaching-aid-card__body">
      <div class="teaching-aid-card__top">
        <div class="teaching-aid-card__title m-0 font-weight-700 white-text">
          A House
        </div>
        <!-- <div class="teaching-aid-card__subtitle">
          <div class="color-grey-dark">Mathematics</div>
          <div class="dot" />
          <div class="color-grey-dark">Slide</div>
        </div> -->
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
.teaching-aid-card {
  width: 300px;
  border-radius: 10px;
  position: relative;
}

.teaching-aid-card__body {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 10px 10px;
  background: radial-gradient(100% 100% at 0% 100%, #ffffff 0%, #161616 100%);
  opacity: 0.5;

  .teaching-aid-card__top {
    margin-bottom: 30px;
  }
}

.teaching-aid-card__media {
  background: $brand-inverse-light;
  border-radius: 10px 10px 0px 0px;
  width: 100%;
  height: 120px;
  position: relative;

  .teaching-aid-card__gallery {
    width: 16px;
    height: 16px;
    background: #161616;
    position: absolute;
    left: 270px;
    top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
  }

  .teaching-aid-card__img {
    width: 100%;
    object-fit: cover;
    height: 100%;
    border-radius: 10px 10px 0px 0px;
  }
}
.teaching-aid-card__title {
  font-size: 12px;
}
.teaching-aid-card__subtitle {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  font-size: 10px;
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
