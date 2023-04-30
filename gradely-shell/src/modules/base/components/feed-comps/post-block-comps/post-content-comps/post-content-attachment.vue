<template>
  <div class="position-relative d-flex justify-content-start w-100 w-100">
    <div class="spacer"></div>

    <div class="wrapper d-flex flex-column w-100">
      <attachment-preview
        v-for="(attachment, index) in attachments"
        :key="index"
        :attachment="attachment"
        :post="post"
      />

      <!-- CoNTENT DETAILS  -->
      <div class="content-details" v-if="false">
        <div class="text text-capitalize">Document</div>
        <div class="bullet"></div>
        <div class="text link link-no-underline">
          2 Downloads
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import attachmentPreview from "@/modules/base/components/feed-comps/post-block-comps/attachment-preview";

export default {
  name: "postContentAttachment",

  components: {
    attachmentPreview,
  },

  props: {
    post: {
      type: Object,
    },

    attachments: {
      type: Array,
    },
  },

  data: () => ({}),

  methods: {},
};
</script>

<style lang="scss" scoped>
.content-details {
  margin-top: toRem(5);
  margin-bottom: toRem(10);
  margin-left: toRem(12);

  .link {
    pointer-events: none;
  }
}
</style>
