<template>
  <div class="position-relative d-flex justify-content-start w-100">
    <div class="spacer"></div>

    <div class="post-content-area padded-area pt-0 w-100">
      <div class="content-area-card rounded-10 w-100">
        <!-- LEFT  -->
        <div class="left">
          <div class="avatar brand-inverse-light-bg rounded-10">
            <div class="icon icon-book-pile brand-navy"></div>
          </div>
        </div>

        <!-- RIGHT  -->
        <div class="right w-100">
          <!-- TOP ROW  -->
          <div class="top-row">
            <!-- TITLE TEXT  -->
            <div class="title-text color-text font-weight-600">
              {{ $string.getCapitalizeText(post.reference.title) }}
            </div>

            <!-- META TEXT  -->
            <div class="meta-text color-grey-dark">
              {{ post.reference.subject }}
            </div>
          </div>

          <!-- MIDDLE ROW  -->
          <div class="middle-row">
            <div class="lesson-description color-grey-dark">
              {{ post.reference.description }}
            </div>
          </div>

          <!-- BOTTOM ROW  -->
          <div
            class="bottom-row w-100 d-flex flex-column"
            v-if="post.reference.attachments"
          >
            <file-preview
              option_text="view"
              v-for="(attachment, index) in post.reference.attachments"
              :key="index"
              :post="post"
              :attachment="attachment"
            />
          </div>
        </div>
      </div>

      <!-- CoNTENT DETAILS  -->
      <div class="content-details">
        <div class="text">Lesson</div>
        <div class="bullet"></div>

        <div class="text">{{ post.reference.subject }}</div>

        <template v-if="false">
          <div class="bullet"></div>
          <router-link
            :to="{ name: 'AssessmentParticipantReview', params: { id: 1 } }"
            class="text link link-underline pointer smooth-transition"
          >
            9 Attempts
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import filePreview from "@/modules/base/components/feed-comps/post-input-comps/file-preview";

export default {
  name: "postContentLesson",

  components: {
    filePreview,
  },

  props: {
    post: {
      type: Object,
    },
  },

  data: () => ({
    show_more_option: false,
  }),

  methods: {
    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.middle-row {
  .lesson-description {
    @include font-height(13, 19);
    margin-bottom: toRem(-7);

    @include breakpoint-down(xs) {
      @include font-height(12.5, 18);
    }
  }
}
</style>
