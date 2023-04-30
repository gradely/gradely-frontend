<template>
  <!-- :modal_style="{ size: 'modal-mini' }" -->
  <modal-cover @closeModal="$emit('closeTriggered')" show_close_btn>
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-capitalize">
          Crop Photo
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-10">
        <!-- CROP SECTION -->
        <!-- <div class="image-crop position-relative" id="croppieBox"></div> -->
        <cropper class="cropper" ref="cropper" :src="img"></cropper>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div
        class="modal-cover-footer d-flex justify-content-center pdt-10 mgb-10"
      >
        <button class="btn btn-accent" ref="cropBtn" @click="crop">
          Crop Photo
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
  name: "avatarCropModal",

  components: {
    modalCover,
    Cropper,
  },

  props: {
    image: String,
  },

  data() {
    return {
      img: this.image,

      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
    };
  },

  methods: {
    ...mapActions({
      uploadToBucket: "aws/uploadToBucket",
      resetProgressStatus: "aws/resetProgressStatus",
    }),

    crop() {
      this.handleClick("cropBtn", "Processing...");

      const { coordinates, canvas } = this.$refs.cropper.getResult();
      this.coordinates = coordinates;

      let payload = {
        name: `image-${this.$string.generateRandomString(10)}.png`,
        folder: "user",
        file: canvas.toDataURL(),
        base64: 1,
      };

      this.uploadToBucket(payload)
        .then((response) => {
          this.handleClick("cropBtn", "Crop Photo", false);

          if (response.code === 200) {
            this.resetProgressStatus();
            this.$bus.$emit("photoUpdated", response.data.ObjectURL);
            this.$emit("closeTriggered");
          } else this.pushAlert("File upload was cancelled!", "warning");
        })
        .catch(() => {
          this.resetProgressStatus();
          this.pushAlert("An error occured while uploading image", "warning");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.cropper {
  height: 420px;
  background: #ddd;
}

.modal-cover-footer {
  .btn {
    padding: toRem(12.5) toRem(32);
    font-size: toRem(10.5);
  }
}
</style>
