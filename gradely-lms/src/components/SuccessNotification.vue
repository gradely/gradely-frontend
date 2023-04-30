<template>
  <div v-if="isOpen" class="success-notification-wrapper-main">
    <section class="success-alert-wrapper">
      <span class="icon-verified-user"></span>
    </section>

    <span class="txt-success-dialogue-message">
      <span class="txt-success-p-inner">{{ text }}</span>
      <span class="close-x-btn icon-wrong" @click="isOpen = false"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: "SuccessNotificationSnack",
  data() {
    return {
      isOpen: true
    };
  },
  props: {
    text: {
      type: String,
      default:
        "8 Questions parsed successfully and ready to be added to your assessment."
    }
  }
};
</script>

<style lang="scss" scoped>
.success-notification-wrapper-main {
  @include flex-row-start-end;
  align-items: center;
  padding: 1rem;
  max-width: 100%;
  background: #d7f4eb;
  border: 1px solid #5d6460;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 0.5rem auto;

  .close-x-btn {
    font-size: 0.87rem;
    color: #959595;
    margin: 0.1875rem;
    cursor: pointer;
  }

  .txt-success-dialogue-message {
    margin-left: 0.43rem;
    @include flex-row-between-nowrap;
    width: 100%;
    .txt-success-p-inner {
      font-style: normal;
      font-weight: 400;
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
  .success-alert-wrapper {
    .icon-verified-user {
      font-size: 2rem;
      color: #24ae5f;
    }
  }
}
</style>
