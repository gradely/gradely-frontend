<template>
  <div class="modal-overlay modal-cover-overlay">
    <div
      class="modal-cover rounded-10 modal-sm-md"
      :class="`${getModalWrapperStyle}`"
    >
      <div class="modal-cover-body-wrapper">
        <!-- DISMISS DIALOG -->
        <div
          v-if="show_close_btn"
          class="dialog-dismiss position-absolute pointer index-9"
          @click="$emit('closeModal')"
        >
          <div class="wrapper position-relative w-100 h-100">
            <div class="icon icon-close color-ash gfont-15"></div>
          </div>
        </div>

        <!-- MODAL COVER CONTAINER  -->
        <div class="modal-cover-container" :class="modal_style.background">
          <!-- MODAL COVER HEADER -->
          <slot name="modal-cover-header"></slot>

          <!-- MODAL COVER BODY -->
          <slot name="modal-cover-body"></slot>

          <!-- MODAL COVER FOOTER  -->
          <slot name="modal-cover-footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalCover",

  props: {
    modal_style: {
      type: Object,
      default: () => ({
        shape: "rounded-10",
        size: "modal-sm-md", //Refer to Modal.scss for more modal sizes
        background: "white-text-bg" //Refer to Color.scss for more colors
      })
    },
    show_close_btn: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    getModalWrapperStyle() {
      return `${this.modal_style.shape} ${this.modal_style.size}`;
    }
  }
};
</script>

<style lang="scss"></style>
