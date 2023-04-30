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
          <span class="icon-awesome-job icon-check-circle"></span>
          <p class="title-awesome-job">Awesome Job</p>
          <p class="description-awesome-job" v-if="tag === 'exam'">
            <b class="text-capitalize">{{ assessmentTitle }}</b> has been
            created. This exam is currently in review, until it is approved by a
            school admin.
          </p>

          <p class="description-awesome-job" v-else>
            <b>{{ assessmentTitle }}</b> has been published. Your students can
            now log into their student dashboard, to complete their assessment.
          </p>
          <button class="btn btn-accent" @click="$emit('return')">
            {{ buttonText }}
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
  name: "AssesmentPublishModal",

  components: {
    ModalCover,
  },
  props: {
    assessmentTitle: {
      type: String,
      default: "Asessment",
    },
    buttonText: {
      type: String,
      default: "Return to Class",
    },
    tag: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-inner-txt {
  @include flex-column-center;
  text-align: center;
  max-width: 20rem;
  margin: 0 auto;

  .icon-awesome-job {
    color: #11bdcf;
    font-size: 5.56rem;
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
    line-height: 25px;
    align-items: center;
    color: #555555;
  }
}
</style>
