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
          <span class="icon-awesome-job">
            <svg
              width="89"
              height="64"
              viewBox="0 0 89 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.7662 20.0235L35.0576 16.4696C34.5427 15.3984 33.4897 14.7219 32.338 14.7219H18.3947C16.7154 14.7219 15.3542 16.1374 15.3542 17.8838V20.0235V57.1535C15.3542 58.8995 16.7154 60.3153 18.3947 60.3153H70.432C72.111 60.3153 73.4725 58.8995 73.4725 57.1535V23.1853C73.4725 21.439 72.111 20.0235 70.432 20.0235H36.7662Z"
                fill="#F2AB3E"
              />
              <path
                d="M38.2911 25.4281L36.612 22.0694C36.1059 21.057 35.0711 20.4177 33.9393 20.4177H20.2364C18.586 20.4177 17.2483 21.7555 17.2483 23.4059V25.4281V60.5185C17.2483 62.1687 18.586 63.5067 20.2364 63.5067H71.3765C73.0266 63.5067 74.3646 62.1687 74.3646 60.5185V28.4162C74.3646 26.7658 73.0266 25.4281 71.3765 25.4281H38.2911Z"
                fill="#113255"
              />
              <path
                d="M10.3464 21.6526L8.80353 20.8273C8.03076 20.4139 7.39784 19.781 6.98448 19.0083L6.15928 17.4655C5.91164 17.0026 5.24834 17.0011 4.99884 17.463L4.12917 19.0729C3.71865 19.8329 3.09512 20.4565 2.3351 20.867L0.72517 21.7366C0.263279 21.9861 0.264784 22.6494 0.72765 22.8971L2.27045 23.7223C3.04322 24.1356 3.67614 24.7686 4.08949 25.5413L4.91478 27.0842C5.16242 27.5471 5.82564 27.5485 6.07514 27.0866L6.9448 25.4767C7.35532 24.7167 7.97885 24.0931 8.73887 23.6826L10.3488 22.8129C10.8107 22.5634 10.8093 21.9002 10.3464 21.6526Z"
                fill="#11BDCF"
              />
              <path
                d="M88.0593 26.8572L86.5164 26.0319C85.7436 25.6185 85.1107 24.9856 84.6974 24.2128L83.8722 22.6701C83.6245 22.2072 82.9612 22.2057 82.7117 22.6676L81.8421 24.2775C81.4315 25.0375 80.808 25.6611 80.048 26.0716L78.4381 26.9412C77.9762 27.1907 77.9777 27.854 78.4405 28.1017L79.9833 28.9269C80.7561 29.3402 81.389 29.9732 81.8024 30.7459L82.6277 32.2888C82.8753 32.7517 83.5385 32.7531 83.788 32.2912L84.6577 30.6813C85.0682 29.9213 85.6917 29.2977 86.4518 28.8872L88.0617 28.0175C88.5236 27.768 88.5222 27.1048 88.0593 26.8572Z"
                fill="#60D2B0"
              />
              <path
                d="M58.2424 34.4839L56.6995 33.6586C55.9268 33.2452 55.2938 32.6123 54.8805 31.8396L54.0553 30.2968C53.8076 29.8339 53.1443 29.8324 52.8948 30.2943L52.0252 31.9042C51.6146 32.6642 50.9911 33.2878 50.2311 33.6983L48.6212 34.5679C48.1593 34.8174 48.1608 35.4807 48.6236 35.7284L50.1664 36.5536C50.9392 36.9669 51.5721 37.5999 51.9855 38.3726L52.8108 39.9155C53.0584 40.3784 53.7216 40.3798 53.9711 39.9179L54.8408 38.308C55.2513 37.548 55.8748 36.9244 56.6349 36.5139L58.2448 35.6442C58.7067 35.3947 58.7053 34.7315 58.2424 34.4839Z"
                fill="#11BDCF"
              />
              <path
                d="M39.0273 6.82959C40.2025 6.82959 41.1567 7.78376 41.1567 8.95895C41.1567 10.1341 40.2025 11.0883 39.0273 11.0883C37.8521 11.0883 36.8979 10.1341 36.8979 8.95895C36.8979 7.78376 37.8521 6.82959 39.0273 6.82959Z"
                fill="#FAA017"
              />
              <path
                d="M68.7884 0C70.1986 0 71.3436 1.145 71.3436 2.55523C71.3436 3.96547 70.1986 5.11047 68.7884 5.11047C67.3782 5.11047 66.2332 3.96547 66.2332 2.55523C66.2332 1.145 67.3782 0 68.7884 0Z"
                fill="#F6515B"
              />
              <path
                d="M30.5941 25.5505C31.4167 25.5505 32.0846 26.2185 32.0846 27.0411C32.0846 27.8637 31.4167 28.5316 30.5941 28.5316C29.7714 28.5316 29.1035 27.8637 29.1035 27.0411C29.1035 26.2185 29.7714 25.5505 30.5941 25.5505Z"
                fill="#F6515B"
              />
            </svg>
          </span>
          <p class="title-awesome-job">{{ titleText }}</p>
          <p class="description-awesome-job">
            Your assessment <b>“{{ assesmentTitle }}“</b> has been saved but not
            published. Find all unpublished assessments in your assessment draft
            page.
          </p>
          <button @click="$emit('view-drafts')" class="btn btn-accent">
            See your Draft
          </button>
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
  name: "AssesmentDraftModal",

  components: {
    ModalCover
  },
  props: {
    titleText: {
      type: String,
      default: "Assessment Saved to Draft"
    },
    assesmentTitle: {
      type: String,
      default: "assesment"
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-inner-txt {
  @include flex-column-center;
  text-align: center;

  .icon-awesome-job {
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
  .description-awesome-job {
    font-style: normal;
    font-size: 0.98rem;
    line-height: 165%;
    align-items: center;
    color: #555555;
  }
}
</style>
