<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Manage URL</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="code-block">
          <div class="color-text gfont-12 mgb-5 font-weight-600">Live Class Link</div>
          <div class="color-ash gfont-12">{{this.getTeacherLiveClass.link}}</div>
        </div>

        <div class="actions mgt-25 mgb-35">
          <div class="icon icon-lock-fill brand-inverse"></div>
          <div class="gfont-13 mgr-30 mgl-10 access-text">Class Access</div>
          <select name="access" id="access" class="form-control">
            <option value="1">Anyone with link</option>
          </select>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end">
        <button
          class="btn modal-btn btn-soft-grey mgl-10"
          ref="copyCode"
          @click="copyCode"
        >Copy Link</button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapGetters } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "manageLiveClassModal",

  components: {
    modalCover,
  },

  props: {
    post: {
      type: Object,
    },
  },

  computed: {
    ...mapGetters({ getTeacherLiveClass: "dbFeeds/getTeacherLiveClass" }),
  },

  methods: {
    async copyCode() {
      this.handleClick("copyCode", "Copied!!!", false);

      let clipboard = navigator.clipboard;
      await clipboard.writeText(this.getTeacherLiveClass?.link);

      setTimeout(() => {
        if (this.$refs.copyCode)
          this.handleClick("copyCode", "Copy Link", false);
      }, 1400);
    },
  },
};
</script>

<style lang="scss" scoped>
.code-block {
  background: $color-white;
  padding: toRem(10) toRem(15);
  border-radius: toRem(10);
}

.actions {
  @include flex-row-start-nowrap;

  .form-control {
    min-height: 2.35rem;
  }
}

.access-text {
  min-width: max-content;
}

.modal-cover-footer {
  margin-top: toRem(-30);
  margin-bottom: toRem(10);

  @include breakpoint-custom-down(340) {
    margin-top: toRem(-45);
  }
}
</style>