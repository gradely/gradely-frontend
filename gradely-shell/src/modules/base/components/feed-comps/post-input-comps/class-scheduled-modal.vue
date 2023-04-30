<template>
  <modal-cover :modal_style="{ size: 'modal-small' }">
    <template slot="modal-cover-body">
      <div class="modal-body">
        <div class="like-wrapper mgb-20">
          <img
            v-lazy="mxStaticImg('like-icon.png')"
            alt="like"
            class="like-icon"
          />
        </div>

        <div class="color-text gfont-18 mgb-25">
          Class Scheduled Successfully
        </div>

        <div class="item-row">
          <div class="icon icon-book-cover brand-inverse mgt-1 gfont-20"></div>
          <div class="right-item">
            <div class="color-ash gfont-15">Subject</div>
            <div class="gfont-14 font-weight-600">
              {{ class_details.subject }}
            </div>
          </div>
        </div>

        <div class="item-row mgb-18 mgt-18">
          <div class="icon icon-calendar brand-inverse mgt-1 gfont-20"></div>
          <div class="right-item">
            <div class="color-ash gfont-15">Lesson Date</div>
            <div class="gfont-14 font-weight-600">{{ class_details.date }}</div>
          </div>
        </div>

        <div class="item-row">
          <div class="icon icon-clock brand-inverse mgt-1 gfont-20"></div>
          <div class="right-item">
            <div class="color-ash gfont-15">Time</div>
            <div class="gfont-14 font-weight-600 text-uppercase">
              {{ class_details.time }}
            </div>
          </div>
        </div>

        <button
          class="btn btn-sm btn-soft-grey mgt-30"
          @click="$emit('closeTriggered')"
        >
          dismiss
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "ClassScheduledModal",

  components: {
    modalCover,
  },

  props: {
    class_details: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-body {
  padding: toRem(30);
  @include flex-row-center-nowrap;
  flex-direction: column;

  .like-wrapper {
    @include square-shape(86);
    position: relative;
    border: 3px solid #24ae5f;
    background: #e4fbef;
    border-radius: 50%;

    .like-icon {
      width: 55%;
      height: 55%;
      @include center-placement;
    }
  }

  .item-row {
    width: 100%;
    @include flex-row-start-nowrap;
    align-items: flex-start;
    gap: 0 toRem(20);

    .right-item {
      width: 100%;
      @include flex-row-between-nowrap;
      padding-bottom: toRem(15);
      border-bottom: 1.5px solid $brand-inverse-light;
    }
  }
}
</style>