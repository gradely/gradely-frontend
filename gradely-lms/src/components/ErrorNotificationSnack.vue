<template>
  <div class="error-notification-wrapper-main" v-if="isOpen">
    <section class="error-alert-wrapper">
      <span class="icon-error-alert"></span>
    </section>
    <span class="txt-error-dialogue-message">
      <span>
        <p class="txt-err-p-inner">Error parsing your questions</p>
        <ul class="option-error-alert-list" v-if="errors && errors.length">
          <li v-for="(error, index) in errors" :key="index" class="err-item">
            {{ error }}
          </li>
        </ul>
        <p class="footer-main-txt">
          Make these corrections and
          <span class="txt-main-span">try again</span>
        </p>
        <router-link :to="{ name: 'LMSBulkUpload' }">
          <button class="btn button try-btn">Try again</button>
        </router-link>
      </span>
      <span class="close-x-btn icon-wrong" @click="isOpen = false"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: "ErrorNotificationSnack",
  data() {
    return {
      isOpen: true,
    };
  },
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-main-txt {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 165%;
  align-items: center;
  color: #113255;
  .txt-main-span {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 165%;
    align-items: center;
    color: #113255;
  }
}

.try-btn {
  background: $white-text;
  color: $brand-navy;
}

.close-x-btn {
  font-size: 0.87rem;
  color: #959595;
  margin: 0.1875rem;
  cursor: pointer;
}
.error-notification-wrapper-main {
  @include flex-row-start-end;
  align-items: flex-start;
  padding: 1rem;
  max-width: 100%;
  background: $brand-red-light;
  border: 1px solid $brand-tonic;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 0.5rem auto;
  .txt-error-dialogue-message {
    @include flex-row-between-nowrap;
    align-items: flex-start;
    margin-left: 0.43rem;
    width: 100%;
    .txt-err-p-inner {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 19px;
      color: #113255;
    }
  }

  .option-error-alert-list {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 165%;
    color: #113255;
  }
  .error-alert-wrapper {
    .icon-error-alert {
      font-size: 2rem;
      color: $brand-tonic;
    }
  }
}
</style>
