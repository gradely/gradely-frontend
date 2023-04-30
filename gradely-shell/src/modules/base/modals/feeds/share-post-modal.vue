<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Share Post</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-0">
        <!-- TITLE TEXT  -->
        <div class="title-text color-text">
          Copy the URL below to share this post
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
            @click="copyPostLink"
          >
            Copy Link

            <input
              type="text"
              ref="postLink"
              :value="share_link"
              class="position-absolute index--9 ignore"
              style="opacity: 0"
            />
          </button>
        </div>

        <!-- SHARE LINKS -->
        <div class="share-links mgt-17">
          <div class="meta-text text-center color-ash">Share to..</div>

          <div class="social-row mgt-10">
            <a
              :href="
                'https://www.facebook.com/sharer/sharer.php?u=' +
                encodeURIComponent(share_link) +
                '&t=' +
                encodeURIComponent(share_link)
              "
              target="_blank"
              class="social facebook-bg"
              title="Post on facebook"
            >
              <div class="icon icon-facebook"></div>
            </a>

            <a
              :href="
                'https://twitter.com/intent/tweet?text=%20Check%20up%20this%20awesome%20content' +
                ':%20 ' +
                encodeURIComponent(share_link)
              "
              target="_blank"
              class="social twitter-bg"
              title="Tweet on twitter"
            >
              <div class="icon icon-twitter"></div>
            </a>

            <a
              :href="
                'http://www.linkedin.com/shareArticle?mini=true&url=' +
                encodeURIComponent(share_link) +
                '&title=' +
                encodeURIComponent('GradelyNg Feed')
              "
              target="_blank"
              class="social linkedin-bg"
              title="Share on linkedin"
            >
              <div class="icon icon-linkedin"></div>
            </a>

            <a
              :href="'whatsapp://send' + encodeURIComponent(share_link)"
              target="_blank"
              class="social whatsapp-bg"
              title="Share to whatsapp"
            >
              <div class="icon icon-whatsapp-fill gfont-17"></div>
            </a>
          </div>
        </div>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { APP_BASE_URL } from "@/env";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "sharePostModal",

  components: {
    modalCover,
  },

  props: {
    token: {
      type: String,
    },
  },

  data() {
    return {
      share_link: "",
    };
  },

  mounted() {
    this.share_link = `${APP_BASE_URL}/post/${this.token}`;
  },

  methods: {
    copyPostLink() {
      let code_input = this.$refs.postLink;
      code_input.select();
      code_input.setSelectionRange(0, 99999); /*For mobile devices*/
      document.execCommand("copy");

      this.pushAlert("Post link copied!", "success");
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
