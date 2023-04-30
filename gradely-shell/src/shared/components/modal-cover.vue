<template>
  <div
    class="modal-overlay modal-cover-overlay index-999"
    @click.self="selfCloseModal"
  >
    <div
      class="modal-cover rounded-10 modal-sm-md-init box-shadow-effect px-0"
      :class="getModalWrapperStyle"
    >
      <div class="modal-cover-body-wrapper px-0">
        <!-- DISMISS DIALOG -->
        <div
          v-if="show_close_btn"
          class="dialog-dismiss pointer index-9"
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
        size: "modal-sm-md-init", //Refer to Modal.scss for more modal sizes
        background: "white-text-bg", //Refer to Color.scss for more colors
      }),
    },

    show_close_btn: {
      type: Boolean,
      default: false,
    },

    trigger_self_close: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    getModalWrapperStyle() {
      return `${this.modal_style.shape} ${this.modal_style.size}`;
    },
  },

  mounted() {
    document.querySelector("body").style.overflow = "hidden";
  },

  beforeDestroy() {
    document.querySelector("body").style.overflow = "auto";
  },

  methods: {
    selfCloseModal() {
      if (this.trigger_self_close) this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss"></style>
