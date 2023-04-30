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
          :src="mxStaticImg('confirm.png')"
          alt="confirm"
          class="confirm-illustration"
        />

        <div>
          <div class="gfont-18 font-weight-600 brand-navy">
            Submit Assessment
          </div>

          <div class="info-text">
            You still have
            <span class="font-weight-600" v-if="question_left"
              >{{ question_left }} unanswered questions
            </span>
            <span v-if="question_left"> and</span>
            <span class="font-weight-600" v-if="time_left">
              {{ time_left }}</span
            >
            to complete the assessment. Are you sure you want to submit your
            answers?
          </div>

          <div class="actions">
            <button
              class="btn btn-accent btn-sm"
              @click="$emit('closeTriggered')"
            >
              CANCEL
            </button>
            <div class="submit" @click="$emit('submit')">
              YES, SUBMIT IT
            </div>
          </div>
        </div>
      </div>
    </template>
  </modal-cover>
</template>
<script>
import modalCover from "@/components/global-comps/modal-cover";

export default {
  name: "ConfirmDialog",

  components: { modalCover },

  props: {
    question_left: {
      type: Number,
      default: 0,
    },

    time_left: {
      type: String,
      default: "20 minutes, 20 seconds",
    },
  },

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
