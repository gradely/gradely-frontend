<template>
  <modal-cover
    @closeModal="$emit('closeOpenState')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-capitalize">New Live Class</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div
          class="code-block pointer"
          :class="[copied && 'copied-block']"
          @click="copyCode"
        >
          <div class="code-feedback" :class="[copied && 'show-feedback']">
            Link Copied!
          </div>
          <div class="color-text gfont-12 mgb-5 font-weight-600">
            Live Class Link
          </div>
          <div class="color-ash gfont-12 link-text">
            {{ getTeacherLiveClass.link }}
          </div>
          <div class="icon icon-copy gfont-20 brand-inverse"></div>
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
          class="btn btn-secondary-outline mx-auto"
          ref="copy"
          @click="$emit('reschedule', 'newLiveClassModal')"
        >
          Schedule Later
        </button>

        <button
          class="btn modal-btn btn-soft-accent mx-auto"
          ref="start"
          @click="startClass"
        >
          Start Now
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "startLiveClassModal",

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

  data() {
    return {
      copied: false,
    };
  },

  methods: {
    ...mapActions({
      getLiveClassRandomLink: "dbFeeds/getLiveClassRandomLink",
    }),

    async copyCode() {
      let clipboard = navigator.clipboard;
      await clipboard.writeText(this.getTeacherLiveClass?.link);
      this.copied = true;

      setTimeout(() => {
        this.copied = false;
      }, 1400);
    },

    async startClass() {
      try {
        this.handleClick("start", "Starting class..");

        let response = await this.getLiveClassRandomLink(
          this.getTeacherLiveClass?.token
        );

        this.handleClick("start", "Start Class Now", false);

        if (response.code === 200) {
          this.pushAlert("Redirecting to live class", "loading");
          window.open(response.data);
        } else {
          this.pushAlert("Failed to start live class", "warning");
        }
      } catch (err) {
        this.handleClick("start", "Start Class Now", false);
        this.pushAlert("Failed to start live class", "error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.code-block {
  background: $color-white;
  padding: toRem(10) toRem(15);
  border-radius: toRem(10);
  position: relative;
  border: 1.2px solid transparent;

  .icon-copy {
    @include center-y;
    left: calc(100% - 35px);
  }

  .link-text {
    width: 305px;
    max-width: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .code-feedback {
    @include center-x;
    top: -8px;
    padding: toRem(9) toRem(12);
    border-radius: toRem(10);
    background: $brand-navy;
    color: $white-text;
    font-size: toRem(11);
    opacity: 0;
    transition: all ease-in-out 0.2s;
  }

  .show-feedback {
    opacity: 1;
    top: -10px;
  }
}

.copied-block {
  border-color: $brand-inverse;
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