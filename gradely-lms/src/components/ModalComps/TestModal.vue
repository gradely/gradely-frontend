<template>
  <modal-cover @closeModal="$emit('closeTriggered')" :show_close_btn="true">
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          Modify Subscription
        </div>
        <div class="modal-cover-meta" v-if="false">
          What is going on here...
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta maxime a
        tempora rem eveniet repellendus placeat quisquam est laboriosam! Sequi
        aperiam illo obcaecati vitae distinctio quod recusandae beatae vel,
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end">
        <button class="btn btn-accent">
          Confirm Subscription
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import ModalCover from "@/components/ModalComps/ModalCover";
export default {
  name: "TestModal",

  components: {
    ModalCover,
  },
};
</script>

<style lang="scss" scoped></style>
