<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Exam Short Link</div>
      </div>
    </template>
    ``
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-0">
        <!-- TITLE TEXT  -->
        <div class="title-text color-text">
          Copy and share exam short link to your students!
        </div>

        <input type="text" v-model="share_link" class="form-control gfont-13" />
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer mgb-10 pdt-0">
        <div class="d-flex justify-content-center">
          <button
            class="btn modal-btn btn-default-outline position-relative"
            @click="copyExamLink"
          >
            Copy Exam Link

            <input
              type="text"
              ref="examLink"
              :value="share_link"
              class="position-absolute index--9 ignore"
              style="opacity: 0"
            />
          </button>
        </div>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { APP_BASE_URL } from "@/env";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "examLinkModal",

  components: {
    modalCover,
  },

  props: {
    exam_id: {
      type: Number,
    },
  },

  data() {
    return {
      share_link: "",
    };
  },

  mounted() {
    // this.share_link = `${APP_BASE_URL}/test/start-exam/${this.exam_id}`;
    this.share_link = `https://app.gradely.ng/test/start-exam/${this.exam_id}`;
  },

  methods: {
    copyExamLink() {
      let code_input = this.$refs.examLink;
      code_input.select();
      code_input.setSelectionRange(0, 99999); /*For mobile devices*/
      document.execCommand("copy");

      this.pushAlert("Exam short link copied!", "success");
    },
  },
};
</script>

<style lang="scss" scoped>
.title-text {
  @include font-height(12.5, 18);
  margin-bottom: toRem(9);
}

.input-wrapper {
  .btn {
    @include center-y;
    right: toRem(10);
    z-index: 99;
  }
}

.modal-cover-footer {
  margin-top: toRem(-54) !important;

  .btn {
    padding: toRem(12) toRem(34);
    font-size: toRem(10.5);
  }

  .share-links {
    .meta-text {
      @include font-height(12.75, 17);
    }

    .social-row {
      @include flex-row-center-nowrap;

      .social {
        @include square-shape(34);
        margin: toRem(2) toRem(7);
        position: relative;
        border-radius: 50%;

        .icon {
          @include center-placement;
          font-size: toRem(15);
          color: $white-text;
        }
      }
    }
  }
}
</style>
