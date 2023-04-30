<template>
  <modal-cover @closeModal="$emit('closeTriggered')" :show_close_btn="false">
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div
          class="main-container d-flex align-items-center flex-column  justify-content-center"
        >
          <div class="proctor-img">
            <img :src="FaceIdImage" alt="Proctor-img" />
          </div>
          <div
            class="d-flex align-items-center flex-column  justify-content-center description mgt-30"
          >
            <span class="text-one">
              You are about to start a proctored exam
            </span>
            <span class="text-two mgt-10">
              We will have to make use of your camera and microphone
            </span>
          </div>
          <div class="buttons mgt-30 mgb-30 d-flex align-items-center">
            <div class="btn-wrapper">
              <button @click="$emit('cancel')" class="btn-cancel btn-consent">
                Cancel
              </button>
            </div>
            <div class="btn-wrapper">
              <button
                @click="$emit('continue')"
                class="btn-confirm btn btn-consent btn-accent rounded-pill p-2 px-3"
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </modal-cover>
</template>
<script>
import FaceIdImage from "@/assets/dynamic/face-id.png";
import modalCover from "@/components/global-comps/modal-cover";

export default {
  components: { modalCover },

  data() {
    return {
      FaceIdImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  .buttons {
    .btn-wrapper:nth-child(2) {
      margin-left: 1rem;
    }
    .btn-consent {
      background: none;
    }
    .btn-cancel {
      color: #f6515b;
    }
  }
}
</style>
