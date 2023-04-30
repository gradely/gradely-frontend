<template>
  <modal-cover @closeModal="$emit('closeTriggered')" :show_close_btn="true">
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase"></div>
        <div class="modal-cover-meta" v-if="false">
          What is going on here...
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="modal-inner-txt">
          <span class="delete-awesome-job">
            <svg
              width="72"
              height="78"
              viewBox="0 0 72 78"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.6802 57.8249C42.879 57.8249 55.2002 45.5038 55.2002 30.3049C55.2002 15.106 42.879 2.78491 27.6802 2.78491C12.4813 2.78491 0.160156 15.106 0.160156 30.3049C0.160156 45.5038 12.4813 57.8249 27.6802 57.8249Z"
                fill="#FFDCDE"
              />
              <path
                d="M68.0002 16.8648C65.8827 16.8648 64.1602 15.1423 64.1602 13.0248C64.1602 10.9074 65.8827 9.18481 68.0002 9.18481C70.1176 9.18481 71.8402 10.9074 71.8402 13.0248C71.8402 15.1423 70.1176 16.8648 68.0002 16.8648ZM68.0002 11.7448C67.2939 11.7448 66.7202 12.3186 66.7202 13.0248C66.7202 13.7311 67.2939 14.3048 68.0002 14.3048C68.7064 14.3048 69.2802 13.7311 69.2802 13.0248C69.2802 12.3186 68.7064 11.7448 68.0002 11.7448Z"
                fill="#F6515B"
              />
              <path
                d="M2.72018 30.945C3.42711 30.945 4.00018 30.3719 4.00018 29.665C4.00018 28.9581 3.42711 28.385 2.72018 28.385C2.01326 28.385 1.44019 28.9581 1.44019 29.665C1.44019 30.3719 2.01326 30.945 2.72018 30.945Z"
                fill="#F6515B"
              />
              <path
                d="M30.1302 7.15478C29.8028 7.15478 29.4751 7.02966 29.2252 6.77974L25.6053 3.1599C25.1055 2.66006 25.1055 1.84982 25.6053 1.34998C26.1052 0.850138 26.9154 0.850138 27.4153 1.34998L31.0351 4.96982C31.535 5.46966 31.535 6.2799 31.0351 6.77974C30.7852 7.02998 30.4578 7.15478 30.1302 7.15478Z"
                fill="#F6515B"
              />
              <path
                d="M26.5103 7.15478C26.183 7.15478 25.8553 7.02966 25.6053 6.77974C25.1055 6.2799 25.1055 5.46966 25.6053 4.96982L29.2252 1.34998C29.725 0.850138 30.5353 0.850138 31.0351 1.34998C31.535 1.84982 31.535 2.66006 31.0351 3.1599L27.4153 6.77974C27.1653 7.02998 26.8377 7.15478 26.5103 7.15478Z"
                fill="#F6515B"
              />
              <path
                d="M56.9916 75.7449H16.2889C15.1574 75.7449 14.2402 74.8277 14.2402 73.6962V21.9849H59.0402V73.6962C59.0402 74.8277 58.1231 75.7449 56.9916 75.7449Z"
                fill="#F5F5F5"
              />
              <path
                d="M56.9916 77.0248H16.2888C14.454 77.0248 12.9602 75.5311 12.9602 73.6962V21.9848C12.9602 21.2773 13.5327 20.7048 14.2402 20.7048H59.0402C59.7477 20.7048 60.3202 21.2773 60.3202 21.9848V73.6962C60.3202 75.5311 58.8264 77.0248 56.9916 77.0248ZM15.5202 23.2648V73.6962C15.5202 74.1199 15.8652 74.4648 16.2888 74.4648H56.9912C57.4149 74.4648 57.7599 74.1199 57.7599 73.6962V23.2648H15.5202Z"
                fill="#F6515B"
              />
              <path
                d="M25.1202 71.905C24.0597 71.905 23.2002 71.0455 23.2002 69.985V31.585C23.2002 30.5246 24.0597 29.665 25.1202 29.665C26.1807 29.665 27.0402 30.5246 27.0402 31.585V69.985C27.0402 71.0455 26.1807 71.905 25.1202 71.905Z"
                fill="#113255"
              />
              <path
                d="M25.1202 73.185C23.355 73.185 21.9202 71.7501 21.9202 69.985V31.585C21.9202 29.8199 23.355 28.385 25.1202 28.385C26.8853 28.385 28.3202 29.8199 28.3202 31.585V69.985C28.3202 71.7501 26.8853 73.185 25.1202 73.185ZM25.1202 30.945C24.7675 30.945 24.4802 31.2324 24.4802 31.585V69.985C24.4802 70.3376 24.7675 70.625 25.1202 70.625C25.4728 70.625 25.7602 70.3376 25.7602 69.985V31.585C25.7602 31.2327 25.4728 30.945 25.1202 30.945Z"
                fill="#F6515B"
              />
              <path
                d="M36.6402 71.905C35.5797 71.905 34.7202 71.0455 34.7202 69.985V31.585C34.7202 30.5246 35.5797 29.665 36.6402 29.665C37.7007 29.665 38.5602 30.5246 38.5602 31.585V69.985C38.5602 71.0455 37.7007 71.905 36.6402 71.905Z"
                fill="#113255"
              />
              <path
                d="M36.6402 73.185C34.8751 73.185 33.4402 71.7501 33.4402 69.985V31.585C33.4402 29.8199 34.8751 28.385 36.6402 28.385C38.4053 28.385 39.8402 29.8199 39.8402 31.585V69.985C39.8402 71.7501 38.4053 73.185 36.6402 73.185ZM36.6402 30.945C36.2875 30.945 36.0002 31.2324 36.0002 31.585V69.985C36.0002 70.3376 36.2875 70.625 36.6402 70.625C36.9928 70.625 37.2802 70.3376 37.2802 69.985V31.585C37.2802 31.2327 36.9928 30.945 36.6402 30.945Z"
                fill="#F6515B"
              />
              <path
                d="M48.1602 71.905C47.0998 71.905 46.2402 71.0455 46.2402 69.985V31.585C46.2402 30.5246 47.0998 29.665 48.1602 29.665C49.2207 29.665 50.0802 30.5246 50.0802 31.585V69.985C50.0802 71.0455 49.2207 71.905 48.1602 71.905Z"
                fill="#113255"
              />
              <path
                d="M48.1602 73.185C46.3951 73.185 44.9602 71.7501 44.9602 69.985V31.585C44.9602 29.8199 46.3951 28.385 48.1602 28.385C49.9253 28.385 51.3602 29.8199 51.3602 31.585V69.985C51.3602 71.7501 49.9253 73.185 48.1602 73.185ZM48.1602 30.945C47.8076 30.945 47.5202 31.2324 47.5202 31.585V69.985C47.5202 70.3376 47.8076 70.625 48.1602 70.625C48.5128 70.625 48.8002 70.3376 48.8002 69.985V31.585C48.8002 31.2327 48.5128 30.945 48.1602 30.945Z"
                fill="#F6515B"
              />
              <path
                d="M47.5202 23.2649H25.7602C25.0527 23.2649 24.4802 22.6924 24.4802 21.9849V17.5074C24.4802 14.3298 27.0652 11.7449 30.2428 11.7449H43.0377C46.2153 11.7449 48.8002 14.3298 48.8002 17.5074V21.9849C48.8002 22.6924 48.2277 23.2649 47.5202 23.2649ZM27.0402 20.7049H46.2402V17.5074C46.2402 15.741 44.8041 14.3049 43.0377 14.3049H30.2428C28.4764 14.3049 27.0402 15.741 27.0402 17.5074V20.7049Z"
                fill="#F6515B"
              />
              <path
                d="M10.4001 21.9849H62.8801V25.8249H10.4001V21.9849Z"
                fill="#F5F5F5"
              />
              <path
                d="M62.8801 27.1048H10.4001C9.6926 27.1048 9.12012 26.5324 9.12012 25.8248V21.9848C9.12012 21.2773 9.6926 20.7048 10.4001 20.7048H62.8801C63.5876 20.7048 64.1601 21.2773 64.1601 21.9848V25.8248C64.1601 26.5324 63.5876 27.1048 62.8801 27.1048ZM11.6801 24.5448H61.6001V23.2648H11.6801V24.5448Z"
                fill="#F6515B"
              />
            </svg>
          </span>
          <p class="title-awesome-job">{{ titleHead }}</p>
          <p class="description-awesome-job" v-html="titleDescription"></p>
          <span class="btn-container-wrapper">
            <button
              :disabled="disabled"
              class="btn cancel"
              @click="$emit('closeTriggered')"
            >
              {{ leftText }}
            </button>
            <button
              :disabled="disabled"
              class="btn delete"
              @click="$emit('delete')"
            >
              <span
                v-if="disabled"
                class="icon-dotted-roller font-17 mr-2 animate"
              ></span>
              <span class="text">
                {{ rightText }}
              </span>
            </button>
          </span>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end"></div>
    </template>
  </modal-cover>
</template>

<script>
import ModalCover from "@/components/ModalComps/ModalCover";
export default {
  name: "AssesmentDeleteModal",

  components: {
    ModalCover
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    titleHead: {
      type: String,
      default: "Delete Assessment!"
    },
    leftText: {
      type: String,
      default: "Cancel"
    },
    rightText: {
      type: String,
      default: "Yes,Delete it"
    },
    titleDescription: {
      type: String,
      default:
        "You are about to delete this assessment. You will lose every questions you have created and assigned to it"
    }
  },
  updated() {
 window?.MathJax?.typeset();
  }
};
</script>

<style lang="scss" scoped>
.modal-inner-txt {
  @include flex-column-center;
  text-align: center;

  .delete-awesome-job {
    margin: 1rem 0px;
  }
  .title-awesome-job {
    font-style: normal;
    font-weight: bold;
    font-size: 1.13rem;
    line-height: 25px;
    text-align: center;
    color: #353535;
  }
  .btn-container-wrapper {
    @include flex-row-between-nowrap;
    .cancel {
      margin: 0.5rem;
      background: $white-text;
      border: 1px solid $brand-navy;
      color: $brand-navy;
      box-sizing: border-box;
      border-radius: toRem(30);
    }
    .delete {
      margin: 0.5rem;
      background: $brand-tonic;
    }
  }
  .description-awesome-job {
    font-style: normal;
    font-size: 0.98rem;
    line-height: 165%;
    align-items: center;
    color: #555555;
  }
}
</style>
