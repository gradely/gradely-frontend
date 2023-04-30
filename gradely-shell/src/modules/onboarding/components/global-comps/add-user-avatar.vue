<template>
  <label
    :for="!loading_image ? 'file-upload' : ''"
    class="add-user-avatar overflow-hidden smooth-transition pointer"
    :class="card_type === 'junior' ? 'rounded-circle' : 'rounded-10'"
  >
    <div class="avatar brand-inverse-light-bg mgb-10">
      <div
        class="icon brand-navy"
        :class="!loading_image ? 'icon-upload' : 'icon-dotted-spinner animate'"
      ></div>
    </div>

    <div class="text color-text text-center">
      {{ !loading_image ? "Upload Photo" : "Uploading" }}
    </div>

    <input
      type="file"
      id="file-upload"
      class="d-none"
      accept=".png, .jpg, .jpeg"
      @change="fileHandler"
      ref="avatarUpload"
    />

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_crop_modal">
        <avatar-crop-modal
          :image="image_loaded"
          @closeTriggered="toggleCropModal"
        />
      </transition>
    </portal>
  </label>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "addUserAvatar",

  components: {
    avatarCropModal: () =>
      import(
        /* webpackChunkName: "avatarCropModal" */ "@/modules/onboarding/modals/avatar-crop-modal"
      ),
  },

  props: {
    card_type: {
      typs: String,
      required: true,
    },
  },

  data() {
    return {
      loading_image: false,
      image_loaded: "",

      show_crop_modal: false,
    };
  },

  methods: {
    ...mapActions({
      uploadToBucket: "aws/uploadToBucket",
      resetProgressStatus: "aws/resetProgressStatus",
    }),

    toggleCropModal() {
      this.show_crop_modal = !this.show_crop_modal;
    },

    // HANDLE USER FILE UPLOAD
    fileHandler($event) {
      const file = $event.target.files[0];
      this.$refs.avatarUpload.value = "";

      // CHECK IF FILE SIZE EXCEEDS 5MB
      if (file.size < 5500000) {
        // SETUP AVATAR CROPPER
        let reader = new FileReader();

        reader.onload = () => {
          this.image_loaded = reader.result;
          this.toggleCropModal();
        };
        reader.readAsDataURL(file);

        // let payload = {
        //   name: file.name,
        //   folder: "user",
        //   file,
        // };

        // // SEND TO BUCKET
        // this.processFile(payload);
      } else {
        this.pushAlert("Please upload a 5mb maximum image file!", "warning");
      }
    },

    // PROCESS FILE TO S3 BUCKET
    processFile(payload) {
      this.uploadToBucket(payload)
        .then((response) => {
          if (response.code === 200) {
            this.loading_image = false;
            this.resetProgressStatus();
            this.$emit("new-upload", response.data.ObjectURL);
          } else this.pushAlert("File upload was cancelled!", "warning");
        })
        .catch(() => {
          this.resetProgressStatus();
          this.loading_image = false;
          this.pushAlert("An error occured while uploading image", "warning");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-user-avatar {
  border: toRem(1) solid #e5e5e5;
  @include square-shape(120);
  @include flex-column-center;
  margin: toRem(7);

  @include breakpoint-down(md) {
    @include square-shape(100);
  }

  @include breakpoint-down(xs) {
    @include square-shape(90);
    margin: toRem(4.5);
  }

  @include breakpoint-custom-down(355) {
    @include square-shape(80);
    margin: toRem(4);
  }

  @include breakpoint-custom-down(316) {
    @include square-shape(75);
    margin: toRem(3);
  }

  .avatar {
    @include square-shape(36);

    @include breakpoint-down(xs) {
      @include square-shape(34);
      margin-bottom: toRem(7) !important;
    }

    @include breakpoint-custom-down(355) {
      margin-bottom: toRem(4) !important;
      @include square-shape(28);
      margin-top: toRem(-8);
    }

    .icon {
      @include center-placement;
      font-size: toRem(15);

      @include breakpoint-custom-down(355) {
        font-size: toRem(13);
      }
    }

    .animate {
      @include center-placement;
      top: 29%;
      left: 29%;
      font-size: toRem(15);

      @include breakpoint-custom-down(355) {
        font-size: toRem(13);
      }
    }
  }

  .text {
    @include font-height(10.5, 15);

    @include breakpoint-down(xs) {
      @include font-height(10, 14);
    }

    @include breakpoint-custom-down(355) {
      @include font-height(9.5, 10);
    }
  }

  &:hover {
    border: toRem(1) solid $brand-inverse;
    background: rgba($brand-inverse-light, 0.3);
    box-shadow: 0 0 toRem(3) rgba($black-text, 0.15);
  }
}
</style>
