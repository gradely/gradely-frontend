<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{
      size: 'modal-small',
    }"
  >
    <template slot="modal-cover-body">
      <div class="modal-cover-body-content">
        <img
          :src="mxStaticImg('Timesup.png')"
          alt="confirm"
          class="confirm-illustration"
        />

        <div>
          <div class="gfont-20 font-weight-600 brand-navy">
            Times Up!
          </div>

          <div class="info-text">
            You have run out of time. Click
            <span class="font-weight-600">continue</span> to submit your work
            for grading now.
            <br />
            <br />
            Good luck!
          </div>

          <div class="actions">
            <button class="btn btn-accent btn-sm" @click="$emit('okay')">
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </template>
  </modal-cover>
</template>
<script>
import modalCover from "@/components/global-comps/modal-cover";

export default {
  name: "SubmitModal",

  components: { modalCover },

  data() {
    return {};
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
.modal-cover-body-content {
  @include flex-row-start-nowrap;
  align-items: flex-start;
  padding: 40px 30px;
  gap: 0 20px;

  @include breakpoint-down(md) {
    padding: 30px 20px;
  }

  @include breakpoint-down(xs) {
    padding: 25px 10px;
  }

  .confirm-illustration {
    @include square-shape(100);

    @include breakpoint-down(xs) {
      @include square-shape(85);
    }
  }

  .info-text {
    color: #353535;
    font-size: 0.85rem;
    line-height: 165%;
    margin-top: 12px;
  }

  .actions {
    margin-top: 30px;
    @include flex-row-start-nowrap;
    gap: 0 20px;

    .submit {
      font-size: 0.8rem;
      font-weight: 600;
      color: $brand-navy;
      transition: color ease-in-out 0.2s;
      cursor: pointer;

      &:hover {
        color: $brand-accent;
      }
    }
  }
}
</style>
