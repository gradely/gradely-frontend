<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body central-placement">
        <div class="top-row">
          <img v-lazy="mxStaticImg('ErrorIcon.svg')" alt class="w-100 h-100" />
        </div>

        <div
          class="info-text color-ash text-center mgt-18 mgb-2"
        >Please confirm you would like to cancel this class.</div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div
        class="modal-cover-footer d-flex flex-column justify-content-center align-items-center mgt--10 mgb-20"
      >
        <button
          class="btn modal-btn btn-soft-accent mgb-10"
          @click="$emit('reschedule')"
        >Reschedule Instead</button>

        <button class="btn btn-default" ref="delete" @click="cancelClass">Yes, Cancel class</button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "cancelLivecalssModal",

  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },

  components: {
    modalCover,
  },

  computed: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {
    ...mapActions({ deleteFeedPost: "dbFeeds/deleteFeedPost" }),

    cancelClass() {
      this.handleClick("delete", "Cancelling...");
      this.deleteFeedPost(this.post.id)
        .then((response) => {
          this.handleClick("delete", "Yes, Cancel class", false);
          if (response.code === 200) {
            this.$bus.$emit("extractDeletedPost", this.post.id);
            this.pushAlert("Class cancelled", "success");

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1500);
          } else {
            this.pushAlert("Failed to cancel class", "warning");
          }
        })
        .catch(() => {
          this.handleClick("delete", "Yes, Cancel class", false);
          this.pushAlert("Unable to cancel class", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.info-text {
  @include font-height(13.5, 23);
  width: 70%;
}

.btn-remove {
  background: $brand-tonic;
  padding: toRem(13.5) toRem(36);
  font-size: toRem(10.5);

  &:hover {
    background: $brand-red-light;
    border: toRem(1) solid $brand-red !important;
    box-shadow: unset;
  }
}
</style>
